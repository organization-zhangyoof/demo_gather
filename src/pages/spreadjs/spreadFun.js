import GC from '@grapecity/spread-sheets';
let spreadNS = GC.Spread.Sheets

/**
 * 用于在对象数组中查询特定值或下标
 *
 * @param {any} value 要在查找的值
 * @param {*} arr 数组
 * @param {*} isReturnIndex 是否返回下标值
 */
let findFromArr =  (value,arr,isReturnIndex = false) => {
    let result = ''
    let index = -1
    for(let i = 0;i<arr.length;i++){
    let item = arr[i]
    if(item.nodeType == value){
        result = item.name
        index = i
    }
    }
    if(isReturnIndex){
        return index
    }else{
        return result
    }
}


/**
 * 用于过滤并形成最后需要省略显示的文字
 *
 * @param {*} c canvas画笔
 * @param {*} str 要显示的字符串
 * @param {*} maxWidth 最大宽度
 */
let fittingString = (c, str, maxWidth) => {
    var width = c.measureText(str).width;
    var ellipsis = '…';
    var ellipsisWidth = c.measureText(ellipsis).width;
    // console.log("ellipsisWidth===",ellipsisWidth)
    if (width <= maxWidth || width <= ellipsisWidth) {
        return str;
    } else {
        var len = str.length;
        while (width >= maxWidth - ellipsisWidth && len-- > 0) {
            str = str.substring(0, len);
            width = c.measureText(str).width;
        }
        return str + ellipsis;
    }
}

/**
 * 用于spreadJS表格单元格显示层级，不同层级显示不同颜色
 *
 * @param {Array} data 所要展示的的数据
 * @param {String} nameKey 工程分项后面所要跟随那个字段的值
 * @param {Array} colorRange 个层架显示颜色集合
 * @param {Array} nodeTypeNameEmun 工程划分枚举值
 * @param {bool} isAutoFitColumn 是否自适应撑开列宽
 * @param {Number} partTextY 工程划分文字竖向偏移量
 * @param {Number} nameTextY 工程划分后文字竖向偏移量
 * @param {Number} partSize 工程划分文字大小
 * @param {Number} nameSize 工程划分后的文字大小
 */
export function customCellType(data,nameKey,colorRange,nodeTypeNameEmun,isAutoFitColumn,partTextY,nameTextY,partSize,nameSize,){
    let typeEmun = [
        { nodeType: 1, name: "单位工程" },
        { nodeType: 2, name: "子单位工程"},
        { nodeType: 3, name: "分部工程"},
        { nodeType: 4, name: "子分部工程"},
        { nodeType: 5, name: "实体单元"},
        { nodeType: 6, name: "分项工程"},
        { nodeType: 7, name: "清单"}
    ]
    this.partSize = partSize;
    this.nameSize = nameSize;
    this.data = data;
    this.partTextY = partTextY || 21
    this.nameTextY = nameTextY || 20
    this.colorRange = colorRange
    this.nameKey = nameKey
    this.nodeTypeNameEmun = nodeTypeNameEmun || typeEmun
    this.isAutoFitColumn = isAutoFitColumn || false
    this.textWidth = 0
}

customCellType.prototype = new spreadNS.CellTypes.Text();
customCellType.prototype.paintContent = function (ctx, value, x, y, w, h, style, context) {
    let textTotalWidth = 0
    let nodeTypeName = findFromArr(value,this.nodeTypeNameEmun)
    let row = context.row
    if (!ctx) {
        return;
    }

    ctx.save();

    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.beginPath();

    //获取文字属性
    var textInfo = ctx.measureText(nodeTypeName)
    //计算矩形宽度并暂时赋值给单元格总宽度
    textTotalWidth += Math.ceil(textInfo.width)
    //绘制矩形
    if(this.colorRange && this.colorRange.length){
        let index = findFromArr(value,this.colorRange,true)
        ctx.fillStyle = this.colorRange[index].partBg;
    }else{
        ctx.fillStyle = "#ccc"
    }
    
    ctx.fillRect(x+5, y+5, Math.ceil(textInfo.width)+10, h-10);

    //绘制矩形内文字
    ctx.beginPath();
    ctx.textAlign="start";
    if(this.colorRange && this.colorRange.length){
        let index = findFromArr(value,this.colorRange,true)
        ctx.fillStyle = this.colorRange[index].partTextClolr;
    }else{
        ctx.fillStyle = "#000"
    }
    if(this.partSize){
        ctx.font = this.partSize + "px  Arial";
    }
    ctx.fillText(nodeTypeName,x+10,y+this.partTextY);

    //绘制矩形后面文字
    if(this.nameKey){
        ctx.beginPath();
        ctx.textAlign="start";
        ctx.fillStyle = '#000';

        //计算后面跟随文字的宽度
        let afterText = (this.data[row])[this.nameKey];
        textTotalWidth += Math.ceil(ctx.measureText(afterText).width)

        if(this.nameSize){
            ctx.font = this.nameSize + "px  Arial";
        }
        ctx.fillText(afterText,x+Math.ceil(textInfo.width)+20,y+this.nameTextY);
    }

    //列宽的撑开是根据最后一次算的值的大小来撑开的，如果值小于目前的宽度则不进行赋值
    this.textWidth = textTotalWidth > this.textWidth ? textTotalWidth : this.textWidth
    // this.textWidth = textTotalWidth
    ctx.restore();
};
customCellType.prototype.getAutoFitWidth = function (value, text, cellStyle, zoomFactor, context) {
    if(this.isAutoFitColumn){
        var orginWidth = GC.Spread.Sheets.CellTypes.Text.prototype.getAutoFitWidth.call(this, value, text, cellStyle, zoomFactor, context);
        return orginWidth + this.textWidth;
    }
}


/**
 * 悬浮提示内容
 *
 * @param {*} parentId
 * @param {string} arrowPosition 指示箭头位置取值范围["left","center","right"],默认值为center
 */
export function TipCellType(parentId,arrowPosition) {
    this.parentId = parentId
    this.arrowPosition = arrowPosition || 'center'
}
TipCellType.prototype = new GC.Spread.Sheets.CellTypes.Text();

TipCellType.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context,value) {
	return {
		x: x,
		y: y,
		row: context.row,
		col: context.col,
		cellStyle: cellStyle,
		cellRect: cellRect,
        sheetArea: context.sheetArea,
        context:context
	};
}
TipCellType.prototype.processMouseEnter = function (hitinfo) {

    let { sheet, cellRect, row:cellRow, col:cellCol } = hitinfo
    let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
    let cellVAlue = sheet.getValue(cellRow,cellCol)

	if (!document.getElementById("__spread_customTipCellType__")) {
        let div = document.createElement("div");
            div.setAttribute("id",'__spread_customTipCellType__')
            div.style.position = "absolute"
            // div.style.border = "1px #C0C0C0 solid"
            div.style.boxShadow = "1px 2px 5px rgba(0,0,0,0.4)"
            div.style.borderRadius = "5px"
            div.style.font = "Arial"
            div.style.background = "#404040"
            div.style.color = "#fff"
            div.style.padding = "6px 8px"
            div.style.zIndex = 1000
            div.style.width = cellWidth + "px"

        this._toolTipElement = div;

        //绘制指示箭头
        let arrow = document.createElement("div");
            arrow.setAttribute("id",'__spread_customTip_arrow__')
            arrow.style.position = "absolute"
            arrow.style.font = "Arial"
            arrow.style.background = "#404040"
            arrow.style.width = "10px"
            arrow.style.height = "10px"
            arrow.style.color = "#fff"
            arrow.style.transform= "rotate(45deg) "
            div.style.zIndex = 999

        this._toolTipArrow = arrow
    }
    this._toolTipElement.innerHTML = cellVAlue
    this._toolTipElement.style.top = cellY + "px"
    this._toolTipElement.style.left = cellX + "px"
    this._toolTipArrow.style.top = cellY - 5 +  "px"
    this._toolTipArrow.style.left = cellX + "px"
    document.getElementById(this.parentId).append(this._toolTipElement)
    document.getElementById(this.parentId).append(this._toolTipArrow)

    let h = document.getElementById("__spread_customTipCellType__").offsetHeight
    let w = document.getElementById("__spread_customTipCellType__").offsetWidth
    this._toolTipElement.style.top = cellY - h -5 + "px"
    this._toolTipElement.style.left = cellX + "px"
    if(this.arrowPosition == "center"){
        this._toolTipArrow.style.top = cellY - 10 +  "px"
        this._toolTipArrow.style.left = cellX + w/2 - 7 + "px"
    }else if(this.arrowPosition == "left"){
        this._toolTipArrow.style.top = cellY - 10 +  "px"
        let tmpW = w*0.25>15?15:w*0.25
        this._toolTipArrow.style.left = cellX + tmpW + "px"
    }else if(this.arrowPosition == "right"){
        this._toolTipArrow.style.top = cellY - 11 +  "px"
        this._toolTipArrow.style.left = cellX + w - w*0.25 - 7 + "px"
    }
};
TipCellType.prototype.processMouseLeave = function (hitinfo) {
	if (this._toolTipElement) {
		document.getElementById(this.parentId).removeChild(this._toolTipElement);
		document.getElementById(this.parentId).removeChild(this._toolTipArrow);
		this._toolTipElement = null;
	}
};



/**
 * 超出省略显示...
 *
 */
export function EllipsisTextCellType() {
}

EllipsisTextCellType.prototype = new spreadNS.CellTypes.Text();
EllipsisTextCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
    ctx.font = style.font;
    value = fittingString(ctx, value, w - 2);
    spreadNS.CellTypes.Text.prototype.paint(ctx, value, x, y, w, h, style, context);
};




/**
 * 超出隐藏显示...，并显示toolTip
 *
 * @param {*} parentId
 * @param {string} arrowPosition 指示箭头位置取值范围["left","center","right"],默认值为center
 */
export function EllipsisAndToolTip(parentId,arrowPosition){
    this.parentId = parentId
    this.arrowPosition = arrowPosition || 'center'
}
EllipsisAndToolTip.prototype = new spreadNS.CellTypes.Text();
EllipsisAndToolTip.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
    ctx.font = style.font;
    value = fittingString(ctx, value, w - 2);
    spreadNS.CellTypes.Text.prototype.paint(ctx, value, x, y, w, h, style, context);
};

EllipsisAndToolTip.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context,value) {
	return {
		x: x,
		y: y,
		row: context.row,
		col: context.col,
		cellStyle: cellStyle,
		cellRect: cellRect,
        sheetArea: context.sheetArea,
        context:context
	};
}
EllipsisAndToolTip.prototype.processMouseEnter = function (hitinfo) {

    let { sheet, cellRect, row:cellRow, col:cellCol } = hitinfo
    let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
    let cellVAlue = sheet.getValue(cellRow,cellCol)

	if (!document.getElementById("__spread_customTipCellType__")) {
        let div = document.createElement("div");
            div.setAttribute("id",'__spread_customTipCellType__')
            div.style.position = "absolute"
            // div.style.border = "1px #C0C0C0 solid"
            div.style.boxShadow = "1px 2px 5px rgba(0,0,0,0.4)"
            div.style.borderRadius = "5px"
            div.style.font = "Arial"
            div.style.background = "#404040"
            div.style.color = "#fff"
            div.style.padding = "6px 8px"
            div.style.zIndex = 1000
            div.style.width = cellWidth + "px"

        this._toolTipElement = div;

        //绘制指示箭头
        let arrow = document.createElement("div");
            arrow.setAttribute("id",'__spread_customTip_arrow__')
            arrow.style.position = "absolute"
            arrow.style.font = "Arial"
            arrow.style.background = "#404040"
            arrow.style.width = "10px"
            arrow.style.height = "10px"
            arrow.style.color = "#fff"
            arrow.style.transform= "rotate(45deg) "
            div.style.zIndex = 999

        this._toolTipArrow = arrow
    }
    this._toolTipElement.innerHTML = cellVAlue
    this._toolTipElement.style.top = cellY + "px"
    this._toolTipElement.style.left = cellX + "px"
    this._toolTipArrow.style.top = cellY - 5 +  "px"
    this._toolTipArrow.style.left = cellX + "px"
    document.getElementById(this.parentId).append(this._toolTipElement)
    document.getElementById(this.parentId).append(this._toolTipArrow)

    let h = document.getElementById("__spread_customTipCellType__").offsetHeight
    let w = document.getElementById("__spread_customTipCellType__").offsetWidth
    this._toolTipElement.style.top = cellY - h -5 + "px"
    this._toolTipElement.style.left = cellX + "px"
    if(this.arrowPosition == "center"){
        this._toolTipArrow.style.top = cellY - 10 +  "px"
        this._toolTipArrow.style.left = cellX + w/2 - 7 + "px"
    }else if(this.arrowPosition == "left"){
        this._toolTipArrow.style.top = cellY - 10 +  "px"
        let tmpW = w*0.25>15?15:w*0.25
        this._toolTipArrow.style.left = cellX + tmpW + "px"
    }else if(this.arrowPosition == "right"){
        this._toolTipArrow.style.top = cellY - 11 +  "px"
        this._toolTipArrow.style.left = cellX + w - w*0.25 - 7 + "px"
    }
};
EllipsisAndToolTip.prototype.processMouseLeave = function (hitinfo) {
	if (this._toolTipElement) {
		document.getElementById(this.parentId).removeChild(this._toolTipElement);
		document.getElementById(this.parentId).removeChild(this._toolTipArrow);
		this._toolTipElement = null;
	}
};

//超链接+文本测试
export function HyperLinkTextCell(linkArr,textMaxWidth,textY,linkY){
    this.linkArr = linkArr || []
    this.linkTextArr = ""
    this.textY = textY || 21
    this.linkY = linkY || 21
    this.linArea = []
    this.textMaxWidth = textMaxWidth
    for (let i = 0; i < linkArr.length; i++) {
        const item = linkArr[i];
        this.linkTextArr+=item.name
    }
    this.plainTextWidth = 0
}
//TODO 绘制超链接并添加点击事件
/**
 * 用于过滤并形成最后需要省略显示的文字
 *
 * @param {*} c canvas画笔
 * @param {*} str 要显示的字符串
 * @param {*} maxWidth 最大宽度
 */
let fittingStringForHyperLink = (c, str, maxWidth,hyperLinkTextArr) => {
    // debugger
    let result = ''
    let width = c.measureText(str).width;
    let ellipsis = '…';
    let ellipsisWidth = c.measureText(ellipsis).width;
    let hyperLinkTextWidth = c.measureText(hyperLinkTextArr).width;
    // maxWidth = maxWidth - hyperLinkTextWidth - 10
    // console.log("ellipsisWidth===",ellipsisWidth)
    if (width <= maxWidth || width <= ellipsisWidth) {
        return result = str;
    } else {
        let len = str.length;
        while (width >= maxWidth - ellipsisWidth && len-- > 0) {
            str = str.substring(0, len);
            width = c.measureText(str).width;
        }
        return result = str + ellipsis;
    }
}
HyperLinkTextCell.prototype = new spreadNS.CellTypes.Base();

HyperLinkTextCell.prototype.paintContent = function (ctx, value, x, y, w, h, style, context) {
    ctx.font = style.font;
    value = fittingStringForHyperLink(ctx, value, this.textMaxWidth - 2, this.linkTextArr );
    // spreadNS.CellTypes.Text.prototype.paintContent(ctx, value, x, y, w, h, style, context);
    // ctx.save();

    // ctx.rect(x, y, w, h);
    // ctx.clip();
    ctx.beginPath();

    // //获取文字属性
    let textInfo = ctx.measureText(value)
    // //计算矩形宽度并暂时赋值给单元格总宽度
    let textWidth = 0
    //绘制普通文本
        ctx.textAlign="start";
        ctx.fillStyle = '#000';
        if(value){
            textWidth = this.textMaxWidth+10
            ctx.fillText(value,x+5,y+this.textY);
        }
        //绘制超链接文本
        for (let k = 0; k < this.linkArr.length; k++) {
            ctx.beginPath();
            const ele = this.linkArr[k];
            ctx.textAlign="start";
            ctx.fillStyle = ele.color || "#000";
            ctx.fillText(ele.name,x+5+textWidth,y+this.linkY);
            let currentLinkTextWidth = Math.ceil(ctx.measureText(ele.name).width)

            if(!this.linArea[context.row]){
                this.linArea[context.row]= [{startX:x+5+textWidth,endX:x+5+textWidth + currentLinkTextWidth,name:value,row:context.row}]
            }else if(!(this.linArea[context.row])[k]){
                (this.linArea[context.row])[k]= {startX:x+5+textWidth,endX:x+5+textWidth + currentLinkTextWidth,name:value,row:context.row}
            }

            textWidth += Math.ceil(ctx.measureText(ele.name).width)+10
        }
};
HyperLinkTextCell.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
	return {
		x: x,
		y: y,
		row: context.row,
		col: context.col,
		cellStyle: cellStyle,
		cellRect: cellRect,
        sheetArea: context.sheetArea,
        context:context
	};
}
HyperLinkTextCell.prototype.processMouseDown = function (hitinfo) {
    debugger
    let { sheet, cellRect, row:cellRow, col:cellCol } = hitinfo
    let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
    let cellVAlue = sheet.getValue(cellRow,cellCol)
    debugger
};
HyperLinkTextCell.prototype.processMouseDown = function (hitinfo) {
    debugger
    let { sheet, cellRect, row:cellRow, col:cellCol,x:mouseX,y:mouseY } = hitinfo
    let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
    let cellVAlue = sheet.getValue(cellRow,cellCol)
    let res = ismouseInArea(mouseX,"",cellRow,this.linArea)
    if(res.index>-1){
        let clickFun = this.linkArr[res.index].clickFun
        clickFun()
    }
};
// HyperLinkTextCell.prototype.processMouseMove = function (hitinfo) {
//     debugger
//     let { sheet, cellRect, row:cellRow, col:cellCol,x:mouseX,y:mouseY } = hitinfo
//     let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
//     let cellVAlue = sheet.getValue(cellRow,cellCol)
//     let res = ismouseInArea(mouseX,"",cellRow,this.linArea)
//     // if(res.ismouseInArea){
//     //     document.getElementById("vp_vp").style.cursor = "pointer !important"
//     //     console.log("document.body====",document.body)
//     // }else{
//     //     document.body.style.cursor = "auto"
//     // }
//     debugger
// };

let ismouseInArea = (mouseX,mouseY,row,areaArr) => {
    let res = {index:-1,ismouseInArea:false}
    let arr = areaArr[row]
    for (let j = 0; j < arr.length; j++) {
        const ele = arr[j];
        if(mouseX > ele.startX && mouseX < ele.endX){
            res = {index:j,ismouseInArea:true}
            break
        }
    }
    return res
}