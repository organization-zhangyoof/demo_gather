import React, { Component } from 'react';
import { Button } from 'antd';
import styles from '../index.less';
import { router } from 'umi';

class IframePage extends Component {
    render(){
        return (
            <div style={{width:'100%',height:'100%',background:'#f1f1f1'}} className={styles.page1_main}>
                <div style={{width:500,height:500}}>
                    <iframe src = 'http://localhost:8991/page2'  style={{width:'100%',height:'100%',border:'none'}}></iframe>
                </div>
                
            </div>
        )
    }
}

export default IframePage;
