(function () {
  var ROOT = {};
  if (typeof global === 'object') {
    ROOT = global;
  } else if (typeof window === "object") {
    ROOT = window
  }
  var Media, Webrtc;
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
      if (typeof param === 'function') {
        return param.getData();
      } else {
        return param
      }
    },
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
    getTimeStamp: function () { //当前时间
      var now = new Date();
      var timestamp = now.getFullYear() + '' + ((now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : "0" + (now.getMonth() + 1)) + (now.getDate() >= 10 ? now.getDate() : "0" + now.getDate()) + (now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()) + (now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()) + (now.getSeconds() >= 10 ? now.getSeconds() : "0" + now.getSeconds());
      return timestamp;
    },
    getWindowURL: function () {
      var url = window.URL || window.webkitURL || window.mozURL || window.msURL;
      return url
    },
    browser: function () {
      var userAgent = navigator.userAgent;

      if (userAgent.indexOf("iPhone") > -1) {
        return "iPhone"
      }
      if (userAgent.indexOf("iPad") > -1) {
        return "iPad"
      }
      if (userAgent.indexOf("MicroMessenger") > -1) {
        return "MicroMessenger"
      }
      if (userAgent.indexOf("Opera") > -1) {
        return "Opera"
      }
      if (userAgent.indexOf("Firefox") > -1) {
        return "FF"
      }
      if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome"
      }
      if (userAgent.indexOf("Safari") > -1) {
        return "Safari"
      }
      if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1) {
        return "IE"
      }
    },
  };
  commonMethods = commonMethods.assign(commonMethods, ROOT.commonMethods);
  var commonConfig = {
    peerConnection: null,
    peerConnectionMap: {},
    newMediaUUID: '',
    newMediaCallUUID: '',
    newMediaClientNo: '',
    selfssrc: '',
    clientNo: '',
    elementMap: {},
    membersUUID: {},
    voipOtherView: null,
    voipLocalView: null,
    vedioConfig: {
      width: {
        ideal: 1280
      },
      height: {
        ideal: 720
      },
      frameRate: {
        ideal: 15
      },
      type: 1
    },
    localMediaStream: null,
    remoteMediaStream: null,
    sender: [],
    isInMeeting: false,
  };
  commonConfig = commonMethods.assign(commonConfig, ROOT.commonConfig);

  // ws造函数
  function RL_AV() {
    var avConfig = {
      mwsgServer: "",
      newMediaWS: null,
      newMediaTimeout: {}, //点对点消息发送回调map
      newMediaTar: null, //心跳延时器
      isConnecting: false,
      isConnect: false,
      clientMap: {}, //会议消息发送回调map
    };
    var avMethods = {
      newMediaResp: function (e) {
        console.log("media resp:::  " + e.data);
        var obj = JSON.parse(e.data);
        var method = obj.method;
        var client = obj.client;
        var isMeeting = false;
        var request = null;
        if (obj.uuid) commonConfig.newMediaCallUUID = obj.uuid;
        if (method === "hb") client = obj["hb"];
        if (client) {
          if (avConfig.clientMap[client]) {
            isMeeting = true;
            request = avConfig.clientMap[client];
            if (request.timeout) clearTimeout(request.timeout);
            delete avConfig.clientMap[client];
          } else if (avConfig.newMediaTimeout[client]) {
            request = avConfig.newMediaTimeout[client];
            delete avConfig.newMediaTimeout[client];
          }
        }
        if (!request) return;
        var retCode = obj["ret"];
        if (parseInt(retCode) !== 200 && !!request.onError) {
          request.onError(obj);
          return;
        }
        if (!isMeeting) {
          if (method === "H5AuthReg") {
            commonConfig.newMediaUUID = obj.uuid;
          }
          request.callback(obj);
          return;
        }
        if (method === "H5AuthReg") {
          commonConfig.isInMeeting = true;
          commonConfig.newMediaUUID = obj.uuid;
          request.callback(obj);
        } else if (method === "HandleH5SendSDPRet" || method === "HandleH5RecvSDPRet") {
          request.callback(obj.sdp)
        } else if (method === "ReqVideoOfferSDP") {
          Media.receiveVideoOfferSDPResp(obj, request.element, request.onError);
        } else if (method === "Release") { //服务端发起的release
          Media.receiveRelease(obj);
        } else if (method === "ReleaseRet") {
          Media.receiveReleaseRet(obj, request);
        }
      },
      sendNewMediaHB: function () {
        if (!avConfig.newMediaWS) return;
        var hb = {
          "method": "hb",
          "hb": ++commonConfig.newMediaClientNo + ""
        }
        console.log("new media hb ::::  " + JSON.stringify(hb));
        avConfig.newMediaWS.send(JSON.stringify(hb));
        if (avConfig.newMediaWS) {
          avConfig.newMediaTar = setTimeout(function (e) {
            avMethods.sendNewMediaHB();
          }, 5000);
        }
      },
      newMediaAuth: function (callback, onerror) {
        if (commonConfig.newMediaUUID) {
          callback();
          return;
        }
        var obj = {
          method: 'H5Auth',
          userid: commonConfig.userName,
          authtoken: commonConfig.token,
          uuid: commonConfig.newMediaUUID
        };
        self.sendNewMediaMsg(obj, callback, onerror);
      },
      getClientNo: function (callBack, onError, element) {
        var clientNo = ++commonConfig.clientNo + "";
        var data = {};
        if (!!onError) {
          data.onError = onError;
        } else {
          data.onError = function () {
          };
        }
        if (!!callBack) {
          data.callback = callBack;
        }
        if (!!element) {
          data.element = element;
        }
        var i = setTimeout(function () {
          var resp = {};
          if (avConfig.isConnecting) {
            avConfig.isConnecting = false;
            avConfig.isConnect = false;
          }
          resp.code = commonConfig.errCode._RESP_TIME_OUT;
          resp.msg = 'mwsg request time out.';
          if (!!onError) {
            onError(resp)
          }
          console.log('mwsg time out clientNo is: ' + clientNo);
          delete avConfig.clientMap[clientNo];
        }, commonConfig.timeOutSecond * 1000);
        data.timeout = i;
        avConfig.clientMap[clientNo] = data;
        return clientNo;
      },
      reconnect: function () {
        avMethods.initSocket(function () {
          console.log("reconnect success ");
        }, function (err) {
          console.log("reconnect fail  retrying", err);
          setTimeout(avMethods.reconnect, 5000);
        })
      },
      initSocket: function (callback, onerror) {
        if (!avConfig.newMediaWS) {
          try {
            avConfig.newMediaWS = new WebSocket(avConfig.mwsgServer);
            var tId = setTimeout(function () {
              if (avConfig.isConnecting) {
                avConfig.isConnecting = false;
                var resp = {};
                resp.code = commonConfig.errCode._NETWORK_TIME_OUT;
                resp.msg = 'connect to mwsg websocket time out.';
                onError(resp);
                return;
              }
            }, commonConfig.timeOutSecond * 1000);
            avConfig.newMediaWS.onopen = function () {
              if (!!tId) {
                clearTimeout(tId);
                commonMethods.logger.info("Client connect to mwsg Server ");
                avConfig.isConnect = true;
                avConfig.isConnecting = false;
                avMethods.newMediaAuth(callback, onerror);
                if (avConfig.newMediaTar) {
                  clearTimeout(avConfig.newMediaTar);
                }
                avConfig.newMediaTar = setTimeout(function () {
                  avMethods.sendNewMediaHB();
                }, 30000);
              }
            };
            avConfig.newMediaWS.onmessage = avMethods.newMediaResp;
            avConfig.newMediaWS.onclose = function (e) {
              console.log("new media ws closed " + ',' + " e.code:" + e.code + ' e.reason: ' + e.reason + ' e.wasClean:' + e.wasClean);
              if (!!tId) clearTimeout(tId);
              if (avConfig.isConnecting) {
                avConfig.isConnecting = false;
                avConfig.isConnect = false;
                onError({
                  code: commonConfig.errCode._NETWORK_ERR,
                  msg: 'connecting to websocket, please wait.'
                });
                return;
              }
              if (commonConfig.isInMeeting) {
                avMethods.reconnect();
                return;
              }
              if (avConfig.newMediaWS && avConfig.newMediaWS.readyState === 3) {
                avConfig.newMediaWS = null;
              }
              commonConfig.newMediaUUID = '';
              commonConfig.newMediaCallUUID = '';
              commonConfig.selfssrc = null;
              if (commonConfig.newMediaTar) clearTimeout(commonConfig.newMediaTar);
              if (commonConfig.newMediaUUID) {
                setTimeout(function () {
                  avMethods.initSocket(function (e) {
                    console.log(e);
                  }, function (err) {
                    console.log(err)
                  })
                }, 5000);
              }
            };
          } catch (e) {
            console.log(e);
            onerror(e)
          }
        } else {
          callback()
        }
      },
    };
    var self = this;
    this.version = '5.4.0';
    this.isActive = false;
    this.__proto__ = {
      //登录初始化
      init: function (data) {
        Media = new RL_Media();
        Webrtc = new RL_Webrtc();
        ROOT.RL_Media = Media;
        ROOT.RL_Webrtc = Webrtc;
        this.isActive = true;
        commonConfig = commonMethods.assign(commonConfig, ROOT.commonConfig);
        for (var val in data) {
          if (avConfig[val] !== undefined) avConfig[val] = data[val];
        }
      },
      newMediaConnect: function (callback, onerror) {
        avMethods.initSocket(function (e) {
          if (avConfig.newMediaTar) {
            console.log("new connection clear time out");
            clearTimeout(avConfig.newMediaTar);
          }
          avConfig.newMediaTar = setTimeout(function () {
            avMethods.sendNewMediaHB();
          }, 30000);
          callback();
        }, function (err) {
          onerror(err);
        })
      },
      sendNewMediaMsg: function (obj, callback, onerror) {
        if (!avConfig.isConnect || !avConfig.newMediaWS) {
          commonMethods.logger.info('mediaWS not connect');
          return;
        }
        if (obj.getClientNo) {
          obj["client"] = avMethods.getClientNo(callback, onerror);
          delete obj.getClientNo;
        } else {
          obj["client"] = ++commonConfig.newMediaClientNo + "";
          if (callback || onerror) {
            avConfig.newMediaTimeout[obj["client"]] = {
              callback: callback,
              onerror: onerror
            };
          }
        }
        console.log("new media  send ::::  " + JSON.stringify(obj));
        avConfig.newMediaWS.send(JSON.stringify(obj));
      },
      wsRelease: function (callback, onError) {
        if (avConfig.newMediaWS) {
          var str = {
            "method": "Release",
            "reason": '0',
            "uuid": commonConfig.newMediaCallUUID //挂断
          };
          callback = callback || function () {
          }
          onError = onError || function () {
          };
          self.sendNewMediaMsg(str, callback, onError);
          commonConfig.newMediaUUID = "";
        }
        commonConfig.newMediaUUID = "";
        commonConfig.newMediaCallUUID = "";
        setTimeout(function () {
          console.log('sdk close the newMediaWS connection');
          if (avConfig.newMediaWS && avConfig.newMediaWS.close) {
            avConfig.newMediaWS.close();
            avConfig.newMediaWS = null;
          }
        }, 0);
      },
      unload: function () {
        try {
          avConfig.newMediaWS.close();
          avConfig.newMediaWS.onclose = function () {
          };
          avConfig.newMediaWS = null;
          if (avConfig.newMediaTar)
            clearTimeout(avConfig.newMediaTar);
          avConfig.newMediaTar = null;
          avConfig.isConnecting = false;
          commonConfig.newMediaUUID = null;
          commonConfig.selfssrc = null;
          avConfig.isConnect = false;
          avConfig.isConnecting = false;
        } catch (e) {
          console.log(" Meeting socket has closed ", e);
        }
      }
    }
  }


  //媒体交互构造函数
  function RL_Media() {
    var RL_AV = ROOT.RL_AV;
    var RL_YTX = ROOT.RL_YTX_NEW;
    var self = this;
    var HZRecorder = function (stream, config) {
      config = config || {};
      config.sampleBits = config.sampleBits || 8;
      config.sampleRate = config.sampleRate || (44100 / 6);
      var bufferLen = config.bufferLen || 4096;
      var numChannels = config.numChannels || 2;
      var context = new AudioContext();
      var audioInput = context.createMediaStreamSource(stream);
      var recorder = (context.createScriptProcessor || context.createJavaScriptNode).call(context, bufferLen, numChannels, numChannels);
      var audioData = {
        size: 0,
        buffer: [],
        inputSampleRate: context.sampleRate,
        inputSampleBits: 16,
        outputSampleRate: config.sampleRate,
        oututSampleBits: config.sampleBits,
        input: function (data) {
          this.buffer.push(new Float32Array(data));
          this.size += data.length
        },
        compress: function () {
          var data = new Float32Array(this.size);
          var offset = 0;
          for (var i = 0; i < this.buffer.length; i++) {
            data.set(this.buffer[i], offset);
            offset += this.buffer[i].length
          }
          var compression = parseInt(this.inputSampleRate / this.outputSampleRate);
          var length = data.length / compression;
          var result = new Float32Array(parseInt(length));
          var index = 0,
            j = 0;
          while (index < length) {
            result[index] = data[j];
            j += compression;
            index++
          }
          return result
        },
        encodeWAV: function () {
          var sampleRate = Math.min(this.inputSampleRate, this.outputSampleRate);
          var sampleBits = Math.min(this.inputSampleBits, this.oututSampleBits);
          var bytes = this.compress();
          var dataLength = bytes.length * (sampleBits / 8);
          var buffer = new ArrayBuffer(44 + dataLength);
          var data = new DataView(buffer);
          var channelCount = 1;
          var offset = 0;
          var writeString = function (str) {
            for (var i = 0; i < str.length; i++) {
              data.setUint8(offset + i, str.charCodeAt(i))
            }
          };
          writeString('RIFF');
          offset += 4;
          data.setUint32(offset, 36 + dataLength, true);
          offset += 4;
          writeString('WAVE');
          offset += 4;
          writeString('fmt ');
          offset += 4;
          data.setUint32(offset, 16, true);
          offset += 4;
          data.setUint16(offset, 1, true);
          offset += 2;
          data.setUint16(offset, channelCount, true);
          offset += 2;
          data.setUint32(offset, sampleRate, true);
          offset += 4;
          data.setUint32(offset, channelCount * sampleRate * (sampleBits / 8), true);
          offset += 4;
          data.setUint16(offset, channelCount * (sampleBits / 8), true);
          offset += 2;
          data.setUint16(offset, sampleBits, true);
          offset += 2;
          writeString('data');
          offset += 4;
          data.setUint32(offset, dataLength, true);
          offset += 4;
          if (sampleBits === 8) {
            for (var i = 0; i < bytes.length; i++, offset++) {
              var s = Math.max(-1, Math.min(1, bytes[i]));
              var val = s < 0 ? s * 0x8000 : s * 0x7FFF;
              val = parseInt(255 / (65535 / (val + 32768)));
              data.setInt8(offset, val, true)
            }
          } else {
            for (var i = 0; i < bytes.length; i++, offset += 2) {
              var s = Math.max(-1, Math.min(1, bytes[i]));
              data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true)
            }
          }
          return new Blob([data], {
            type: 'audio/wav'
          })
        }
      };
      this.start = function (obj) {
        audioInput.connect(recorder);
        recorder.connect(context.destination);
        if (!!obj && obj.srcObject) {
          obj.srcObject = stream;
        } else {
          var windowUrl = commonMethods.getWindowURL();
          if (!!obj && !!windowUrl) {
            var url = windowUrl.createObjectURL(stream);
            obj.src = url
          }
        }
      }, this.stop = function () {
        recorder.disconnect();
        Webrtc.stopMediaStream(stream)
      }, this.getBlob = function () {
        this.stop();
        return audioData.encodeWAV()
      }, this.play = function (audio) {
        var windowUrl = commonMethods.getWindowURL();
        audio.src = windowUrl.createObjectURL(this.getBlob())
      }, recorder.onaudioprocess = function (e) {
        audioData.input(e.inputBuffer.getChannelData(0))
      };
    };
    HZRecorder.throwError = function (message) {
      throw new function () {
        this.toString = function () {
          return message;
        }
      };
    };
    HZRecorder.get = function (callback, config) {
      if (callback) {
        var userMedia = Webrtc.getUserMedia();
        if (userMedia) {
          if (HZRecorder.recorderIndex === 0) {
            HZRecorder.recorderIndex = 1;
            mediaMethods.getUserMediaPermission(false, function (stream) {
              var rec = new HZRecorder(stream, config);
              callback(rec);
              HZRecorder.recorderIndex = 0
            }, function (error) {
              switch (error.code || error.name) {
                case 'PERMISSION_DENIED':
                case 'PermissionDeniedError':
                  HZRecorder.throwError('用户拒绝提供信息。');
                  break;
                case 'NOT_SUPPORTED_ERROR':
                case 'NotSupportedError':
                  HZRecorder.throwError('浏览器不支持硬件设备。');
                  break;
                case 'MANDATORY_UNSATISFIED_ERROR':
                case 'MandatoryUnsatisfiedError':
                  HZRecorder.throwError('无法发现指定的硬件设备。');
                  break;
                default:
                  HZRecorder.throwError('无法打开麦克风。异常信息:' + (error.code || error.name));
                  break;
              }
              HZRecorder.recorderIndex = 0
            })
          }
        } else {
          HZRecorder.throwError('当前浏览器不支持录音功能。');
          return
        }
      }
    };
    var mediaConfig = {
      photoConfig: {
        mediaStream: null,
        video: null,
        state: 1
      },
      audioConfig: {
        audio: null,
        recorder: null,
        state: 1
      },
      videoConfig: {},
      voipCallData: {
        callEventCallId: null,
        called: null,
        caller: null,
        inviteSdp: null,
        connected: false,
        voipCallType: '',
        msgRouterMap: {},
        meetRouterMap: {},
        needVideo: false,
        needAudio: false
      },
      meetingCallData: {
        inviteSdp: null,
        voipMixedAudio: null,
        voipLocalView: null,
      },
      flag: false, //是否是会议通知
      uuid: '',
      mediaCount: 0,
      voipTimer: null,
      voipTimestamp: 0,
      recordVideo: null,
      sendAnswerCount: 0,
      sendOfferCount: 0,
      sendMeetAnswerCount: 0,
      sendMeetOfferCount: 0,
      SDP: '',
      sendVoipData: {},
      lineLimit: 0
    };
    var mediaMethods = {
      _voipListener: function () {
      },
      releaseCallback: function () {
      },
      releaseCallbackError: function () {
      },
      sendRelease: function (memberid, callback, onError) {
        var uuid = null;
        if (memberid === commonConfig.userName) {
          uuid = mediaConfig.newMediaUUID;
        } else {
          uuid = commonConfig.membersUUID[memberid];
        }
        if (!uuid) {
          if (!!onError) {
            var resp = {};
            resp.code = commonConfig.errCode._WSG_RELEASEVIDEO_NOT_REQ;
            resp.msg = "has not reqest member video before.";
            onError(resp);
          }
          return;
        }
        var obj = {
          method: 'Release',
          uuid: uuid,
          reason: '',
          getClientNo: true
        };
        RL_AV.sendNewMediaMsg(obj, callback, onError);
        callback();
      },
      releaseMeetingVoip: function () {
        commonConfig.isInMeeting = false;
        //释放所有资源,先发送release到wsg，成功以后再释放资源
        for (var memberid in commonConfig.peerConnectionMap) {
          Webrtc.webrtcRealease(memberid);
          mediaMethods.sendRelease(memberid, function () {
          }, function () {
          });
        }
        mediaMethods.sendRelease(commonConfig.userName, function () {
        }, function (err) {
        });
        commonConfig.isInMeeting = false;
        mediaConfig.newMediaUUID = null;
        commonConfig.selfssrc = null;
        if (!!commonConfig.localMediaStream) {
          Webrtc.stopMediaStream(commonConfig.localMediaStream)
        }
        if (commonConfig.peerConnection != null) {
          if (commonConfig.peerConnection.signalingState !== "closed") {
            commonConfig.peerConnection.close();
            commonConfig.peerConnection = null;
          }
          Webrtc.processAVStream(mediaConfig.meetingCallData.voipMixedAudio, null);
          mediaConfig.meetingCallData.voipMixedAudio = null;
          if (mediaConfig.meetingCallData.voipLocalView) {
            Webrtc.processAVStream(mediaConfig.meetingCallData.voipLocalView, null);
            mediaConfig.meetingCallData.voipLocalView = null;
          }
        }

        mediaConfig.voipCallData.meetRouterMap = {};
        mediaConfig.voipCallData.connected = false;
        mediaConfig.voipCallData.callEventCallId = null;
        commonConfig.localMediaStream = null;
        mediaConfig.meetingCallData.inviteSdp = null;
        mediaConfig.flag = false;
      },
      releaseVoip: function () {
        RL_AV.wsRelease();
        if (!!commonConfig.localMediaStream) {
          Webrtc.stopMediaStream(commonConfig.localMediaStream)
        }
        if (commonConfig.peerConnection) {
          console.log('signalingState---', commonConfig.peerConnection.signalingState);
          if (commonConfig.peerConnection.signalingState !== "closed") {
            commonConfig.peerConnection.close();
            commonConfig.peerConnection = null;
          }
          Webrtc.processAVStream(commonConfig.voipOtherView, null);
          commonConfig.voipOtherView = null;
          if (commonConfig.voipLocalView) {
            Webrtc.processAVStream(commonConfig.voipLocalView, null);
            commonConfig.voipLocalView = null;
          }
        }
        mediaConfig.voipCallData.connected = false;
        mediaConfig.voipCallData.callEventCallId = null;
        commonConfig.peerConnection = null;
        mediaConfig.voipCallData.inviteSdp = null;
        commonConfig.localMediaStream = null;
      },
      //消息解析
      processSDP: function (strSDP) {
        // console.log("begin strSdp:", strSDP);
        strSDP = strSDP.replace(/level-asymmetry-allowed=*;/, "").replace(/;profile-level-id=*\\r\\n/, "\\r\\n");
        var tabStr = '';
        if (strSDP.indexOf('\r\n') > 0) {
          tabStr = '\r\n';
        } else if (strSDP.indexOf('\r') > 0) {
          tabStr = '\r';
        } else if (strSDP.indexOf('\n') > 0) {
          tabStr = '\n';
        }
        var arr = strSDP.split('m=');
        var sendSDP = '';
        var arrLength = arr.length;
        var deleteCode = {};
        for (var i = 0; i < arrLength; i++) {
          var subStr = arr[i];
          if (subStr.substr(0, 2) == 'v=') {
            sendSDP += subStr;
            continue;
          }
          var typeIdx = subStr.indexOf(tabStr);
          var typeHead = subStr.substr(0, typeIdx);
          var headArr = typeHead.split(' ');
          var newHead = 'm=';
          var headArrLength = headArr.length;
          for (var j = 0; j < headArrLength; j++) {
            if (j < 3) {
              newHead += headArr[j] + ' '
            }
          }
          newHead = newHead.substr(0, newHead.length - 1);
          if (newHead.indexOf("audio") > -1)
            if (typeHead.indexOf("0 8") > -1) {
              newHead += " 0 8"
            }
          var typeBody = subStr.substr(typeIdx + tabStr.length);
          var newBody = '';
          var bodyArr = typeBody.split(tabStr);
          var localIp = '';
          var bodyArrLength = bodyArr.length;
          for (var j = 0; j < bodyArrLength; j++) {
            if (bodyArr[j].indexOf('candidate') > 0) {
              var candiArry = bodyArr[j].split(' ');
              if (candiArry[4].indexOf('.') > -1 && localIp.length === 0) {
                localIp = candiArry[4];
                break;
              }
            }
          }
          for (var j = 0; j < bodyArrLength; j++) {
            if (commonConfig.selfssrc) {
              break;
            }
            //获取selfssrc
            if (!commonConfig.selfssrc && bodyArr[j].indexOf('ssrc') > 0) {
              var p = bodyArr[j];
              var ssrc = p.substr(p.indexOf("ssrc:") + 5, p.indexOf(" ") - 7);
              commonConfig.selfssrc = ssrc;
            }
          }

          for (var e = 0; e < bodyArrLength; e++) {
            if (bodyArr[e].indexOf('rtpmap') > 0) {
              var eIdx = bodyArr[e].indexOf(' ');
              var sIdx = bodyArr[e].indexOf(':');
              var code = bodyArr[e].substring(sIdx + 1, eIdx);
              if (bodyArr[e].indexOf('ISAC') > 0 || bodyArr[e].indexOf('G722') > 0 || bodyArr[e].indexOf('rtx') > 0 || bodyArr[e].indexOf('opus') > 0) {
                deleteCode[code] = true;
              }
            }
          }

          for (var j = 0; j < bodyArrLength; j++) {
            if (bodyArr[j].indexOf("callid") > 0 || bodyArr[j].indexOf("caller:") > 0) {
              continue;
            } else if (bodyArr[j].indexOf('rtpmap') > 0) {
              var eIdx = bodyArr[j].indexOf(' ');
              var sIdx = bodyArr[j].indexOf(':');
              var code = bodyArr[j].substring(sIdx + 1, eIdx);

              if (!deleteCode[code]) {
                newHead += ' ' + code;
                newBody += tabStr + bodyArr[j];
              }
            } else if (bodyArr[j].indexOf('fmtp') > 0) {

              var startPoint = bodyArr[j].indexOf('fmtp:');
              var endPoint = bodyArr[j].indexOf(" ");
              var currentCode = bodyArr[j].substr(startPoint + 5, endPoint - startPoint - 5);
              if (!deleteCode[currentCode]) {
                newBody += tabStr + bodyArr[j];
              }
            } else if (bodyArr[j].indexOf('rtcp-fb:') > 0) {
              var startPoint = bodyArr[j].indexOf('rtcp-fb:');
              var endPoint = bodyArr[j].indexOf(" ");
              var currentCode = bodyArr[j].substr(startPoint + 8, endPoint - startPoint - 8);
              if (!deleteCode[currentCode]) {
                newBody += tabStr + bodyArr[j];
              }
            } else if (bodyArr[j].indexOf('candidate') > 0) {
              if (bodyArr[j].indexOf('.') > 0) {
                newBody += tabStr + bodyArr[j];
              } else {
                continue;
              }
            } else if (bodyArr[j].indexOf('c=') == 0) {
              newBody += localIp.length > 0 ? (tabStr + "c=IN IP4 " + localIp) : (tabStr + bodyArr[j]);
            } else if (bodyArr[j].indexOf("self=") > -1 || bodyArr[j].indexOf("partner") > -1) {
              continue;
            } else {
              newBody += tabStr + bodyArr[j];
            }
          }
          sendSDP += newHead + newBody;
        }
        console.log(sendSDP);
        return sendSDP;
      },
      parseCallEventData: function (obj) {
        var data = obj["2"];
        var resp = {};
        if (!data) {
          return resp;
        }
        data = data["CallEventData"];
        resp = {
          callEvent: data[1],
          callId: data[2],
          isVoipCall: data[3],
          called: data[5],
          caller: data[7],
          userData: data[13],
          strSDP: data[17],
          reason: data[10]
        };
        return resp
      },
      parseMeetingVoip: function (callEventData) {
        if (!mediaConfig.voipCallData.callEventCallId && callEventData.callEvent !== 1) {
          delete mediaConfig.voipCallData.msgRouterMap[callEventData.callId];
          if (!!mediaMethods.releaseCallbackError && callEventData.callEvent === 10) {
            var obj = {
              code: callEventData.reason,
              msg: "cancel meeting error"
            };
            mediaMethods.releaseCallbackError(obj);
            return;
          }
          if (!!mediaMethods.releaseCallback) {
            var obj = {
              callId: callEventData.callId
            };
            mediaMethods.releaseCallback(obj);
            return;
          }
          return;
        }
        if (mediaConfig.voipCallData.callEventCallId !== callEventData.callId &&
          callEventData.callEvent !== 1) {
          return;
        }
        if (callEventData.callEvent === 1) {
          //新版会议用户不会作为被叫方，所以不会收到CallEvent的数据
        } else if (callEventData.callEvent === 2) {
          mediaMethods._voipListener({
            callId: callEventData.callId,
            caller: callEventData.caller,
            called: callEventData.called,
            userdata: callEventData.userData,
            state: 1,
            msg: 'calling',
            code: 200
          });
          mediaMethods.voipReply200(callEventData);
        } else if (callEventData.callEvent === 3) {
          if (!!callEventData.strSDP && commonConfig.peerConnection) {
            Webrtc.setRemoteDesc(callEventData.strSDP, "answer", function () {
            }, function (err) {
              console.log("RemoteError" + err)
            });
          }
          mediaMethods._voipListener({
            callId: callEventData.callId,
            caller: callEventData.caller,
            called: callEventData.called,
            userdata: callEventData.userData,
            state: 1,
            msg: 'calling',
            code: 200
          });
        } else if (callEventData.callEvent === 4) {
          if (!callEventData.strSDP) {
            return;
          }
          mediaMethods.sendMeetingAck(callEventData);
          mediaConfig.voipCallData.connected = true;
          mediaMethods._voipListener({
            callId: callEventData.callId,
            caller: callEventData.caller,
            called: callEventData.called,
            userdata: callEventData.userData || '',
            msg: 'opposite side accept',
            code: 200
          });
        } else if (callEventData.callEvent === 6) {
          commonConfig.isInMeeting = true;
          mediaConfig._voipListener({
            callId: callEventData.callId,
            caller: callEventData.caller,
            called: callEventData.called,
            userdata: callEventData.userData,
            reason: '0',
            state: 7,
            msg: 'the call has established',
            code: 200
          });

        } else if (callEventData.callEvent === 7 || callEventData.callEvent === 8) {
          mediaMethods._voipListener({
            callId: callEventData.callId,
            caller: callEventData.caller,
            called: callEventData.called,
            userdata: callEventData.userData,
            reason: '0',
            state: 5,
            msg: 'the call was stoped',
            code: 200
          });
          if (commonConfig.isInMeeting) {
            mediaMethods.releaseMeetingVoip();
            commonConfig.isInMeeting = false;
          }
          mediaMethods.voipReply200(callEventData);
          delete mediaConfig.voipCallData.msgRouterMap[callEventData.callId];
        } else if (callEventData.callEvent === 10) {
          mediaMethods._voipListener({
            callId: callEventData.callId,
            caller: callEventData.caller,
            called: callEventData.called,
            userdata: callEventData.userData,
            state: 4,
            reason: ("175" + callEventData.reason) || '0',
            msg: "calling failed , maybe opposite side is busying",
            code: 200
          });
          mediaMethods.releaseMeetingVoip();
          mediaMethods.voipReply200(callEventData);
          delete mediaConfig.voipCallData.msgRouterMap[callEventData.callId];
        } else if (callEventData.callEvent === 11 || callEventData.callEvent === 12) {
          mediaMethods.voipReply200(callEventData);
        } else if (callEventData.callEvent === 15) {
          callEventData.callEvent = 16;
          callEventData.strSDP = undefined;
          if (mediaConfig.voipCallData.connected) {
            callEventData.reason = 0;
          }
          mediaMethods.buildCallEvent(callEventData, function () {
          }, function () {
          });
        }
      },
      processVoip: function (callEventData) {
        if (!mediaConfig.voipCallData.callEventCallId && callEventData.callEvent !== 1) {
          delete mediaConfig.voipCallData.msgRouterMap[callEventData.callId];
          if (!!mediaMethods.releaseCallbackError && callEventData.callEvent === 10) {
            var obj = {
              code: callEventData.reason,
              msg: "cancel voip error"
            };
            mediaMethods.releaseCallbackError(obj);
            return;
          }
          if (!!mediaMethods.releaseCallback) {
            var obj = {
              callId: callEventData.callId,
              calltype: mediaConfig.voipCallData.voipCallType
            };
            mediaMethods.releaseCallback(obj);
            return;
          }
          return;
        }
        if (mediaConfig.voipCallData.callEventCallId !== callEventData.callId && callEventData.callEvent !== 1) {
          return;
        }
        var listenData = {
          callId: callEventData.callId,
          caller: callEventData.caller,
          called: callEventData.called,
          userdata: callEventData.userData,
        }
        if (callEventData.callEvent === 1) {
          if (!mediaConfig.voipCallData.callEventCallId) {
            mediaConfig.voipCallData.callEventCallId = callEventData.callId;
            mediaConfig.voipCallData.caller = callEventData.caller;
            mediaConfig.voipCallData.called = callEventData.called;
            var sdpStr = callEventData.strSDP;
            mediaConfig.voipCallData.inviteSdp = sdpStr;
            var type = 0;
            if (sdpStr.indexOf('m=audio') > -1) {
              if (sdpStr.indexOf('m=video') > -1) {
                type = 1;
              }
            }
            var code = (!Webrtc.getUserMedia() || !Webrtc.getPeerConnection()) ? commonConfig.errCode._NOT_SUPPORT_CALL : 200;
            mediaConfig.voipCallData.voipCallType = type;
            mediaMethods._voipListener(commonMethods.assign(listenData, {
              msg: "calling",
              callType: type,
              state: 6,
              code: code
            }));
            if (code === 200) {
              callEventData.callEvent = 2;
              callEventData.strSdp = undefined;
              mediaMethods.buildCallEvent(callEventData, function () {
              }, function () {
              });
            } else {
              callEventData.callEvent = 10;
              callEventData.strSDP = undefined;
              callEventData.reason = 603;
              mediaMethods.buildCallEvent(callEventData, function () {
              }, function () {
              });
              mediaConfig.voipCallData.callEventCallId = null;
            }
          } else if (callEventData.callId !== mediaConfig.voipCallData.callEventCallId) {
            callEventData.callEvent = 10;
            callEventData.reason = '486';
            callEventData.strSDP = undefined;
            mediaMethods.buildCallEvent(callEventData, function () {
            }, function () {
            });
          }
        } else if (callEventData.callEvent === 2) {
          mediaMethods._voipListener(commonMethods.assign(listenData, {
            state: 1,
            callType: mediaConfig.voipCallData.voipCallType,
            msg: 'calling',
            code: 200
          }));
          mediaMethods.voipReply200(callEventData);
        } else if (callEventData.callEvent === 3) {
          if (!!callEventData.strSDP) {
            Webrtc.setRemoteDesc(callEventData.strSDP, "answer", function () {
            }, function (err) {
              console.log("RemoteError" + err)
            });
          }
          mediaMethods._voipListener(commonMethods.assign(listenData, {
            state: 1,
            msg: 'calling',
            callType: mediaConfig.voipCallData.voipCallType,
            code: 200
          }));
        } else if (callEventData.callEvent === 4) {
          if (!callEventData.strSDP) {
            return;
          }
          mediaMethods.sendAck(callEventData);
          mediaConfig.voipCallData.connected = true;
          mediaMethods._voipListener(commonMethods.assign(listenData, {
            state: 3,
            msg: "opposite side accept",
            callType: mediaConfig.voipCallData.voipCallType,
            code: 200
          }));
        } else if (callEventData.callEvent === 6) {
          mediaMethods._voipListener(commonMethods.assign(listenData, {
            reason: '0',
            state: 7,
            callType: mediaConfig.voipCallData.voipCallType,
            msg: 'the call has established',
            code: 200
          }));
        } else if (callEventData.callEvent === 7 || callEventData.callEvent === 8) {
          mediaConfig.mediaCount = 0;
          mediaMethods._voipListener({
            reason: '0',
            state: 5,
            msg: "the call was stoped",
            code: 200,
            callType: mediaConfig.voipCallData.voipCallType
          });
          mediaMethods.releaseVoip();
          mediaMethods.voipReply200(callEventData);
          delete mediaConfig.voipCallData.msgRouterMap[callEventData.callId];
          clearInterval(mediaConfig.voipTimer);
          mediaConfig.voipTimestamp = 0;
        } else if (callEventData.callEvent === 10) {
          mediaConfig.mediaCount = 0;
          mediaMethods._voipListener({
            reason: "175" + callEventData.reason || '',
            code: 200,
            callType: mediaConfig.voipCallData.voipCallType,
            state: 4,
            msg: "calling failed , maybe opposite side is busying"
          });
          mediaMethods.releaseVoip();
          mediaMethods.voipReply200(callEventData);
          delete mediaConfig.voipCallData.msgRouterMap[callEventData.callId];
        } else if (callEventData.callEvent === 11 || callEventData.callEvent === 12) {
          mediaMethods.voipReply200(callEventData);
        } else if (callEventData.callEvent === 15) {
          callEventData.callEvent = 16;
          callEventData.strSDP = undefined;
          if (mediaConfig.voipCallData.connected) {
            callEventData.reason = 0;
          }
          mediaMethods.buildCallEvent(callEventData, function () {
          }, function () {
          });
        }
      },
      //消息发送
      handleRecvSDP: function (sdp, called, callback) {
        //debugger;
        var obj = {};
        obj["method"] = "HandleH5RecvSDP";
        obj["sdp"] = sdp;
        obj["caller"] = commonConfig.userName;
        obj["callee"] = called;
        obj["uuid"] = mediaConfig.newMediaUUID;
        obj.getClientNo = true;
        RL_AV.sendNewMediaMsg(obj, callback);
      },
      newMeidaReceiveSDP: function (obj, callback, onerror) {
        console.log('newMeidaReceiveSDP', obj);
        //debugger;
        var str = {
          "method": "HandleH5RecvSDP",
          "sdp": obj.sdp,
          "caller": obj.caller,
          "callee": obj.called,
          "uuid": obj.uuid //媒体服务器回复
        };
        console.log(str);
        RL_AV.sendNewMediaMsg(str, callback, onerror);

      },
      sendAck: function (callEventData) {
        var receiverSdp = callEventData.strSDP;
        var pc = commonConfig.peerConnection;
        if (!pc) {
          return;
        }
        callEventData.callEvent = 6;
        callEventData.strSDP = undefined;
        if (pc.getReceivers) console.log('pc.getReceivers---', pc.getReceivers());
        if (pc.getRemoteStreams) console.log('pc.getRemoteStreams---', pc.getRemoteStreams());
        mediaMethods.buildCallEvent(callEventData, function () {
        }, function () {
          console.log("send ack err");
        });
        mediaConfig.voipCallData.connected = true;
        RL_AV.newMediaConnect(function () {
          mediaMethods.newMeidaReceiveSDP({
            "sdp": receiverSdp,
            "caller": callEventData.caller,
            "callee": callEventData.called,
            "uuid": commonConfig.newMediaCallUUID //被叫时为空
          }, function (obj) {
            Webrtc.setRemoteDesc(mediaMethods.processSDP(obj.sdp), "answer", function () {
            }, function (err) {
              console.error("RemoteError" + err);
            });
          })
        });

      },
      sendMeetingAck: function (callEventData) {
        var receiverSdp = callEventData.strSDP;
        var pc = commonConfig.peerConnection;
        if (!pc) {
          return;
        }
        mediaMethods.sendAck(callEventData);

        var called = callEventData.called;
        mediaMethods.handleRecvSDP(receiverSdp, called, function (sdp) {
          sdp = mediaMethods.processSDP(sdp);
          Webrtc.setRemoteDesc(sdp, "answer", function () {
            mediaMethods._voipListener({
              state: 16,
              code: 200,
              msg: "Meeting connction has established;",
              caller: callEventData.caller,
              called: callEventData.called
            });
          }, function (err) {
            console.log("RemoteError" + err);
          });
        });
      },
      voipReply200: function (callEventData) {
        callEventData.callEvent = 4;
        callEventData.strSDP = undefined;
        mediaMethods.buildCallEvent(callEventData, function () {
        }, function () {
        });
      },
      buildCallEvent: function (callEventData, callback, onError) {
        if (!callEventData.caller || !callEventData.called) {
          var resp = {};
          resp.code = commonConfig.errCode._NO_REQUIRED_PARAM;
          resp.msg = 'param called or caller is empty';
          onError(resp);
          return
        }
        var sendObj = {
          1: callEventData.callEvent,
          2: callEventData.callId,
          5: callEventData.called,
          7: callEventData.caller
        };
        var isVoipCallArr = [0, 1, 2];
        if (isVoipCallArr.indexOf(parseInt(callEventData.isVoipCall)) > -1) sendObj[3] = callEventData.isVoipCall;
        if (callEventData.reason) sendObj[10] = callEventData.reason;
        if (callEventData.userData) sendObj[13] = callEventData.userData;
        if (callEventData.strSDP) sendObj[17] = callEventData.strSDP;

        var MsgLiteObj = {
          1: commonConfig.msgTypeNo._callRoute
        };
        var callstr = null;
        if (callEventData.called.indexOf("nconf") > -1) {
          callstr = callEventData.called.substr(5);
        } else if (callEventData.caller.indexOf("nconf") > -1) {
          callstr = callEventData.caller.substr(5);
        }
        if (callstr) {
          MsgLiteObj[9] = mediaConfig.voipCallData.meetRouterMap[callstr]
        } else if (mediaConfig.voipCallData.msgRouterMap[callEventData.callId]) {
          MsgLiteObj[9] = mediaConfig.voipCallData.msgRouterMap[callEventData.callId]
        }
        RL_YTX.sendMsg({
          sendObj: sendObj,
          MsgLiteObj: MsgLiteObj,
          msgKey: 'CallEventDataInner',
          clientData: {
            msgId: callEventData.callId
          },
        }, callback, onError);
      },
      newMeidaSendSDP: function (obj, type, callback, onerror) {
        var uuidValue = type === "2" ? commonConfig.newMediaCallUUID : '';
        RL_AV.sendNewMediaMsg({
          "method": "HandleH5SendSDP",
          "sdp": obj.sdp,
          "caller": obj.caller,
          "callee": obj.called,
          "uuid": uuidValue, //主叫时为空
          getClientNo: obj.getClientNo
        }, callback, onerror);
      },
      sendOffer: function (callEventData, callback, onError) {
        var pc = commonConfig.peerConnection;
        mediaConfig.sendOfferCount++;
        console.log('mediaConfig.sendOfferCount---', mediaConfig.sendOfferCount);
        console.log(pc);
        if ((pc.iceGatheringState === "complete" || mediaConfig.sendOfferCount > 10) && mediaConfig.sendOfferCount > 0) {
          console.log("+++ sendOffer " + mediaConfig.sendOfferCount);
          mediaConfig.sendOfferCount = -100;
          var strSDP = pc.localDescription.sdp;
          var preSDP = mediaMethods.processSDP(strSDP);

          var state = 2;
          var msg = "calling";
          console.log('mediaConfig.callEventCallId---', mediaConfig.voipCallData.callEventCallId);
          console.log('callEventData.callId---', callEventData.callId);
          if (callEventData.callId === mediaConfig.voipCallData.callEventCallId) {
            console.log("new media  :::  sendOffer=> ");
            RL_AV.newMediaConnect(function () {
              mediaMethods.newMeidaSendSDP({
                sdp: preSDP,
                caller: callEventData.caller,
                called: callEventData.called
              }, '1', function (obj) {
                console.log(obj);
                console.log("calllalallalalal  back ");
                callEventData.strSDP = mediaMethods.processSDP(obj.sdp);
                mediaMethods.buildCallEvent(callEventData, callback, onError);
                mediaConfig.voipCallData.voipCallType = callEventData.isVoipCall;
                mediaMethods._voipListener({
                  msg: msg,
                  state: state,
                  callId: callEventData.callId,
                  caller: callEventData.caller,
                  called: callEventData.called,
                  userdata: callEventData.userData,
                  callType: callEventData.isVoipCall,
                  code: 200
                });
              }, function (err) {
                console.log(err);
              });
            }, function (err) {
              console.log(err);
            });
          } else {
            state = 4;
            msg = "calling failed , maybe opposite side is busying";
          }

        } else {
          if (mediaConfig.sendOfferCount > -1) {
            window.setTimeout(function () {
              mediaMethods.sendOffer(callEventData, callback, onError);
            }, 200)
          }

        }
      },
      sendOfferFn: function (desc, reset, callback, onError) {
        mediaConfig.mediaCount++;
        if ((commonConfig.peerConnection.iceGatheringState === "complete" || mediaConfig.mediaCount > 10) && mediaConfig.mediaCount > 0) {
          console.log("+++ sendOffer " + mediaConfig.mediaCount);
          mediaConfig.mediaCount = -100;
          var strSDP = commonConfig.peerConnection.localDescription.sdp;
          var preSDP = mediaMethods.processSDP(strSDP);
          mediaConfig.sendVoipData.strSDP = mediaMethods.processSDP(preSDP);
          var state = 2;
          var msg = "calling";
          if (mediaConfig.sendVoipData.callId === mediaConfig.voipCallData.callEventCallId) {
            mediaMethods.buildCallEvent(mediaConfig.sendVoipData, callback, onError);
          } else {
            state = 4;
            msg = "calling failed , maybe opposite side is busying"
          }
          var resp = {};
          resp.callId = mediaConfig.sendVoipData.callId;
          resp.caller = mediaConfig.sendVoipData.caller;
          resp.called = mediaConfig.sendVoipData.called;
          resp.userdata = mediaConfig.sendVoipData.userData;
          resp.msg = msg;
          resp.state = state;
          mediaConfig.voipCallData.voipCallType = mediaConfig.sendVoipData.isVoipCall;
          resp.callType = mediaConfig.sendVoipData.isVoipCall;
          resp.code = 200;
          mediaMethods._voipListener({
            msg: msg,
            state: state,
            callId: mediaConfig.sendVoipData.callId,
            caller: mediaConfig.sendVoipData.caller,
            called: mediaConfig.sendVoipData.called,
            userdata: mediaConfig.sendVoipData.userData,
            callType: mediaConfig.sendVoipData.isVoipCall
          });
        } else if (mediaConfig.mediaCount > -1) {
          window.setTimeout(function () {
            mediaMethods.sendOfferFn(desc, reset, callback, onError);
          }, 200)
        }
      },
      sendMeetOffer: function (callEventData, callback, onError) {
        mediaConfig.sendMeetOfferCount++;
        var pc = commonConfig.peerConnection;
        if (pc.iceGatheringState === "complete" && mediaConfig.sendMeetOfferCount > 0 || mediaConfig.sendMeetOfferCount === 10) {
          console.log("+++ sendOffer " + mediaConfig.sendMeetOfferCount);
          mediaConfig.sendMeetOfferCount = -100;
          var strSDP = pc.localDescription.sdp;
          // 从mwsg获取处理后的sdp
          console.log('sendMeetOffer data', callEventData)
          mediaMethods.newMeidaSendSDP({
            sdp: strSDP,
            caller: callEventData.caller,
            called: callEventData.called,
            getClientNo: true
          }, '1', function (res) {
            //本地处理sdp字符串
            var preSDP = mediaMethods.processSDP(res);
            callEventData.strSDP = preSDP;
            var state = 2;
            var msg = "calling";
            if (callEventData.callId === mediaConfig.voipCallData.callEventCallId) {
              mediaMethods.buildCallEvent(callEventData, function (e) {
                e["stream"] = commonConfig.localMediaStream;
                callback(e)
              }, onError);
              mediaConfig.flag = true;
            } else {
              state = 4;
              msg = "calling failed , maybe opposite side is busying";
            }

            if (!!mediaMethods._voipListener) {
              mediaMethods._voipListener({
                callId: callEventData.callId,
                caller: callEventData.caller,
                called: callEventData.called,
                userdata: callEventData.userData,
                msg: msg,
                state: state,
                code: 200
              });
            }
          }, onError);
        } else {
          if (mediaConfig.sendMeetOfferCount > 0)
            window.setTimeout(function () {
              mediaMethods.sendMeetOffer(callEventData, callback, onError)
            }, 200)
        }
      },
      sendAnswer: function (desc, callEventData, callback, onError) {
        var pc = commonConfig.peerConnection;
        mediaConfig.sendAnswerCount++;
        if (pc.iceGatheringState === "complete" || mediaConfig.sendAnswerCount > 10) {
          console.log("+++ sendAnswer " + mediaConfig.sendAnswerCount);
          RL_AV.newMediaConnect(function () {
            console.log("new media  :::  sendAnswerFn=> ");
            mediaMethods.newMeidaSendSDP({
              sdp: desc.sdp,
              caller: callEventData.caller,
              called: callEventData.called
            }, "2", function (obj) {
              var preSDP = mediaMethods.processSDP(obj.sdp);
              callEventData.strSDP = preSDP;
              if (callEventData.callId === mediaConfig.voipCallData.callEventCallId) {
                mediaMethods.buildCallEvent(callEventData, callback, onError);
                mediaConfig.voipCallData.connected = true;
                callback({
                  code: '200'
                });
              }
            });
          });

        } else {
          window.setTimeout(function () {
            mediaMethods.sendAnswer(desc, callEventData, callback, onError);
          }, 200)
        }
      },
      sendMeetAnswer: function (memberid, uuid) {
        mediaConfig.sendMeetAnswerCount++;
        var pc = commonConfig.peerConnection;
        if (pc.iceGatheringState === "complete" && mediaConfig.sendMeetAnswerCount > 0 || mediaConfig.sendMeetAnswerCount === 10) {
          commonMethods.logger.info("+++ mwsg sendAnswer " + mediaConfig.sendMeetAnswerCount);
          mediaConfig.sendMeetAnswerCount = -100;
          var strSDP = pc.localDescription.sdp;
          //向mwsg发送answer
          var preSDP = mediaMethods.processSDP(strSDP);
          var obj = {
            method: 'ReqVideoAnswerSDP',
            memberid: memberid,
            uuid: uuid,
            ret: 200,
            sdp: preSDP,
            getClientNo: true
          };
          RL_AV.sendNewMediaMsg(obj, function () {
          }, function () {
          });
        } else {
          if (mediaConfig.sendMeetAnswerCount > -1) {
            window.setTimeout(function () {
              mediaMethods.sendMeetAnswer();
            }, 200)
          }
        }
      },
      getUserMediaPermission: function (data, callback, onerror) {
        data.needAudio = (data.needAudio === undefined || data.needAudio === true) ? true : false;
        mediaConfig.voipCallData.needVideo = data.isVideo;
        mediaConfig.voipCallData.needAudio = data.needAudio;
        console.log('data---', JSON.stringify(data));
        try {
          navigator.mediaDevices.getUserMedia({
            audio: data.needAudio,
            video: data.isVideo
          }).then(function (stream) {
            console.log('stream', stream);
            if (!mediaConfig.voipCallData.needVideo && !("getTracks" in stream && mediaConfig.videoConfig.type === 2)) {
              callback(stream, data.asAudio);
              return;
            }
            var mst = stream.getVideoTracks()[0];
            if (!mst || !("applyConstraints" in mst)) {
              callback(stream, data.asAudio);
              console.log("not support constraints");
              return;
            }
            try {
              var constraints = {};
              var supp = navigator.mediaDevices.getSupportedConstraints();
              if (supp.width) {
                constraints["width"] = mediaConfig.videoConfig.width;
              }
              if (supp.height) {
                constraints["height"] = mediaConfig.videoConfig.height;
              }
              if (supp.frameRate) {
                constraints["frameRate"] = mediaConfig.videoConfig.frameRate;
              }
            } catch (e) {
              console.log(e);
              callback(stream, data.asAudio);
              return;
            }

            mst.applyConstraints(constraints).then(function () {
              callback(stream, data.asAudio);
              return;
            }).catch(function (err) {
              callback(stream, data.asAudio);
              console.log(err);
            });
          }).catch(function (err) {
            console.log(err);
            if (err && err.name === "DevicesNotFoundError" && mediaConfig.voipCallData.needVideo) {
              mediaMethods.getUserMedia({
                isVideo: false,
                needAudio: data.needAudio,
                asAudio: true
              }, callback, onerror);
              return;
            }
            onerror(err);
          });
        } catch (e) {
          var getUserMedia = Webrtc.getUserMedia();
          if (getUserMedia) {
            getUserMedia({
              "audio": data.needAudio,
              "video": (data.isVideo ? true : false)
            }, function (e) {
              callback(e);
            }, function (err) {
              onerror(err);
            })
          } else {
            var resp = {};
            resp.code = commonConfig.errCode._VOIP_NO_MEDIA;
            resp.msg = 'borwer not support getUserMedia.';
            onerror(resp);
          }
        }
      },
      sendVoip: function (callEventData, callback, onError) {
        console.log('sendVoip', callEventData);
        mediaConfig.sendAnswerCount = 0;
        mediaConfig.sendOfferCount = 0;
        var isCaller = false;
        var isVideo = null;
        if (callEventData.callEvent === 1) {
          if (1 === callEventData.isVoipCall) {
            isVideo = true;
          } else {
            isVideo = false;
          }
        } else {
          if (mediaConfig.voipCallData.voipCallType === 1) {
            isVideo = true;
          } else {
            isVideo = false;
          }
        }
        if (commonConfig.userName === callEventData.caller) {
          isCaller = true;
        }
        console.log('isCaller----', isCaller);
        if (!Webrtc.getPeerConnection()) {
          var resp = {};
          resp.code = commonConfig.errCode._NOT_SUPPORT_CALL;
          resp.msg = 'browers not support call operation';
          onError(resp);
          return;
        }
        if (!commonConfig.voipOtherView) {
          if (callEventData.isVoipCall === 0 || callEventData.isVoipCall === 2) {
            commonConfig.voipOtherView = document.createElement('video');
          } else {
            var resp = {};
            resp.code = commonConfig.errCode._VOIP_NO_VIDEO;
            resp.msg = 'please set view first.';
            onError(resp);
            return;
          }
        }
        Webrtc.buildPeerConnection(function () {

          if (callEventData.deviceId && isVideo) {
            var did = callEventData.deviceId;
            if (did === "environment") {
              isVideo = {
                facingMode: {
                  exact: "environment"
                },
                width: commonConfig.vedioConfig.width,
                height: commonConfig.vedioConfig.height,
                frameRate: commonConfig.vedioConfig.frameRate
              };

            } else if (did === "user") {
              isVideo = {
                facingMode: "user",
                width: commonConfig.vedioConfig.width,
                height: commonConfig.vedioConfig.height,
                frameRate: commonConfig.vedioConfig.frameRate
              };
            } else {
              commonConfig.vedioConfig.type = 2;
              isVideo = {
                optional: [{
                  sourceId: did
                }]
              }
            }
          }
          console.log('isVideo', isVideo);
          mediaMethods.getUserMediaPermission({
            isVideo: isVideo
          }, function (stream) {
            console.log('stream---', stream);
            //添加本地stream
            Webrtc.addLocalStream(stream);
            if (isCaller) {
              Webrtc.createOffer(function (desc) {
                Webrtc.setLocalDescription(desc, function () {
                  mediaConfig.sendOfferCount = 0;
                  mediaMethods.sendOffer(callEventData, callback, onError)
                }, onError);
              }, function (err) {
                console.log("createOfferORAnswer Failed!", err);
              });
            } else {
              console.log('callEventData---', callEventData);
              RL_AV.newMediaConnect(function () {
                mediaMethods.newMeidaReceiveSDP({
                  "method": "HandleH5RecvSDP",
                  "sdp": mediaConfig.voipCallData.inviteSdp,
                  "caller": callEventData.caller,
                  "called": callEventData.called,
                  "uuid": ""//被叫时为空
                }, function (obj) {
                  Webrtc.setRemoteDesc(mediaMethods.processSDP(obj.sdp), "offer", function () {
                    var constraints = {
                      mandatory: {
                        OfferToReceiveAudio: true,
                        OfferToReceiveVideo: isVideo
                      }
                    };
                    Webrtc.createAnswer(constraints, function (desc) {
                      Webrtc.setLocalDescription(desc, function () {
                        mediaConfig.sendAnswerCount = 0;
                        mediaMethods.sendAnswer(desc, callEventData, callback, onError)
                      }, onError);
                    }, function (err) {
                      console.log("createOfferORAnswer Failed!", err);
                    });
                  }, function (err) {
                    console.log("RemoteError" + err);
                  });
                })
              })

            }
          }, function (err) {
            commonConfig.peerConnection.close();
            var resp = {};
            resp.code = commonConfig.errCode._VOIP_MEDIA_ERROR;
            resp.msg = 'get media stream error.' + err.name + ":" + err.message;
            resp.err = err.name;
            onError(resp);
          })
        }, onError);

      },
      sendMeetingVoip: function (callEventData, callback, onError) {
        console.log('sendMeetingVoip', JSON.stringify(callEventData))
        var isVideo = null;
        if (callEventData.callEvent === 1) {
          if (1 === callEventData.isVoipCall) {
            isVideo = true;
          } else {
            isVideo = false;
          }
        } else {
          if (1 === mediaConfig.voipCallData.voipCallType) {
            isVideo = true;
          } else {
            isVideo = false;
          }
        }
        console.log('isVideo---', isVideo);
        if (!Webrtc.getPeerConnection()) {
          var resp = {};
          resp.code = commonConfig.errCode._NOT_SUPPORT_CALL;
          resp.msg = 'browers not support call operation';
          onError(resp);
        }
        Webrtc.buildPeerConnection(function () {
          //会议中，如果未设置audio，则在内存中创建一个
          if (!mediaConfig.meetingCallData.voipMixedAudio) {
            mediaConfig.meetingCallData.voipMixedAudio = document.createElement("video");
          }
          var pc = commonConfig.peerConnection;

          if (callEventData.deviceId && isVideo) {
            var did = callEventData.deviceId;
            if (did === "environment") {
              isVideo = {
                facingMode: {
                  exact: "environment"
                },
                width: mediaConfig.vedioConfig.width,
                height: mediaConfig.vedioConfig.height,
                frameRate: mediaConfig.vedioConfig.frameRate
              };

            } else if (did === "user") {
              isVideo = {
                facingMode: "user",
                width: mediaConfig.vedioConfig.width,
                height: mediaConfig.vedioConfig.height,
                frameRate: mediaConfig.vedioConfig.frameRate
              };
            } else {
              mediaConfig.vedioConfig.type = 2;
              isVideo = {
                optional: [{
                  sourceId: did
                },]
              }
            }
          }
          RL_AV.newMediaConnect(function () {
            mediaMethods.getUserMediaPermission({
              isVideo: isVideo
            }, function (stream) {
              Webrtc.addLocalStream(stream);
              //会议中每个人都是主叫，所以只需要发起CreateOffer即可，不需要处理Answer TODO
              Webrtc.createOffer(function (desc) {
                Webrtc.setLocalDescription(desc, function () {
                  mediaConfig.sendMeetOfferCount = 0;
                  mediaMethods.sendMeetOffer(callEventData, callback, onError)
                }, onError);
              }, function () {
                console.log("sendOffer Failed!");
              });
            }, function (err) {
              pc.close();
              onError({
                code: commonConfig.errCode._VOIP_MEDIA_ERROR,
                msg: 'get media stream error.' + err.name + ":" + err.message,
                err: err.name
              });
            })
          }, function () {
            commonMethods.logger.info("init mwsg socket fail..");
            var resp = {};
            resp.code = commonConfig.errCode._WSG_INIT_ERROR;
            resp.msg = "init mwsg socket fail..";
            onError(resp);
          });
        }, onError);

      },
      getMemberidByUuid: function (uuid) {
        if (!uuid) {
          return null;
        }
        for (var memberid in commonConfig.membersUUID) {
          if (uuid === commonConfig.membersUUID[memberid]) {
            return memberid;
          }
        }
        return null;
      },
      reqVideo: function (data, callback, onError) {
        //判断已经请求用户的长度
        var count = Object.getOwnPropertyNames(commonConfig.peerConnectionMap).length;
        if (count >= mediaConfig.lineLimit) {
          var resp = {};
          resp.code = commonConfig.errCode._WSG_MEMBER_LIMIT;
          resp.msg = "request members video too much";
          onError(resp);
        }
        //如果缓存中有当前用户信息，则认为已经请求了用户信息，需要进行处理
        if (!!commonConfig.peerConnectionMap[data.memberId]) {
          commonMethods.logger.info(memberid + " is requesting, please wait..")
          var resp = {};
          resp.code = commonConfig.errCode._WSG_REQVIDEO_EXISTS;
          resp.msg = memberid + " is requesting, please wait..";
          onError(resp);
          return;
        } else {
          commonConfig.peerConnectionMap[data.memberId] = "requesting";
        }
        RL_AV.sendNewMediaMsg({
          method: 'ReqVideo',
          memberid: memberid.indexOf("@") > -1 ? memberid.substr(0, memberid.indexOf("@")) : memberid,
          selfssrc: commonConfig.selfssrc,
          reqssrc: data.ssrc,
          videosource: data.videosource,
          videocodec: data.videocodec,
          getClientNo: true
        }, callback, function () {
          commonConfig.peerConnectionMap[data.memberId] = null;
          commonMethods.logger.info("mwsg reqVideo for member " + memberid + " fail.")
          var resp = {};
          resp.code = commonConfig.errCode._WSG_REQVIDEO_FAIL;
          resp.msg = "fail";
          onError(resp);
        });
      },

    };
    this.__proto__ = {
      receiveReleaseRet: function (obj, request) {
        if (!!request.callback) {
          request.callback({
            code: 200
          });
        }
        var uuid = obj["uuid"];
        var memberid = mediaMethods.getMemberidByUuid(uuid);
        if (!!memberid) Webrtc.webrtcRealease(memberid);
      },
      receiveRelease: function (obj) {
        var uuid = obj["uuid"];
        //回包
        RL_AV.sendNewMediaMsg({
          method: 'ReleaseRet',
          uuid: uuid,
          ret: '200',
          getClientNo: true
        }, function () {
        }, function () {
        });
        commonConfig.isInMeeting = false;
        //获取成员id，释放资源
        var memberid = mediaMethods.getMemberidByUuid(uuid);
        if (!!memberid) Webrtc.webrtcRealease(memberid);
        mediaMethods._conferenceNotifyLinstener({
          type: 7,
          reason: obj.reason
        });
      },
      processMsg: function (obj) {
        if (!!obj["2"]) {
          if (!mediaConfig.voipCallData.meetRouterMap[obj["2"]["CallEventData"]["2"]]) {
            if (obj["2"]["CallEventData"]["1"] === 1 || obj["2"]["CallEventData"]["1"] === 2) {
              mediaConfig.voipCallData.meetRouterMap[obj["2"]["CallEventData"]["2"]] = obj[9];
            }
          }
          var callEventData = mediaMethods.parseCallEventData(obj);
          if (mediaConfig.flag) {
            mediaMethods.parseMeetingVoip(callEventData)
          } else {
            mediaMethods.processVoip(callEventData)
          }

        }
      },
      unload: function () {
        self.photo.cancel();
        self.audio.cancel();
      },
      setCallView: function (view, localView, hideView) {
        commonConfig.voipOtherView = view;
        commonConfig.voipLocalView = localView;
      },
      setTimeWindow: function (obj) {
        if (!!obj.jquery) {
          obj = obj[0];
        }
        if (mediaConfig.voipTimer) clearInterval(mediaConfig.voipTimer);
        mediaConfig.voipTimer = setInterval(function () {
          var second = mediaConfig.voipTimestamp++;
          var minute = 0;
          var hours = 0;
          if (second > 59) {
            minute = parseInt(second / 60);
            second = second % 60;
          }
          if (minute > 59) {
            hours = parseInt(second / 60);
            second = second % 60;
          }
          if (!!obj) {
            obj.innerHTML = hours + " : " + minute + " : " + second;
          }
          ;

        }, 1000);
      },
      setRecordVideo: function () {
        mediaConfig.recordVideo = true;
      },
      makeCall: function (data, callback, onError) {
        data = commonMethods.getParam(data);
        console.log('make call', data);
        if (!Webrtc.getUserMedia()) {
          var resp = {};
          resp.code = commonConfig.errCode._VOIP_NO_MEDIA;
          resp.msg = 'brower not support getUserMedia.';
          onError(resp);
          return;
        }
        var timeStamp = new Date().getTime();
        var randomNum = "";
        for (var i = 0; i < 6; i++) {
          randomNum += Math.floor(Math.random() * 10);
        }
        var callId = timeStamp + randomNum;
        mediaConfig.voipCallData.callEventCallId = callId;
        var userData = ("tel=" + (data.tel || '') + ';' + ('nickName=' + data.nickName));
        delete data.tel;
        delete data.nickName;
        var callEventData = commonMethods.assign(data, {
          userData: userData,
          callEvent: 1,
          callId: callId,
          caller: commonConfig.userName
        })
        mediaMethods.sendVoip(callEventData, callback, onError);
        return callId;
      },
      acceptCall: function (data, callback, onError) {
        data = commonMethods.getParam(data);
        var callEventData = commonMethods.assign(data, {
          callEvent: 4,
          called: commonConfig.userName
        });
        mediaMethods.sendVoip(callEventData, callback, onError);
      },
      rejectCall: function (data, callback, onError) {
        data = commonMethods.getParam(data);
        mediaConfig.mediaCount = 0;
        var callEventData = commonMethods.assign(data, {
          callEvent: 10,
          called: commonConfig.userName,
          reason: '603'
        });
        mediaMethods.buildCallEvent(callEventData, callback, onError);
        mediaConfig.voipCallData.callEventCallId = null;
        mediaMethods.releaseVoip();
        if (!!data.callId) {
          delete mediaConfig.voipCallData.msgRouterMap[data.callId];
        }
      },
      releaseCall: function (data, callback, onError) {
        data = commonMethods.getParam(data);
        mediaConfig.mediaCount = 0;
        var callEventType = 7;
        if (!!mediaConfig.voipTimer) {
          clearInterval(mediaConfig.voipTimer);
          mediaConfig.voipTimer = null;
          mediaConfig.voipTimestamp = 0;
        }
        if (data.caller === commonConfig.userName && !mediaConfig.voipCallData.connected) {
          callEventType = 8;
        } else if (mediaConfig.voipCallData.called === commonConfig.userName && !mediaConfig.voipCallData.connected) {
          self.rejectCall({
            callId: mediaConfig.voipCallData.callId,
            caller: mediaConfig.voipCallData.caller
          }, function (sucObj) {
          }, function (errObj) {
          })
        }
        mediaMethods.buildCallEvent(commonMethods.assign(data, {callEvent: callEventType}), function () {
          commonMethods.logger.info('send callEvent success')
        }, onError);
        mediaMethods.releaseVoip();
        if (!!data.callId) {
          delete mediaConfig.voipCallData.msgRouterMap[data.callId];
        }
        mediaMethods.releaseCallback = callback;
        mediaMethods.releaseCallbackError = onError;
      },
      onCallMsgListener: function (callback) {
        mediaMethods._voipListener = callback
      },
      photo: {
        apply: function (obj, onCanPlay, onError) {
          mediaConfig.photoConfig.state = 1;
          var resp = {};
          resp.code = 200;
          var userMedia = Webrtc.getUserMedia();
          if (!userMedia) {
            resp.code = commonConfig.errCode._VOIP_NO_MEDIA;
            resp.msg = "brower not support getUserMedia";
            onError(resp);
            return
          }
          var video = null;
          if (!!obj) {
            video = obj.tag
          }

          if (mediaConfig.photoConfig.mediaStream) {
            Webrtc.stopMediaStream(mediaConfig.photoConfig.mediaStream);
            mediaConfig.photoConfig.mediaStream = null
          }
          mediaMethods.getUserMediaPermission({
            isVideo: true,
            needAudio: false
          }, function (stream) {
            if (mediaConfig.photoConfig.state !== 1) {
              Webrtc.stopMediaStream(stream);
              return
            }
            if (!video) {
              video = document.createElement("video");
            }
            if ("srcObject" in video) {
              video.srcObject = stream;
            } else {
              var windowUrl = commonMethods.getWindowURL();
              if (!!windowUrl) {
                video.src = windowUrl.createObjectURL(stream)
              }
            }
            if (onCanPlay && onCanPlay instanceof Function) {
              if (video.addEventListener) {
                video.addEventListener('canplay', function () {
                  onCanPlay()
                })
              } else if (video.attachEvent) {
                video.attachEvent('oncanplay', function () {
                  onCanPlay()
                })
              }
            }
            var width = "640px";
            var height = "480px";
            if (video.offsetWidth > 0) {
              width = video.offsetWidth
            } else {
              video.style.width = width;
            }
            if (video.offsetHeight > 0) {
              height = video.offsetHeight
            } else {
              video.style.height = height;
            }
            mediaConfig.photoConfig.video = video;
            mediaConfig.photoConfig.mediaStream = stream
          }, function (error) {
            var resp = {};
            switch (error.code || error.name) {
              case 'PERMISSION_DENIED':
              case 'PermissionDeniedError':
                commonMethods.logger.info('用户拒绝提供信息。');
                resp.msg = 'user refuesed';
                break;
              case 'NOT_SUPPORTED_ERROR':
              case 'NotSupportedError':
                commonMethods.logger.info('浏览器不支持硬件设备。');
                resp.msg = 'brower not support';
                break;
              case 'MANDATORY_UNSATISFIED_ERROR':
              case 'MandatoryUnsatisfiedError':
                commonMethods.logger.info('无法发现指定的硬件设备。');
                resp.msg = 'can not find device';
                break;
              default:
                commonMethods.logger.info('无法打开音视频。异常信息:' + (error.code || error.name));
                resp.msg = 'can not open resource';
                break;
            }
            resp.code = commonConfig.errCode._VOIP_MEDIA_ERROR;
            onError(resp)
          })
        },
        make: function () {
          var resp = {};
          resp.code = 200;
          if (!mediaConfig.photoConfig.mediaStream) {
            resp.code = commonConfig.errCode._NO_RESOURCE_STREAM;
            resp.msg = "please execute apply methord first";
            return resp
          }
          var video = mediaConfig.photoConfig.video;
          var windowUrl = commonMethods.getWindowURL();
          var canvas = document.createElement("canvas");
          var width = video.offsetWidth;
          var height = video.offsetHeight;
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, width, height);
          var dataurl = canvas.toDataURL('image/jpeg', 0.6);
          canvas = null;
          video = null;
          var bin = atob(dataurl.split(',')[1]);
          var buffer = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i)
          }
          var blob = new Blob([buffer.buffer], {
            type: 'image/jpeg'
          });
          if (windowUrl) {
            var url = windowUrl.createObjectURL(blob);
            blob.url = url
          }
          Webrtc.stopMediaStream(mediaConfig.photoConfig.mediaStream);
          mediaConfig.photoConfig.mediaStream = null;
          var time = new Date().getTime();
          blob.fileName = time + ".jpg";
          resp.blob = blob;
          return resp
        },
        cancel: function () {
          mediaConfig.photoConfig.state = 2;
          var resp = {};
          resp.code = 200;
          if (mediaConfig.photoConfig.mediaStream) {
            Webrtc.stopMediaStream(mediaConfig.photoConfig.mediaStream);
            mediaConfig.photoConfig.mediaStream = null
          }
          if (mediaConfig.photoConfig.video) {
            mediaConfig.photoConfig.video = null
          }
          return resp
        }
      },
      audio: {
        apply: function (obj, onCanPlay, onError) {
          mediaConfig.audioConfig.state = 1;
          var resp = {};
          var userMedia = Webrtc.getUserMedia();
          if (!userMedia) {
            resp.code = commonConfig.errCode._VOIP_NO_MEDIA;
            resp.msg = "brower not support getUserMedia";
            onError(resp);
            return
          }
          var audio = null;
          if (!!obj) {
            audio = obj.tag
          }
          mediaMethods.getUserMediaPermission({
            isVideo: false
          }, function (stream) {
            if (mediaConfig.audioConfig.state !== 1) {
              Webrtc.stopMediaStream(stream);
              return
            }
            var windowUrl = commonMethods.getWindowURL();
            mediaConfig.audioConfig.mediaStream = stream;
            var rec = new HZRecorder(stream);
            mediaConfig.audioConfig.recorder = rec;
            if (!audio) {
              audio = document.createElement("video");

            }
            if (!!audio.srcObject) {
              audio.srcObject = stream
            } else {
              audio.src = windowUrl.createObjectURL(stream)
            }

            mediaConfig.audioConfig.audio = audio;
            if (onCanPlay && onCanPlay instanceof Function) {
              if (audio.addEventListener) {
                audio.addEventListener('canplay', function () {
                  onCanPlay()
                })
              } else if (audio.attachEvent) {
                audio.attachEvent('oncanplay', function () {
                  onCanPlay()
                })
              }
            }
            rec.start(audio)
          }, function (error) {
            var resp = {};
            switch (error.code || error.name) {
              case 'PERMISSION_DENIED':
              case 'PermissionDeniedError':
                commonMethods.logger.info('user refused the Permission.');
                resp.msg = 'user refuesed';
                break;
              case 'NOT_SUPPORTED_ERROR':
              case 'NotSupportedError':
                commonMethods.logger.info('the export is not support the equipment.');
                resp.msg = 'brower not support';
                break;
              case 'MANDATORY_UNSATISFIED_ERROR':
              case 'MandatoryUnsatisfiedError':
                commonMethods.logger.info('can`t find the microphone equipment ');
                resp.msg = 'can not find device';
                break;
              default:
                commonMethods.logger.info('can`t open the microphone。errcode :' + (error.code || error.name));
                resp.msg = 'can not open resource';
                break;
            }
            resp.code = commonConfig.errCode._VOIP_MEDIA_ERROR;
            onError(resp)
          });
        },
        make: function () {
          var resp = {};
          resp.code = 200;
          if (!mediaConfig.audioConfig.recorder) {
            resp.code = commonConfig.errCode._NO_RESOURCE_STREAM;
            resp.msg = "please execute apply methord first";
            return resp
          }
          var dataBlob = mediaConfig.audioConfig.recorder.getBlob();
          var windowUrl = commonMethods.getWindowURL();
          var url = windowUrl.createObjectURL(dataBlob);
          dataBlob.url = url;
          var time = new Date().getTime();
          dataBlob.fileName = time + ".wav";
          resp.blob = dataBlob;
          return resp
        },
        cancel: function () {
          mediaConfig.audioConfig.state = 2;
          var resp = {};
          resp.code = 200;
          if (mediaConfig.audioConfig.recorder) {
            mediaConfig.audioConfig.recorder.stop();
            mediaConfig.audioConfig.recorder = null
          }
          if (mediaConfig.audioConfig.audio) {
            mediaConfig.audioConfig.audio = null
          }
          return resp
        }
      },
      setMediaConfig: function (width, height, frameRate) {
        if (width) {
          mediaConfig.vedioConfig.width.ideal = parseInt(width);
        }
        if (height) {
          mediaConfig.vedioConfig.height.ideal = parseInt(height);
        }
        if (frameRate) {
          mediaConfig.vedioConfig.frameRate.ideal = parseInt(frameRate)
        }

      },
      //切换摄像头TODO
      exchangeCamera: function (did, callback, onerror) {
        if (!did) {
          return;
        }
        var isVideo = null;
        if (did === "environment") {
          isVideo = {
            facingMode: {
              exact: "environment"
            },
            width: mediaConfig.vedioConfig.width,
            height: mediaConfig.vedioConfig.height,
            frameRate: mediaConfig.vedioConfig.frameRate
          };
        } else if (did === "user") {
          isVideo = {
            facingMode: "user",
            width: mediaConfig.vedioConfig.width,
            height: mediaConfig.vedioConfig.height,
            frameRate: mediaConfig.vedioConfig.frameRate
          };
        } else {
          mediaConfig.vedioConfig.type = 2;
          isVideo = {
            optional: [{
              sourceId: did
            }]
          }
        }
        if (mediaConfig.voipCallData.connected && mediaConfig.voipCallData.localMediaStream) {
          var s = [];
          var VideoTrack = null;
          var AudioTrack = null;
          if (commonConfig.peerConnection.getSenders && (s = commonConfig.peerConnection.getSenders()) && s.length > 0) {
            for (var i = 0; i < s.length; i++) {
              if (s[i].track.kind == "video") {
                VideoTrack = s[i];
              } else {
                AudioTrack = s[i];
              }
            }
          } else if (mediaConfig.voipCallData.localMediaStream.removeTrack && commonConfig.peerConnection.getSenders) {
            commonConfig.peerConnection.getSenders().forEach(function (track) {
              commonConfig.peerConnection.removeTrack(track);
            });
          } else {
            commonConfig.peerConnection.removeStream(mediaConfig.voipCallData.localMediaStream); //移除上传流
          }

          Webrtc.stopMediaStream(commonConfig.localMediaStream); //关闭本地流  暂时注释
          commonConfig.sender = [];
          mediaMethods.getUserMediaPermission({
            isVideo: isVideo,
            needAudio: mediaConfig.voipCallData.needAudio
          }, function (stream) {
            commonConfig.localMediaStream = stream;
            //支持直接更换流的方式
            if (VideoTrack && "replaceTrack" in VideoTrack) {
              VideoTrack.replaceTrack(stream.getVideoTracks()[0]);
              AudioTrack.replaceTrack(stream.getAudioTracks()[0]);
              if (!!commonConfig.voipLocalView) {
                Webrtc.processAVStream(commonConfig.voipLocalView, stream);
              }
              return
            }

            //不支持replacetrack的方式
            if (!!commonConfig.voipLocalView) {
              Webrtc.processAVStream(commonConfig.voipLocalView, stream);
            }
            try {
              stream.getTracks().forEach(function (track) {
                commonConfig.peerConnection.addTrack(track, stream);
              });

              console.log("+++ addTrack succ!");
              setTimeout(function () {
                Webrtc.createOffer(function (e) {
                  mediaConfig.SDP = e;
                  console.log('processCresateoffer');
                  Webrtc.setLocalDescription(mediaConfig.SDP, function () {
                    mediaMethods.sendOfferFn(mediaConfig.SDP, true, callback, onerror)
                  }, onerror);

                  if (commonConfig.peerConnection.iceGatheringState === "complete") {
                    console.log("+++ sendOffer " + mediaConfig.mediaCount);
                    var strSDP = commonConfig.peerConnection.localDescription.sdp;
                    var preSDP = mediaMethods.processSDP(strSDP);
                    mediaConfig.sendVoipData.strSDP = mediaMethods.processSDP(preSDP);
                    var state = 2;
                    var msg = "calling";
                    if (mediaConfig.sendVoipData.callId === mediaConfig.voipCallData.callEventCallId) {
                      mediaMethods.buildCallEvent(mediaConfig.sendVoipData, callback, onerror);
                    } else {
                      state = 4;
                      msg = "calling failed , maybe opposite side is busying"
                    }
                    mediaConfig.voipCallData.voipCallType = mediaConfig.sendVoipData.isVoipCall;
                    mediaMethods._voipListener({
                      callId: mediaConfig.sendVoipData.callId,
                      caller: mediaConfig.sendVoipData.caller,
                      called: mediaConfig.sendVoipData.called,
                      userdata: mediaConfig.sendVoipData.userData,
                      callType: mediaConfig.sendVoipData.isVoipCall,
                      msg: msg,
                      state: state,
                      code: 200
                    });
                  }
                  callback();
                }, function (err) {
                  console.log(err);
                })
              }, 1000);

            } catch (e) {
              commonConfig.peerConnection.addStream(stream);
              console.log("+++ addStream succ!send offer start ++++");
              Webrtc.createOffer(function (e) {
                Webrtc.setLocalDescription(e, function () {
                  mediaMethods.sendOfferFn(mediaConfig.SDP, true, callback, onerror)
                }, onerror);
              }, function (err) {
                console.log(err);
              })
            }
          }, function (err) {
            console.log(err);
            onerror(err);
          });
        } else {
          var err = {};
          err.code = commonConfig.errCode._MEDIASTATE_ERROR;
          err.msg = "media connection state error ";
          onerror(err);
        }
      },
      deployVideoVoice: function (enable, type) {
        enable = enable ? true : false;
        console.log(commonConfig.localMediaStream);
        var s = commonConfig.localMediaStream.getVideoTracks();
        console.log(s);
        if (type === "video") {
          if ("getVideoTracks" in commonConfig.localMediaStream) {
            var tracks = commonConfig.localMediaStream.getVideoTracks();
            for (var i = 0; i < tracks.length; i++) {
              tracks[i].enabled = enable;
            }
          } else {
            commonConfig.localMediaStream.enabled = enable;
          }
        } else {
          if ("getVideoTracks" in commonConfig.localMediaStream) {
            var tracks = commonConfig.localMediaStream.getAudioTracks();
            for (var i = 0; i < tracks.length; i++) {
              tracks[i].enabled = enable;
            }
          } else {
            commonConfig.localMediaStream.enabled = enable;
          }
        }
      },
      VideoRecord: function (local, isVideo) {
        var mediaRecorder = Webrtc.getMediaRecorder();
        if (!mediaRecorder) {
          return {
            err: commonConfig.errCode._NOT_SUPPORT_RECORDER,
            msg: "do not support record"
          };
        }

        var _stream = (local === "local" ? commonConfig.localMediaStream : commonConfig.remoteMediaStream);
        var type = Webrtc.getRecordingType(isVideo);
        if (!type) {
          return {
            err: commonConfig.errCode._NOT_SUPPORT_RECORDER,
            msg: "do not support record"
          };
        }
        var options = {
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
          mimeType: type
        };
        var result, _callback, mr = null,
          _chunk = [];
        return {
          start: function () {
            var mediaRecorder = Webrtc.getMediaRecorder();
            try {
              mr = new mediaRecorder(_stream, options);
            } catch (err) {
              console.log(err);
            }
            mr.ignoreMutedMedia = true;
            mr.ondataavailable = function (evt) {
              _chunk.push(evt.data);
            };
            mr.onerror = function (e) {
              console.log(e);
            };
            mr.onstop = function (e) {
              console.log(e);
              result = new Blob(_chunk, {
                type: e.currentTarget.mimeType
              });
              if (_callback) {
                _callback({
                  target: result,
                  url: URL.createObjectURL(result)
                });
              }
            };
            mr.start();

          },
          stop: function (callback) {
            if (mr) {
              mr.stop();
              _callback = callback
            } else {

            }
          },
          pause: function () {
            mr.pause();
          },
          resume: function () {
            mr.resume();
          }

        };

      },
      receiveVideoOfferSDPResp: function (data, element, onError) {
        var memberid = data.memberid;
        var memberUUID = data.uuid;
        var invitesdp = data.sdp;
        invitesdp = mediaMethods.processSDP(invitesdp);
        commonConfig.membersUUID[memberid] = memberUUID;
        commonConfig.elementMap[memberid] = element;
        Webrtc.buildPeerConnection(function (){
          var pc = commonConfig.peerConnection;
          commonConfig.peerConnectionMap[memberid] = pc;

          Webrtc.setPeerRemoteDesc(pc, invitesdp, "offer", function () {
            var constraints = {
              mandatory: {
                OfferToReceiveAudio: true,
                OfferToReceiveVideo: true
              }
            };
            Webrtc.createAnswer(constraints, function (desc) {
              Webrtc.setLocalDescription(desc, function () {
                mediaMethods.sendMeetAnswer(memberid, memberUUID)
              }, onError);
            }, function (err) {
              commonMethods.logger.info("wmsg createRAnswer Failed!" + err);
            });
          }, function (err) {
            commonMethods.logger.info("RemoteError" + err);
          });
        }, onError);
      },
      ConnectMedia: function (data, callback, onError) {
        data = commonMethods.getParam(data);
        if (!Webrtc.getUserMedia()) {
          var resp = {};
          resp.code = commonConfig.errCode._VOIP_NO_MEDIA;
          resp.msg = 'brower not support getUserMedia.';
          onError(resp);
          return;
        }
        var timeStamp = new Date().getTime();
        var randomNum = "";
        for (var i = 0; i < 6; i++) {
          randomNum += Math.floor(Math.random() * 10);
        }
        var callId = timeStamp + randomNum;
        mediaConfig.voipCallData.callEventCallId = callId;
        //保证加入新的会议之前，老的会议全部断开
        // YTX_CONFIG._mwsg._releaseConnect();
        var callEventData = commonMethods.assign(data, {
          callEvent: 1,
          callId: callId,
          called: 'nconf' + data.called,
          caller: commonConfig.userName
        });
        mediaMethods.sendMeetingVoip(callEventData, callback, onError);
        return callId;
      },
      DisconnectMedia: function (data, callback, onError) {
        data = commonMethods.getParam(data);
        try {
          mediaMethods.releaseMeetingVoip();
        } catch (e) {
          console.log(e);
        }
        var callEventType = 7;
        if (data.caller === commonConfig.userName && !mediaConfig.voipCallData.connected) callEventType = 8;
        mediaMethods.buildCallEvent(commonMethods.assign(data, {callEvent: callEventType}), callback, onError);

        RL_AV.unload(data);
        if (!!data.callId) {
          delete mediaConfig.voipCallData.msgRouterMap[data.callId];
        }
        mediaMethods.releaseCallback = callback;
        mediaMethods.releaseCallbackError = onError;
      },
      reqMeetingMemberVideo: function (data, callback, onError) {
        data = commonMethods.getParam(data);
        if (!data.video) {
          var resp = {};
          resp.code = commonConfig.errCode._WSG_REQVIDEO_MISS_PARAM;
          resp.msg = "please set video element";
          commonMethods.logger.info("reqMeetingMemberVideo no video set");
          onError(resp);
          return;
        }
        if (!data.memberId || !data.ssrc ||
          !data.videoSource) {
          var resp = {};
          resp.code = commonConfig.errCode._WSG_REQVIDEO_MISS_PARAM;
          resp.msg = "no need param, please check param";
          commonMethods.logger.info("reqMeetingMemberVideo nessencery param. memberid:" +
            data.memberId + ",reqssrc:" +
            data.ssrc + ",videosource:" +
            data.videoSource + ",videocodec:" +
            data.videoCode);
          onError(resp);
          return;
        }
        mediaMethods.reqVideo(data, callback, onError);
      },
      releaseMeetingMemberVideo: function (data, callback, onError) {
        data = commonMethods.getParam(data);
        if (!data.memberId) {
          var resp = {};
          resp.code = commonConfig.errCode._WSG_RELEASEVIDEO_MISS_PARAM;
          resp.msg = "please set memberid";
          commonMethods.logger.info("releaseMeetingMemberVideo no member set");
          if (!!onError) {
            onError(resp);
          }
          return;
        }
        mediaMethods.sendRelease(data.memberId, callback, onError);
        var rtp = commonConfig.peerConnectionMap[data.memberId];
        if (rtp && rtp !== "requesting") {
          rtp.close();
        }
        delete commonConfig.peerConnectionMap[data.memberId]
      },
      onMeetingMsgListener: function (callback) {
        mediaMethods._voipListener = callback
      },
      setMeetingLocalView: function (remotetAudio, localView) {
        mediaConfig.meetingCallData.voipMixedAudio = remotetAudio;
        mediaConfig.meetingCallData.voipLocalView = localView;
      },
      getCodingFormat: function () {
        var options = {
          optional: [{
            DtlsSrtpKeyAgreement: true
          }]
        };
        var peerConnection = Webrtc.getPeerConnection();
        var pc = new peerConnection({}, options);
        var offerOptions = {
          offerToReceiveAudio: 1,
          offerToReceiveVideo: 1
        };
        var codingFormatArr = [];
        return pc.createOffer(offerOptions).then(function (res) {
          console.log(res, "本地获取的sdp(与有会逻辑无关)");
          var codingFormat = res.sdp;
          // 获取编码格式; 注意只判断了h264 VP8 VP9这三种;
          if (codingFormat.indexOf('H264') > 0) {
            codingFormatArr.push("H264");
          }
          if (codingFormat.indexOf('VP8') > 0) {
            codingFormatArr.push("VP8");
          }
          if (codingFormat.indexOf('VP9') > 0) {
            codingFormatArr.push("VP9");
          }
          return codingFormatArr;
        })
      },
    }
  }


  //webrtc构造函数
  function RL_Webrtc() {
    var RL_AV = ROOT.RL_AV;
    var self = this;
    var webrtcConfig = {
      iceServer: [],
      requestTime: null,
      requestCounter: 0,
      requestLimit: 3
    };
    var webrtcMethods = {};
    this.__proto__ = {
      getUserMedia: function () {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        if (!!navigator.mediaDevices && !!navigator.mediaDevices.getUserMedia) {
          getUserMedia = navigator.mediaDevices.getUserMedia
        } else if (typeof navigator !== 'undefined' && navigator.webkitGetUserMedia) {
          getUserMedia = navigator.webkitGetUserMedia.bind(navigator)
        } else if (typeof navigator !== 'undefined' && navigator.mozGetUserMedia) {
          getUserMedia = navigator.mozGetUserMedia.bind(navigator)
        } else if (typeof navigator !== 'undefined' && navigator.getUserMedia) {
          getUserMedia = navigator.getUserMedia.bind(navigator)
        }
        return getUserMedia
      },
      getPeerConnection: function () {
        var peerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection || window.msRTCPeerConnection;
        if (typeof RTCPeerConnection !== 'undefined') {
          peerConnection = RTCPeerConnection
        } else if (typeof mozRTCPeerConnection !== 'undefined') {
          peerConnection = mozRTCPeerConnection
        } else if (typeof webkitRTCPeerConnection !== 'undefined') {
          peerConnection = webkitRTCPeerConnection
        }
        return peerConnection
      },
      getDevices: function (callback) {
        var b = commonMethods.browser();
        if (b === "iPhone" || b === "iPad") {
          callback({
            type: 1,
            value: [{
              // facingMode: { exact: "environment" },
              deviceId: "environment",
              label: "back camera"
            },
              {
                deviceId: "user",
                label: "front camera"
              }
            ]
          });
        } else {
          if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
            //debugger;
            var arrs = [];
            navigator.mediaDevices.enumerateDevices().then(function (e) {
              for (var i = 0; i < e.length; i++) {
                if (e[i].kind === "videoinput") {
                  arrs.push(e[i]);
                }
              }
              callback({
                type: 1,
                value: arrs
              });
            }).catch(function (err) {
              callback(err);
            });

          } else {
            callback({
              msg: 'enumerateDevices fail'
            });
          }

        }


      },
      setRemoteDesc: function (receSDP, oa, callback, onerror) {
        var pc = commonConfig.peerConnection;
        if (!pc) return;
        var sessionDescription = self.getSessionDescription();
        if (pc.remoteDescription && pc.remoteDescription.sdp.length !== 0) {
          return;
        }
        try {
          pc.setRemoteDescription(new sessionDescription({
            type: oa,
            sdp: receSDP
          })).then(callback).catch(onerror);
        } catch (e) {
          pc.setRemoteDescription(new sessionDescription({
            type: oa,
            sdp: receSDP
          }), callback, onerror);
        }
      },
      getSessionDescription: function () {
        var sessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription || window.msRTCSessionDescription;
        if (typeof RTCSessionDescription !== 'undefined') {
          sessionDescription = RTCSessionDescription
        } else if (typeof mozRTCSessionDescription !== 'undefined') {
          sessionDescription = mozRTCSessionDescription
        } else if (typeof webkitRTCSessionDescription !== 'undefined') {
          sessionDescription = webkitRTCSessionDescription
        }
        return sessionDescription
      },
      webrtcRealease: function (memberid) {
        if (commonConfig.peerConnectionMap[memberid]) {
          if (commonConfig.peerConnectionMap[memberid].signalingState !== "closed" && commonConfig.peerConnectionMap[memberid].close) {
            commonConfig.peerConnectionMap[memberid].close();
          }
          delete commonConfig.peerConnectionMap[memberid];
        }
        if (commonConfig.elementMap[memberid]) {
          delete commonConfig.elementMap[memberid];
        }
        if (commonConfig.membersUUID[memberid]) {
          delete commonConfig.membersUUID[memberid];
        }
      },
      stopMediaStream: function (stream) {
        if (stream.getTracks()) {
          console.log("stream.getTracks()");
          for (var track in stream.getTracks()) {
            stream.getTracks()[track].stop();
          }
        } else {
          stream.stop();
        }
      },
      processAVStream: function (view, stream) {
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
        console.log('navigator', navigator);
        console.log('stream------', stream);
        console.log('view.srcObject------', view.srcObject);
      },
      buildPeerConnection: function (callback, onError) {
        // var curTime = new Date().getTime();
        // if (!webrtcConfig.requestTime) {
        //   webrtcConfig.requestTime = curTime;
        //   webrtcConfig.requestCounter = 0;
        // } else if ((curTime - webrtcConfig.requestTime) > 60 * 1000) {
        //   webrtcConfig.requestTime = curTime;
        //   webrtcConfig.requestCounter = 0;
        // }
        // if (webrtcConfig.requestCounter++ >= webrtcConfig.requestLimit) {
        //   var resp = {};
        //   resp.code = commonConfig.errCode._REQUEST_TOO_FREQUENT;
        //   resp.msg = 'request too quick, please wait a minute.';
        //   onError(resp);
        //   commonMethods.logger.info('request too quick, please wait a minute.');
        //   return
        // }
        var iceServer = {
          "iceServers": webrtcConfig.iceServers
        };
        var onIceCompleted = false;
        var options = {
          optional: [{
            DtlsSrtpKeyAgreement: true
          }]
        };
        var peerConnection = self.getPeerConnection();
        var pc = new peerConnection(iceServer, options);
        commonConfig.peerConnection = pc;
        pc.onicecandidate = function (event) {
          console.log("+++ onicecandidate +++");
          if (event.candidate) {
            console.log("+++ onicecandidate:" + event.candidate.candidate);
          } else {
            onIceCompleted = true;
            console.log("+++ onicecandidate end! +++");
          }
        };
        pc.oniceconnectionstatechange = function(e) {
          console.log('oniceconnectionstatechange:', pc.iceConnectionState)
        };
        pc.onsignalingstatechange = function(e) {
          console.log('onsignalingstatechange:', pc.signalingState)
        };
        pc.onnegotiationneeded = function (e) {
          console.log('onnegotiationneeded', commonConfig.peerConnection.iceGatheringState, e);
        };

        function addStream(event) {
          self.processAVStream(commonConfig.voipOtherView, event.streams ? event.streams[0] : event.stream);
        }

        if ('ontrack' in pc) {
          pc.ontrack = function (res) {
            console.log('ontrack', res);
            if (pc.getReceivers) console.log('pc.getReceivers---', pc.getReceivers());
            if (pc.getRemoteStreams) console.log('pc.getRemoteStreams---', pc.getRemoteStreams());
            addStream(res)
          };
        } else if ('onaddtrack' in pc) {
          pc.onaddtrack = function (res) {
            console.log('onaddtrack', res);
            if (pc.getReceivers) console.log('pc.getReceivers---', pc.getReceivers());
            if (pc.getRemoteStreams) console.log('pc.getRemoteStreams---', pc.getRemoteStreams());
            addStream(res)
          };
        } else if ('onaddstream' in pc) {
          pc.onaddstream = function (res) {
            console.log('onaddstream', res);
            if (pc.getReceivers) console.log('pc.getReceivers---', pc.getReceivers());
            if (pc.getRemoteStreams) console.log('pc.getRemoteStreams---', pc.getRemoteStreams());
            addStream(res)
          };
        }
        callback();
      },
      setLocalDescription: function (desc, callback, onerror) {
        var pm = commonConfig.peerConnection.setLocalDescription(desc, callback, function (err) {
          onerror({
            code: commonConfig.errCode._PEERCONNECTION_ERROR,
            msg: "setLocalDescription failed",
            err: err
          });
        });
        if (pm && "then" in pm) {
          pm.then(callback).catch(
            function (err) {
              onerror({
                code: commonConfig.errCode._PEERCONNECTION_ERROR,
                msg: "setLocalDescription failed",
                err: err
              });
            });
        }
      },
      createOffer: function (callback, onerror) {
        try {
          commonConfig.peerConnection.createOffer().then(callback).catch(onerror);
        } catch (e) {
          commonConfig.peerConnection.createOffer(callback, onerror);
        }
      },
      addLocalStream: function (stream) {
        var pc = commonConfig.peerConnection;
        console.log('commonConfig.voipLocalView', commonConfig.voipLocalView);
        if (!!commonConfig.voipLocalView) {
          self.processAVStream(commonConfig.voipLocalView, stream);
        }
        commonConfig.localMediaStream = stream;
        try {
          stream.getTracks().forEach(function (track) {
            commonConfig.sender.push(pc.addTrack(track, stream))
          });
          console.log("+++ addTrack succ!");
        } catch (e) {
          pc.addStream(stream);
          console.log("+++ addStream succ!")
        }
      },
      createAnswer: function (constraints, callback, onerror) {
        try {
          commonConfig.peerConnection.createAnswer(constraints).then(callback).catch(onerror);
        } catch (e) {
          commonConfig.peerConnection.createAnswer(callback, onerror, constraints);
        }
      },

      getCamera: function (callback) {
        if (typeof callback !== "function") {
          return;
        }
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
          navigator.mediaDevices.enumerateDevices().then(function (arr) {
            console.log(arr);
            var ret = [];
            for (var i = 0; i < arr.length; i++) {
              if (arr[i]["kind"] === "videoinput") {
                ret.push(arr[i]);
              }
            }
            callback(ret);
          }).catch(function (err) {
            console.log(err);
            callback(null);
          });
        } else {
          callback(null);
        }
      },
      getMediaRecorder: function () {
        var recorder = window.MediaRecorder || window.webkitMediaRecorder || window.moztMediaRecorder;
        if (recorder) {
          return recorder;
        } else {
          return false;
        }
      },
      getRecordingType: function (isVideo) {
        var videoTypes = null;
        if (isVideo) {
          videoTypes = ["video/webm",
            "video/mpeg",
            "video/mp4",
            "video/webm\;codecs=vp8",
            "video/webm\;codecs=daala",
            "video/webm\;codecs=h264",

          ];
        } else {
          videoTypes = [
            "audio/webm\;codecs=opus",
            'audio/ogg',
            "audio/webm"
          ];
        }
        var mediaRecorder = self.getMediaRecorder();
        for (var i in videoTypes) {
          if (mediaRecorder.isTypeSupported(videoTypes[i])) {
            return videoTypes[i]
          }
        }
        return null;

      },
      setPeerRemoteDesc: function (pc, receSDP, oa, callback, onerror) {
        var sessionDescription = self.getSessionDescription();
        try {
          pc.setRemoteDescription(new sessionDescription({
            type: oa,
            sdp: receSDP
          })).then(callback).catch(onerror);
        } catch (e) {
          pc.setRemoteDescription(new sessionDescription({
            type: oa,
            sdp: receSDP
          }), callback, onerror);
        }
      },
    }
  }

  ROOT.RL_AV = new RL_AV();

})();
//！！！！node环境传global，浏览器环境传window！！！
