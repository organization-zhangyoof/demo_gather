import GC from '@grapecity/spread-sheets';
let spreadNS = GC.Spread.Sheets


/**
 * 用于spreadJS表格单元格显示层级，不同层级显示不同颜色
 *
 * @param {Array} data 所要展示的的数据
 * @param {String} nameKey 工程分项后面所要跟随那个字段的值
 * @param {Array} colorRange 个层架显示颜色集合
 * @param {Array} nodeTypeNameEmun 工程划分枚举值
 * @param {Number} partTextY 工程划分文字竖向偏移量
 * @param {Number} nameTextY 工程划分后文字竖向偏移量
 * @param {Number} partSize 工程划分文字大小
 * @param {Number} nameSize 工程划分后的文字大小
 */
export function customCellType(data,nameKey,colorRange,nodeTypeNameEmun,partTextY,nameTextY,partSize,nameSize){
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
}
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
// customCellType.prototype = new spreadNS.CellTypes.Base();
customCellType.prototype = new spreadNS.CellTypes.Text();
// customCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
customCellType.prototype.paintContent = function (ctx, value, x, y, w, h, style, context) {



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
        if(this.nameSize){
            ctx.font = this.nameSize + "px  Arial";
        }
        ctx.fillText((this.data[row])[this.nameKey],x+Math.ceil(textInfo.width)+20,y+this.nameTextY);
    }

    ctx.restore();
};


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


//超出省略显示...

export function EllipsisTextCellType() {
}
EllipsisTextCellType.prototype = new spreadNS.CellTypes.Text();
EllipsisTextCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
    ctx.font = style.font;
    value = fittingString(ctx, value, w - 2);
    spreadNS.CellTypes.Text.prototype.paint.apply(this, arguments);
};
let fittingString = (c, str, maxWidth) => {
    var width = c.measureText(str).width;
    var ellipsis = '…';
    var ellipsisWidth = c.measureText(ellipsis).width;
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