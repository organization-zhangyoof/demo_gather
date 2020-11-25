import React,{Component} from'react'
import { Button,Upload } from 'antd'
class Page2 extends Component {
    render(){
        let W = window.innerWidth 
        let H = window.innerHeight 
        console.log("W=====",W)
        console.log("H=====",H)
        const getObjectURL = (file) => {
            let url = null;
            if (window.createObjcectURL != undefined) {
            url = window.createOjcectURL(file);
            }else if (window.URL != undefined) {
            url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) {
            url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }

        const props = {
            beforeUpload: file => {
                let url = getObjectURL(file)
                console.log("url====",url)
            },
          };
        return (
            <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
                <h1>this is page2</h1>
                <p style={{width:40}}>
                <img style={{height:30,width:30,borderRadius:'50%'}} src = 'http://platform-test.gcnao.cn/gateway/application/ddApplicationManage/download?id=fff65187cc5d4d539eb12dd8cda4b511'></img>
                </p>
                <Upload {...props}>
                 <Button>Select File</Button>
                </Upload>
            </div>
        )
    }
}

export default Page2;
