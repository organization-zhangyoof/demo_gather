import React,{Component} from'react'
import Home from '@/pages/page1/Page1'
class Layout extends Component {
    render(){
        return (
            <Home>
                {this.props.children}
            </Home>
        )
    }
}

export default Layout;
