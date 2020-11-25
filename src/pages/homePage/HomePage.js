import React,{Component} from 'react'
import styles from '../index.less'
import { Button } from 'antd'
import { router } from 'umi';
import { Link } from 'umi';
class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        window.__TEST_STRING__ = 'this is init string'
        window.__CHANGE_FUN__ = ()=>{
            alert(123)
        }
    }
    render(){
        let obj = {a:789,b:456}
        return (
            <div className={styles.main}>
                {/* <div className = {styles.nav}>
                    <h1>导航区</h1>
                </div> */}
                <div className = {styles.btn_box}>
                    <Button onClick={()=>router.push('/page1')} className = {styles.btn}>跳转至Page1</Button>
                    <Button onClick={()=>router.push('/page2')} className = {styles.btn}>跳转至Page2</Button>
                    <Button onClick={()=>router.push('/page3')} className = {styles.btn}>跳转至Page3</Button>
                    <Button onClick={()=>router.push('/page4')} className = {styles.btn}>跳转至Page4</Button>
                    <Button onClick={()=>router.push('/spreadJS')} className = {styles.btn}>跳转至spread</Button>
                    <Button onClick={()=>router.push('/spreadIo')} className = {styles.btn}>跳转至spread导入导出</Button>
                    <Button onClick={()=>router.push('/basetest')} className = {styles.btn}>跳转至BaseTest</Button>
                    <Button onClick={()=>router.push('/spreadDesign')} className = {styles.btn}>跳转至spread设计器</Button>
                    <Button onClick={()=>router.push('/iframe')} className = {styles.btn}>跳转至iframe嵌套页面</Button>
                    <Button onClick={()=>router.push('/bim')} className = {styles.btn}>跳转至BIM</Button>
                    <Button onClick={()=>router.push('/bMap?a=123&b=456&c='+JSON.stringify(obj))} className = {styles.btn}>跳转百度地图</Button>
                    
                    <Button onClick={()=>router.push('/bimDemo')} className = {styles.btn}>跳转至BIMDemo</Button>
                </div>
                <div className = {styles.container}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default HomePage;
