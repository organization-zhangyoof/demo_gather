import React,{Component} from'react'
class Base extends Component {
    testFun(x,y){
        return x+y
    }
    testSetState(obj){
        debugger
        this.setState(obj)
    }
    render(){
        const handleClick = () => {
            let {x,y} = this.state
            let res = this.testFun(x,y)
            this.setState({res })
        }
        return (
            <div style={{width:'100%',height:'100%',background:'#f1f1f1'}} >
                4564656
            </div>
        )
    }
}

export default Base;
