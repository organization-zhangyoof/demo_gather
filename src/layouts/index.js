import React,{Component} from'react'
import Home from '@/pages/homePage/HomePage'
class BasicLayout extends Component {
    render(){
        return (
                this.props.children.props.location.pathname=='/publish'?
                this.props.children:
                <Home>
                    {this.props.children}
                </Home>
        )
    }
}

export default BasicLayout;
