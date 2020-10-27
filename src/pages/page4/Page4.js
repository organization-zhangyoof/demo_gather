import React,{Component} from'react'
class Page4 extends Component {
    render(){
        return (
            <div style={{width:'100%',height:'100%',background:'#C1F5E8'}}>
                <h1>this is page4</h1>

                <div  style={{height:'100%',width:'100%',display:'flex',flexDirection:'column',border:'10px solid #000',}} >
                    <div style={{height:'50%',background:'red'}}></div>
                    <div style={{flex:1,background:'blue'}}>
                        <div style={{width:'100%',height:"50%",background:'green',overflow:'auto'}}>
                            <div style={{height:800,background:'gray'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Page4;
