import React,{Component} from'react'
import { Button,Menu } from 'antd'
// import request from '../../utils/request'
import request from '../../utils/newRequest'
let FS = require('fs')
class Page4 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testId:'',
            count:0,
            num:4
        }
    }
    onPromiseTest({ arr, count }) {
        if(arr[count].name){//签名
            this.testCallBack({}, (res => {
                debugger
                request('get', 'https://www.fastmock.site/mock/5e582e57781e3cf76f70fadc04d92b22/zhangyoof/test', { id: 'name' + count }, false)
                    .then(res => {
                        arr[count].newId = res.data.id
                        count++
                        if (count < arr.length) {
                            this.onPromiseTest({ arr, count })
                        } else {
                            console.log('arr-----', arr)
                        }
                    })
                
            }))
        }else if(arr[count].sign){//签章
            request('get', 'https://www.fastmock.site/mock/5e582e57781e3cf76f70fadc04d92b22/zhangyoof/test', { id: 'sign' + count }, false)
                .then(res => {
                    arr[count].newId = res.data.id
                    count++
                    if (count < arr.length) {
                        this.onPromiseTest({ arr, count })
                    } else {
                        console.log('arr-----', arr)
                    }
                })
        }else{//既不签名也不签章
            arr[count].newId = arr[count].id
            count++
            if (count < arr.length) {
                this.onPromiseTest({ arr, count})
            } else {
                console.log('arr-----', arr)
            }
        }

    }
    testCallBack (obj,callBack) {
        debugger
        request('post', 'https://www.fastmock.site/mock/5e582e57781e3cf76f70fadc04d92b22/zhangyoof/test2', '', false)
                .then(res => {
                    callBack(res)
                })
    }
    // onPromiseTest ({arr,count,total})  {
    //     // request('get','https://www.fastmock.site/mock/5e582e57781e3cf76f70fadc04d92b22/zhangyoof/test','',false,'blob')
    //     // .then(res => {

    //     // })
    // }
    testRequest = () => {
        debugger
        // request('get','http://dd-test.gcnao.cn/gateway/ca-center/ca/GetSoftCertRestService/getFiles',{id:'27d77ff3-de4e-4f9d-b6c6-eddd2cf4d2b5'},0)
        // .then(res=>{
        //     console.log(res)
        // })
        try{
            request('post','http://dd-test.gcnao.cn/gateway/ca-center/ca/SignPictureRestService/verifyByUserId',{userId:'224781328bb04d6881f28d84fa70aaaf'},0)
            .then((res,rej)=>{
                console.log("res------------",res)
                console.log("rej------------",rej)
            })
        }catch(e){
            console.log("e-------",e)
        }
        
    }
    download(name,href) {
        var a = document.createElement('a')
        var e = document.createEvent('MouseEvents')  // 创建鼠标事件对象
        e.initEvent('click', false, false) // 初始化事件对象
        a.href = href  // 设置下载地址
        a.download = name // 设置下载文件名
        a.dispatchEvent(e) // 给指定的元素，执行事件click事件
    }
    clickDownload = ( ) => {
        let arr = [
            'http://10.0.10.220/FineReport/ReportServer?reportlet=jspro-reportlets/question/%E8%87%AA%E6%9F%A5%E8%87%AA%E7%BA%A0%E6%A3%80%E6%9F%A5%E8%A1%A8.cpt&id=d3e8542ee2fc473a8c2b3b806d36ea36&apiDomain=http://10.0.10.181:8080/question-service&qrurl=http://jspro-test.oss-cn-shenzhen.aliyuncs.com/qr/4de9ac7be5704a03ae0731c0dd303b66&token=eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiIwNGJjYTZjY2I1ZTU0MjBjOWYxODAyYWJkYTRhZjY1NSIsImVtYWlsIjoiMTg3MDY4OTA1NTRAcXEuY29tIiwibmFtZSI6IndoeV9jajIiLCJ1c2VybmFtZSI6IndoeV9jajIiLCJwaG9uZU51bWJlciI6IjE4NzAwMDAwMDA2IiwiYWNjb3VudFR5cGUiOiJQRVJTT05BTCIsInVzZXJJZCI6IjExMjY0ZjA1NjlmZTQ0MDY4NWZmMDU5NDQ1ODI1NTA2IiwiY29tcGFueUlkIjoiODM4MTQ4MjEwZTIxNDU0MWI1YWNjODdjMWM0NmQyYzciLCJjb21wYW55TmFtZSI6IndoeeaWveW3peWNleS9jSIsImp0aS11dWlkIjoianRpLTdjMTE5OTBmLTdkOWUtNDEzMy05ZDE4LTQyZDkxZTU4MTI4YiIsImV4cCI6MTYxMTkyNDE3N30.I46lTGWLpC-_SLi6WmleGznxtjBnCEwg7hL70ZBQKqA&random=0.19702956950245598&format=pdf&__filename__=测试下载',
            'http://10.0.10.220/FineReport/ReportServer?reportlet=jspro-reportlets/question/%E8%87%AA%E6%9F%A5%E8%87%AA%E7%BA%A0%E6%A3%80%E6%9F%A5%E8%A1%A8.cpt&id=d3e8542ee2fc473a8c2b3b806d36ea36&apiDomain=http://10.0.10.181:8080/question-service&qrurl=http://jspro-test.oss-cn-shenzhen.aliyuncs.com/qr/4de9ac7be5704a03ae0731c0dd303b66&token=eyJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOiIwNGJjYTZjY2I1ZTU0MjBjOWYxODAyYWJkYTRhZjY1NSIsImVtYWlsIjoiMTg3MDY4OTA1NTRAcXEuY29tIiwibmFtZSI6IndoeV9jajIiLCJ1c2VybmFtZSI6IndoeV9jajIiLCJwaG9uZU51bWJlciI6IjE4NzAwMDAwMDA2IiwiYWNjb3VudFR5cGUiOiJQRVJTT05BTCIsInVzZXJJZCI6IjExMjY0ZjA1NjlmZTQ0MDY4NWZmMDU5NDQ1ODI1NTA2IiwiY29tcGFueUlkIjoiODM4MTQ4MjEwZTIxNDU0MWI1YWNjODdjMWM0NmQyYzciLCJjb21wYW55TmFtZSI6IndoeeaWveW3peWNleS9jSIsImp0aS11dWlkIjoianRpLTdjMTE5OTBmLTdkOWUtNDEzMy05ZDE4LTQyZDkxZTU4MTI4YiIsImV4cCI6MTYxMTkyNDE3N30.I46lTGWLpC-_SLi6WmleGznxtjBnCEwg7hL70ZBQKqA&random=0.19702956950245598&format=pdf&__filename__=测试下载2'
        ] 
        // arr.forEach(item => {
        //     this.download('', item)
        //   })
        for (let i = 0; i < arr.length; i++) {
            debugger
            let url = arr[i];
            window.open(url)
                
        }
      };
    // const funasd = (str) => {
    //     debugger
    //     var res = ""
    //     console.log('res')
    //      if(typeof(str) === "string"){
    //         res = JSON.parse(str)
    //         funasd(res)
    //      }
    //      return res
    // }
    // var b = {a:1,b:2}
    // var a = fun(JSON.stringify(JSON.stringify(b)))
    
    render(){
        const funasd = (str) => {
            debugger
            let res = ''
            console.log('res')
             if(typeof(str) === "string"){
                res = JSON.parse(str)
                funasd(res)
             }else{
                res = str
                 console.log('res----',res)
                return res
             }
             
        }
        return (
            <div style={{width:'100%',height:'100%',background:'#C1F5E8'}}>
                <h1>this is page4</h1>

                {/* <div  style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',border:'10px solid #000',}} >
                    <div style={{height:'50%',background:'red'}}></div>
                    <div style={{flex:1,background:'blue'}}>
                        <div style={{width:'100%',height:"50%",background:'green',overflow:'auto'}}>
                            <div style={{height:800,background:'gray'}}></div>
                        </div>
                    </div>
                </div> */}
                {/* <Button onClick = {this.onPromiseTest.bind(this,{arr:[{id:1,name:1,sign:1},{id:2,name:0,sign:1},{id:3,name:1,sign:0},{id:4,sign:0,name:0}],count:0})}>开始请求</Button>   */}
                <Button onClick = {this.testRequest}>开始请求</Button>  
                <p>测试结果---{this.state.testId}</p>
                {/* <Button onClick = {()=>funasd(JSON.stringify(JSON.stringify({a:1,b:2})))}>下载文件</Button> */}
                <Button onClick = {()=>funasd("456465465")}>下载文件</Button>
                {/* <Button onClick = {()=>this.funasd.bind(this,JSON.stringify(JSON.stringify({a:1,b:2})))}>下载文件</Button> */}
                <Button onClick = {()=>{console.log("fs-----",FS)}}>fs</Button>
            </div>
        )
    }
}

export default Page4;
