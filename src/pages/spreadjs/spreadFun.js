import GC from '@grapecity/spread-sheets';
let spreadNS = GC.Spread.Sheets
/**
 * 用于spreadJS表格单元格显示层级，不同层级显示不同颜色
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
    debugger
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
        console.log("indedx====",index)
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