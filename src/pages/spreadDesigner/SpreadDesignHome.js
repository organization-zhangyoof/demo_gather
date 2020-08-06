import React,{Component} from'react'
class SpreadDesigner extends Component {
    render(){
        const tableId = ''
        const srcUrl = '/spread/src/index/index.html?tableId=' + tableId
        return (
            <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
                <iframe style={{height:'100%',width:'100%'}} src= {srcUrl}></iframe>
            </div>
        )
    }
}

export default SpreadDesigner;
