import React,{Component} from'react'
import styles from './publishPage.less'
const screenW = document.body.clientWidth
const screenH = document.body.clientHeight
const R  = 250 //大圆半径
const nodeR = 5 //节点圆半径
class PublishPage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
    lightCircle = (ctx,angle,isFill,isStroke,drawLine) => {
        let originX= Math.ceil(screenW/2)
        let originY= Math.ceil(screenH/2)
        let {x,y} = this.calcPoint(originX,originY,R,angle)
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'gray';//轮廓色
        ctx.fillStyle = '#fff';//填充色
        ctx.arc(x, y, nodeR, 0, 2*Math.PI, false);
        isStroke && ctx.stroke();
        isFill && ctx.fill()
        // if(drawLine){
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';//轮廓色
            ctx.fillStyle = 'blue';//填充色
            ctx.moveTo(x+10, y-10);
            ctx.lineTo(x+130, y-140);
            ctx.lineTo(x+330, y-140);
            // ctx.closePath();
            ctx.stroke();
        // }
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
                count++
                start = start +step
                end = end+step
            }else{
                if(totalCount < 7 ){
                    totalCount++
                    start = (-0.5+(0.25*totalCount))*Math.PI+Math.asin( nodeR*2/R )
                    end = start + step
                    count = 0
                    this.lightCircle(ctx,startAngle+45*(totalCount-1),true)
                    
                }else{
                    this.lightCircle(ctx,270,true)
                    clearInterval(this.timmer)
                    this.timmer = null
                }
                
            }
        },speed)
    }
    drawLine = () => {

    }
    componentDidMount(){
        
        let originX= Math.ceil(screenW/2)
        let originY= Math.ceil(screenH/2)

        const canvas = document.getElementById('publish_canvas');
        const ctx = canvas.getContext('2d'); // 二维上下文

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
        return (
            <div className={styles.publish_page}>
                <canvas id="publish_canvas" width={screenW} height={screenH}>
                    您的浏览器不支持 Canvas!
                </canvas>
            </div>
        )
    }
}

export default PublishPage;