import React,{Component} from'react'
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css';
import GC from '@grapecity/spread-sheets';
import {SpreadSheets, Worksheet, Column} from '@grapecity/spread-sheets-react';
import openImg from '../../assets/square-open.png'
import closeImg from '../../assets/square-close.png'
import {customCellType} from './spreadFun'
GC.Spread.Common.CultureManager.culture("zh-cn");

class SpreadHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {name:'aaa',age:20,gender:0,department:'工程部',partName:'单位工程',level:'1',nodeType:1},
                {name:'aaa',age:20,gender:0,department:'工程1部',partName:'子单位工程',level:'1-1',nodeType:2},
                {name:'aaa',age:20,gender:0,department:'工程1部材料中心',partName:'分部工程',level:'1-1-1',nodeType:3},
                {name:'aaa',age:20,gender:0,department:'工程1部材料中心01',partName:'子分部工程',level:'1-1-1-1',nodeType:4},
                {name:'aaa',age:20,gender:0,department:'工程1部材料中心01',partName:'实体单元',level:'1-1-1-1-1',nodeType:5},
                {name:'aaa',age:20,gender:0,department:'工程1部材料中心01',partName:'分项工程',level:'1-1-1-1-1-1',nodeType:6},
                {name:'aaa',age:20,gender:0,department:'工程1部材料中心01',partName:'清单',level:'1-1-1-1-1-1-1',nodeType:7},
                {name:'aaa',age:20,gender:0,department:'工程1部材料中心02',partName:'子分部工程',level:'1-1-1-2',nodeType:4},
                {name:'aaa',age:20,gender:0,department:'工程1部实验中心',partName:'分部工程',level:'1-1-2',nodeType:3},
                {name:'aaa',age:20,gender:0,department:'工程2部',partName:'子单位工程',level:'1-2',nodeType:2},
                {name:'aaa',age:20,gender:0,department:'事业部',partName:'单位工程',level:'2',nodeType:1},
                {name:'aaa',age:20,gender:0,department:'事业1部',partName:'子单位工程',level:'2-1',nodeType:2},
                {name:'aaa',age:20,gender:0,department:'事业2部',partName:'子单位工程',level:'2-2',nodeType:2},
                {name:'aaa',age:20,gender:0,department:'销售部',partName:'单位工程',level:'3',nodeType:1},
                {name:'aaa',age:20,gender:0,department:'销售1部',partName:'子单位工程',level:'3-1',nodeType:2},
                {name:'aaa',age:20,gender:0,department:'销售2部',partName:'子单位工程',level:'3-2',nodeType:2},
            ]
        }
    }

    componentDidUpdate(prevProps, prevState) {
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

    initSpreadSheets = (spread) => {
        this.spread = spread;
    }

    initSheetOutline = () => {
        let data = this.state.data
        let sheet = this.spread.getActiveSheet();
        let spreadNs = GC.Spread.Sheets

        //设置复选框
        for(let r = 0;r<data.length;r++){
            let num = 0
            let item = data[r]
            num = item.level.split("-").length - 1
            let level = item.level
            let checkBox = new spreadNs.CellTypes.CheckBox()
            // sheet.setCellType(r,1,checkBox, spreadNs.SheetArea.vieport)
            // sheet.setCellType(r,0,checkBox, spreadNs.SheetArea.vieport)
            //设置缩进
            // sheet.getCell(r,1).textIndent(num)
            sheet.getCell(r,0).textIndent(num)
            // sheet.setValue(r,0,level)
            // sheet.getCell(r,1).locked(false)
            sheet.getCell(r,0).locked(false)
        }
        //设置标题行及数据行高
        sheet.defaults.colHeaderRowHeight = 48
        sheet.defaults.rowHeight = 30

        //隐藏行号
        sheet.setColumnVisible(0,false,GC.Spread.Sheets.SheetArea.rowHeader)

        //分组设置
        sheet.showRowOutline(false)
        sheet.showColumnOutline(true)
        sheet.outlineColumn.options({
            columnIndex:0,
            expandIndicator:closeImg,
            collapseIndicator:openImg,
            showCheckBox:true
        })
    }


    render(){
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
        const columns = [
            // { visible: true, name: "xuhao", displayName: '序号',width:200},
            { visible: true, name: "nodeType", displayName: '工程划分', cellType: new customCellType(this.state.data,'department',colorRange,nodeTypeNameEmun),width:300},
            { visible: true, name: "test", displayName: 'test',width:400,},
            { visible: true, name: "name", displayName: '姓名', width: 400 },
            { visible: true, name: "age", displayName: '年龄', width: 400 },
            { visible: true, name: "gender", displayName: '性别', width: 100 },
            { visible: true, name: "department", displayName: '部门', },
        ]

        return (
            <div style={{width:'100%',height:'100%',background:'#C1F5E8'}}>
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
                    >
                        {
                            columns.map((item,index) => (
                                <Column
                                    visible={item.visible}
                                    dataField={item.name}
                                    key={item.name}
                                    headerText={item.displayName}
                                    width={!item.width ? '': item.width}
                                    style={{ }}
                                    autoFit = {item.width?false:true}
                                    cellType = {item.cellType}
                                />
                            ))
                        }
                    </Worksheet>
                </SpreadSheets>
            </div>
        )
    }
}

export default SpreadHome;
