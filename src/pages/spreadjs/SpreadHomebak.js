import React,{Component} from'react'
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
import GC from '@grapecity/spread-sheets';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import openImg from '../../assets/square-open.png'
import closeImg from '../../assets/square-close.png'
import {Button} from "antd"
import {customCellType, TipCellType, EllipsisTextCellType, EllipsisAndToolTip, AdaptiveTextWidth} from './spreadFun'
GC.Spread.Common.CultureManager.culture("zh-cn");

class SpreadHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name:'艾瑞莉娅',age:20,gender:0,department:'1第三方的今飞凯达附近的开放开打了开发接口对接按付款的建安路附近的咖啡机两大框架反馈的减肥',partName:'单位工程',level:'1',nodeType:1},
                {name:'瑞文',age:20,gender:0,department:'工程1部',partName:'子单位工程',level:'1-1',nodeType:2},
                {name:'伊泽瑞尔',age:20,gender:0,department:'工程1部材料中心',partName:'分部工程',level:'1-1-1',nodeType:3},
                {name:'莫德凯撒',age:20,gender:0,department:'工程1部材料中心01',partName:'子分部工程',level:'1-1-1-1',nodeType:4},
                {name:'劫',age:20,gender:0,department:'工程1部材料中心01',partName:'实体单元',level:'1-1-1-1-1',nodeType:5},
                {name:'奥瑞利安·索尔',age:20,gender:0,department:'工程1部材料中心01',partName:'分项工程',level:'1-1-1-1-1-1',nodeType:6},
                {name:'卡西奥佩娅',age:20,gender:0,department:'工程1部材料中心01',partName:'清单',level:'1-1-1-1-1-1-1',nodeType:7},
                {name:'费德提克',age:20,gender:0,department:'工程1部材料中心02',partName:'子分部工程',level:'1-1-1-2',nodeType:4},
                {name:'纳尔',age:20,gender:0,department:'工程1部实验中心',partName:'分部工程',level:'1-1-2',nodeType:3},
                {name:'迦娜',age:20,gender:0,department:'工程2部',partName:'子单位工程',level:'1-2',nodeType:2},
                {name:'厄斐琉斯',age:20,gender:0,department:'事业部',partName:'单位工程',level:'2',nodeType:1},
                {name:'克烈',age:20,gender:0,department:'事业1部',partName:'子单位工程',level:'2-1',nodeType:2},
                {name:'茂凯',age:20,gender:0,department:'事业2部',partName:'子单位工程',level:'2-2',nodeType:2},
                {name:'易',age:20,gender:0,department:'销售部',partName:'单位工程',level:'3',nodeType:1},
                {name:'内瑟斯',age:20,gender:0,department:'销售1部',partName:'子单位工程',level:'3-1',nodeType:2},
                {name:'拉莫斯',age:20,gender:0,department:'销售2部的干撒罕见的国际化搜嘎大家好规划局爱上过的痕迹啊工商局',partName:'子单位工程',level:'3-2',nodeType:2},
            ],
            data1 : [
                {name1:'艾瑞莉娅',age1:20,gender1:0,department1:'1第三方的今飞凯达附近的开放开打了开发接口对接按付款的建安路附近的咖啡机两大框架反馈的减肥',partName1:'单位工程1',level:'1',nodeType1:1},
                {name1:'瑞文',age1:20,gender1:0,department1:'工程1部',partName1:'子单位工程1',level:'1-1',nodeType1:2},
                {name1:'伊泽瑞尔',age1:20,gender1:0,department1:'工程1部材料中心',partName1:'分部工程1',level:'1-1-1',nodeType1:3},
                {name1:'莫德凯撒',age1:20,gender1:0,department1:'工程1部材料中心01',partName1:'子分部工程1',level:'1-1-1-1',nodeType1:4},
                {name1:'劫',age1:20,gender1:0,department1:'工程1部材料中心01',partName1:'实体单元1',level:'1-1-1-1-1',nodeType1:5},
                {name1:'奥瑞利安·索尔',age1:20,gender1:0,department1:'工程1部材料中心01',partName1:'分项工程1',level:'1-1-1-1-1-1',nodeType1:6},
                {name1:'卡西奥佩娅',age1:20,gender1:0,department1:'工程1部材料中心01',partName1:'清单1',level:'1-1-1-1-1-1-1',nodeType1:7},
                {name1:'费德提克',age1:20,gender1:0,department1:'工程1部材料中心02',partName1:'子分部工程1',level:'1-1-1-2',nodeType1:4},
                {name1:'纳尔',age1:20,gender1:0,department1:'工程1部实验中心',partName1:'分部工程1',level:'1-1-2',nodeType1:3},
                {name1:'迦娜',age1:20,gender1:0,department1:'工程2部',partName1:'子单位工程1',level:'1-2',nodeType1:2},
                {name1:'厄斐琉斯',age1:20,gender1:0,department1:'事业部',partName1:'单位工程1',level:'2',nodeType1:1},
                {name1:'克烈',age1:20,gender1:0,department1:'事业1部',partName1:'子单位工程1',level:'2-1',nodeType1:2},
                {name1:'茂凯',age1:20,gender1:0,department1:'事业2部',partName1:'子单位工程1',level:'2-2',nodeType1:2},
                {name1:'易',age1:20,gender1:0,department1:'销售部',partName1:'单位工程1',level:'3',nodeType1:1},
                {name1:'内瑟斯',age1:20,gender1:0,department1:'销售1部',partName1:'子单位工程1',level:'3-1',nodeType1:2},
                {name1:'拉莫斯',age1:20,gender1:0,department1:'销售2部的干撒罕见的国际化搜嘎大家好规划局爱上过的痕迹啊工商局',partName1:'子单位工程1',level:'3-2',nodeType1:2},
            ],
            data2: [
                {name2:'艾瑞莉娅',age2:20,gender2:0,department2:'1第三方的今飞凯达附近的开放开打了开发接口对接按付款的建安路附近的咖啡机两大框架反馈的减肥',partName2:'单位工程',level:'1',nodeType2:1},
                // {name2:'瑞文',age2:20,gender2:0,department2:'工程1部',partName2:'子单位工程',level:'1-1',nodeType2:2},
                // {name2:'伊泽瑞尔',age2:20,gender2:0,department2:'工程1部材料中心',partName2:'分部工程',level:'1-1-1',nodeType2:3},
                // {name2:'莫德凯撒',age2:20,gender2:0,department2:'工程1部材料中心01',partName2:'子分部工程',level:'1-1-1-1',nodeType2:4},
                // {name2:'劫',age2:20,gender2:0,department2:'工程1部材料中心01',partName2:'实体单元',level:'1-1-1-1-1',nodeType2:5},
                // {name2:'奥瑞利安·索尔',age2:20,gender2:0,department2:'工程1部材料中心01',partName2:'分项工程',level:'1-1-1-1-1-1',nodeType2:6},
                // {name2:'卡西奥佩娅',age2:20,gender2:0,department2:'工程1部材料中心01',partName2:'清单',level:'1-1-1-1-1-1-1',nodeType2:7},
                // {name2:'费德提克',age2:20,gender2:0,department2:'工程1部材料中心02',partName2:'子分部工程',level:'1-1-1-2',nodeType2:4},
                // {name2:'纳尔',age2:20,gender2:0,department2:'工程1部实验中心',partName2:'分部工程',level:'1-1-2',nodeType2:3},
                // {name2:'迦娜',age2:20,gender2:0,department2:'工程2部',partName2:'子单位工程',level:'1-2',nodeType2:2},
                // {name2:'厄斐琉斯',age2:20,gender2:0,department2:'事业部',partName2:'单位工程',level:'2',nodeType2:1},
                // {name2:'克烈',age2:20,gender2:0,department2:'事业1部',partName2:'子单位工程',level:'2-1',nodeType2:2},
                // {name2:'茂凯',age2:20,gender2:0,department2:'事业2部',partName2:'子单位工程',level:'2-2',nodeType2:2},
                // {name2:'易',age2:20,gender2:0,department2:'销售部',partName2:'单位工程',level:'3',nodeType2:1},
                // {name2:'内瑟斯',age2:20,gender2:0,department2:'销售1部',partName2:'子单位工程',level:'3-1',nodeType2:2},
                // {name2:'拉莫斯',age2:20,gender2:0,department2:'销售2部的干撒罕见的国际化搜嘎大家好规划局爱上过的痕迹啊工商局',partName2:'子单位工程',level:'3-2',nodeType2:2},
            ],
            columnChangeTest : [
                // { visible: true, name: "xuhao", displayName: '序号',width:200},
                { visible: true, name: "partName", displayName: '工程划分', width:300},
                { visible: true, name: "name", displayName: '姓名' ,},
                // { visible: true, name: "age", displayName: '年龄', width: 400 },
                // { visible: true, name: "gender", displayName: '性别', width: 100 },
                { visible: true, name: "department", displayName: '部门',width:200,},
            ],
            colorRange : [
                {nodeType:1,partBg:'#E8F4FF',partTextClolr:'#1890FF'},
                {nodeType:2,partBg:'#E7F9F9',partTextClolr:'#13C2CD'},
                {nodeType:3,partBg:'#B4C4EA',partTextClolr:'#0843E5'},
                {nodeType:4,partBg:'#FFEEE5',partTextClolr:'#FFBA4A'},
                {nodeType:5,partBg:'#E5DBE8',partTextClolr:'#AD0FEA'},
                {nodeType:6,partBg:'#BFF0BC',partTextClolr:'#1CE80D'},
                {nodeType:7,partBg:'#F5DBD8',partTextClolr:'#EA2E17'},
            ],
            nodeTypeNameEmun : [
                { nodeType: 1, name: "单位工程" },
                { nodeType: 2, name: "子单位工程"},
                { nodeType: 3, name: "分部工程"},
                { nodeType: 4, name: "子分部工程"},
                { nodeType: 5, name: "实体单元"},
                { nodeType: 6, name: "分项工程"},
                { nodeType: 7, name: "清单"}
            ],
            dataSource:[],
            showCloumn1:true
        }
    }
    componentWillMount(){
        this.setState({
            dataSource:this.state.data
        })
    }
    componentDidUpdate(prevProps, prevState) {
        debugger
        if (this.spread) {
            let sheet = this.spread.getActiveSheet();
            // 暂停sheet绘制，等待所有改变完成
            sheet.repaint()
            // sheet.suspendPaint();

            // 初始化SpreadSheet
            this.initSheetOutline();

            // 激活spread绘制
            // sheet.resumePaint();
        }
    }
    componentDidMount(){
        debugger
        
        // this.initSheetOutline();
    }
    initSpreadSheets = (spread) => {
        debugger
        this.spread = spread;
        console.log("this.spread====",this.spread)
        this.initSheetOutline()
        // let sheet = this.spread.getActiveSheet();
        // sheet.setDataSource(this.state.data)
        // sheet.bindColumns(this.state.columnChangeTest)
    }

    initSheetOutline = () => {
        debugger
        let data = this.state.data
        let sheet = this.spread.getActiveSheet();
        let spreadNs = GC.Spread.Sheets

        //设置复选框
        for(let r = 0;r<data.length;r++){
            let num = 0
            let item = data[r]
            num = item.level.split("-").length - 1
            //设置缩进
            sheet.getCell(r,0).textIndent(num)
            sheet.getCell(r,0).locked(false)
        }
        //设置标题行及数据行高
        sheet.defaults.colHeaderRowHeight = 48
        sheet.defaults.rowHeight = 30
        spreadNs.AutoFitType.cellWithHeader = true

        //隐藏行号
        sheet.setColumnVisible(0,false,GC.Spread.Sheets.SheetArea.rowHeader)
        //分组设置

        sheet.showRowOutline(false)
        sheet.outlineColumn.options({
            columnIndex:0,
            expandIndicator:closeImg,
            collapseIndicator:openImg,
            // showCheckBox:true
        })
        //控制树的展开收缩需要放在设置outlineColumn.options之后，否则不生效，参数有两个，第一个参数为层级，第二个为是否展开
        // sheet.rowOutlines.expand(0, false);
        // sheet.rowOutlines.expand(1, false);
        // sheet.rowOutlines.expand(2, false);
        // sheet.rowOutlines.expand(3, false);
        // sheet.rowOutlines.expand(4, false);
        // sheet.rowOutlines.expand(5, false);
        // sheet.rowOutlines.expand(6, false);
        // sheet.rowOutlines.expand(7, false);
        sheet.autoFitColumn(0)
        sheet.outlineColumn.refresh();
    }


    render(){
        let _this = this
        const colorRange = [
            {nodeType:1,partBg:'#E8F4FF',partTextClolr:'#1890FF'},
            {nodeType:2,partBg:'#E7F9F9',partTextClolr:'#13C2CD'},
            {nodeType:3,partBg:'#B4C4EA',partTextClolr:'#0843E5'},
            {nodeType:4,partBg:'#FFEEE5',partTextClolr:'#FFBA4A'},
            {nodeType:5,partBg:'#E5DBE8',partTextClolr:'#AD0FEA'},
            {nodeType:6,partBg:'#BFF0BC',partTextClolr:'#1CE80D'},
            {nodeType:7,partBg:'#F5DBD8',partTextClolr:'#EA2E17'},
        ]
        const nodeTypeNameEmun = [
            { nodeType: 1, name: "单位工程" },
            { nodeType: 2, name: "子单位工程"},
            { nodeType: 3, name: "分部工程"},
            { nodeType: 4, name: "子分部工程"},
            { nodeType: 5, name: "实体单元"},
            { nodeType: 6, name: "分项工程"},
            { nodeType: 7, name: "清单"}
        ]
        const column1 = [
          // { visible: true, name: "xuhao", displayName: '序号',width:200},
            { visible: true, name: "nodeType", displayName: '工程划分1',cellType: new customCellType(this.state.data,'department',colorRange,nodeTypeNameEmun,true)},
            { visible: true, name: "name", displayName: '姓名1' ,},
            { visible: true, name: "age", displayName: '年龄1', width: 400 },
            // { visible: true, name: "gender", displayName: '性别', width: 100 },
            { visible: true, name: "department", displayName: '部门1',width:200,},
        ]
        let columnChangeTest = this.state.columnChangeTest;
        const column2 = [
            // { visible: true, name: "xuhao", displayName: '序号',width:200},
            { visible: true, name: "nodeType", displayName: '工程划分2',cellType: new customCellType(this.state.data,'department',colorRange,nodeTypeNameEmun,true)},
            { visible: true, name: "name", displayName: '姓名2' ,},
            // { visible: true, name: "age", displayName: '年龄2', width: 400 },
            { visible: true, name: "gender", displayName: '性别2', width: 100 },
            { visible: true, name: "department", displayName: '部门2',width:200,},

        ]
        const changeCloumns1 = () => {
                this.setState({
                    columnChangeTest:column1,
                },()=>{
                    let sheet = _this.spread.getActiveSheet();
                    sheet.bindColumns(_this.state.columnChangeTest)
                })
        }
        const changeCloumns2 = () => {
                this.setState({
                    columnChangeTest:column2,
                },()=>{
                    let sheet = _this.spread.getActiveSheet();
                    sheet.bindColumns(_this.state.columnChangeTest)
                })
        }
        const columns = [
            // { visible: true, name: "xuhao", displayName: '序号',width:200},
            { visible: true, name: "nodeType", displayName: '工程划分', cellType: new customCellType(this.state.data,'department',colorRange,nodeTypeNameEmun,true)},
            { visible: true, name: "test", displayName: 'test',width:400,},
            { visible: true, name: "name", displayName: '姓名' ,},
            { visible: true, name: "age", displayName: '年龄', width: 400 },
            { visible: true, name: "gender", displayName: '性别', width: 100 },
            { visible: true, name: "department", displayName: '部门',width:200,cellType: new EllipsisAndToolTip("__spread_js_box__")},
        ]

        return (
            <div>
                <div>
                    {/* <Button onClick = {changeCloumns1} >点击切换列1</Button>
                    <Button onClick = {changeCloumns2} >点击切换列2</Button> */}
                </div>
                <div style={{width:'100%',height:'100%',background:'#C1F5E8',position:'relative'}} id="__spread_js_box__">
                    <SpreadSheets hostStyle={{width: '100%', height: '550px'}}
                            workbookInitialized={spread => this.initSpreadSheets(spread)}
                            tabStripVisible={false}
                            showVerticalScrollbar={true}
                            showHorizontalScrollbar={false}
                            allowUserDragDrop={false}
                            allowContextMenu={false}
                            scrollbarMaxAlign={false}
                            allowUserResize = {true}
                            //   valueChanged={onCellrefresh}
                            //   cellClick={clickCellHandler}
                    >
                        <Worksheet dataSource = {this.state.data}
                                name={"合同工程量清单"}
                                selectionPolicy={GC.Spread.Sheets.SelectionPolicy.single}
                                selectionUnit={GC.Spread.Sheets.SelectionUnit.row}
                                selectionBackColor={'transparent'}
                                autoGenerateColumns={false}
                                isProtected={true}
                                // autoFitColumn = {true}
                        >
                            {
                                columns.map((item,index) => (
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
                        </Worksheet>
                    </SpreadSheets>
                </div>
            </div>
        )
    }
}

export default SpreadHome;
