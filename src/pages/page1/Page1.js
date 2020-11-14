import React,{Component} from'react'
import { Button } from 'antd'
import styles from '../index.less'
import { router } from 'umi';

class Page1 extends Component {
    render(){
        const openNewTag = () => {
            window.open("http://www.baidu.com")
            // window.location.href = "http://www.baidu.com"
        }
        return (
            <div style={{width:'100%',height:'100%',background:'#f1f1f1'}} className={styles.page1_main}>
                <div>
                    <h1>this is page1</h1>
                    <Button onClick={()=>router.push('/page1/page1-2')} className = {styles.btn}>内嵌page2</Button>
                    <Button onClick={()=>router.push('/page1/page1-3')} className = {styles.btn}>内嵌page3</Button>
                    <Button onClick={()=>router.push('/page1/page1-4')} className = {styles.btn}>内嵌page4</Button>
                    <Button onClick={openNewTag} className = {styles.btn}>打开新的tag</Button>
                </div>
                <div className={styles.sub_container}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Page1;
