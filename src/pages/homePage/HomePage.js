import React, { Component } from 'react'
import styles from '../index.less'
import { Button } from 'antd'
import { router } from 'umi';
import { Link } from 'umi';
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div className={styles.main}>
                {/* <div className = {styles.nav}>
                    <h1>导航区</h1>
                </div> */}
                <div className={styles.btn_box}>
                    <Button onClick={() => router.push('/page1')} className={styles.btn}>跳转至Page1</Button>
                    <Button onClick={() => router.push('/demo')} className={styles.btn}>寇晓丽</Button>
                    <Button onClick={() => router.push('/page2')} className={styles.btn}>跳转至Page2</Button>
                    <Button onClick={() => router.push('/page3')} className={styles.btn}>跳转至Page3</Button>
                    <Button onClick={() => router.push('/page4')} className={styles.btn}>跳转至Page4</Button>
                    <Button onClick={() => router.push('/spreadJS')} className={styles.btn}>跳转至spread</Button>
                    <Button onClick={() => router.push('/spreadIo')} className={styles.btn}>跳转至spread导入导出</Button>
                    <Button onClick={() => router.push('/basetest')} className={styles.btn}>跳转至BaseTest</Button>
                    <Button onClick={() => router.push('/spreadDesign')} className={styles.btn}>跳转至spread设计器</Button>
                    {/* <Link to="/page1">Go to list page1</Link> */}
                </div>
                <div className={styles.container}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default HomePage;
