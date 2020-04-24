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
    let obj = {newStr:'',isEllipsis:false}
    var width = c.measureText(str).width;
    var ellipsis = '…';
    var ellipsisWidth = c.measureText(ellipsis).width;
    // console.log("ellipsisWidth===",ellipsisWidth)
    if (width <= maxWidth || width <= ellipsisWidth) {
        obj = {newStr:str,isEllipsis:false}
        return obj;
    } else {
        var len = str.length;
        while (width >= maxWidth - ellipsisWidth && len-- > 0) {
            str = str.substring(0, len);
            width = c.measureText(str).width;
        }
        obj = {newStr:str + ellipsis,isEllipsis:true}
        return obj;
    }
}

/**
 * customCellType  用于spreadJS表格单元格显示层级，不同层级显示不同颜色
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
    const typeEmun = [
        { nodeType: 1, name: "单位工程" },
        { nodeType: 2, name: "子单位工程"},
        { nodeType: 3, name: "分部工程"},
        { nodeType: 4, name: "子分部工程"},
        { nodeType: 5, name: "实体单元"},
        { nodeType: 6, name: "分项工程"},
        // { nodeType: 7, name: "清单"}
    ]
    const colorRangeEnum = [
        { nodeType: 2, partBg: '#E8F4FF', partTextClolr: '#1890FF' },
        { nodeType: 3, partBg: '#E7F9F9', partTextClolr: '#13C2CD' },
        { nodeType: 4, partBg: '#E7F9F9', partTextClolr: '#13C2CD' },
        { nodeType: 5, partBg: '#FFEEE5', partTextClolr: '#FE9400' },
        { nodeType: 6, partBg: '#FFEEE5', partTextClolr: '#FE9400' },
        // {nodeType:7,partBg:'#F5DBD8',partTextClolr:'#EA2E17'},
    ]
    this.partSize = partSize;
    this.nameSize = nameSize;
    this.data = data;
    this.partTextY = partTextY || 21
    this.nameTextY = nameTextY || 20
    this.colorRange = colorRange || colorRangeEnum
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
    if (!ctx || !this.data.length) {
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
    let index = findFromArr(value,this.colorRange,true)
    //绘制矩形
    if(this.colorRange && this.colorRange.length){
        // let index = findFromArr(value,this.colorRange,true)
        if(index>-1 && (this.data[row])[this.nameKey]){
            ctx.fillStyle = this.colorRange[index].partBg;
        }
    }else{
        ctx.fillStyle = "#ccc"
    }
    if((this.data[row])[this.nameKey] && index > -1){
        ctx.fillRect(x+5, y+5, Math.ceil(textInfo.width)+10, h-10);
    }

    //绘制矩形内文字
    ctx.beginPath();
    ctx.textAlign="start";
    if(this.colorRange && this.colorRange.length){
        // let index = findFromArr(value,this.colorRange,true)
        if(index>-1 && (this.data[row])[this.nameKey]){
            ctx.fillStyle = this.colorRange[index].partTextClolr;
        }
    }else{
        ctx.fillStyle = "#000"
    }
    if(this.partSize){
        ctx.font = this.partSize + "px  Arial";
    }
    if((this.data[row])[this.nameKey]){
        ctx.fillText(nodeTypeName,x+10,y+this.partTextY);
    }

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
        if(afterText && afterText != "null"){
            ctx.fillText(afterText,x+Math.ceil(textInfo.width)+20,y+this.nameTextY);
        }
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
 * TipCellType 悬浮提示内容
 *
 * @param {*} parentId 表格最外层容器Id position属性应为relative
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
 * EllipsisTextCellType 超出省略显示...
 *
 * @param {string} textAlign 文字位置["left","center","right"],默认值为left，居左
 * @param {number} textY 文字竖方向的偏移量
 */
export function EllipsisTextCellType(textAlign,textY) {
    this.textAlign = textAlign || 'left'
    this.textY = textY || 21
}

EllipsisTextCellType.prototype = new spreadNS.CellTypes.Text();
EllipsisTextCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
    ctx.font = style.font;
    let res = fittingString(ctx, value, w - 5);
    value = res.newStr
    let isEllipsis = res.isEllipsis
    ctx.beginPath();
    ctx.textAlign="start";
    ctx.fillStyle = '#000';
    let textWidth = Math.ceil(ctx.measureText(value).width)
    if(isEllipsis){
        ctx.fillText(value,x+2,y+this.textY);
    }else{
        if(this.textAlign == 'left'){
            ctx.fillText(value,x+5,y+this.textY);
        }else if(this.textAlign == 'center'){
            ctx.fillText(value,x+(w/2-textWidth/2),y+this.textY);
        }else if(this.textAlign == 'right'){
            ctx.fillText(value,x+(w-textWidth-5),y+this.textY);
        }
    }
};




/**
 * EllipsisAndToolTip 超出隐藏显示...，并显示toolTip
 *
 * @param {*} parentId 表格最外层容器Id position属性应为relative
 * @param {string} arrowPosition 指示箭头位置取值范围["left","center","right"],默认值为center
 * @param {string} textAlign 文字位置["left","center","right"],默认值为left，居左
 * @param {number} textY 文字竖方向的偏移量
 */
export function EllipsisAndToolTip(parentId, textAlign ,textY , arrowPosition, ){
    this.parentId = parentId
    this.arrowPosition = arrowPosition || "center"
    this.textAlign = textAlign || "left"
    this.textY = textY || 21
}
EllipsisAndToolTip.prototype = new spreadNS.CellTypes.Text();
EllipsisAndToolTip.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
    if(!ctx){
        return
    }
    ctx.font = style.font;
    
    let res = fittingString(ctx, value, w - 5);
    value = res.newStr
    let isEllipsis = res.isEllipsis
    ctx.beginPath();
    ctx.textAlign="start";
    ctx.fillStyle = '#000';
    let textWidth = Math.ceil(ctx.measureText(value).width)
    if(isEllipsis){
        ctx.fillText(value,x+2,y+this.textY);
    }else{
        // ctx.fillText(value,x+2,y+this.textY);
        if(this.textAlign == 'left'){
            ctx.fillText(value,x+5,y+this.textY);
        }else if(this.textAlign == 'center'){
            ctx.fillText(value,x+(w/2-textWidth/2),y+this.textY);
        }else if(this.textAlign == 'right'){
            ctx.fillText(value,x+(w-textWidth-5),y+this.textY);
        }
    }
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


/**
 * HyperLinkTextCell  超链接+文本测试
 * @param {array} linkArr 超链接属性 形如：[{name:'引用',color:'red',clickFun:function,tipText}]  name:超链接文本，color:超链接文本颜色，clickFun:超链接点击执行方法,tipText:超链接悬浮显示文字，若不传则显示name
 * @param {string} parentId 表格最外层容器Id position属性应为relative
 * @param {number} textMaxWidth 普通文本宽度 不传则自动计算除超链接的宽度赋予文本宽度，超出隐藏
 * @param {number} textY 普通文本竖向偏移量 默认值21
 * @param {number} linkY 超链接文本竖向偏移量 默认值21
 */
export function HyperLinkTextCell(linkArr, parentId, textY, linkY, textMaxWidth, needTip = true, ) {
    this.linkArr = linkArr || []
    this.linkTextStr = ""
    this.textY = textY || 21
    this.linkY = linkY || 21
    this.linArea = []
    this.linkNum = linkArr.length
    this.textWidth = 0
    this.textWidthArr = []
    this.textMaxWidth = textMaxWidth
    this.needTip = needTip
    this.parentId = parentId
    for (let i = 0; i < linkArr.length; i++) {
        const item = linkArr[i];
        this.linkTextStr+=item.name
    }
    this.plainTextWidth = 0
}
/**
 * 用于过滤并形成最后需要省略显示的文字
 *
 * @param {*} c canvas画笔
 * @param {*} str 要显示的字符串
 * @param {*} maxWidth 最大宽度
 */
let fittingStringForHyperLink = (c, str, cellWidth,linkTextStr,linkNum,maxWidth) => {
    let result = ''
    let width = c.measureText(str).width;
    let ellipsis = '…';
    let ellipsisWidth = c.measureText(ellipsis).width;
    let hyperLinkTextWidth = c.measureText(linkTextStr).width;
    let textMaxWidth = maxWidth || cellWidth- 20 - hyperLinkTextWidth - 10*(linkNum-1)
    // console.log("ellipsisWidth===",ellipsisWidth)
    if (width <= textMaxWidth || width <= ellipsisWidth) {
        return result = {
          newStr: str,
          textWidth:c.measureText(str).width,
          textMaxWidth: textMaxWidth
        };
    } else {
        let len = str.length;
        while (width >= textMaxWidth - ellipsisWidth && len-- > 0) {
            str = str.substring(0, len);
            width = c.measureText(str).width;
        }
        return result = {
          newStr: str + ellipsis,
          textWidth: textMaxWidth,
          textMaxWidth: textMaxWidth
        };
    }
}
HyperLinkTextCell.prototype = new spreadNS.CellTypes.Base();

HyperLinkTextCell.prototype.paintContent = function (ctx, value, x, y, w, h, style, context) {
    ctx.font = style.font;
    let newValue = ''
    if(value){
        let fittingres = fittingStringForHyperLink(ctx, value,  w - 2, this.linkTextStr,this.linkNum ,this.textMaxWidth);
        newValue = fittingres.newStr
        this.textWidth = fittingres.textWidth == this.textMaxWidth?this.textMaxWidth:fittingres.textWidth
        this.textMaxWidth = this.textMaxWidth || fittingres.textMaxWidth
        let row = context.row
        if(!this.textWidthArr[row]){
            this.textWidthArr.push({textWidth:Math.ceil(this.textWidth),text:value})
        }
    }
    ctx.beginPath();

    // //获取文字属性
    let textInfo = ctx.measureText(newValue)
    // //计算矩形宽度并暂时赋值给单元格总宽度
    let textWidth = 0
    //绘制普通文本
        ctx.textAlign="start";
        ctx.fillStyle = '#000';
        if(newValue){
            textWidth = this.textMaxWidth+10
            ctx.fillText(newValue,x+5,y+this.textY);
        }
        //绘制超链接文本
        for (let k = 0; k < this.linkArr.length; k++) {
            ctx.beginPath();
            const ele = this.linkArr[k];
            ctx.textAlign="start";
            ctx.fillStyle = ele.color || "#000";
            ctx.fillText(ele.name,x+5+textWidth,y+this.linkY);
            let currentLinkTextWidth = Math.ceil(ctx.measureText(ele.name).width);

            if(!this.linArea[context.row]){
                this.linArea[context.row]= [{startX:x+5+textWidth,endX:x+5+textWidth + currentLinkTextWidth,name:ele.name,row:context.row,tipText:ele.tipText||ele.name}]
            }else{
                (this.linArea[context.row])[k]= {startX:x+5+textWidth,endX:x+5+textWidth + currentLinkTextWidth,name:ele.name,row:context.row,tipText:ele.tipText||ele.name}
            }

            textWidth += Math.ceil(ctx.measureText(ele.name).width)+10
        }
};
HyperLinkTextCell.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
    
	let res = ismouseInArea(x, "", context.row, this.linArea,0,this.textWidthArr)
    this.ismouseInArea = res.ismouseInArea;
	return {
		x: x,
		y: y,
		row: context.row,
		col: context.col,
		cellStyle: cellStyle,
		cellRect: cellRect,
        sheetArea: context.sheetArea,
        context:context,
        isReservedLocation: res.ismouseInArea,
        index:res.index
	};
}
HyperLinkTextCell.prototype.processMouseDown = function (hitinfo) {

    let { sheet, cellRect, row:cellRow, col:cellCol,x:mouseX,y:mouseY } = hitinfo
    let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
    let cellVAlue = sheet.getValue(cellRow,cellCol)
    let res = ismouseInArea(mouseX,"",cellRow,this.linArea,cellX,this.textWidthArr)
    if(res.index>-1){
        let clickFun = this.linkArr[res.index].clickFun
        if (this._toolTipElement && this._toolTipArrow) {
            document.getElementById(this.parentId).removeChild(this._toolTipElement);
            document.getElementById(this.parentId).removeChild(this._toolTipArrow);
            this._toolTipElement = null;
            this._toolTipArrow = null
        }
        clickFun(hitinfo)
    }
};
HyperLinkTextCell.prototype.processMouseMove = function (hitinfo) {
    //清除提示
    let clearTip = () => {
        if (this._toolTipElement && this._toolTipArrow) {
            document.getElementById(this.parentId).removeChild(this._toolTipElement);
            document.getElementById(this.parentId).removeChild(this._toolTipArrow);
            this._toolTipElement = null;
            this._toolTipArrow = null
        }
    }
    let { sheet, cellRect, row:cellRow, col:cellCol,x:mouseX,y:mouseY } = hitinfo
    let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
    let cellVAlue = sheet.getValue(cellRow,cellCol)
    let res = ismouseInArea(mouseX,"",cellRow,this.linArea,cellX,this.textWidthArr)
    if(res.ismouseInArea){//鼠标悬浮至超链接文字上
        // clearTip()
        // document.getElementById("vp_vp").style.cursor = "pointer !important"
        setTimeout(function(){
            document.getElementById("vp_vp").style.cursor  = 'pointer';
        },0)
        let index = res.index
        let linkTextWidth = (this.linArea[cellRow])[index].endX - (this.linArea[cellRow])[index].startX 
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
                div.style.width = linkTextWidth<50?50+"px":linkTextWidth  + "px"
    
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
        this._toolTipElement.innerHTML = (this.linArea[cellRow])[index].tipText
        this._toolTipElement.style.top = cellY + "px"
        this._toolTipElement.style.left = cellX + "px"
        this._toolTipArrow.style.top = cellY - 5 +  "px"
        this._toolTipArrow.style.left = cellX+this.textMaxWidth + "px"
        document.getElementById(this.parentId).append(this._toolTipElement)
        document.getElementById(this.parentId).append(this._toolTipArrow)
        let h = document.getElementById("__spread_customTipCellType__").offsetHeight
        let w = document.getElementById("__spread_customTipCellType__").offsetWidth
        this._toolTipElement.style.top = cellY - h -5 + "px"
        this._toolTipElement.style.left = linkTextWidth<50?(this.linArea[cellRow])[index].startX - 7 +"px" :(this.linArea[cellRow])[index].startX + "px"
        // if(this.arrowPosition == "center"){
        this._toolTipArrow.style.top = cellY - 10 +  "px"
        this._toolTipArrow.style.left = (this.linArea[cellRow])[index].startX+linkTextWidth/2 - 7 + "px"
        // }else if(this.arrowPosition == "left"){
        //     this._toolTipArrow.style.top = cellY - 10 +  "px"
        //     let tmpW = w*0.25>15?15:w*0.25
        //     this._toolTipArrow.style.left = cellX + tmpW + "px"
        // }else if(this.arrowPosition == "right"){
        //     this._toolTipArrow.style.top = cellY - 11 +  "px"
        //     this._toolTipArrow.style.left = cellX + w - w*0.25 - 7 + "px"
        // }
    }else if(res.isInTextArea && this.needTip){//鼠标悬浮至普通文本上
        document.body.style.cursor = "auto"
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
                div.style.width = this.textWidthArr[cellRow].textWidth<50?50:this.textWidthArr[cellRow].textWidth + "px"
    
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
        this._toolTipElement.innerHTML = this.textWidthArr[cellRow].text
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
        // if(this.arrowPosition == "center"){
            this._toolTipArrow.style.top = cellY - 10 +  "px"
            this._toolTipArrow.style.left = cellX + w/2 - 7 + "px"
        // }else if(this.arrowPosition == "left"){
        //     this._toolTipArrow.style.top = cellY - 10 +  "px"
        //     let tmpW = w*0.25>15?15:w*0.25
        //     this._toolTipArrow.style.left = cellX + tmpW + "px"
        // }else if(this.arrowPosition == "right"){
        //     this._toolTipArrow.style.top = cellY - 11 +  "px"
        //     this._toolTipArrow.style.left = cellX + w - w*0.25 - 7 + "px"
        // }
    }else{
        clearTip()
    }
};
HyperLinkTextCell.prototype.processMouseLeave = function (hitinfo) {
	if (this._toolTipElement && this._toolTipArrow) {
		document.getElementById(this.parentId).removeChild(this._toolTipElement);
		document.getElementById(this.parentId).removeChild(this._toolTipArrow);
        this._toolTipElement = null;
        this._toolTipArrow = null
	}
};
HyperLinkTextCell.prototype.activeOnClick = function(){
    return !this.ismouseInArea;
}

/**
 * ismouseInArea 判断鼠标是否在特定范围内 返回{ismouseInArea：true|false， index：number，isInTextArea: true|false} ismouseInArea为是否在区域内，index为在区域数组中的下标,isInTextArea：是否悬浮在普通文本区域
 *
 * @param {Number} mouseX 鼠标的X位置
 * @param {Number} mouseY 鼠标的Y位置
 * @param {Number} row 行号
 * @param {Array} areaArr特定区域数组
 * @param {Array} cellX 单元格的起始X位置
 * @param {Array} textWidthArr 普通文本的宽度集合
 */
let ismouseInArea = (mouseX,mouseY,row,areaArr,cellX,textWidthArr) => {
    let res = {index:-1,ismouseInArea:false,isInTextArea:false}
    // console.log(textWidthArr)
    if(textWidthArr.length && mouseX < cellX+5+textWidthArr[row].textWidth){
        res = {index:-1,ismouseInArea:false,isInTextArea:true}
        return res
    }
    let arr = areaArr[row]
    for (let j = 0; j < arr.length; j++) {
        const ele = arr[j];
        if(mouseX > ele.startX && mouseX < ele.endX){
            res = {index:j,ismouseInArea:true,isInTextArea:false}
            break
        }
    }
    return res
}


/**
 * 使用数据显示内容作为超链接
 *
 * @param {string} parentId 表格最外层容器Id position属性应为relative
 * @param {string} textAlign 文字位置["left","center","right"],默认值为left，居左
 * @param {string} color 文字颜色 默认值 '#000'
 * @param {number} textY 文字竖向偏移量 默认值21
 * @param {boolean} needTip 是否需要toolTip  默认值为true
 * @param {function} clickFun 点击方法
 */
export function SingleHyperLinkCell(parentId, textAlign, color = '#000', textY, needTip = true, clickFun ) {
    this.parentId = parentId
    this.textY = textY || 21
    this.needTip = needTip
    this.color = color
    this.textAlign = textAlign || 'center'
    this.linkAreaArr = []
    this.clickFun = clickFun
}
SingleHyperLinkCell.prototype = new spreadNS.CellTypes.Base();

SingleHyperLinkCell.prototype.paintContent = function (ctx, value, x, y, w, h, style, context) {
    if(!ctx){
        return
    }
    let row = context.row
    if(!value){
        this.linkAreaArr[row] = []
    }
    ctx.font = style.font;
    let res = fittingString(ctx, value, w - 5);
    value = res.newStr
    let isEllipsis = res.isEllipsis
    ctx.beginPath();
    ctx.textAlign="start";
    ctx.fillStyle = this.color;
    let textWidth = Math.ceil(ctx.measureText(value).width)
    if(isEllipsis){
        ctx.fillText(value,x+5,y+this.textY);
        this.linkAreaArr[row] = [{startX:x+5,endX:x+5+textWidth}]
    }else{
        if(this.textAlign == 'left'){
            ctx.fillText(value,x+5,y+this.textY);
            this.linkAreaArr[row] = [{startX:x+5,endX:x+5+textWidth}]
        }else if(this.textAlign == 'center'){
            ctx.fillText(value,x+(w/2-textWidth/2),y+this.textY);
            this.linkAreaArr[row] = [{startX:x+(w/2-textWidth/2),endX:x+(w/2-textWidth/2)+textWidth}]
        }else if(this.textAlign == 'right'){
            ctx.fillText(value,x+(w-textWidth-5),y+this.textY);
            this.linkAreaArr[row] = [{startX:x+(w-textWidth-5),endX:x+(w-textWidth-5)+textWidth}]
        }
    }
};
SingleHyperLinkCell.prototype.getHitInfo = function (x, y, cellStyle, cellRect, context) {
    let res = ismouseInArea(x, "", context.row, this.linkAreaArr,0,[])
    this.ismouseInArea = res.ismouseInArea;
	return {
		x: x,
		y: y,
		row: context.row,
		col: context.col,
		cellStyle: cellStyle,
		cellRect: cellRect,
        sheetArea: context.sheetArea,
        context:context,
        isReservedLocation: res.ismouseInArea,
        index:res.index
	};
}
SingleHyperLinkCell.prototype.processMouseDown = function (hitinfo) {

    let { sheet, cellRect, row:cellRow, col:cellCol,x:mouseX,y:mouseY } = hitinfo
    let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
    let cellVAlue = sheet.getValue(cellRow,cellCol)
    let res = ismouseInArea(mouseX,"",cellRow,this.linkAreaArr,cellX,[])
    if(res.index>-1){
        let clickFun = this.clickFun
        if (this._toolTipElement && this._toolTipArrow) {
            document.getElementById(this.parentId).removeChild(this._toolTipElement);
            document.getElementById(this.parentId).removeChild(this._toolTipArrow);
            this._toolTipElement = null;
            this._toolTipArrow = null
        }
        if(clickFun){
            clickFun(hitinfo,cellVAlue)
        }else{
            return
        }
    }
};
SingleHyperLinkCell.prototype.processMouseMove = function (hitinfo) {
    //清除提示
    let clearTip = () => {
        if (this._toolTipElement && this._toolTipArrow) {
            document.getElementById(this.parentId).removeChild(this._toolTipElement);
            document.getElementById(this.parentId).removeChild(this._toolTipArrow);
            this._toolTipElement = null;
            this._toolTipArrow = null
        }
    }
    clearTip()
    let { sheet, cellRect, row:cellRow, col:cellCol,x:mouseX,y:mouseY } = hitinfo
    let {width:cellWidth,height:cellHeight,x:cellX,y:cellY} = cellRect
    let cellVAlue = sheet.getValue(cellRow,cellCol)
    if(!cellVAlue){
        return
    }
    let res = ismouseInArea(mouseX,"",cellRow,this.linkAreaArr,cellX,[])
    if(res.ismouseInArea){//鼠标悬浮至超链接文字上
        setTimeout(function(){
            document.getElementById("vp_vp").style.cursor  = 'pointer';
        },0)
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
        // if(this.arrowPosition == "center"){
            this._toolTipArrow.style.top = cellY - 10 +  "px"
            this._toolTipArrow.style.left = cellX + w/2 - 7 + "px"
        // }else if(this.arrowPosition == "left"){
        //     this._toolTipArrow.style.top = cellY - 10 +  "px"
        //     let tmpW = w*0.25>15?15:w*0.25
        //     this._toolTipArrow.style.left = cellX + tmpW + "px"
        // }else if(this.arrowPosition == "right"){
        //     this._toolTipArrow.style.top = cellY - 11 +  "px"
        //     this._toolTipArrow.style.left = cellX + w - w*0.25 - 7 + "px"
        // }
    }else{
        clearTip()
    }
    
};
SingleHyperLinkCell.prototype.processMouseLeave = function (hitinfo) {
	if (this._toolTipElement && this._toolTipArrow) {
		document.getElementById(this.parentId).removeChild(this._toolTipElement);
		document.getElementById(this.parentId).removeChild(this._toolTipArrow);
        this._toolTipElement = null;
        this._toolTipArrow = null
	}
};
SingleHyperLinkCell.prototype.activeOnClick = function(){
    return !this.ismouseInArea;
}