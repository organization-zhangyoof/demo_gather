import React,{Component} from'react'
import { Icon } from 'antd';
import styles from './publishPage.less'
const screenW = document.body.clientWidth
const screenH = document.body.clientHeight
const R  = 250 //大圆半径
const nodeR = 5 //节点圆半径
const textList = [
    [
        {
            id:1-1,
            name:'工程划分'
        },
        {
            id:1-2,
            name:'开工管理'
        },
    ],
    [
        {
            id:2-1,
            name:'质量管理'
        },
        {
            id:2-2,
            name:'进度管理'
        },
        {
            id:2-3,
            name:'试验管理'
        },
    ],
    [
        {
            id:3-1,
            name:'计量支付'
        },
        {
            id:3-2,
            name:'合约管理'
        },
        {
            id:3-3,
            name:'安全管理'
        },
    ],
    [
        {
            id:4-1,
            name:'协同办公'
        },
    ],
    [
        {
            id:5-1,
            name:'征拆管理'
        },
        {
            id:5-2,
            name:'环水保管理'
        },
        {
            id:5-3,
            name:'实景展示(GIS+BIM)'
        },
    ],
    [
        {
            id:6-1,
            name:'模型管理'
        },
        {
            id:6-2,
            name:'现场大事记'
        },
        {
            id:6-3,
            name:'考勤管理'
        },
    ],
    [
        {
            id:7-1,
            name:'公路驾驶舱'
        },
        {
            id:7-2,
            name:'工地检查'
        },
    ],
    [
        {
            id:8-1,
            name:'系统管理'
        },
    ],
]
class PublishPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            percent:0
        };
    }
    /**
     * 
     * @param {*} x 圆心X
     * @param {*} y 圆心Y
     * @param {*} r 半径
     * @param {*} a 角度
     */
    calcPoint = (x,y,r,a)=>{
        let pointX =  x + r * Math.cos(a * Math.PI / 180)
        let pointY =  y + r * Math.sin(a * Math.PI / 180)
        return {x:pointX,y:pointY}
    }
    /**
     * 绘制圆上的小圆圈
     * @param {*} ctx 画笔
     * @param {*} angle 角度
     */
    lightCircle = (ctx,angle,isFill,isStroke,drawLine,num) => {
        let originX= Math.ceil(screenW/2)
        let originY= Math.ceil(screenH/2)
        let {x,y} = this.calcPoint(originX,originY,R,angle)
        let point= [
            {
                start:[10,-10],
                move1:[50,-50],
                move2:[100,-50],
            },
            {
                start:[10,0],
                move1:[10,0],
                move2:[100,0],
            },
            {
                start:[10,10],
                move1:[50,50],
                move2:[100,50],
            },
            {
                start:[0,10],
                move1:[0,50],
                move2:[0,100],
            },
            {
                start:[-10,10],
                move1:[-50,50],
                move2:[-100,50]
            },
            {
                start:[-10,0],
                move1:[-10,0],
                move2:[-100,0]
            },
            {
                start:[-10,-10],
                move1:[-50,-50],
                move2:[-100,-50]
            },
            {
                start:[0,-10],
                move1:[0,-50],
                move2:[0,-100]
            },
        ]
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'gray';//轮廓色
        ctx.fillStyle = '#fff';//填充色
        ctx.arc(x, y, nodeR, 0, 2*Math.PI, false);
        if(isFill){
            ctx.shadowOffsetX = 0; // 阴影baiY轴偏移
            ctx.shadowOffsetY = 0; // 阴影X轴偏移
            ctx.shadowBlur = 5; // 模糊尺寸
            ctx.shadowColor = '#fff'; // 颜色
        }
        isStroke && ctx.stroke();
        isFill && ctx.fill()
        ctx.restore();
        if(drawLine){
            ctx.beginPath();
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#13447E';//轮廓色
            ctx.moveTo(x+point[num].start[0], y+point[num].start[1]);
            ctx.lineTo(x+point[num].move1[0], y+point[num].move1[1]);
            ctx.lineTo(x+point[num].move2[0], y+point[num].move2[1]);
            ctx.stroke();
                let dom = document.getElementById('publish_item_'+num)
                dom.style.display = "block"
                let H = dom.offsetHeight
                let W = dom.offsetWidth
                console.log("H====",H)
                if(num == 0 || num == 1 || num == 2){
                    dom.style.top = y+point[num].move2[1] - H/2 + 'px'
                    dom.style.left = x+point[num].move2[0] + 15 + 'px'
                }else if(num == 3){
                    dom.style.top = y + point[num].move2[1] + 15 + 'px'
                    dom.style.left = x + point[num].move2[0] - W/2+ 'px'
                }else if(num == 4 || num == 5 || num == 6){
                    dom.style.top = y+point[num].move2[1] - H/2 + 'px'
                    dom.style.left = x+point[num].move2[0] - W - 15 + 'px'
                }else{
                    dom.style.top = y + point[num].move2[1] - H - 15 + 'px'
                    dom.style.left = x + point[num].move2[0] - W/2+ 'px'
                }

        }
    }
    /**
     * 进度圆绘制
     * @param {*} time 需要的总时长，单位'秒'
     */
    startDraw =  (time)=>{
        let partTime = time*1000/8
        let speed = partTime/10
        const canvas = document.getElementById('publish_canvas');
        const ctx = canvas.getContext('2d'); // 二维上下文
        let originX= Math.ceil(screenW/2)
        let originY= Math.ceil(screenH/2)
        // let total = time/speed
        let percent = 0
        let percentStep = (100/8/9).toFixed(2) *1
        let startAngle = -45
        let total = time*1000/speed
        let count = 0
        let totalCount = 0
        let start = -0.5*Math.PI+Math.asin( nodeR*2/R )
        let step = (0.25*Math.PI - 2*Math.asin( nodeR*2/R ))/10
        let end = start + step
        this.timmer = setInterval(()=>{
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#fff';//轮廓色
            ctx.arc(originX, originY, R, start, end, false);
            ctx.stroke();
            if(count< 9){
                percent = percentStep + percent
                this.setState({percent})
                count++
                start = start +step
                end = end+step
            }else{
                if(totalCount < 7 ){
                    totalCount++
                    start = (-0.5+(0.25*totalCount))*Math.PI+Math.asin( nodeR*2/R )
                    end = start + step
                    count = 0
                    this.lightCircle(ctx,startAngle+45*(totalCount-1),true,false,true,totalCount-1)
                    
                }else{
                    this.lightCircle(ctx,270,true,false,true,totalCount)
                    clearInterval(this.timmer)
                    this.timmer = null
                }
            }
        },speed)
    }
    componentDidMount(){
        
        let originX= Math.ceil(screenW/2)
        let originY= Math.ceil(screenH/2)

        const canvas = document.getElementById('publish_canvas');
        const ctx = canvas.getContext('2d'); // 二维上下文
        let dom = document.getElementById("publish_percent_box")
        let H = dom.offsetHeight
        let W = dom.offsetWidth
        dom.style.top = originY - H/2  + 'px'
        dom.style.left = originX - W/2 + 'px'
        //绘制初始底色节点
        for (let i = -90; i < 360; i = i+45) {
            this.lightCircle(ctx,i,false,true)
        }
        //绘制初始底色圆
        let start = 0
        let end = 0.25
        for (let j = 0; j < 8; j++) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'gray';//轮廓色
            ctx.arc(originX, originY, R, start*Math.PI+Math.asin( nodeR*2/R ) , end*Math.PI-Math.asin( nodeR*2/R ), false);
            ctx.stroke();
            start = start+0.25
            end = end + 0.25    
        }
        this.startDraw(8)
    }
    render() {
        console.log('this.state.percent.toFixed(0)===',this.state.percent.toFixed(0))
        return (
            <div className={styles.publish_page}>
                <canvas id="publish_canvas" width={screenW} height={screenH}>
                    您的浏览器不支持 Canvas!
                </canvas>
                <div style={{position:"absolute"}} className={styles.percent_box} id = {'publish_percent_box'}>
                    <div style={{height:180}}>
                        <div className={styles.percent_text}
                        style={{fontSize:this.state.percent.toFixed(0)>=100?45:90}}
                        >
                            {
                                this.state.percent.toFixed(0)>=100?'发布成功':this.state.percent.toFixed(0) + "%"
                            }
                            {/* {this.state.percent.toFixed(0)+"%"} */}
                        </div>
                    </div>
                    <div className={styles.percent_title}>
                        BIM智慧建设平台(公路板)V1.0
                    </div>
                    <div className={styles.publish_login}
                        style={{display:this.state.percent.toFixed(0)>=100?'block':'none'}}
                    >
                        登录平台 <Icon type="double-right" /> 
                    </div>
                </div>
                {
                    textList.map((item,index)=>{
                        return <div className = {styles.publish_item} key={index} id = {'publish_item_'+index}>
                            {
                                item.map(tmp=>{
                                   return <div className = {styles.item_container} key={tmp.id}> 
                                        <div className = {styles.circle}></div>
                                        <div className = {styles.text}>{tmp.name}</div>
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        )
    }
}

export default PublishPage;