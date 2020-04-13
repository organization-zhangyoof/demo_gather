import React,{Component} from'react'
import Home from '@/pages/homePage/HomePage'
class BasicLayout extends Component {
    render(){
        return (
            <Home>
                {this.props.children}
            </Home>
        )
    }
}

export default BasicLayout;
