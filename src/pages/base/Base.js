import React,{Component} from'react'
class Base extends Component {
    testFun(x,y){
        return x+y
    }
    testSetState(obj){
        debugger
        this.setState(obj)
    }
}

export default Base;
