import React,{Component} from'react'
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
import GC from '@grapecity/spread-sheets';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import openImg from '../../assets/square-open.png'
import closeImg from '../../assets/square-close.png'
import {Button} from "antd"
import {customCellType, TipCellType, EllipsisTextCellType, EllipsisAndToolTip, HyperLinkTextCell,} from './spreadFun'
GC.Spread.Common.CultureManager.culture("zh-cn");

class SpreadHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name:'艾瑞莉娅',age:20,gender:0,department:'工程部',partName:'单位工程',level:'1',nodeType:1,remark:'是多大'},
                {name:'瑞文',age:20,gender:0,department:'工程1部',partName:'子单位工程',level:'1-1',nodeType:2,remark:'慌撒的看哈是框架'},
                {name:'伊泽瑞尔',age:20,gender:0,department:'工程1部材料中心',partName:'分部工程',level:'1-1-1',nodeType:3,remark:'撒德哈卡大数据汇顶科技按数据库的'},
                {name:'莫德凯撒',age:20,gender:0,department:'工程1部材料中心01',partName:'子分部工程',level:'1-1-1-1',nodeType:4,remark:'第三方的深V说的'},
                {name:'劫',age:20,gender:0,department:'工程1部材料中心01',partName:'实体单元',level:'1-1-1-1-1',nodeType:5,remark:'包括交换机'},
                {name:'奥瑞利安·索尔',age:20,gender:0,department:'工程1部材料中心01',partName:'分项工程',level:'1-1-1-1-1-1',nodeType:6,remark:'才下班成就感圣诞节'},
                {name:'卡西奥佩娅',age:20,gender:0,department:'工程1部材料中心01',partName:'清单',level:'1-1-1-1-1-1-1',nodeType:7,remark:'出生地更富于'},
                {name:'费德提克',age:20,gender:0,department:'工程1部材料中心02',partName:'子分部工程',level:'1-1-1-2',nodeType:4,remark:'层次感股有多少'},
                {name:'纳尔',age:20,gender:0,department:'工程1部实验中心',partName:'分部工程',level:'1-1-2',nodeType:3,remark:'胜多负少的缴费基数的附件时代峻峰看来是点击发送点击父节点收款机房，返回第三方士大夫is电话费对事故已覆盖但是'},
                {name:'迦娜',age:20,gender:0,department:'工程2部',partName:'子单位工程',level:'1-2',nodeType:2,remark:'于死地环境换成申达股份感受度覆盖但是'},
                {name:'厄斐琉斯',age:20,gender:0,department:'事业部',partName:'单位工程',level:'2',nodeType:1,remark:'报错说感觉还V型从'},
                {name:'克烈',age:20,gender:0,department:'事业1部',partName:'子单位工程',level:'2-1',nodeType:2,remark:'的跳跃体育'},
                {name:'茂凯',age:20,gender:0,department:'事业2部',partName:'子单位工程',level:'2-2',nodeType:2,remark:'日番谷冬狮'},
                {name:'易',age:20,gender:0,department:'销售部',partName:'单位工程',level:'3',nodeType:1,remark:'熊皮哦'},
                {name:'内瑟斯',age:20,gender:0,department:'销售1部',partName:'子单位工程',level:'3-1',nodeType:2,remark:'同一个合并'},
                {name:'拉莫斯',age:20,gender:0,department:'销售2部',partName:'子单位工程',level:'3-2',nodeType:2,remark:'大商股份几乎都是'},
            ],
            columnChangeTest : [
                // { visible: true, name: "xuhao", displayName: '序号',width:200},
                { visible: true, name: "nodeType", displayName: '工程划分', width:300},
                // { visible: true, name: "name", displayName: '姓名' ,},
                { visible: true, name: "age", displayName: '年龄', width: 400 },
                { visible: true, name: "gender", displayName: '性别', width: 100 },
                { visible: true, name: "department", displayName: '部门',width:200,},
            ],
            column2 : [
                // { visible: true, name: "xuhao", displayName: '序号',width:200},
                { visible: true, name: "nodeType", displayName: '工程划分',width:300},
                { visible: true, name: "name", displayName: '姓名' ,},
                { visible: true, name: "age", displayName: '年龄', width: 400 },
                // { visible: true, name: "gender", displayName: '性别', width: 100 },
                { visible: true, name: "department", displayName: '部门',width:200,},
            ],
            showCloumn1:true
        }
    }

    componentDidUpdate(prevProps, prevState) {
        debugger
        if (this.spread) {
            let sheet = this.spread.getActiveSheet();
            // 暂停sheet绘制，等待所有改变完成
            sheet.suspendPaint();

            // 初始化SpreadSheet
            this.initSheetOutline();

            // 激活spread绘制
            sheet.resumePaint();
        }
    }
    componentDidMount(){
        debugger
        // this.initSheetOutline();
    }
    initSpreadSheets = (spread) => {
        debugger
        this.spread = spread;
        this.initSheetOutline()
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
        let columnChangeTest = this.state.columnChangeTest
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
            { visible: true, name: "nodeType", displayName: '工程划分', width:300},
            // { visible: true, name: "name", displayName: '姓名' ,},
            { visible: true, name: "age", displayName: '年龄', width: 400 },
            // { visible: true, name: "gender", displayName: '性别', width: 100 },
            { visible: true, name: "department", displayName: '部门',width:200,},
        ]
        const column2 = [
            // { visible: true, name: "xuhao", displayName: '序号',width:200},
            { visible: true, name: "nodeType", displayName: '工程划分',width:300},
            { visible: true, name: "name", displayName: '姓名' ,},
            { visible: true, name: "age", displayName: '年龄', width: 400 },
            { visible: true, name: "gender", displayName: '性别', width: 100 },
            { visible: true, name: "department", displayName: '部门',width:200,},
        ]
        const changeCloumns = () => {
            debugger
            if(this.state.showCloumn1){
                this.setState({
                    columnChangeTest:column2,
                    showCloumn1:false
                })
            }else{
                this.setState({
                    columnChangeTest:column1,
                    showCloumn1:true
                })
            }
        }
        const columns = [
            // { visible: true, name: "xuhao", displayName: '序号',width:200},
            { visible: true, name: "nodeType", displayName: '工程划分', cellType: new customCellType(this.state.data,'department',colorRange,nodeTypeNameEmun)},
            { visible: true, name: "HyperLink", displayName: '超链接测试',width:400,},
            { visible: true, name: "name", displayName: '姓名' ,cellType: new HyperLinkTextCell(),width:50},
            { visible: true, name: "age", displayName: '年龄', width: 400 },
            { visible: true, name: "gender", displayName: '性别', width: 100 },
            { visible: true, name: "remark", displayName: '备注',width:200,cellType: new EllipsisAndToolTip("__spread_js_box__")},
        ]
        
        const clickCellHandler = (sheet,sheetName,row,col,cancel) =>{
            console.log("sheet======",sheet)
            console.log("sheetName======",sheetName)
            // console.log("row======",row)
            // console.log("col======",col)
            // console.log("cancel======",cancel)
        }
        const rangeGroupStateChanging = () => {
            debugger
        }
        const rangeGroupStateChanged = () => {
            debugger
        }
        return (
            <div>

                <div>
                    {/* <Button onClick = {changeCloumns} disabled = {this.state.showCloumn1}>点击切换列1</Button>
                    <Button onClick = {changeCloumns} disabled = {!this.state.showCloumn1}>点击切换列2</Button> */}
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
                            cellClick={clickCellHandler} //单元格点击
                            rangeGroupStateChanging = {rangeGroupStateChanging} //分组改变时
                            rangeGroupStateChanged = {rangeGroupStateChanged} //分组改变后
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
