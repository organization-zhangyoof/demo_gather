import React,{Component} from'react'
// import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
import GC from '@grapecity/spread-sheets';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import openImg from '../../assets/square-open.png'
import closeImg from '../../assets/square-close.png'
import { Button, Modal } from "antd"
import {customCellType, TipCellType, EllipsisTextCellType, EllipsisAndToolTip, HyperLinkTextCell,SingleHyperLinkCell,EllipsisOrderLine} from './spreadFun'

GC.Spread.Common.CultureManager.culture("zh-cn");
class SpreadHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
        if (this.state.data && this.state.data.length) {
            console.log(60)
            let sheet = this.spread.getActiveSheet();
            // 暂停sheet绘制，等待所有改变完成
            sheet.suspendPaint();
            //激活后再次初始化一次spreadSheet否则绘制会有问题
            this.initSheetOutline();
            
            // 激活spread绘制
            sheet.resumePaint();
            sheet.autoFitColumn(0)
        }
    }
    componentWillMount(){
        setTimeout(()=>{
            this.setState({
                data:[
                    // {name:'艾瑞莉娅大数据哈师大很快就暗示的科技按时的痕迹',age:20,gender:0,department:'工程部返回的数据返回快速导航开发计划是的空间',partName:'partName单位工程',level:'1',nodeType:1,remark:'是多大'},
                    // {name:'艾瑞莉娅大数据哈师大很快就暗示的科技按时的痕迹',age:20,gender:0,department:'工程部返回的数据返回快速导航开发计划是的空间',partName:'partName单位工程',level:'1',nodeType:1,remark:''},
                    {name:'艾瑞莉娅大数据哈师大很快就暗示的科技按时的痕迹-1',age:20,gender:0,department:'工程部返回的数据返回快速导航开发计划是的空间',partName:'1partName单位工程沙迪克讲哈圣诞节阿萨德',level:'1',nodeType:1,remark:'电视电话就是点击考核数据和点击开始的计划的环境闪电借款红烧鸡块对话框撒谎的开始的计划萨科技打火机卡圣诞节会撒娇实景后端框架sad卡萨很快就的撒款车型在能吃吗真不错科技按数据库洒出'},
                    {name:'瑞文',age:20,gender:0,department:'工程1部',partName:'2partName子单位工程大恒科技对话框是骄傲的',level:'1-1',nodeType:2,remark:'慌撒的看哈是框架'},
                    {name:null,age:20,gender:0,department:'工程1部',partName:'2partName子单位工程山东省科技奥迪卡斯基多拉数据的',level:'1-1',nodeType:2,remark:'慌撒的看哈是框架<html><div><span></span></div>'},
                    {name:'伊泽瑞尔',age:20,gender:0,department:'工程1部材料中心',partName:'3partName分部工程圣诞节卡回复晶科科技实的数据啊按时',level:'1-1-1',nodeType:3,remark:'撒德哈卡大数据汇顶科技按数据库的'},
                    {name:'莫德凯撒',age:20,gender:0,department:'工程1部材料中心01',partName:'4partName子分部工程奥术大师多',level:'1-1-1-1',nodeType:4,remark:'第三方的深V说的'},
                    {name:'劫',age:20,gender:0,department:'工程1部材料中心01',partName:'5partName实体单元奥术大师建档立卡静安寺',level:'1-1-1-1-1',nodeType:5,remark:'包括交换机'},
                    {name:'奥瑞利安·索尔',age:20,gender:0,department:'工程1部材料中心01',partName:'6partName分项工程我去额为群殴IE噢轻微碰破千万我我去问问打开了收没收到吗',level:'1-1-1-1-1-1',nodeType:6,remark:'才下班成就感圣诞节'},
                    {name:'卡西奥佩娅',age:20,gender:0,department:'工程1部材料中心01',partName:'7partName清单水电费拉防控来得及萨里看风景大立科技阿弗莱克就爱康',level:'1-1-1-1-1-1-1',nodeType:7,remark:'出生地更富于'},
                    {name:'费德提克',age:20,gender:0,department:'工程1部材料中心02',partName:'partName子分部工程',level:'1-1-1-2',nodeType:4,remark:'层次感股有多少'},
                    {name:'纳尔',age:20,gender:0,department:'工程1部实验中心',partName:'partName分部工程',level:'1-1-2',nodeType:3,remark:'胜多负少的缴费基数的附件时代峻峰看来是点击发送点击父节点收款机房，返回第三方士大夫is电话费对事故已覆盖但是'},
                    {name:'迦娜',age:20,gender:0,department:'工程2部',partName:'partName子单位工程',level:'1-2',nodeType:2,remark:'于死地环境换成申达股份感受度覆盖但是'},
                    {name:'厄斐琉斯-1',age:20,gender:0,department:'事业部',partName:'partName单位工程',level:'2',nodeType:1,remark:'报错说感觉还型从放大后圣诞节开会附件都是'},
                    {name:'克烈',age:20,gender:0,department:'事业1部',partName:'partName子单位工程',level:'2-1',nodeType:2,remark:'的跳跃体育'},
                    {name:'克烈',age:20,gender:0,department:'事业部-附属1部的还是接口返回的数据库',partName:'partName子单位工程',level:'2-1-1',nodeType:2,remark:'的跳跃发货单就多福多寿很费劲东方红郡爱可登体育'},
                    {name:'茂凯',age:20,gender:0,department:'事业2部',partName:'partName子单位工程',level:'2-2',nodeType:2,remark:'日番谷冬狮'},
                    {name:'易-1',age:20,gender:0,department:'销售部',partName:'partName单位工程',level:'3',nodeType:1,remark:'熊皮哦'},
                    {name:'内瑟斯',age:20,gender:0,department:'销售1部',partName:'partName子单位工程',level:'3-1',nodeType:2,remark:'同一个合并'},
                    {name:'拉莫斯',age:20,gender:0,department:'销售2部',partName:'partName子单位工程',level:'3-2',nodeType:2,remark:'大商股份几乎都是'},
                ]
            })

        },1000)
    }
    componentDidMount(){
        // this.initSheetOutline();
    }
    initSpreadSheets = (spread) => {
        console.log(99)
        this.spread = spread;
        if(this.state.data && this.state.data.length){
            console.log(102)
            this.initSheetOutline()
        }

        // spread.options.showVerticalScrollbar = true;
        // spread.options.showHorizontalScrollbar = true;
    }

    linkClickFun1 = (res) => {
        // alert("超链接点击")
        console.log("引用1点击=====",res)
        this.setState({visible:true})
        // this.linkClickFun2()
    }
    linkClickFun2 = () => {
        console.log("引用2点击")
        alert("引用2点击")
    }

    initSheetOutline = () => {

        let data = this.state.data
        let sheet = this.spread.getActiveSheet();
        sheet.bind(GC.Spread.Sheets.Events.RangeGroupStateChanging, function (e, info) {    
            console.log("Level (" + info.level + ")");
        });
        sheet.bind(GC.Spread.Sheets.Events.rangGroupStateChanged, function (e, info) {    
            console.log("Level (" + info.level + ")");
        });
        //rangeGroupStateChanging
        //rangGroupStateChanged
        sheet.options.isProtected = true
        let linkArr = [
            {name:'超链接',color:'red',clickFun:(res)=>this.linkClickFun1(res),tipText:''},
            {name:'引用',color:'blue',clickFun:this.linkClickFun2}
        ]
        let columns = [
            // { visible: true, name: "xuhao", displayName: '序号',width:200},
            { visible: true, name: "partName", displayName: '工程划分', cellType: new customCellType(this.state.data,'partName','','',true,"nodeType",100)},
            { visible: false, name: "HyperLink", displayName: '超链接测试',width:400,},
            // { visible: true, name: "name", displayName: '姓名' ,cellType: new HyperLinkTextCell(linkArr,"__spread_js_box__"),width:300},
            { visible: true, name: "name", displayName: '姓名' ,width:300},
            { visible: true, name: "age", displayName: '年龄', width: 400 },
            { visible: true, name: "gender", displayName: '性别', width: 100 },
            { visible: true, name: "remark", displayName: '备注',width:200,cellType: new EllipsisOrderLine("__spread_js_box__",3,)},
            { visible: true, name: "department", displayName: '部门',width:200,cellType: new EllipsisAndToolTip("__spread_js_box__",'center')},
            { visible: true, name: "remark", displayName: 'partName',width:200,cellType: new SingleHyperLinkCell("__spread_js_box__",'center','red')},
            // { visible: true, name: "remark", displayName: 'remark',width:200,},
            // { visible: true, name: "remark", displayName: 'remark',width:200, cellType: new EllipsisOrderLine("__spread_js_box__",2)},
            { visible: true, name: "xuanze", displayName: '选择',width:200,},
        ]
        
        if(this.state.data){
            sheet.setDataSource(this.state.data);
            sheet.bindColumns(columns)
        }
        

        let spreadNs = GC.Spread.Sheets

        // 设置复选框

        let  single = new SingleHyperLinkCell();
                single.parentId = '__spread_js_box__'
                single.textAlign = 'center'
                single.color = 'green'
                single.clickFun = ()=>{
                    this.setState({visible:true})
                }
        let hyperLink = new HyperLinkTextCell(linkArr,"__spread_js_box__")
        for(let r = 0;r<data.length;r++){
            let num = 0
            let item = data[r]
            num = item.level.split("-").length - 1
            //设置缩进
            sheet.getCell(r,0).textIndent(num)
            sheet.getCell(r,0).locked(false)
            let checkBox = new GC.Spread.Sheets.CellTypes.CheckBox();
            // checkBox.isThreeState(false);
            
            sheet.setCellType(r, 8, checkBox, GC.Spread.Sheets.SheetArea.viewport);
            sheet.getCell(r,8).locked(false)
            // sheet.setCellType(r, 7, single, GC.Spread.Sheets.SheetArea.viewport);
            // if(r%2 == 0){
                sheet.setCellType(r, 2, hyperLink, GC.Spread.Sheets.SheetArea.viewport);
            // }
        }
        
        sheet.bind(GC.Spread.Sheets.Events.CheckBox, function() {
            console.log(123)
        });
        //设置标题行及数据行高
        sheet.defaults.colHeaderRowHeight = 48
        sheet.defaults.rowHeight = 70
        spreadNs.AutoFitType.cellWithHeader = true

        //隐藏行号
        // sheet.setColumnVisible(0,false,GC.Spread.Sheets.SheetArea.rowHeader)
        //分组设置

        

        sheet.showRowOutline(false)
        sheet.outlineColumn.options({
            columnIndex:0,
            expandIndicator:closeImg,
            collapseIndicator:openImg,
            showCheckBox:true
        })
        //控制树的展开收缩需要放在设置outlineColumn.options之后，否则不生效，参数有两个，第一个参数为层级，第二个为是否展开
        // if(isInit){
            sheet.rowOutlines.expand(0, false);
            sheet.rowOutlines.expand(1, false);
            sheet.rowOutlines.expand(2, false);
            sheet.rowOutlines.expand(3, false);
            sheet.rowOutlines.expand(4, false);
            sheet.rowOutlines.expand(5, false);
            sheet.rowOutlines.expand(6, false);
            sheet.rowOutlines.expand(7, false);
        // }
        // sheet.rowOutlines.setCollapsed(0, true);

        // sheet.rowOutlines.setCollapsed(1,true);

        sheet.bind(GC.Spread.Sheets.Events.RangeGroupStateChanging, function (e, info) {    
            console.log("Level (" + info.level + ")");
        });
        sheet.bind(GC.Spread.Sheets.Events.rangGroupStateChanged, function (e, info) {    
            console.log("Level (" + info.level + ")");
        });

        sheet.outlineColumn.refresh();
        //在使用分组列自带的复选框时，可以如下方法来设置复选框是否被选中。第一个参数为行号 第二个参数为是否被选中
        sheet.outlineColumn.setCheckStatus(0,true)
    }

    handleCancel = ()=>{
        this.setState({visible:false})
    }

    render(){
        const openLevel = () => {
            let sheet = this.spread.getActiveSheet();
            //设定收缩某一行两个参数，第一个参数为行号，第二个参数为是否收缩
            sheet.rowOutlines.setCollapsed(0, false);
            
            sheet.rowOutlines.setCollapsed(1, false);
            sheet.rowOutlines.setCollapsed(2, false);
            sheet.rowOutlines.setCollapsed(3, false);
            sheet.rowOutlines.setCollapsed(4, false);
            sheet.rowOutlines.setCollapsed(5, false);
            sheet.rowOutlines.setCollapsed(6, false);
            sheet.rowOutlines.setCollapsed(7, false);
            sheet.rowOutlines.setCollapsed(8, false);
            sheet.rowOutlines.setCollapsed(9, false);
            sheet.rowOutlines.setCollapsed(10, false);
            sheet.rowOutlines.setCollapsed(11, false);
            sheet.invalidateLayout();
            sheet.repaint()
        }
        const clickCellHandler = (sheet,sheetName,row,col,cancel) =>{
            // console.log("sheet======",sheet)
            // console.log("sheetName======",sheetName)
            // console.log("row======",row)
            // console.log("col======",col)
            // console.log("cancel======",cancel)
        }
        let columns = [
            // { visible: true, name: "xuhao", displayName: '序号',width:200},
            { visible: true, name: "nodeType", displayName: '工程划分',width:300,},
            { visible: false, name: "HyperLink", displayName: '超链接测试',width:400,},
            { visible: true, name: "name", displayName: '姓名' ,width:300},
            { visible: true, name: "age", displayName: '年龄', width: 400 },
            { visible: true, name: "gender", displayName: '性别', width: 100 },
            { visible: true, name: "remark", displayName: '备注',width:200,},
            { visible: true, name: "department", displayName: '部门',width:200,},
            // { visible: true, name: "remark", displayName: 'partName',width:200,cellType: new SingleHyperLinkCell("__spread_js_box__",'center','red')},
            { visible: true, name: "remark", displayName: 'partName',width:200,},
        ]
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleCancel}
                    onCancel={this.handleCancel}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
                <div>
                    {/* <Button onClick = {changeCloumns} disabled = {this.state.showCloumn1}>点击切换列1</Button>
                    <Button onClick = {changeCloumns} disabled = {!this.state.showCloumn1}>点击切换列2</Button> */}
                    <Button onClick = {openLevel} >展开</Button>
                </div>
                <div style={{width:'100%',height:'100%',background:'#C1F5E8',position:'relative'}} id="__spread_js_box__">
                    <SpreadSheets hostStyle={{width: '100%', height: '550px'}}
                            workbookInitialized={spread => this.initSpreadSheets(spread)}
                            tabStripVisible={false}
                            showVerticalScrollbar={true}
                            showHorizontalScrollbar={true}
                            allowUserDragDrop={false}
                            allowContextMenu={false}
                            scrollbarMaxAlign={false}
                            allowUserResize = {true}
                            //   valueChanged={onCellrefresh}
                            cellClick={clickCellHandler} //单元格点击
                    >
                        {/* <Worksheet dataSource = {this.state.data}
                                name={"合同工程量清单"}
                                selectionPolicy={GC.Spread.Sheets.SelectionPolicy.single}
                                selectionUnit={GC.Spread.Sheets.SelectionUnit.row}
                                selectionBackColor={'transparent'}
                                autoGenerateColumns={false}
                                isProtected={true}
                                // autoFitColumn = {true}
                        >
                            {
                                this.state.data.length && columns.length && columns.map((item,index) => (
                                    <Column
                                        visible={item.visible}
                                        dataField={item.name}
                                        key={item.name}
                                        headerText={item.displayName}
                                        width={!item.width ? '': item.width}
                                        style={{background:'red' }}
                                        autoFit = {item.width?false:true}
                                        cellType = {item.cellType}
                                        autoFitColumn = {true}

                                    />
                                ))
                            }
                        </Worksheet> */}
                    </SpreadSheets>
                </div>
            </div>
        )
    }
}

export default SpreadHome;
