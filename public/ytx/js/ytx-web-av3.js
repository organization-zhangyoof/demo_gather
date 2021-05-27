
  if (typeof (hex_md5) == "undefined") {
    document.write('<script src="https://app.cloopen.com/im50/MD5.min.js" type="text/javascript" charset="utf-8"></script>')
  }
  if (typeof (Base64) == "undefined") {
    document.write('<script src="https://app.cloopen.com/im50/base64.min.js" type="text/javascript" charset="utf-8"></script>')
  }
  if (typeof (pako) == "undefined") {
    document.write('<script src="https://app.cloopen.com/im50/pako.js" type="text/javascript" charset="utf-8"></script>')
  }
  if (typeof (AMR) == "undefined") {
    document.write('<script src="https://app.cloopen.com/im50/amrnb.js" type="text/javascript" charset="utf-8"></script>')
  }

//=======================================Meeting==============================//
  var ParKey = {};
  ParKey.MessageType = "1";
  ParKey.MessageContent = "2";
  ParKey.Method = "1";
  ParKey.CallId = "2";
  ParKey.IsVoipCall = "3";
  ParKey.Called = "5";
  ParKey.Caller = "7";
  ParKey.Sdp = "17";
  ParKey.Seq = "25";
  ParKey.ClientNo = "3";
  ParKey.CallRouteId = "9";
  ParKey.Cause = "10";
  ParKey.UserData = "13";
  ParKey.CustomData = "14";

  var ParValue = {};
  ParValue.Call = 127;
  ParValue.Conference = 140;

  var ParMethod = {};
  ParMethod.Invite = 1;
  ParMethod.Ring = 2;
  ParMethod.Answer = 4;
  ParMethod.ACK = 6;
  ParMethod.Bye = 7;
  ParMethod.Cancel = 8;
  ParMethod.Refuse = 10;
  ParMethod.Trying = 13;
  ParMethod.SubscribeMediaRequest = 38;
  ParMethod.SubscribeMediaResponse = 39;
  ParMethod.UnSubscribeMediaRequest = 40;
  ParMethod.UnSubscribeMediaResponse = 41;
  ParMethod.PublishMediaRequest = 42;
  ParMethod.PublishMediaResponse = 43;
  ParMethod.UnPublishMediaRequest = 44;
  ParMethod.UnPublishMediaResponse = 45;
  
  var YTX_Protobuf = {};

  YTX_Protobuf.CallEventDataInner = function(){
    this.CallEventDataInner = {};
    this.setMethod = function(method){
      this.CallEventDataInner[ParKey.Method] = method;
    };
    this.setIsVoipCall = function(isVoipCall){
      this.CallEventDataInner[ParKey.IsVoipCall] = isVoipCall;
    };
    this.setCallId = function(id){
      this.CallEventDataInner[ParKey.CallId] = id;
    };
    this.setCalled = function(called){
      this.CallEventDataInner[ParKey.Called] = called;
    };
    this.setCaller = function(caller){
      this.CallEventDataInner[ParKey.Caller] = caller;
    };
    this.setSdp = function(sdp){
      this.CallEventDataInner[ParKey.Sdp] = sdp;
    };
    this.setSeq = function(seq){
      this.CallEventDataInner[ParKey.Seq] = seq;
    };
    this.setCause = function(cause){
      this.CallEventDataInner[ParKey.Cause] = cause;
    };
    this.setUserData = function(data){
      this.CallEventDataInner[ParKey.UserData] = data;
    };
    this.setCustomData = function(customData){
      this.CallEventDataInner[ParKey.CustomData] = customData;
    };
  };

  YTX_Protobuf.callMessage = function(){
    this[ParKey.MessageType] = ParValue.Call;
    this[ParKey.MessageContent] = new YTX_Protobuf.CallEventDataInner();
    
    this.setMethod = function(method){
      this[ParKey.MessageContent].setMethod(method);
    };
    this.setIsvoipCall = function(isvoip){
      this[ParKey.MessageContent].setIsVoipCall(isvoip);
    };
    this.setCallId = function(id){
      this[ParKey.MessageContent].setCallId(id);
    };
    this.setCalled = function(called){
      this[ParKey.MessageContent].setCalled(called);
    };
    this.setCaller = function(caller){
      this[ParKey.MessageContent].setCaller(caller);
    };
    this.setSdp = function(sdp){
      this[ParKey.MessageContent].setSdp(sdp);
    };
    this.setCause = function(cause){
      this[ParKey.MessageContent].setCause(cause);
    };
    this.setUserData = function(data){
      this[ParKey.MessageContent].setUserData(data);
    };
    this.setCustomData = function(customData){
      this[ParKey.MessageContent].setCustomData(customData);
    };
    this.setSeq = function(seq){
      this[ParKey.MessageContent].setSeq(seq);
    };
    this.setClientNo = function(clientNo){
      this[ParKey.ClientNo] = clientNo;
    };
    this.setCallrouteId = function(id){
      this[ParKey.CallRouteId] = id;
    };
    this.encode = function(){
      var result = {};
      result["MsgLite"] = this;
      return JSON.stringify(result);
    };
  }

  YTX_Protobuf.publishMediaRequest = function(){
    this[ParKey.MessageType] = ParValue.Call;
    this[ParKey.MessageContent] = new YTX_Protobuf.CallEventDataInner();
    this[ParKey.MessageContent].setMethod(ParMethod.PublishMediaRequest);

    this.setCallId = function(id){
      this[ParKey.MessageContent].setCallId(id);
    };
    this.setCalled = function(called){
      this[ParKey.MessageContent].setCalled(called);
    };
    this.setCaller = function(caller){
      this[ParKey.MessageContent].setCaller(caller);
    };
    this.setCustomData = function(customData){
      this[ParKey.MessageContent].setCustomData(customData);
    };
    this.setSeq = function(seq){
      this[ParKey.MessageContent].setSeq(seq);
    };
    this.setClientNo = function(clientNo){
      this[ParKey.ClientNo] = clientNo;
    };
    this.setCallrouteId = function(id){
      this[ParKey.CallRouteId] = id;
    };
    this.encode = function(){
      var result = {};
      result["MsgLite"] = this;
      return JSON.stringify(result);
    };
  };

  YTX_Protobuf.unPublishMediaRequest = function(){
    this[ParKey.MessageType] = ParValue.Call;
    this[ParKey.MessageContent] = new YTX_Protobuf.CallEventDataInner();
    this[ParKey.MessageContent].setMethod(ParMethod.UnPublishMediaRequest);

    this.setCallId = function(id){
      this[ParKey.MessageContent].setCallId(id);
    };
    this.setCalled = function(called){
      this[ParKey.MessageContent].setCalled(called);
    };
    this.setCaller = function(caller){
      this[ParKey.MessageContent].setCaller(caller);
    };
    this.setCustomData = function(customData){
      this[ParKey.MessageContent].setCustomData(customData);
    };
    this.setSeq = function(seq){
      this[ParKey.MessageContent].setSeq(seq);
    };
    this.setClientNo = function(clientNo){
      this[ParKey.ClientNo] = clientNo;
    };
    this.setCallrouteId = function(id){
      this[ParKey.CallRouteId] = id;
    };
    this.encode = function(){
      var result = {};
      result["MsgLite"] = this;
      return JSON.stringify(result);
    };
  };
  
  var CState = {};
  CState.Disconnected = 1;
  CState.Connecting = 2;
  CState.Alerting = 3;
  CState.Connected = 4;
  CState.Disconnecting = 5;
  CState.ScreenSharing = 6;
  CState.CancelScreenSharing = 7;
  CState.Updating = 8;

  var COperation = {};
  COperation.Calling = 1;
  COperation.Meeting = 2;

  var MType = {};
  MType.Audio = 0;
  MType.Video = 1;

  var CDirection = {};
  CDirection.CallIn = 0;
  CDirection.CallOut = 1;

  var CStatusCode = {};
  CStatusCode.NoDevice = 120001;
  CStatusCode.BrowserNotSupport = 120002;

  var YTX_Meeting = {};
  YTX_Meeting.Version = "3.4.2";
  //need reset
  YTX_Meeting.processing =false;
  YTX_Meeting.requestQueue = new Array();
  YTX_Meeting.confId = "";
  YTX_Meeting.caller = "";
  YTX_Meeting.called = "";
  YTX_Meeting.callId = "";
  YTX_Meeting.userData = "";
  YTX_Meeting.callRouteId = "";
  YTX_Meeting.mediaType = MType.Audio;
  YTX_Meeting.operation = COperation.Calling;
  YTX_Meeting.direction = CDirection.CallOut;

  YTX_Meeting.recvInviteSdp = ""; //as called
  YTX_Meeting.recvAnswerSdp = ""; //as calling

  YTX_Meeting.selfSsrc = "";
  YTX_Meeting.antiSsrc = "";
  YTX_Meeting.antiVideoCodec = "";

  YTX_Meeting.clientNo = 100;
  YTX_Meeting.makeCallTimerId = 0;
  YTX_Meeting.updateCallTimerId = 0;
  YTX_Meeting.releaseCallTimerId = 0;
  YTX_Meeting.publishMediaTimerId = 0;
  YTX_Meeting.unPublishMediaTimerId = 0;
  YTX_Meeting.connState = CState.Disconnected;
  YTX_Meeting.requestMap = new Map();
  //not need reset
  YTX_Meeting.eventListener = function () {};//呼叫事件上报
  YTX_Meeting.confEventListener = function () {};//会议事件上报
  YTX_Meeting.confNotifyLinstener = function () {};//会议通知上报
  YTX_Meeting.transport = {};
  YTX_Meeting.onPublishMedia = null;//本地流上报
  YTX_Meeting.makeCallFailCallback = null;
  YTX_Meeting.makeCallSuccessCallback = null;
  YTX_Meeting.updateCallFailCallback = null;
  YTX_Meeting.updateCallSuccessCallback = null;
  YTX_Meeting.releaseCallFailCallback = null;
  YTX_Meeting.releaseCallSuccessCallback = null;
  YTX_Meeting.acceptCallFailCallback = null;
  YTX_Meeting.acceptCallSuccessCallback = null;
  YTX_Meeting.startScreenShareFailcCallback = null;
  YTX_Meeting.startScreenShareSuccessCallback = null;
  
  YTX_Meeting.onUnSubscribeMediaFail = null;
  YTX_Meeting.onUnSubscribeMediaSuccess = null;

  YTX_Meeting.reset = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Meeting Reset");
    YTX_Meeting.processing =false;
    YTX_Meeting.requestQueue = [];
    YTX_Meeting.confId = "";
    YTX_Meeting.caller = "";
    YTX_Meeting.called = "";
    YTX_Meeting.callId = "";
    YTX_Meeting.userData = "";
    YTX_Meeting.callRouteId = "";
    YTX_Meeting.mediaType = MType.Audio;
    YTX_Meeting.operation = COperation.Calling;
    YTX_Meeting.direction = CDirection.CallOut;

    YTX_Meeting.recvInviteSdp = "";
    YTX_Meeting.recvAnswerSdp = "";

    YTX_Meeting.selfSsrc = "";
    YTX_Meeting.antiSsrc = "";
    YTX_Meeting.antiVideoCodec = "";

    YTX_Meeting.clientNo = 100;
    clearTimeout(YTX_Meeting.makeCallTimerId);
    clearTimeout(YTX_Meeting.updateCallTimerId)
    clearTimeout(YTX_Meeting.releaseCallTimerId);
    clearTimeout(YTX_Meeting.publishMediaTimerId);
    clearTimeout(YTX_Meeting.unPublishMediaTimerId);
    YTX_Meeting.connState = CState.Disconnected;
    YTX_Meeting.requestMap.clear();
    YTX_Webrtc.reset();
  };

  YTX_Meeting.addRequest = function(request){
    if(YTX_Meeting.requestQueue.length >= 20){
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] RequestQueue Is Full");
      return;
    }
    YTX_Meeting.requestQueue.push(request);
    if(YTX_Meeting.processing == false){
      YTX_Meeting.processing = true;
      YTX_Meeting.handleRequest();
    }    
  };

  YTX_Meeting.handleRequest = function(){
    let request = YTX_Meeting.requestQueue.shift();
    if(!request){
      YTX_Meeting.processing = false;
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Request Process Finish");
      return;
    }
    switch(request.messageId){
      case YTX_MessageId.SubscribeMedia:
        console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Handle SubscribeMedia, userName:", request.userName, ", userId:", request.userId);
        YTX_Meeting.subscribeMedia(request);
        break;
      case YTX_MessageId.UnSubscribeMedia:
        console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Handle UnSubscribeMedia userName:", request.userName, ", userId:", request.userId);
        YTX_Meeting.unSubscribeMedia(request);
        break;
      case YTX_MessageId.StartScreenShare:
        console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Handle StartScreenShare");
        YTX_Meeting.startScreenShare(request.onSuccess, request.onFail);
        break;
      case YTX_MessageId.CancelScreenShare:
        console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Handle CancelScreenShare");
        YTX_Meeting.cancelScreenShare();
        break;
    }
  }; 

  YTX_Meeting.subscribeMediaSuccess = function(request){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] subscribeMedia Success, userName:", request.userName, ", userId:", request.userId);
    if(request.onSuccess){
      request.onSuccess();
    }
    request = null;
    YTX_Meeting.handleRequest();
  };

  YTX_Meeting.subscribeMediaFail = function(request, err){
    console.error(YTX_Meeting.getTimeStamp(), "[Meeting] SubscribeMedia Failed, userName:", request.userName, 
            ", userId:", request.userId, "errName:", err.name, ", errMessage:", err.message);
    if(request.onFail){
      request.onFail();
    }
    request = null;
    YTX_Meeting.handleRequest();
  };

  YTX_Meeting.unSubscribeMediaSuccess = function(request){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] unSubscribeMedia Success, userName:", request.userName, ", userId:", request.userId);
    if(request.onSuccess){
      request.onSuccess();
    }
    request = null;
    YTX_Meeting.handleRequest();
  };

  YTX_Meeting.unSubscribeMediaFail = function(request, err){
    console.error(YTX_Meeting.getTimeStamp(), "[Meeting] unSubscribeMedia Failed, userName:", request.userName, ", userId:", request.userId,
      "errName:", err.name, ", errMessage:", err.message);
    if(request.onFail){
      request.onFail();
    }
    request = null;
    YTX_Meeting.handleRequest();
  };

  YTX_Meeting.startScreenShareFail = function(err){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] startScreenShare Fail, errName:", err.name, ", errMessage:", err.message);
    YTX_Meeting.connState = CState.Connected;
    YTX_Meeting.startScreenShareFailcCallback(err);
    YTX_Meeting.handleRequest();
  };

  YTX_Meeting.startScreenShareSuccess = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] startScreenShare Success");
    YTX_Meeting.connState = CState.Connected;
    YTX_Meeting.startScreenShareSuccessCallback();
    YTX_Meeting.handleRequest();
  };

  YTX_Meeting.cancelScreenShareFail = function(err){
    console.error(YTX_Meeting.getTimeStamp(), "[Meeting] CancelScreenShare Failed, errName:", err.name, ", errMessage:", err.message);
    YTX_Meeting.handleRequest();
  };

  YTX_Meeting.cancelScreenShareSuccess = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] CancelScreenShare Success");
    YTX_Meeting.handleRequest();
  };


  YTX_Meeting.initWebrtc = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Initialization RL_Media:", YTX_Meeting.Version)
    YTX_Webrtc.initPeerconnection();
    YTX_Webrtc.setOnIceconnectionstatechange(YTX_Meeting.onIceconnectionstatechange);
  };

  YTX_Meeting.processCallMessage = function(msgLite){
    let content = msgLite[ParKey.MessageContent];
    if(content){
      let CallEventData = content["CallEventData"];             
      let method = CallEventData[ParKey.Method];
      switch(method){
        case ParMethod.Trying:              
          YTX_Meeting.recv100Trying(content);
          break;
        case ParMethod.Ring:
          YTX_Meeting.recvRing(content);
          break;
        case ParMethod.Refuse:
          YTX_Meeting.recvRefuse(content); 
          break;
        case ParMethod.Answer:
          YTX_Meeting.recv200OK(content);           
          break;
        case ParMethod.Bye:
          YTX_Meeting.recvBye(content);
          break;
        case ParMethod.Invite:
          YTX_Meeting.recvInvite(msgLite);
          break;
        case ParMethod.ACK:
          YTX_Meeting.recvAck(content);
          break;
        case ParMethod.Cancel:
          YTX_Meeting.recvCancel(content);
          break;
        case ParMethod.SubscribeMediaResponse:   
          YTX_Meeting.recvSubscribeMediaResponse(content);
          break;
        case ParMethod.UnSubscribeMediaResponse:
          YTX_Meeting.recvUnSubscribeMediaResponse(content);
          break;
        case ParMethod.PublishMediaResponse:
          YTX_Meeting.recvPublishMediaResponse(content);
          break;
        case ParMethod.UnPublishMediaResponse:
          YTX_Meeting.recvUnPublishMediaResponse(content);
          break;
      } 
    }
    //仅表示服务器接收到了消息
    if(msgLite[3]){}
  };
//////////callback////////////////////////
  YTX_Meeting.setOnPublishMedia = function(callback){
    YTX_Meeting.onPublishMedia = callback;
  };

  YTX_Meeting.setOnUnSubscribeMediaFail = function(callback){
    YTX_Meeting.onUnSubscribeMediaFail = callback;
  };

  YTX_Meeting.setOnUnSubscribeMediaSuccess = function(callback){
    YTX_Meeting.onUnSubscribeMediaSuccess = callback;
  };
  
///////
  YTX_Meeting.setOnTrack = function(callback){
    YTX_Webrtc.setOnTrack(callback);
  };

  YTX_Meeting.getMediaStats = function(onSuccess, onFail){
    YTX_Webrtc.getMediaStats(onSuccess, onFail);
  };

  YTX_Meeting.setVideoWidth = function(width){
    YTX_Webrtc.setVideoWidth(width);
  };

  YTX_Meeting.setVideoHeight = function(height){
    YTX_Webrtc.setVideoHeight(height);
  };

  YTX_Meeting.setVideoFrameRate = function(frameRate){
    YTX_Webrtc.setVideoFrameRate(frameRate);
  };
  YTX_Meeting.setVideoBitrate = function(maxRate, minRate, startRate){
    YTX_Webrtc.setVideoBitrate(maxRate, minRate, startRate);
  }

  YTX_Meeting.closeCamera = function(){
    YTX_Webrtc.closeCamera();
  };

  YTX_Meeting.openCamera = function(){
    YTX_Webrtc.openCamera();
  };

  YTX_Meeting.closeMicrophone = function(){
    YTX_Webrtc.closeMicrophone();
  };

  YTX_Meeting.openMicrophone = function(){
    YTX_Webrtc.openMicrophone();
  };

  YTX_Meeting.onIceconnectionstatechange = function(state){
    if(state == "connected"){
      if(YTX_Meeting.operation == COperation.Calling && YTX_Meeting.mediaType == MType.Video){
        let request = {};
        request.mediaType = "1";
        request.userId = YTX_Meeting.called;
        request.userName = YTX_Meeting.called;
        request.antiSsrc = YTX_Meeting.antiSsrc;
        request.antiEncodeType = YTX_Meeting.antiVideoCodec;
        YTX_Meeting.subscribeMedia(request);
      }
    }
  };
////////
  YTX_Meeting.sendV1Message = function(message, callback, onError){
    if(!message[ParKey.MessageType]){
      let encodeObj = {};
      encodeObj["MsgLite"] = {};
      encodeObj["MsgLite"][ParKey.MessageType] = ParValue.Conference;
      encodeObj["MsgLite"][ParKey.MessageContent] = {};
      encodeObj["MsgLite"][ParKey.MessageContent]["ConferenceMessage"] = {};
      encodeObj["MsgLite"][ParKey.MessageContent]["ConferenceMessage"]["1"] = message.getPath();
      encodeObj["MsgLite"][ParKey.MessageContent]["ConferenceMessage"]["2"] = Base64.encode(JSON.stringify(message.getContent()));
      
      let result = {};
      result.sendMsg = encodeObj;
      YTX_Meeting.transport.send(result, callback, onError)
      return;
    }
    if(message[ParKey.MessageType] == ParValue.Call){
      let encodeObj = {};
      encodeObj["MsgLite"] = message;

      let result = {};
      result.sendMsg = encodeObj;
      result.callId = YTX_Meeting.callId;
      YTX_Meeting.transport.send(result, callback, onError)
      return;
    }
  };

  YTX_Meeting.sendV3Message = function(message, callback, onError){
    //会议消息,没有太好的区分方法，暂时先以消息类型是否存在来区分
    if(!message[ParKey.MessageType]){
      YTX_Meeting.transport.send({
        sendObj: {
            1: message.getPath(),
            2: Base64.encode(JSON.stringify(message.getContent()))
        },
        MsgLiteObj: {
            1: ParValue.Conference
        },
        msgKey: 'ConferenceMessage'
      }, callback, onError);
      return;
    }
    //呼叫消息
    if(message[ParKey.MessageType] == ParValue.Call){
      YTX_Meeting.transport.send({
        sendObj: message[2].CallEventDataInner,
        MsgLiteObj: {
            1: message[1],
            9: message[9]
        },
        msgKey: 'CallEventDataInner',
        clientData: {
            msgId: YTX_Meeting.callId
        },
      }, function (res) {
        console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] Send Message Success:", res);
      }, function(err) {
        console.error(YTX_Meeting.getTimeStamp(), "[Meeting] Send Message Fail:", err);
      });
      return;
    }
  };

  YTX_Meeting.sendMessage = function(message, callback, onError){
    if(!YTX_Meeting.transport.send){
      YTX_Meeting.transport.format = "Format-V3";
      YTX_Meeting.transport.send = ROOT.RL_YTX_NEW.sendMsg;
    }
    //根据format设置不同的传参格式，适配不同的传输层，v1,v3是双方约定的参数格式，没有特殊含义
    if(YTX_Meeting.transport.format == "Format-V1"){
      YTX_Meeting.sendV1Message(message, callback, onError);
    }
    if(YTX_Meeting.transport.format == "Format-V3"){
      YTX_Meeting.sendV3Message(message, callback, onError);
    }
  };
///////////////////////////////////////////////////////////////////////////////
  YTX_Meeting.getTimeStamp = function () {
    let now = new Date();
    let timestamp = "[";
    timestamp += now.getFullYear();
    timestamp += (now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1);
    timestamp += now.getDate() >= 10 ? now.getDate() : "0" + now.getDate();
    timestamp += " ";
    timestamp += now.getHours() >= 10 ? now.getHours() : "0" + now.getHours();
    timestamp += ":";
    timestamp += now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes();
    timestamp += ":";
    timestamp += now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds();
    timestamp += ".";
    timestamp += now.getMilliseconds();
    timestamp += "]";
    return timestamp;
  }
  //h264@102@102
  YTX_Meeting.parseVideoCodec = function(recvSdp){
    //let payloadType = recvSdp.split("m=video")[1].split(" ")[3].split("\r\n")[0];
    //let codec = recvSdp.split("a=rtpmap:" + payloadType + " ")[1].split("/")[0];
    //return codec + "@" + payloadType + "@" + payloadType;
    let codec = "";
    let payloadType = -1;    
    let lines = recvSdp.split('\r\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if(line.indexOf("m=video") >= 0){
        payloadType = line.split(" ")[3];
      }
      if(line.indexOf("a=rtpmap:" + payloadType) >= 0){
        codec = line.split(" ")[1].split("/")[0];
      }
    }
    return codec + "@" + payloadType + "@" + payloadType;
  };

  YTX_Meeting.parseRecvSdp = function(recvSdp){
    let resultSdp = "";
    let cursor = "";
    let lines = recvSdp.split('\r\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i] + "\r\n";
      if(line.indexOf("m=audio") >= 0){
        cursor = "audio";
      }
      if(line.indexOf("m=video") >= 0){
        cursor = "video";
      }
      if(line.indexOf("self=1")>= 0){
        if(cursor == "audio"){
          YTX_Meeting.selfSsrc = line.split(":")[1].split(" ")[0];
        }
        continue;
      }
      if(line.indexOf("partner=1") >= 0){
        if(cursor == "audio"){
          YTX_Meeting.antiSsrc = line.split(":")[1].split(" ")[0];
        }
        continue;
      }
      if(line.length > 2){
        resultSdp += line;
      }
    }
    return resultSdp;
  };

  YTX_Meeting.checkCallId = function(content){
    let callEventData = content["CallEventData"];     
    let callId = callEventData[ParKey.CallId];
    if(callId != YTX_Meeting.callId){
      console.warn(YTX_Meeting.getTimeStamp(), "[Meeting] Message callid err");
      return false;
    }
    return true;
  };

  YTX_Meeting.sdpDisableVideo = function(sdp){
    let resultSdp = "";
    let lines = sdp.split('\r\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i] + "\r\n";
      if(line.indexOf("m=video") >= 0){
        let port = line.split(" ")[1];
        line = line.replace("m=video " + port, "m=video 0");
      }
      if(line.length > 2){
        resultSdp += line;
      }
    }
    return resultSdp;
  };

  YTX_Meeting.sdpGetAudioPort = function(sdp){
    let port = 0;
    let lines = sdp.split('\r\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i] + "\r\n";
      if(line.indexOf("m=audio") >= 0){
        port = line.split(" ")[1];
      }
    }
    return port;
  };

  YTX_Meeting.sdpGetVideoPort = function(sdp){
    let port = 0;
    let lines = sdp.split('\r\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i] + "\r\n";
      if(line.indexOf("m=video") >= 0){
        port = line.split(" ")[1];
      }
    }
    return port;
  };
////////////////callout///////////////////// 
  YTX_Meeting.setUserData = function(userData){
    YTX_Meeting.userData = userData;
  };

  YTX_Meeting.makeCall = function(parameter, onSuccess, onFail){
    if(YTX_Meeting.connState != CState.Disconnected)
    {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] MakeCall Fail, ConnState:", YTX_Meeting.connState);
      return;
    }
    YTX_Meeting.initWebrtc();
    YTX_Meeting.connState = CState.Connecting;
    YTX_Meeting.makeCallFailCallback = onFail;
    YTX_Meeting.makeCallSuccessCallback = onSuccess;
    if(!parameter.caller || !parameter.called){
      let err = {};
      err.name = "MakeCall fail";
      err.message = "parameter error";
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] MakeCall parameter err, caller:", parameter.caller, ", called:", parameter.called);
      YTX_Meeting.makeCallFail(err);
      return;
    }

    let randomNum = "";
    let timeStamp = new Date().getTime();
    for (var i = 0; i < 6; i++) {
      randomNum += Math.floor(Math.random() * 10);
    }
    YTX_Meeting.callId = timeStamp + randomNum;
    YTX_Meeting.caller = parameter.caller;
    YTX_Meeting.called = parameter.called;
    YTX_Meeting.mediaType = parameter.mediaType;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] MakeCall, caller:", parameter.caller, ", called:", parameter.called, ", mediaType:", parameter.mediaType);
    YTX_Webrtc.publishUserMedia(parameter, publishMediaSuccess, publishMediaFail);

    function publishMediaSuccess(stream){
      if(YTX_Meeting.onPublishMedia){
        YTX_Meeting.onPublishMedia(stream, YTX_Meeting.mediaType);
      }
      YTX_Webrtc.buildOffer(YTX_Meeting.sendInvite, YTX_Meeting.makeCallFail);
    }

    function publishMediaFail(err){
      if(YTX_Meeting.mediaType == MType.Audio){
        err.statusCode = CStatusCode.NoDevice;
        YTX_Meeting.makeCallFail(err);
        return;
      }
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] Open Camera Failed, Change to Audio Mode, errName:", err.name, ", errMessage:", err.message);
      YTX_Meeting.mediaType = MType.Audio;
      parameter.mediaType = MType.Audio;
      YTX_Webrtc.publishUserMedia(
        parameter, 
        publishMediaSuccess, 
        function(err){
          err.statusCode = CStatusCode.NoDevice;
          YTX_Meeting.makeCallFail(err);
        });
    }
  };
/////////////////////////////////////////////////
  //目前只支持音视频切换到音频
  YTX_Meeting.updateCall = function(parameter, onSuccess, onFail){
    if(YTX_Meeting.connState != CState.Connected){
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] updateCall Call status err, connState:", YTX_Meeting.connState);
      return;
    }
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] updateCall Call, MediaType:", parameter.mediaType);
    if(parameter.mediaType == YTX_Meeting.mediaType){
      onSuccess();
      return;
    }
    if(parameter.mediaType == MType.Audio){
      YTX_Meeting.connState = CState.Updating;
      YTX_Meeting.updateCallFailCallback = onFail;
      YTX_Meeting.updateCallSuccessCallback = onSuccess;
      let sdp = YTX_Meeting.sdpDisableVideo(YTX_Webrtc._peerConnection.localDescription.sdp);
      YTX_Meeting.sendInvite(sdp);
      return;
    }
  };
//////////////////////////////////////
  YTX_Meeting.sendInvite = function(sdp) {  
    let clientNo = YTX_Meeting.clientNo++;
    let invite = new YTX_Protobuf.callMessage();
    invite.setMethod(ParMethod.Invite);
    invite.setIsvoipCall(1);
    invite.setCallId(YTX_Meeting.callId);
    invite.setCalled(YTX_Meeting.called);
    invite.setCaller(YTX_Meeting.caller);
    invite.setUserData(YTX_Meeting.userData);
    invite.setSdp(sdp);
    invite.setSeq(clientNo.toString());
    invite.setClientNo(clientNo);
    invite.setCallrouteId(YTX_Meeting.callRouteId);      

    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send Invite, caller:", YTX_Meeting.caller, ", called:", YTX_Meeting.called, 
        ", callid:", YTX_Meeting.callId, ", clientNo:", clientNo);
    YTX_Meeting.sendMessage(invite);

    if(YTX_Meeting.connState == CState.Connecting){
      YTX_Meeting.makeCallTimerId = setTimeout(function () {
        YTX_Meeting.makeCallNoAnswer();
      }, 35*1000);
      return;
    }
    if(YTX_Meeting.connState == CState.Updating){
      YTX_Meeting.updateCallTimerId = setTimeout(function () {
        let err = {};
        err.name = "UpdateCall fail";
        err.message = "No Answer";
        YTX_Meeting.updateCallFail(err);
      }, 10*1000);
      return;
    }
  };

  YTX_Meeting.recvRefuse = function(content){
    if(!YTX_Meeting.checkCallId(content)){
      return;
    }
    if(YTX_Meeting.connState == CState.Connecting || YTX_Meeting.connState == CState.Alerting){
      let callEventData = content["CallEventData"]; 
      let cause = callEventData[ParKey.Cause];
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Refuse, cause:", cause);
      YTX_Meeting.sendAck();

      let err = {};
      err.name = "MakeCall fail";
      err.message = "Server Refuse, Cause:" + cause;
      err.reason = "175" + cause;
      YTX_Meeting.makeCallFail(err);
      return;
    }
    if(YTX_Meeting.connState == CState.Updating){
      let callEventData = content["CallEventData"]; 
      let cause = callEventData[ParKey.Cause];
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Refuse, cause:", cause);
      YTX_Meeting.sendAck();

      let err = {};
      err.name = "Update fail";
      err.message = "Server Refuse, Cause:" + cause;
      err.reason = "175" + cause;
      YTX_Meeting.updateCallFail(err);
      return;
    }
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Refuse, currstate:", YTX_Meeting.connState);
  };

  YTX_Meeting.recv100Trying = function(content){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv100Trying");
  };

  YTX_Meeting.recvRing = function(content){
    if(!YTX_Meeting.checkCallId(content)){
      return;
    }
    if(YTX_Meeting.connState == CState.Connecting){
      let callEventData = content["CallEventData"];     
      YTX_Meeting.userData = callEventData[ParKey.UserData];
      YTX_Meeting.connState = CState.Alerting;
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Ring, userData:", YTX_Meeting.userData);
  
      //上报振铃事件
      let event = {};
      event.state = 1;
      event.msg = "Alerting";
      event.callId = YTX_Meeting.callId;
      event.caller = YTX_Meeting.caller;
      event.called = YTX_Meeting.called;
      event.userdata = YTX_Meeting.userData;
      event.mediaType = YTX_Meeting.mediaType;
      YTX_Meeting.eventListener(event);
      return;
    }
    if(YTX_Meeting.connState == CState.Updating){
      //nothing
      return;
    }
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Ring, has Alerting, currstate:", YTX_Meeting.connState);
  };

  YTX_Meeting.recv200OK = function(content){
    if(!YTX_Meeting.checkCallId(content)){
      return;
    }
    if(YTX_Meeting.connState == CState.Connecting || YTX_Meeting.connState == CState.Alerting){
      YTX_Meeting.handleAnswer200(content);
      return;
    }
    if(YTX_Meeting.connState == CState.Updating){
      YTX_Meeting.handleUpdate200(content);
      return;
    }
    if(YTX_Meeting.connState == CState.Disconnecting){
      YTX_Meeting.handleBye200(content);
      return;
    }
    console.warn(YTX_Meeting.getTimeStamp(), "[Meeting] Recv 200OK,but ConnState err:", YTX_Meeting.connState);
  };

  YTX_Meeting.handleAnswer200 = function(content){

    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Answer 200OK");
    clearTimeout(YTX_Meeting.makeCallTimerId);
    YTX_Meeting.connState = CState.Connected;    

    let callEventData = content["CallEventData"];
    let userData = callEventData[ParKey.UserData];
    //解析selfssrc，antissrc，删除self=1，partner=1，需要新版callroute支持
    YTX_Meeting.userData = userData;
    YTX_Meeting.recvAnswerSdp = YTX_Meeting.parseRecvSdp(content["CallEventData"][ParKey.Sdp]);
    YTX_Meeting.antiVideoCodec = YTX_Meeting.parseVideoCodec(YTX_Meeting.recvAnswerSdp);
    //兼容旧版本callroute
    if(!YTX_Meeting.selfSsrc){
      YTX_Meeting.selfSsrc = YTX_Meeting.recvAnswerSdp.split("m=audio")[1].split("a=ssrc:")[1].split(" ")[0];
    }
    console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] Parse selfssrc:", YTX_Meeting.selfSsrc, ", antiSsrc:", YTX_Meeting.antiSsrc, ", antiVideoCodec:", YTX_Meeting.antiVideoCodec);

    let videoPort = YTX_Meeting.sdpGetVideoPort(YTX_Meeting.recvAnswerSdp);
    if(videoPort == 0 && YTX_Meeting.mediaType == MType.Video){
      YTX_Meeting.mediaType = MType.Audio;
      YTX_Webrtc.closeVideo();
    }

    YTX_Meeting.sendAck();
    YTX_Webrtc.handleAnswer(YTX_Meeting.recvAnswerSdp, YTX_Meeting.makeCallSuccess, YTX_Meeting.makeCallFail);
    //上报应答事件
    let event = {};
    event.state = 3;
    event.msg = "Answered";
    event.callId = YTX_Meeting.callId;
    event.caller = YTX_Meeting.caller;
    event.called = YTX_Meeting.called;
    event.userData = YTX_Meeting.userData;
    event.mediaType = YTX_Meeting.mediaType;
    YTX_Meeting.eventListener(event);
  };

  YTX_Meeting.handleUpdate200 = function(content){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Update 200OK");
    clearTimeout(YTX_Meeting.updateCallTimerId);
    YTX_Meeting.connState = CState.Connected;
    YTX_Meeting.mediaType = MType.Audio;
    YTX_Meeting.sendAck();
    YTX_Webrtc.closeVideo();
    YTX_Meeting.updateCallSuccess();
  };

  YTX_Meeting.handleBye200 = function(content){    
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Bye/Cancel 200OK");
    YTX_Meeting.releaseCallSuccess();
  };
  
  YTX_Meeting.sendAck = function(){
    var clientNo = YTX_Meeting.clientNo++;
    var ack = new YTX_Protobuf.callMessage();
    ack.setMethod(ParMethod.ACK);
    ack.setCallId(YTX_Meeting.callId);
    //根据之前的规则，反向设置
    ack.setCalled(YTX_Meeting.caller);
    ack.setCaller(YTX_Meeting.called);
    ack.setCause("0");
    ack.setUserData(YTX_Meeting.userData);
    ack.setSeq(clientNo.toString());
    ack.setClientNo(clientNo);
    ack.setCallrouteId(YTX_Meeting.callRouteId); 

    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send ACK");
    YTX_Meeting.sendMessage(ack);
    
  };

  YTX_Meeting.recvBye = function(content){
    //会调用reset函数，无需处理重复消息
    if(!YTX_Meeting.checkCallId(content)){
      return;
    }
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Bye");

    let event = {};
    event.state = 5;
    event.msg = "Release";
    event.callId = YTX_Meeting.callId;
    event.caller = YTX_Meeting.caller;
    event.called = YTX_Meeting.called;
    YTX_Meeting.eventListener(event);
    YTX_Meeting.reset();
  };

  YTX_Meeting.releaseCall = function(onSuccess, onFail){
    YTX_Meeting.releaseCallFailCallback = onFail;
    YTX_Meeting.releaseCallSuccessCallback = onSuccess;

    if(YTX_Meeting.connState == CState.Connecting || YTX_Meeting.connState == CState.Alerting){
      YTX_Meeting.sendCancel();
      return;
    }
    if(YTX_Meeting.connState == CState.Connected){
      YTX_Meeting.sendBye();
      return;
    }
    YTX_Meeting.releaseCallSuccess();
  };

  YTX_Meeting.sendCancel = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send Cancel");
    YTX_Meeting.connState = CState.Disconnecting;

    let clientNo = YTX_Meeting.clientNo++;
    let callMessage = new YTX_Protobuf.callMessage();
    callMessage.setMethod(ParMethod.Cancel);
    callMessage.setCallId(YTX_Meeting.callId);
    callMessage.setCaller(YTX_Meeting.caller);
    callMessage.setCalled(YTX_Meeting.called);
    callMessage.setCause("0");
    callMessage.setUserData(YTX_Meeting.userData);
    callMessage.setSeq(clientNo.toString());
    callMessage.setClientNo(clientNo);
    callMessage.setCallrouteId(YTX_Meeting.callRouteId);
    YTX_Meeting.sendMessage(callMessage);

    YTX_Meeting.releaseCallTimerId = setTimeout(function () {
      let err = {};
      err.name = "ReleaseCall fail";
      err.message = "Server Timerout";
      YTX_Meeting.releaseCallFail(err);
    }, 5*1000);
  };

  YTX_Meeting.sendBye = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send bye");
    YTX_Meeting.connState = CState.Disconnecting;

    let clientNo = YTX_Meeting.clientNo++;
    let callMessage = new YTX_Protobuf.callMessage();
    callMessage.setMethod(ParMethod.Bye);
    callMessage.setCallId(YTX_Meeting.callId);
    callMessage.setCaller(YTX_Meeting.caller);
    callMessage.setCalled(YTX_Meeting.called);
    callMessage.setCause("0");
    callMessage.setUserData(YTX_Meeting.userData);
    callMessage.setSeq(clientNo.toString());
    callMessage.setClientNo(clientNo);
    callMessage.setCallrouteId(YTX_Meeting.callRouteId);
    YTX_Meeting.sendMessage(callMessage);

    YTX_Meeting.releaseCallTimerId = setTimeout(function () {
      let err = {};
      err.name = "ReleaseCall fail";
      err.message = "Server Timerout";
      YTX_Meeting.releaseCallFail(err);
    }, 5*1000);
  };
//////////////////
  YTX_Meeting.makeCallSuccess = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] MakeCall Success");
    YTX_Meeting.makeCallSuccessCallback();

    //兼容容信版本
    let obj = {};
    obj["state"] = 16;
    obj["code"] = 200;
    obj["msg"] = "Meeting connction has established;";
    YTX_Meeting.confEventListener(obj);
  };

  YTX_Meeting.makeCallNoAnswer = function(){
    let err = {};
    err.name = "MakeCall fail";
    err.message = "No Answer";
    console.error(YTX_Meeting.getTimeStamp(), "[Meeting] MakeCall No Answer");
    YTX_Meeting.releaseCall();
    YTX_Meeting.makeCallFailCallback(err);
  };

  YTX_Meeting.makeCallFail = function(err){
    console.error(YTX_Meeting.getTimeStamp(), "[Meeting] MakeCall Fail, errName:", err.name, ", errMessage:", err.message);
    YTX_Meeting.reset();
    YTX_Meeting.makeCallFailCallback(err);
  };
/////////////////////////////////////////////////
  YTX_Meeting.updateCallSuccess = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] UpdateCall Success");
    YTX_Meeting.updateCallSuccessCallback();
  }

  YTX_Meeting.updateCallFail = function(err){
    console.error(YTX_Meeting.getTimeStamp(), "[Meeting] UpdateCall Fail, errName:", err.name, ", errMessage:", err.message);
    YTX_Meeting.updateCallFailCallback(err);
  };
/////////////////////////////////////////////////
  YTX_Meeting.releaseCallSuccess = function(){
    YTX_Meeting.reset();
    if(YTX_Meeting.releaseCallSuccessCallback){
      YTX_Meeting.releaseCallSuccessCallback();
    }
  };

  YTX_Meeting.releaseCallFail = function(err){
    YTX_Meeting.reset();
    if(YTX_Meeting.releaseCallFailCallback){
      YTX_Meeting.releaseCallFailCallback(err);
    }
  };
///////////////////////callin/////////////////////
  YTX_Meeting.recvReInvite = function(msgLite){
    let content = msgLite[ParKey.MessageContent];
    let callEventData = content["CallEventData"];
    let recvSdp = callEventData[ParKey.Sdp];
    let audioPort = YTX_Meeting.sdpGetAudioPort(recvSdp);
    let videoPort = YTX_Meeting.sdpGetVideoPort(recvSdp);
   
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv ReInvite, AudioPort:", audioPort, ", VideoPort:", videoPort);
    
    if(YTX_Meeting.mediaType == MType.Video && videoPort == 0){
      let sdp = YTX_Meeting.sdpDisableVideo(YTX_Webrtc._peerConnection.localDescription.sdp);
      YTX_Meeting.mediaType = MType.Audio;
      YTX_Meeting.send200OK(sdp);
      YTX_Webrtc.closeVideo();

      let event = {};
      event.state = 8;
      event.msg = "MediaUpdate";
      event.caller = YTX_Meeting.caller;
      event.called = YTX_Meeting.called;
      event.mediaType = YTX_Meeting.mediaType;
      YTX_Meeting.eventListener(event);
      return;
    }
    YTX_Meeting.send200OK();
  };

  YTX_Meeting.recvInvite = function(msgLite){
    let content = msgLite[ParKey.MessageContent];
    let callRouteId = msgLite[ParKey.CallRouteId];
    let callEventData = content["CallEventData"];
    let callId = callEventData[ParKey.CallId];
    let caller = callEventData[ParKey.Caller];
    let called = callEventData[ParKey.Called];
    let userData = callEventData[ParKey.UserData];
    let sdp = callEventData[ParKey.Sdp];
    if(YTX_Meeting.connState != CState.Disconnected){
      //可能是重复消息，也可能是新的呼叫      
      if(callId == YTX_Meeting.callId){
        if(YTX_Meeting.connState == CState.Connected){
          YTX_Meeting.recvReInvite(msgLite);
          return;
        }
        console.warn(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Repeat Invite");
        return;
      }
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Invite User Busy");
      let parameter = {};
      parameter.code = "486";
      parameter.callId = callId;
      parameter.caller = caller;
      parameter.called = called;
      parameter.callRouteId = callRouteId;
      YTX_Meeting.sendUserBusy(parameter);
      //上报未接来电事件
      let event = {};
      event.state = 7;
      event.msg = "Missed Call";
      event.caller = parameter.caller;
      event.called = parameter.called;
      YTX_Meeting.eventListener(event);
      return;
    }
    YTX_Meeting.connState = CState.Connecting;
    YTX_Meeting.callRouteId = callRouteId;
    YTX_Meeting.callId = callId;
    YTX_Meeting.caller = caller;
    YTX_Meeting.called = called;
    YTX_Meeting.userData = userData;
    YTX_Meeting.recvInviteSdp = YTX_Meeting.parseRecvSdp(sdp);//解析selfssrc，antissrc
    YTX_Meeting.recvInviteSdp = YTX_Meeting.recvInviteSdp.replace("a=setup:active", "a=setup:actpass");//临时解决方案
    YTX_Meeting.recvInviteSdp = YTX_Meeting.recvInviteSdp.replace("a=setup:active", "a=setup:actpass");
    if(YTX_Meeting.recvInviteSdp.indexOf("m=video") > 0){
      YTX_Meeting.mediaType = MType.Video;
    }
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Invite, caller:", YTX_Meeting.caller, 
            ", called:", YTX_Meeting.called, ", mediaType:", YTX_Meeting.mediaType, ", callRouteId:", YTX_Meeting.callRouteId);
    console.debug("[Meeting] sdp:", YTX_Meeting.recvInviteSdp);
    YTX_Meeting.sendRing180();

    //上报呼叫事件
    let event = {};
    event.state = 6;
    event.msg = "Invite";
    event.callId = YTX_Meeting.callId;
    event.caller = YTX_Meeting.caller;
    event.called = YTX_Meeting.called;
    event.userData = YTX_Meeting.userData;
    event.callType = YTX_Meeting.mediaType; //兼容容信
    event.mediaType = YTX_Meeting.mediaType;
    YTX_Meeting.eventListener(event);
  };

  YTX_Meeting.sendUserBusy = function(parameter){
    let clientNo = YTX_Meeting.clientNo++;
    let message = new YTX_Protobuf.callMessage();
    message.setMethod(ParMethod.Refuse);
    message.setCallId(parameter.callId);
    message.setCaller(parameter.caller);
    message.setCalled(parameter.called);
    message.setCause(parameter.code);
    message.setSeq(clientNo.toString());
    message.setClientNo(clientNo);
    message.setCallrouteId(parameter.callRouteId);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send UserBusy, code:", parameter.code);
    YTX_Meeting.sendMessage(message);
  };

  YTX_Meeting.sendRing180 = function(){
    let clientNo = YTX_Meeting.clientNo++;
    let ring = new YTX_Protobuf.callMessage();
    ring.setMethod(ParMethod.Ring);
    ring.setCallId(YTX_Meeting.callId);
    ring.setCaller(YTX_Meeting.caller);
    ring.setCalled(YTX_Meeting.called);
    ring.setCause("0");
    ring.setSeq(clientNo.toString());
    ring.setClientNo(clientNo);
    ring.setCallrouteId(YTX_Meeting.callRouteId);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send 180 ring");
    YTX_Meeting.sendMessage(ring);   
  };

  YTX_Meeting.recvCancel = function(content){
    if(!YTX_Meeting.checkCallId(content)){
      return;
    }
    let callEventData = content["CallEventData"]; 
    let cause = callEventData[ParKey.Cause];
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Cancel, cause:", cause);
    YTX_Meeting.send200OK();

    let event = {};
    event.state = 5;
    event.msg = "Release";
    event.reason = "175" + cause;
    event.callId = YTX_Meeting.callId;
    event.caller = YTX_Meeting.caller;
    event.called = YTX_Meeting.called;
    YTX_Meeting.eventListener(event);
    YTX_Meeting.reset();
  };
  
  YTX_Meeting.send200OK = function(sdp){
    let clientNo = YTX_Meeting.clientNo++;
    let answer = new YTX_Protobuf.callMessage();
    answer.setMethod(ParMethod.Answer);
    answer.setCallId(YTX_Meeting.callId);
    answer.setCaller(YTX_Meeting.caller);
    answer.setCalled(YTX_Meeting.called);
    if(sdp){
      answer.setSdp(sdp);
    }
    answer.setCause("0");
    answer.setUserData(YTX_Meeting.userData);
    answer.setSeq(clientNo.toString());
    answer.setClientNo(clientNo);
    answer.setCallrouteId(YTX_Meeting.callRouteId);
    
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send 200ok");
    YTX_Meeting.sendMessage(answer);
  };

  YTX_Meeting.rejectCall = function(onSuccess, rejectFail){
    let parameter = {};
    parameter.code = "603";
    YTX_Meeting.sendRefuse(parameter);
    onSuccess();
  }

  YTX_Meeting.sendRefuse = function(parameter){
    let clientNo = YTX_Meeting.clientNo++;
    let refuse = new YTX_Protobuf.callMessage();
    refuse.setMethod(ParMethod.Refuse);
    refuse.setCallId(YTX_Meeting.callId);
    refuse.setCaller(YTX_Meeting.caller);
    refuse.setCalled(YTX_Meeting.called);
    refuse.setCause(parameter.code);
    refuse.setSeq(clientNo.toString());
    refuse.setClientNo(clientNo);
    refuse.setCallrouteId(YTX_Meeting.callRouteId);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send Refuse, code:", parameter.code);
    YTX_Meeting.sendMessage(refuse);   
    YTX_Meeting.reset();
  };

  YTX_Meeting.recvAck = function(content){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv Ack");
  }

  YTX_Meeting.acceptCall = function(onSuccess, onFail){    
    if(YTX_Meeting.connState != CState.Connecting){
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] Accept Call status err, connState:", YTX_Meeting.connState);
      return;
    }
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Accept Call");
    YTX_Meeting.initWebrtc();
    YTX_Meeting.connState = CState.Connected;
    YTX_Meeting.direction = CDirection.CallIn;
    YTX_Meeting.acceptCallFailCallback = onFail;
    YTX_Meeting.acceptCallSuccessCallback = onSuccess;

    let parameter = {};
    parameter.mediaType = YTX_Meeting.mediaType;
    YTX_Webrtc.publishUserMedia(parameter, publishSuccess, YTX_Meeting.acceptCallFail);
    
    function publishSuccess(stream){
      if(YTX_Meeting.onPublishMedia){
        YTX_Meeting.onPublishMedia(stream);
      }
      YTX_Webrtc.buildAnswer(YTX_Meeting.recvInviteSdp, YTX_Meeting.sendAnswer, YTX_Meeting.acceptCallFail);
    };
  };

  YTX_Meeting.acceptCallEx = function(parameter, onSuccess, onFail){
    if(YTX_Meeting.connState != CState.Connecting){
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] acceptCallEx Call status err, connState:", YTX_Meeting.connState);
      return;
    }
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] acceptCallEx Call, MediaType:", parameter.mediaType);
    YTX_Meeting.initWebrtc();
    YTX_Meeting.connState = CState.Connected;
    YTX_Meeting.direction = CDirection.CallIn;
    YTX_Meeting.acceptCallFailCallback = onFail;
    YTX_Meeting.acceptCallSuccessCallback = onSuccess;

    if(typeof(parameter.mediaType) == "undefined"){
      parameter.mediaType = YTX_Meeting.mediaType;
      YTX_Webrtc.publishUserMedia(parameter, publishSuccess, YTX_Meeting.acceptCallFail);
      return;
    }
    //视频切换为音频
    if(parameter.mediaType == MType.Audio){
      if(YTX_Meeting.mediaType == MType.Video){
        YTX_Meeting.mediaType = parameter.mediaType;
        YTX_Meeting.recvInviteSdp = YTX_Meeting.sdpDisableVideo(YTX_Meeting.recvInviteSdp);
      }
    }
    YTX_Webrtc.publishUserMedia(parameter, publishSuccess, YTX_Meeting.acceptCallFail);
    
    function publishSuccess(stream){
      if(YTX_Meeting.onPublishMedia){
        YTX_Meeting.onPublishMedia(stream);
      }
      YTX_Webrtc.buildAnswer(YTX_Meeting.recvInviteSdp, YTX_Meeting.sendAnswer, YTX_Meeting.acceptCallFail);
    };
  };

  YTX_Meeting.sendAnswer = function(sdp){
    YTX_Meeting.antiVideoCodec = YTX_Meeting.parseVideoCodec(sdp);

    let clientNo = YTX_Meeting.clientNo++;
    let answer = new YTX_Protobuf.callMessage();
    answer.setMethod(ParMethod.Answer);
    answer.setCallId(YTX_Meeting.callId);
    answer.setCaller(YTX_Meeting.caller);
    answer.setCalled(YTX_Meeting.called);
    answer.setCause("0");
    answer.setUserData(YTX_Meeting.userData);
    answer.setSdp(sdp);
    answer.setSeq(clientNo.toString());
    answer.setClientNo(clientNo);
    answer.setCallrouteId(YTX_Meeting.callRouteId);
    
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send Answer, parsevideocodec:", YTX_Meeting.antiVideoCodec);
    YTX_Meeting.sendMessage(answer);
    YTX_Meeting.acceptCallSuccess();

    //兼容容信旧版本
    let event = {};
    event.state = 3;
    event.msg = "Answered";
    event.callId = YTX_Meeting.callId;
    event.caller = YTX_Meeting.caller;
    event.called = YTX_Meeting.called;
    event.mediaType = YTX_Meeting.mediaType;
    YTX_Meeting.eventListener(event);
  };
////////////////////////////////////
  YTX_Meeting.acceptCallSuccess = function(){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] AcceptCall Success");
    YTX_Meeting.acceptCallSuccessCallback();
  };

  YTX_Meeting.acceptCallFail = function(err){
    console.error(YTX_Meeting.getTimeStamp(), "[Meeting] AcceptCall Fail, errName:", err.name, ", errMessage:", err.message);
    let parameter = {};
    parameter.code = "480";
    YTX_Meeting.sendRefuse(parameter);
    //YTX_Meeting.reset();
    YTX_Meeting.acceptCallFailCallback(err);
  };
//////////////////////
  YTX_Meeting.subscribeMedia = function(request){    
    let antissrc = request.antiSsrc;
    let antiEncodeType = request.antiEncodeType;
    let mediaType = request.mediaType;
    let userId = request.userId;
    let userName = request.userName;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send SubscribeMediaRequest, userName:", userName, ", userId", userId, 
        ", selfssrc:", YTX_Meeting.selfSsrc, ", antissrc:", antissrc, ", antiEncodeType:", antiEncodeType, ", mediaType:", mediaType);

    if(!antissrc || !antiEncodeType || !mediaType || !userId || !userName){
      let err = {};
      err.name = "SubscribeMedia Fail";
      err.message = "parameter err";
      YTX_Meeting.subscribeMediaFail(request, err);
      return;
    }
    let customData = {};
    let clientNo = YTX_Meeting.clientNo++;
    let subMesssage = new YTX_Protobuf.callMessage();
    customData.confId = YTX_Meeting.confId;
    customData.antissrc = antissrc;
    customData.resolution = "5";
    customData.mediaType = mediaType;
    customData.antiEncodeType = antiEncodeType;
    customData.selfssrc = YTX_Meeting.selfSsrc;
    customData.mediaSdp = Base64.encode(YTX_Webrtc._peerConnection.localDescription.sdp);
    subMesssage.setMethod(ParMethod.SubscribeMediaRequest);
    subMesssage.setCallId(YTX_Meeting.callId);
    subMesssage.setCaller(YTX_Meeting.caller);
    subMesssage.setCalled(YTX_Meeting.called);
    subMesssage.setCustomData(JSON.stringify(customData));
    subMesssage.setSeq(clientNo.toString());
    subMesssage.setClientNo(clientNo);
    subMesssage.setCallrouteId(YTX_Meeting.callRouteId);
    YTX_Meeting.sendMessage(subMesssage);

    request.clientNo = clientNo;
    request.timerId = setTimeout(function () {
      let err = {};
      err.userId = userId;
      err.userName = userName;
      err.name = "SubscribeMedia Fail";
      err.message = "Timerout";

      clearTimeout(request.timerId);
      YTX_Meeting.requestMap.delete(request.clientNo);
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] TimerOut ClearTimerId:", request.timerId, ", Delete ClientNo:", request.clientNo);
      YTX_Meeting.subscribeMediaFail(request, err);
    }, 5*1000);
    YTX_Meeting.requestMap.set(clientNo, request);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] SetTimerId:", request.timerId, ", Insert ClientNo:", request.clientNo);
  };

  YTX_Meeting.recvSubscribeMediaResponse = function(content){
    let callEventData = content["CallEventData"];
    let customData = JSON.parse(callEventData[ParKey.CustomData]);
    let status = customData.status;
    let recvSdp = Base64.decode(customData.mediaSdp);
    let clientNo = Number(callEventData[ParKey.Seq]);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv SubscribeMediaResponse");

    if(!YTX_Meeting.requestMap.has(clientNo)){
      console.warn(YTX_Meeting.getTimeStamp(), "[Meeting] handleSubscribeMediaResponse clientNo not exsit:", clientNo);
      return;
    };
    let request = YTX_Meeting.requestMap.get(clientNo);
    clearTimeout(request.timerId);
    YTX_Meeting.requestMap.delete(request.clientNo);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] ClearTimerId:", request.timerId, ", Delete ClientNo:", request.clientNo);

    if(status != "200"){
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] Recv SubscribeMediaResponse fail status:", status);
      let err = {};
      err.name = "SubscribeMedia Fail";
      err.message = "Server Error, Status:", status;
      YTX_Meeting.subscribeMediaFail(request, err);
      return;
    }

    let parameter = {};
    parameter.userName = request.userName;
    parameter.userId = request.userId;
    parameter.mediaType = request.mediaType;
    parameter.sdp = recvSdp;
    if(YTX_Meeting.direction == CDirection.CallOut){
      YTX_Webrtc.addUserForCallOut(parameter, function(){
        YTX_Meeting.subscribeMediaSuccess(request);
      }, function(err){
        YTX_Meeting.subscribeMediaFail(request, err);
      });
    }else{
      YTX_Webrtc.addUserForCallIn(parameter, function(){
        YTX_Meeting.subscribeMediaSuccess(request);
      }, function(err){
        YTX_Meeting.subscribeMediaFail(request, err);
      });
    }
  };

  YTX_Meeting.unSubscribeMedia = function(request){
    let antissrc = request.antiSsrc;
    let mediaType = request.mediaType;
    let userId = request.memberId;
    let userName = request.userName;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send UnSubscribeMediaRequest, userName:", userName, ", userId:", userId, ", mediaType:", mediaType);
    if(!antissrc || !mediaType || !userId || !userName){
      let err = {};
      err.name = "UnSubscribeMedia Fail";
      err.message = "parameter err";
      YTX_Meeting.unSubscribeMediaFail(request, err);
      return;
    }
    let customData = {};
    let clientNo = YTX_Meeting.clientNo++;
    let unSubMessage = new YTX_Protobuf.callMessage();
    customData.confId = YTX_Meeting.confId;
    customData.antissrc = antissrc;
    customData.mediaType = mediaType;
    customData.selfssrc = YTX_Meeting.selfSsrc;
    unSubMessage.setMethod(ParMethod.UnSubscribeMediaRequest);
    unSubMessage.setCallId(YTX_Meeting.callId);
    unSubMessage.setCalled(YTX_Meeting.called);
    unSubMessage.setCaller(YTX_Meeting.caller);
    unSubMessage.setCustomData(JSON.stringify(customData));
    unSubMessage.setSeq(clientNo.toString());
    unSubMessage.setClientNo(clientNo);
    unSubMessage.setCallrouteId(YTX_Meeting.callRouteId);
    YTX_Meeting.sendMessage(unSubMessage);

    request.clientNo = clientNo;
    request.timerId = setTimeout(function () {
      let err = {};
      err.name = "UnSubscribeMedia Fail";
      err.message = "Server Timerout";

      clearTimeout(request.timerId);
      YTX_Meeting.requestMap.delete(request.clientNo);
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] ClearTimerId:", request.timerId, ", Delete ClientNo:", request.clientNo);
      
      YTX_Meeting.unSubscribeMediaFail(request, err);
    }, 5*1000);
    YTX_Meeting.requestMap.set(clientNo, request);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] SetTimerId:", request.timerId, ", Insert ClientNo:", request.clientNo);
  };

  YTX_Meeting.recvUnSubscribeMediaResponse = function(content){
    var callEventData = content["CallEventData"];
    var clientNo = Number(callEventData[ParKey.Seq]);
    var customData = JSON.parse(callEventData[ParKey.CustomData]);
    var status = customData.status;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv UnSubscribeMediaResponse Success status:", status);

    if(!YTX_Meeting.requestMap.has(clientNo)){
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] HandleRecvUnSubscribeMediaResponse clientNo not exsit:", clientNo);
      return;
    };
    let request = YTX_Meeting.requestMap.get(clientNo);
    clearTimeout(request.timerId);
    YTX_Meeting.requestMap.delete(request.clientNo);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] ClearTimerId:", request.timerId, ", Delete ClientNo:", request.clientNo);

    let parameter = {};
    parameter.userId = request.userId;
    parameter.userName = request.userName;
    parameter.mediaType = request.mediaType;
    YTX_Webrtc.delUser(parameter, function(){
      YTX_Meeting.unSubscribeMediaSuccess(request);
    }, function(err){
      YTX_Meeting.unSubscribeMediaFail(request, err);
    }); 
  };

/////////////////////////////screen share////////////////////////////
  YTX_Meeting.addCancelScreenShareRequest = function(){
    let request = {};
    request.messageId = YTX_MessageId.CancelScreenShare;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Add CancelScreenShareRequest");
    YTX_Meeting.addRequest(request)
  };

  YTX_Meeting.startScreenShare = function(onSuccess, onFail){
    YTX_Meeting.startScreenShareFailcCallback = onFail;
    YTX_Meeting.startScreenShareSuccessCallback = onSuccess;
    YTX_Webrtc.publishScreenMedia(function(stream){
      YTX_Webrtc.buildScreenShareOffer(stream,
        YTX_Meeting.addCancelScreenShareRequest, 
        YTX_Meeting.sendPublishMediaRequest, 
        YTX_Meeting.startScreenShareFail);
      },
      YTX_Meeting.startScreenShareFail);
  };

  YTX_Meeting.sendPublishMediaRequest = function(sdp){
    let customData = {};
    let clientNo = YTX_Meeting.clientNo++;
    let publishMediaRequest = new YTX_Protobuf.publishMediaRequest();
    customData.confId = YTX_Meeting.confId;    
    customData.resolution = "5";
    customData.mediaType = "2";
    customData.selfssrc = YTX_Meeting.selfSsrc;
    customData.mediaSdp = Base64.encode(sdp); 
    publishMediaRequest.setCallId(YTX_Meeting.callId);
    publishMediaRequest.setCalled(YTX_Meeting.called);
    publishMediaRequest.setCaller(YTX_Meeting.caller);
    publishMediaRequest.setCustomData(JSON.stringify(customData));
    publishMediaRequest.setSeq(clientNo.toString());
    publishMediaRequest.setClientNo(clientNo);
    publishMediaRequest.setCallrouteId(YTX_Meeting.callRouteId);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send PublishMediaRequest");
    YTX_Meeting.sendMessage(publishMediaRequest);

    YTX_Meeting.connState = CState.ScreenSharing;
    YTX_Meeting.publishMediaTimerId = setTimeout(function () {
      let err = {};
      err.name = "PublishMedia fail";
      err.message = "Server Timerout";
      YTX_Meeting.startScreenShareFail(err);
    }, 5*1000);
  };

  YTX_Meeting.recvPublishMediaResponse = function(content){
    if(YTX_Meeting.connState != CState.ScreenSharing){
      console.warn(YTX_Meeting.getTimeStamp(), "[Meeting] Recv PublishMediaResponse connState err,state:", YTX_Meeting.connState);
      return;
    }
    clearTimeout(YTX_Meeting.publishMediaTimerId);

    let callEventData = content["CallEventData"];
    let customData = JSON.parse(callEventData[ParKey.CustomData]);    
    let status = customData["status"];
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv PublishMediaResponse, status:", status)
    if(status != "200"){
      err = {};
      err.name = "Server PublishMediaResponse err";
      err.message = "Server Response:" + status;    
      YTX_Meeting.startScreenShareFail(err);
      return;
    }
    YTX_Webrtc.handleScreenShareAnswer(YTX_Meeting.startScreenShareSuccess, YTX_Meeting.startScreenShareFail);
  };
  
//////////////////////////////////////
  YTX_Meeting.cancelScreenShare = function(){
    let customData = {};
    let clientNo = YTX_Meeting.clientNo++;
    let unPublishMediaRequest = new YTX_Protobuf.unPublishMediaRequest();
    customData.confId = YTX_Meeting.confId;    
    customData.mediaType = "2";
    customData.selfssrc = YTX_Meeting.selfSsrc; 
    unPublishMediaRequest.setCallId(YTX_Meeting.callId);
    unPublishMediaRequest.setCalled(YTX_Meeting.called);
    unPublishMediaRequest.setCaller(YTX_Meeting.caller);
    unPublishMediaRequest.setCustomData(JSON.stringify(customData));
    unPublishMediaRequest.setSeq(clientNo.toString());
    unPublishMediaRequest.setClientNo(clientNo);
    unPublishMediaRequest.setCallrouteId(YTX_Meeting.callRouteId);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Send UnPublishMediaRequest");
    YTX_Meeting.sendMessage(unPublishMediaRequest);

    YTX_Meeting.connState = CState.CancelScreenSharing;
    YTX_Meeting.unPublishMediaTimerId = setTimeout(function () {
      let err = {};
      err.name = "UnPublishMedia fail";
      err.message = "Server Timerout";
      YTX_Meeting.cancelScreenShareFail(err);
    }, 5*1000);
  };

  YTX_Meeting.recvUnPublishMediaResponse = function(content){
    if(YTX_Meeting.connState != CState.CancelScreenSharing){
      console.warn(YTX_Meeting.getTimeStamp(), "[Meeting] Recv UnPublishMediaResponse connState err,state:", YTX_Meeting.connState);
      return;
    }
    clearTimeout(YTX_Meeting.unPublishMediaTimerId);  
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Recv UnPublishMediaResponse");
    YTX_Webrtc.cancelScreenShare(YTX_Meeting.cancelScreenShareSuccess, YTX_Meeting.cancelScreenShareFail);
  };

///////////////////////////////////////////////////////////////////////
  YTX_Meeting.getMediaDevice = function(onSuccess, onFail){
    YTX_Webrtc.getMediaDevice(onSuccess, onFail);
  };

  YTX_Meeting.chanegeAudioOutput = function(element, deviceId, onSuccess, onFail){
    YTX_Webrtc.chanegeAudioOutput(element, deviceId, onSuccess, onFail);
  };

  YTX_Meeting.changeAudioInput = function(deviceId, onSuccess, onFail){
    YTX_Webrtc.changeAudioInput(deviceId, onSuccess, onFail);
  };

  YTX_Meeting.changeVideoInput = function(deviceId, onSuccess, onFail){
    YTX_Webrtc.changeVideoInput(deviceId, onSuccess, onFail);
  };
//==================================webrtc=====================================//

  var YTX_Webrtc_Option = {};
  YTX_Webrtc_Option._MOrder_Audio = 0;
  YTX_Webrtc_Option._MOrder_Video = 1; 

  YTX_Webrtc_Option._stIdle = 0;
  YTX_Webrtc_Option._stInvite = 1;
  YTX_Webrtc_Option._stAnswer = 2;

  var YTX_MessageId = {};
  YTX_MessageId.AddUserForCallOut = 1;
  YTX_MessageId.DelUser = 2;

  YTX_MessageId.StartScreenShare = 3;
  YTX_MessageId.CancelScreenShare = 4;
  YTX_MessageId.SubscribeMedia = 5;
  YTX_MessageId.UnSubscribeMedia = 6;
  var YTX_Webrtc = {};

  //not reset
  YTX_Webrtc.videoWidth = 640;
  YTX_Webrtc.videoHeight = 480;
  YTX_Webrtc.videoFrameRate = 20;
  YTX_Webrtc.videoMaxBitrate = 0;
  YTX_Webrtc.videoMinBitrate = 0;
  YTX_Webrtc.videoStartBitrate = 0;
  YTX_Webrtc.screenMaxBitrate = 2400;
  YTX_Webrtc.screenMinBitrate = 1200;
  YTX_Webrtc.screenStartBitrate = 4000;

  YTX_Webrtc.onTrackCallBack = null;
  YTX_Webrtc.onIceconnectionstatechangeCallBack = null;

  //need reset
  YTX_Webrtc._audioRtpSender = null;
  YTX_Webrtc._videoRtpSender = null;
  YTX_Webrtc._screenShareSender = null;
  YTX_Webrtc._peerConnection = null;
  YTX_Webrtc._screenDescription = null;

  YTX_Webrtc._staticsMap = new Map();
  //YTX_Webrtc._operation = COperation.Calling;
  YTX_Webrtc._State = YTX_Webrtc_Option._stIdle;  
  YTX_Webrtc._mediaOrder = YTX_Webrtc_Option._MOrder_Audio;

  YTX_Webrtc.reset = function(){
    if(YTX_Webrtc._audioRtpSender){
      YTX_Webrtc._audioRtpSender.track.stop();
      YTX_Webrtc._audioRtpSender = null;
    }
    if(YTX_Webrtc._videoRtpSender){
      YTX_Webrtc._videoRtpSender.track.stop();
      YTX_Webrtc._videoRtpSender = null;
    }
    if(YTX_Webrtc._screenShareSender){
      YTX_Webrtc._screenShareSender.track.stop();
      YTX_Webrtc._screenShareSender = null;
    }
    if(YTX_Webrtc._peerConnection){
      YTX_Webrtc._peerConnection.close();
      YTX_Webrtc._peerConnection = null;
    }
    YTX_Webrtc._screenDescription = null;

    YTX_Webrtc._staticsMap.clear();
    //YTX_Webrtc._operation = COperation.Calling;
    YTX_Webrtc._State = YTX_Webrtc_Option._stIdle;
    YTX_Webrtc._mediaOrder = YTX_Webrtc_Option._MOrder_Audio;

    YTX_Webrtc._remoteDescription._reset();
  };

  ////////////////////////////////////////////////////////////
  YTX_Webrtc._remoteDescription = {};
  YTX_Webrtc._remoteDescription._sessionDescription = "";
  YTX_Webrtc._remoteDescription._audioDescription = "";
  YTX_Webrtc._remoteDescription._videoDescription = "";
  YTX_Webrtc._remoteDescription._videoStreamMap = new Map();

  YTX_Webrtc._remoteDescription._reset = function(){
    this._sessionDescription = "";
    this._audioDescription = "";
    this._videoDescription = "";
    this._videoStreamMap.clear();
  };

  YTX_Webrtc.packetSdp = function(mediaOrder){
    var sdp = "";
    sdp += YTX_Webrtc._remoteDescription._sessionDescription;

    if(mediaOrder == YTX_Webrtc_Option._MOrder_Video){      
      sdp += YTX_Webrtc._remoteDescription._videoDescription;
      for(var stream of YTX_Webrtc._remoteDescription._videoStreamMap.values()){
        sdp += stream.info;
      }
      sdp += YTX_Webrtc._remoteDescription._audioDescription;
    }else{
      sdp += YTX_Webrtc._remoteDescription._audioDescription;
      sdp += YTX_Webrtc._remoteDescription._videoDescription;
      for(var stream of YTX_Webrtc._remoteDescription._videoStreamMap.values()){
        sdp += stream.info;
      }
    }
    return sdp;
  }

  YTX_Webrtc.parseSdp = function(userName, userId, mediaType, sdp){
    var sessionDescription = "";
    var audioDescription = "";
    var videoDescription = "";
    var lines = sdp.split('\r\n');
    var cursor = "session";
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i] + "\r\n";
      if(line.length <= 2){
        break;
      }
      if(line.indexOf("m=audio") >= 0){
        cursor = "audio";
      }
      if(line.indexOf("m=video") >= 0){
        cursor = "video";
      }
      switch (cursor) {
        case "session":
          sessionDescription += line;
          break;
        case "audio":
          audioDescription += line;
          break;
        case "video":
          videoDescription += line;
          break;
        default:          
          break;
      }
    }
    if(YTX_Webrtc._remoteDescription._sessionDescription == ""){
      YTX_Webrtc._remoteDescription._sessionDescription = sessionDescription;
      YTX_Webrtc._remoteDescription._audioDescription = audioDescription;
      if(videoDescription){
        YTX_Webrtc._remoteDescription._videoDescription = YTX_Webrtc.parseVideo(videoDescription);
      }
    }
    YTX_Webrtc.parseStream(userName, userId, mediaType, videoDescription);
  }

  YTX_Webrtc.parseVideo = function(videoDescription){
    let result = "";
    let lines = videoDescription.split('\r\n');
    let videoPayloadType = videoDescription.split("m=video ")[1].split("\r\n")[0].split(" ")[2];
    //计算带宽,暂时先写死，后续封装成单独函数和算法
    if(!YTX_Webrtc.videoMaxBitrate || !YTX_Webrtc.videoMinBitrate || !YTX_Webrtc.videoStartBitrate)
    {
      if(YTX_Webrtc.videoHeight <= 480){
        YTX_Webrtc.videoMaxBitrate = 800;
        YTX_Webrtc.videoMinBitrate = 600;
        YTX_Webrtc.videoStartBitrate = 1200;
      };
      if(YTX_Webrtc.videoHeight > 480 && YTX_Webrtc.videoHeight <= 720){
        YTX_Webrtc.videoMaxBitrate = 1510;
        YTX_Webrtc.videoMinBitrate = 1201;
        YTX_Webrtc.videoStartBitrate = 1807;
      };
      if(YTX_Webrtc.videoHeight > 720){
        YTX_Webrtc.videoMaxBitrate = 4000;
        YTX_Webrtc.videoMinBitrate = 2400;
        YTX_Webrtc.videoStartBitrate = 6000;
      };
    }

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if(line.indexOf("a=ssrc:") >= 0){
        continue;
      }
      if(line.indexOf("b=AS") >= 0){
        continue;
      }
      if(line.indexOf("a=fmtp:" + videoPayloadType) >= 0){
        line += ";x-google-max-bitrate=" + YTX_Webrtc.videoMaxBitrate;
        line += ";x-google-min-bitrate=" + YTX_Webrtc.videoMinBitrate;
        line += ";x-google-start-bitrate=" + YTX_Webrtc.videoStartBitrate;
      }
      if(line.length > 2){
        result += line + "\r\n";
      }      
    }
    return result;
  }

  YTX_Webrtc.parseStream = function(userName, userId, mediaType, videoDescription){
    if(!userName || !userId){
      return;
    }

    var streamInfo = {};
    var lines = videoDescription.split('\r\n');
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i] + "\r\n";      
      if(line.indexOf("a=ssrc:") >= 0){
        var ssrc = line.split(":")[1].split(" ")[0];        
        if(streamInfo[ssrc] == undefined){
          streamInfo[ssrc] = "";
        }
        streamInfo[ssrc] += line;
      }
    }     
    for(var key in streamInfo){
      YTX_Webrtc.addStream(key, streamInfo[key], userName, userId, mediaType);   
    }    
  };

  YTX_Webrtc.addStream = function(ssrc, info, userName, userId, mediaType){
    if(YTX_Webrtc._remoteDescription._videoStreamMap.has(ssrc)){
      console.warn(YTX_Meeting.getTimeStamp(), "[Meeting] Stream Repeat Add, ssrc:", ssrc);
      return;
    }
    let stream = {};
    stream.info = info;
    stream.userId = userId;  
    stream.userName = userName;
    stream.mediaType = mediaType;
    stream.streamId = info.split("mslabel:")[1].split("\r\n")[0];
    YTX_Webrtc._remoteDescription._videoStreamMap.set(ssrc, stream);
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Add Stream, ssrc:", ssrc, ", userName:", userName, 
        ", userId", userId, ", mediaType:", mediaType,", streamId", stream.streamId);
  };

  YTX_Webrtc.delStream = function(userId, mediaType){
    YTX_Webrtc._remoteDescription._videoStreamMap.forEach(function (stream, ssrc, map) {
      if(stream.userId == userId && stream.mediaType == mediaType){
        map.delete(ssrc);
        console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Del Stream, ssrc:", ssrc, ", userName:", stream.userName, 
        ", userId", stream.userId, ", mediaType:", stream.mediaType);
      }
    });    
  }

  ///////////////////////////定制化处理//////////////////
  //将opus设置为单声道，服务端暂不支持双声道
  YTX_Webrtc.setOpusStereo = function(sdp){
    let resultSdp = "";
    let opusPaylodType = -1;
    let lines = sdp.split('\r\n');
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];      
      if(line.indexOf("a=rtpmap") >= 0 && line.indexOf("opus") >= 0){
        opusPaylodType = line.split(":")[1].split(" ")[0];
      }
      let fmtpStr = "a=fmtp:" + opusPaylodType;
      if(line.indexOf(fmtpStr) >= 0){
        resultSdp += line + ";stereo=0" + "\r\n";
        continue;
      }
      if(line.length > 2){
        resultSdp += line + "\r\n";
      }
    }
    return resultSdp;
  };

  YTX_Webrtc.setVideoRateLimit = function(sdp, maxRate, minRate, startRate){
    let fixSdp = "";
    let lines = sdp.split('\r\n');
    let payloadType = sdp.split("m=video ")[1].split("\r\n")[0].split(" ")[2];
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      if(line.indexOf("b=AS") >= 0){
        continue;
      }
      if(line.indexOf("a=fmtp:" + payloadType) >= 0){
        let ftmtStr = "a=fmtp:" + payloadType + " ";
        let par = line.split(" ")[1].split(";");
        for(let j = 0; j < par.length; j++){
          if(par[j].indexOf("x-google-max-bitrate") >= 0){
            ftmtStr += "x-google-max-bitrate=" + maxRate + ";";
            continue;
          }
          if(par[j].indexOf("x-google-min-bitrate") >= 0){
            ftmtStr += "x-google-min-bitrate=" + minRate + ";";
            continue;
          }
          if(par[j].indexOf("x-google-start-bitrate") >= 0){
            ftmtStr += "x-google-start-bitrate=" + startRate + ";";
            continue;
          }
          ftmtStr += par[j] + ";";
        }
        line = ftmtStr;
      }
      if(line.length > 2){
        fixSdp += line + "\r\n";
      }      
    }
    return fixSdp;
  };
  //////////////////////////////////////////////////////

  YTX_Webrtc.initPeerconnection = function(){
    var config = {            
      sdpSemantics : "plan-b"
    };
    var options = {
      optional: [{
        DtlsSrtpKeyAgreement: true
      }]
    };
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Initialization Webrtc, browser:", adapter.browserDetails.browser, 
      ", version:", adapter.browserDetails.version);
    YTX_Webrtc._peerConnection = new RTCPeerConnection(config, options);
    YTX_Webrtc._peerConnection.ontrack = YTX_Webrtc.onTrack;
    YTX_Webrtc._peerConnection.oniceconnectionstatechange = YTX_Webrtc.onIceconnectionstatechange;
  };

  YTX_Webrtc.setVideoWidth = function(width){
    YTX_Webrtc.videoWidth = width;
  };

  YTX_Webrtc.setVideoHeight = function(height){
    YTX_Webrtc.videoHeight = height;
  };

  YTX_Webrtc.setVideoFrameRate = function(frameRate){
    YTX_Webrtc.videoFrameRate = frameRate;
  };

  YTX_Webrtc.setVideoBitrate = function(maxRate, minRate, startRate){
    YTX_Webrtc.videoMaxBitrate = maxRate;
    YTX_Webrtc.videoMinBitrate = minRate;
    YTX_Webrtc.videoStartBitrate = startRate;
  };

  

  YTX_Webrtc.parseMediaOrder = function(recvSdp){
    let audioIndex = recvSdp.indexOf("m=audio");
    let videoIndex = recvSdp.indexOf("m=video");    
    if(videoIndex >= 0 && videoIndex < audioIndex){
      YTX_Webrtc._mediaOrder = YTX_Webrtc_Option._MOrder_Video;
    }
  }

  YTX_Webrtc.getMediaStats = function(onSuccess, onFail){
    if(!YTX_Webrtc._peerConnection){
      let err = {};
      err.name = "getStats fail";
      err.message = "peerConnection not init";
      onFail(err);
      return;
    }
    let staticsReports = [];
    YTX_Webrtc._peerConnection.getStats()
    .then(function(stats) {
      stats.forEach(report => {    
        if(report.type == "inbound-rtp"){
          let currReport = {};
          currReport.type = report.type;
          currReport.ssrc = report.ssrc;
          currReport.kind = report.kind;
          currReport.mediaType = report.mediaType;
          currReport.timestamp = report.timestamp;
          currReport.packetsLost = report.packetsLost;
          currReport.bytesReceived = report.bytesReceived;
          currReport.packetsReceived = report.packetsReceived;
          currReport.headerBytesReceived = report.headerBytesReceived;
          if(YTX_Webrtc._remoteDescription._videoStreamMap.has(report.ssrc.toString())){
            let stream = YTX_Webrtc._remoteDescription._videoStreamMap.get(report.ssrc.toString());
            currReport.userId = stream.userId;
            currReport.userName = stream.userName;
          }
          if(!YTX_Webrtc._staticsMap.has(report.ssrc)){
            currReport.bytesReceivedRate = 0;
            currReport.packetsReceivedRate = 0;
            currReport.headerBytesReceivedRate = 0;
            if(report.framesDecoded){
              currReport.framesDecodedRate = 0;
            }
          }else{
            lastReport = YTX_Webrtc._staticsMap.get(report.ssrc);
            currReport.bytesReceivedRate = parseInt((currReport.bytesReceived - lastReport.bytesReceived)/(currReport.timestamp - lastReport.timestamp)*8*1000);
            currReport.packetsReceivedRate = parseInt((currReport.packetsReceived - lastReport.packetsReceived)/(currReport.timestamp - lastReport.timestamp)*1000);
            currReport.headerBytesReceivedRate = parseInt((currReport.headerBytesReceived - lastReport.headerBytesReceived)/(currReport.timestamp - lastReport.timestamp)*8*1000);
            if(report.framesDecoded){
              currReport.framesDecoded = report.framesDecoded;
              currReport.framesDecodedRate = parseInt((currReport.framesDecoded - lastReport.framesDecoded)/(currReport.timestamp - lastReport.timestamp)*1000);
            }
          }
          if(report.mediaType == "audio"){
            currReport.userId = "Audio";
            currReport.userName = "Audio";
            currReport.jitter = report.jitter;
            currReport.fecPacketsDiscarded = report.fecPacketsDiscarded;
            currReport.fecPacketsReceived = report.fecPacketsReceived;
          }
          if(report.mediaType == "video"){
            currReport.pliCount = report.pliCount;
            currReport.firCount = report.firCount;
            currReport.nackCount = report.nackCount;
            currReport.framesDecoded = report.framesDecoded;
            currReport.keyFramesDecoded = report.keyFramesDecoded;
            currReport.totalDecodeTime = report.totalDecodeTime;
            currReport.totalInterFrameDelay = report.totalInterFrameDelay;
            currReport.totalSquaredInterFrameDelay = report.totalSquaredInterFrameDelay;
          }
          staticsReports.push(currReport);
          YTX_Webrtc._staticsMap.set(report.ssrc, currReport);
        }
      });
      onSuccess(staticsReports);
    });
  };

  YTX_Webrtc.publishUserMedia = function(parameter, onSuccess, onFail){
    
    if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      let err = {};
      err.name = "getUserMedia error";
      err.message = "Browser or System does not support";
      err.statusCode = CStatusCode.NoDevice;
      onFail(err);
      return;
    }

    let videoConstraints = false;
    if(parameter.mediaType == MType.Video)
    {
      videoConstraints = {
        width: { max: YTX_Webrtc.videoWidth },
        height: { max: YTX_Webrtc.videoHeight },
        frameRate: { max: YTX_Webrtc.videoFrameRate }
      }
    } 
    let audioConstraints = {
      optional: 
      [
        {googEchoCancellation: true },   //回声消除 (是否使用回声消除来尝试去除通过麦克风回传到扬声器的音频)
        {googAutoGainControl: true },  //自动增益（是否要修改麦克风的输入音量）
        {googNoiseSuppression: true }, //降噪 (是否尝试去除音频信号中的背景噪声)
        {googHighpassFilter: true },  //高通滤波器
        {googNoisesuppression2: true }, //降噪2
        {googEchoCancellation2: true }, //回声消除2，在非移动平台启动，缺点是计算开销大
        {googAutoGainControl2: true }  //自动增益2
      ]
    }
    navigator.mediaDevices.getUserMedia({
      audio: audioConstraints,
      video: videoConstraints
    })
    .then(function(stream) {
      stream.getTracks().forEach(function (track) {
        if(track.kind == "audio"){
          YTX_Webrtc._audioRtpSender = YTX_Webrtc._peerConnection.addTrack(track, stream);
        }
        if(track.kind == "video"){
          YTX_Webrtc._videoRtpSender = YTX_Webrtc._peerConnection.addTrack(track, stream);
        }
      });

      let audioTracks = stream.getAudioTracks();
      for (let index = 0; index < audioTracks.length; index++) {
        stream.removeTrack(audioTracks[index])
      }
      onSuccess(stream);
    })
    .catch(function(err) {
      onFail(err);
    });
  };

  YTX_Webrtc.closeCamera = function(){
    if(!YTX_Webrtc._videoRtpSender){
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] close Camera, But no device");
      return;
    }
    YTX_Webrtc._videoRtpSender.track.enabled = false;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] close Camera");
  };

  YTX_Webrtc.openCamera = function(){
    if(!YTX_Webrtc._videoRtpSender){
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] open Camera, But no device");
      return;
    }
    YTX_Webrtc._videoRtpSender.track.enabled = true;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] open Camera");
  }

  YTX_Webrtc.closeMicrophone = function(){
    YTX_Webrtc._audioRtpSender.track.enabled = false;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] close Microphone");
  };

  YTX_Webrtc.openMicrophone = function(){
    YTX_Webrtc._audioRtpSender.track.enabled = true;
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] open Microphone");
  };

  YTX_Webrtc.closeVideo = function(){
    if(YTX_Webrtc._videoRtpSender){
      YTX_Webrtc._videoRtpSender.track.stop();
      YTX_Webrtc._videoRtpSender = null;
    }
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Close Video");
  };
  
  YTX_Webrtc.setOnIceconnectionstatechange = function(callback){
    YTX_Webrtc.onIceconnectionstatechangeCallBack = callback;
  };

  YTX_Webrtc.onIceconnectionstatechange = function(event){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Iceconnectionstatechanged:", YTX_Webrtc._peerConnection.iceConnectionState);
    if(YTX_Webrtc.onIceconnectionstatechangeCallBack){
      YTX_Webrtc.onIceconnectionstatechangeCallBack(YTX_Webrtc._peerConnection.iceConnectionState);
    }
  };

  YTX_Webrtc.setOnTrack = function(callback){
    YTX_Webrtc.onTrackCallBack = callback;
  };

  YTX_Webrtc.onTrack = function(event){
    let streamContent = {};
    let eventStream = event.streams[0];
    let streamMap = YTX_Webrtc._remoteDescription._videoStreamMap;
    streamMap.forEach(function (value, key, map) {
      if(value.streamId == eventStream.id){
        streamContent.userId = value.userId;
        streamContent.userName = value.userName;        
        streamContent.streamId = value.streamId;
        streamContent.mediaType = value.mediaType;
      }
    });
    if(event.track.kind == "audio"){
      streamContent.mediaType = MType.Audio;
    }
    streamContent.stream = eventStream;
    if(!streamContent.userId){
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] OnTrack streamId:", eventStream.id, ", kind:", event.track.kind);
    }else{
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] OnTrack userName:", streamContent.userName, ", userId:", streamContent.userId, 
      ", mediaType:", streamContent.mediaType, ", streamId:", streamContent.streamId, ", kind:", event.track.kind);
    }    
    if(YTX_Webrtc.onTrackCallBack){
      YTX_Webrtc.onTrackCallBack(streamContent);
    }
  };

  YTX_Webrtc.buildAnswer = function(recvSdp, onSuccess, onFail){
    YTX_Webrtc.parseMediaOrder(recvSdp);
    YTX_Webrtc.parseSdp("", "", "", recvSdp);
    let remoteSdp = YTX_Webrtc.packetSdp(YTX_Webrtc._mediaOrder);
    console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] buildAnswer remoteSdp:", remoteSdp);

    YTX_Webrtc._peerConnection.setRemoteDescription(new RTCSessionDescription({
      type: "offer",
      sdp: remoteSdp
    }))
    .then(function() {
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] buildAnswer SetRemoteDescription Success");
      return YTX_Webrtc._peerConnection.createAnswer();
    })
    .then(function(answer) {
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] buildAnswer createAnswer Success");
      console.debug("[Meeting] sdp:", answer.sdp);
      return YTX_Webrtc._peerConnection.setLocalDescription(answer);
    })
    .then(function() {
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] buildAnswer setLocalDescription Success");
      onSuccess(YTX_Webrtc._peerConnection.localDescription.sdp);
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] buildAnswer Failed, errname:", err.name, ", errmessage:", err.message);
      onFail(err);
    })   
  };

  YTX_Webrtc.addUserForCallIn = function(parameter, onSuccess, onFail){
    let sdp = parameter.sdp;
    let userId = parameter.userId;
    let userName = parameter.userName;
    let mediaType = parameter.mediaType;
    
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] AddUserForCallIn, userName:", userName, ", userId:", userId, ", mediaType:", mediaType); 
    console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] recvSdp:", sdp);
    YTX_Webrtc.parseSdp(userName, userId, mediaType, sdp);  
    let remoteSdp = YTX_Webrtc.packetSdp(YTX_Webrtc._mediaOrder);

    YTX_Webrtc._peerConnection.setRemoteDescription(new RTCSessionDescription({
      type: "offer",
      sdp: remoteSdp
    }))
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] addUser SetRemoteSdp Success");
      return YTX_Webrtc._peerConnection.setLocalDescription(YTX_Webrtc._peerConnection.localDescription);
    })
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] addUser SetLoacSdp Success");
      let event = {}; 
      event.userId = userId;
      event.userName = userName;
      onSuccess(event);
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] addUser SetRemoteSdp Fail, errName:", err.name, ", errMessage:", err.message);
      err.userId = userId;
      err.userName = userName;
      onFail(err);
    })
  };
   
  YTX_Webrtc.buildOffer = function(onSuccess, onFail){   
    YTX_Webrtc._peerConnection.createOffer()
    .then(function(offer) {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] buildOffer Success sdp:", offer.sdp); 
      //将opus编码强制为单声道
      let fixSdp = YTX_Webrtc.setOpusStereo(offer.sdp);
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] buildOffer fix sdp:", fixSdp); 

      YTX_Webrtc.parseMediaOrder(fixSdp);           
      return YTX_Webrtc._peerConnection.setLocalDescription(new RTCSessionDescription({
        type: "offer",
        sdp: fixSdp
      }));
    })
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] setLocalDescription Success");
      onSuccess(YTX_Webrtc._peerConnection.localDescription.sdp);
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] buildOffer Fail, errname:", err.name, ", errmessage:", err.message);
      onFail(err);
    })
  };

  YTX_Webrtc.handleAnswer = function(recvSdp, onSuccess, onFail){
    if(YTX_Webrtc._State == YTX_Webrtc_Option._stAnswer){
      console.warn(YTX_Meeting.getTimeStamp(), "[Meeting] HandleAnswer Repeat Response");
      return;
    }
    YTX_Webrtc._State = YTX_Webrtc_Option._stAnswer; 
    YTX_Webrtc.parseSdp("", "", "", recvSdp);  
    let remoteSdp = YTX_Webrtc.packetSdp(YTX_Webrtc._mediaOrder);
    console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] HandleAnswer Recvsdp:", recvSdp);
    console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] HandleAnswer BuildSdp:", remoteSdp);

    YTX_Webrtc._peerConnection.setRemoteDescription(new RTCSessionDescription({
      type: "answer",
      sdp: remoteSdp
    }))
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] HandleAnswer SetRemoteDescription Success");
      onSuccess();
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] HandleAnswer SetRemoteDescription Failed, errname:", err.name, ", errmessage:", err.message);
      onFail(err);
    })   
  };

  YTX_Webrtc.addUserForCallOut = function(parameter, onSuccess, onFail){
    let sdp = parameter.sdp;
    let userId = parameter.userId;
    let userName = parameter.userName;
    let mediaType = parameter.mediaType;
    let err = {};

    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Add User, userName:", userName, ", userId:", userId, ", mediaType:", mediaType); 
    console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] recvSdp:", sdp);

    if(YTX_Webrtc._State != YTX_Webrtc_Option._stAnswer){
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] addUser error, has not answered");
      err.name = "addUser error";
      err.message = "YTX_Webrtc has not answered";
      onFail(err);
      return;
    }
    if(!userName || !userId || !sdp){
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] addUser parameter error");
      err.message = "parameter error";
      err.name = "addUser error";
      onFail(err);
      return;
    }

    YTX_Webrtc.parseSdp(userName, userId, mediaType, sdp);  
    let remoteSdp = YTX_Webrtc.packetSdp(YTX_Webrtc._mediaOrder);
    console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] addUser remoteSdp:", remoteSdp);

    YTX_Webrtc._peerConnection.createOffer()
    .then(function(offer) {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] addUser CreateOffer Success");
      return YTX_Webrtc._peerConnection.setLocalDescription(offer)
    })
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] addUser SetLoacSdp Success");
      return YTX_Webrtc._peerConnection.setRemoteDescription(new RTCSessionDescription({
        type: "answer",
        sdp: remoteSdp
      }))
    })
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] addUser SetRemoteSdp Success");
      onSuccess();
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] addUser SetRemoteSdp Fail, errName:", err.name, ", errMessage:", err.message);
      onFail(err);
    })
  };

  YTX_Webrtc.delUser = function(parameter, onSuccess, onFail){
    let userId = parameter.userId;
    let userName = parameter.userName;
    let mediaType = parameter.mediaType;
    if(YTX_Webrtc._State != YTX_Webrtc_Option._stAnswer){
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] delUser error, has not answered");
      return;
    }
    YTX_Webrtc.delStream(userId, mediaType);

    let remoteSdp = YTX_Webrtc.packetSdp(YTX_Webrtc._mediaOrder);
    console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] delUser remoteSdp:", remoteSdp);

    YTX_Webrtc._peerConnection.createOffer()
    .then(function(offer) {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] delUser CreateOffer Success");
      return YTX_Webrtc._peerConnection.setLocalDescription(offer)
    })
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] delUser SetLocalSdp Success");
      return YTX_Webrtc._peerConnection.setRemoteDescription(new RTCSessionDescription({
        type: "answer",
        sdp: remoteSdp
      }))
    })
    .then(function() {      
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] delUser SetRemoteSdp Success");
      onSuccess();
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] delUser SetRemoteSdp Fail:", err);
      onFail(err);
    })
  };

  YTX_Webrtc.publishScreenMedia = function(onSuccess, onFail){
    if(!navigator.mediaDevices.getDisplayMedia){
      let err = {};
      err.name = "getDisplayMedia error";
      err.message = "Browser does not support";
      err.statusCode = CStatusCode.BrowserNotSupport;
      onFail(err);
      return;
    }

    navigator.mediaDevices.getDisplayMedia({
      video: true
    })
    .then(function(stream) {
      onSuccess(stream);
    })    
    .catch(function(err) {
      onFail(err);
    });
  };

  YTX_Webrtc.buildScreenShareOffer = function(stream, cancelCallback, onSuccess, onFail){
    let track = stream.getTracks()[0];
    track.onended = cancelCallback;
    
    YTX_Webrtc._screenShareSender = YTX_Webrtc._peerConnection.addTrack(track, stream);
    YTX_Webrtc._peerConnection.createOffer()
    .then(function(offer) {
      YTX_Webrtc._screenDescription = offer;
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] buildScreenShareOffer success, sdp:", offer.sdp);
      var ssrcSet = new Set();
      var screenShareSdp = "";
      (function(){
        var lines = YTX_Webrtc._peerConnection.localDescription.sdp.split("\r\n");
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i];
          if(line.indexOf("a=ssrc:") >= 0){
            var ssrc = line.split(":")[1].split(" ")[0];
            ssrcSet.add(ssrc);
          }
        }
      })();      
      (function(){
        var lines = offer.sdp.split("\r\n");
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i] + "\r\n";        
          if(line.indexOf("a=ssrc:") >= 0){
            var ssrc = line.split(":")[1].split(" ")[0];
            if(ssrcSet.has(ssrc)){
              continue;
            }
          }
          if(line.indexOf("a=ssrc-group:FID") >= 0){
            var ssrc = line.split(" ")[1];
            if(ssrcSet.has(ssrc)){
              continue;
            }
          }
          if(line.length > 2){
            screenShareSdp += line;
          }
        }
      })();
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] buildScreenShareOffer screenShareSdp:", screenShareSdp);
      onSuccess(screenShareSdp);
    })
    .catch(function(err) {
      onFail(err);
    });
  };

  YTX_Webrtc.handleScreenShareAnswer = function(onSuccess, onFail){
    let fixSdp = YTX_Webrtc._peerConnection.remoteDescription.sdp;
    fixSdp = YTX_Webrtc.setVideoRateLimit(fixSdp, 
        YTX_Webrtc.screenMaxBitrate + YTX_Webrtc.videoMaxBitrate,
        YTX_Webrtc.screenMinBitrate + YTX_Webrtc.videoMinBitrate,
        YTX_Webrtc.screenStartBitrate + YTX_Webrtc.videoStartBitrate);
    
    YTX_Webrtc._peerConnection.setLocalDescription(YTX_Webrtc._screenDescription)
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] ScreenShare SetLoacSdp Success");
      return YTX_Webrtc._peerConnection.setRemoteDescription(new RTCSessionDescription({
        type: "answer",
        sdp: fixSdp
      }))
    })
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] ScreenShare SetRemoteSdp Success"); 
      onSuccess();
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), 
          "[Meeting] ScreenShare Fail, errName", err.name, ", errMessage:", err.message); 
        onFail(err);
    }) 
  };

  YTX_Webrtc.cancelScreenShare = function(onSuccess, onFail){

    YTX_Webrtc._peerConnection.removeTrack(YTX_Webrtc._screenShareSender);
    YTX_Webrtc._screenShareSender = null;

    let fixSdp = YTX_Webrtc._peerConnection.remoteDescription.sdp;
    fixSdp = YTX_Webrtc.setVideoRateLimit(fixSdp, 
            YTX_Webrtc.videoMaxBitrate,
            YTX_Webrtc.videoMinBitrate,
            YTX_Webrtc.videoStartBitrate);

    YTX_Webrtc._peerConnection.createOffer()
    .then(function(offer) {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] cancelScreenShare createOffer success:", offer.sdp);
      return YTX_Webrtc._peerConnection.setLocalDescription(offer);
    })
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] cancelScreenShare SetLoacSdp Success:");
      return YTX_Webrtc._peerConnection.setRemoteDescription(new RTCSessionDescription({
        type: "answer",
        sdp: fixSdp
        }))
    })
    .then(function() {
      console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] cancelScreenShare SetRemoteSdp Success:");
      onSuccess();
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), 
        "[Meeting] cancelScreenShare createOffer failed, errName:", err.name, ", errMessage:", err.message);
      onFail(err);
    })
  };

  YTX_Webrtc.getMediaDevice = function(onSuccess, onFail){
    
    if(!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices){
      let err = {};
      err.name = "getMediaDevice error";
      err.message = "Browser or System does not support";
      err.statusCode = CStatusCode.NoDevice;
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] getMediaDevice fail, Browser or System does not support");
      onFail(err);
      return;
    }

    let filterDevices = [];
    navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
      devices.forEach(function(device) {
        console.debug(YTX_Meeting.getTimeStamp(), "[Meeting] getMediaDevice:", JSON.stringify(device));
        //过滤重复设备，default
        if(device.deviceId != "default" && device.deviceId != "communications"){
          filterDevices.push(device);
        }
      });
      onSuccess(filterDevices);
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] getMediaDevice fail, errName:", err.name, ", errMessage:", err.message);
      onFail(err);
    });
  };
  
  YTX_Webrtc.chanegeAudioOutput = function(element, deviceId, onSuccess, onFail){
    console.log(YTX_Meeting.getTimeStamp(), "[Meeting] chanege AudioOutput element:", element, ", deviceId:", deviceId);
    element.setSinkId(deviceId)
    .then(function() {
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] chanege AudioOutput Success");
      onSuccess();
    })
    .catch(function(err) {
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] chanege AudioOutput fail, errName:", err.name, ", errMessage:", err.message);
      onFail(err);
    });
  };

  YTX_Webrtc.changeAudioInput = function(deviceId, onSuccess, onFail){
    var constraints = {
      audio: {deviceId: deviceId},
      video: false
    }
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      YTX_Webrtc._audioRtpSender.track.stop();
      YTX_Webrtc._audioRtpSender.replaceTrack(stream.getAudioTracks()[0]);
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] changeAudioInput success, deviceId:", deviceId); 
      onSuccess();
    })
    .catch(function(err) {   
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] changeAudioInput fail, deviceId:", deviceId, 
        ", errName:", err.name, ", errMessage:", err.message); 
      onFail(err);
    })
  };

  YTX_Webrtc.changeVideoInput = function(deviceId, onSuccess, onFail){
    let constraints = {
      audio: false,
      video: {
        deviceId: deviceId,
        width: { max: YTX_Webrtc.videoWidth },
        height: { max: YTX_Webrtc.videoHeight },
        frameRate: { max: YTX_Webrtc.videoFrameRate }
      }
    }
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      YTX_Webrtc._videoRtpSender.track.stop();
      YTX_Webrtc._videoRtpSender.replaceTrack(stream.getVideoTracks()[0]);
      console.log(YTX_Meeting.getTimeStamp(), "[Meeting] changeVideoInput success, deviceId:", deviceId); 
      onSuccess(stream);
    })
    .catch(function(err) {   
      console.error(YTX_Meeting.getTimeStamp(), "[Meeting] changeVideoInput fail, deviceId:", deviceId,
      ", errName:", err.name, ", errMessage:", err.message); 
      onFail(err);
    })
  };

  /*****************************************接入新版本sdk*************************************************/
  var ROOT = {};
  if (typeof global === 'object') {
      ROOT = global;
  } else if (typeof window === "object") {
      ROOT = window
  }
  function RL_Media() {
      this.__proto__ = {
          init: function(optional){
            YTX_Meeting.transport = optional.transport;
          },
          processMsg: function (obj) {   //callroute消息接收
            console.debug("[Meeting] Recv Message:", JSON.stringify(obj)); 
            YTX_Meeting.processCallMessage(obj);
            return;
          },
          receiveMsgResp: function (obj, request, key) { //conference消息接收
              var callback = request.callback;
              var resp = {};
              resp.code = obj["6"];
              resp.result = Base64.decode(obj["2"]["ConferenceMessageResp"]["1"]);
              callback(resp)
          },
          receiveConferenceNotice: function(obj) { //会议通知
            var cn = _parseConferenceNotice(obj);
            if (YTX_Meeting.confNotifyLinstener) {
              YTX_Meeting.confNotifyLinstener(cn);
            }

            function _parseConferenceNotice (obj) {
              var data = obj["2"];
              if (!data) {
                return {
                  code: obj[6]
                };
              }
              var reData = data["ConferenceNotification"];
              var resp = JSON.parse(reData["2"]);
              return resp;
            }
          },

          getVersion: function(){
            return YTX_Meeting.Version;
          },
          onTrack: function(callback){
            YTX_Meeting.setOnTrack(callback);
          },
          setOnTrack: function(callback){
            YTX_Meeting.setOnTrack(callback);
          },
          onPublishMedia: function(callback){
            YTX_Meeting.setOnPublishMedia(callback);
          },
          setOnPublishMedia: function(callback){
            YTX_Meeting.setOnPublishMedia(callback);
          },
          onCallMsgListener: function (callback) {
            YTX_Meeting.eventListener = callback;
          },
          setUserData: function(userData){
            YTX_Meeting.setUserData(userData);
          },
          makeCall: function (parameter, onSuccess, onFail) {
            YTX_Meeting.makeCall(parameter, onSuccess, onFail);
          },
          updateCall: function (parameter, onSuccess, onFail){
            YTX_Meeting.updateCall(parameter, onSuccess, onFail);
          },
          releaseCall: function (onSuccess, onFail) {
            YTX_Meeting.releaseCall(onSuccess, onFail);
          },
          rejectCall: function (onSuccess, onFail) {
            YTX_Meeting.rejectCall(onSuccess, onFail);
          },
          acceptCall: function (onSuccess, onFail) {
            YTX_Meeting.acceptCall(onSuccess, onFail);
          },
          acceptCallEx: function (parameter, onSuccess, onFail) {
            YTX_Meeting.acceptCallEx(parameter, onSuccess, onFail);
          },
          getMediaStats: function (onSuccess, onFail) {
            YTX_Meeting.getMediaStats(onSuccess, onFail);
          },
          closeCamera: function(){
            YTX_Meeting.closeCamera();
          },
          openCamera: function(){
            YTX_Meeting.openCamera();
          },
          closeMicrophone: function(){
            YTX_Meeting.closeMicrophone();
          },
          openMicrophone: function(){
            YTX_Meeting.openMicrophone();
          },
          setVideoWidth: function(width){
            YTX_Meeting.setVideoWidth(width);
          },
          setVideoHeight: function(height){
            YTX_Meeting.setVideoHeight(height);
          },
          setVideoFrameRate: function(frameRate){
            YTX_Meeting.setVideoFrameRate(frameRate);
          },
          setVideoBitrate: function(maxRate, minRate, startRate)
          {
            YTX_Meeting.setVideoBitrate(maxRate, minRate, startRate);
          },

          ////////////////////////meeting////////////////////////////////////
          onMeetingMsgListener: function (callback) {
            YTX_Meeting.confEventListener = callback;
          },
          onConferenceNotifyLinstener: function (callback) {
            YTX_Meeting.confNotifyLinstener = callback;
          },
          deployVideoVoice: function (enable, type) {
            enable = (enable ? true : false);
            if (type === "video") {
              if(enable == true){
                YTX_Meeting.openCamera();
              }else{
                YTX_Meeting.closeCamera();
              }
            } else {
              if(enable == true){
                YTX_Meeting.openMicrophone();
              }else{
                YTX_Meeting.closeMicrophone();
              }
            }
          },
          ////////////////conference/////////////////////
          ConferenceMsgBuilder: function (path, content) {
            this._path = path;
            this._content = content;
            this.setPath = function (path) {
              this._path = path;
            };
            this.setContent = function (content) {
              this._content = content;
            };
            this.getPath = function () {
              return this._path;
            };
            this.getContent = function () {
              return this._content;
            };
          },
          ConferenceMsg: function (conferenceMsgBuilder, callback, onError) {
            YTX_Meeting.sendMessage(conferenceMsgBuilder, callback, onError);
          },
          //////////////////////////////////////////////
          ConnectMediaBuilder: function (called, caller, callType, deviceId) {
            this._called = called;
            this._caller = caller;
            this._callType = (!!callType) ? callType : 1;
            this._deviceId = deviceId;
            this.setDeviceId = function (deviceId) {
              this._deviceId = deviceId;
            };
            this.getDeviceId = function () {
              return this._deviceId;
            };
            this.setCalled = function (called) {
              this._called = called
            };
            this.setCaller = function (caller){
              this._caller = caller;
            };
            this.setCallType = function (callType) {
              this._callType = callType
            };
            this.getCalled = function () {
              return this._called
            };
            this.getCallType = function () {
              return this._callType
            };
            this.getCaller = function(){
              return this._caller;
            };
          },
          ConnectMedia: function (ConnectMediaBuilder, callback, onError) {
            YTX_Meeting.getMediaDevice(function(devices){
              let parameter = {};
              parameter.caller = ConnectMediaBuilder.getCaller();                           
              parameter.called = "nconf" + ConnectMediaBuilder.getCalled();
              if(!parameter.caller){
                //兼容旧版本，正常caller应该由上层传参,后续重构该接口
                parameter.caller = ROOT.RL_YTX_NEW.userName;
              } 

              let audioDevice = false;
              let videoDevice = false;
              devices.forEach(function(dev) {
                if(dev.kind == "audioinput"){
                  audioDevice = true;
                }
                if(dev.kind == "videoinput"){
                  videoDevice = true;
                }
              });
              if(!audioDevice){
                let err = {};
                err.name = "ConnectMedia Fail";
                err.message = "Not Find Microphone Device";
                err.statusCode = CStatusCode.NoDevice;
                onError(err);
                return;
              }
              parameter.mediaType = MType.Audio;
              if(videoDevice){
                parameter.mediaType = MType.Video;
              }
              YTX_Meeting.operation = COperation.Meeting;
              YTX_Meeting.makeCall(parameter, callback, onError);
            }, onError)
          },
          DisconnectMedia: function (callback, onError) {
            YTX_Meeting.releaseCall(callback, onError);
          },
          cancelVideoBuilder: function (callId, caller, called, mediaInfo, userName, memberId) {
            this._callId = callId;
            this._caller = caller;
            this._called = called;
            this._mediaInfo = mediaInfo;
            this._userName = userName;
            this._memberId = memberId;
            this.setUserName = function(userName){
              this._userName = userName;
            };
            this.getUserName = function(){
              return this._userName;
            };
            this.setMemberId = function(memberId){
              this._memberId = memberId;
            };
            this.getMemberId = function(){
              return this._memberId;
            };
            this.setMediaInfo = function (mediaInfo) {
              this._mediaInfo = mediaInfo;
            }
            this.getMediaInfo = function () {
              return this._mediaInfo;
            };
            this.setCallId = function (callId) {
              this._callId = callId
            };
            this.setCaller = function (caller) {
              this._caller = caller
            };
            this.setCalled = function (called) {
              this._called = called
            };
            this.getCallId = function () {
              return this._callId
            };
            this.getCaller = function () {
              return this._caller
            };
            this.getCalled = function () {
              return this._called;
            }
          },
          cancelVideo: function (cancelVideoBuilder, onSuccess, onFail) {
            let objMediaInfo = cancelVideoBuilder.getMediaInfo();      
            //YTX_Meeting.setOnUnSubscribeMediaFail(onError);
            //YTX_Meeting.setOnUnSubscribeMediaSuccess(callback);
            //YTX_Meeting.unSubscribeMedia(objMediaInfo.antissrc, objMediaInfo.mediaType, cancelVideoBuilder.getMemberId(), cancelVideoBuilder.getUserName());
            let request = {};
            request.antiSsrc = objMediaInfo.antissrc;
            request.mediaType = objMediaInfo.mediaType;
            request.memberId = cancelVideoBuilder.getMemberId();
            request.userName = cancelVideoBuilder.getUserName();
            if(!request.userId){//兼容容视
              request.userId = request.memberId;
            }
            request.onFail = onFail;
            request.onSuccess = onSuccess;
            request.messageId = YTX_MessageId.UnSubscribeMedia;
            console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Add UnSubscribeMedia userName:", request.userName, ", userId:", request.userId);
            YTX_Meeting.addRequest(request) 
          },
          ////////////////////////////////////////////////////
          subscribeMedia: function(request, onSuccess, onFail){
            YTX_Meeting.confId = request.confId;
            if(!request.userId){//兼容容视
              request.userId = request.memberId;
            }
            request.onFail = onFail;
            request.onSuccess = onSuccess;
            request.messageId = YTX_MessageId.SubscribeMedia;
            console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Add SubscribeMedia, userName:", request.userName, ", userId:", request.userId);
            YTX_Meeting.addRequest(request)
          },
          unsubscribeMedia: function(request, onSuccess, onFail){
            if(!request.userId){//兼容容视
              request.userId = request.memberId;
            }
            request.onFail = onFail;
            request.onSuccess = onSuccess;
            request.messageId = YTX_MessageId.UnSubscribeMedia;
            console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Add UnSubscribeMedia userName:", request.userName, ", userId:", request.userId);
            YTX_Meeting.addRequest(request)
          },
          startScreenShare: function (onSuccess, onFail) {
            let request = {};
            request.onFail = onFail;
            request.onSuccess = onSuccess;
            request.messageId = YTX_MessageId.StartScreenShare;
            console.log(YTX_Meeting.getTimeStamp(), "[Meeting] Add ScreenShareRequest");
            YTX_Meeting.addRequest(request)
          },
          ////////////////////////////////////////////////////////
          GetMediaDevice: function(onSuccess, onFail){
            YTX_Meeting.getMediaDevice(onSuccess, onFail);
          },
          ChangeAudioOutput: function(element, deviceId, onSuccess, onFail){
            YTX_Meeting.chanegeAudioOutput(element, deviceId, onSuccess, onFail);
          },
          ChangeAudioInput: function(deviceId, onSuccess, onFail){
            YTX_Meeting.changeAudioInput(deviceId, onSuccess, onFail);
          },      
          changeVideoInput: function(deviceId, onSuccess, onFail){
            YTX_Meeting.changeVideoInput(deviceId, onSuccess, onFail);
          },
      }
  }
  ROOT.RL_Media = new RL_Media()
  /*****************************************接入新版本sdk*************************************************/
