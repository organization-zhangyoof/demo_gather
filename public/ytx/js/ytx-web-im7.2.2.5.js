(function () {
  var ROOT = {};
  if (typeof global === 'object') {
    ROOT = global;
  } else if (typeof window === "object") {
    ROOT = window
  }
  //公共配置
  var commonConfig = {
    useBuilder: true,
    appId: '',
    token: '',
    ClientNo: 0, //流水号
    imei: null,
    deviceType: 21,
    errCode: {
      _SUCC: 200,
      _NO_LOGIN: 170003,
      _NOT_SUPPORT_H5: 174001,
      _NO_REQUIRED_PARAM: 170002,
      _PARAM_TYPE_ERR: 170012,
      _NETWORK_ERR: 174002,
      _NETWORK_TIME_OUT: 174003,
      _FILE_PARAM_ERROR: 170012,
      _RESP_TIME_OUT: 171137,
      _LOGIN_NO_USERNAME: 170002,
      _LOGIN_NO_PWD: 170002,
      _PARAM_OUT_OF_LENGTH: 170001,
      _VOIP_NO_MEDIA: 174004,
      _VOIP_MEDIA_ERROR: 174005,
      _VOIP_NO_VIDEO: 170002,
      _REQUEST_TOO_FREQUENT: 174006,
      _CHARSET_ILLEGAl: 170012,
      _NOT_SUPPORT_FILE: 174007,
      _NOT_SUPPORT_CALL: 174008,
      _NOT_SUPPORT_URL: 174009,
      _NOT_SUPPORT_RECORDER: 174012,
      _NO_RESOURCE_STREAM: 174010,
      _FILE_SOURCE_ERROR: 174011,
      _FILE_FILEREADER_ERROR: 174012,
      _PEERCONNECTION_ERROR: 174013,
      _MEDIASTATE_ERROR: 174014,
      _WSG_INIT_ERROR: 174014,
      _WSG_MEMBER_LIMIT: 174015,
      _WSG_REQVIDEO_MISS_PARAM: 174016,
      _WSG_RELEASEVIDEO_MISS_PARAM: 174017,
      _WSG_REQVIDEO_EXISTS: 174018,
      _WSG_REQVIDEO_FAIL: 174019,
      _WSG_RELEASEVIDEO_NOT_REQ: 174020,
      _GROUP_NO_GROUPID: 170002,
      _TEXT_TOO_LONG: 170001,
      _FILE_TOO_LARGE: 170001,
    }, //错误码
    logPrint: true, //是否打印日志
    reqErrCode: {
      AccountInexistent: 520015,
      NoAppkey: 520001,
      MissingLoginParam: 520009,
      MissingPwd: 520018,
      IncorrectPwd: 520019,
      IncorrectAccount: 520021,
      AccountIllegal: 520023,
      RegistOver: 529998,
      MsgVersionOverdue: 580005,
      callRouteError: 550001,
      unknownError: 559999
    },
    //消息类型
    msgTypeNo: {
      _ipSpeedTest: 5,
      _kickOff: 6,
      _msg_CMD: 9,
      _msg_DEL: 21,
      _confirmMsg: 15,
      _onLineStateNotify: 17,
      _pushMsgNotify: 18,
      _pushMsg: 19,
      _login: 20,
      _logout: 21,
      _setMyInfo: 23,
      _getMyInfo: 24,
      _cmdMsg: 26,
      _syncMsg: 27,
      _sendMsg: 29,
      _createGroup: 30,
      _dismissGroup: 31,
      _quitGroup: 32,
      _joinGroup: 33,
      _confirmJoinGroup: 34,
      _inviteJoinGroup: 35,
      _getGroupDetail: 36,
      _getOwnGroups: 37,
      _forbidMemberSpeak: 38,
      _modifyGroup: 39,
      _confirmInviteJoin: 40,
      _searchGroups: 41,
      _queryGroupMembers: 42,
      _deleteGroupMember: 43,
      _queryGroupMemberCard: 44,
      _modifyMemberCard: 45,
      _setGroupMessageRule: 46,
      _mcmEventData: {
        _prototype: 126,
        _mcmEventDef: {
          _UserEvt_StartAsk: 1,
          _UserEvt_EndAsk: 2,
          _UserEvt_SendMSG: 3,
          _UserEvt_SendMail: 4,
          _UserEvt_SendWXMsg: 5,
          _UserEvt_GetAGList: 6,
          _UserEvt_RespAGList: 7,
          _UserEvt_IRCN: 8,
          _UserEvt_SendMCM: 9,
          _NotifyUser_QueueInfo: 10,
          _NotifyUser_StartAskResp: 11,
          _NotifyUser_EndAskResp: 12,
          _NotifyUser_StartConf: 13,
          _NotifyUser_StopConf: 14,
          _NotifyUser_EndAsk: 15,
          _NotifyUser_IRItemList: 16,
          _UserEvt_SelectItem: 17,
          _NotifyUser_StartRobotKF: 18,
          _NotifyUser_StopRobotKF: 19,
          _AgentEvt_KFOnWork: 47,
          _NotifyAgent_KFOnWorkResp: 48,
          _AgentEvt_KFOffWork: 49,
          _NotifyAgent_KFOffWorkResp: 50,
          _AgentEvt_KFStateOpt: 51,
          _NotifyAgent_KFStateResp: 52,
          _AgentEvt_SendMCM: 53,
          _AgentEvt_TransKF: 55,
          _NotifyAgent_TransKFResp: 56,
          _AgentEvt_EnterCallService: 57,
          _NotifyAgent_EnterCallSerResp: 58,
          _NotifyAgent_NewUserAsk: 59,
          _NotifyAgent_UserEndAsk: 60,
          _NotifyAgent_ImHistory: 61,
          _AgentEvt_Ready: 65,
          _AgentEvt_NotReady: 66,
          _AgentEvt_StartSerWithUser: 67,
          _AgentEvt_StopSerWithUser: 68,
          _AgentEvt_TransferQueue: 69,
          _AgentEvt_StartConf: 70,
          _AgentEvt_MakeCall: 71,
          _AgentEvt_AnswerCall: 72,
          _AgentEvt_ReleaseCall: 73,
          _AgentEvt_SendNotify: 74,
          _AgentEvt_ExitConf: 75,
          _NotifyAgent_NewUserCallin: 76,
          _NotifyAgent_UserReleaseCall: 77,
          _NotifyAgent_ReadyResp: 78,
          _NotifyAgent_NotReadyResp: 79,
          _NotifyAgent_UserCallEstablish: 80,
          _AgentEvt_RejectUser: 81,
          _NotifyAgent_RejectUserResp: 82,
          _NotifyAgent_StartConfResp: 83,
          _NotifyAgent_ExitConfResp: 84,
          _NotifyAgent_ExitConf: 85,
          _NotifyAgent_InviteJoinConf: 86,
          _AgentEvt_ForceJoinConf: 87,
          _NotifyAgent_ForceJoinConfResp: 88,
          _NotifyAgent_TransferNewUser: 89,
          _NotifyAgent_TransferQueueResp: 90,
          _NotifyAgent_ForceStartConf: 91,
          _AgentEvt_ForceTransfer: 92,
          _NotifyAgent_ForceTransferResp: 93,
          _NotifyAgent_ForceTransfernewUser: 94,
          _NotifyAgent_CallState: 95,
          _NotifyAgent_StopSerWithUserResp: 96,
          _AgentEvt_QueryQueueInfo: 97,
          _NotifyAgent_QueryQueueInfoResp: 98,
          _NotifyAgent_StartSerWithUserResp: 99,
          _AgentEvt_ReservedForUser: 100,
          _NotifyAgent_ReservedForUserResp: 101,
          _AgentEvt_CancelReserved: 102,
          _NotifyAgent_CancelReservedResp: 103,
          _NotifyAgent_ReservedUserAsk: 104,
          _AgentEvt_StartSessionTimer: 105,
          _NotifyAgent_StartSessionTimerResp: 106,
          _NotifyAgent_STExpired: 107,
          _AgentEvt_MonitorAgent: 108,
          _NotifyAgent_MonitorAgentResp: 109,
          _AgentEvt_CancelMonitorAgent: 110,
          _NotifyAgent_CancelMonitorAgentResp: 111,
          _AgentEvt_QueryAgentInfo: 112,
          _NotifyAgent_QueryAgentInfoResp: 113,
          _AgentEvt_SerWithTheUser: 114,
          _NotifyAgent_SerWithTheUserResp: 115,
          _AgentEvt_TransKFStartSerWithUser: 116,
          _AgentEvt_ForceTransferStartSerWithUser: 117,
          _AgentEvt_ForceEndService: 118,
          _NotifyAgent_ForceEndService: 119,
          _NotifyUser_ForceEndService: 120,
          _NotifyAgent_ForceEndServiceResp: 121,
          _NotifyAgent_JoinConfResp: 122,
          _AgentEvt_JoinConf: 123,
          _NotifyAgent_AgentSendMsg: 124,
          _NotifyUser_SendMSGResp: 125,
          _NotifyAgent_SendMCMResp: 126,
          _NotifyAgent_AgentJoinIM: 127,
          _NotifyAgent_AgentEndIMService: 128,
          _NotifyAgent_ExitIMService: 129,
          _NotifyAgent_TransferResult: 130
        },
        _mcmType: {
          _MCMType_txt: 1,
          _MCMType_audio: 2,
          _MCMType_video: 3,
          _MCMType_emotion: 4,
          _MCMType_pos: 5,
          _MCMType_file: 6
        },
        _mcmAgentState: {
          _AgentTelStat_noready: 0,
          _AgentTelStat_idle: 1,
          _AgentTelStat_locking: 2,
          _AgentTelStat_talking: 3,
          _AgentTelStat_linebusy: 4,
          _AgentTelStat_offwork: 9,
          _AgentImStat_offline: 10,
          _AgentImStat_online: 11,
          _AgentImStat_idle: 12,
          _AgentImStat_offwork: 13,
          _AgentImStat_working: 14,
          _AgentImStat_workingfull: 15,
          _AgentImStat_suspend: 16
        },
        _mcmChannel: {
          _MCType_im: 0,
          _MCType_wx: 1,
          _MCType_mail: 2,
          _MCType_sms: 3,
          _MCType_fax: 4
        }
      },
      _getUserState: 71,
      _callRoute: 127,
      _deleteReadMsg: 72,
      _msgOperation: 72,
      _setGroupMemberRole: 74,
      _setTopContact: 77,
      _getTopContact: 78,
      _chatRoom: {
        ChatRoom_MESSAGE: 14,
        MSG_SEND_LiveChatRoom_MESSAGE: 160,
        _enterChatRoom: 161,
        _fetchChatroomInfo: 162,
        _fetchChatroomMembers: 163,
        _updateChatroomInfo: 164,
        _updateChatRoomMemberRole: 165,
        _updateMyChatroomMemberInfo: 166,
        _kickMember: 167,
        _updateMemberOption: 168,
        _exitChatRoom: 169
      },
      _ConferenceMessage: 140,
      _ConferenceNotice: 141,
      _friendMsg: 100
    },
    httpType: {
      _attachStart: 1,
      _attachEnd: 2,
      _historyMessage: 3,
      _recentContact: 4,
      _userDevice: 5
    },
    routerSwitch: true, //路由开关
    hasLocalStorage: true,
    userAcc: '',
    msgVersion: 0,
    maxMsgVersion: 0,
    syncMsgVersion: '', //离线版本号
    syncMsgPorcessing: false,
    userName: '', //用户名称
    newUserState: false,
    synMsgMaxNumLimit: 100,
    fileSig: '',
    longTimestamp: 0
  };
  //公用方法
  var commonMethods = {
    assign: function () {
      var obj = {};
      for (var i =  0; i < arguments.length; i++) {
        if (typeof arguments[i] === 'object' && arguments[i]) {
          for (var v in arguments[i]) {
            obj[v] = arguments[i][v];
          }
        }
      }
      console.log('assign', obj);
      return obj;
    },
    getParam: function (param) {
      if (typeof param === 'object' && param.getData) {
        return param.getData();
      } else {
        return param
      }
    },
    ajax: function (data) {
      var xmlhttp;
      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      if (data.responseType)  xmlhttp.responseType = data.responseType;
      if (data.onload) xmlhttp.onload = function () {
        if (data.responseType) data.onload(xmlhttp.response);
      };
      if (data.progress) {
        xmlhttp.upload.onprogress = function (res) {
          var percent = parseInt((res.loaded / res.total * 100));
          console.log('progress', percent)
          data.progress(res, percent);
          console.log('progress', percent);
        }
      }
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
          if (xmlhttp.status === 200) {
            if (data.responseType) return;
            try {
              var response = JSON.parse(xmlhttp.responseText);
              if (response.statusCode === '000000') {
                data.success(response);
                return;
              } else {
                data.error(response)
              }
            } catch (e) {
              data.error({
                msg: response
              })
            }
          } else {
            data.error({
              code: xmlhttp.status
            })
          }
        }
      };
      xmlhttp.open(data.type || "POST", data.url, true);
      var header = data.header;
      if (header && typeof header === 'object' && Object.getOwnPropertyNames(header).length > 0) {
        for (var val in header) {
          xmlhttp.setRequestHeader(val, header[val]);
        }
      }
      xmlhttp.send(data.sendData);
    },
    //日志打印
    logger: {
      info: function (mess) {
        commonMethods.logger.log(mess, 'log')
      },
      error: function (mess) {
        commonMethods.logger.log(mess, 'error')
      },
      warn: function (mess) {
        commonMethods.logger.log(mess, 'warn')
      },
      log: function (mess, key) {
        if (!commonConfig.logPrint) return;
        mess = commonMethods.getTimeStamp() + ':: SDK ::' + mess;
        console[key](mess)
      }
    },
    //当前时间
    getTimeStamp: function () { //当前时间
      var now = new Date();
      var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());
      return timestamp;
    },
    getWindowURL: function () {
      var url = window.URL || window.webkitURL || window.mozURL || window.msURL;
      return url
    },
    parseCodeResp: function (obj) {
      var resp = {};
      resp.code = obj["6"];
      return resp
    },
    setlocalStorage: function (version) {
      if (!commonConfig.hasLocalStorage) {
        return commonConfig.msgVersion;
      }
      if (typeof version === "number") {
        version.toString();
      }
      if (commonMethods.getlocalStorage() > version) return;
      window.localStorage[commonConfig.userName + commonConfig.deviceType] = version;
      console.log('setlocalStorage---' + commonConfig.userName + commonConfig.deviceType, version)
    },
    getlocalStorage: function () {
      if (!commonConfig.hasLocalStorage) {
        return commonConfig.msgVersion;
      }
      var s = null;
      if ((s = window.localStorage[commonConfig.userName + commonConfig.deviceType]) === undefined) {
        window.localStorage[commonConfig.userName + commonConfig.deviceType] = 0;
        return "0";
      }
      console.log('getlocalStorage---' + commonConfig.userName + commonConfig.deviceType, s);
      return s;
    },
  };

  // ws造函数
  var ytx = {};
  var Chat, Meet;
  function RLYTX() {
    this.version = '7.2.2.5';
    this.chatActive = false;
    this.meetActive = false;
    ytx = this;
  }

  //私有配置
  var YTX_CONFIG = {
    sdkName: 'YTX-HTML5-SDK',
    serverIp: [],
    getServer: false, //是否需要通过接口获取地址
    appServer: [],
    Notification: null,
    fileSig: '',
    userAcc: '',
    userPwd: '', //用户密码
    isConnect: false, //ws是否连接
    isConnecting: false, //是否是正在连接
    clientMap: {}, //流水号map
    beforeUnLoad: [],
    socket: null, //ws对象
    timeOutSecond: 40,
    currentSession: null,
    loginType: 1,
    loginTypeNo: {
      LoginByUserName: 1,
      LoginByOther: 2,
      LoginByVoip: 3
    },
    loginStatus: 1, //登录状态
    loginStatusNo: {
      NoLogin: 1,
      LoggingIn: 2,
      Logined: 3
    },
    network: 1,
    loginMode: 1,
    intervalId: '',
    heartBeatInterval: {
      _2G: 45,
      _3G: 90,
      _4G: 180,
      _WIFI: 15,
      _RECONNECT: 15
    }, //心跳间隔
    heartBeatTimeOut: 5, //心跳超时时间
    heartBeatErrNum: 0, //心跳错误次数
    failIntervalId: null,
    failHeartBeatInterval: 10,
    isOffLine: false, //判断网络是否掉线
    reLoginNum: 0,
    maxReLoginNum: 10,
    requestTime: '',
    requestCounter: 0,
    requestLimit: 300,
    reqSig: '',
    reqTimestamp: '',
    WS_TYPE: 4,
    reqAuth: '',
    ipSpeedTestConfig: {
      _count: 10,
      _interval: 1000,
      _timeout: {
        _3G: 10 * 1000,
        _WIFI: 5 * 1000,
        _LAN: 1 * 1000,
        _4G: 3 * 1000,
        _GPRS: 20 * 1000,
        _OTHER: 10 * 1000
      }
    },
    reconnectInterval: null,  //重连定时器
    reconnectIntervalTime: 15,  //重连定时器时间
    reconnectNum: 0,  //重连次数
    maxReconnectNum: 45,  //最大重连次数
    sessionId: null,
    isOpenOfflineSwitch: true,
    isV3: false //判断是否接入的v3版本媒体
  };

  //私有方法
  var YTX_Methods = {
    jsonp: function (url, param, callback, onError) {
      var p = "";
      if (param) {
        p = "&";
        for (i in param) {
          p += i + "=" + param[i] + "&";
        }
      }

      var c = "ytx" + parseInt(Math.random() * 1000000) + "_" + new Date().getTime();
      window[c] = function (e) {
        callback(e);
      };
      var urq = url + "?cb=" + c + p;
      var s = document.createElement('script');
      s.src = urq;
      var tar = document.querySelector("body");
      tar.appendChild(s);
      s.onload = function (e) {
        tar.removeChild(s);
        delete window[c];
      };
      s.onerror = function (err) {
        onError(err);
        delete window[c];
      };
    },
    checkFileReader: function () {
      var FileReader = FileReader || window.FileReader;
      if (!FileReader) {
        return false
      }
      return true
    },
    //  发送心跳
    heartBeat: function () {
      if (YTX_CONFIG.reconnectNum === 0) {
        var id = setTimeout(function () {
          YTX_Methods.heartBeatCallBackErr(++YTX_CONFIG.heartBeatErrNum)
        }, YTX_CONFIG.heartBeatTimeOut * 1000);
        var str = JSON.stringify({
          hb: id
        });
        YTX_Methods.sendMsg(str);
      }
    },
    heartBeatCallBack: function (obj) {
      YTX_CONFIG.heartBeatErrNum = 0;
      if (!!obj) {
        clearTimeout(obj);
      }
      commonMethods.logger.info("heartBeat succ");
    },
    heartBeatCallBackErr: function (num) {
      commonMethods.logger.info("heart beat err");
      if (num > 3) {
        YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.NoLogin;
        if (YTX_CONFIG.intervalId) clearInterval(YTX_CONFIG.intervalId);
        if (YTX_CONFIG.reconnectNum === 0) {
          YTX_Methods.reconnect(function () {
          });
        }
      }
    },
    _reauthListener: function (res) {

    },
    _connectStatListener: function (res) {

    },
    doIpSpeedTest: function (ipSpeedTestPolicy) {
      var type = ipSpeedTestPolicy["1"];
      if (type === 2) {
        var ipAdds = ipSpeedTestPolicy["2"];
        for (var i in ipAdds) {
          var ipAdd = ipAdds[i];
          if (ipAdd["3"] !== YTX_CONFIG.WS_TYPE) {
            continue;
          }
          var count = (!!ipSpeedTestPolicy["3"]) ? ipSpeedTestPolicy["3"] : YTX_CONFIG.ipSpeedTestConfig._count;
          var interval = (!!ipSpeedTestPolicy["4"]) ? ipSpeedTestPolicy["4"] : YTX_CONFIG.ipSpeedTestConfig._interval;
          var timeout = (!!ipSpeedTestPolicy["5"]) ? ipSpeedTestPolicy["5"] : YTX_CONFIG.ipSpeedTestConfig._timeout._WIFI;
          var num = 0,
            receiveNum = 0;
          var webSocket = new WebSocket('ws://' + ipAdd["1"] + ":" + ipAdd["2"]);
          var startTime, endTime, maxDelay = 0,
            minDelay = 0,
            totalDelay = 0;
          var tId = setTimeout(function () {
            commonMethods.logger.info("ipSpeedTest timeout...");
            webSocket.close();
          }, (interval * count + timeout));
          webSocket.tid = tId;
          webSocket._ip = ipAdd["1"];
          webSocket._port = ipAdd["2"];
          webSocket.num = 0;
          webSocket.receiveNum = 0;
          webSocket.onopen = function (event) {
            var wb = this;
            commonMethods.logger.info("start ipSpeedTest...");
            var intervalId = setInterval(function () {
              var tstamp = new Date().getTime();
              if (wb.num === 0) {
                wb.startTime = tstamp;
              }
              var str = '{"hb":' + (tstamp) + '}';
              wb.send(str);
              wb.num++;
              if (wb.num >= count) {
                clearInterval(intervalId);
              }
            }, interval);
          };
          webSocket.onmessage = function (event) {
            var data = event.data;
            data = JSON.parse(data);
            this.endTime = new Date().getTime();
            var stime = data["hb"];
            var delay = this.endTime - stime;
            if (!this.totalDelay) {
              this.totalDelay = 0;
            }
            this.totalDelay += delay;
            if (!this.maxDelay) {
              this.maxDelay = delay;
            } else {
              if (this.maxDelay < delay) {
                this.maxDelay = delay;
              }
            }
            if (!this.minDelay) {
              this.minDelay = delay;
            } else {
              if (this.minDelay > delay) {
                this.minDelay = delay;
              }
            }
            this.receiveNum++;
            if (this.receiveNum === count) {
              if (!!this.tid) {
                clearTimeout(this.tid);
              }
              this.close();
            }
          };
          webSocket.onclose = function (event) {
            commonMethods.logger.info("ipSpeedTest complete...");
            if (event.code > 1000) {
              console.warn('ipspeed socket has closed, error code :' + event.code + ': ' + event.reason + ': ' + event.wasClean);
            }
            var netWork = 1;
            var lost, averageDelay, costtime;
            if (this.receiveNum > 0) {
              lost = (count - this.receiveNum) / count * 100;
              averageDelay = this.totalDelay / this.receiveNum;
            } else {
              lost = 100;
            }
            var jsonStr = '{\"IpSpeedResult\":{\"1\":' + netWork + ',' + '\"3\":\"' + this._ip + '\",' + '\"4\":' + this._port + ',' + '\"5\":' + lost;
            if (averageDelay > 0) {
              jsonStr += ',\"6\":' + averageDelay;
            }
            if (this.minDelay > 0) {
              jsonStr += ',\"7\":' + this.minDelay;
            }
            if (this.maxDelay > 0) {
              jsonStr += ',\"8\":' + this.maxDelay;
            }
            if (!!ipSpeedTestPolicy["7"]) {
              jsonStr += ',\"11\":\"' + ipSpeedTestPolicy["7"] + '\"';
            }
            jsonStr += '}}';
            var str = '{\"MsgLite\":{\"1\":' + commonConfig.msgTypeNo._ipSpeedTest + ',\"2\":' + jsonStr + '}}';
            if (YTX_CONFIG.loginStatus === YTX_CONFIG.loginStatusNo.Logined) {
              YTX_Methods.sendMsg(str);
            }
          }
        }
      }
    },
    //生成流水号
    generateClientNo: function (param, callback, onError) {
      var clientNo;
      if (param.notUpdate) {
        clientNo = commonConfig.ClientNo;
      } else {
        clientNo = ++commonConfig.ClientNo;
      }
      param.callback = callback;
      param.onError = onError;
      var i = setTimeout(function () {
        var resp = {};
        if (YTX_CONFIG.loginStatus === YTX_CONFIG.loginStatusNo.LoggingIn) {
          YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.NoLogin;
        }
        resp.code = commonConfig.errCode._RESP_TIME_OUT;
        if (!!param.orignMsgId) {
          resp.msgId = param.orignMsgId;
        }
        if (!!param.msgId) {
          resp.msgClientNo = param.msgId;
        }
        resp.msg = 'request time out.';
        onError(resp);
        console.log('time out clientNo is: ' + clientNo);
        delete YTX_CONFIG.clientMap[clientNo];
      }, YTX_CONFIG.timeOutSecond * 1000);
      param.timeout = i;
      YTX_CONFIG.clientMap[clientNo] = param;
      return clientNo;
    },
    //消息发送
    sendMsg: function (content) {
      var json = JSON.parse(content);
      var msgLite = json["MsgLite"];
      if (msgLite) {
        var clientNo = msgLite["3"];
        var request = YTX_CONFIG.clientMap[clientNo];
      } else if (json['hb']) {
        var request = {
          timeout: json['hb']
        };
      }
      var onError = function () {};
      if (request && request.onError) onError = request.onError;
      if (content.indexOf('UserAuth') === -1 && !ytx.checkOnline(function () {
        commonMethods.logger.info("user not onLine");
        if (request && request.timeout) clearTimeout(request.timeout);
        var resp = {};
        resp.code = commonConfig.errCode._NO_LOGIN;
        resp.msg = 'user not login';
        onError(resp);
      }, null)) {
        commonMethods.logger.info("user not onLine");
        return
      }
      var curTime = new Date().getTime();
      if (!YTX_CONFIG.requestTime) {
        YTX_CONFIG.requestTime = curTime;
        YTX_CONFIG.requestCounter = 0;
      } else if ((curTime - YTX_CONFIG.requestTime) > 60 * 1000) {
        YTX_CONFIG.requestTime = curTime;
        YTX_CONFIG.requestCounter = 0;
      }
      if (YTX_CONFIG.requestCounter++ < YTX_CONFIG.requestLimit) {
        commonMethods.logger.info("send msg : " + content);
        YTX_CONFIG.socket.send(content);
      } else {
        try {
          clearTimeout(request.timeout);
        } catch (e) {
          console.log("Cannot read property 'timeout' of undefined");
        }
        var resp = {};
        resp.code = commonConfig.errCode._REQUEST_TOO_FREQUENT;
        resp.msg = 'request too quick, please wait a minute.';
        onError(resp);
        commonMethods.logger.info('request too quick, please wait a minute.');
      }
    },
    checkH5: function () {
      try {
        window.localStorage.testItem = 'test';
        window.localStorage.removeItem('testItem');
      } catch (e) {
        commonConfig.hasLocalStorage = false;
      }
      if (!!window.WebSocket) {
        commonMethods.logger.info("this brower is support H5 . Version is " + navigator.appVersion + ". vendor is :" + navigator.vendor + ". Is online :" + navigator.onLine + ' version:' + this.version);
        return true;
      } else {
        commonMethods.logger.error("sorry, your brower not support H5, exist!");
        return false;
      }

    },
    setAuthSigTime: function (reqSig, longTimestamp, reqAuth) {
      commonConfig.reqSig = reqSig;
      commonConfig.reqTimestamp = longTimestamp;
      commonConfig.reqAuth = reqAuth;
      setTimeout(function () {
        commonMethods.logger.info("auth sig is out of time , reAuth ...");
        YTX_CONFIG.reqTimestamp = null;
        YTX_CONFIG.reqSig = null;
        YTX_CONFIG.reqAuth = null;
        YTX_Methods._reauthListener();
      }, 8280000);

    },
    onHttpResonse: function (obj) {
      obj = obj["Http"];
      if (!obj) {
        return;
      }
      if (!!obj["6"] && obj["6"] != commonConfig.errCode._SUCC) {
        YTX_Methods.onResponseErr(obj);
        return;
      }
      var request = YTX_CONFIG.clientMap[obj["3"]];
      if (!request) {
        commonMethods.logger.warn("receive a unrequest response, clientNo:" + obj["3"]);
        return;
      }
      var callback = request.callback;
      try {
        clearTimeout(request.timeout);
      } catch (e) {
        console.log("Cannot read property 'timeout' of undefined");
      }
      if (!callback || !ytx.chatActive) {
        return;
      }
      Chat.receiveHttpResponse(obj, request.callback);
    },
    onRequestResp: function (obj) {
      console.log(obj, "_onRequestResp");
      obj = obj["resp"];
      var request = YTX_CONFIG.clientMap[obj["3"]];
      if (!request) {
        YTX_Methods.logger.warn("receive a unrequest response, clientNo:" + obj["3"]);
        return;
      }
      var callback = request.callback;
      try {
        clearTimeout(request.timeout);
      } catch (e) {
        console.log("Cannot read property 'timeout' of undefined");
      }
      if (!callback) {
        return;
      }
      if (ytx.chatActive) Chat.receiveRequestResponse(obj, callback);
      obj["2"]["fileUrl"] = Base64.decode(YTX_CONFIG.lvsServer);
      callback(obj["2"]);

    },
    onResponse: function (obj) {
      commonMethods.logger.info("receive msg : " + obj);
      try {
        obj = JSON.parse(obj);
      } catch (e) {
        console.log(e);
        return;
      }
      if (!!obj["hb"]) {
        YTX_Methods.heartBeatCallBack(obj["hb"]);
        return
      }
      if (!obj["MsgLite"]) {
        if (!!obj["Http"]) {
          YTX_Methods.onHttpResonse(obj);
        } else if (!!obj["resp"] && ytx.chatActive) {
          YTX_Methods.onRequestResp(obj, callback);
        }
        return
      }

      obj = obj["MsgLite"];
      if (!!obj["6"] && obj["6"] !== commonConfig.errCode._SUCC) {
        YTX_Methods.onResponseErr(obj);
        return
      }
      var type = obj["1"];
      if (type === commonConfig.msgTypeNo._callRoute) {
        var data = YTX_CONFIG.clientMap[obj["3"]];
        if (data && !!data.timeout) {
          clearTimeout(data.timeout);
        }
        if (obj["6"] === commonConfig.errCode._SUCC) {
          if (!!data.callback) {
            var resp = {};
            resp.code = 200;
            data.callback(resp);
          }
        } else {
          if (!!data && !!data.onError) {
            var resp = {};
            resp.code = obj["6"];
            data.onError(resp);
          }
        }
        //TODO 会议相关，会议有标识 ?
        if (!!obj["2"]) {
          if (YTX_CONFIG.isV3) {
            RL_Media.processMsg(obj);
          } else if (ROOT.RL_AV.isActive) {
            ROOT.RL_Media.processMsg(obj);
          }
        }
        return;
      } else if (type === commonConfig.msgTypeNo._onLineStateNotify) { //上线下线消息通知
        console.log('receiveOnLineStateNotify----', obj);
        if (ytx.chatActive) Chat.receiveOnLineStateNotify(obj);
        return;

      } else if (type === commonConfig.msgTypeNo._pushMsg) { //普通文本消息和附件走这个分支
        if (ytx.chatActive) Chat.receivePushMsg(obj);
        return;

      } else if (type === commonConfig.msgTypeNo._pushMsgNotify) {
        if (ytx.chatActive) Chat.receivePushMsgNotify(obj);
        return;
      } else if (type === commonConfig.msgTypeNo._syncMsg) { //登陆的时候发现最大版本号和已读版本号不一致会发送一个拉取消息，该分支是响应。
        var request = YTX_CONFIG.clientMap[obj["3"]];
        if (!request) {
          commonMethods.logger.info("receive a unrequest response, clientNo:" + obj["3"]);
          return;
        }
        if (ytx.chatActive) Chat.receiveSyncMsg(obj, request)
      } else if (type === commonConfig.msgTypeNo._kickOff) { //被踢下线，要释放媒体
        var loginRsp = YTX_Methods.parseKickOffResp(obj);
        if (!!YTX_Methods._connectStatListener) {
          YTX_Methods._connectStatListener(loginRsp);
        }
        Chat.confirmMsg();
        ytx.logout();
        return;
      } else if (type === commonConfig.msgTypeNo._chatRoom.MSG_SEND_LiveChatRoom_MESSAGE && !obj["3"]) {
        if (ytx.chatActive) Chat.receiveChatRoomMsg(obj);
        return;
      } else if (type === commonConfig.msgTypeNo._ConferenceNotice) { //会议通知
        if (YTX_CONFIG.isV3) {
          RL_Media.receiveConferenceNotice(obj);
        } else if (ytx.meetActive) {
          Meet.receiveConferenceNotice(obj);
        }
        return;
      }
      var request = YTX_CONFIG.clientMap[obj["3"]];
      if (!request) {
        commonMethods.logger.error("receive a unrequest response, clientNo:" + obj["3"]);
        return;
      }
      var callback = request.callback;
      try {
        clearTimeout(request.timeout);
      } catch (e) {
        console.log("Cannot read property 'timeout' of undefined");
      }
      if (!callback) {
        return;
      }
      if (type === commonConfig.msgTypeNo._login) {
        var loginRsp = YTX_Methods.parseLoginResp(obj);
        if (loginRsp.authState === 1) {
          var loginRsp = YTX_Methods.parseKickOffResp(obj);
          YTX_Methods.logout();
          if (!!YTX_Methods._connectStatListener) {
            YTX_Methods._connectStatListener(loginRsp);
          }
          return;
        }
        window.addEventListener('offline', function () {
          console.log('offline---');
          YTX_CONFIG.isOffLine = true;
          if (YTX_CONFIG.reconnectNum === 0 && commonConfig.token) {
            YTX_Methods.reconnect(function () {
            });
          }
        }, true);
        window.addEventListener('online', function () {
          YTX_CONFIG.isOffLine = false;
          if (commonConfig.token) {
            YTX_Methods.reconnect(function () {
            });
          }
        }, true);
        YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.Logined;
        YTX_CONFIG.reLoginNum = 0;
        YTX_CONFIG.heartBeatErrNum = 0;
        if (!loginRsp.authToken) {
          loginRsp.authToken = obj["8"];
        }
        if (!loginRsp.authToken && !!commonConfig.token) {
          loginRsp.authToken = commonConfig.token;
        }
        if (commonConfig.msgVersion === 0) {
          var v = parseInt(commonMethods.getlocalStorage());
          console.log('v---', v, loginRsp.historyver);
          //设置了需要拉取离线消息  并且  本地存储版本号不为0的时候 取本地消息版本号
          //其他情况均从本地版本号和历史版本号中取较大的那个
          if (YTX_CONFIG.isOpenOfflineSwitch && v !== 0) {
            commonConfig.msgVersion = v;
          } else {
            if (loginRsp.historyver > v) {
              console.log('loginRsp.historyver---', loginRsp.historyver);
              commonConfig.msgVersion = loginRsp.historyver;
              commonMethods.setlocalStorage(loginRsp.historyver);
            } else {
              commonConfig.msgVersion = v;
            }
          }
          if (commonConfig.msgVersion > loginRsp.version) {
            commonConfig.msgVersion = loginRsp.version;
            commonMethods.setlocalStorage(loginRsp.version);
          }
          console.log('commonConfig.msgVersion---', commonConfig.msgVersion, loginRsp)
        }
        commonConfig.maxMsgVersion = loginRsp.version;
        // var msgCount = -1;
        // if (typeof msgCount !== 'number') {
        //   msgCount = -1;
        // }
        // if (msgCount > commonConfig.maxMsgVersion - commonConfig.msgVersion) {
        //   msgCount = -1;
        // }
        // if (msgCount > -1) {
        //   commonConfig.msgVersion = commonConfig.maxMsgVersion - msgCount;
        //   commonMethods.setlocalStorage(YTX_CONFIG._msgVersion);
        // }

        if (commonConfig.msgVersion < commonConfig.maxMsgVersion && ytx.chatActive) {
          Chat.processSyncMsg(2);
        }
        loginRsp.historyver = loginRsp.version;
        YTX_CONFIG.sessionId = loginRsp.authToken;
        commonConfig.token = loginRsp.authToken;
        ROOT.commonConfig.userName = commonConfig.userName;
        ROOT.commonConfig.token = commonConfig.token;
        ROOT.commonConfig.appid = commonConfig.appid;
        var ipSpeedTestPolicy = loginRsp.ipSpeedTestPolicy;
        delete loginRsp.transferPolicy;
        delete loginRsp.ipSpeedTestPolicy;
        if (YTX_CONFIG.reconnectNum > 0) {
          YTX_CONFIG.reconnectInterval && clearInterval(YTX_CONFIG.reconnectInterval)
          YTX_CONFIG.reconnectNum = 0;
          YTX_Methods.connectStateChange(3, "reconnect to server suc!");
        }
        if (!!YTX_CONFIG.intervalId) {
          window.clearInterval(YTX_CONFIG.intervalId);
        }
        YTX_CONFIG.intervalId = window.setInterval(YTX_Methods.heartBeat, YTX_CONFIG.heartBeatInterval._WIFI * 1000);
        if (!!YTX_CONFIG.failIntervalId) {
          clearInterval(YTX_CONFIG.failIntervalId);
          YTX_CONFIG.failIntervalId = null;
        }
        Chat.enterRoom();
        if (!!callback) {
          callback(loginRsp);
        }
        if (!!ipSpeedTestPolicy) {
          YTX_Methods.doIpSpeedTest(ipSpeedTestPolicy);
        }
        if (parseInt(commonMethods.getlocalStorage()) === 0) {
          YTX_Methods.uploadUserDevice(function (res) {
            console.log('uploadUserDevice---succ', res)
          }, function (err) {
            console.log('uploadUserDevice---err', err)
          });
        }
      } else if (type === commonConfig.msgTypeNo._logout) {
        Chat.unLoad();
        Meet.unLoad();
        YTX_CONFIG.logout();
        callback(commonMethods.parseCodeResp(obj));
      } else if (type === commonConfig.msgTypeNo._sendMsg) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseSendMsgResp');
      } else if (type === commonConfig.msgTypeNo._getMyInfo || type == commonConfig.msgTypeNo._setMyInfo) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseGetMyInfo');
      } else if (type === commonConfig.msgTypeNo._createGroup) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseCreateGroupResp');
      } else if (type === commonConfig.msgTypeNo._getOwnGroups) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseGetGroupListResp');
      } else if (type === commonConfig.msgTypeNo._queryGroupMembers) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseGetGroupMemberListResp');
      } else if (type === commonConfig.msgTypeNo._getGroupDetail) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseGetGroupDetailResp');
      } else if (type === commonConfig.msgTypeNo._searchGroups) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseSearchGroupsResp');
      } else if (type === commonConfig.msgTypeNo._queryGroupMemberCard) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseQueryGroupMemberCard');
      } else if (type === commonConfig.msgTypeNo._getUserState) {
        if (commonConfig.newUserState) {
          if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseGetUserState_multy');
        } else {
          if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseGetUserState');
        }
      } else if (type === commonConfig.msgTypeNo._chatRoom._enterChatRoom) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseEnterChatRoomResp');
      } else if (type === commonConfig.msgTypeNo._chatRoom._fetchChatroomInfo) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseFetchChatRoomInfoResp');
      } else if (type === commonConfig.msgTypeNo._chatRoom._fetchChatroomMembers) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseFetchChatRoomMembersResp');
      } else if (type === commonConfig.msgTypeNo._chatRoom.MSG_SEND_LiveChatRoom_MESSAGE) {
        if (!obj["2"]) {
          if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseSendChatRoomMsgResp');
        } else {
          if (ytx.chatActive) Chat.receiveChatRoomMsg(obj);
        }
        return;
      } else if (type === commonConfig.msgTypeNo._getTopContact) {
        if (ytx.chatActive) Chat.receiveMsgResp(obj, request, 'parseGetTopContactResp');
      } else if (type === commonConfig.msgTypeNo._ConferenceMessage) {
        if (YTX_CONFIG.isV3) {
          RL_Media.receiveMsgResp(obj, request, 'parseConferenceMessageResp');
        } else if (ytx.meetActive) {
          Meet.receiveMsgResp(obj, request, 'parseConferenceMessageResp');
        }
      } else {
        callback(commonMethods.parseCodeResp(obj));
      }
      if (type !== commonConfig.msgTypeNo._sendMsg) {
        delete YTX_CONFIG.clientMap[obj["3"]];
      }
    },
    onResponseErr: function (obj) {
      var request = YTX_CONFIG.clientMap[obj["3"]];
      if (YTX_CONFIG.loginStatus === YTX_CONFIG.loginStatusNo.LoggingIn) {
        YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.NoLogin;
      }
      var onError = function () {};
      var callback = function () {}
      if (!!request) {
        onError = request.onError || function () {
        };
        callback = request.callback || function () {
        };
        try {
          clearTimeout(request.timeout);
        } catch (e) {
          console.log("Cannot read property 'timeout' of undefined");
        }
      }
      if (obj["1"] === commonConfig.msgTypeNo._getMyInfo && obj["6"] == commonConfig.reqErrCode.AccountInexistent) {
        var resp = {};
        resp.version = 1;
        resp.nickName = commonConfig.userName;
        resp.sex = 0;
        resp.birth = '1970-01-01';
        callback(resp);
      } else if ((obj["6"] >= commonConfig.reqErrCode.NoAppkey && obj["6"] <= (commonConfig.reqErrCode.MissingLoginParam + 1)) || (obj["6"] >= commonConfig.reqErrCode.MissingPwd && obj["6"] <= commonConfig.reqErrCode.IncorrectPwd) || (obj["6"] >= commonConfig.reqErrCode.IncorrectAccount && obj["6"] <= commonConfig.reqErrCode.IncorrectAccount) || (obj["6"] >= commonConfig.reqErrCode.AccountIllegal && obj["6"] <= commonConfig.reqErrCode.AccountIllegal) || obj["6"] === commonConfig.reqErrCode.RegistOver) {
        onError(commonMethods.parseCodeResp(obj));
        return;
      } else if ((obj["6"] >= commonConfig.reqErrCode.NoAppkey - 1 && obj["6"] <= commonConfig.reqErrCode.RegistOver + 1) || (obj["6"] >= commonConfig.reqErrCode.callRouteError - 1 && obj["6"] <= commonConfig.reqErrCode.unknownError) || obj["6"] == 219000) {
        YTX_CONFIG.reconnectNum = 0;
        YTX_CONFIG.reconnectInterval && clearInterval(YTX_CONFIG.reconnectInterval)
        YTX_CONFIG.reLoginNum = 1;
        YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.NoLogin;
        if (!!YTX_CONFIG.socket) {
          YTX_CONFIG.socket.onclose = function () {
          };
          YTX_CONFIG.socket.close();
          YTX_CONFIG.socket = null
        }
        onError(commonMethods.parseCodeResp(obj));
        YTX_CONFIG.reconnectInterval && clearInterval(YTX_CONFIG.reconnectInterval);
        YTX_Methods.connectStateChange(5, "connect fail,please relogin", obj["6"]);
        return;
      }
      if (obj["1"] === commonConfig.msgTypeNo._login) {
        YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.NoLogin;
      }
      if (obj["1"] === commonConfig.msgTypeNo._sendMsg) {
        onError ? onError(YTX_Methods.parseSendMsgRespErr(obj, request)) : console.log("onError is missing,lack of onerror callback");
        return;
      }
      delete YTX_CONFIG.clientMap[obj["3"]];
      if (obj["6"] === commonConfig.reqErrCode.MsgVersionOverdue) {
        if (!request.repeat || request.repeat < 0) { //r6的是小于1
          if (!!request.repeat) {
            request.repeat += 1;
          } else {
            request.repeat = 2;
          }
          Chat.processSyncMsg(request.type, request.endVersion, null, request.repeat);
        } else {
          if ((request.endVersion - commonConfig.msgVersion) > Chat.maxSyncNum) {
            commonConfig.msgVersion = commonConfig.msgVersion + Chat.maxSyncNum;
          } else {
            commonConfig.msgVersion = request.endVersion;
          }
          if (ytx.chatActive) Chat.processSyncMsg();
        }
      } else {
        onError(commonMethods.parseCodeResp(obj));
      }
    },
    generateImei: function () {
      commonConfig.imei = hex_md5(commonConfig.appId + commonConfig.userName + YTX_CONFIG.sdkName);
    },
    reconnect: function (callback) { //重连
      YTX_CONFIG.reconnectInterval && clearInterval(YTX_CONFIG.reconnectInterval);
      YTX_CONFIG.reconnectNum = 0;
      YTX_Methods.reconnectFn(callback);
      YTX_CONFIG.reconnectInterval = setInterval(function () {
        YTX_Methods.reconnectFn(callback);
      }, YTX_CONFIG.reconnectIntervalTime*1000);
    },
    reconnectFn: function (callback) {
      YTX_CONFIG.reconnectNum++;
      console.log('YTX_CONFIG.reconnectNum-------------', YTX_CONFIG.reconnectNum);
      if (YTX_CONFIG.reconnectNum > YTX_CONFIG.maxReconnectNum) {
        YTX_CONFIG.reconnectInterval && clearInterval(YTX_CONFIG.reconnectInterval);
        if (YTX_CONFIG.isOffLine) {
          YTX_Methods.connectStateChange(1, "网络掉线");
        } else {
          YTX_CONFIG.reconnectNum = 0;
          YTX_CONFIG.reconnectInterval && clearInterval(YTX_CONFIG.reconnectInterval)
          YTX_Methods.connectStateChange(5, "超出最大重连次数，请重新登录", '550004');
        }
        return
      }
      YTX_Methods.connectStateChange(2, "reconnect to server");
      YTX_Methods.initScoket({
        type: 2,
        sig: null,
        timestamp: null,
        reset: true,
        isReconnect: true
      }, callback, function () {
      });
    },
    buildLogin: function (data, callback, onError) { //生成登录消息
      if (!commonConfig.imei) {
        YTX_Methods.generateImei();
      }
      var loginJsonStr, sendObj, MsgLiteObj;
      sendObj = {
        1: data.type,
        2: commonConfig.appId,
        8: commonConfig.imei,
        10: YTX_CONFIG.network
      };
      MsgLiteObj = {
        1: commonConfig.msgTypeNo._login
      }
      if (data.type !== YTX_CONFIG.loginTypeNo.LoginByOther) { //完整认证
        sendObj[3] = commonConfig.userName;
        sendObj[4] = data.timestamp || '';
        sendObj[5] = commonConfig.deviceType;
        sendObj[6] = data.sig || '';
        sendObj[7] = ytx.version;
        sendObj[9] = YTX_CONFIG.loginMode;
        sendObj[10] = YTX_CONFIG.network;
        sendObj[11] = YTX_CONFIG.userPwd || '';
        sendObj[16] = data.clientIp;
        if(!!data.compId) sendObj[17] = Base64.encode(JSON.stringify({compId:data.compId}));;
      } else {
        MsgLiteObj[8] = commonConfig.token;
      }

      loginJsonStr = YTX_Methods.msgBuild({
        sendObj: sendObj,
        MsgLiteObj: MsgLiteObj,
        msgKey: 'UserAuth',
        clientData: {}
      }, callback, onError);
      return loginJsonStr

    },
    msgBuild: function (data, callback, onError) {
      /*
              * data结构
              * {
              *   sendObj: 发送的消息内容,
              *   MsgLiteObj: 发送消息的配置
              *   msgKey: 发送消息的关键字
              *   clientData: 生成流水号的配置
              *   MsgLiteKey: 发送消息类型
              * }
              * */
      data.MsgLiteKey = data.MsgLiteKey || 'MsgLite';
      data.clientData = data.clientData || {};
      var sendJsonStr = data.sendObj;
      console.log('clientData', data.clientData)
      var clientNo = YTX_Methods.generateClientNo(data.clientData, callback, onError);
      if (data.MsgLiteKey === 'request') {
        data.MsgLiteObj[1] = data.msgKey;
        data.MsgLiteObj[2] = commonConfig.userAcc;
        data.MsgLiteObj[4] = commonConfig.reqSig;
        data.MsgLiteObj[5] = commonConfig.reqAuth;
        data.MsgLiteObj[6] = clientNo;
        if (data.sendObj) {
          data.MsgLiteObj[3] = sendJsonStr
        }
      } else if (data.MsgLiteKey === 'Http') {
        if (data.sendObj) {
          data.MsgLiteObj[2] = {};
          data.MsgLiteObj[2][data.msgKey] = sendJsonStr
        }
        data.MsgLiteObj[4] = commonConfig.fileSig;
      } else {
        if (data.sendObj) {
          var sendProto = {};
          sendProto[data.msgKey] = sendJsonStr;
          data.MsgLiteObj[2] = sendProto;
        }
        data.MsgLiteObj[3] = clientNo;
      }
      var msgLite = {};
      msgLite[data.MsgLiteKey] = data.MsgLiteObj;
      console.log('sendMsg---', msgLite);
      return JSON.stringify(msgLite)
    },
    getServerIp: function (data, callback, onError) {
      if (!YTX_CONFIG.getServer) {
        YTX_Methods.initScoket(data, callback, onError);
        return;
      }
      var appid = commonConfig.appId;
      var apptoken = commonConfig.token;
      var accunt = '';
      var sigs = '';
      var w = '';
      if (data.type === YTX_CONFIG.loginTypeNo.LoginByUserName) {
        sigs = data.sig;
        accunt = appid;
        w = 'Application/';
      } else {
        sigs = hex_md5(appid + commonConfig.userName + data.timestamp + YTX_CONFIG.userPwd);
        accunt = window.encodeURIComponent(appid + '#' + commonConfig.userName);
        w = 'User/';
      }
      var datas = {
        "sig": sigs,
        "userName": commonConfig.userName,
        "authorization": data.timestamp,
        "version": YTX_CONFIG.version,
        "type": data.type.toString()
      };
      console.log(datas.authorization)
      YTX_Methods.jsonp(Base64.decode(YTX_CONFIG.appServer) + w + accunt + "/GetServerBalance", datas, function (e) {
        var lvs = 'https://' + e["LVS"][0].host + ":" + e["LVS"][0].port;
        var fileurl = 'wss://' + e["webSocketServer"][0].host + ":" + e["webSocketServer"][0].port + "/ws";
        var server = 'wss://' + e["webSocketServer"][0].host + ":" + e["webSocketServer"][0].port + "/ws";
        // if (ytx.chatActive) Chat.setConfig({
        //   lvsServer: [Base64.encode(lvs)],
        //   fileServerWs: Base64.encode(fileurl)
        // });
        YTX_CONFIG.serverIp = [Base64.encode(server)];
        YTX_Methods.initScoket(data, callback, onError);
      }, function (e) {
        var resp = {};
        resp.code = '510100';
        resp.msg = 'get server failed, please check the parameter';
        onError(resp);
      });
    },
    initScoket: function (data, callback, onError) {
      //当重连次数超过最大重连数，停止重连
      if (data.isReconnect && YTX_CONFIG.reconnectNum > YTX_CONFIG.maxReconnectNum) return;
      console.log('data---', data);
      if (data.type === undefined || (data.type === YTX_CONFIG.loginTypeNo.LoginByUserName && data.sig === undefined)) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = "login type or sig is empty";
        onError(resp);
        return;
      }
      window.onbeforeunload = function (event) {
        Chat.confirmMsg();
        if (!!YTX_CONFIG.beforeUnLoad) {
          for (var i in YTX_CONFIG.beforeUnLoad) {
            if (typeof YTX_CONFIG.beforeUnLoad[i] == "function") {
              YTX_CONFIG.beforeUnLoad[i]();
            }
          }
        }
        YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.Logined;
        if (YTX_CONFIG.socket && YTX_CONFIG.socket.close) YTX_CONFIG.socket.close();
        if (ytx.chatActive) {
          Chat.chatRoomId = null;
          Chat.chatRoomNickName = null;
          Chat.chatRoomInfoExt = null;
        }
        ytx.logout();

      };
      if (data.reset) {
        if (!!YTX_CONFIG.socket) {
          YTX_CONFIG.socket.onclose = function () {
          };
          if (YTX_CONFIG.socket && YTX_CONFIG.socket.close) YTX_CONFIG.socket.close();
          YTX_CONFIG.socket = null;
        }
        YTX_CONFIG.isConnect = false;
        YTX_CONFIG.isConnecting = false;
      }
      if (!YTX_CONFIG.isConnect) {
        if (!YTX_CONFIG.isConnecting) {
          var serverip = Base64.decode(YTX_CONFIG.serverIp[0]);
          YTX_CONFIG.socket = new WebSocket(serverip);
          YTX_CONFIG.isConnecting = true;
          var tId = setTimeout(function () {
            if (YTX_CONFIG.isConnecting) {
              YTX_CONFIG.isConnecting = false;
              var resp = {};
              resp.code = commonConfig.errCode._NETWORK_TIME_OUT;
              resp.msg = 'connect to websocket time out.';
              onError(resp);
              return;
            }
          }, YTX_CONFIG.timeOutSecond * 1000);
          var sessionId = YTX_CONFIG.currentSession;
          YTX_CONFIG.socket.onopen = function (event) {
            if (!!tId) {
              clearTimeout(tId);
            }
            commonMethods.logger.info("Client connect to Server ");
            YTX_CONFIG.isConnect = true;
            YTX_CONFIG.isConnecting = false;
            if (!commonConfig.imei) {
              YTX_Methods.generateImei();
            }
            YTX_CONFIG.loginType = data.type;
            var sendStr = YTX_Methods.buildLogin(data, callback, onError);
            if (!!sendStr) {
              YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.LoggingIn;
              YTX_Methods.sendMsg(sendStr);
            }
          };
          YTX_CONFIG.socket.onmessage = function (event) {
            if (sessionId !== YTX_CONFIG.currentSession) {
              return;
            }
            commonMethods.logger.info(commonMethods.getTimeStamp() + ' Client received a message:' + JSON.stringify(event));
            YTX_Methods.onResponse(event.data);
          };
          YTX_CONFIG.socket.onclose = function (event) {
            if (event.code > 1000) {
              commonMethods.logger.warn('main websocket has closed, error code :' + event.code + ': ' + event.reason + ': ' + event.wasClean);
            }
            if (!!tId) {
              clearTimeout(tId);
            }
            if (sessionId !== YTX_CONFIG.currentSession) {
              return;
            }
            commonMethods.logger.info('Client notified socket has closed:' + JSON.stringify(event));
            if (YTX_CONFIG.loginStatus === YTX_CONFIG.loginStatusNo.Logined) {
              YTX_CONFIG.isConnect = false;
              YTX_CONFIG.isConnecting = false;
              YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.NoLogin;
              if (YTX_CONFIG.reconnectNum === 0) {
                YTX_Methods.connectStateChange(1, "connect closed");
                YTX_Methods.reconnect(function () {
                });
              }
            } else if (YTX_CONFIG.isConnecting) {
              YTX_CONFIG.isConnecting = false;
              var resp = {};
              resp.code = commonConfig.errCode._NETWORK_ERR;
              resp.msg = 'connecting to websocket, please wait.';
              onError(resp);
              return;
            }
            YTX_CONFIG.isConnecting = false;
          }
        } else {
          commonMethods.logger.info('Client is connecting to server, please wait')
        }
      } else {
        if (YTX_CONFIG.loginStatus === YTX_CONFIG.loginStatusNo.NoLogin) {
          var sendStr = YTX_Methods.buildLogin(data, callback, onError);
          if (!!sendStr) {
            YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.LoggingIn;
            YTX_Methods.sendMsg(sendStr);
          }
        } else if (YTX_CONFIG.loginStatus === YTX_CONFIG.loginStatusNo.LoggingIn) {
          commonMethods.logger.info('user is logining, please wait..');
        } else {
          commonMethods.logger.info('user has login');
        }
      }
    },
    connectStateChange: function (code, msg, errCode) {
      var resp = {};
      resp.code = code;
      resp.msg = msg;
      resp.errCode = errCode || '';
      YTX_Methods._connectStatListener(resp);
    },
    uploadUserDevice: function (callback, onError) {
      var sig = commonConfig.fileSig;
      var sendObj = {
        1: commonConfig.appId,
        2: commonConfig.userName,
        3: commonConfig.deviceType
      }
      var ua = window.navigator.userAgent;
      if (!!ua) {
        sendObj[4] = ua
      }
      var sendFunc = function () {
        sendObj[11] = YTX_CONFIG.version;
        sendObj[12] = commonConfig.imei;
        ytx.sendMsg({
          sendObj: sendObj,
          MsgLiteObj: {
            1: 5,
            4: sig
          },
          msgKey: 'UserDevice',
          MsgLiteKey: 'Http'
        }, callback, onError);
      };
      if (window.navigator.geolocation) {
        var options = {
          enableHighAccuracy: true,
          timeout: 1000
        };
        window.navigator.geolocation.getCurrentPosition(function (pos) {
          var coords = pos.coords;
          var latitude = coords.latitude * 1000;
          var longitude = coords.longitude * 1000;
          sendObj[9] = latitude;
          sendObj[10] = longitude;
          sendFunc();
        }, sendFunc, options)
      } else {
        sendFunc();
      }
    },
    parseSendMsgRespErr: function (obj, request) {
      var resp = {};
      var clientNo = obj["3"];
      resp.msgClientNo = request.msgId;
      resp.msgId = request.orignMsgId;
      resp.code = obj["6"];
      return resp
    },
    parseLoginResp: function (obj) {
      var data = obj["2"];
      data = data["UserAuthResp"];
      var resp = {};
      resp.authState = data["1"];
      resp.kickoffText = data["2"];
      resp.connectorId = data["3"];
      resp.version = (!!data["4"]) ? data["4"] : 0;
      resp.transferPolicy = data["6"];
      resp.pversion = data["7"];
      resp.softVersion = data["8"];
      resp.historyver = (!!data["10"]) ? data["10"] : 0;
      resp.authToken = data["11"];
      resp.ipSpeedTestPolicy = data["12"];
      resp.multLine = data["18"];
      return resp
    },
    parseKickOffResp: function (obj) {
      var data = obj["2"];
      data = data["UserAuthResp"];
      var resp = {};
      resp.code = 4;
      resp.msg = data["2"];
      return resp;
    }
  };
  var RL_Media;
  RLYTX.prototype = {
    //登录初始化
    init: function (config) {
      /*
              * data = {
              *   appId: appId,
              *   serverIp: IM的ws地址
              *   fileSig: ''
              *   maxReconnectNum
              *   deviceType
              *   isOpenOfflineSwitch
              * }
              * */
      var resp = {};
      //判断浏览器是否支持ws
      if (!YTX_Methods.checkH5()) {
        resp.code = commonConfig.errCode._NOT_SUPPORT_H5;
        resp.msg = 'The brower do not support HTML5,please change the brower';
        return resp
      }
      //参数校验
      if (!config.appId) {
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = 'appid  is null,please check you param';
        return resp
      }
      if (config.serverIp) {
        YTX_CONFIG.serverIp[0] = Base64.encode(config.serverIp);
      }
      if (config.useBuilder) {
        commonConfig.useBuilder = config.useBuilder;
        ROOT.RL_Builder = new RL_Builder();
      }
      if (config.deviceType) commonConfig.deviceType = config.deviceType;
      if (typeof config.isOpenOfflineSwitch === 'boolean') YTX_CONFIG.isOpenOfflineSwitch = config.isOpenOfflineSwitch;
      if (config.maxReconnectNum) YTX_CONFIG.maxReconnectNum = config.maxReconnectNum;
      YTX_CONFIG.isV3 = config.isV3;
      RL_Media = config.RL_Media || ROOT.RL_Media;

      //获取浏览器功能支持情况
      var notSupport = [];
      // if (!YTX_Methods.getUserMedia()) {
      //     notSupport.push(commonConfig.errCode._VOIP_NO_MEDIA)
      // }
      if (!YTX_Methods.checkFileReader()) {
        notSupport.push(commonConfig.errCode._NOT_SUPPORT_FILE)
      }
      // if (!YTX_Methods.getPeerConnection()) {
      //     notSupport.push(commonConfig.errCode._NOT_SUPPORT_CALL)
      // }
      if (!commonMethods.getWindowURL()) {
        notSupport.push(commonConfig.errCode._NOT_SUPPORT_URL)
      }
      // if (!YTX_Methods.getMediaRecorder()) {
      //     notSupport.push(commonConfig.errCode._NOT_SUPPORT_RECORDER);
      // }

      //消息提醒
      YTX_CONFIG.Notification = window.Notification || window.mozNotification || window.webkitNotification || window.msNotification || window.webkitNotifications;
      if (!!YTX_CONFIG.Notification) {
        YTX_CONFIG.Notification.requestPermission(function (permission) {
          if (YTX_CONFIG.Notification.permission !== "granted") {
            YTX_CONFIG.Notification.permission = "granted"
          }
          ;
        })
      }
      ROOT.commonConfig = {
        errCode: commonConfig.errCode,
        msgTypeNo: commonConfig.msgTypeNo,
        userName: commonConfig.userName,
        token: commonConfig.token,
        appId: commonConfig.appId,
        timeOutSecond: YTX_CONFIG.timeOutSecond,
        logPrint: commonConfig.logPrint,
        useBuilder: commonConfig.useBuilder
      };
      ROOT.commonMethods = {
        logger: commonMethods.logger,
        getWindowURL: commonMethods.getWindowURL
      };
      commonConfig.fileSig = config.fileSig;
      commonConfig.appId = config.appId;
      resp.code = commonConfig.errCode._SUCC;
      resp.msg = 'init success';
      resp.unsupport = notSupport;
      return resp;

    },
    //初始化会议功能
    meetInit: function (data) {
      if (!ROOT.RL_AV) return {code: 501, msg: '当前版本不支持会议功能'};
      ROOT.RL_MEET = new RL_MEET();
      Meet = ROOT.RL_MEET;
      this.meetActive = true;
      if (typeof data === "object") Meet.setConfig(data);
      return {code: 200, msg: 'success'}
    },
    //初始化聊天功能
    chatInit: function (data) {
      ROOT.RL_Chat = new RL_Chat();
      Chat = ROOT.RL_Chat;
      this.RL_Chat = Chat;
      this.chatActive = true;
      if (typeof data === "object") Chat.setConfig(data);
      return {code: 200, msg: 'success'}
    },
    //登陆
    login: function (data, callback, onError) {
      /*
              *data = {
              *   appId: appId,
              *   sig: sig,
              *   type: 登录方式
              *   userName: 账户名
              *   timeStamp: 时间戳
              *   password
              * }
               *  */
      data = commonMethods.getParam(data);
      var resp = {};
      if (!commonConfig.appId) {
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = 'appid  is null,please init first ';
        onError(resp);
        return;
      }
      if (YTX_CONFIG.loginStatus !== YTX_CONFIG.loginStatusNo.NoLogin) {
        if (YTX_CONFIG.loginStatus === YTX_CONFIG.loginStatusNo.Logined) {
          commonMethods.logger.info("user already login.");
        } else if (YTX_CONFIG.loginStatus === YTX_CONFIG.loginStatusNo.LoggingIn) {
          commonMethods.logger.info("user logining");
        }
        return;
      }
      if (data.type === YTX_CONFIG.loginTypeNo.LoginByVoip && !YTX_CONFIG.userPwd) {
        resp.code = commonConfig.errCode._LOGIN_NO_PWD;
        resp.msg = 'param userPwd is empty';
        onError(resp);
        return;
      }
      if (!commonConfig.fileSig) {
        commonConfig.fileSig = '2b9c64616c98a93f1375bf0a2f6429e7';
      }
      if (data.type && data.type !== YTX_CONFIG.loginTypeNo.LoginByVoip && data.type !== YTX_CONFIG.loginTypeNo.LoginByOther && data.type !== YTX_CONFIG.loginTypeNo.LoginByUserName) {
        var resp = {};
        resp.msg = 'param type is wrong';
        onError(resp);
        return;
      }
      if (!data.userName && data.type !== YTX_CONFIG.loginTypeNo.LoginByOther) {
        var resp = {};
        resp.code = commonConfig.errCode._LOGIN_NO_USERNAME;
        resp.msg = 'param userName is empty';
        onError(resp);
        return;
      }
      console.log(data.userName, '-------');
      commonConfig.userName = data.userName;
      this.userName = data.userName;
      ROOT.commonConfig.userName = commonConfig.userName;
      YTX_CONFIG.userAcc = commonConfig.appId + '#' + data.userName;
      if (data.authSig) {
        YTX_Methods.setAuthSigTime(data.authSig, data.timestamp, data.reqAuth);
      }
      if (typeof commonConfig.userName !== 'string') {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
        resp.msg = 'parameter type false ,please check the parameter';
        onError(resp);
        return
      }
      if (typeof data.sig === 'number') {
        data.sig = data.sig + ''
      }
      YTX_CONFIG.userPwd = data.password;
      YTX_Methods.getServerIp({
        type: data.type,
        sig: data.sig,
        timestamp: data.timestamp,
        reset: true,
        clientIp: data.clientIp,
        compId: data.compId,
      }, callback, onError);
    },
    logout: function (callback, onError) {
      if (YTX_CONFIG.loginStatus !== YTX_CONFIG.loginStatusNo.Logined) return;
      Chat.confirmMsg();
      if (!commonConfig.imei) {
        YTX_Methods.generateImei();
      }
      this.sendMsg({
        sendObj: {
          1: commonConfig.imei
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._logout
        },
        msgKey: 'Logout',
        clientData: {}
      }, callback, onError);
      commonConfig.token = null;
      commonConfig.userName = null;
      commonConfig.userPwd = null;
      commonConfig.imei = null;
      for (var i in YTX_CONFIG.clientMap) {
        var request = YTX_CONFIG.clientMap[i];
        if (!request) {
          return;
        }
        try {
          clearTimeout(request.timeout);
        } catch (e) {
          console.log("Cannot read property 'timeout' of undefined");
        }
      }
      YTX_CONFIG.clientMap = {};
      YTX_CONFIG.sessionId = null;
      YTX_CONFIG.currentSession = null;
      commonConfig.ClientNo = 0;
      YTX_CONFIG.reconnectNum = 0;
      YTX_CONFIG.reconnectInterval && clearInterval(YTX_CONFIG.reconnectInterval)
      YTX_CONFIG.loginStatus = YTX_CONFIG.loginStatusNo.NoLogin;
      YTX_CONFIG.isConnect = false;
      if (YTX_CONFIG.socket) {
        YTX_CONFIG.socket.close();
      }
      YTX_CONFIG.socket = null;
      window.clearInterval(YTX_CONFIG.intervalId);
      YTX_CONFIG.intervalId = null;
      if (this.chatActive) Chat.unLoad();
      if (this.meetActive) Meet.unLoad();
      callback && callback();
    },
    setConfig: function (data) {
      if (typeof data !== "object") return;
      YTX_CONFIG = commonMethods.assign(YTX_CONFIG, data);
    },
    reauthListener: function (callback) {
      YTX_Methods._reauthListener = callback
    },
    onConnectStateChangeLisenter: function (callback) {
      YTX_Methods._connectStatListener = callback
    },
    checkOnline: function (onErr, msgId, msgClientNo) {
      var resp = {};
      if (!commonConfig.userName) {
        resp.code = commonConfig.errCode._NO_LOGIN;
        if (!!msgId) {
          resp.msgId = msgId;
        }
        if (!!msgClientNo) {
          resp.msgClientNo = msgClientNo;
        }
        resp.msg = 'user not login';
        onErr(resp);
        return false;
      }
      if (YTX_CONFIG.loginStatus !== YTX_CONFIG.loginStatusNo.Logined) {
        commonMethods.logger.warn("no user login");
        if (YTX_CONFIG.isConnect) {
          resp.code = commonConfig.errCode._NO_LOGIN;
        } else {
          resp.code = commonConfig.errCode._NETWORK_ERR;
        }
        if (!!msgId) {
          resp.msgId = msgId;
        }
        if (!!msgClientNo) {
          resp.msgClientNo = msgClientNo;
        }
        resp.msg = 'user not login';
        onErr(resp);
        return false;
      }
      return true;
    },
    sendMsg: function (data, callback, onError) {
      var sendStr = YTX_Methods.msgBuild(data, callback, onError);
      if (sendStr) YTX_Methods.sendMsg(sendStr);
    },
    destroy: function () {
      if (!!YTX_CONFIG.socket) {
        YTX_CONFIG.socket.close();
      }
    },
    bindBeforeUnLoad: function (callback) {
      if (!!YTX_CONFIG.beforeUnLoad) {
        YTX_CONFIG.beforeUnLoad[YTX_CONFIG.beforeUnLoad.length] = callback;
      }
      return YTX_CONFIG.beforeUnLoad.length - 1;
    },
    unbindBeforeUnLoad: function (i) {
      YTX_CONFIG.beforeUnLoad[i] = null;
    },
    setReqSigTime: function (reqSig, longTimestamp) {
      YTX_CONFIG.setAuthSigTime(reqSig, longTimestamp);
    },
    setLogClose: function () {
      commonConfig.logPrint = false;
    },
    setHeartBeatTime: function (hbTime) {
      if (typeof hbTime === "number")
        YTX_CONFIG.heartBeatInterval._WIFI = hbTime
      else
        throw "heart beat time must be number"
    },
    setMsgVersion: function (version, callback, onError) {
      if (typeof version !== 'number'){
        commonMethods.logger.info('param version is NaN');
        onError({
          msg: 'param version is NaN'
        });
        return
      }
      commonConfig.msgVersion = version;
      callback({
        code: 200,
        msg: 'success'
      })
    }
  }

  //builder类，兼容老版本sdk的传值方式
  function RL_Builder() {

  }
  var builderMethods = {
    productBuilder: function (data) {
      return function Builder() {
        var builderData = {};
        var self = this;
        for (var param in data) {
          (function (name, key) {
            self['set' + name[0].toUpperCase() + name.substr(1)] = function (val) {
              builderData[key] = val;
            };
            self['get' + name[0].toUpperCase() + name.substr(1)] = function () {
              return builderData[key]
            }
          })(param, data[param])
        }
        this.getData = function () {
          return builderData;
        }
      }
    }
  };
  RL_Builder.prototype = {
    LoginBuilder: builderMethods.productBuilder({
      type: 'type',
      userName: 'userName',
      pwd: 'password',
      sig: 'sig',
      timestamp: 'timestamp',
      authSig: 'authSig',
      reqAuth: 'reqAuth'
    }),
    MsgBuilder: builderMethods.productBuilder({
      id: 'id',
      text: 'content',
      file: 'file',
      type: 'type',
      receiver: 'receiver',
      domain: 'domain',
      fileName: 'fileName',
      atAccounts: 'atAccounts'
    }),
    ChatroomMsgBuilder: builderMethods.productBuilder({
      id: 'id',
      text: 'content',
      type: 'type',
      receiver: 'receiver',
      domain: 'domain',
    }),
    SyncMsgBuilder: builderMethods.productBuilder({
      sVersion: 'startVersion',
      eVersion: 'endVersion',
      type: 'type'
    }),
    UploadPersonInfoBuilder: builderMethods.productBuilder({
      nickName: 'nickName',
      sex: 'sex',
      birth: 'birth',
      sign: 'sign'
    }),
    GetHistoryMsgBuilder: builderMethods.productBuilder({
      pageSize: 'pageSize',
      talker: 'talker',
      order: 'order',
      time: 'time',
      msgDecompression: 'msgDecompression'
    }),
    CreateGroupBuilder: builderMethods.productBuilder({
      groupName: 'groupName',
      groupType: 'groupType',
      province: 'province',
      city: 'city',
      scope: 'scope',
      declared: 'declared',
      permission: 'permission',
      mode: 'mode',
      groupDomain: 'groupDomain',
      target: 'target'
    }),
    DismissGroupBuilder: builderMethods.productBuilder({
      groupId: 'groupId'
    }),
    InviteJoinGroupBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      declared: 'declared',
      members: 'members',
      confirm: 'confirm'
    }),
    ConfirmInviteJoinGroupBuilder: builderMethods.productBuilder({
      invitor: 'inviter',
      groupId: 'groupId',
      confirm: 'confirm'
    }),
    QuitGroupBuilder: builderMethods.productBuilder({
      groupId: 'groupId'
    }),
    GetGroupListBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      pageSize: 'pageSize',
      target: 'target'
    }),
    GetGroupMemberListBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      pageSize: 'pageSize',
      memberId: 'memberId'
    }),
    JoinGroupBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      declared: 'declared'
    }),
    ConfirmJoinGroupBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      memberId: 'memberId',
      confirm: 'confirm'
    }),
    GetGroupDetailBuilder: builderMethods.productBuilder({
      groupId: 'groupId'
    }),
    SearchGroupsBuilder: builderMethods.productBuilder({
      searchType: 'searchType',
      keywords: 'keyWords'
    }),
    DeleteGroupMemberBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      memberId: 'memberId'
    }),
    ForbidMemberSpeakBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      memberId: 'memberId',
      forbidState: 'forbidState'
    }),
    SetGroupMessageRuleBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      isNotice: 'isNotice',
      isApplePush: 'isApplePush'
    }),
    QueryGroupMemberCardBuilder: builderMethods.productBuilder({
      memberId: 'memberId',
      belong: 'belong'
    }),
    ModifyMemberCardBuilder: builderMethods.productBuilder({
      memberId: 'memberId',
      belong: 'belong',
      display: 'display',
      phone: 'phone',
      mail: 'mail',
      remark: 'remark'
    }),
    ModifyGroupBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      groupName: 'groupName',
      type: 'type',
      province: 'province',
      city: 'city',
      scope: 'scope',
      declared: 'declared',
      permission: 'permission',
      groupDomain: 'groupDomain'
    }),
    GetUserStateBuilder: builderMethods.productBuilder({
      useracc: 'userAcc',
      newUserstate: 'newUserState'
    }),
    SetGroupMemberRoleBuilder: builderMethods.productBuilder({
      groupId: 'groupId',
      memberId: 'memberId',
      role: 'role'
    }),
    MakeCallBuilder: builderMethods.productBuilder({
      called: 'called',
      callType: 'isVoipCall',
      role: 'role',
      deviceId: 'deviceId',
      tel: 'tel',
      nickname: 'nickName'
    }),
    AcceptCallBuilder: builderMethods.productBuilder({
      callId: 'callId',
      caller: 'caller',
      callType: 'isVoipCall',
      deviceId: 'deviceId'
    }),
    RejectCallBuilder: builderMethods.productBuilder({
      callId: 'callId',
      caller: 'caller',
      userData: 'userData'
    }),
    ReleaseCallBuilder: builderMethods.productBuilder({
      callId: 'callId',
      caller: 'caller',
      called: 'called'
    }),
    DeleteReadMsgBuilder: builderMethods.productBuilder({
      msgid: 'msgId',
      version: 'version'
    }),
    MsgOperationBuilder: builderMethods.productBuilder({
      msgid: 'msgId',
      version: 'version',
      type: 'type'
    }),
    GetRecentContactListBuilder: builderMethods.productBuilder({
      time: 'time',
      limit: 'limit'
    }),
    MsgBackBuilder: builderMethods.productBuilder({
      msgId: 'msgId',
      version: 'version'
    }),
    MsgReadBuilder: builderMethods.productBuilder({
      msgId: 'msgId',
      version: 'version'
    }),
    SetTopContactBuilder: builderMethods.productBuilder({
      contact: 'contact',
      type: 'type'
    }),
    EnterChatroomBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      nickName: 'nickName',
      infoExt: 'infoExt',
      needNotify: 'needNotify',
      notifyExt: 'notifyExt'
    }),
    ExitChatroomBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      needNotify: 'needNotify',
      notifyExt: 'notifyExt'
    }),
    FetchChatroomInfoBuilder: builderMethods.productBuilder({
      roomId: 'roomId'
    }),
    AllMuteBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      allMuteMode: 'allMuteMode',
      needNotify: 'needNotify',
      notifyExt: 'notifyExt'
    }),
    UpdateChatroomInfoBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      roomName: 'roomName',
      announcement: 'announcement',
      roomExt: 'roomExt',
      allMuteMode: 'allMuteMode',
      needNotify: 'needNotify',
      notifyExt: 'notifyExt'
    }),
    UpdateChatRoomMemberRoleBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      userId: 'userId',
      type: 'type',
      needNotify: 'needNotify',
      notifyExt: 'notifyExt'
    }),
    FetchChatroomMembersBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      userId: 'userId',
      type: 'type',
      needNotify: 'needNotify',
      notifyExt: 'notifyExt'
    }),
    UpdateMyChatroomMemberInfoBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      nickName: 'nickName',
      infoExt: 'infoExt'
    }),
    KickMemberBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      userIds: 'userId',
      notifyExt: 'notifyExt',
      needNotify: 'needNotify'
    }),
    UpdateMemberOptionBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      userId: 'userId',
      state: 'state',
      enable: 'enable',
      muteDuration: 'muteDuration',
      notifyExt: 'notifyExt',
      needNotify: 'needNotify'
    }),
    UpdateMemberStateBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      userId: 'userId',
      state: 'state',
      muteDuration: 'muteDuration',
      notifyExt: 'notifyExt',
      needNotify: 'needNotify'
    }),
    ConnectMediaBuilder: builderMethods.productBuilder({
      called: 'called',
      callType: 'isVoipCall',
      deviceId: 'deviceId'
    }),
    DefriendMemberBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      userId: 'userId',
      state: 'state',
      needNotify: 'needNotify',
      notifyExt: 'notifyExt'
    }),
    ForbidChatRoomMemberBuilder: builderMethods.productBuilder({
      roomId: 'roomId',
      userId: 'userId',
      state: 'state',
      muteDuration: 'muteDuration',
      needNotify: 'needNotify',
      notifyExt: 'notifyExt'
    }),
    ConferenceMsgBuilder: builderMethods.productBuilder({
      path: 'path',
      content: 'content'
    }),
    GetFriendsBuilder: builderMethods.productBuilder({
      size: 'size',
      isUpdate: 'isUpdate'
    }),
    AddFriendsBuilder: builderMethods.productBuilder({
      friendUseracc: 'friendUserAcc',
      message: 'message',
      source: 'source'
    }),
    SetFriendRemarkBuilder: builderMethods.productBuilder({
      friendUseracc: 'friendUserAcc',
      remarkName: 'remarkName'
    }),
    DelFriendBuilder: builderMethods.productBuilder({
      friendUseracc: 'friendUserAcc',
      allDel: 'allDel'
    }),
    GetRequestHistoryListBuilder: builderMethods.productBuilder({
      timestamp: 'timestamp',
      size: 'size'
    }),
    GetOtherInfoBuilder: builderMethods.productBuilder({
      searchContent: 'friendUserAcc'
    }),
    SetUserVerifyBuilder: builderMethods.productBuilder({
      needVerify: 'addVerify'
    }),
    AgreeFriendRequestBuilder: builderMethods.productBuilder({
      friendUseracc: 'friendUserAcc'
    }),
    RefuseFriendRequestBuilder: builderMethods.productBuilder({
      friendUseracc: 'friendUserAcc',
      message: 'message'
    }),
    GetFriendInfoBuilder: builderMethods.productBuilder({
      friendUseracc: 'friendUserAcc'
    }),
    UploadAvatarBuilder: builderMethods.productBuilder({
      file: 'file'
    }),
    ReqMeetingMemberVideoBuilder: builderMethods.productBuilder({
      memberid: 'memberId',
      reqssrc: 'ssrc',
      videosource: 'videoSource',
      videocodec: 'videocodec',
      video: 'video'
    }),
    ReleaseMeetingMemberVideoBuilder: builderMethods.productBuilder({
      memberid: 'memberId'
    })
  }

  //聊天构造函数
  var RL_YTX = {};
  var chat = {};
  function RL_Chat() {
    RL_YTX = ROOT.RL_YTX_NEW;
    chat = this;
    this.msgType = {
      _TEXT: 1,
      _VOICE: 2,
      _VEDIO: 3,
      _PICTURE: 4,
      _POSITION: 5,
      _COMPRESS_FILE: 6,
      _FILE: 7,
      _LINK: 8,
      _sendAtMsg: 11,
      _userMsgState: 12,
      _Readed: 24,
      _COMMAND: 26
    };
    this.maxSyncNum = 200;
    this.maxFileLen = chatConfig.maxFileLen;
  }

  var chatConfig = {
    fileServerIp: "", //文件服务器地址
    lvsServer: '',  //图片服务器地址
    receiveMsgBuf: {},
    chatRoomId: null,
    chatRoomNickName: '',
    chatRoomInfoExt: '',
    chatRoomNotifyExt: '',
    groupConfig: {
      _groupArray: [],
      _groupMemberArray: [],
      _builder: {
        pageSize: 0
      }
    },
    maxMsgLen: 2048,
    getStateTime: null,
    getStateCount: 0,
    fTimestamp: null,
    sendMsgId: 0,
    maxFileLen: 1024 * 1024 * 100,
    wsTimeout: 40,
    getMsgByArray: false, //是否使用数组方式下发消息
    blobType: {
      // 'mov':'video/quicktime',
      'mov': 'video/vnd.sealedmedia.softseal.mov',
      'aac': 'audio/aac',
      'abw': 'application/x-abiword',
      'arc': 'application/x-freearc',
      'avi': 'video/x-msvideo',
      'azw': 'application/vnd.amazon.ebook',
      'bin': 'application/octet-stream',
      'bmp': 'image/bmp',
      'bz': 'application/x-bzip',
      'bz2': 'application/x-bzip2',
      'csh': 'application/x-csh',
      'css': 'text/css',
      'csv': 'text/csv',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'eot': 'application/vnd.ms-fontobject',
      'epub': 'application/epub+zip',
      'gif': 'image/gif',
      'htm': 'text/html',
      'html': 'text/html',
      'ico': 'image/vnd.microsoft.icon',
      'ics': 'text/calendar',
      'jar': 'application/java-archive',
      'jpeg': 'image/jpeg',
      'jpg': 'image/jpeg',
      'js': 'text/javascript',
      'json': 'application/json',
      'jsonld': 'application/ld+json',
      'mid': 'audio/midi audio/x-midi',
      'midi': 'audio/midi audio/x-midi',
      'mjs': 'text/javascript',
      'mp3': 'audio/mpeg',
      'mpeg': 'video/mpeg',
      'mpkg': 'application/vnd.apple.installer+xml',
      'odp': 'application/vnd.oasis.opendocument.presentation',
      'ods': 'application/vnd.oasis.opendocument.spreadsheet',
      'odt': 'application/vnd.oasis.opendocument.text',
      'oga': 'audio/ogg',
      'ogv': 'video/ogg',
      'ogx': 'application/ogg',
      'otf': 'font/otf',
      'png': 'image/png',
      'pdf': 'application/pdf',
      'ppt': 'application/vnd.ms-powerpoint',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'rar': 'application/x-rar-compressed',
      'rtf': 'application/rtf',
      'sh': 'application/x-sh',
      'svg': 'image/svg+xml',
      'swf': 'application/x-shockwave-flash',
      'tar': 'application/x-tar',
      'tif': 'image/tiff',
      'tiff': 'image/tiff',
      'ttf': 'font/ttf',
      'txt': 'text/plain',
      'vsd': 'application/vnd.visio',
      'wav': 'audio/wav',
      'weba': 'audio/webm',
      'webm': 'video/webm',
      'webp': 'image/webp',
      'woff': 'font/woff',
      'woff2': 'font/woff2',
      'xhtml': 'application/xhtml+xml',
      'xls': 'application/vnd.ms-excel',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'xml': 'application/xml',
      'xul': 'application/vnd.mozilla.xul+xml',
      'zip': 'application/zip',
      '3gp': 'video/3gpp',
      '3g2': 'video/3gpp2',
      '7z': 'application/x-7z-compressed',
      'amr': 'audio/x-wav'
    }
  };
  var chatMethods = {
    processOfflineMsg: function () {
      return -1
    },
    //数据解析
    parseGetHistoryMsg: function (obj) {
      var resp = [];
      var data = obj["2"];
      for (var i in data) {
        var orign = data[i];
        var result = {};
        if (orign.msgType === commonConfig.msgTypeNo._msg_CMD) {
          var msg = chatMethods.parseNoticeMsg(orign);
          // var you_sender = msg.serviceNo;
          // var groupId = msg.groupId;
          var name = '系统通知';
          var groupName = msg.groupName;
          // var version = msg.msgId;
          // var peopleId = msg.member;
          var people = (!!msg.memberName) ? msg.memberName : msg.member;
          var you_msgContent = '';
          var auditType = parseInt(msg.auditType);
          var groupTarget = (msg.target === 2) ? "群组" : "讨论组";
          if (1 === auditType) {
            you_msgContent = '[' + people + ']申请加入' + groupTarget + '[' + groupName + ']'
          } else if (2 === auditType) {
            you_msgContent = '[' + groupName + ']管理员邀请您加入' + groupTarget
          } else if (3 === auditType) {
            you_msgContent = '[' + people + ']直接加入群组[' + groupName + ']'
          } else if (4 === auditType) {
            you_msgContent = '管理员解散了群组[' + groupName + ']'
          } else if (5 === auditType) {
            you_msgContent = '[' + people + ']退出了' + groupTarget + '[' + groupName + ']'
          } else if (6 === auditType) {
            you_msgContent = '[' + groupName + ']管理员将[' + people + ']踢出' + groupTarget
          } else if (7 === auditType) {
            you_msgContent = '管理员同意[' + people + ']加入群组[' + groupName + ']的申请'
          } else if (8 === auditType) {
            if (2 !== obj.confirm) {
              you_msgContent = '[' + people + ']拒绝了群组[' + groupName + ']的邀请'
            } else {
              you_msgContent = '[' + people + ']同意了管理员的邀请，加入群组[' + groupName + ']'
            }
          } else if (10 === auditType) {
            you_msgContent = '管理员修改' + groupTarget + '[' + groupName + ']信息'
          } else if (11 === auditType) {
            you_msgContent = '用户[' + people + ']修改群组成员名片'
          } else if (12 === auditType) {
            you_msgContent = '用户[' + people + ']成为' + groupTarget + '[' + groupName + ']管理员'
          } else {
            you_msgContent = '未知type[' + auditType + ']'
          }
          result.msgContent = you_msgContent;
          result.msgType = orign.msgType;
          result.msgSender = name;
          result.msgId = orign.msgDateCreated + '|' + orign.version
        } else {
          if (!!orign.version) {
            result.msgId = orign.msgDateCreated + '|' + orign.version
          } else {
            result.msgId = orign.msgId
          }
          result.msgContent = orign.msgContent;
          result.msgSender = orign.msgSender;
          result.msgReceiver = orign.msgReceiver;
          result.msgDomain = orign.msgDomain;
          if (orign.msgFileName) {
            result.msgFileName = orign.msgFileName
          }
          if (!!orign.msgFileUrl) {
            var fileUrl = orign.msgFileUrl;
            if (fileUrl.indexOf('_thum') > 0) {
              fileUrl = fileUrl.substring(0, fileUrl.indexOf('_thum'))
            }
            // if(orign.msgType == 2) {
            //     fileUrl = fileUrl.substring(0, fileUrl.lastIndexOf('.')) + '.wav'
            // }
            result.msgFileUrl = chatConfig.lvsServer + fileUrl;
            if (result.msgType === 3) {
              result.msgFileUrlThum = msg.msgFileUrl + '_thum'
            }
          }
        }
        result.msgDateCreated = orign.msgDateCreated;
        if (!!orign.msgFileSize) {
          result.msgFileSize = orign.msgFileSize
        }
        resp.push(result)
      }
      return resp
    },
    parseNoticeMsg: function (obj) {
      var domain = obj.msgDomain;
      domain = Base64.decode(domain).replace(new RegExp(/(')/g), "\"");
      var domainInfo = JSON.parse(domain);
      var resp = {};
      resp.auditType = domainInfo.auditType;
      resp.groupId = domainInfo.groupId;
      resp.groupName = domainInfo.groupName;
      resp.declared = domainInfo.declared;
      resp.confirm = domainInfo.confirm;
      resp.ext = domainInfo.ext;
      resp.version = obj.version;
      resp.serviceNo = obj.msgSender;
      resp.target = domainInfo.target;
      if (domainInfo.auditType == 2 || domainInfo.auditType == 4 || domainInfo.auditType == 10) {
        resp.admin = domainInfo.member;
        resp.adminName = domainInfo.nickName
      } else if (domainInfo["auditType"] == 11) {
        resp.admin = domainInfo.admin;
        resp.member = domainInfo.member;
        resp.memberName = domainInfo.nickName
      } else if (domainInfo["auditType"] == 14) {
        resp.admin = domainInfo.admin;
        resp.memberList = domainInfo.memberList;
      } else {
        resp.member = domainInfo.member;
        resp.memberName = domainInfo.nickName
      }
      return commonMethods.assign(resp, obj, domainInfo)
    },
    parseGetRecentContactList: function (obj) {
      var resp = [];
      var data = obj["2"];
      for (var i in data) {
        var orign = data[i];
        var result = {};
        var userAcc = orign.sessionId;
        var name = orign.sessionName;
        var time = orign.dateCreated;
        result.name = name;
        result.time = time;
        result.contact = userAcc;
        resp.push(result);
      }
      return resp;
    },
    parseMsgNotify: function (obj) {
      var domain = obj.msgDomain;
      var domainInfo = JSON.parse(domain);
      var msgId = domainInfo.msgid;
      var resp = {};
      resp.msgType = obj.msgType;
      resp.sender = obj.msgSender;
      resp.msgId = msgId;
      resp.dateCreated = obj.dateCreated;
      return resp
    },
    parseChatRoomMsgInner: function (obj) {
      if (!obj.msgDomain) {
        return obj;
      }
      var data = JSON.parse(Base64.decode(obj.msgDomain));
      var resp = {};
      resp["msgSender"] = obj.msgSender;
      resp["msgReceiver"] = obj.msgReceiver;
      resp["msgType"] = obj.msgType;
      resp["msgDateCreated"] = obj.msgDateCreated;
      resp["type"] = data.type;
      resp["roomId"] = data.roomId;
      resp["member"] = data.member;
      resp["nickName"] = data.nickName;
      resp["role"] = data.role;
      resp["roomName"] = data.roomName;
      if (data.notifyExt) resp["notifyExt"] = Base64.decode(data.notifyExt);
      return resp;
    },
    parsePushMsgResp: function (obj) {
      var data = obj["2"];
      data = data["PushMsg"];
      var resp = {};
      resp.version = data["1"];
      resp.msgType = (!!data["2"]) ? data["2"] : 1;
      resp.sessionId = data["3"];
      if (!!data["4"]) {
        resp.msgContent = Base64.decode(data["4"])
      } else {
        resp.msgContent = '';
      }
      resp.msgSender = data["5"];
      resp.msgReceiver = data["6"];
      resp.msgDomain = data["7"];
      resp.msgFileName = data["8"];
      if (!!data["9"]) {
        var fileUrl = data["9"];
        if (!fileUrl.startWith('http')) {

          fileUrl = chatConfig.lvsServer + fileUrl;
        }
        if (fileUrl.indexOf('_thum') > 0) {
          fileUrl = fileUrl.substring(0, fileUrl.indexOf('_thum'));
        }
        resp.msgFileUrl = fileUrl;
        if (resp.msgType == 3) {
          resp.msgFileUrlThum = resp.msgFileUrl + '_thum';
        }
      }
      resp.msgDateCreated = data["10"];
      resp.senderNickName = data["13"];
      resp.mcmEvent = 0;
      if (!!data["14"]) {
        resp.msgFileSize = data["14"];
      }
      if (!!data["15"]) {
        var data = Base64.decode(data["15"]);
        data = JSON.parse(data);
        if (data["isat"]) {
          resp.isAtMsg = true;
        }
        if (data["isSave"]) {
          resp.isSave = true;
        }
        if (data["isSyncMsg"]) {
          resp.isSyncMsg = true;
        }
        if (data["isOfflinePush"]) {
          resp.isOfflinePush = true;
        }
        if (data["isHint"]) {
          resp.isHint = true;
        }
        resp.expandContent = data;
      }
      if (!!data["16"]) {
        resp.senderNick = data[16];
      }
      return resp;
    },
    parsePushMsgNotifyResp: function (obj) {
      var data = obj["2"];
      data = data["PushMsgNotify"];
      var resp = {};
      resp.version = data["1"];
      return resp
    },
    parseSyncMsgResp: function (obj) {
      var data = obj["2"];
      data = data["SyncMsgResp"];
      var resp = [];
      var recVersion = 0;
      for (var i in data) {
        var orign = data[i];
        var msg = {};
        msg.version = orign["1"];
        if (recVersion < msg.version) {
          recVersion = msg.version
        }
        msg.msgType = (!!orign["2"]) ? orign["2"] : 1;
        msg.msgContent = orign["4"];
        if (!!orign["4"]) {
          msg.msgContent = Base64.decode(orign["4"])
        } else {
          msg.msgContent = ''
        }
        msg.msgSender = orign["5"];
        msg.sessionId = orign["3"];
        msg.msgReceiver = orign["6"];
        msg.msgDomain = orign["7"];
        msg.msgFileName = orign["8"];
        if (!!orign["9"]) {
          var fileUrl = orign["9"];
          if (!fileUrl.startWith('http')) {
            fileUrl = chatConfig.lvsServer + fileUrl;
          }
          if (fileUrl.indexOf('_thum') > 0) {
            fileUrl = fileUrl.substring(0, fileUrl.indexOf('_thum'))
          }
          msg.msgFileUrl = fileUrl;
          if (msg.msgType === 3) {
            msg.msgFileUrlThum = msg.msgFileUrl + '_thum';
          }
        }
        msg.msgDateCreated = orign["10"];
        if (!!orign["13"]) {
          msg.mcmEvent = orign["13"];
        } else {
          msg.mcmEvent = 0;
        }
        if (!!orign["14"]) {
          msg.msgFileSize = orign["14"];
        }
        if (!!orign["15"]) {
          var extData = Base64.decode(orign["15"]);
          extData = JSON.parse(extData);
          if (extData["isat"]) {
            msg.isAtMsg = true;
          }
          if (extData["isSave"]) {
            msg.isSave = true;
          }
          if (extData["isSyncMsg"]) {
            msg.isSyncMsg = true;
          }
          if (extData["isOfflinePush"]) {
            msg.isOfflinePush = true;
          }
          if (extData["isHint"]) {
            msg.isHint = true;
          }
          msg.expandContent = extData;
        }
        if (!!orign["16"]) {
          msg.msgSenderNick = orign["16"];
        }
        resp.push(msg);
      }
      return resp;
    },
    parseChatRoomMsg: function (obj) {
      var data = obj["2"];
      if (!data) {
        return {
          code: obj[6]
        };
      }
      data = data["PushMsg"];
      var resp = {};
      resp.version = data["1"];
      resp.msgType = (!!data["2"]) ? data["2"] : 1;
      resp.sessionId = data["3"];
      if (!!data["4"]) {
        resp.msgContent = Base64.decode(data["4"])
      } else {
        resp.msgContent = '';
      }
      resp.msgSender = data["5"];
      resp.msgReceiver = data["6"];
      resp.msgDomain = data["7"];
      resp.msgDateCreated = data["10"];
      resp.senderNickName = data["13"];
      if (!!data["16"]) {
        resp.senderNick = data[16];
      }
      return resp;
    },
    parseSendMsgResp: function (obj, request) {
      var data = obj["2"];
      var resp = {};
      if (!!data && !!data["SendMsgResp"]) {
        data = data["SendMsgResp"];
        resp.token = data["1"];
        resp.url = data["2"]
      }
      var msgId = request.orignMsgId;
      var msgClientNo = request.msgId;
      resp.msgId = msgId;
      resp.msgClientNo = msgClientNo;
      return resp
    },
    parseGetMyInfo: function (obj) {
      var data = obj["2"];
      data = data["PersonInfoResp"];
      var resp = {};
      resp.version = data["1"];
      resp.nickName = data["2"];
      resp.sex = data["3"];
      resp.birth = data["4"];
      resp.sign = data["5"];
      return resp
    },
    parseCreateGroupResp: function (obj) {
      var data = obj["2"];
      if (!data) {
        return
      }
      data = data["CreateGroupResp"];
      var msg = {};
      msg.data = data["1"];
      return msg
    },
    parseGetGroupListResp: function (obj, callback, onErr) {
      var data = obj["2"];
      if (!data) {
        callback(chatConfig.groupConfig._groupArray);
        chatConfig.groupConfig._groupArray = [];
        return
      }
      data = data["GetOwnerGroupsResp"];
      data = data["1"];
      for (var i = 0; i < data.length; i++) {
        var simpleObj = data[i];
        var simpleGroup = {};
        simpleGroup.groupId = simpleObj["1"];
        simpleGroup.name = simpleObj["2"];
        simpleGroup.owner = simpleObj["3"];
        simpleGroup.permission = simpleObj["4"];
        simpleGroup.isNotice = simpleObj["5"];
        simpleGroup.memberCount = simpleObj["6"];
        simpleGroup.scope = simpleObj["7"];
        simpleGroup.dateCreated = simpleObj["8"];
        simpleGroup.target = simpleObj["9"];
        chatConfig.groupConfig._groupArray.push(simpleGroup)
      }
      if (data.length === chatConfig.groupConfig._builder.pageSize) {
        var groupId = data[data.length - 1]["1"];
        var getGroupListData = chatConfig.groupConfig._builder;
        getGroupListData.groupId = groupId
        chat.getGroupList(getGroupListData, callback, onErr)
      } else {
        callback(chatConfig.groupConfig._groupArray);
        chatConfig.groupConfig._groupArray = []
      }
    },
    parseGetGroupMemberListResp: function (obj, callback, onErr) {
      var data = obj["2"];
      if (!data) {
        callback(chatConfig.groupConfig._groupMemberArray);
        chatConfig.groupConfig._groupMemberArray = [];
        return
      }
      data = data["GetGroupMembersResp"];
      var groupId = data["1"];
      data = data["2"];
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        var member = {};
        member.member = obj["1"];
        member.nickName = obj["2"];
        member.speakState = obj["3"];
        member.role = obj["4"];
        member.sex = obj["5"];
        chatConfig.groupConfig._groupMemberArray.push(member)
      }
      if (data.length === chatConfig.groupConfig._builder.pageSize) {
        var memberId = data[data.length - 1]["1"];
        var groupMemberListData = chatConfig.groupConfig._builder;
        groupMemberListData.memberId = memberId;
        chat.getGroupMemberList(groupMemberListData, callback, onErr)
      } else {
        callback(chatConfig.groupConfig._groupMemberArray);
        chatConfig.groupConfig._groupMemberArray = []
      }
    },
    parseGetGroupDetailResp: function (obj) {
      var data = obj["2"];
      var resp = {};
      data = data["GetGroupDetailResp"];
      resp.creator = data["1"];
      resp.groupName = data["2"];
      resp.type = data["3"];
      resp.province = data["4"];
      resp.city = data["5"];
      resp.scope = data["6"];
      resp.declared = data["7"];
      resp.dateCreated = data["8"];
      resp.numbers = data["9"];
      resp.isNotice = data["10"];
      resp.permission = data["11"];
      resp.groupDomain = data["12"];
      resp.isApplePush = data["13"];
      resp.target = data["14"];
      resp.anonymity = data["15"];
      resp.isForbid = data["16"];
      resp.groupPhoto = data["17"];
      resp.isManage = data["18"];
      resp.isAtAll = data["19"];
      resp.inviteOperation = data["20"];
      resp.checkAdminFlag = data["21"];
      return resp
    },
    parseSearchGroupsResp: function (obj) {
      var data = obj["2"];
      var resp = new Array();
      if (!data) {
        return resp
      }
      data = data["SearchGroupsResp"];
      data = data["1"];
      for (var i in data) {
        var simpleObj = data[i];
        var simpleGroup = {};
        simpleGroup.groupId = simpleObj["1"];
        simpleGroup.name = simpleObj["2"];
        simpleGroup.owner = simpleObj["3"];
        simpleGroup.permission = simpleObj["4"];
        simpleGroup.declared = simpleObj["5"];
        simpleGroup.memberCount = simpleObj["6"];
        simpleGroup.scope = simpleObj["7"];
        resp.push(simpleGroup)
      }
      return resp
    },
    parseQueryGroupMemberCard: function (obj) {
      var data = obj["2"];
      var resp = {};
      if (!data) {
        return resp
      }
      data = data["QueryGroupMemberCardResp"];
      resp.member = data["1"];
      resp.groupid = data["2"];
      resp.display = data["3"];
      resp.phone = data["4"];
      resp.mail = data["5"];
      resp.remark = data["6"];
      resp.speakState = data["7"];
      resp.role = data["8"];
      resp.sex = data["9"];
      return resp;
    },
    parseEnterChatRoomResp: function (obj) {
      var data = obj["2"];
      data = data["EnterChatroomResp"];
      var resp = {};
      if (!data) {
        return resp
      }
      resp.creator = data["1"];
      resp.roomNickname = data["2"];
      resp.notice = data["3"];
      resp.onlineCount = data["4"];
      resp.allSilence = data["5"];
      resp.roomExt = data["6"];
      resp.url = data["7"];
      resp.userRole = data["8"];
      resp.state = data["9"];
      resp.keepSilence = data["10"];
      resp.enterTime = data["11"];
      return resp;
    },
    parseFetchChatRoomInfoResp: function (obj) {
      var data = obj["2"];
      data = data["FetchChatroomInfoResp"];
      var resp = {};
      if (!data) {
        return resp
      }
      resp.creator = data["1"];
      resp.roomNickname = data["2"];
      resp.notice = data["3"];
      resp.onlineCount = data["4"];
      resp.allSilence = data["5"];
      resp.roomExt = data["6"];
      return resp;
    },
    parseFetchChatRoomMembersResp: function (obj) {
      var data = obj["2"]["FetchChatroomMembersResp"];
      var resp = [];
      if (!data) {
        return resp
      }
      for (var i = 0; i < data.length; i++) {
        var simpleObj = data[i]["ChatroomMember"];
        var simpleGroup = {};
        simpleGroup.userId = simpleObj["1"];
        simpleGroup.nickName = simpleObj["2"];
        simpleGroup.type = simpleObj["3"];
        simpleGroup.state = simpleObj["4"];
        simpleGroup.muteDuration = simpleObj["5"];
        simpleGroup.enterTime = simpleObj["6"];
        simpleGroup.infoExt = simpleObj["7"];
        resp.push(simpleGroup)
      }
      return resp;
    },
    parseSendChatRoomMsgResp: function (obj, request) {
      var resp = {};
      resp.msgId = request.msgId;
      resp.msgClientNo = request.msgClinetNo;
      resp.code = obj["6"];
      return resp;
    },
    parseGetTopContactResp: function (obj) {
      return obj["2"]["GetTopContactResp"];
    },
    parseGetUserState_multy: function (obj) {
      var data;
      var resp = {};
      if (!!obj["2"]["GetMultiUserStateResp"]) {
        data = obj["2"]["GetMultiUserStateResp"];
        if (!data) {
          data = obj["2"]["GetUserStateResp"];
          if (!data) {
            return resp;
          } else {
            resp.useracc = data["1"];
            resp.network = data["2"];
            resp.state = data["3"];
            resp.device = data["4"];
          }
        } else {
          resp = [];
          for (var i = 0; i < data.length; i++) {
            if (!!data[i]){
              var dataPer = data[i]["GetUserStateResp"];
              var respPer = {};
              respPer.useracc = dataPer["1"];
              respPer.network = dataPer["2"];
              respPer.state = dataPer["3"];
              respPer.device = dataPer["4"];
              resp.push(respPer);
            }
          }
        }
      } else {
        resp = [];
        var dataPer = obj["2"]["GetUserStateResp"];
        var respPer = {};
        if (!!data)
          return resp;
        respPer.useracc = dataPer["1"];
        respPer.network = dataPer["2"];
        respPer.state = dataPer["3"];
        respPer.device = dataPer["4"];
        resp.push(respPer)
      }
      return resp;
    },
    parseGetUserState: function (obj) {
      var data = obj["2"];
      var resp = {};
      if (!data || (data["GetMultiUserStateResp"] && !data["GetMultiUserStateResp"][0])) {
        return resp;
      }
      data = data["GetUserStateResp"] ? data["GetUserStateResp"] : data["GetMultiUserStateResp"][0]["GetUserStateResp"];
      resp.useracc = data["1"];
      resp.network = data["2"];
      resp.state = data["3"];
      resp.device = data["4"];
      return resp;
    },
    //消息监听
    _noticeListener: function (res) {

    },
    _msgNotifyListener: function (res) {

    },
    _charRoomListener: function (res) {

    },
    _friendNoticeMsgListener: function (res) {

    },
    _pushListener: function (res) {

    },
    _OnLineStateNotifyListener: function (res) {

    },
    //功能实现
    generateFullMsgId: function (msgId) {
      return commonConfig.token + '|' + msgId;
    },
    sendParamCheck: function (data, onError) {
      var funName = 'sendParamCheck---';
      var allMsgId = chatMethods.generateFullMsgId(data.msgId);
      if (!data.receiver) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msgId = data.orignMsgId;
        resp.msgClientNo = allMsgId;
        resp.msg = funName + 'param receiver is empty';
        onError(resp);
        return false
      }
      if (!data.content && data.content !== 0 && data.msgType !== 12) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msgId = data.orignMsgId;
        resp.msgClientNo = allMsgId;
        resp.msg = 'param content is empty';
        onError(resp);
        return false
      }
      if (data.content.length > chatConfig.maxMsgLen) {
        var resp = {};
        resp.code = commonConfig.errCode._TEXT_TOO_LONG;
        resp.msgId = data.orignMsgId;
        resp.msgClientNo = allMsgId;
        resp.msg = 'param content over ' + chatConfig.maxMsgLen + ' character, too large.';
        onError(resp);
        return false
      }
      return true
    },
    buildSyncMessage: function (data, onError) {
      var funName = 'buildSyncMessage---';
      if (isNaN(data.startVersion) || isNaN(data.endVersion) || (!!data.type && isNaN(data.type))) {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
        resp.msg = funName + 'param startVersion or endVersion or type is not a number.';
        onError(resp);
        return;
      }
      var sendJsonStr = {};
      sendJsonStr['1'] = "";
      if (data.startVersion === data.endVersion) {
        sendJsonStr['1'] = data.startVersion + '';
      } else if (data.endVersion - data.startVersion <= chat.maxSyncNum) {
        for (var g = data.startVersion; g < data.endVersion + 1; g++) {
          sendJsonStr['1'] += g + ",";
        }
        sendJsonStr['1'] = sendJsonStr['1'].substring(0, sendJsonStr['1'].length - 1);
      } else {
        for (var g = data.startVersion; g < (parseInt(data.startVersion) + chat.maxSyncNum); g++) {
          sendJsonStr['1'] += g + ",";
        }
        sendJsonStr['1'] = sendJsonStr['1'].substring(0, sendJsonStr['1'].length - 1);
      }
      if (!!data.type) {
        sendJsonStr['2'] = data.type;
      }
      RL_YTX.sendMsg({
        sendObj: sendJsonStr,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._syncMsg
        },
        msgKey: 'SyncMsg',
        clientData: {
          endVersion: data.endVersion,
          type: data.type,
          repeat: data.repeat
        }
      }, function () {
      }, onError);
    },
    upload: function (data, callback, onError) {
      var ytx_params = JSON.stringify({
        appId: commonConfig.appId,
        msgType: data.type,
        msgContent: data.content || '',
        msgDomain: data.domain || '',
        msgSender: commonConfig.userName,
        msgReceiver: data.receiver,
        msgFileName: data.file.name,
        msgId: data.msgId,
        deviceNo: commonConfig.imei,
        rotate:data.rotate,
        deviceType: commonConfig.deviceType,
        extOpts: Base64.encode(JSON.stringify({
          comId: data.comId
        }))
      });
      var postUrl = chatConfig.fileServerIp + '/2015-03-26/Corp/yuntongxun/Upload/Attach?sig=2B9C64616C98A93F1375BF0A2F6429E7&token=' + commonConfig.token + '&type=1';
      var sendData = {
        url: postUrl,
        header: {
          'Content-type': 'application/octet-stream;',
          'Accept': 'application/xml;',
          'ytx_params': Base64.encode(ytx_params)
        },
        sendData: data.result,
        progress: data.progress,
        success: callback,
        error: onError
      };
      if (data.progress) {
        sendData.progress = function (res) {
          data.progress(res.loaded, res.total, data.msgId)
        }
      }
      commonMethods.ajax(sendData);
    },
    buildSendFile: function (data, callback, onError) {
      var funName = 'buildSendFile---';
      if (!data.file || !data.receiver || !data.type) {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
        resp.msg = funName + 'param file or type or receiver is null.';
        onError(resp);
        return;
      }
      if (data.file.size > chatConfig.maxFileLen) {
        onError({
          msg: '文件超出最大可上传大小'
        });
        return;
      }
      var fileReader = new FileReader();
      fileReader.readAsArrayBuffer(data.file);
      fileReader.onload = function () {
        //压缩文件
        if (data.type === 6) {
          var binaryString = pako.gzip(fileReader.result);
          var blob = new Blob([binaryString]);
          var reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onload = function () {
            data.result = reader.result;
            chatMethods.upload(data, callback, onError);
          }
        } else {
          data.result = fileReader.result;
          chatMethods.upload(data, callback, onError);
        }
      }
    },
    buildSendTxt: function (data, callback, onError) {
      var funName = 'buildSendTxt---';
      if (!chatMethods.sendParamCheck(data, onError)) return;
      var compress = false, len = 0, sendObj = {};
      data.content = Base64.encode(data.content);
      if (data.atAccounts && !(data.atAccounts.length > 0 || data.atAccounts instanceof Array)) {
        var resp = {};
        resp.code = 170012;
        resp.msg = funName + "param atAccounts isn't an Array or is empty";
        onError(resp);
        return;
      }
      sendObj['1'] = data.type;
      sendObj['2'] = data.msgId + '';
      sendObj['3'] = data.content;
      sendObj['4'] = commonConfig.userName;
      sendObj['5'] = data.receiver;
      if (!!data.domain || 0 === data.domain) {
        sendObj['6'] = data.domain;
      }
      if (compress) {
        sendObj['8'] = len;
      }
      if (data.atAccounts || data.type === chat.msgType._COMMAND || data.comId || data.extOpts) {
        var obj = {};
        if (data.extOpts) obj = data.extOpts;
        if (data.atAccounts) obj.at = data.atAccounts;
        if (data.isSave) obj.isSave = data.isSave;
        if (data.isOfflinePush) obj.isOfflinePush = data.isOfflinePush;
        if (data.isHint) obj.isHint = data.isHint;
        if (data.isSyncMsg) obj.isSyncMsg = data.isSyncMsg;
        if (data.comId) obj.comId = data.comId;
        if (Object.getOwnPropertyNames(obj).length > 0) {
          sendObj['11'] = Base64.encode(JSON.stringify(obj));
          console.log("sendMsg:extopts=", obj);
        }
      }
      console.log(funName, sendObj);
      // chatMethods.buildGetFileBlob({
      //   type: "zip",
      //   url: "http://192.168.27.239/56001/21df1b0a0a134232a74867a373c88d93/2019-11-27/15-50/1574841038727233970.zip",
      // }, function (res) {
      //   console.log(res)
      // }, function (err) {
      //   console.log(err)
      // }, function () {
      //
      // });
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._sendMsg
        },
        msgKey: 'SendMsg',
        clientData: {
          msgId: data.msgId,
          orignMsgId: data.id,
          notUpdate: true
        }
      }, callback, onError)
    },
    buildSendChatroomMsg: function (data, callback, onError) {
      if (!chatMethods.sendParamCheck(data, onError)) return;
      data.content = Base64.encode(data.content);
      var sendJsonStr = {
        1: data.type,
        2: data.msgId + '',
        3: data.content,
        4: commonConfig.userName,
        5: data.receiver
      };
      if (!!data.domain || 0 === data.domain) {
        sendJsonStr['6'] = data.domain;
      }
      RL_YTX.sendMsg({
        sendObj: sendJsonStr,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom.MSG_SEND_LiveChatRoom_MESSAGE
        },
        msgKey: 'SendMsg',
        clientData: {
          msgId: data.msgId,
          orignMsgId: data.id,
          notUpdate: true
        }
      }, callback, onError)
    },
    buildGetNickNameByAcc: function (data, callback, onError) {
      var funName = 'buildGetNickNameByAcc---';
      if (!data.account) {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
        resp.msg = funName + "_buildGetNickByAcc():userAccount cann't be null!";
        onError(resp);
        return;
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.account
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._getMyInfo
        },
        msgKey: 'QueryPersonInfo',
        clientData: {}
      }, callback, onError);
    },
    buildUploadPersonInfo: function (data, callback, onError) {
      var funName = 'buildUploadPersonInfo---';
      if (!data.nickName) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'upload personInfo,nickName is null';
        onError(resp);
        return;
      }
      if (!!data.birth) {
        var regx = /^(19|20)\d{2}-(1[0-2]|0[1-9])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        if (regx.exec(data.birth) == null) {
          var resp = {};
          resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
          resp.msg = funName + 'upload personInfo,birth is error, only accept format yyyy-MM-dd, eg:1990-01-01';
          onError(resp);
          return;
        }
      }
      if (!!data.sex) {
        var regx = /^(1|2)$/;
        if (regx.exec(data.sex) == null) {
          var resp = {};
          resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
          resp.msg = funName + 'upload personInfo,sex is error, 1 is male and 2 is female';
          onError(resp);
          return;
        }
      }
      if (!!data.sign && data.sign > 100) {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_OUT_OF_LENGTH;
        resp.msg = funName + 'upload personInfo,sign is error, sign length must less than 100';
        onError(resp);
        return;
      }
      var sendObj = {
        1: data.nickName
      };
      if (data.sex) sendObj[2] = data.sex;
      if (data.birth) sendObj[3] = data.birth;
      if (data.sign) sendObj[4] = data.sign;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._setMyInfo
        },
        msgKey: 'PersonInfo',
        clientData: {}
      }, callback, onError);
    },
    buildGetHistoryMessage: function (data, callback, onError) {
      var funName = 'buildGetHistoryMessage---';
      if (!data.talker) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'talker is required';
        onError(resp);
        return
      }
      var sendObj = {
        appId: commonConfig.appId,
        userName: commonConfig.userName,
        pgeSize: data.pageSize,
        talker: data.talker,
        order: data.order
      };
      if (data.time) {
        sendObj.time = data.time;
      }
      if (data.msgDecompression) {
        sendObj['msgDecompression'] = data.msgDecompression;
      }
      sendObj['type'] = 1;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {},
        msgKey: 'ClientHistroyMsg',
        clientData: {},
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildCreateGroup: function (data, callback, onError) {
      var funName = 'buildCreateGroup---';
      console.log(funName, data);
      data.scope = data.scope || 1;
      if (!data.groupName || !data.scope) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupName or scope is empty.';
        onError(resp);
        return;
      }
      if (isNaN(data.target)) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param target is not a number.';
        onError(resp);
        return;
      }
      var sendObj = {
        1: commonConfig.userName,
        2: data.groupName,
        3: data.groupType,
        6: data.scope,
        8: parseInt(data.permission),
        9: data.mode,
        11: data.target
      };
      if (data.province) sendObj[4] = data.province;
      if (data.city) sendObj[5] = data.city;
      if (data.declared) sendObj[7] = data.declared;
      if (data.groupDomain) sendObj[10] = data.groupDomain;
      if (data.inviteOperation) sendObj[15] = data.inviteOperation;
      if (data.checkAdminFlag) sendObj[16] = data.checkAdminFlag;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._createGroup
        },
        msgKey: 'CreateGroup',
        clientData: {}
      }, callback, onError);
    },
    buildDismissGroup: function (data, callback, onError) {
      var funName = 'buildDismissGroup---';
      if (!data.groupId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupid is empty.';
        onError(resp);
      }
      RL_YTX.sendMsg({
        sendObj: {
          2: data.groupId
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._dismissGroup
        },
        msgKey: 'DismissGroup',
        clientData: {}
      }, callback, onError);
    },
    buildInviteJoinGroup: function (data, callback, onError) {
      var funName = 'buildInviteJoinGroup---';
      if (!data.groupId || !data.members) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupid or members is empty.';
        onError(resp);
      }
      if (!(data.members instanceof Array) || data.members.length === 0) {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
        resp.msg = funName + 'param members is not an array or members is empty.';
        onError(resp);
        return;
      }
      var confirm = data.confirm;
      if (!confirm) {
        confirm = 2;
      } else {
        if (isNaN(confirm) || (confirm != 1 && confirm != 2)) {
          var resp = {};
          resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
          resp.msg = funName + 'param confirm is illegal';
          onError(resp);
          return;
        }
      }
      var sendObj = {
        2: data.groupId,
        4: data.members,
        5: confirm
      };
      if (data.declared) {
        sendObj[3] = data.declared;
      }
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._inviteJoinGroup
        },
        msgKey: 'InviteJoinGroup',
        clientData: {}
      }, callback, onError);
    },
    buildConfirmInviteJoinGroup: function (data, callback, onError) {
      var funName = 'buildConfirmInviteJoinGroup---';
      console.log(funName, data);
      if (!data.groupId || !data.confirm) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupid or confirm is empty.';
        onError(resp);
        return;
      }
      var confirm = data.confirm;
      if (isNaN(confirm)) {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
        resp.msg = funName + 'param confirm is not a number.';
        onError(resp);
        return;
      }
      var sendObj = {
        1: data.groupId,
        2: data.inviter,
        3: data.confirm
      };
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._confirmInviteJoin
        },
        msgKey: 'ConfirmInviteJoinGroup',
        clientData: {}
      }, callback, onError);
    },
    buildQuitGroup: function (data, callback, onError) {
      var funName = 'buildQuitGroup---';
      if (!data.groupId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupid is empty.';
        onError(resp);
        return;
      }
      RL_YTX.sendMsg({
        sendObj: {
          2: data.groupId
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._quitGroup
        },
        msgKey: 'QuitGroup',
        clientData: {}
      }, callback, onError);
    },
    buildGetGroupList: function (data, callback, onError) {
      var funName = 'buildGetGroupList---';
      if (!data.pageSize) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param pageSize is empty.';
        onError(resp);
        return;
      }
      if (isNaN(data.pageSize)) {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
        resp.msg = funName + 'param pageSize is not a number.';
        onError(resp);
        return;
      }
      RL_YTX.sendMsg({
        sendObj: {
          2: data.groupId,
          3: data.pageSize,
          4: data.target
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._getOwnGroups
        },
        msgKey: 'GetOwnerGroups',
        clientData: {}
      }, callback, onError);
    },
    buildGetGroupMemberList: function (data, callback, onError) {
      var funName = 'buildGetGroupMemberList---';
      data.pageSize = data.pageSize || 50;
      if (!data.pageSize || !data.groupId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param pageSize or groupId is empty.';
        onError(resp);
        return;
      }
      if (isNaN(data.pageSize)) {
        var resp = {};
        resp.code = commonConfig.errCode._PARAM_TYPE_ERR;
        resp.msg = funName + 'param pageSize is not a number.';
        onError(resp);
        return;
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.groupId,
          3: data.memberId,
          4: data.pageSize
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._queryGroupMembers
        },
        msgKey: 'GetGroupMembers'
      }, callback, onError)
    },
    buildJoinGroup: function (data, callback, onError) {
      var funName = 'buildJoinGroup---';
      if (!data.groupId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupId is empty';
        onError(resp);
        return;
      }
      var sendObj = {
        2: data.groupId,
        3: data.declared
      }
      if (data.ext)  sendObj[4] = data.ext;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._joinGroup
        },
        msgKey: 'JoinGroup'
      }, callback, onError);
    },
    buildConfirmJoinGroup: function (data, callback, onError) {
      var funName = 'buildConfirmJoinGroup---';
      if (!data.groupId || !data.memberId || !data.confirm) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupId or memberId or confirm is empty';
        onError(resp);
        return;
      }
      var sendObj = {
        2: data.groupId,
        3: data.memberId,
        4: data.confirm
      };
      if (data.memberArr) sendObj[5] =  data.memberArr;
      if (data.ext) sendObj[6] =  data.ext;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._confirmJoinGroup
        },
        msgKey: 'ConfirmJoinGroup'
      }, callback, onError);
    },
    buildGetGroupDetail: function (data, callback, onError) {
      var funName = 'buildGetGroupDetail---';
      if (!data.groupId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupId is empty.';
        onError(resp);
        return;
      }
      RL_YTX.sendMsg({
        sendObj: {
          2: data.groupId
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._getGroupDetail
        },
        msgKey: 'GetGroupDetail'
      }, callback, onError);
    },
    buildSearchGroups: function (data, callback, onError) {
      var funName = 'buildSearchGroups---';
      if (!data.searchType || !data.keyWords) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param serachType or keyWord is empty.';
        onError(resp);
        return;
      }
      RL_YTX.sendMsg({
        sendObj: {
          2: data.searchType,
          3: data.keyWords
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._searchGroups
        },
        msgKey: 'SearchGroups'
      }, callback, onError);
    },
    buildDeleteGroupMember: function (data, callback, onError) {
      var funName = 'buildDeleteGroupMember---';
      if (!data.groupId || !data.memberId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupid or memberId is empty.';
        onError(resp);
        return;
      }
      RL_YTX.sendMsg({
        sendObj: {
          2: data.groupId,
          3: data.memberId
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._deleteGroupMember
        },
        msgKey: 'DeleteGroupMember'
      }, callback, onError);
    },
    buildForbidMemberSpeak: function (data, callback, onError) {
      var funName = 'buildForbidMemberSpeak---';
      if (!data.groupId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupid is empty.';
        onError(resp);
        return
      }
      if (data.memberId && data.member) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'memberId and member repeat';
        onError(resp);
        return
      }
      if (data.member && !Array.isArray(data.member)) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param member must be array';
        onError(resp);
        return
      }
      var sendObj = {
        1: commonConfig.userName,
        2: data.groupId,
        4: data.forbidState,
        5: data.allForbid || 0
      };
      if (data.memberId)  sendObj[3] = data.memberId;
      if (data.member)  sendObj[6] = data.member.join();
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._forbidMemberSpeak
        },
        msgKey: 'ForbidMemberSpeak'
      }, callback, onError);
    },
    buildSetGroupMessageRule: function (data, callback, onError) {
      var funName = 'buildSetGroupMessageRule---';
      if (!data.groupId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupId is empty.';
        onError(resp);
        return
      }
      var sendObj = {
        1: data.groupId
      };
      if (data.isNotice) sendObj[2] = data.isNotice;
      if (data.isApplePush) sendObj[3] = data.isApplePush;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._setGroupMessageRule
        },
        msgKey: 'SetGroupMessagRule'
      }, callback, onError);
    },
    buildQueryGroupMemberCard: function (data, callback, onError) {
      var funName = 'buildQueryGroupMemberCard---';
      if (!data.memberId || !data.belong) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param memberId or groupid is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.memberId,
          2: data.belong,
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._queryGroupMemberCard
        },
        msgKey: 'QueryGroupMemberCard'
      }, callback, onError);
    },
    buildModifyMemberCard: function (data, callback, onError) {
      var funName = 'buildModifyMemberCard---';
      if (!data.memberId || !data.belong) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param member or belong is empty.';
        onError(resp);
        return
      }
      var sendObj = {
        1: data.belong,
        2: data.memberId
      };
      if (data.display) sendObj[3] = data.display;
      if (data.phone) sendObj[4] = data.phone;
      if (data.mail) sendObj[5] = data.mail;
      if (data.remark) sendObj[6] = data.remark;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._modifyMemberCard
        },
        msgKey: 'ModifyMemberCard'
      }, callback, onError);
    },
    buildModifyGroup: function (data, callback, onError) {
      var funName = 'buildModifyGroup---';
      if (!data.groupId || !data.groupName) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupid or groupName is empty.';
        onError(resp);
        return
      }
      var sendObj = {
        1: commonConfig.userName,
        2: data.groupId,
        3: data.groupName
      };
      if (data.type) sendObj[4] = data.type;
      if (data.province) sendObj[5] = data.province;
      if (data.city) sendObj[6] = data.city;
      if (data.scope) sendObj[7] = data.scope;
      if (data.declared) sendObj[8] = data.declared;
      if (data.permission) sendObj[9] = data.permission;
      if (data.groupDomain) sendObj[10] = data.groupDomain;
      if (data.groupPhoto) sendObj[11] = data.groupPhoto;
      if (data.isManage) sendObj[12] = data.isManage;
      if (data.isAtAll) sendObj[13] = data.isAtAll;
      if (data.inviteOperation) sendObj[14] = data.inviteOperation;
      if (data.checkAdminFlag) sendObj[15] = data.checkAdminFlag;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._modifyGroup
        },
        msgKey: 'ModifyGroup'
      }, callback, onError);
    },
    buildGetUserState: function (data, callback, onError) {
      var funName = 'buildGetUserState---';
      var curTime = new Date().getTime();
      if (!chatConfig.getStateTime) {
        chatConfig.getStateTime = curTime;
        chatConfig.getStateCount = 0
      } else {
        if ((curTime - chatConfig.getStateTime) > 3000) {
          chatConfig.getStateCount = 0;
          chatConfig.getStateTime = curTime
        }
      }
      if (chatConfig.getStateCount++ > 0) {
        var resp = {};
        resp.code = commonConfig.errCode._REQUEST_TOO_FREQUENT;
        resp.msg = funName + 'request too frequent, please wait a while.';
        onError(resp);
        return
      }
      if (!data.userAcc || !data.userAcc instanceof Array || data.userAcc.length === 0) {
        var resp = {};
        resp.code = commonConfig.errCode._CHARSET_ILLEGAl;
        resp.msg = funName + "param userAccount param is null";
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.userAcc
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._getUserState
        },
        msgKey: 'GetUserState'
      }, callback, onError);
    },
    buildSetGroupMemberRole: function (data, callback, onError) {
      var funName = 'buildSetGroupMemberRole---';
      if (!data.groupId || (!data.memberId && !data.member) || !data.role) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param groupId or memberId or member or role is empty.';
        onError(resp);
        return
      }
      if (data.memberId && data.member) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'memberId and member repeat';
        onError(resp);
        return
      }
      if (data.member && !Array.isArray(data.member)) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param member must be array';
        onError(resp);
        return
      }
      var sendObj = {
        1: data.groupId,
        3: data.role
      };
      if (data.memberId) sendObj[2] = data.memberId;
      if (data.member) sendObj[4] = data.member.join();
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._setGroupMemberRole
        },
        msgKey: 'SetGroupMemberRole'
      }, callback, onError);
    },
    buildMsgOperation: function (data, callback, onError) {
      var funName = 'buildMsgOperation---';
      if (!data.version && !data.msgId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param version or msgId is empty.';
        onError(resp);
        return
      }
      var sendObj = {};
      if (data.version) sendObj[1] = data.version;
      if (data.msgId) sendObj[2] = data.msgId;
      if (data.type) sendObj[3] = data.type;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._msgOperation
        },
        msgKey: 'MsgOperation'
      }, callback, onError);
    },
    buildDeleteReadMsg: function (data, callback, onError) {
      var funName = 'buildDeleteReadMsg---';
      if (!data.msgId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param msgId is empty.';
        onError(resp);
        return
      }
      var version = data.msgId;
      var idx = version.indexOf('|');
      if (idx > 0) {
        version = version.substr(idx + 1)
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: version,
          2: commonConfig.userName
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._deleteReadMsg
        },
        msgKey: 'MsgOperation'
      }, callback, onError);
    },
    buildGetRecentContactList: function (data, callback, onError) {
      var funName = 'buildGetRecentContactList---';
      var sendObj = {
        1: commonConfig.appId,
        2: commonConfig.userName
      };
      if (data.time) sendObj[3] = data.time;
      if (data.limit) sendObj[4] = data.limit;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.httpType._recentContact
        },
        msgKey: 'RecentlyContactsList',
        MsgLiteKey: 'Http'
      }, callback, onError);
    },
    buildEnterChatroom: function (data, callback, onError) {
      var funName = 'buildEnterChatroom---';
      if (!data.roomId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId is empty.';
        onError(resp);
        return
      }
      chatConfig.chatRoomId = data.roomId;
      chatConfig.chatRoomNickName = data.nickName;
      chatConfig.chatRoomInfoExt = data.infoExt;
      chatConfig.enterChatRoomData = data;
      var sendObj = {
        1: data.roomId
      };
      if (data.nickName) sendObj[2] = data.nickName;
      if (data.infoExt) sendObj[3] = data.infoExt;
      if (data.needNotify) sendObj[4] = data.needNotify;
      if (data.notifyExt) sendObj[5] = data.notifyExt;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        msgKey: 'EnterChatroom',
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._enterChatRoom
        }
      }, callback, onError);
    },
    buildExitChatroom: function (data, callback, onError) {
      var funName = 'buildExitChatroom---';
      if (!data.roomId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId is empty.';
        onError(resp);
        return
      }
      var sendObj = {
        1: data.roomId
      };
      if (data.needNotify) sendObj[2] = data.needNotify;
      if (data.notifyExt) sendObj[3] = data.notifyExt;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        msgKey: 'ExitChatroom',
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._exitChatRoom
        }
      }, callback, onError);
    },
    buildFetchChatroomInfo: function (data, callback, onError) {
      var funName = 'buildFetchChatroomInfo---';
      if (!data.roomId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.roomId
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._fetchChatroomInfo
        },
        msgKey: 'FetchChatroomInfo'
      }, callback, onError);
    },
    buildFetchChatroomMembers: function (data, callback, onError) {
      var funName = 'buildFetchChatroomMembers---';
      if (!data.roomId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.roomId,
          2: data.userId,
          3: data.type || 1,
          4: data.pageSize
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._fetchChatroomMembers
        },
        msgKey: 'FetchChatroomMembers'
      }, callback, onError);
    },
    buildUpdateChatroomInfo: function (data, callback, onError) {
      var funName = 'buildUpdateChatroomInfo---';
      if (!data.roomId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId is empty.';
        onError(resp);
        return
      }
      var sendObj = {
        1: data.roomId
      };
      if (data.roomName) sendObj[2] = data.roomName;
      if (data.announcement) sendObj[3] = data.announcement;
      if (data.roomExt) sendObj[4] = data.roomExt;
      if (data.allMuteMode) sendObj[5] = data.allMuteMode;
      if (data.needNotify) sendObj[6] = data.needNotify;
      if (data.notifyExt) sendObj[7] = data.notifyExt;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._updateChatroomInfo
        },
        msgKey: 'UpdateChatroomInfo'
      }, callback, onError);
    },
    buildUpdateChatRoomMemberRole: function (data, callback, onError) {
      var funName = 'buildUpdateChatRoomMemberRole---';
      if (!data.roomId || !data.userId || !data.type) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId or userId or type is empty.';
        onError(resp);
        return
      }
      var sendObj = {
        1: data.roomId,
        2: data.userId,
        3: data.type
      };
      if (data.needNotify) sendObj[4] = data.needNotify;
      if (data.notifyExt) sendObj[5] = data.notifyExt;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._updateChatRoomMemberRole
        },
        msgKey: 'UpdateChatRoomMemberRole'
      }, callback, onError);
    },
    buildUpdateMemberOption: function (data, callback, onError) {
      var funName = 'buildUpdateMemberOption---';
      if (!data.roomId || !data.userId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId or userId is empty.';
        onError(resp);
        return
      }
      var sendObj = {
        1: data.roomId,
        2: data.userId
      };
      if (data.state) sendObj[3] = data.state;
      if (data.muteDuration) sendObj[4] = data.muteDuration;
      if (data.needNotify) sendObj[5] = data.needNotify;
      if (data.notifyExt) sendObj[6] = data.notifyExt;
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._updateMemberOption
        },
        msgKey: 'UpdateMemberOption'
      }, callback, onError);
    },
    buildUpdateMyChatroomMemberInfo: function (data, callback, onError) {
      var funName = 'buildUpdateMyChatroomMemberInfo---';
      if (!data.roomId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.roomId,
          2: data.nickName,
          3: data.infoExt
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._updateMyChatroomMemberInfo
        },
        msgKey: 'UpdateMyChatroomMemberInfo'
      }, callback, onError);
    },
    buildKickMember: function (data, callback, onError) {
      var funName = 'buildKickMember---';
      if (!data.roomId || !data.userId) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param roomId or userId is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.roomId,
          2: data.userId,
          3: data.notifyExt,
          4: data.needNotify
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._chatRoom._kickMember
        },
        msgKey: 'KickMember'
      }, callback, onError);
    },
    buildSetTopContact: function (data, callback, onError) {
      var funName = 'buildSetTopContact---';
      if (!data.contact || !data.type) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param contact or type is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          1: data.contact,
          2: data.type
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._setTopContact
        },
        msgKey: 'SetTopContact'
      }, callback, onError);
    },
    buildGetTopContact: function (callback, onError) {
      var funName = 'buildGetTopContact---';
      RL_YTX.sendMsg({
        sendObj: null,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._getTopContact
        },
        msgKey: ''
      }, callback, onError);
    },
    buildGetFriend: function (data, callback, onError) {
      var funName = 'buildGetFriend---';
      var sendObj = {
        useracc: commonConfig.userAcc
      };
      sendObj.timestamp = chatConfig.fTimestamp ? commonConfig.reqTimestamp : '';
      sendObj.size = data.size || '';
      sendObj.isUpdate = data.isUpdate || 0
      RL_YTX.sendMsg({
        sendObj: sendObj,
        MsgLiteObj: {},
        msgKey: 'getFriends',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildAddFriend: function (data, callback, onError) {
      var funName = 'buildAddFriend---';
      if (!data.friendUseracc) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param friendUseracc is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          friendUseracc: commonConfig.appId + '#' + data.friendUseracc,
          message: data.message,
          source: data.source
        },
        MsgLiteObj: {},
        msgKey: 'addFriend',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildSetFriendRemark: function (data, callback, onError) {
      var funName = 'buildSetFriendRemark---';
      if (!data.friendUseracc) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param friendUseracc is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          friendUseracc: commonConfig.appId + '#' + data.friendUseracc,
          remarkName: data.remarkName
        },
        MsgLiteObj: {},
        msgKey: 'setFriendRemark',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildDelFriend: function (data, callback, onError) {
      var funName = 'buildDelFriend---';
      if (!data.friendUseracc) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param friendUseracc is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          friendUseracc: commonConfig.appId + '#' + data.friendUseracc,
          allDel: data.allDel
        },
        MsgLiteObj: {},
        msgKey: 'delFriend',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildGetRequestHistoryList: function (data, callback, onError) {
      var funName = 'buildGetRequestHistoryList---';
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          timestamp: data.timestamp || '',
          size: data.size || ''
        },
        MsgLiteObj: {},
        msgKey: 'friendMessage',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildGetOtherInfo: function (data, callback, onError) {
      var funName = 'buildGetOtherInfo---';
      if (!data.searchContent) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param searchContent is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          friendUseracc: commonConfig.appId + '#' + data.searchContent
        },
        MsgLiteObj: {},
        msgKey: 'getPersonInfo',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildSetUserVerify: function (data, callback, onError) {
      var funName = 'buildSetUserVerify---';
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          addVerify: data.needVerify
        },
        MsgLiteObj: {},
        msgKey: 'setUserVerify',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildAgreeFriendRequest: function (data, callback, onError) {
      var funName = 'buildAgreeFriendRequest---';
      if (!data.friendUseracc) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param friendUseracc is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          friendUseracc: commonConfig.appId + '#' + data.friendUseracc
        },
        MsgLiteObj: {},
        msgKey: 'friendAgree',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildRefuseFriendRequest: function (data, callback, onError) {
      var funName = 'buildRefuseFriendRequest---';
      if (!data.friendUseracc) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param friendUseracc is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          friendUseracc: commonConfig.appId + '#' + data.friendUseracc,
          message: data.message
        },
        MsgLiteObj: {},
        msgKey: 'friendRefuse',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildGetFriendInfo: function (data, callback, onError) {
      var funName = 'buildGetFriendInfo---';
      if (!data.friendUseracc) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param friendUseracc is empty.';
        onError(resp);
        return
      }
      RL_YTX.sendMsg({
        sendObj: {
          useracc: commonConfig.userAcc,
          friendUseracc: commonConfig.appId + '#' + data.friendUseracc
        },
        MsgLiteObj: {},
        msgKey: 'getFriendInfo',
        MsgLiteKey: 'request'
      }, callback, onError);
    },
    buildUploadAvatar: function (data, callback, onError, progress) {
      var funName = 'buildUploadAvatar---';
      if (!data.file) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param file is empty.';
        onError(resp);
        return
      }
      chatMethods.buildSendFile({
        receiver: commonConfig.userName,
        type: 6,
        id: commonConfig.userName,
        file: data.file,
        progress: progress,
      }, callback, onError);
    },
    buildGetFileBlob: function (data, callback, onError, progress) {
      if (!data.url.startWith('http')) data.url = chatConfig.lvsServer + data.url;
      commonMethods.ajax({
        type: 'GET',
        url: data.url,
        sendData: {},
        responseType: "blob",
        progress: progress,
        error: onError,
        onload: function (blob) {
          console.log(blob);
          var fr = new FileReader();
          if (data.type === "zip") {
            fr.readAsBinaryString(blob);
            fr.onload = function () {
              var re = fr.result;
              try {
                var binary = pako.inflate(re, {
                  "gzip": true,
                  "windowBits": 32
                }); //解压缩
                // console.log(binary);
                var fileType = data.url.substr(data.url.lastIndexOf('.')+1);
                var blobType = chatConfig.blobType[fileType] || 'application/octet-binary';
                console.log('blobType---', fileType, blobType);
                var b = new Blob([binary], {
                  type: blobType
                });
                var url = window.URL.createObjectURL(b);
                callback({url: url});
              } catch (e) { //如果解压缩错误，则返回一个
                console.log('catch', e);
                var str = {};
                str["code"] = "null";
                str["msg"] = "uncompressing error ";
                str["url"] = window.URL.createObjectURL(blob);
                onError(str);
              }
            };
          } else if (data.type === "amr") {
            fr.readAsArrayBuffer(blob);
            fr.onload = function () {
              var data = new Uint8Array(fr.result);
              var buffer = AMR.toWAV(data);
              var b = new Blob([buffer], {
                type: 'audio/x-wav'
              });
              var url = window.URL.createObjectURL(b);
              callback({url: url});
            }
          } else {
            var url = window.URL.createObjectURL(blob);
            callback({url: url});
          }

          fr.onerror = function () {
            switch (evt.target.error.code) {
              case evt.target.error.NOT_FOUND_ERR:
                console.log('File Not Found!');
                break;
              case evt.target.error.NOT_READABLE_ERR:
                console.log('File is not readable');
                break;
              case evt.target.error.ABORT_ERR:
                break;
              default:
                console.log('An error occurred reading this file.');
            }
            var resp = {};
            resp.code = commonConfig.errCode._FILE_FILEREADER_ERROR;
            resp.msg = "method FileReader() occur error！";
            onError(resp);
          }
        }
      });
    },
    noticeAppFn: function(obj) {
      obj.msgId = obj.msgDateCreated + '|' + obj.version;
      if ((obj.msgType === 25 || obj.msgType === 24) && obj.msgDomain) {
        try {
          var msgDomain = JSON.parse(obj.msgDomain);
          if (msgDomain.deviceno && msgDomain.deviceno !== commonConfig.imei) {
            msgDomain.msgId = msgDomain.dateCreated + '|' + msgDomain.version;
            obj.msgDomain = JSON.stringify(msgDomain);
          }
        }
        catch (e) {}
      }
      if (obj.msgType === commonConfig.msgTypeNo._msg_CMD) { //cmd消息
        var resp = chatMethods.parseNoticeMsg(obj);
        resp.msgId = obj.msgId;
        if (!!chatMethods._noticeListener) {
          return resp
        } else {
          commonMethods.logger.info("noticeListener is null   ");
        }
      } else if (obj.msgType === commonConfig.msgTypeNo._msg_DEL) { //阅后即焚删除消息
        var resp = chatMethods.parseMsgNotify(obj);
        if (!!chatMethods._msgNotifyListener) {
          return resp
        } else {
          commonMethods.logger.info("_msgNotifyListener is null : ");
        }
      } else if (obj.msgType === commonConfig.msgTypeNo._chatRoom.ChatRoom_MESSAGE) { //聊天室推送消息
        var resp = chatMethods.parseChatRoomMsgInner(obj);
        if (!!chatMethods._charRoomListener) {
          return resp
        } else {
          commonMethods.logger.info("onCharRoomEventListener is null : ");
        }
      } else if (obj.msgType === commonConfig.msgTypeNo._friendMsg) { //好友消息
        return obj
      } else {
        if (!!chatMethods._pushListener) {
          return obj
        } else {
          commonMethods.logger.info("_pushListener is null : ");
        }
      }
    },
    buildUploadUserDeviceDetail: function(data, callback, onError) {
      var funName = 'buildUploadUserDeviceDetail---';
      if (!data.ip || !data.appVersion) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = funName + 'param ip or appVersion is empty.';
        onError(resp);
        return
      }
      var postUrl = chatConfig.fileServerIp + '/2015-03-26/Corp/yuntongxun/IM/UserDeviceDetail?sig=2B9C64616C98A93F1375BF0A2F6429E7';
      var userAgent = navigator.userAgent.split(' ');
      userAgent = userAgent[userAgent.length - 2] + ' ' + userAgent[userAgent.length - 1];
      var send = {
        ip: data.ip,
        location: data.location,
        userAcc: commonConfig.appId + '#' + commonConfig.userName,
        deviceNo: commonConfig.imei,
        deviceType: commonConfig.deviceType,
        deviceModel: navigator.vendor,
        deviceSystemVersion: userAgent,
        softVersion: RL_YTX.version,
        appVersion: data.appVersion,
        comId: data.comId,
        deviceAgent: userAgent
      }
      var sendData = {
        url: postUrl,
        header: {
          'Content-type': 'pplication/json;charset=utf-8;',
          'Accept': 'application/json;'
        },
        sendData: JSON.stringify(send),
        success: callback,
        error: onError
      };
      commonMethods.ajax(sendData);
    }
  };
  RL_Chat.prototype = {
    unLoad: function () {
      chatConfig.chatRoomId = null;
      chatConfig.chatRommNickName = null;
      chatConfig.chatRommInfoExt = null;
      chatConfig.sendMsgId = 0;
      commonConfig.msgVersion = 0;
      commonConfig.syncMsgVersion = 0;
      commonConfig.maxMsgVersion = 0;
      chatConfig.syncMsgPorcessing = false;
      chatConfig.receiveMsgBuf = {};
    },
    setConfig: function (val) {
      chatConfig = commonMethods.assign(chatConfig, val);
      this.maxFileLen = chatConfig.maxFileLen;
      if (val.maxSyncNum && typeof val.maxSyncNum === 'number') this.maxSyncNum = val.maxSyncNum;
      console.log('RL_Chat set config succ')
    },
    uploadUserDeviceDetail: function(data, callback, onError) {
      /*
              * data = {
              *   appVersion,
              *   ip,
              *   location
              * }
              */
      data = commonMethods.getParam(data);
      chatMethods.buildUploadUserDeviceDetail(data, callback, onError);
    },
    sendMsg: function (data, callback, onError, progress) {
      /*
              * data = {
              *   id: '',
              *   content: 文本内容,
              *   file: 上传的文件,
              *   type: 消息类型
              *   receiver: 消息接收者,
              *   fileName: 文件名称,
              *   atAccounts: ''
              * }
              * */
      data = commonMethods.getParam(data);
      var isAvailable = false;
      for (var i in this.msgType) {
        if (data.type === this.msgType[i]) {
          isAvailable = true;
          break;
        }
      }
      if (!isAvailable) {
        var resp = {};
        resp.code = commonConfig.errCode._CHARSET_ILLEGAl;
        resp.msg = "msgType isn't the value of available";
        onError(resp);
      } else {
        var msgToken = null;
        if (data.type !== 1 && !!data.file) {
          var FileReader = FileReader || window.FileReader;
          if (!FileReader) {
            var resp = {};
            resp.code = commonConfig.errCode._NOT_SUPPORT_FILE;
            resp.msgId = -1;
            resp.msgClientNo = -1;
            resp.msg = 'brower not support send attach.';
            onError(resp);
            return -1;
          }
          console.log('commonConfig.ClientNo',commonConfig.ClientNo)
          msgToken = chatMethods.generateFullMsgId(++commonConfig.ClientNo);
          console.log('commonConfig.ClientNo',commonConfig.ClientNo)
          data.progress = progress || function (res, percent) {
            console.log('上传进度',percent);
          };
          data.msgId = msgToken;
          chatMethods.buildSendFile(data, callback, onError)
        } else {
          msgToken = ++commonConfig.ClientNo;
          data.msgId = msgToken;
          chatMethods.buildSendTxt(data, callback, onError);
          msgToken = chatMethods.generateFullMsgId(msgToken);
        }
        return msgToken;
      }
    },
    sendChatroomMsg: function (data, callback, onError) {
      /*
              * data = {
              *   type,
              *   content,
              *   domain,
              *   receiver
              * }
              * */
      data = commonMethods.getParam(data);
      var msgToken = ++commonConfig.ClientNo;
      data.msgId = msgToken;
      chatMethods.buildSendChatroomMsg(data, callback, onError);
      msgToken = chatMethods.generateFullMsgId(msgToken);
      return msgToken;
    },
    syncMsg: function (data, onError) {
      /*
              * data = {
              *   startVersion,
              *   endVersion,
              *   type
              * }
              */
      data = commonMethods.getParam(data);
      chatMethods.buildSyncMessage(data, onError);
    },
    getNickNameByAcc: function (data, callBack, onError) {
      /*
             * data = {
             *   account
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetNickNameByAcc(data, callBack, onError)
    },
    uploadPersonInfo: function (data, callback, onError) {
      /*
             * data = {
             *   nickName,
             *   sex,
             *   birth,
             *   sign
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildUploadPersonInfo(data, callback, onError);
    },
    getHistoryMessage: function (data, callback, onError) {
      /*
             * data = {
             *   talker,
             *   order,
             *   pageSize
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetHistoryMessage(data, callback, onError);
    },
    createGroup: function (data, callback, onError) {
      /*
             * data = {
             *   groupName,
             *   groupType,
             *   province,
             *   city,
             *   scope,
             *   declared,
             *   permission,
             *   mode,
             *   target,
             *   groupDomain
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildCreateGroup(data, callback, onError);
    },
    dismissGroup: function (data, callback, onError) {
      /*
             * data = {
             *   groupId
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildDismissGroup(data, callback, onError);
    },
    inviteJoinGroup: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   confirm,
             *   members,
             *   declared
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildInviteJoinGroup(data, callback, onError);
    },
    confirmInviteJoinGroup: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   confirm,
             *   inviter
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildConfirmInviteJoinGroup(data, callback, onError);
    },
    quitGroup: function (data, callback, onError) {
      /*
             * data = {
             *   groupId
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildQuitGroup(data, callback, onError);
    },
    getGroupMemberList: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   memberId,
             *   pageSize
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetGroupMemberList(data, callback, onError);
    },
    joinGroup: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   declared
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildJoinGroup(data, callback, onError);
    },
    confirmJoinGroup: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   memberId,
             *   confirm
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildConfirmJoinGroup(data, callback, onError);
    },
    getGroupDetail: function (data, callback, onError) {
      /*
             * data = {
             *   groupId
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetGroupDetail(data, callback, onError);
    },
    searchGroups: function (data, callback, onError) {
      /*
             * data = {
             *   searchType,
             *   keyWords
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildSearchGroups(data, callback, onError);
    },
    deleteGroupMember: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   memberId
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildDeleteGroupMember(data, callback, onError);
    },
    forbidMemberSpeak: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   memberId,
             *   forbidState,
             *   allForbid
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildForbidMemberSpeak(data, callback, onError);
    },
    setGroupMessageRule: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   isApplePush,
             *   isNotice
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildSetGroupMessageRule(data, callback, onError);
    },
    queryGroupMemberCard: function (data, callback, onError) {
      /*
             * data = {
             *   belong,
             *   memberId
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildQueryGroupMemberCard(data, callback, onError);
    },
    modifyMemberCard: function (data, callback, onError) {
      /*
             * data = {
             *   belong,
             *   memberId,
             *   phone,
             *   display,
             *   mail,
             *   remark
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildModifyMemberCard(data, callback, onError);
    },
    modifyGroup: function (data, callback, onError) {
      /*
             * data = {
             *   groupName,
             *   groupId
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildModifyGroup(data, callback, onError);
    },
    getUserState: function (data, callback, onError) {
      /*
             * data = {
             *   userAcc
             * }
             */
      data = commonMethods.getParam(data);
      commonConfig.newUserState = data.newUserState ? true : false;
      chatMethods.buildGetUserState(data, callback, onError);
    },
    setGroupMemberRole: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   memberId,
             *   role
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildSetGroupMemberRole(data, callback, onError);
    },
    msgOperation: function (data, callback, onerror) {
      /*
             * data = {
             *   version,
             *   msgId,
             *   type
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildMsgOperation(data, callback, onerror);
    },
    msgRead: function (data, callback, onerror) {
      data = commonMethods.getParam(data);
      this.msgOperation(commonMethods.assign(data, {type: 3}), function (e) {
        callback(e);
      }, function (e) {
        if (onerror) {
          onerror(e);
        }
      })
    }, //可直接调用msgOperation方法
    msgBack: function (data, callback, onerror) {
      data = commonMethods.getParam(data);
      this.msgOperation(commonMethods.assign(data, {type: 1}), function (e) {
        callback(e);
      }, function (e) {
        if (onerror) {
          onerror(e);
        }
      })
    },//可直接调用msgOperation方法
    deleteReadMsg: function (data, callback, onError) {
      /*
             * data = {
             *   msgId
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildDeleteReadMsg(data, callback, onError);
    },
    presetSyncMsgLimit: function (numLimit, callback, onError) {
      if (!isNaN(numLimit) && numLimit >= 0) {
        commonConfig.synMsgMaxNumLimit = numLimit;
        var respObj = {};
        respObj.code = commonConfig.errCode._SUCC;
        callback(respObj)
      } else {
        var respObj = {};
        respObj.code = commonConfig.errCode._CHARSET_ILLEGAl;
        respObj.msg = "只允许不小于0的整数参数";
        onError(respObj)
      }
    },
    getRecentContactList: function (data, callback, onError) {
      /*
             * data = {
             *   time，
             *   limit
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetRecentContactList(data, callback, onError);
    },
    getFileBlob: function (data, callback, onError) {
      data = commonMethods.getParam(data);
      chatMethods.buildGetFileBlob(data, callback, onError);
    },
    getFileSource: function (url, callback, onError) {
      chatMethods.buildGetFileBlob({
        url: url,
        type: "zip"
      }, callback, onError);
    },
    getAudioSource: function (url, callback, onError) {
      chatMethods.buildGetFileBlob({
        url: url,
        type: 'amr'
      }, callback, onError);
    },
    setReauth: function (reqSig, longTimestamp) {
      commonConfig.longTimestamp = longTimestamp;
      commonConfig.reqSig = reqSig;
    },
    enterChatroom: function (data, callback, onError) {
      /*
             * data = {
             *   roomId,
             *   nickName,
             *   infoExt,
             *   needNotify,
             *   notifyExt
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildEnterChatroom(data, callback, onError);
    },
    exitChatroom: function (data, callback, onError) {
      /*
             * data = {
             *   roomId,
             *   needNotify,
             *   notifyExt
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildExitChatroom(data, callback, onError);
    },
    fetchChatroomInfo: function (data, callback, onError) {
      /*
             * data = {
             *   roomId
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildFetchChatroomInfo(data, callback, onError);
    },
    fetchChatroomMembers: function (data, callback, onError) {
      /*
             * data = {
             *   roomId,
             *   userId,
             *   type,
             *   pageSize
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildFetchChatroomMembers(data, callback, onError);
    },
    updateChatroomInfo: function (data, callback, onError) {
      /*
             * data = {
             *   roomId,
             *   announcement,
             *   roomName,
             *   roomExt,
             *   allMuteMode,
             *   needNotify,
             *   notifyExt
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildUpdateChatroomInfo(data, callback, onError);
    },
    updateChatRoomMemberRole: function (data, callback, onError) {
      /*
             * data = {
             *   roomId,
             *   userId,
             *   type,
             *   needNotify,
             *   notifyExt
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildUpdateChatRoomMemberRole(data, callback, onError);
    },
    updateMemberOption: function (data, callback, onError) {
      /*
             * data = {
             *   roomId,
             *   userId,
             *   state,
             *   muteDuration,
             *   needNotify,
             *   notifyExt
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildUpdateMemberOption(data, callback, onError);
    },
    updateMyChatroomMemberInfo: function (data, callback, onError) {
      /*
             * data = {
             *   roomId,
             *   nickName,
             *   infoExt
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildUpdateMyChatroomMemberInfo(data, callback, onError);
    },
    kickMember: function (data, callback, onError) {
      /*
             * data = {
             *   roomId,
             *   userId,
             *   needNotify,
             *   notifyExt
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildKickMember(data, callback, onError);
    },
    allMuteMode: function (data, callback, onError) {
      data = commonMethods.getParam(data);
      this.updateChatroomInfo(data, callback, onError);
    }, //可直接调用updateChatroomInfo方法
    defriendMember: function (data, callback, onError) {
      data = commonMethods.getParam(data);
      this.updateMemberOption(data, callback, onError);
    },//可直接调用updateMemberOption方法
    forbidChatRoomMember: function (data, callback, onError) {
      data = commonMethods.getParam(data);
      this.updateMemberOption(data, callback, onError);
    },//可直接调用updateMemberOption方法
    setTopContact: function (data, callback, onerror) {
      /*
             * data = {
             *   contact,
             *   type
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildSetTopContact(data, callback, onerror);
    },
    getTopContact: function (callback, onerror) {
      chatMethods.buildGetTopContact(callback, onerror);
    },
    setOfflineMsgCount: function (callback) {
      if (typeof callback !== "function") throw "param type err";
      chatMethods.processOfflineMsg = callback;
    },
    getFriends: function (data, callback, onError) {
      /*
             * data = {
             *   timestamp,
             *   size,
             *   isUpdate
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetFriend(data, callback, onError);
    },
    addFriends: function (data, callback, onError) {
      /*
             * data = {
             *   friendUseracc,
             *   message,
             *   source
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildAddFriend(data, callback, onError);
    },
    setRemark: function (data, callback, onError) {
      /*
             * data = {
             *   friendUseracc,
             *   remarkName
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildSetFriendRemark(data, callback, onError);
    },
    delFriend: function (data, callback, onError) {
      /*
             * data = {
             *   friendUseracc,
             *   allDel
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildDelFriend(data, callback, onError);
    },
    getRequestHistoryList: function (data, callback, onError) {
      /*
             * data = {
             *   timestamp,
             *   size
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetRequestHistoryList(data, callback, onError);
    },
    getOtherInfo: function (data, callback, onError) {
      /*
             * data = {
             *   friendUseracc
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetOtherInfo(data, callback, onError);
    },
    getUserVerify: function (data, callback, onError) {
      /*
             * data = {
             *   addVerify
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildSetUserVerify(data, callback, onError);
    },
    agreeFriendRequest: function (data, callback, onError) {
      /*
             * data = {
             *   friendUseracc
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildAgreeFriendRequest(data, callback, onError);
    },
    refuseFriendRequest: function (data, callback, onError) {
      /*
             * data = {
             *   friendUseracc,
             *   message
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildRefuseFriendRequest(data, callback, onError);
    },
    getFriendInfo: function (data, callback, onError) {
      /*
             * data = {
             *   friendUseracc
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetFriendInfo(data, callback, onError);
    },
    uploadAvatar: function (data, callback, onError, process) {
      data = commonMethods.getParam(data);
      chatMethods.buildUploadAvatar(data, callback, onError, process);
    },
    getMyInfo: function (callback, onError) {
      RL_YTX.sendMsg({
        sendObj: null,
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._getMyInfo
        },
        msgKey: '',
        clientData: {}
      }, callback, onError);
    },
    getGroupList: function (data, callback, onError) {
      /*
             * data = {
             *   groupId,
             *   pageSize,
             *   target
             * }
             */
      data = commonMethods.getParam(data);
      chatMethods.buildGetGroupList(data, callback, onError)
    },
    confirmMsg: function () {
      RL_YTX.sendMsg({
        sendObj: {
          1: commonConfig.msgVersion
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._confirmMsg
        },
        msgKey: 'ConfirmMsg',
        clientData: {}
      }, function () {
        commonConfig.syncMsgVersion = commonConfig.msgVersion
      }, function () {
      });
    },
    processSyncMsg: function (type, endVersion, requestType, repeat) {
      if (1 === type && commonConfig.syncMsgPorcessing) {
        return;
      }
      if (!!endVersion && endVersion < commonConfig.maxMsgVersion) {  //重新拉取离线消息
        var type = (!!requestType) ? requestType : -1;
        chatMethods.buildSyncMessage({
          startVersion: commonConfig.msgVersion + 1,
          endVersion: endVersion,
          type: type,
          repeat: repeat
        }, reGet);
        commonConfig.syncMsgPorcessing = true;
      } else if (commonConfig.msgVersion < commonConfig.maxMsgVersion) {  // 本地消息版本号小于本地最大消息版本号，中间缺消息
        var end = commonConfig.maxMsgVersion;
        var msgArr = [];
        console.log('chatConfig.receiveMsgBuf', JSON.stringify(chatConfig.receiveMsgBuf), commonConfig.msgVersion);
        for (var i in chatConfig.receiveMsgBuf) {  //循环消息暂存里的消息
          if (parseInt(i) === (commonConfig.msgVersion + 1)) {  //消息暂存里存在本地版本号+1的消息，则进行下发
            var msg = chatConfig.receiveMsgBuf[(commonConfig.msgVersion + 1)];
            delete chatConfig.receiveMsgBuf[(commonConfig.msgVersion + 1)];
            commonConfig.msgVersion = commonConfig.msgVersion + 1;
            if (!!msg) {
              if (chatConfig.getMsgByArray) {
                msgArr.push(msg);
              } else {
                this.noticeApp(msg);
              }
            }
          } else if (!chatConfig.receiveMsgBuf[parseInt(i) - 1]) {  //消息暂存中不存在本地消息版本号+1的消息，中间缺消息，存下endVersion进行下次拉取
            end = parseInt(i) - 1;
          }
        }
        if (msgArr.length > 0)  this.noticeApp(msgArr);
        if (commonConfig.msgVersion !== commonConfig.maxMsgVersion) {  //若本地消息版本号不等于最大消息版本号，需要重新拉取离线消息
          chatMethods.buildSyncMessage({
            startVersion: commonConfig.msgVersion + 1,
            endVersion: end,
            type: 0,
            repeat: repeat
          }, reGet);
          commonConfig.syncMsgPorcessing = true;
        } else {
          commonConfig.syncMsgPorcessing = false;
        }
      } else {
        commonConfig.syncMsgPorcessing = false;
      }

      function reGet(err) {
        if (err.code && err.code !== 171139) {  //离线消息拉取失败，进行重新拉取
          commonConfig.syncMsgPorcessing = false;
          setTimeout(function() {
            this.processSyncMsg(type, endVersion, requestType, repeat);
          }, 2000)
        } else {
          commonConfig.syncMsgPorcessing = false;
          if (commonConfig.msgVersion !== commonConfig.maxMsgVersion) {
            commonConfig.msgVersion = end || endVersion;
          }
        }
      }
    },
    noticeApp: function (obj) {
      var msgObj = {};
      if (Array.isArray(obj)) {
        obj.forEach(function (item) {
          msgObj[item.msgType] = msgObj[item.msgType] || [];
          msgObj[item.msgType].push(chatMethods.noticeAppFn(item))
        })
      } else {
        if (chatConfig.getMsgByArray) {
          msgObj[obj.msgType] = [chatMethods.noticeAppFn(obj)];
        } else {
          msgObj[obj.msgType] = chatMethods.noticeAppFn(obj);
        }
      }
      for (var val in msgObj) {
        if (parseInt(val) === commonConfig.msgTypeNo._msg_CMD && chatMethods._noticeListener) { //cmd消息
          chatMethods._noticeListener(msgObj[val]);
          console.log('_noticeListener send', msgObj[val]);
        } else if (parseInt(val) === commonConfig.msgTypeNo._msg_DEL && chatMethods._msgNotifyListener) { //阅后即焚删除消息
          chatMethods._msgNotifyListener(msgObj[val]);
          console.log('_msgNotifyListener send', msgObj[val]);
        } else if (parseInt(val) === commonConfig.msgTypeNo._chatRoom.ChatRoom_MESSAGE && chatMethods._charRoomListener) { //聊天室推送消息
          chatMethods._charRoomListener(msgObj[val]);
          console.log('_charRoomListener send', msgObj[val]);
        } else if (parseInt(val) === commonConfig.msgTypeNo.friendMsg) { //好友消息
          chatMethods._friendNoticeMsgListener(msgObj[val]);
          console.log('_friendNoticeMsgListener send', msgObj[val]);
        } else {
          if (!!chatMethods._pushListener) {
            chatMethods._pushListener(msgObj[val]);
            console.log('_pushListener send', msgObj[val]);
          }
        }
      }
    },
    onNoticeReceiveListener: function (callback) {
      chatMethods._noticeListener = callback;
    },
    onMsgNotifyReceiveListener: function (callback) {
      chatMethods._msgNotifyListener = callback
    },
    OnLineStateNotifyListener: function (callback) {
      chatMethods._OnLineStateNotifyListener = callback;
    },
    onChatRoomEventListener: function (callback) {
      chatMethods._charRoomListener = callback
    },
    onMsgReceiveListener: function (callback) {
      chatMethods._pushListener = callback
    },
    onProcessFriendReqListener: function (callback) {
      chatMethods._friendNoticeMsgListener = callback
    },
    _meetListener: function (res) {

    },
    onSantiMsgReceiveListener: function (callback) {
      this._meetListener = callback;
    },
    receiveRequestResponse: function (obj, callback) {
      obj["2"]["fileUrl"] = Base64.decode(chatConfig.lvsServer);
      callback(obj["2"]);
    },
    receiveHttpResponse: function (obj, callback) {
      var type = obj["1"];
      if (type === commonConfig.httpType._historyMessage) {
        var data = obj;
        var resp = chatMethods.parseGetHistoryMsg(data);
        callback(resp);
      } else if (type === commonConfig.httpType._recentContact) {
        var data = obj;
        var resp = chatMethods.parseGetRecentContactList(data);
        callback(resp);
      } else {
        callback(commonMethods.parseCodeResp(obj));
      }
    },
    receiveOnLineStateNotify: function (obj) {
      var msg = obj[2]['PublishPresenceResp'];
      chatMethods._OnLineStateNotifyListener(msg);
      console.log('_OnLineStateNotifyListener', msg);
    },
    receivePushMsg: function (obj) {
      var pushs = obj["2"]["PushMsg"];
      if (pushs[2] === 13) return;
      if (pushs["1"] && commonConfig.hasLocalStorage) {
        console.log(pushs["1"]);
        commonMethods.setlocalStorage(pushs["1"]);
      }
      var pushMsg = chatMethods.parsePushMsgResp(obj);
      console.log('pushMsg---', pushMsg, commonConfig.msgVersion);
      if (pushMsg.msgType === commonConfig.msgTypeNo._cmdMsg && pushMsg.msgSender !== commonConfig.userName) {
        try {
          var msgDomain = JSON.parse(pushMsg.msgDomain);
          if (msgDomain.SanTi) {
            this._meetListener(msgDomain.SanTi);
            return
          }
        }
        catch (e) {}
      }
      if (!pushMsg.version) {
        if (pushMsg.msgDomain === "undefined" && !!pushMsg.msgContent && pushMsg.msgType === 12) {
          pushMsg.msgDomain = pushMsg.msgContent;
          pushMsg.msgContent = null;
        }
        this.noticeApp(pushMsg);
        return;
      }
      if (commonConfig.msgVersion + 1 === pushMsg.version) {
        if (commonConfig.syncMsgPorcessing) {
          chatConfig.receiveMsgBuf[pushMsg.version] = pushMsg;
        } else {
          commonConfig.msgVersion += 1;
          this.noticeApp(pushMsg);
        }
      } else if (pushMsg.version > commonConfig.msgVersion) {
        console.log('commonConfig.maxMsgVersion---', commonConfig.maxMsgVersion);
        commonConfig.maxMsgVersion = (commonConfig.maxMsgVersion < pushMsg.version) ? pushMsg.version : commonConfig.maxMsgVersion;
        chatConfig.receiveMsgBuf[pushMsg.version] = pushMsg;
        this.processSyncMsg(1);
      }
      if (commonConfig.msgVersion % this.maxSyncNum === 0) {
        this.confirmMsg();
      }
    },
    receivePushMsgNotify: function (obj) {
      var notifyResp = chatMethods.parsePushMsgNotifyResp(obj);
      var msgVersion = notifyResp.version;
      commonConfig.maxMsgVersion = msgVersion;
      this.processSyncMsg(1);
    },
    receiveSyncMsg: function (obj, request) {
      var resps = chatMethods.parseSyncMsgResp(obj);
      var continues = true;
      var end = request.endVersion;
      var msgArray = [];
      for (var i = 0; i < resps.length; i++) {
        var resp = resps[i];
        if (!resp.version) {
          continue;
        }
        commonMethods.setlocalStorage(resp.version);
        if (commonConfig.msgVersion >= resp.version) {  // 本地版本号大于等于收到消息版本号时，消息直接下发
          if (!chatConfig.getMsgByArray) {
            this.noticeApp(resp);
          } else {
            msgArray.push(resp);
          }
        } else if (commonConfig.msgVersion + 1 === resp.version) { // 当收到的消息版本号等于  本地消息版本号+1时
          commonConfig.msgVersion = resp.version //更新本地版本号
          if (commonConfig.msgVersion % this.maxSyncNum === 0) {
            this.confirmMsg();
          }
          if (chatConfig.receiveMsgBuf[resp.version]) {  //删除消息暂存对象中的消息
            delete chatConfig.receiveMsgBuf[resp.version]
          }
          if (!chatConfig.getMsgByArray) {  //消息下发
            this.noticeApp(resp);
          } else {
            msgArray.push(resp);
          }
        } else {  // 当收到的消息版本号 大于本地消息+1时，说明有消息缺失
          if (continues) {
            continues = false;
            end = resp.version - 1; //存储重新拉取离线消息时的endVersion
          }
          chatConfig.receiveMsgBuf[resp.version] = resp; //将已收到的离线消息暂存
        }
      }
      if (chatConfig.getMsgByArray && msgArray.length > 0)  this.noticeApp(msgArray);
      if (!continues) { //需要重新拉取离线消息
        commonConfig.syncMsgPorcessing = false;
        this.processSyncMsg(2, end, request.type);
      } else {
        commonConfig.syncMsgPorcessing = false;
        this.processSyncMsg(2);
      }
    },
    receiveChatRoomMsg: function (obj) {
      var chatRoomMsg = chatMethods.parseChatRoomMsg(obj);
      this.noticeApp(chatRoomMsg);
    },
    receiveMsgResp: function (obj, request, key) {
      var callback = request.callback;
      if (key === 'parseGetGroupListResp' || key === 'parseGetGroupMemberListResp') {
        chatMethods[key](obj, callback, request.onError)
      } else {
        callback(chatMethods[key](obj, request))
      }
    },
    enterRoom: function () {
      if (chatConfig.chatRoomId) {
        this.enterChatroom(chatConfig.enterChatRoomData, function () {

        }, function () {

        })
      }
      // else {
      //     YTX_CONFIG.chatRoomId = RL_YTX.chatRoomId;
      //     YTX_CONFIG.chatRoomNickName = RL_YTX.chatRoomNickName;
      //     YTX_CONFIG.chatRoomInfoExt = RL_YTX.chatRoomInfoExt;
      // }
    },
    fileUpload: function(data, callback, onError, onProgress) {
      if (!data.file || !data.fileName) {
        var resp = {};
        resp.code = commonConfig.errCode._LOGIN_NO_PWD;
        resp.msg = 'param file or fileName is empty';
        onError(resp);
        return
      }
      var fileReader = new FileReader();
      fileReader.readAsArrayBuffer(data.file);
      fileReader.onload = function () {
        var postUrl = chatConfig.fileServerIp + '/2015-03-26/Corp/yuntongxun/Upload/VTM?sig=2B9C64616C98A93F1375BF0A2F6429E7&appId=' + commonConfig.appId + '&userName=' + commonConfig.userName + '&fileName=' + data.fileName;
        var sendData = {
          url: postUrl,
          header: {
            'Content-type': 'application/octet-stream;',
            'Accept': 'application/xml;'
          },
          sendData: fileReader.result,
          progress: onProgress,
          success: callback,
          error: onError
        };
        commonMethods.ajax(sendData);
      };
    }
  }


  //会议构造函数
  var meet = {};
  function RL_MEET() {
    RL_YTX = ROOT.RL_YTX_NEW;
    meet = this;
  }

  var meetConfig = {
    confId: '',
    isInMeeting: false,
    meetRouterMap:{}
  };
  var meetMethods = {
    _conferenceNotifyListener: function (res) {

    },
    //数据解析
    parseConferenceNotice: function (obj) {
      var data = obj["2"];
      if (!data) {
        return {
          code: obj[6]
        };
      }
      var reData = data["ConferenceNotification"];
      var resp = JSON.parse(reData["2"]);
      if (!meetConfig.meetRouterMap[resp.confId] && obj["9"]) {
        meetConfig.meetRouterMap[resp.confId] = obj["9"];
      }
      return resp;
    },
    parseConferenceMessageResp: function (obj) {
      var resp = {};
      resp.code = obj["6"];
      resp.result = Base64.decode(obj["2"]["ConferenceMessageResp"]["1"]);
      return resp
    },
    //功能实现
    buildConferenceMsg: function (path, content, callback, onError) {
      if (!path || !content) {
        var resp = {};
        resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
        resp.msg = 'param path or content is empty.';
        onError(resp);
        return
      }
      content.appId = commonConfig.appId;
      content.userId = commonConfig.userName;
      RL_YTX.sendMsg({
        sendObj: {
          1: path,
          2: Base64.encode(JSON.stringify(content))
        },
        MsgLiteObj: {
          1: commonConfig.msgTypeNo._ConferenceMessage
        },
        msgKey: 'ConferenceMessage'
      }, callback, onError);
    },
  };
  RL_MEET.prototype = {
    unLoad: function () {
      meetConfig.confId = ''
    },
    setConfig: function (data) {
      meetConfig = commonMethods.assign(meetConfig, data);
      console.log('RL_MEET set config succ')
    },
    receiveMsgResp: function (obj, request, key) {
      var callback = request.callback;
      callback(meetMethods[key](obj, request))
    },
    receiveConferenceNotice: function (obj) {
      var cn = meetMethods.parseConferenceNotice(obj);
      meetMethods._conferenceNotifyListener(cn);
    },
    onConferenceNotifyLinstener: function (callback) {
      meetMethods._conferenceNotifyListener = callback
    },
    ConferenceMsg: function (data, callback, onerror) {
      meetMethods.buildConferenceMsg(data.path, data.content, callback, onerror);
    },
    // 加入会议
    JoinMeetRoom: function(data, callback, onError) {
      this.confId = data.confId;
      meetMethods.buildConferenceMsg('/REST/Conference/Member/Join?source=SDK', data, function (e) {
        var resp = JSON.parse(e.result);
        console.log('JoinMeetRoom  data', resp)
        if (resp.statusCode !== "000000") {
          onError(resp);
          return;
        } else {
          if (resp.conf.creator.indexOf("$") > -1) {
            resp.conf.creator = resp.conf.creator.substr(resp.conf.creator.indexOf("$") + 1);
          }
        }
        ROOT.RL_Media.ConnectMedia({
          isVoipCall: 1,
          called: resp.conf.confId
        }, function (res) {
          callback(resp, res);
        }, function (err) {
          onError(err);
        })
      }, onError)
    },
    // 白板共享
    StartWhiteboardSharing: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/MediaControl/StartWhiteboardSharing?source=SDK", commonMethods.assign({confId: this.confId}, data), function (e) {
        var resp = JSON.parse(e.result);
        if (resp.statusCode !== "000000") {
          onError(resp);
          return;
        } else {
          callback(resp);
        }
      }, onError)
    },
    // 停止白板共享
    StopWhiteboardSharing: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/MediaControl/StopWhiteboardSharing?source=SDK", commonMethods.assign({confId: this.confId}, data), function (e) {
        var resp = JSON.parse(e.result);
        if (resp.statusCode !== "000000") {
          onError(resp);
          return;
        } else {
          callback(resp);
        }
      }, onError);
    },
    // 会议更新
    ConferenceUpdate: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Update?source=SDK", commonMethods.assign({confId: this.confId}, data), function (e) {
        var resp = JSON.parse(e.result);
        if (resp.statusCode !== "000000") {
          onError(resp);
          return;
        } else {
          callback(resp);
        }
      }, onError);
    },
    //会议室列表
    RoomList: function(data, callback, onError) {
      meetMethods.buildConferenceMsg(
        "/REST/Conference/Room/List?source=SDK", commonMethods.assign({confId: this.confId}, data), function (e) {
          var resp = JSON.parse(e.result);
          if (resp.statusCode !== "000000") {
            onError(resp);
            return;
          } else {
            callback(resp);
          }
        }, onError);
    },
    // 获取成员列表
    GetMeetMemberList: function(data, callback, onError) {
      meetMethods.buildConferenceMsg(
        "/REST/Conference/Member/List?source=SDK", commonMethods.assign({confId: this.confId}, data), function (e) {
          var resp = JSON.parse(e.result);
          callback(resp);
        }, onError);
    },
    // 获取会议信息
    GetMeetInfo: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Info?source=SDK", data, callback, onError);
    },
    // 创建会议
    CreateMeet: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Create?source=SDK", data, function (e) {
        var result = JSON.parse(e.result);
        if (result.statusCode === "000000") {
          this.confId = result.confId;
          callback(result);
        } else {
          onError(result);
        }
      }, onError);
    },
    // 获取会议列表
    GetOrderMeetList: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/List?source=SDK", data, function (e) {
        var resp = JSON.parse(e.result);
        if (resp.statusCode === "000000") {
          callback(resp);
        } else {
          onError(resp);
        }
      }, onError);
    },
    // 发布语音
    StartPublishVoice: function(data, callback, onError) {
      ROOT.RL_Media.deployVideoVoice(true, "audio");
      meetMethods.buildConferenceMsg("/REST/Conference/MediaControl/StartPublishVoice?source=SDK", commonMethods.assign({confId: this.confId}, data), callback, onError);
    },
    // 停止发布语音
    StopPublishVoice: function(data, callback, onError) {
      ROOT.RL_Media.deployVideoVoice(false, "audio");
      meetMethods.buildConferenceMsg("/REST/Conference/MediaControl/StopPublishVoice?source=SDK", commonMethods.assign({confId: this.confId}, data), callback, onError);
    },
    //  发布视频
    StartPublishVideo: function(data, callback, onError) {
      ROOT.RL_Media.deployVideoVoice(true, "video");
      meetMethods.buildConferenceMsg("/REST/Conference/MediaControl/StartPublishVideo?source=SDK", commonMethods.assign({confId: this.confId}, data), function (e) {
        var resp = JSON.parse(e.result);
        if (resp.statusCode === "000000") {
          callback(resp);
        } else {
          onError(resp);
        }
      }, onError);
    },
    //  停止发布视频
    StopPublishVideo: function(data, callback, onError) {
      ROOT.RL_Media.deployVideoVoice(false, "video");
      meetMethods.buildConferenceMsg("/REST/Conference/MediaControl/StopPublishVideo?source=SDK", commonMethods.assign({confId: this.confId}, data), function (e) {
        var resp = JSON.parse(e.result);
        if (resp.statusCode === "000000") {
          callback(resp);
        } else {
          onError(resp);
        }
      }, onError);
    },
    // 邀请
    InviteMember: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Member/Invite?source=SDK", commonMethods.assign({confId: this.confId}, data), function (e) {
        var resp = JSON.parse(e.result);
        if (resp.statusCode === "000000") {
          callback(resp);
        } else {
          onError(resp);
        }
      }, onError);
    },
    // 控制媒体
    MediaControl: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Member/MediaControl?source=SDK", commonMethods.assign({confId: this.confId}, data), callback, onError);
    },
    //更新成员信息
    UpdateMeetMemberNick: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Member/Update?source=SDK", data, callback, onError);
    },
    //踢出成员
    KickMeetMember: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Member/Kickout?source=SDK", data, callback, onError);
    },
    //拒绝邀请
    RejectInvitation: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Member/RejectInvitation?source=SDK", data, callback, onError);
    },
    //接受邀请
    AcceptInvitation: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Member/AcceptInvitation?source=SDK", data, callback, onError);
    },
    //退出会议
    leaveMeeting: function(data, callback, onError) {
      if (!this.callId) return;
      meetMethods.buildConferenceMsg("/REST/Conference/Member/Quit?source=SDK", commonMethods.assign({confId: this.confId}, data), callback, onError);
      ROOT.RL_Media.releaseCall({
        caller: this.caller,
        called: this.called,
        callId: this.callId
      }, function (e) {
        console.log(e, "quit meeting ");
      }, function (err) {
        console.log(err);
      });
      this.callId = null;
      this.called = null;
      this.caller = null;
    },
    // 删除会议、结束会议
    DeleteMeeting: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Delete?source=SDK", commonMethods.assign({confId: this.confId}, data), callback, onError);
      ROOT.RL_Media.DisconnectMedia({
        caller: this.caller,
        called: this.called,
        callId: this.callId
      }, function (e) {
        console.log(e, "quit meeting ");
      }, function (err) {
        console.log(err);
      });

      this.callId = null;
      this.called = null;
      this.caller = null;
    },
    //获取会议摘要列表
    GetAbstractList: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Abstract/List?source=SDK", data, function (e) {
        if (e.result) {
          var result = JSON.parse(e.result);
          if (result.statusCode === "000000") {
            callback(result);
          } else {
            onError(result);
          }
        }
      }, onError);
    },
    //更新会议摘要
    UpdateAbstract: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Abstract/Update?source=SDK", commonMethods.assign({confId: this.confId}, data), callback, onError);
    },
    //锁定会议
    LockMeet: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/LockUnlock?source=SDK", commonMethods.assign({confId: this.confId}, data), callback, onError);
    },
    //删除摘要
    DeleteAbstract: function(data, callback, onError) {
      meetMethods.buildConferenceMsg("/REST/Conference/Abstract/Delete?source=SDK", data, callback, onError)
    }
  }

  String.prototype.startWith = function (str) {
    if (str == null || str == '' || this.length == 0 || str.length > this.length) return false;
    if (this.substr(0, str.length) == str) {
      return true;
    } else {
      return false;
    }
    return true
  };
  String.prototype.endWith = function (str) {
    if (str == null || str == "" || this.length == 0 || str.length > this.length) ;
    return false;
    if (this.substring(this.length - str.length) == str) {
      return true;
    } else {
      return false;
    }
    return true
  };
  ROOT.RL_YTX_NEW = new RLYTX();
  console.log('RL_YTX_NEW', ROOT.RL_YTX_NEW)
  if (typeof module !== "undefined" && module !== null) {
    module.exports = RLYTX;
  }
})();
