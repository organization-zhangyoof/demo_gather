(function(e) {
    function YTX() {
        this.login_type = 1; //1  手机号登陆  2 VIOP账号登陆
    	this._onUnitAccount = 'KF10089'; //多渠道客服帐号，目前只支持1个
        this._appid = app._appid || 'e750de49d8254db1a3d735c6c4d80b52';
        this._3rdServer = 'https://imapp.yuntongxun.com/2016-08-15/Corp/yuntongxun/inner/authen/genSig';
        this._appToken =app._appToken||'06f8c2f3df6654b8986aa752dd945954';
        this.flag = false;//是否从第三方服务器获取sig

        this.is_online = false;
        this.user_account = ""; // 登陆账号
        this.username = ""; //登陆用户名
        this.pwd = ""; //登陆密码
        this.nickName = "";
        this._onMsgReceiveListener = null; // 消息监听
        this._noticeReceiveListener = null; // SDK消息通知监听
        this._onConnectStateChangeLisenter = null; //连接状态监听
        this._onCallMsgListener = null; //呼叫事件监听

        this.currentChat = null; //当前聊天对象
        this.chat_window = null; //聊天窗对象
        this.chatNickName = null; //聊天对象昵称
        this.chat_maps = {}; //聊天人和聊天内容div的对应关系

        // this.contact_list = {}; //联系人列表
        this.group_list = {}; //群组列表
        // this.discussion_list = {}; //讨论组列表
        this._contact_type_c = 'C'; // 代表联系人类型
        this._contact_type_g = 'G'; // 代表群组类型
        this._contact_type_m = 'M'; // 代表多渠道客服类型
        this._extopts = [];
        this.currentCallId = null;
        this.currentCallWith = null;
        this.fireMsgWindow = null;
        this.fireMsgContent = null;
        // this.currentCallType = null;
        this._transfer = 12;
        this._msgBack = 25;
        this.contactMember = null;
        this.userStateInterval = null;
        this.currentGroupIndex = null; //当前群聊天框
        this.chartIds = [];  //当前阅后即焚点亮图标的联系人ids
        this.focusName = null; // 群名称，群公告，群成人名称
        this.lastId = null; // 上一个会话id
        this.msgs = [];  // 单人草稿
        this.lastGroupId = null; // 上一个群会话id
        this.msgGroups  = []; // 群组草稿
        this.hasMsg = false;  // 控制联系人和群组按钮切换时的操作
        this._Notification = window.Notification || window.mozNotification || window.webkitNotification || window.msNotification || window.webkitNotifications;
        this.contacts = {"666":{"conName":"小6","conHead":"null","conVersion":1},"777":{"conName":"小7","conHead":"null","conVersion":1},"888":{"conName":"小8","conHead":"null","conVersion":1}};
    };
    YTX.prototype._login_error_show = false;
    YTX.prototype = {
        init: function() {
            // RL_YTX_NEW.setLogClose();
            console.log('window.localStorage-------------------',localStorage)
            var resp = RL_YTX_NEW.init({
                appId: this._appid,
                serverIp:ip.serverIp,
              isV3: true
            });
            RL_YTX_NEW.chatInit({
                fileServerIp:ip.fileServerIp,
                lvsServer:ip.lvsServer
            });
            // RL_YTX_NEW.meetInit({});
            if(resp.code != 200) {
                alert('SDK初始化错误');
                return;
            }else if(174001 == resp.code){
                alert('您的浏览器不支持html5，请更换新的浏览器。推荐使用chrome浏览器。');
                return ;
            }else if(170002 == resp.code){
                console.log("错误码：170002,错误码描述" + resp.msg);
                return ;
            }
            if ($.inArray(174004, resp.unsupport) > -1 || $.inArray(174009, resp.unsupport) > -1) { //不支持getUserMedia方法或者url转换
                // IM.Check_usermedie_isDisable(); //拍照、录音、音视频呼叫都不支持

            } else if ($.inArray(174007, resp.unsupport) > -1) { //不支持发送附件
                // IM.SendFile_isDisable();

            } else if ($.inArray(174008, resp.unsupport) > -1) { //不支持音视频呼叫，音视频不可用
                // IM.SendVoiceAndVideo_isDisable();

            }

            IM.initEmoji();
            IM.typingList = IM.typingList();
            IM.chat_window = $('[data-window-type="chat"]');
            IM.currentChat = this.chat_window.find('.chatting .chats');
            IM.chatNickName = this.chat_window.find('.receiver .name');
            IM.fireMsgWindow = $('#firemsg');
            IM.fireMsgContent = IM.fireMsgWindow.find('.modal-body');
            IM.typeingTarget = document.querySelector('[data-status="isTyping"]');
            $('.group_list').on('click', '[data-groupid]', function() {
                var gid = $(this).attr('data-groupid');
                $(this).addClass('active');
                $(this).siblings('.active').removeClass('active');
                IM.createGroupChatWindow(gid, true);
                $(this).find('.noticeQ').remove();
                $(this).find('.hasAt').remove();
                //有草稿时 展示
                IM.msgGroups = JSON.parse(window.localStorage.getItem('msgGroups'))||[]
                var message =  IM.chat_window.find('[data-chat-input="chatinput"]').html()
                var msgItem = IM.msgGroups.find(function(e,index){
                        return e.lastGroupId == gid
                    })
                if(msgItem){
                    IM.chat_window.find('[data-chat-input="chatinput"]').html(msgItem.message)
                    $('.group_list .discuss').find('[data-groupid="'+ gid +'"]').find('.draft').hide().html('')
                }else{
                    IM.chat_window.find('[data-chat-input="chatinput"]').html('');
                }
                //存草稿
                if( message && IM.lastGroupId ){
                    var index = IM.msgGroups.findIndex(function(e,index){
                        return e.lastGroupId == IM.lastGroupId
                    })
                    if(index>-1){
                        IM.msgGroups[index].message = message
                    }else{
                        IM.msgGroups.push({
                            'lastGroupId':IM.lastGroupId,
                            'message':message
                        })
                    }
                    window.localStorage.setItem('msgGroups',JSON.stringify(IM.msgGroups))
                    if(gid != IM.lastGroupId){
                        var info =message.length>10? '<em style="color:red;">[草稿]</em> '+ message.substring(0,10)+' ...':'<em style="color:red;">[草稿]</em> '+ message.substring(0,10)
                        $('.group_list .discuss').find('[data-groupid="'+IM.lastGroupId +'"]').find('.draft').show().html(info)
                    }
                }else if(!IM.hasMsg && IM.lastGroupId){ //删已有草稿
                    var index = IM.msgGroups.findIndex(function(e,index){
                        return e.lastGroupId == IM.lastGroupId
                    })
                    if(index>-1){
                        IM.msgGroups.splice(index,1)
                        window.localStorage.setItem('msgGroups',JSON.stringify(IM.msgGroups))
                    }
                }
                IM.hasMsg = false
                // 上一个会话人id
                IM.lastGroupId = $(this).attr('data-groupid');

                $('.chat_group_window.rlist').find('.chatting .chats').first().hide() 
            });
            //鼠标右键事件
            document.oncontextmenu = function(e){
                e.preventDefault();
            };
            $(document).on('click', '.group_set', function() {
                var tar = $('#group');
                IM.showGroupInfo(tar);
            });
            $(document).on('click', '#setPersonalInfo', function() {
                $('#personInfor').modal('show');
            });

            $(document).on('click', '[data-btn="creategroup"]', function() {
                var tag;
                var target;
                if($(this).attr('data-cgroup-type') == 1) { //讨论组
                    tag = $('#cDisguss');
                    target = 1;
                } else { //群组
                    tag = $('#cGroup');
                    target = 2;
                }
                var re = tag.find('[required]');
                var arr = tag.serializeArray();
                var isMust = false;
                re.each(function(i) {
                    if(re[i].value.length == 0) {
                        isMust = true;
                    }
                });
                if(isMust) {
                    alert('有必填字段没有填');
                    return;
                }
                var obj = new Object();
                for(i in arr) {
                    obj[arr[i].name] = arr[i].value;
                }
                obj['target'] = target;
               
               
                IM.crateGroup(obj,function(){
                    $('#aboutMore').modal('hide');
                    $('#cGroup input').val('')
                });
                // 保存当前选中群组index
                IM.currentGroupIndex = $('ul.discuss li.active').index()
            });

            $(document).on('click', '[data-button="addToChat"]', function() {
                var contactVal = $('#add_chat').val();
                if(!contactVal){
                    return
                }
                if(!IM.DO_checkContact(contactVal)) { //校验联系人格式
                    return;
                };
                var arr = new Array();
                arr[0] = contactVal.toString();
                var obj = new Object();
                obj['state'] = 2;
                IM.HTML_addChatToList(contactVal, contactVal, IM._contact_type_c, obj, true);
                $('#add_chat').val('');
            });
            $('.normal_chat').on('click', '[data-im-contact]', function(e) {
                var _this = $(this);
                $('.contactList').removeClass('active');
                _this.addClass("active");
                var chatAim = _this.attr("data-im-contact");
                var discuss_name = _this.find('.discuss_name').text()
                _this.find('.noticeQ').remove();
                IM.createP2pChatWindow(chatAim, discuss_name, true);
                IM.typingList.getTyping(chatAim);

               //有草稿时 展示
                IM.msgs = JSON.parse(window.localStorage.getItem('msgs'))||[]
                var message =  IM.chat_window.find('[data-chat-input="chatinput"]').html()
                var msgItem = IM.msgs.find(function(e,index){
                        return e.lastId == chatAim
                    })
                if(msgItem){
                    IM.chat_window.find('[data-chat-input="chatinput"]').html(msgItem.message)
                    $('.discuss.normal_chat').find('[data-im-contact="'+ chatAim +'"]').children('.draft').hide().html('')
                }else{
                    IM.chat_window.find('[data-chat-input="chatinput"]').html('');
                }
                //存草稿
                if( message && IM.lastId ){
                    var index = IM.msgs.findIndex(function(e,index){
                        return e.lastId == IM.lastId
                    })
                    if(index>-1){
                        IM.msgs[index].message = message
                    }else{
                        IM.msgs.push({
                            'lastId':IM.lastId,
                            'message':message
                        })
                    }
                    window.localStorage.setItem('msgs',JSON.stringify(IM.msgs))
                    if(chatAim != IM.lastId){
                        var info =message.length>10? '<em style="color:red;">[草稿]</em> '+ message.substring(0,10)+' ...':'<em style="color:red;">[草稿]</em> '+ message.substring(0,10)
                        $('.discuss.normal_chat').find('[data-im-contact="'+ IM.lastId +'"]').children('.draft').show().html(info)
                    }
                }else if(!IM.hasMsg && IM.lastId){ //删已有草稿
                    var index = IM.msgs.findIndex(function(e,index){
                        return e.lastId == IM.lastId
                    })
                    if(index>-1){
                        IM.msgs.splice(index,1)
                        window.localStorage.setItem('msgs',JSON.stringify(IM.msgs))
                    }
                }
                // 上一个会话人id
                IM.hasMsg = false
                IM.lastId = _this.attr("data-im-contact");
                $('.chat_group_window.rlist').find('.chatting .chats').first().hide() 

                // 阅后即焚图标状态
                var chartId =  IM.chat_window.attr("data-chat-with");
                IM.chartIds =JSON.parse(window.localStorage.getItem('chartIds'))||[]
                if(IM.chartIds.indexOf(chartId)>-1){
                    $('.burnmsg').attr('data-firemsg', true);
                }else{
                    $('.burnmsg').attr('data-firemsg', false);
                }
            });
            $(document).on('keypress', '.char_input', function(e) {
                //enter 发送消息  修改仅此一行 if(e.keyCode == 13 && !e.shiftKey) {
                if(e.keyCode == 13 && !e.shiftKey) {
                    var temporary = $('#temporary');
                    var s = $(this).parents('.chat_group_window');
                    var ht = IM.chat_window.find('[data-chat-input="chatinput"]').html();
                    var receiver = s.attr("data-chat-with").toString();
                    var msgid = new Date().getTime();
                    temporary.html(ht)
                    $(this).html("");
                    temporary.find('img[imtype="content_emoji"]').each(function(e) {
                        var emoji_value_unicode = $(this).attr('emoji_value_unicode');
                        $(this).replaceWith(emoji_value_unicode);
                    });
                    e.preventDefault();//☆阻止元素发生默认行为.阻止enter键回车换行.☆☆最重要一步
                    e.stopPropagation();//阻止事件冒泡
                    var value = IM.DO_pre_replace_content_to_db(temporary.html()).trim().toString();
                    if (value.length === 0) return;
                    var ob = {
                        "content": ht,
                        "isSender": true,
                        "senderName": IM.nickName,
                        "msgType": "1",
                        "chatWindow": IM.currentChat
                    };
                    IM.EV_sendTextMsg(msgid, value, receiver, false, null, ob);
                    // 草稿发送出后，删除本地存储
                    IM.msgs = JSON.parse(window.localStorage.getItem('msgs'))||[]
                    var index = IM.msgs.findIndex(function(e,index){
                        return e.lastId == receiver
                    })
                    if(index>-1){
                        IM.msgs.splice(index,1)
                        window.localStorage.setItem('msgs',JSON.stringify(IM.msgs))
                    }
                    IM.msgGroups = JSON.parse(window.localStorage.getItem('msgGroups'))||[]
                    var index = IM.msgGroups.findIndex(function(e,index){
                        return e.lastGroupId == receiver
                    })
                    if(index>-1){
                        IM.msgGroups.splice(index,1)
                        window.localStorage.setItem('msgGroups',JSON.stringify(IM.msgGroups))
                    }
                };
            });
            // 发送按钮 发送消息
            $(document).on('click', '[data-button="send_msg"]', function(e) {
                var d = IM.chat_window;
                var msgid = new Date().getTime();
                var ht = d.find('[data-chat-input="chatinput"]').html();
                var receiver = d.attr("data-chat-with").toString();
                var temporary = $('#temporary');
                temporary.html(ht)
                temporary.find('img[imtype="content_emoji"]').each(function(e) {
                    var emoji_value_unicode = $(this).attr('emoji_value_unicode');
                    $(this).replaceWith(emoji_value_unicode);
                });
                e.preventDefault();//☆阻止元素发生默认行为.阻止enter键回车换行.☆☆最重要一步
                e.stopPropagation();//阻止事件冒泡
                var value = IM.DO_pre_replace_content_to_db(temporary.html()).trim().toString();
                if (value.length === 0) return;
                var ob = {
                    "content": ht,
                    "isSender": true,
                    "senderName": IM.nickName,
                    "msgType": "1",
                    "chatWindow": IM.currentChat
                };
                IM.EV_sendTextMsg(msgid, value, receiver, false, null, ob);
                // 草稿发送出后，删除本地存储
                IM.msgs = JSON.parse(window.localStorage.getItem('msgs'))||[]
                var index = IM.msgs.findIndex(function(e,index){
                    return e.lastId == receiver
                })
                if(index>-1){
                    IM.msgs.splice(index,1)
                    window.localStorage.setItem('msgs',JSON.stringify(IM.msgs))
                }
                IM.msgGroups = JSON.parse(window.localStorage.getItem('msgGroups'))||[]
                var index = IM.msgGroups.findIndex(function(e,index){
                    return e.lastGroupId == receiver
                })
                if(index>-1){
                    IM.msgGroups.splice(index,1)
                    window.localStorage.setItem('msgGroups',JSON.stringify(IM.msgGroups))
                }
            });

            $(document).on("click", '[data-send="pic"]', function() {
                $('#sendPic').click();
            });
            $(document).on("click", '[data-send="file"]', function() {
                $('#sendFile').click();
            });
            $(document).on("change", '#sendPic', function(e) {
                for(var i=0 ;i<e.target.files.length ; i++){
                    var files = e.target.files[i];
                    var msgid = new Date().getTime();
                    var type = files.type.indexOf("image") > -1 ? "4" : "7";
                    IM.EV_sendfile(msgid, files, type, IM.chat_window.attr("data-chat-with").toString(), false);
                }
                $(this).val("");
            });

            $(document).on("change", '#sendFile', function(e) {
                for(var i=0 ;i<e.target.files.length ; i++){
                    var files = e.target.files[i];
                    var msgid = new Date().getTime();
                    var type = "7";
                    IM.EV_sendfile(msgid, files, type, IM.chat_window.attr("data-chat-with").toString(), false);
                }
                $(this).val("");
            });

            $(document).on("click", "[data-voip='video']", function(e) {
                // var chats = IM.chat_window.attr("data-chat-with");
                // var distance = $('[data-video="distance"]')[0];
                // var local = $('[data-video="local"]')[0];
                // RL_YTX.setCallView(distance, local);
                // IM.currentCallWith = $('[data-video-with]');
                // IM.currentCallWith.attr('data-video-with', chats);
                // IM.sendVoipCall(chats, 1);
                // $('[data-call-type="1"]').show();
                var s = $('#camlist');
                s.css('top', e.pageY + 10);
                s.css('left', e.pageX - 200);
                getDevices_v1(function(e){
                    console.log(e);
                    if(!e||e.value.length<2){
                        IM.sendVideo();
                        return ;
                    }
                    var vlist = "<ul>";
                    for(var i =0 ;i<e.value.length ; i++){
                        // vlist+="<li onclick='IM.sendVideo("+ e.value[i].deviceId +")'>"+e.value[i].label+"</li>";
                        vlist+='<li onclick="IM.sendVideo(\''+ e.value[i].deviceId +'\')">'+(e.value[i].label?e.value[i].label:e.value[i].deviceId)+'</li>';
                    }
                    vlist+="</ul>";

                    s.html(vlist);
                    s.show();
                    $(document).one('click', function(e) {
                        s.hide();
                    })
                });

                function getDevices_v1 (callback) {
                    callback();
                }

            });
            // function sendVideo(deviceId){
            //     var chats = IM.chat_window.attr("data-chat-with");
            //     var distance = $('[data-video="distance"]')[0];
            //     var local = $('[data-video="local"]')[0];
            //     RL_YTX.setCallView(distance, local);
            //     IM.currentCallWith = $('[data-video-with]');
            //     IM.currentCallWith.attr('data-video-with', chats);
            //     IM.sendVoipCall(chats, 1,null,null,deviceId);
            //     $('[data-call-type="1"]').show();
            // }

            // $(document).on("click", "#camlist li", function(e) {
            //     var chats = IM.chat_window.attr("data-chat-with");
            //     var distance = $('[data-video="distance"]')[0];
            //     var local = $('[data-video="local"]')[0];
            //     RL_YTX.setCallView(distance, local);
            //     IM.currentCallWith = $('[data-video-with]');
            //     IM.currentCallWith.attr('data-video-with', chats);
            //     IM.sendVoipCall(chats, 1);
            //     $('[data-call-type="1"]').show();
            // });
            $(document).on("click", "[data-voip='audio']", function(e) {
                var chats = IM.chat_window.attr("data-chat-with");
                IM.currentCallWith = $('[data-call-with="' + chats + '"]');
                IM.createAudioView(chats, true, 0);
                IM.sendVoipCall(chats, 0);

            });
            $(document).on("click", '[data-btn="cancelVoip"]', function(e) {
                // console.log("取消视频呼叫");
                IM.cancelVoipCall();
            });
            $(document).on("click", '[data-btn="shutdownVoip"]', function(e) {
                // console.log("挂断");
                IM.cancelVoipCall();

            });
            $(document).on("click", '[data-btn="acceptVoip"]', function(e) {
                IM.acceptCall();
                return ;
            });
            $(document).on("click", '[data-btn="refuseVoip"]', function(e) {
                // console.log("拒接");
                IM.refuseCall();
            });
            $(document).on("click", '[data-btn="cancelVideo"]', function(e) {
                // console.log("取消视频呼叫");
                IM.cancelVoipCall();
            });
            $(document).on("click", '[data-silence]', function(e) {
                // console.log("关闭声音");
                var f = ($(this).attr("data-silence") == "true")?true:false;
                //RL_Media.deployVideoVoice(f,"audio");
                if(f == false){
                    RL_Media.closeMicrophone();
                }
                if(f == true){
                    RL_Media.openMicrophone();
                }
                $(this).attr("data-silence",!f);
                $(this).html((f?"关闭":"开启")+"麦克风");
            });
            $(document).on("click", '[data-camera]', function(e) {
                console.log("关闭摄像头");
                var f = ($(this).attr("data-camera") == "true")?true:false;
                //RL_Media.deployVideoVoice(f,"video");
                if(f == false){
                    RL_Media.closeCamera();
                }
                if(f == true){
                    RL_Media.openCamera();
                }
                $(this).attr("data-camera",!f);
                $(this).html((f?"关闭":"开启")+"摄像头");
            });

            $(document).on('click', '[data-btn="searchGroup"]', function() {//搜索群按钮事件
                var type = $('#searchWayValue').serializeArray();
                var keyword = $('[data-input="searchGroup"]').val();
                IM.serchGroup(type[0].value, keyword);
            });
            $(document).on('click', '[data-group-manager]', function() {//设为管理员
                var _this = $(this);
                var groupId = $('#group').attr('data-groupid');
                var memberId = _this.attr('data-group-manager');
                var role = _this.parent('[data-group-memberrule]').attr('data-group-memberrule');
                IM.EV_setManager(groupId, memberId.toString(), role == 2 ? 3 : 2, function(role) {
                    _this.html(role == 2 ? '取消管理员' : '设为管理员');
                    _this.parent('[data-group-memberrule]').attr('data-group-memberrule', role);
                });
            });
            $(document).on('click', '[data-group-transfer]', function(e) {//转让群主
                var _this = $(this);
                var groupId = $('#group').attr('data-groupid');
                var memberId = _this.attr('data-group-transfer');
                IM.EV_transferGroup(groupId, memberId, function() {
                    $('[data-group-memberrule="1"]').attr('data-group-memberrule', 3);
                    _this.parent('[data-group-memberrule]').attr('data-group-memberrule', 1);
                    $('[data-group-rule="1"]').attr('data-group-rule', 3);
                    $('#group').attr('data-iscreater', false);
                })
            });
            $(document).on('click', '[data-group-banned]', function(e) {//禁言
                var _this = $(this);
                var groupId = $('#group').attr('data-groupid');
                var memberId = _this.attr('data-group-banned').toString();
                var isBanned = _this.attr('data-group-speakstate') == 1 ? 2 : 1;
                IM.EV_bannedMember(groupId, memberId, isBanned, function() {
                    _this.attr('data-group-speakstate', isBanned);
                    _this.html(isBanned == 1 ? '禁言' : '解禁');
                });
            });
            $(document).on('click', '[data-group-kick]', function(e) {//踢出成员
                var _this = $(this);
                var groupId = $('#group').attr('data-groupid');
                var memberId = _this.attr('data-group-kick');
                IM.EV_kickOutMember(groupId, memberId, function() {
                    _this.parent('[data-group-memberrule]').remove();
                });
            }); 

            $(document).on('click', '[data-btn="dismissgroup"]', function() {//解散群组
                var groupId = $('#group').attr('data-groupid').toString();
                IM.EV_dismissGroup(groupId, function() {
                    $('#group').modal('hide');
                    $('.group_list').find('[data-groupid="' + groupId + '"]').remove();
                });
                // 解散当前的群组时,聊天框复原初始状态
                $('.chat_group_window.rlist').attr('data-chat-with','')
                $('.chat_group_window.rlist').attr('data-chat-type','g')
                IM.chatNickName.html("欢迎使用IM体验demo");
                IM.chatNickName.attr("title","欢迎使用IM体验demo");
                $('.chat_group_window.rlist').find('.chatting .chats').first().show()
                $('.chat_group_window.rlist').find('.chatting .chats').first().siblings().hide()
                IM.chat_window.find('[data-chat-input="chatinput"]').html('');
                // 删除本地草稿
                IM.msgGroups = JSON.parse(window.localStorage.getItem('msgGroups'))||[]
                var index = IM.msgGroups.findIndex(function(e,index){
                    return e.lastGroupId == groupId
                })
                if(index>-1){
                    IM.msgGroups.splice(index,1)
                    window.localStorage.setItem('msgGroups',JSON.stringify(IM.msgGroups))
                    IM.lastGroupId = null;
                }
                
            });
            $(document).on('click', '.expression', function(e) {//表情展示
                var s = $('#eMoji');
                s.css('top', e.pageY - 170);
                s.css('left', e.pageX - 250);
                s.show();
                $(document).one('click', function(e) {
                    s.hide();
                })
            });
            $(document).on('focus', '[data-replace]', function(e) {
                var _this = $(this);
                var val = _this.html();
                IM.focusName = val
            });
            $(document).on('blur', '[data-replace]', function(e) {//修改信息
                var _this = $(this);
                var val = _this.html();
                if(/[\s,<br>]/g.test(val)){
                    val = val.replace(/[\s,<br>]/g,'').replace(new RegExp('&nsp;','g'),'')
                }
                val = val.substring(0,10);
                // 没有修改时，不调接口
                if(IM.focusName==val){
                    return
                }
                _this.html(val);
                var name = _this.attr('data-replace');
                var groupId = $('#group').attr('data-groupid');
                switch(name) {
                    case 'membername'://群成员名称
                        var memberId = _this.parent('[data-group-memberid]').attr('data-group-memberid');
                        IM.EV_setGroupMemberNick(groupId, memberId, val, function(e) {
                        },function(err){
                            console.log(err);
                        });
                        break;
                    case 'groupname'://群组名称
                        IM.EV_setGroupName(groupId, val, function(e) {
                            var t = $('.group_list').find('[data-groupid="' + groupId + '"]');
                            t.attr('data-groupname', val);
                            t.find('.discuss_name').html(val);
                            IM.chatNickName.html(val);
                            IM.chatNickName.attr("title",val);
                        },function(err){
                            console.log(err);
                        });
                        break;
                    case 'declared'://群公告
                        IM.EV_setProclamation(groupId,val,$('#group').find('[data-group="gname"]').html(),function(e){});
                    default:
                        break;
                }
            });
            $(document).on('keydown', '[data-replace]', function(e) {//修改信息
                if(e.keyCode == 13){
                    e.preventDefault();
                    $(this).blur();
                }
            });
            $(document).on('click', '[data-btn="invitemember"]', function(e) { //邀请成员
                var members = $('[data-group="invite"]').val();
                if(members.length === 0)return ;
                var groupId = $('#group').attr('data-groupid');
                var m = members.split(',');
                var needConfirm = false;//是否需要对方同意，一般群组需要同意，而讨论组不需要，默认为讨论组。
                if(IM.group_list[groupId].type == 2){
                    needConfirm = true;//如果邀请对方加入群组，则需要对方同意
                }
                if (m.length == 0){
                    return ;
                }
                IM.EV_inviteMember(groupId, m, needConfirm, function() {
                    $('[data-group="invite"]').tagsinput('removeAll');
                    $.scojs_message("邀请成功", $.scojs_message.TYPE_OK);
                    $('#group').modal('hide');
                });
            });
            $(document).on('click', '[data-btn="quitgroup"]', function(e) { //退出群组
                var gruopId = $('#group').attr('data-groupid').toString();
                IM.EV_quitGroup(gruopId, function() {
                    $('#group').modal('hide');
                    $('.group_list').find('[data-groupid="' + gruopId + '"]').remove();
                });
                // 退出当前的群组时,聊天框复原初始状态
                $('.chat_group_window.rlist').attr('data-chat-with','')
                $('.chat_group_window.rlist').attr('data-chat-type','g')
                IM.chatNickName.html("欢迎使用IM体验demo");
                IM.chatNickName.attr("title","欢迎使用IM体验demo");
                $('.chat_group_window.rlist').find('.chatting .chats').first().show();
                $('.chat_group_window.rlist').find('.chatting .chats').first().siblings().hide();
                IM.chat_window.find('[data-chat-input="chatinput"]').html('');
                // 删除本地草稿
                IM.msgGroups = JSON.parse(window.localStorage.getItem('msgGroups'))||[]
                var index = IM.msgGroups.findIndex(function(e,index){
                    return e.lastGroupId == gruopId
                })
                if(index>-1){
                    IM.msgGroups.splice(index,1)
                    window.localStorage.setItem('msgGroups',JSON.stringify(IM.msgGroups))
                    IM.lastGroupId = null;
                }
            });
            $(document).on('click', '[data-btn="quitdiscuss"]', function(e) { //退出讨论组
                var gruopId = $('#group').attr('data-groupid').toString();
                IM.EV_quitGroup(gruopId, function() {
                    $('#group').modal('hide');
                    $('.group_list').find('[data-groupid="' + gruopId + '"]').remove();
                });
            });

            $(document).on('mouseenter', '[data-autodismiss="true"]', function() { //鼠标滑过关闭消息提示
                $(this).addClass('undock');
            });

            $(document).on('click', '[data-group-refuse]', function() { //拒绝群组邀请
                var _this = $(this);
                var groupId = _this.attr('data-group-refuse');
                var invitor = _this.attr('data-group-invitor').toString();
                IM.EV_processGroupInvite(groupId, invitor, 1, function() {
                    _this.parent().parent().parent().remove();
                },function(){
                    _this.parent().parent().parent().remove();
                });
            });
            $(document).on('click', '[data-group-accept]', function(e) { //接受群组邀请
                var _this = $(this);
                var groupId = _this.attr('data-group-accept');
                var invitor = _this.attr('data-group-invitor').toString();
                IM.EV_processGroupInvite(groupId, invitor, 2, function() {
                    IM.EV_getGroupList();
                    _this.parent().parent().parent().remove();
                },function(e){
                    _this.parent().parent().parent().remove();
                });
            });

            $(document).on('click', '[data-group-confirm]', function(e) { //同意群组申请
                var _this = $(this);
                var groupId = _this.attr('data-group-confirm');
                var member = _this.attr('data-group-invitor').toString();
                IM.EV_confirmInviteJoinGroup(groupId, member, 2, function() {
                    IM.EV_getGroupList();
                    _this.parent().parent().parent().remove();
                },function(){
                    _this.parent().parent().parent().remove();
                });
            });
            $(document).on('click', '[data-group-reject]', function() { //拒绝群组申请
                var _this = $(this);
                var groupId = _this.attr('data-group-reject');
                var member = _this.attr('data-group-invitor').toString();
                IM.EV_confirmInviteJoinGroup(groupId, member, 1, function() {
                    _this.parent().parent().parent().remove();
                },function(e){
                    _this.parent().parent().parent().remove();
                });
            });
            $(document).on('click', '.dialog', function(e) { //点击消息后 撤回按钮出现 与SDK无关事件
                $(this).siblings('.msgBack').toggle();
                console.log('aaaaaa---------------------',$('.contentText a').attr('target'))
            });
            $(document).on('click', '.msgBack', function(e) { //消息撤回
                var _this = $(this).parent('.oneTextR');
                var msgId = _this.attr('data-msgid');
                IM.EV_msgBack(msgId, function(e) {
                    var html = '<div class="historyTime">你撤回了一条消息</div>';
                    _this.replaceWith(html);
                });
            });
            $(document).on('keydown', '[data-chat-type="g"] [data-chat-input="chatinput"]', function(e) { //@消息
                if((e.keyCode ==  64) ||  (e.shiftKey && e.key=='@' && (e.keyCode == 229 ||  e.keyCode == 50))) { //输入@
                    // role = {"1":"群主","2":"管理员","3":"成员"};
                    var groupId = IM.currentChat.attr("data-c-with");
                    IM.getGroupMember(groupId, function(obj) {
                        var html = '';
                        var t = '';
                        for(var i = 0 ; i< obj.length ; i++) {     // 群主可以@所有人， @所有人时传群id :groupId
                            if(obj[i].member == IM.user_account){
                                t = obj[i].role != 3 && obj.length > 2? '<button data-atmember="'+ groupId +'" >@所有人</button>':'';
                            }else{
                                html += '<button data-atmember="'+ obj[i].member +'" >@' + obj[i].nickName + '</button>';
                            }
                        }
                        html = t + html
                        if(html.length == 0) {
                            return;
                        }
                        IM.chat_window.find('.atMsg').html(html);
                        IM.chat_window.find('.atMsg').show();
                        $(document).one('click', function() {
                            IM.chat_window.find('.atMsg').hide();
                        });
                    });
                }
            });
            $(document).on('focus', '[data-chat-type="c"] [data-chat-input="chatinput"]', function(e) { //正在输入状态
                IM.DO_notice(1);
            });
            $(document).on('blur', '[data-chat-type="c"] [data-chat-input="chatinput"]', function(e) { //正在输入状态
                IM.DO_notice(0);
            });

            $(document).on('click', '.atMsg button', function(e) {//@列表点击事件
                var selobj = window.getSelection();
                var pojo = selobj.getRangeAt(0);
                // var s ='@'+ $(this).attr('data-atmember');
                var s = $(this).attr('data-atmember');
                IM._extopts.push(s);
                var text = pojo.endContainer.wholeText;
                if(text.indexOf('@')<0){
                    return ;
                }
                var before = text.slice(0, pojo.endOffset - 1);
                var after = text.slice(pojo.endOffset - 1, text.length);
                pojo.endContainer.data = before + after.replace('@',$(this).text()); // 显示成员名称而不是账号
                // pojo.endContainer.data = before + after.replace('@',s);
                var inputs = IM.chat_window.find('[data-chat-input="chatinput"]')[0];
                inputs.focus();
                var sel = window.getSelection();
                var range = document.createRange();
                range.setStart(inputs, 1);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            });

            $(document).on('click', '[imtype="content_emoji"]', function(e) {//选择表情。
                var unified = $(this).attr('data-emoji-unified');
                var unicode = $(this).attr('data-emoji-unicode');
                IM.choseEmoji(unified, unicode);
            });
            $(document).on('click', '[data-firemsg]', function(e) {// 阅后即焚 （将阅后即焚图标点亮的存到localStorage）
                var chartId =  IM.chat_window.attr("data-chat-with");
                IM.chartIds =JSON.parse(window.localStorage.getItem('chartIds'))||[]
                if($(this).attr('data-firemsg') == 'true') {
                    $(this).attr('data-firemsg', false);
                    var index = IM.chartIds.indexOf(chartId)
                    if(index>-1){
                        IM.chartIds.splice(index,1)
                    }
                } else {
                    $(this).attr('data-firemsg', true);
                    IM.chartIds.push(chartId)
                }
               window.localStorage.setItem('chartIds',JSON.stringify(IM.chartIds))
            });
            $(document).on('click', '[data-msgcontent]', function(e) {//阅后即焚消息展示
                var _this = $(this);
                var _tar = _this.parents().parents().parents('.oneText');
                var msgId = _tar.attr('data-msgid');
                var html = _this.attr('data-msgcontent');
                IM.fireMsgContent.html(Base64.decode(html));
                IM.fireMsgWindow.modal('show');
                IM.EV_deleteReadMsg(msgId,function () {
                    _tar.remove();
                });

            });
            $(document).on('keypress', '#loginByPhone', function(e) {
                var tar = $(this).parent().siblings('button.login');
                if(e.keyCode == 13) {
                    var s = $(this).val();
                    IM.Do_login(tar);
                }
            });
            $(document).on('click', '[data-btn="joinGroup"]', function(e) {
                var $this = $(this);
                var gid = $(this).attr('data-groupid');
                RL_Chat.joinGroup({
                    groupId: gid
                }, function(e) {
                    $this.html("已申请");
                    $this.attr("disabled",true);
                    $this.css("background","#ccc");

                }, function(err) {
                    if(err.code == 590017){
                        $this.html("已在群");
                        $this.attr("disabled",true);
                        $this.css("background","#ccc");
                    }else{
                        console.log(err)
                    }

                });
            });
            $(document).on("click",".logout",function(e){//退出
                console.log("logout");
                IM.DO_logout(true);
            });
            $(document).on("click","[data-takepic]",function(e){//开启拍照功能
                console.log("拍照");
                IM.preTakePicture();
            });
            $(document).on("click","#snap",function(e){//拍照
                console.log("拍照!");
                IM.takePicture();
            });
            $(document).on("click","#snapCancle",function(e){//取消拍照
                console.log("取消拍照");
                IM.cancleTakePicture();
            });
            $(document).on("click",'.refresh',function(e){//手动刷新好友状态
                console.log("refresh");
                IM.EV_getUserState();
            });
            $(document).on("mousedown",'[data-im-contact]',function(e){
                if(e.button == 2){
                    $(this).find('[data-btn]').addClass('btn-show');
                }
            });
            $(document).on("touchmove",'[data-im-contact]',function(e){
                $(this).find('[data-btn]').addClass('btn-show');
            });
            $(document).on("click",'[data-btn="removeCon"]',function(e){
                var tar = $(this).parent('[data-im-contact]');
                tar.remove();
                IM.deleteContactMember(tar.attr("data-im-contact"));
                //  删除当前联系人时  聊天框复原
                $('.chat_group_window.rlist').attr('data-chat-with','')
                $('.chat_group_window.rlist').attr('data-chat-type','c')
                IM.chatNickName.html("欢迎使用IM体验demo");
                IM.chatNickName.attr("title","欢迎使用IM体验demo");
                $('.chat_group_window.rlist').find('.chatting .chats').first().siblings().hide()
                $('.chat_group_window.rlist').find('.chatting .chats').first().show()
                IM.chat_window.find('[data-chat-input="chatinput"]').html('');
                // 删除本地草稿
                IM.msgs = JSON.parse(window.localStorage.getItem('msgs'))||[]
                var index = IM.msgs.findIndex(function(e,index){
                    return e.lastId == tar.attr("data-im-contact")
                })
                if(index>-1){
                    IM.msgs.splice(index,1)
                    window.localStorage.setItem('msgs',JSON.stringify(IM.msgs))
                    IM.lastId = null;
                }
            });
            $(document).on("click",function(e){
                $('.btn-show').removeClass('btn-show');
            });
            $(document).on("click",'[data-btn="groupNotice"]',function(e){
                var groupId = IM.chat_window.attr('data-chat-with');
                if($(this).hasClass('checked')){
                    IM.group_list[groupId].isNotice = 2;
                    IM.EV_setGroupNotice(groupId,2);
                }else{
                    IM.group_list[groupId].isNotice = 1;
                    IM.EV_setGroupNotice(groupId,1);
                }
            });
            $(document).on("click",'[data-btn="reAt"]',function(e){
                var s = $(this).html();
                document.querySelector('[data-chat-input="chatinput"]').innerHTML += s;
            });
            // EV_msgRead
            $(document).on("click",'[data-msgread="true"]',function(e){
                var _this = $(this);
                if(_this.find('[data-msgcontent]').length>0){
                    return ;
                }
                var version = _this.attr('data-msgid').split('|')[1];
                IM.EV_msgRead(version,function () {
                    _this.attr('data-msgread',false);
                })
            });
            $(document).on("mousedown",'[data-drop="true"]',IM.mouseStart);

            //消息置顶  —— 设置消息置顶事件
            $(document).on("dblclick",'[data-list="chat"] .contactList',function () {
                console.log(e);
                var _this = $(this);
                var user = $(this).attr("data-im-contact");
                if(user){
                    IM.EV_SetTopContact(user,function () {
                        _this.appendTo($('.contact_top'));
                    });
                }
            });
            //消息置顶  —— 取消消息置顶事件
            $(document).on("dblclick",'.contact_top .contactList',function () {
                console.log(e);
                var user = $(this).attr("data-im-contact");
                var _this = $(this);
                if(user){
                    IM.EV_CancelTopContact(user,function () {
                        _this.appendTo($('[data-list="chat"]'));
                    });
                }
            });
        },
        mouseStart :function (e) {
            var way = $(this).css("position") === "static";
            if(way){
                $(this).css("position","absolute");
            }
            var le= parseInt($(this).css("left").split("px")[0]);
            var to = parseInt($(this).css("top").split("px")[0]);
            var reLe = e.clientX;
            var reTo = e.clientY;

            var tar = $(this);
            $(window).on("mousemove",function (a) {
                tar.css("top",to+(a.clientY - reTo));
                tar.css("left",le+(a.clientX - reLe));
            });
            $(window).on("mouseup",function (a) {
                $(this).off("mousemove");
            });
        },
        processScroll:function(e ,b){
            var rest = null;
            var scrollTop = 0;
            var offHeight = 0;
            if(b){
                scrollTop =e.scrollTop;
                rest = $(e).find("[data-msgread=\"true\"]")
                offHeight = e.offsetHeight;
            }else{
                scrollTop = e.currentTarget.scrollTop;
                rest = $(this).find("[data-msgread=\"true\"]");
                offHeight = e.offsetHeight;
            }
            rest.each(function () {
                var _this = $(this);
                if(this.offsetTop>scrollTop && this.offsetTop < (scrollTop+ offHeight+100) ||scrollTop<offHeight){
                    var v = $(this).attr("data-msgid").split('|')[1]+""
                    IM.EV_msgRead(v,function () {
                        console.log("已读------------------------v",v);

                    });
                    _this.attr("data-msgread",false);
                }

            });

        },
        /**
         * @param msgId 消息id
         * @param file 文件對象
         * @param type 消息类型
         * @param receiver 接收者
         * @param 是否是重发消息
         * */
        EV_sendfile: function(msgId, file, type, receiver) {
            console.log('send Attach message: type[' + type + ']...receiver:[' + receiver + ']');
            var urls = window.URL.createObjectURL(file);
            var msgDiv = {};
            if(type == '7') {
                msgDiv["msgFileName"] = file.name;
                msgDiv["msgFileSize"] = (file.size/1024).toFixed(2);
                msgDiv["msgFileUrl"] = urls;
            }
            msgDiv["msgFileUrl"] = urls;
            msgDiv["isSender"] = true;
            msgDiv["senderName"] = IM.nickName;
            msgDiv["msgType"] = type;
            msgDiv["chatWindow"] = IM.currentChat;
            msgDiv['msgId'] = 'T' + new Date().getTime() + parseInt(Math.random() * 10000).toString();
            type = parseInt(type);
            var objNew = {
                file:file,
                type:type,
                receiver:receiver,
                sig: '2B9C64616C98A93F1375BF0A2F6429E7'
            };
            if(IM.chat_window.find('[data-firemsg]').attr('data-firemsg') == 'true') {
                objNew.domain = 'fireMessage';
                msgDiv.domain = 'fireMessage';
            }
            this.addMsgToChatWindow(msgDiv);
            var fffff = file.name;
            var indexMsgId = RL_Chat.sendMsg(objNew, function(e) {
                //发送成功
                indexMsgId = e.msgClientNo || indexMsgId
                $('[data-msgid=' + msgDiv.msgId + ']').attr('data-msgid', indexMsgId);
            }, function(e) { //失败回调
                indexMsgId = e.msgClientNo || indexMsgId
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                $('[data-msgid=' + msgDiv.msgId + ']').addClass('msgError');
                $('[data-msgid=' + msgDiv.msgId + ']').attr('title','发送文件失败');
                $('[data-msgid=' + msgDiv.msgId + ']').attr('data-msgid', indexMsgId && indexMsgId.split('|')[1]);
            }, function(e) { //发送进度
                console.log(parseInt(e / file.size * 100) + '%');
            });
        },
        DO_checkContact: function(contactVal) { //添加联系人校验
            if(!contactVal) {
                IM.HTML_showAlert('alert-warning', '请填写联系人');
                return false;
            } else if(contactVal.length > 64) {
                IM.HTML_showAlert('alert-error', '联系人长度不能超过64');
                return false;
            }
            if('g' == contactVal.substr(0, 1)) {
                IM.HTML_showAlert('alert-error', '联系人不能以"g"开始');
                return false;
            }

            if(contactVal.indexOf("@") > -1) {
                var regx2 = /^([a-zA-Z0-9]{32}#)?[a-zA-Z0-9_-]{1,}@(([a-zA-z0-9]-*){1,}.){1,3}[a-zA-z-]{1,}$/;
                if(regx2.exec(contactVal) == null) {
                    IM.HTML_showAlert('alert-error',
                        '检查邮箱格式、如果是跨应用再检查应用Id长度是否为32且由数字或字母组成）');
                    return false;
                }
            } else {
                var regx1 = /^[A-Za-z0-9._-]+$/; // /^[a-zA-Z\u4e00-\u9fa5]+$/满足大小写字母数字和ascii码值;
                if(regx1.exec(contactVal) == null) {
                    IM.HTML_showAlert('alert-error',
                        '只能是数字字母点下划线');
                    return false;
                }
            }
            return true;
        },
        EV_sendTextMsg: function(oldMsgid, text, receiver, isresend, type, ms) {
            console.log('send Text message: receiver:[' + receiver + ']...connent[' + text + ']...');
            var data = {
                content: text,
                type: 1,
                receiver: receiver
            };
            console.log('IM._extopts------------------------1',IM._extopts)
            if(IM._extopts.length > 0) {
                data.atAccounts = IM._extopts;
                data.type = 26;
            }
            if(!!type) {
                data.type = type;
            }
            if(IM.chat_window.find('[data-firemsg]').attr('data-firemsg') == 'true' && receiver.substring(0,1) != 'g') {
                data.domain = 'fireMessage';
               if(ms){
                ms.domain = 'fireMessage';
               }
            }
            console.log('data-------------',data)
            var msgId = RL_Chat.sendMsg(data, function(obj) {
                if(!ms){
                    return ;
                }
                ms['msgId'] = msgId;
                IM.addMsgToChatWindow(ms);
                IM.chat_window.find('[data-chat-input="chatinput"]').empty();
            }, function(obj) {
                setTimeout(function() { //断线的时候如果不延迟会出现找不到标签的情况，延迟0.3秒可解决。
                    if(obj.code == 580023){
                        console.log("@消息中有非群组用户");
                        var tr = $('[data-msgid="'+ msgId+'"]');
                        tr.addClass('msgError');
                        tr.attr('title',"@消息中有非群组用户");
                    }else if(obj.code == 580010){
                        console.log("您已被禁言");
                        var tr = $('[data-msgid="'+ msgId+'"]');
                        tr.addClass('msgError');
                        tr.attr('title',"已被禁言");
                        $.scojs_message('已被禁言');
                    }else if(obj.code == 170001){
                        console.log("发送消息内容超长，请分条发送");
                        var tr = $('[data-msgid="'+ msgId+'"]');
                        tr.addClass('msgError');
                        tr.attr('title',"发送消息内容超长，请分条发送");
                        $.scojs_message(obj.code + ' : ' + obj.msg, $.scojs_message.TYPE_ERROR);
                    }else if(obj.code == 174002){
                        console.log("错误码： " + obj.code + "; 错误描述：" + obj.msg);
                        var tr = $('[data-msgid="'+ msgId+'"]');
                        tr.addClass('msgError');
                        tr.attr('title',"错误码： " + obj.code + "; 错误描述：" + obj.msg);
                    }else{
                        var tr = $('[data-msgid="'+ msgId+'"]');
                        tr.addClass('msgError');
                        tr.attr('title',"错误码： " + obj.code + "; 错误描述：" + obj.msg);
                        console.log(obj.code + ' : ' + obj.msg);
                        $.scojs_message(obj.code + ' : ' + obj.msg, $.scojs_message.TYPE_ERROR);
                    }
                }, 300)
            });
            IM._extopts = [];
        },
        DO_pre_replace_content_to_db: function(str) {
            console.log('strstrstrstr-00-------1',str)
            str = str.replace(/<[^>]+>/g, '\r\n');
            // str = str.replace(/\u000A+/g, '\u000D');
            str = str.replace(new RegExp("<\\s*img\\s+([^>]*)\\s*>"),''); // 去掉所有的html标记
            // str = str.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&nbsp;/g,' ');
            if('\u000D' == str) {
                str = '';
            }
            return str;
        },
        showGroupInfo: function(tar) {
            var gid = this.currentChat.attr("data-c-with");
            var groupTar = $('#group');
            $('[data-group="invite"]').tagsinput('removeAll'); 
            RL_Chat.getGroupDetail({
                groupId: gid
            }, function(obj) {
                console.log('getGroupDetail--------------------',obj)
                var memberRole = 3;//默认为群众
                var groupType = obj.type;//0是群组，1是讨论组
                groupTar.find('[data-show="gid"]').html(gid);//群ID
                tar.attr('data-groupid', gid);//群ID
                tar.attr('data-grouptype', obj.target);//群组类型
                tar.find('[data-group="gname"]').html(obj.groupName); //群组名称
                var creator = obj.creator; //  群主
                if(IM.user_account == creator) { //是群主
                    tar.find('[data-group-rule]').attr('data-group-rule', '1'); //设置为群主
                    tar.attr('data-member', '1');
                    memberRole = 1;//角色为群主
                    groupTar.find('[contenteditable="false"]').attr('contenteditable',true);
                    // if(obj.target == 1 && memberRole == 3){
                    //    groupTar.find('[contenteditable="true"]').attr('contenteditable',false);//讨论组不可修改名片
                    // }else{
                    //    groupTar.find('[contenteditable="false"]').attr('contenteditable','true');
                    // }
                } else { //
                    tar.find('[data-group-rule]').attr('data-group-rule', '3'); //设置为成员
                    tar.attr('data-member', '3');
                    if(obj.type == 1){
                        groupTar.find('[contenteditable="false"]').attr('contenteditable',true);
                    }else{
                        groupTar.find('[contenteditable="true"]').attr('contenteditable',false);
                    }
                }
                tar.find('.affiche').html(obj.declared ? obj.declared : ('这个管理员很懒,什么都没写')); //讨论组公告
                if(obj.isNotice == 1) {
                    tar.find('label[name="isnotice"]').removeClass('checked');
                } else {
                    tar.find('label[name="isnotice"]').addClass('checked');
                }
                IM.getGroupMember(gid, function(memb) {
                    console.log('getGroupMember-----------memb',memb)
                    var html = '';
                    var multiArr = [];
                    for(var i =0 ;i<memb.length ;i++) {
                        if(memb[i].member == IM.user_account && memb[i].role == 2) { //判断是不是管理员
                            tar.find('[data-group-rule]').attr('data-group-rule', '2');
                            tar.attr('data-member','2');
                            memberRole = 2;
                            groupTar.find('[contenteditable="false"]').attr('contenteditable',true);
                        }
                        if (memb[i].member != IM.user_account && multiArr.length < 2 && (memberRole == 1 || (memberRole != 1 && memb[i].role == 3))) {
                          multiArr.push(memb[i].member);
                        }
                    }
                    if (memberRole !== 3) {
                      $("#multi-choose-wrapper").css('display', 'block');
                      var groupId = $('#group').attr('data-groupid');
                      $(".cancel-M").click(function() {
                        IM.EV_setManager(groupId, null, 3, function(role) {
                            for (var i = 0; i < multiArr.length; i++) {
                                $("[data-group-manager='"+multiArr[i]+"']").html('设为管理员').parent().attr('data-group-memberrule', role)
                            }
                        }, multiArr);
                      });
                      $(".set-M").click(function() {
                        IM.EV_setManager(groupId, null, 2, function(role) {
                          for (var i = 0; i < multiArr.length; i++) {
                            $("[data-group-manager='"+multiArr[i]+"']").html('取消管理员').parent().attr('data-group-memberrule', role)
                          }
                        }, multiArr);
                      })
                      $(".cancel-N").click(function() {
                        IM.EV_bannedMember(groupId, null, 1, function() {
                          for (var i = 0; i < multiArr.length; i++) {
                            $("[data-group-banned='"+multiArr[i]+"']").html('禁言').parent().attr('data-group-speakstate', 1)
                          }
                        },multiArr);
                      });
                      $(".set-N").click(function() {
                        IM.EV_bannedMember(groupId, null, 2, function() {
                          for (var i = 0; i < multiArr.length; i++) {
                            $("[data-group-banned='"+multiArr[i]+"']").html('解禁').parent().attr('data-group-speakstate', 2)
                          }
                        },multiArr);
                      })
                    }
                    for(var i =0 ;i<memb.length ;i++) {
                        html += '<li ' + 'data-group-memberrule="' + memb[i].role + '" data-group-memberid="' + memb[i].member + '">' +
                            '<img src="img/head_portrait/headerX40.png">' +
                            '<p class="cg_name" data-inline="replace" data-replace="membername" contenteditable="'+ (((memb[i].role>memberRole) && (obj.type!=1) ||(memb[i].member == IM.user_account)) ?true:false) +'">' + memb[i].nickName + ((multiArr.indexOf(memb[i].member) > -1 && memberRole !== 3) ? '-set' : '') + '</p>' +
                            '<button class="kick" data-group-kick="' + memb[i].member + '">踢出</button>' +
                            '<button class="banned" data-group-banned="' + memb[i].member + '" data-group-speakstate="' + memb[i].speakState + '">' + (memb[i].speakState == 1 ? '禁言' : '解禁') + '</button>' +
                            '<button class="transfer" data-group-transfer="' + memb[i].member + '">转让</button>' +
                            '<button class="manager" data-group-manager="' + memb[i].member + '">' + ((memb[i].role == 2 && creator) ? '取消管理员' : '设为管理员') + '</button>' +
                            '</li>';
                    }
                    tar.find('[data-group-rule]').html(html);
                });
                groupTar.attr('data-iscreater', IM.user_account == obj.creator);
                groupTar.modal('show');
                popDrag('groupPopDrag')
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        getGroupMember: function(gid, callback) {
            RL_Chat.getGroupMemberList({
                groupId: gid
            }, function(obj) {
                callback(obj);
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        testH5: function() {

        },
        checkLoginNum: function(e) {
            var target = $(e);
            if(this._login_error_show) {
                this._login_error_show = false;
                target.parents().siblings(".error").hide();
            }
            target.val(target.val().replace(/[^0-9a-zA-Z@.\-_]$/, ''));
        },
        Do_login_byVoip: function() {
            this.login_type = 3;
            var voip_account = $("#voip_account").val();
            var pwd = $('#voip_pwd').val();
            this.getSig(voip_account, pwd);
        },
        Do_login: function(tar) {
            this.login_type = 1;
            var val = $('#loginByPhone').val();
            var _this = $(tar);
            if(val.length == 0) {
                _this.siblings('.error').show();
                this._login_error_show = true;
                return;
            }
            this.getSig(val);
        },
        DO_logout: function(needLogout) {
            $("#login").modal("show");
            for(var i in IM.chat_maps){
                IM.chat_maps[i].remove();
            }
            if(IM.isCalling){
                $('[data-btn="cancelVideo"]').click();
                $('[data-btn="cancelVoip"]').click();
                $('[data-btn="shutdownVoip"]').click();
                $('[data-btn="refuseVoip"]').click();

            }
            IM.chat_maps = {};
            clearInterval(IM.userStateInterval);
            $('.group_list .discuss').empty();
            $('.chat_list .normal_chat').empty();
            $('.contact_list .normal_chat').empty();
            $('.modal.fade.in').each(function () {
                if($(this).attr('id') == 'login'){
                }else{
                    $(this).modal('hide');
                }
            });
            IM.contactMember = null;
            IM.group_list = {};
            IM.chatNickName.html("欢迎使用IM体验demo");
            IM.chatNickName.attr("title","欢迎使用IM体验demo");
            IM.currentChat = $('[data-window-type="chat"]').find('.chats');
            IM.chat_window.attr('data-chat-with',null);
            IM.chat_window.attr('data-chat-type','n');
            IM.chat_window.find('.chats').show();
            IM.currentChat = $('[data-window-type="chat"]').find('.chats');
            IM.contacts = {};
            IM.user_account= null;
            IM.username = null;
            IM.userStateInterval = null;
            IM.is_online = false;
            $('.nav .contacts').click();
            if(!needLogout){
                return ;
            }
            RL_YTX_NEW.logout(function(){

            },function(err){
                console.log(err);
            })
        },
        getSig: function(account_number, pwd) {
            var pass = pwd ? pwd : "";
            var timestamp = this.getTimeStamp();
            if(IM.flag) {
                this.privateLogin(account_number, timestamp, function(obj) {
                    IM.EV_login(account_number, pass, obj.sig, timestamp);
                }, function(obj) {
                    alert("错误码：" + obj.code + "; 错误描述：" + obj.msg);
                });
            } else {
                //仅用于本地测试，官方不推荐这种方式应用在生产环境
                //没有服务器获取sig值时，可以使用如下代码获取sig
                console.log("--------------------")
                console.log(this._appid);
                console.log(account_number);
                console.log(timestamp);
                console.log(this._appToken);
                console.log("--------------------")
                var sig = hex_md5(this._appid + account_number + timestamp + this._appToken);
                console.log("本地计算sig：" + sig);
                this.EV_login(account_number, pass, sig, timestamp);
            }
        },
        privateLogin: function(user_account, timestamp, callback, onError) {
            console.log("privateLogin");
            var data = {
                "appid": this._appid,
                "username": user_account,
                "timestamp": timestamp
            };
            // var url = this._3rdServer + 'genSig';
            var url = this._3rdServer ;
            $.ajax({
                type: "GET",
                url: url,
                dataType: 'jsonp',
                data: data,
                contentType: "application/x-www-form-urlencoded",
                jsonp: 'cb',
                success: function(result) {
                    if(result.code != "000000") {
                        var resp = {};
                        resp.code = result.code;
                        resp.msg = "Get SIG fail from 3rd server!...";
                        onError(resp);
                        return;
                    } else {
                        var resp = {};
                        resp.code = result.code;
                        resp.sig = result.sig;
                        callback(resp);
                    }
                },
                error: function(e) {
                    var resp = {};
                    console.log(e);
                    resp.msg = 'Get SIG fail from 3rd server!';
                    onError(resp);
                },
                timeout: 5000
            });
        },
        getTimeStamp: function() {
            var now = new Date();
            var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? "" + (now.getMonth() + 1) : "0" + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());
            return timestamp;
        },
        EV_login: function(user_account, pwd, sig, timestamp) {
            console.log("EV_login");
            var data = {
                type: this.login_type,
                userName: user_account,
                timestamp:timestamp
            }
            if(1 == this.login_type) { //1是自定义账号，2是voip账号
                data.sig = sig
            } else {
                data.password = pwd
            }
            RL_YTX_NEW.login(data, function(obj) {
                IM.user_account = user_account;
                IM.is_online = true;
                console.log("EV_login succ...");
                $('#login').modal('hide');
                $('#userAcc').val(user_account);
                IM.setContactMember();
                // RL_AV.init({
                //   mwsgServer: ip.mwsgServer
                // });
                // RL_Chat.uploadUserDeviceDetail({
                //   appVersion: '5.4.0',
                //   ip: returnCitySN["cip"],
                //   location: returnCitySN["cname"]
                // }, function(res) {
                //   console.log('uploadUserDeviceDetail success---',res);
                // }, function(err) {
                //   console.log('uploadUserDeviceDetail fail---',err);
                // });

                //登陆后拉取个人信息
                IM.EV_getPersonalInfo();
                // 登录后拉取群组列表
                IM.EV_getGroupList();
                //登陆后从本地获取联系人列表
                // 注册PUSH监听
                IM._onMsgReceiveListener = RL_Chat.onMsgReceiveListener(
                    function(obj){
                        setTimeout(function(){
                            IM.EV_onMsgReceiveListener(obj)
                        },1000)
                    }
                );
                // 注册群组通知事件监听
                IM._noticeReceiveListener = RL_Chat.onNoticeReceiveListener(
                    function(obj) {
                        IM.EV_noticeReceiveListener(obj);
                    });

                // 服务器连接状态变更时的监听
                IM._onConnectStateChangeLisenter = RL_YTX_NEW.onConnectStateChangeLisenter(function(obj) {
                    // obj.code;//变更状态 1 断开连接 2 重连中 3 重连成功 4 被踢下线 5 断开连接，需重新登录
                    // 断线需要人工重连
                    if(IM.isCalling){
                        $('[data-btn="cancelVideo"]').click();
                        $('[data-btn="cancelVoip"]').click();
                        $('[data-btn="shutdownVoip"]').click();
                        $('[data-btn="refuseVoip"]').click();
                    }
                    if(1 == obj.code) {
                        console.log('onConnectStateChangeLisenter obj.code:' + obj.msg);
                    } else if(2 == obj.code) {
                        $.scojs_message('网络状况不佳，正在试图重连服务器', $.scojs_message.TYPE_ERROR);
                        $("#pop_videoView").hide();
                    } else if(3 == obj.code) {
                        $.scojs_message('连接成功', $.scojs_message.TYPE_OK);
                    } else if(4 == obj.code) {
                        IM.DO_logout(false);
                        $.scojs_message(obj.msg, $.scojs_message.TYPE_ERROR);
                    } else if(5 == obj.code) {
                        $.scojs_message('网络状况不佳，正在试图重连服务器', $.scojs_message.TYPE_ERROR);
                        IM.getSig(IM.user_account);
                    } else {
                        console.log('onConnectStateChangeLisenter obj.code:' + obj.msg);
                    }
                });
                
                var membs = IM.getContactMember();
                    console.log('membs----------------',membs)
                for(i in membs){
                    var obj = membs[i];
                    IM.HTML_addChatToList(i, membs[i].conName, IM._contact_type_c, null, false);
                }
                /*音视频呼叫监听
                 obj.callId;//唯一消息标识  必有
                 obj.caller; //主叫号码  必有
                 obj.called; //被叫无值  必有
                 obj.callType;//0 音频 1 视频 2落地电话
                 obj.state;//1 对方振铃 2 呼叫中 3 被叫接受 4 呼叫失败 5 结束通话 6 呼叫到达
                 obj.reason//拒绝或取消的原因
                 obj.code//当前浏览器是否支持音视频功能
                 */
                IM._onCallMsgListener = RL_Media.onCallMsgListener(
                    function(obj) {
                        IM.EV_onCallMsgListener(obj);
                    });
                // IM.autoGetUserState();//设置自动获取在线状态
                IM._onMsgNotifyReceiveListener = RL_Chat.onMsgNotifyReceiveListener(function(obj) {
                    if(obj.msgType == 21) { //阅后即焚：接收方已删除阅后即焚消息
                        console.log("接收方已删除阅后即焚消息obj.msgId=" + obj.msgId);
                        // var id = obj.sender + "_" + obj.msgId;
                        $('[data-msgid="'+obj.msgId+'"]').remove();
                        $('[data-msgid="'+obj.msgId.split('|')[1]+'"]').remove();
                    }
                });
                //消息置顶  —— 设置消息置顶
                /**
                 * @param callback 成功回调  回调函数传入数组对象
                 * */
                IM.EV_GetTopContact(function (arr) {
                    if(arr && arr.length > 0){
                        for(var i =0 ; i<arr.length ; i++){
                            $('[data-list="chat"] [data-im-contact="'+ arr[i] +'"]').appendTo($('.contact_top'));
                        }
                    }
                });
            }, function(obj) {
                $.scojs_message("错误码： " + obj.code + "; 错误描述：" + obj.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        autoGetUserState: function(){
            if(IM.userStateInterval){
                return ;
            }
            IM.userStateInterval = setInterval(function(){
                IM.EV_getUserState();
            },30000);
        },

        /**
         * 将正在输入放到一个map里统一管理，原因是由于聊天窗是同一个，无法同时保存所有人的输入状态，
         * */
        typeingTarget :null,
        typingList :function () {
            var t =   function () {
                this.list = {};
                this.timeouts = {};
                this.status = {
                    '0':'',
                    '1':'对方正在输入',
                    '2':'对方正在录音'
                };
                this.setTyping = function (sender,type) {
                    if(type == 0){
                        delete  this.list[sender];
                    }else{
                        this.list[sender] = this.status[type];
                        if(this.timeouts[sender]){
                            clearTimeout(this.timeouts[sender]);
                            delete this.timeouts[sender];
                        }
                        var _this = this;
                        this.timeouts[sender] = setTimeout(function () {
                            _this.onTypingListChange(sender, 0);
                        },2*1000*60);
                    }
                    this.onTypingListChange(sender, type);
                };
                this.getTyping = function (sender) {
                    if(this.list[sender]){
                        // return this.status[this.list[receiver]];
                        IM.typeingTarget.innerHTML = this.list[sender];
                    }else{
                        IM.typeingTarget.innerHTML = '';
                    }
                };
                this.onTypingListChange = function (sender,type) {
                    if(IM.currentChat.attr('data-c-with') == sender){
                        IM.typeingTarget.innerHTML = this.status[type];
                    }
                }


            };
            return new t();
        },

        EV_onMsgReceiveListener: function(obj) {
            console.log('------------------------obj',obj)
            console.log('Receive message sender:[' + obj.msgSender + ']...msgId:[' + obj.msgId + ']...content[' + obj.msgContent + ']');
            if(obj.msgType === 12 || obj.msgType === 13){
                return ;
            }
            if(!!obj.msgContent) {
                obj.msgContent = emoji.replace_unified(obj.msgContent);
            }
            if(obj.msgType == IM._transfer) {
                if(obj.msgDomain == 1) {
                    IM.typingList.setTyping(obj.msgSender,1);
                } else if(obj.msgDomain == 0) {
                    IM.typingList.setTyping(obj.msgSender,0);
                } else if(obj.msgDomain == 2) {
                    IM.typingList.setTyping(obj.msgSender,2);
                }
                return;
            }

            if(obj.msgType == IM._msgBack) { //消息撤回消息
                var operate = JSON.parse(obj.msgDomain);
                var version = operate.version;
                var dateCreated = operate.dateCreated;
                IM.deleteMsg(dateCreated + '|' + version);
                IM.DO_deskNotice(obj.msgSender, obj.senderNickName, '撤回了一条消息',1,false,false,'',false);
                return;
            }
            if(obj.msgType == 24){//消息已读
                var objdomain = JSON.parse(obj.msgDomain);
                if(objdomain.groupid && IM.chat_maps[objdomain.groupid]){
                    var targets = IM.chat_maps[objdomain.groupid].find('[data-msgid="'+objdomain.dateCreated+'|'+objdomain.version+'"]').find('.msgread');
                    if(targets.length==0){
                        targets = IM.chat_maps[objdomain.groupid].find('[data-msgid="'+objdomain.msgId+'"]').find('.msgread');
                    }
                    if(targets.html() == '未读'){
                        targets.html('<b>1</b>人已读');
                    }else{
                        targets.html('<b>'+(parseInt(targets.find("b").html())+1) +'</b>人已读');
                    }
                }else if(IM.chat_maps[obj.msgSender]){
                    IM.chat_maps[obj.msgSender].find('[data-msgid="'+objdomain.msgId+'"]').find('.msgread').html('已读');
                }
                return ;
            }
            if(obj.msgSender === "10089"){
                obj.senderNickName = "系统消息";
            }



            /**
             * @param obj.isSender   发送方是否为当前账号
             * @param obj.senderName 消息发送方昵称
             * @param obj.msgType    消息类型（1：文本消息  4:图片消息）
             * @param obj.content    消息内容（）
             *
             * */
            var b_isGroupMsg = ('g' == obj.msgReceiver.substr(0, 1)); //获取接收者是否为群组消息
            var isatMsg = false;
            var firemsg = false;
            // 播放铃声前，查看是否是群组，如果不是直接播放，如果是查看自定义提醒类型，根据类型判断是否播放声音
            if(b_isGroupMsg) { //判断是否为群组  如果不是群组  则创建p2p消息聊天窗口
                var rece = IM.group_list[obj.msgReceiver];
                if(obj.msgType == 11){
                    obj.msgContent = '<a data-btn="reAt"> '+ obj.msgContent +'</a>';
                }
                if(rece){//如果这个群组在左侧列表中
                    var isNotice = rece.isNotice;
                    if(1 == isNotice) {
                        document.getElementById('im_ring').play();
                    }
                }else{
                    IM.createGroupChatWindow(obj.msgReceiver, false);
                }
                //接收消息不是当前窗口，需要添加窗口及增加数字提示

                var msgDiv = {};
                msgDiv["isSender"] = obj.msgSender === IM.user_account;
                msgDiv["senderName"] = obj.senderNickName || obj.msgSender;
                msgDiv["msgType"] = obj.msgType;
                if(obj.msgType == 4 ||obj.msgType == 7 || obj.msgType == 3 ){
                    msgDiv["msgFileUrl"] = obj.msgFileUrl;
                    msgDiv["msgFileName"] = obj.msgFileName;
                    msgDiv["msgFileSize"] = obj.msgFileSize;
                }else{
                    msgDiv["content"] = obj.msgContent;
                }
                msgDiv["msgId"] = obj.msgId;
                if(!IM.chat_maps[obj.msgReceiver]) {
                    IM.createGroupChatWindow(obj.msgReceiver, false);
                }
                msgDiv["isAtMsg"] = obj.isAtMsg;
                msgDiv["chatWindow"] = IM.chat_maps[obj.msgReceiver];
                if(obj.msgType === 2){
                    RL_Chat.getAudioSource(obj.msgFileUrl,function (res) {
                        if(!IM.chat_maps[obj.msgSender]) {
                            IM.createGroupChatWindow(obj.msgSender, false);
                        }
                        msgDiv["msgType"] = obj.msgType;
                        msgDiv["msgId"] = obj.msgId;
                        msgDiv["msgFileUrl"] = res.url;
                        msgDiv["chatWindow"] =  IM.chat_maps[obj.msgReceiver];
                        IM.addMsgToChatWindow(msgDiv);
                    },function (err) {
                        console.log(err);
                    });
                    return ;
                }
                if(obj.msgType == 6) {
                    msgDiv["msgFileName"] = obj.msgFileName;
                    msgDiv["msgFileSize"] = obj.msgFileSize;
                    RL_Chat.getFileSource(obj.msgFileUrl, function(e) {
                        console.log('解压缩附件完成');
                        msgDiv["msgFileUrl"] = e.url;
                        msgDiv["msgType"] = 7;
                        msgDiv["download"] = obj.msgFileName;
                        IM.addMsgToChatWindow(msgDiv);
                        if(IM.currentChat.attr('data-c-with') !=obj.msgReceiver){
                            var o = $('[data-groupid="' + obj.msgReceiver + '"]');
                            var i = o.find(".noticeQ");
                            if(i.length == 0) {
                                o.find('.discuss_name').after('<span class="noticeQ">' + 1 + '</span>');
                            } else {
                                o.find('.noticeQ').html(parseInt(o.find('.noticeQ').html()) + 1);
                            }
                        }
                        return ;
                    }, function() {
                        console.log('解压缩失败');
                    });
                    return ;
                }
                IM.addMsgToChatWindow(msgDiv);
                if(IM.currentChat.attr('data-c-with') !=obj.msgReceiver){
                    var o = $('[data-groupid="' + obj.msgReceiver + '"]');
                    var i = o.find(".noticeQ");
                    // 群消息是否免打扰
                    if(1 == isNotice){
                        if(i.length == 0 ) {
                            o.find('.discuss_name').after('<span class="noticeQ">' + 1 + '</span>');
                        } else {
                            o.find('.noticeQ').html(parseInt(o.find('.noticeQ').html()) + 1);
                        }
                    }else{
                        if(i.length == 0 ) {
                            o.find('.discuss_name').after('<span class="noticeQ Notice"></span>');
                        }
                    } 
                    //   user_account 
                    if(obj.msgContent.indexOf(IM.username)>-1 || obj.msgContent.indexOf('@所有人')>-1){  
                        isatMsg = true;
                        if(!o.find('.hasAt').text()){
                            console.log('o------------------------------html 没有渲染出来',o.find('.discuss_name').text())
                            o.find('.discuss_name').after('<span class="hasAt">有人@你</span>');   
                        }
                    }
                }
            } else { //单人聊天
                var msgDiv = {};
                msgDiv["isSender"] = obj.msgSender == IM.user_account ? true : false;
                if(obj.msgSender == obj.msgReceiver && obj.msgReceiver == IM.user_account) {
                    msgDiv["isSender"] = false;
                }
                msgDiv["senderName"] = obj.senderNickName || obj.msgSenderNick;
                msgDiv["msgType"] = obj.msgType;
                msgDiv["msgFileUrl"] = obj.msgFileUrl;
                msgDiv["content"] = obj.msgContent;
                msgDiv["msgFileName"] = obj.msgFileName;
                msgDiv["msgFileSize"] = obj.msgFileSize;
                msgDiv["msgId"] = obj.msgId;
                msgDiv["msgDomain"] = obj.msgDomain;
                if(obj.msgDomain && obj.msgDomain.indexOf('fireMessage')>-1){
                    firemsg = true;
                }
                if(obj.msgType === 2){
                    RL_Chat.getAudioSource(obj.msgFileUrl,function (res) {
                        if(!IM.chat_maps[obj.msgSender]) {
                            IM.createGroupChatWindow(obj.msgSender, false);
                        }
                        msgDiv["isSender"] = obj.msgSender == IM.user_account;
                        msgDiv["senderName"] = obj.senderNickName || obj.msgSender;
                        msgDiv["msgType"] = obj.msgType;
                        msgDiv["msgId"] = obj.msgId;
                        msgDiv["msgFileUrl"] = res.url;
                        msgDiv["chatWindow"] =  IM.chat_maps[obj.msgSender];
                        IM.addMsgToChatWindow(msgDiv);
                    },function (err) {
                        console.log(err);
                    })
                    return ;
                }
                if(obj.msgType == 6) {
                    RL_Chat.getFileSource(obj.msgFileUrl, function(e) {
                        msgDiv["msgFileUrl"] = e.url;
                        msgDiv["msgType"] = 7;
                        var kg = false;
                        if(obj.msgSender == IM.user_account){
                            IM.createP2pChatWindow(obj.msgReceiver, obj.msgReceiver, false);
                            msgDiv["chatWindow"] = IM.chat_maps[obj.msgReceiver];
                            var o = $('[data-im-contact="' + obj.msgReceiver + '"]');
                            kg = IM.chat_window != null && IM.chat_window.attr("data-chat-with") == obj.msgReceiver;
                        }else{
                            var o = $('[data-im-contact="' + obj.msgSender + '"]');
                            IM.createP2pChatWindow(obj.msgSender, obj.msgSenderNick || obj.senderNickName || obj.msgSender, false);
                            msgDiv["chatWindow"] = IM.chat_maps[obj.msgSender];
                            kg = IM.chat_window != null && IM.chat_window.attr("data-chat-with") == obj.msgSender;
                        }
                        var stat = {};
                        stat["state"] = 1;
                        IM.HTML_addChatToList(obj.msgSender, obj.senderNickName||obj.msgSender, 'C', stat, false);
                        IM.addMsgToChatWindow(msgDiv);
                        var i = o.find(".noticeQ");
                        document.getElementById('im_ring').play();
                        if(kg) {
                            return;
                        }
                        if(i.length == 0) {
                            o.find('.discuss_name').after('<span class="noticeQ">' + 1 + '</span>');
                        } else {
                            o.find('.noticeQ').html(parseInt(o.find('.noticeQ').html()) + 1);
                        }
                        IM.DO_deskNotice(obj.msgSender, obj.senderNickName,obj.msgContent,obj.msgType,firemsg,false,'',isatMsg);
                    }, function() {
                        console.log('解压缩失败');
                    });
                    return ;
                }
                IM.HTML_addChatToList(msgDiv["isSender"]?obj.msgReceiver:obj.msgSender, msgDiv["isSender"]?obj.msgReceiver:(obj.senderNickName || obj.msgSenderNick ||obj.msgSender), 'C', stat, false);
                var kg = false;
                if(obj.msgSender == IM.user_account){
                    IM.createP2pChatWindow(obj.msgReceiver, obj.msgReceiver, false);
                    msgDiv["chatWindow"] = IM.chat_maps[obj.msgReceiver];
                    var o = $('[data-im-contact="' + obj.msgReceiver + '"]');
                    kg = IM.chat_window != null && IM.chat_window.attr("data-chat-with") == obj.msgReceiver;
                }else{
                    var o = $('[data-im-contact="' + obj.msgSender + '"]');
                    IM.createP2pChatWindow(obj.msgSender, obj.senderNickName || obj.msgSender, false);
                    msgDiv["chatWindow"] = IM.chat_maps[obj.msgSender];
                    kg = IM.chat_window != null && IM.chat_window.attr("data-chat-with") == obj.msgSender;
                }
                var stat = {};
                stat["state"] = 1;
                IM.HTML_addChatToList(obj.msgSender, obj.senderNickName || obj.msgSenderNick ||obj.msgSender, 'C', stat, false);
                IM.addMsgToChatWindow(msgDiv);
                var i = o.find(".noticeQ");
                document.getElementById('im_ring').play();
                if(kg) {
                    return;
                }
                if(i.length == 0) {
                    o.find('.discuss_name').after('<span class="noticeQ">' + 1 + '</span>');
                } else {
                    o.find('.noticeQ').html(parseInt(o.find('.noticeQ').html()) + 1);
                }
            }
            IM.DO_deskNotice(obj.msgSender, obj.senderNickName,obj.msgContent,obj.msgType,firemsg,false,'',isatMsg);
        },
        EV_getPersonalInfo: function() {
            popDrag('personInforPopDrag')
            RL_Chat.getMyInfo(function(obj) {
                IM.username = obj.nickName;
                if(obj.version == 0) {
                    $('#page_nickname').html(IM.user_account);
                    $('#person_nickname').val('');
                    $('#personInfor').modal('show');
                } else {
                    IM.nickName = obj.nickName ? obj.nickName : IM.user_account;
                    var personInfo = $('#personInfor').find(".form-horizontal");
                    personInfo.find("#person_nickname").val(obj.nickName);
                    personInfo.find("#person_sex").val(obj.sex);
                    personInfo.find("#person_birth").val(obj.birth);
                    personInfo.find("#person_sign").val(obj.sign);
                    $('#page_nickname').html(obj.nickName);
                    
                    $('#personInfor').modal('hide');
                };
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });

        },

        /*
         * @param noticeMsg  消息提示的内容
         * @param autoDismiss  是否鼠标滑过删除此条消息
         * @param groupId  群组ID
         * @param invitor  邀请者
         * @param name  群组名称
         * */
        msgAlert: function(noticeMsg, autoDismiss, groupId, invitor, name, acc, ref) {
            var html = '<div class="audioAline" data-autodismiss="' + autoDismiss + '">' +
                '<div class="imgDiv">' +
                '<img src="img/msgnotice.png">' +
                '</div>' +
                '<div class="audioDiv">' +
                '<span class="color6060" >' + noticeMsg + '</span>' +
                '<div class="audioBtn">' +
                '<button data-group-'+ acc +'="' + groupId + '" data-group-invitor="' + invitor + '" data-group-name="' + name + '">接受</button>' +
                '<button data-group-'+ ref +'="' + groupId + '" data-group-invitor="' + invitor + '">拒绝</button>' +
                '</div>' +
                '</div>' +
                '<div class="clear"></div>'+
                '</div>';
            $('.callmsg_alert').append(html);
        },
        EV_noticeReceiveListener: function(obj) {
            console.log('EV_noticeReceiveListener---------------------',obj);
            var you_sender = IM._serverNo;
            var groupId = obj.groupId;
            var name = '系统通知';
            var groupName = obj.groupName;
            var version = obj.msgId;
            var peopleId = obj.member;
            var people = (!!obj.memberName) ? obj.memberName : obj.member;
            var noticeContent = '';
            var msgContent = true;
            // 1,(1申请加入群组，2邀请加入群组，3直接加入群组，4解散群组，5退出群组，6踢出群组，7确认申请加入，8确认邀请加入，
            //9邀请加入群组的用户因本身群组个数超限加入失败(只发送给邀请者)10管理员修改群组信息，11用户修改群组成员名片12新增管理员变更通知)
            var auditType = obj.auditType;
            var groupTarget = (obj.target == 2) ? "群组" : "讨论组";
            var isdismiss = true;
            var grouplist = $('.group_list');
            if(1 == auditType) { // 1申请加入群组
                //noticeMsg, autoDismiss, groupId, invitor, name
                msgContent = '[' + people + ']申请加入' + groupTarget + '[' + groupName + '] ';
                // noticeContent = '[' + people + ']申请加入' + groupTarget + '[' + groupName + '] ';
                this.msgAlert(msgContent, false, obj.groupId, obj.member, obj.memberName,'confirm','reject');
                noticeContent = msgContent;
                IM.DO_deskNotice('', '', noticeContent, '', false, false);
                return;
            } else if(2 == auditType) { //被邀请加入群组
                if(1 == obj.confirm) {
                    msgContent = '您已加入群组[' + groupName + ']';
                    IM.EV_getGroupList();
                } else {
                    msgContent = '[' + obj.groupName + ']管理员邀请您加入群组 [' + obj.groupName + ']';
                    this.msgAlert(msgContent, false, obj.groupId, obj.admin, obj.groupName,'accept' ,'refuse');
                    noticeContent = msgContent;
                    IM.DO_deskNotice('', '', noticeContent, '', false, false);
                    return;
                }
                noticeContent = msgContent;
            } else if(3 == auditType) {
                //加入群组
                msgContent = '[' + people + ']已加入群组[' + groupName + ']';
                IM.EV_getGroupList();
                noticeContent = msgContent;
            } else if(4 == auditType) {
                // 解散群组
                msgContent = '群主解散了群组[' + groupName + ']';
                grouplist.find('[data-groupid=' + obj.groupId + ']').remove();
                noticeContent = msgContent;
                // 解散当前的群组时,聊天框复原初始状态
                $('.chat_group_window.rlist').attr('data-chat-with','')
                $('.chat_group_window.rlist').attr('data-chat-type','g')
                IM.chatNickName.html("欢迎使用IM体验demo");
                IM.chatNickName.attr("title","欢迎使用IM体验demo");
                $('.chat_group_window.rlist').find('.chatting .chats').first().show();
                $('.chat_group_window.rlist').find('.chatting .chats').first().siblings().hide();
                // $('.chat_group_window.rlist').find('.chatting .chats').find('[data-c-with=' + obj.groupId + ']').hide();
                IM.chat_window.find('[data-chat-input="chatinput"]').html('');
            } else if(5 == auditType) {
                //退出群组
                msgContent = '[' + people + ']退出了' + groupTarget + '[' + groupName + ']';
                noticeContent = msgContent;
            } else if(6 == auditType) {
                //踢出成员
                msgContent = '[' + groupName + ']管理员将[' + people + ']踢出' + groupTarget;
                noticeContent = msgContent;
                if(IM.user_account == obj.member) {
                    // 将群组从列表中移除
                    grouplist.find('[data-groupid=' + obj.groupId + ']').remove();
                    // 踢出成员,成员聊天框复原初始状态
                    $('.chat_group_window.rlist').attr('data-chat-with','')
                    $('.chat_group_window.rlist').attr('data-chat-type','g')
                    IM.chatNickName.html("欢迎使用IM体验demo");
                    IM.chatNickName.attr("title","欢迎使用IM体验demo");
                    $('.chat_group_window.rlist').find('.chatting .chats').first().show();
                    $('.chat_group_window.rlist').find('.chatting .chats').first().siblings().hide();
                    IM.chat_window.find('[data-chat-input="chatinput"]').html('');
                    if(IM.chat_maps[obj.groupId]){
                        IM.currentChat.attr('data-c-with',null);
                        IM.chat_maps[obj.groupId].remove();
                        delete IM.chat_maps[obj.groupId];
                    }
                    delete IM.group_list[obj.groupId];
                }
            } else if(7 == auditType) {
                msgContent = '管理员同意[' + people + ']加入群组[' + groupName + ']的申请';
                noticeContent = msgContent;
                IM.EV_getGroupList();
            } else if(8 == auditType) { //被邀请成员同意加入
                if(2 != obj.confirm) {
                    msgContent = '[' + people + ']拒绝了群组[' + groupName + ']的邀请';
                } else {
                    msgContent = '[' + people + ']同意了管理员的邀请，加入群组[' + groupName + ']';
                }
                noticeContent = msgContent;
            } else if(10 == auditType) {
                people = (!!obj.adminName) ? obj.adminName : obj.admin;
                if(obj.target == 2) {
                    msgContent = '管理员修改了群组[' + groupName + ']信息';
                } else {
                    msgContent = '用户[' + people + ']修改了讨论组[' + groupName + ']信息';
                }
                noticeContent = msgContent;
                if(IM.group_list[obj.groupId]){
                    //此处在刚登陆会存在找不到群组列表的情况，是因为修改消息先到达，而群组列表消息后到达的原因，但是不影响正常结果，因为最后达到的群组列表的版本一定是最新的。
                    IM.group_list[obj.groupId].target.attr('data-groupname',obj.groupName);
                    IM.group_list[obj.groupId].target.find('.discuss_name').html(obj.groupName);
                }
                if(IM.currentChat.attr('data-c-with') == obj.groupId){
                    IM.chat_window.find('.cNickName').html(obj.groupName);
                    IM.chat_window.find('.cNickName').attr("title",obj.groupName);
                }
            } else if(11 == auditType) {
                msgContent = '用户[' + people + ']修改群组成员名片';
                noticeContent = msgContent;
            } else if(12 == auditType) {
                msgContent = '用户[' + people + ']成为' + groupTarget + '[' + groupName + ']管理员';
                noticeContent = msgContent;
            } else if(13 == auditType) {
                var ext = JSON.parse(obj.ext);
                var roles = {"1":"群主","2":"管理员","3":"成员"};
                msgContent = '用户[' + people + ']成为' + groupTarget + groupName + roles[ext.role];
                noticeContent = msgContent;
            } else {
                msgContent = '未知type[' + auditType + ']';
                noticeContent = msgContent;
            }
            this.msgAlert(msgContent, isdismiss);
            IM.DO_deskNotice('', '', noticeContent, '', false, false);
        },
        _onConnectStateChangeLisenter: function() {
            console.log("_onConnectStateChangeLisenter");
        },
        HTML_showAlert: function(o, b) {
            $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
        },
        getBrowerPrefix: function() {
            return 'hidden' in document ? null : function() {
                var r = null;
                ['webkit', 'moz', 'ms', 'o'].forEach(function(prefix) {
                    if ((prefix + 'Hidden') in document) {
                        return r = prefix;
                    }
                });
                return r;
            }();
        },
        checkWindowHidden:function(){
            var prefix = IM.getBrowerPrefix();
            if (!prefix) {
                return document['hidden'];
            }
            return document[prefix + 'Hidden'];
        },
        /**
         * @param you_sender 发送者;
         * @param nickName 发送者昵称;
         * @param you_msgContent 发送消息体;
         * @param msgType 消息类型;
         * @param isfrieMsg 是否为阅后即焚
         * @param isCallMsg 是否为通话消息
         * inforSender
         * isAtMsg
         * */
        DO_deskNotice:function(you_sender, nickName, you_msgContent, msgType, isfrieMsg, isCallMsg, inforSender, isAtMsg){
            var title;
            var body = '';
            if (!!you_sender || !!nickName) {
                if ('g' == you_sender.substr(0, 1)) {
                    title = "群消息";
                    if (!!nickName) {
                        body =  isAtMsg+inforSender + ":" ;
                    } else {
                        body = you_sender + ":";
                    }
                } else {
                    if (!!nickName) {
                        title = nickName;
                    } else {
                        title = you_sender;
                    }
                }

            } else {
                title = "系统通知";
                body = you_msgContent;
            }

            if (isfrieMsg) {
                body += "[阅后即焚消息]";
            } else if (isCallMsg) {
                body += you_msgContent;
            } else {
                if (1 == msgType) {
                    emoji.showText = true;
                    you_msgContent = emoji.replace_unified(you_msgContent);
                    emoji.showText = false;
                    body += you_msgContent;
                } else if (2 == msgType) {
                    body += "[语音]";
                } else if (3 == msgType) {
                    body += "[视频]";
                } else if (4 == msgType) {
                    body += "[图片]";
                } else if (5 == msgType) {
                    body += "[位置]";
                } else if (6 == msgType || 7 == msgType) {
                    body += "[附件]";
                } else if (11 == msgType) {
                    body += '[有人@你]'; //@群组，type为11的时候
                }
            }
            if (11 == msgType) {
                if (!IM._Notification) {
                    return;
                }
            } else {
                if (!IM._Notification || !IM.checkWindowHidden()) {
                    return;
                }
            }
            var instance = new IM._Notification(
                title, {
                    body: body,
                    icon: "../img/msgnotice.png"
                }
            );

            instance.onclick = function() {
                // Something to do
            };
            instance.onerror = function() {
                // Something to do
                console.log('notification encounters an error');
            };
            instance.onshow = function() {
                // Something to do
                setTimeout(function() {
                    //instance.onclose();
                    instance.close();
                }, 3000);
            };
            instance.onclose = function() {
                // Something to do
                console.log('notification is closed');
            };
        },
        setPersonalInfo: function() {
            var nickName = $('#person_nickname').val();
            RL_Chat.uploadPersonInfo({
                nickName:nickName,
                sex: $('#person_sex').val(),
                birth: $('#person_birth').val(),
                sign: $('#person_sign').val()
            }, function(obj) {
                $('#page_nickname').html(nickName);
                $('#personInfor').modal('hide');
            }, function(e) {
                console.log("设置个人信息失败");
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        setContactMember: function() {
            //		var database = openDatabase("contactM", 1.0, "通讯录", 1024 * 1024, function() {
            //		});
            //{"conName":"联系人昵称","conId":"联系人ID","conHead":"联系人头像"}
            if(!this.getStorge()){
                IM.setStorge(IM.contacts);
            }
        },
        addContactMember: function(id,name,urls) {//不需要传入版本
            if(!urls){
                urls = "null";
            }
            var versions = 1;
            if(IM.contactMember[id]){
                versions = ++IM.contactMember[id].version;
            }
            if(IM.contactMember[id] && IM.contactMember[id].conName == name && IM.contactMember[id].conHead == urls){
                return ;
            }
            IM.contactMember[id] = {
                "conName":name,
                "conHead":urls,
                "conVersion":versions
            }
            IM.setStorge(IM.contactMember);
        },
        deleteContactMember: function(id) {
            if(!id){
                return ;
            }
            delete IM.contactMember[id];
            IM.setStorge(IM.contactMember);
        },
        getStorge: function() {
            var cont = window.localStorage[this.user_account+'_'+this._appid + '_Contact'];
            if(cont == undefined){
            };
            return cont;
        },
        setStorge: function(e) {
            window.localStorage[this.user_account+'_'+this._appid + '_Contact'] = JSON.stringify(e);
        },
        getContactMember: function(){//获取联系人
            if(IM.contactMember){
                return IM.contactMember;
            }
            var obj = IM.getStorge();
            if(!obj){
                return [];
            }
            IM.contactMember = JSON.parse(obj);

            return IM.contactMember;
        },

        EV_getGroupList: function() {
            console.log('-----------------------------------EV_getGroupList')
            RL_Chat.getGroupList({
                target: 125,
                pageSize: -1
            }, function(obj) {
                console.log('-----------------------------------getGroupList')
                
                var gList = document.querySelector('.group_list');
                gList.innerHTML = "";
                var gUl = document.createElement('ul');
                gUl.className = "discuss";
                IM.msgGroups = JSON.parse(window.localStorage.getItem('msgGroups'))||[]
                
                for(var i = 0;i<obj.length ; i++) {
                    var gLi = document.createElement('li');
                    if(i==IM.currentGroupIndex ){
                        gLi.className = obj[i].target==1?"discussionChat":"groupChat active";
                    }else{
                        gLi.className = obj[i].target==1?"discussionChat":"groupChat";
                    }
                    
                    gLi.dataset["groupname"] = obj[i].name;
                    gLi.dataset["groupid"] = obj[i].groupId;
                    var headImg = document.createElement('img');
                    headImg.src = "img/head_portrait/discussion_header/discussio_groups_0"+ obj[i].target +".png";
                    gLi.appendChild(headImg);
                    var gdiv = document.createElement('div');
                    var gName = document.createElement('span');
                    var gem = document.createElement('em');
                    gem.className = "draft";
                    gName.className = "discuss_name";
                    console.log('-----------------------------------discuss_name')
                    gName.innerHTML = obj[i].name;
                    var msg  = IM.msgGroups.find(function(e,index){
                        return e.lastGroupId == obj[i].groupId
                    })
                   
                    if(msg){
                        gem.innerHTML ="<em style='color:red;'>[草稿]</em>"+msg.message 
                    }
                    gdiv.appendChild(gName);
                    gdiv.appendChild(gem);
                    gLi.appendChild(gdiv);
                    gUl.appendChild(gLi);
                    IM.group_list[obj[i].groupId] = {
                        "target":$(gLi),
                        "isNotice":obj[i].isNotice,
                        "type":obj[i].target
                    };
                }
                gList.appendChild(gUl);
            }, function(e) {
                if(e.code == "171137") {
                    $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                } else {
                    $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                }
            });

        },
        createP2pChatWindow: function(id, name, show) {
            if(!this.chat_maps[id]) {
                var t = '<div class="chats iScroll" data-c-with = ' + id + ' style="display:none;">';
                var c = this.chat_window.find('.chatting').append(t);
                this.chat_maps[id] = c.find('[data-c-with="' + id + '"]');
                this.chat_maps[id].on("scroll",function(){
                    IM.processScroll(IM.chat_maps[id][0],true);
                });
            }
            if(!!show) {
                this.chat_window.attr('data-chat-type', 'c');
                this.chat_window.attr('data-chat-with', id);
                this.currentChat.hide();
                this.chat_maps[id].show();
                this.currentChat = this.chat_maps[id];
                this.chatNickName.html(name);
                IM.chatNickName.attr("title",name);
                this.chat_maps[id].scrollTop(this.chat_maps[id][0].scrollHeight/4);
                IM.processScroll(this.chat_window.find("[data-c-with]")[0],true);
            };

        },
        /**
         * @param id  群组ID 用于标记唯一群组
         * @param gname 群组名称 用于显示群组名称
         * @param isNotice 是否为免打扰
         * @param show 创建完是否立即显示
         *
         * */

        createGroupChatWindow: function(id, show) {
            if(!this.chat_maps[id]  && this.chat_window.find('[data-c-with="'+ id +'"]')) {
                var t = '<div class="chats iScroll" data-c-with = ' + id + ' style="display:none;">';
                var c = this.chat_window.find('.chatting').append(t);
                this.chat_maps[id] = this.chat_window.find('[data-c-with="' + id + '"]');
                this.chat_maps[id].on("scroll",function(){
                    IM.processScroll(IM.chat_maps[id][0],true);
                });
            }

            if(!!show) {
                this.chat_window.attr('data-chat-type', 'g');
                this.chat_window.attr('data-chat-with', id);
                this.currentChat.hide();
                this.chat_maps[id].show();
                this.currentChat = this.chat_maps[id];
                var grname = $('[data-groupid=' + id+ ']').find('.discuss_name').html();
                this.chatNickName.html(grname);
                IM.processScroll(this.chat_window.find("[data-c-with]")[0],true);
            }
        },
        /**
         * @param obj.isSender   发送方是否为当前账号
         * @param obj.senderName 消息发送方昵称
         * @param obj.msgType    消息类型（1：文本消息  4:图片消息）
         * @param obj.content    消息内容（）
         * @param obj.contentWith聊天窗口
         * @param obj.chatWindow 需要添加的聊天窗口
         *
         * */

        addMsgToChatWindow: function(obj) {
            console.log('obj----------------',obj)
            if(obj.isSender) {
                var posi = "oneTextR";
                var msgback = '<i class="msgBack">撤回</i>';
                var leftHeaderImg = '';
                var rightHeaderImg = '<img src="img/head_portrait/head_portrait_group/groups_head_portrait_02.png" class="left">';
                var msgRead = '';
                var msgHasRead =obj.domain?'':'<i class="msgread">未读</i>' 
            } else {
                var posi = "oneText";
                var leftHeaderImg = '<img src="img/head_portrait/head_portrait_group/groups_head_portrait_02.png" class="left">';
                var rightHeaderImg = '';
                var msgback = '';
                var msgRead = 'data-msgread="true"';
                var msgHasRead ='';
            }
            var html = '<div class="' + posi + '" data-msgId="' + obj.msgId + '" '+ msgRead + '>' +
                '<p>' + obj.senderName + '</p>' +
                leftHeaderImg + rightHeaderImg +
                '<div id="" class="dialog">' +
                '<span class="sjx"></span>';

            var codes = '';
            if(obj.msgType == 1) {
                if(obj.content.indexOf('http')==0||obj.content.indexOf('https')==0){
                    codes=  '<a href="'+obj.content+ '" target="_blank">'+obj.content+'</a>'
                }else{
                    codes = obj.content
                }
                // 当只输入空格时  消息不发送
                var emptymark = false;
                var cd = codes.split(";")
                var cds = cd.slice(0,cd.length-1);
                if(cds.length>0){
                    emptymark = cds.every( function( item, index, array ){
                        return item =="&nbsp" || item ==" &nbsp"
                    })
                }
                if(emptymark){
                    return
                }
            }else if(obj.msgType == 2){
                codes = '<audio src="'+obj.msgFileUrl +'" controls / >';
            } else if(obj.msgType == 3){
                codes = '<video src="'+obj.msgFileUrl +'" controls / >';
            } else if(obj.msgType == 4) {
                codes = '<a target="_blank" href="'+obj.msgFileUrl +'"><img src="' + obj.msgFileUrl + '" /></a>';
            } else if(obj.msgType == 7) {
                codes = '<a href= ' + obj.msgFileUrl + ' target="_blank" download="'+obj.msgFileName+ '"><img src="img/filepic.png" style="width:20px;cursor: auto;"/>' + obj.msgFileName + " : 文件大小：" + obj.msgFileSize + 'kb</a>';
            } else if(obj.msgType == 11) {
                codes =  obj.content;
            }
            if(!!obj.msgDomain && obj.msgDomain.indexOf('fireMessage') > -1) {
                codes = '<img src="img/fireMessageImg.png" data-msgcontent="' + Base64.encode(codes) + '" />';
            }
            html +=obj.domain? '<pre class="contentText  fireMessageClass">' +codes+ '</pre>':'<pre class="contentText">' +codes+ '</pre>';
            html += '</div>' + msgback + msgHasRead+ '</div>';
            obj.chatWindow.append(html);
            setTimeout(function () {
                if(IM.currentChat === obj.chatWindow){
                    obj.chatWindow.scrollTop(obj.chatWindow[0].scrollHeight);
                    IM.processScroll(obj.chatWindow[0],true);
                }
            },500);
        },

        /**
         * @param contactId     联系人账号/群组ID
         * @param contactVal    当前联系人/群组名称
         * @param content_type  联系人类型   (联系人，群组，讨论组)
         * @param multi         多参数
         * @param show          是否需要立即更新当前所选联系人
         * */

        HTML_addChatToList: function(contactId, contactVal, content_type, multi, show) { //
            if($('[data-im-contact="' + contactId + '"]').length > 0) {
                if(show) {
                    $('.contact_list').find('.discuss').find('.active').removeClass('active');
                    $('[data-im-contact =' + contactId + ']').addClass('active');
                    IM.createP2pChatWindow(contactId, contactVal, true);
                }
                return;
            }
            var msgDiv;
            switch(content_type) {
                case "C":
                    IM.msgs = JSON.parse(window.localStorage.getItem('msgs'))||[]
                    var msg  = IM.msgs.find(function(e,index){
                        return e.lastId == contactId 
                    })
                    if(msg){
                        msgDiv = '<li class="contactList"  data-im-contact = ' + contactId + ' data-user-state="' + (!!multi ? multi.state : 2) + '"><i class="icon_header"></i>' +
                        '<span class="discuss_name">' + contactVal + '</span>'+'<em class="draft"><em style="color:red;">[草稿]</em>'+msg.message+'</em>'+ '<button class="removeCon" data-btn="removeCon">删除</button></li>';
                    }else{
                        msgDiv = '<li class="contactList"  data-im-contact = ' + contactId + ' data-user-state="' + (!!multi ? multi.state : 2) + '"><i class="icon_header"></i>' +
                        '<span class="discuss_name">' + contactVal + '</span>'+'<em class="draft"></em>'+ '<button class="removeCon" data-btn="removeCon">删除</button></li>';
                    }
                    $('.contact_list').find('[data-list="chat"]').prepend(msgDiv);
                    IM.addContactMember(contactId,contactVal);
                    break;
                case "G":
                    msgDiv = '<li class="groupChat" data-groupname="' + contactVal + '"  data-groupid="' + contactId + '" data-isnotice="' + multi.isNotice + '"><img src="img/head_portrait/head_portrait_group/groups_head_portrait_02.png"> ' +
                            '<div> <span class="discuss_name">' + contactVal + '</span></div></li>';
                    $('.group_list').find('.discuss').prepend(msgDiv);
                    break;
                case "D":
                    msgDiv = '<li class="groupChat" data-groupname="' + contactVal + '"  data-groupid="' + contactId + '" data-isnotice="' + multi.isNotice + '"><img src="img/head_portrait/discussion_header/discussio_groups_01.png"> ' +
                        '<div> <span class="discuss_name">' + contactVal + '</span><em class="draft"></em></div></li>';
                    $('.group_list').find('.discuss').prepend(msgDiv);
                    break;
                case "M":
                    break;
                default:
                    break;
            };
            //[{"conName":"联系人昵称","conId":"联系人ID","conHead":"联系人头像"}];

            if(!!show) {
                switch(content_type) {
                    case "C": // 新增了联系人后，当前聊天框不变
                        /* $('.contact_list').find('.discuss').find('.active').removeClass('active');
                        $('[data-im-contact =' + contactId + ']').addClass('active'); */
                        break;
                    case "G":
                        $('.group_list').find('.discuss').find('.active').removeClass('active');
                        $('[data-im-contact =' + contactId + ']').addClass('active');
                        break;
                    case "D":
                        $('.group_list').find('.discuss').find('.active').removeClass('active');
                        $('[data-im-contact =' + contactId + ']').addClass('active');
                        break;
                    default:
                        alert('error');
                        break;;
                }
            };
            return;
        },
        serchGroup: function(type, keyWords) {
            RL_Chat.searchGroups({
                searchType:parseInt(type),
                keyWords:keyWords
            }, function(obj) {
                var html = "";
                for(var i = 0; i < obj.length; i++) {
                    if(IM.group_list[obj[i].groupId]){
                        html += '<li> <img src="img/head_portrait/headerX40.png"> <p class="cg_name">' + obj[i].name + '</p></li>';
                    }else{
                        html += '<li> <img src="img/head_portrait/headerX40.png"> <p class="cg_name">' + obj[i].name + '</p><button class="join" data-btn="joinGroup" data-groupId="' + obj[i].groupId + '">加入</button></li>';
                    }

                }
                $('.card_group').html(html);
            }, function(obj) {
                $('.card_group').html('无搜索结果');
            });
        },
        createAudioView: function(obj, isSender, type) {
            var part1 = '<div class="audioAline" data-call-with=' + obj + ' data-call-state="1" data-call-type=' + type + '>' +
                '<div class="imgDiv">' +
                '<img src="img/voipcall.png">' +
                '</div>' +
                '<div class="audioDiv">' +
                '<p class="name">' + obj + '</p>' +
                '<span class="audio audio_icon" id="audio_icon" data-audioVoice="true" style="background-position:0px -23px;"></span>';
            var part2;
            if(!!isSender) {
                part2 = '<span class="color6060" data-call="msg" >等待对方回应</span>' +
                    '<audio autoplay="autoplay" id="audioCall"></audio>' +
                    '<div class="audioBtn">' +
                    '<button data-btn="cancelVoip">取消</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="clear"></div>'+
                    '</div>';

            } else {
                part2 = '<span class="color6060" data-call="msg" >对方邀请你'+(type == 1?'视频':'语音')+'通话</span>' +
                    '<audio autoplay="autoplay" id="audioCall"></audio>' +
                    '<div class="audioBtn">' +
                    '<button data-btn="acceptVoip">接受</button>' +
                    '<button data-btn="refuseVoip">拒绝</button>' +
                    '</div>' +
                    '</div>' +
                    '<div class="clear"></div>'+
                    '</div>';
            }

            var ht = part1 + part2;
            $('.callmsg_alert').append(ht);
            //RL_Media.setCallView_v1(document.getElementById('audioCall'), null);
            
            RL_Media.setOnTrack(ontrack);               
            function ontrack(streamContent){
                    let track = streamContent.stream.getTracks()[0];
                    if(track.kind == "audio"){
                      var voipMixedAudio = document.createElement("video");
                      voipMixedAudio.setAttribute("autoplay", "autoplay");
                      processAVStream(voipMixedAudio, streamContent.stream);
                      console.log("==============JsutDo Process Audio:", streamContent.stream);
                    }
                    if(track.kind == "video"){
                      processAVStream(distance, streamContent.stream);
                      console.log("==============JsutDo Process Video:", streamContent.stream);
                    }
            }
            function processAVStream (view, stream) {
                    if (!view) {
                      return;
                    }
                    if ("srcObject" in view) {
                      view.srcObject = stream;
                    } else if (!stream) {
                      view.src = stream;
                    } else {
                      view.src = URL.createObjectURL(stream);
                    }
            }
            
            IM.currentCallWith = $('[data-call-with="' + obj + '"]');
            $("#audio_icon").click(function(e) {
              console.log("关闭声音");
              var f = ($(this).attr("data-audioVoice") == "true")?true:false;
              //RL_Media.deployVideoVoice(!f,"audio");
              if(!f == false){
                RL_Media.closeMicrophone();
              }
              if(!f == true){
                RL_Media.openMicrophone();
              }
              $(this).attr("data-audioVoice",!f);
              $(this).css("background-position", (!f?"0px -23px":"0px 0px"));
              console.log('fff', f);
            })

        },
        sendVoipCall: function(calledUser, callType, tel, nickName,deviceId) {
            RL_Media.setUserData("Test1=1000;Test2=2000;Test3=3000");
            RL_Media.makeCall({
                caller: RL_YTX_NEW.userName,
                called: calledUser.toString(),
                mediaType: callType,
                deviceId:deviceId,
                nickName: nickName || 'normal',
                tel:tel
            }, function(e) {
                console.log("%c*************视频请求成功","color:red");
                console.log(e);
                /*
                setTimeout(function () {
                    let pr = {};
                    pr.mediaType = 0;
                    RL_Media.updateCall(pr,
                        function(){},
                        function(){});
                  }, 5*1000);
                  */

            }, function(e) {
                document.getElementById('call_ring').pause();
                IM.currentCallWith.hide();
                IM.currentCallWith = null;
                IM.currentCallId = null;
                noticeMsg = "[视频通话结束]";
                IM.isCalling = false;
                console.log("==========makeCall fail:", JSON.stringify(e));
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        EV_onCallMsgListener: function(obj) {
            /*
            if(obj.code != 200) {
                console.error(obj.code);
                return;
            }
            */
            if(obj.callType == 1) { //视频请求
                this.processVideo(obj);
            } else { //音频请求
                this.processAudio(obj);
            }
        },
        processAudio: function(obj) {
            var noticeMsg = null;
            if(obj.state == 1) { //，对方收到呼叫，对方振铃中
                IM.isCalling = true;
            } else if(obj.state == 2) { //发送请求成功 呼叫中
                this.currentCallId = obj.callId;
                document.getElementById('call_ring').play();
                IM.isCalling = true;
            } else if(obj.state == 3) { //对方接受
                document.getElementById('call_ring').pause();
                var s = this.currentCallWith.attr("data-call-state");
                if(s == 3) {
                    return;
                }
                this.currentCallWith.attr("data-call-state", "3");
                var t = '<button data-btn="shutdownVoip">挂断</button>';
                this.currentCallWith.find('[data-btn="cancelVoip"]').replaceWith(t);
                var times = this.currentCallWith.find('[data-call="msg"]');
                //setTimeWindow_v1(times);
                noticeMsg = "[接收语音通话]";
                IM.isCalling = true;
            } else if(obj.state == 4) { //呼叫失败 对主叫设定：自动取消，对方拒绝或者忙
                document.getElementById('call_ring').pause();
                this.currentCallWith.remove();
                this.currentCallWith = null;
                this.currentCallId = null;
                noticeMsg = "[语音通话结束]";
                IM.isCalling = false;
            } else if(obj.state == 5) { //对方挂断
                this.currentCallWith.remove();
                this.currentCallWith = null;
                this.currentCallId = null;
                noticeMsg = "[语音通话结束]";
                document.getElementById('call_ring').pause();
                IM.isCalling = false;
            } else if(obj.state == 6) { //接到对方发来的通话
                this.createAudioView(obj.caller, false, obj.callType);
                this.currentCallId = obj.callId;
                document.getElementById('call_ring').play();
                noticeMsg = "[语音呼叫]";
                IM.isCalling = false;
            } else if(obj.state == 7) {
                console.log("建立呼叫");
            }
            if (!!noticeMsg) {
                IM.DO_deskNotice(obj.caller, '', noticeMsg, '', false, true);
            }
        },
        isCalling:false,
        processVideo: function(obj) {
            var noticeMsg = null;
            if(obj.state == 2) { //发送请求成功
                this.currentCallId = obj.callId;
                IM.isCalling = false;
            } else if(obj.state == 3) { //对方接受
                document.getElementById('call_ring').pause();
                var s = this.currentCallWith.attr("data-call-state");
                if(s == 3) {
                    return;
                }
                this.currentCallWith.attr("data-call-state", '3');
                this.currentCallWith.find('[data-btn="cancelVideo"]').html("挂断");
                noticeMsg = "[接收视频通话]";
                IM.isCalling = true;
            } else if(obj.state == 4) { //呼叫失败 对主叫设定：自动取消，对方拒绝或者忙
                document.getElementById('call_ring').pause();
                this.currentCallWith.hide();
                this.currentCallWith = null;
                this.currentCallId = null;
                noticeMsg = "[视频通话结束]";
                IM.isCalling = false;
            } else if(obj.state == 5) { //对方挂断
                document.getElementById('call_ring').pause();
                this.currentCallWith.hide();
                this.currentCallWith = null;
                this.currentCallId = null;
                noticeMsg = "[视频通话结束]";
                IM.isCalling = false;
            } else if(obj.state == 6) {
                this.createAudioView(obj.caller, false, obj.callType);
                this.currentCallId = obj.callId;
                document.getElementById('call_ring').play();
                noticeMsg = "[视频呼叫]";
                IM.isCalling = false;
            } else if(obj.state == 7) {
                console.log("建立呼叫");
            }
            if (!!noticeMsg) {
                IM.DO_deskNotice(obj.caller, '', noticeMsg, '', false, true);
            }
        },
        cancelVoipCall: function() {
            IM.isCalling = false;
            var called;
            if(IM.currentCallWith.attr("data-call-type") == 1) {
                called = IM.currentCallWith.attr("data-video-with").toString();
            } else {
                called = IM.currentCallWith.attr("data-call-with").toString();
            }

            RL_Media.releaseCall(function(e) {
                console.log('取消呼叫');
            }, function(e) {
                console.log('取消呼叫', e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                // $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
            if(this.currentCallWith.attr("data-call-type") == 1) {
                this.currentCallWith.find('[data-btn="cancelVideo"]').html('取消');
                IM.currentCallWith.attr("data-call-state", "1");
                this.currentCallWith.hide();

            } else {
                this.currentCallWith.remove();
            }
            this.currentCallWith = null;
            this.currentCallId = null;
            document.getElementById('call_ring').pause();
        },
        acceptCall: function(deviceId) {
            IM.isCalling = true;
            document.getElementById('call_ring').pause();
            var t = this.currentCallWith.attr("data-call-type");
            var obj = {
                callId: this.currentCallId,
                deviceId:deviceId
            };
            if(t == 1) {
                var distance = $('[data-video="distance"]')[0];
                var local = $('[data-video="local"]')[0];
                var caller = IM.currentCallWith.attr("data-call-with");
                //RL_Media.setCallView_v1(distance, local);

                RL_Media.setOnPublishMedia(publishMedia);
                RL_Media.setOnTrack(ontrack);
                function publishMedia(stream){
                    processAVStream(local, stream);
                }
                function ontrack(streamContent){
                    let track = streamContent.stream.getTracks()[0];
                    if(track.kind == "audio"){
                      var voipMixedAudio = document.createElement("video");
                      voipMixedAudio.setAttribute("autoplay", "autoplay");
                      processAVStream(voipMixedAudio, streamContent.stream);
                      console.log("==============JsutDo Process Audio:", streamContent.stream);
                    }
                    if(track.kind == "video"){
                      processAVStream(distance, streamContent.stream);
                      console.log("==============JsutDo Process Video:", streamContent.stream);
                    }
                  }
                function processAVStream (view, stream) {
                    if (!view) {
                      return;
                    }
                    if ("srcObject" in view) {
                      view.srcObject = stream;
                    } else if (!stream) {
                      view.src = stream;
                    } else {
                      view.src = URL.createObjectURL(stream);
                    }
                }
                


                IM.currentCallWith.remove();
                IM.currentCallWith = $('[data-video-with]');
                IM.currentCallWith.attr('data-video-with', caller);
                IM.currentCallWith.find('[data-btn="cancelVideo"]').html("挂断");
                $('[data-call-type="1"]').show();
                let par = {};
                par.mediaType = 0;
                
                RL_Media.acceptCall(function(e) {
                    console.log(e);
                    var s = IM.currentCallWith.attr("data-call-state");
                    if(s == 3) {
                        return;
                    }
                    IM.currentCallWith.attr("data-call-state", "3");
                    var t = '<button data-btn="shutdownVoip">挂断</button>';
                    IM.currentCallWith.find('[data-btn="cancelVoip"]').replaceWith(t);
                }, function(e) {
                    $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                });
            } else { //处理音频
                
                var distance = document.querySelector('#audioCall');
                //RL_Media.setCallView_v1(distance, local);
                RL_Media.setOnPublishMedia(publishMedia);
                RL_Media.setOnTrack(ontrack);
                function publishMedia(stream){
                    processAVStream(local, stream);
                }
                function ontrack(streamContent){
                    let track = streamContent.stream.getTracks()[0];
                    if(track.kind == "audio"){
                      var voipMixedAudio = document.createElement("video");
                      voipMixedAudio.setAttribute("autoplay", "autoplay");
                      processAVStream(voipMixedAudio, streamContent.stream);
                      console.log("==============JsutDo Process Audio:", streamContent.stream);
                    }
                    if(track.kind == "video"){
                      processAVStream(distance, streamContent.stream);
                      console.log("==============JsutDo Process Video:", streamContent.stream);
                    }
                }
                function processAVStream (view, stream) {
                    if (!view) {
                      return;
                    }
                    if ("srcObject" in view) {
                      view.srcObject = stream;
                    } else if (!stream) {
                      view.src = stream;
                    } else {
                      view.src = URL.createObjectURL(stream);
                    }
                }

                let par = {};
                par.mediaType = 0;
                RL_Media.acceptCall(function(e) {
                    var s = IM.currentCallWith.attr("data-call-state");
                    if(s == 3) {
                        return;
                    }
                    IM.currentCallWith.attr("data-call-state", "3");
                    IM.currentCallWith.find('.audioBtn').html('<button data-btn="cancelVideo">挂断</button>')
                    var times = IM.currentCallWith.find('[data-call="msg"]');
                    //setTimeWindow_v1(times);
                }, function(e) {
                    $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                });
            }
        },
        refuseCall: function(e) {
            IM.isCalling = false;
            document.getElementById('call_ring').pause();
            RL_Media.rejectCall(
               function(e) {
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
            this.currentCallWith.remove();
            this.currentCallWith = null;
            this.currentCallId = null;
        },

        /*
         * 群组相关
         * */
        crateGroup: function(obj,callback) {
            RL_Chat.createGroup({
                groupName: obj.groupName,
                groupType: obj.groupType,
                province: obj.province,
                city: obj.city,
                scope: obj.scope,
                declared: obj.declared,
                permission: obj.permission,
                target: obj.target
            }, function(g) {
                if(callback){
                    callback();
                }
                var o = {};
                o['isNotice'] = 1;
                IM.HTML_addChatToList(g.data, obj.groupName, obj.target == 1 ? 'D' : 'G', o, false);
                if(obj.target == 1) {
                    IM.EV_inviteMember(g.data, obj.discussMember.split(','), false, function() {
                        console.log('创建讨论组成功  已经邀请加入群组');
                    });
                };
                IM.EV_getGroupList();
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        EV_setManager: function(groupid, memberId, role, callback, member) {
            RL_Chat.setGroupMemberRole({
                groupId: groupid,
                memberId:memberId,
                member:member,
                role:role
            }, function(e) {
                callback(role);
            }, function(e) {
                if(e.code==590046){
                    e.msg = '管理员个数超出限制，默认10'
                }
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        EV_kickOutMember: function(groupId, memberId, callback) { //踢人
            RL_Chat.deleteGroupMember({
                groupId:groupId,
                memberId:[ memberId+'']
            }, function(e) {
                callback();
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        EV_transferGroup: function(groupid, memberId, callback) { //转让
            RL_Chat.setGroupMemberRole({
                role: 1,
                memberId: memberId +'',
                groupId: groupid
            }, function(e) {
                callback();
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        EV_bannedMember: function(groupId, memberId, isBanned, callback, member) {//禁言
            RL_Chat.forbidMemberSpeak({
                groupId:groupId,
                memberId:memberId,
                forbidState: isBanned,
              member: member
            }, function(e) {
                callback();
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            })

        },
        EV_dismissGroup: function(groupId, callback) {//解散群组
            RL_Chat.dismissGroup({
                groupId:groupId
            }, function(e) {
                callback();
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            })
        },
        EV_quitGroup: function(groupId, callback) {
            RL_Chat.quitGroup({
                groupId:groupId
            }, function(e) {
                delete IM.group_list[groupId];
                callback();
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        EV_getUserState: function() {
            var arr = [] ;
            for(i in IM.contactMember){
                arr.push(i)
            }
            if(arr.length==0){
                return;
            }
            var _list = $('.normal_chat');
            RL_Chat.getUserState({
                newUserstate: true,
                useracc: arr
            }, function(obj) {
                for(i in obj){
                    _list.find('[data-im-contact="'+ obj[i].useracc +'"]').attr('data-user-state',obj[i].state);
                }
            }, function(e) {
                if(e.code === 609028){
                    clearInterval(IM.userStateInterval);
                }else{
                    $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                }
            });
        },
        EV_setGroupMemberNick: function(groupId, memberId, nick, callback) {
            RL_Chat.modifyMemberCard({
                memberId: memberId,
                belong: groupId,
                display: nick
            }, function(e) {
                callback();
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        EV_inviteMember: function(groupId, members,needConfirm, callback) {
            RL_Chat.inviteJoinGroup({
                groupId:groupId,
                members:members,
                confirm: needConfirm?2:1
            }, function(e) {
                callback();
            }, function(e) {
                if(e.code == '590038'){
                    e.msg = '邀请成员的状态异常'
                }
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            })
        },
        EV_processGroupInvite: function(groupId, inviter, val, callback,onerror) {
            RL_Chat.confirmInviteJoinGroup({
                inviter:inviter,
                groupId:groupId,
                confirm: val
            }, function(e) {
                callback();
            }, function(e) {
                if(e.code == 590017){
                    $.scojs_message("您已处理过此请求", $.scojs_message.TYPE_ERROR);
                    onerror();
                }else{
                    onerror();
                    $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                }
            })
        },
        EV_confirmInviteJoinGroup: function (groupId, membrer,  confirm ,callback,onerror) {
            RL_Chat.confirmJoinGroup({
                memberId: membrer,
                groupId:groupId,
                confirm:confirm
            },function () {
                callback();
            },function (e) {
                onerror();
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            })
        },
        EV_setGroupName: function(groupId, groupName, callback) {
            RL_Chat.modifyGroup({
                groupId:groupId,
                groupName:groupName
            }, function(e) {
                callback();
            }, function(e) {
                $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
            });
        },
        initEmoji: function() { //初始化EMOJI
            var emojiDiv = $('#eMoji').find('div[class="popover-content"]');
            var content_emoji = '';
            for(var i in emoji.show_data) {
                var c = emoji.show_data[i];
                var out = emoji.replace_unified(c[0][0]); //'onclick="IM.DO_chooseEmoji(\'' + i + '\', \'' + c[0][0] + '\')" '
                content_emoji += '<span data-emoji-unified=' + i + ' data-emoji-unicode=' + c[0][0] + ' imtype="content_emoji">' + out + '</span>';
            }
            emojiDiv.append(content_emoji);
        },
        choseEmoji: function(unified, unicode) {
            if(typeof(unified) == "undefined"||typeof(unicode) == "undefined"){
                return
            }
            var content_emoji = '<img imtype="content_emoji" emoji_value_unicode="' + unicode + '" style="width:18px; height:18px; margin:0 1px 0 1px;" src="img/img-apple-64/' + unified + '.png"/>';
            var ht = IM.chat_window.find('.char_input').html();
            IM.chat_window.find('.char_input').html(ht + content_emoji);
        },
        EV_msgBack: function(msgId, callback) {
            RL_Chat.msgOperation({
                msgId:msgId,
                type: 1
            }, function(e) {
                callback(e);
            }, function(e) {
                if(e.code === 609028){
                    console.log("not support ");
                }else if(e.code === 580033){
                    $.scojs_message(e.code + ' : 已超过2分钟,不能撤回');
                }else{
                    $.scojs_message(e.code + ' : ' + e.msg, $.scojs_message.TYPE_ERROR);
                }
            })
        },
        deleteMsg: function(msgId) {
            var div = $('[data-msgid="' + msgId + '"]');
            if(div.length > 0) {
                var html = '<div class="historyTime">对方撤回了一条消息</div>';
                div.replaceWith(html);
            }
        },
        preTakePicture: function(){
            $('#takePic').show();
            var obj = {};
            var video = document.getElementById("picshow");
            obj.tag = video;
            RL_Media.photo.apply(obj,function(e){
            },function(err){
                console.log(err);
            });
        },
        cancleTakePicture:function(){
            RL_Media.photo.cancel();
            $('#takePic').hide();
        },
        takePicture: function(){
            var resultObj = RL_Media.photo.make();
            //拍照成功
            if("200" == resultObj.code){
                //展示图片
                //发送消息
                var msgid = new Date().getTime();
                IM.EV_sendfile(msgid , resultObj.blob,4,IM.currentChat.attr("data-c-with"));
                $('#takePic').hide();
            }
        },
        EV_setGroupNotice: function(groupId,isNotice,callback){
            RL_Chat.setGroupMessageRule({
                groupId:groupId,
                isNotice:isNotice
            },function(e){
                if(callback)
                    callback();
            },function(err){
                console.log(err);
            })
        },
        EV_setProclamation: function(groupId,val,gname, callback){
            RL_Chat.modifyGroup({
                groupId:groupId,
                declared: val,
                groupName: gname
            },function(e){
                if(callback){
                    callback();
                }
            },function(err){
                console.log(err);
            })
        },
        EV_deleteReadMsg: function (msgId,callback) {
            RL_Chat.deleteReadMsg({
                msgId:msgId
            }, function () {
                callback();
            }, function (err) {
                console.log(err);
            })

        },
        DO_notice: function (type) {
            IM.EV_sendTextMsg(new Date().getTime(),type,IM.currentChat.attr('data-c-with'),false,12);
        },
        EV_msgRead: function (version,callback) {
            RL_Chat.msgOperation({
                version:version,
                type: 3
            },function () {
                if(callback)callback();
            },function (err) {
                if(e.code === 609028){
                    console.log("not support ");
                }else{
                    $.scojs_message(err.code + ' : ' + err.msg, $.scojs_message.TYPE_ERROR);
                }

            })
        },
        //消息置顶  —— 设置消息置顶
        /**
         * @param user 用户账号
         * @param callback 成功回调
         * */
        EV_SetTopContact:function (user,callback) {
            if(!user)return ;
            RL_Chat.setTopContact({
                contact: user +'',
                type: 1
            },function (e) {
                callback(e)
            },function (err) {
                console.log(err);
            });
        },
        //消息置顶  —— 取消消息置顶
        /**
         * @param user 用户账号
         * @param callback 成功回调
         * */
        EV_CancelTopContact:function (user,callback) {
            if(!user)return ;
            RL_Chat.setTopContact({
                contact: user,
                type: 2
            },function (e) {
                callback(e);
            },function (err) {
                console.log(err);
            });
        },
        //消息置顶  —— 获取消息置顶列表
        /**
         * @param callback 成功回调
         * */
        EV_GetTopContact:function (callback) {
            RL_Chat.getTopContact(function (e) {
                try {
                    callback(JSON.parse(e[1]));
                }catch (a){

                }
            },function (err) {
                console.log(err);
            });
        },
        sendVideo :function (deviceId){
            var chats = IM.chat_window.attr("data-chat-with");
            var distance = $('[data-video="distance"]')[0];
            var local = $('[data-video="local"]')[0];
            //RL_Media.setCallView_v1(distance, local);
            RL_Media.setOnPublishMedia(publishMedia);
            RL_Media.setOnTrack(ontrack);
            function publishMedia(stream){
                processAVStream(local, stream);
            }
            function ontrack(streamContent){
                let track = streamContent.stream.getTracks()[0];
                if(track.kind == "audio"){
                  var voipMixedAudio = document.createElement("video");
                  voipMixedAudio.setAttribute("autoplay", "autoplay");
                  processAVStream(voipMixedAudio, streamContent.stream);
                  console.log("==============JsutDo Process Audio:", streamContent.stream);
                }
                if(track.kind == "video"){
                  processAVStream(distance, streamContent.stream);
                  console.log("==============JsutDo Process Video:", streamContent.stream);
                }
              }
            function processAVStream (view, stream) {
                if (!view) {
                  return;
                }
                if ("srcObject" in view) {
                  view.srcObject = stream;
                } else if (!stream) {
                  view.src = stream;
                } else {
                  view.src = URL.createObjectURL(stream);
                }
            }

            IM.currentCallWith = $('[data-video-with]');
            IM.currentCallWith.attr('data-video-with', chats);
            IM.sendVoipCall(chats, 1,null,null,deviceId);
            $('[data-call-type="1"]').show();
        },
        send:function(){
            RL_MEET.ConferenceMsg({
                path: "/REST/Conference/Room/List?source=SDK",
                content:{"appid":this._appid,"userId":this._userAcc,"memberIdType":1}
            },function (e) {
                console.log(e);
            },function (err) {
                console.log(err);
            })
        }


    };
    
     
    window.IM = new YTX();
    IM.init();
})(jQuery);