import React, { Component } from 'react';
import { Button } from 'antd';
import styles from '../index.less';
import { router } from 'umi';

class IframePage extends Component {
    render(){
        return (
            <div style={{width:'100%',height:'100%',background:'#f1f1f1'}} className={styles.page1_main}>
                <iframe src = 'blob:http://localhost:8991/109064cf-177e-47bf-9001-3792136f1700'  style={{width:'100%',height:'100%'}}></iframe>
            </div>
        )
    }
}

export default IframePage;
