import React,{Component} from'react'
import { Button } from 'antd'
import { router } from 'umi';
import Base from './Base'

class Page1 extends Base {

    constructor(props){
        super(props)
        this.state = {
            x:5,
            y:6,
            res:'点击计算6+5'
        }
    }

    render(){
        const handleClick = () => {
            let {x,y} = this.state
            let res = this.testFun(x,y)
            this.testSetState({res})
        }
        return (
            <div style={{width:'100%',height:'100%',background:'#f1f1f1'}} >
                BaseTest
                <Button onClick={handleClick}>{this.state.res}</Button>
                
            </div>
        )
    }
}

export default Page1;
