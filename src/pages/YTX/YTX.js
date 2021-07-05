import React,{useEffect} from'react'
import {notification, Button} from 'antd';
import _ from 'lodash';
import useDialog from './hooks/useDialog';
import {EventSendMessage} from './event';
// import {getMyUnitContactsList} from '@/services/sourceService';
import Iframe from 'react-iframe';
import styles from './style/index.less'

let fix = false;

export default function YTX () {
    const {styleTop, styleLeft, onMouseDown, open, close} = useDialog({dragId: 'YTX'})

    const message = JSON.parse(
        JSON.stringify({
            userId: (window.__USERINFO__ && window.__USERINFO__.userId) || '7878',
            userName: (window.__USERINFO__ && window.__USERINFO__.name) || '一个测试的姓名',
            type: 'login',
        })
    )

    fix = !(styleLeft === -10000);

    useEffect(() => {
        return EventSendMessage.on(res => {
            if (styleLeft === -10000 && res.type !== 'openDev' && res.type !== 'closeDev') {
                console.log('open')
                open();
            }

            document.getElementById('chat').contentWindow.postMessage({ ...res });
        });
    }, [styleTop, styleLeft]);

    useEffect(() => {
        window.addEventListener('message', res => {
            const data = (res && res.data) || {type: '', name: ''};
            const noti = (des) => {
                if (fix) return;
                notification.destroy();
                notification.info({
                    message: des,
                    placement: 'bottomRight',
                    bottom: 0,
                    duration: 30,
                    className: styleLeft.notification,
                    btn: (
                        <Button
                            type="primary"
                            size="small"
                            onClick={() => {
                                open();
                                notification.destroy();
                            }}
                        >
                            打开对话框
                        </Button>
                    )
                })
            }
            switch (data.type) {
                case 'audio':
                    noti(`${data.name}发送语音过来`);
                    break;
                case 'message':
                    noti(`${data.name}发送信息过来`);
                    break;
                case 'video':
                    noti(`${data.name}发送视频通话过来`);
                    break;
                case 'group':
                    noti(`${data.name}发送消息过来`);
                    break;
                case 'close':
                    close();
                    break;
                case 'cancel':
                    notification.destroy();
                    break;
                default:
                    break;
            }
        })
    }, []);

    return (
        <div className={styles.layer} style={{left: styleLeft, top: styleTop}} id="YTX">
            <div className={styles.title} onMouseDown={onMouseDown}></div>
            <Iframe 
                src="/ytx/index.html"
                width={900}
                height={600}
                allow="geolocation;microphone;camera;midi;encrypted-media"
                id="chat"
                onLoad={() => {
                    // const obj = message;
                    // let result = [];
                    // getMyUnitContactsList().then(res => {
                    //     _.get(res, 'result', []).forEach(v => {
                    //         if (v.children && v.children.length > 0) {
                    //             result = _.close(result.concat(v.children))
                    //         }
                    //     })

                    //     obj.getMyUnitContactsList = JSON.stringify(result);
                    //     document.getElementById('chat').contentWindow && 
                    //         document.getElementById('chat').contentWindow.postMessage({...obj})
                    // })
                }}
            />
        </div>
    )
}
