import GC from '@grapecity/spread-sheets';
let spreadNS = GC.Spread.Sheets
/**
 * 用于spreadJS表格单元格显示层级，不同层级显示不同颜色
 * @param {Array} data 所要展示的的数据
 * @param {String} nameKey 工程分项后面所要跟随那个字段的值
 * @param {Array} colorRange 个层架显示颜色集合
 * @param {Number} partTextY 工程划分文字竖向偏移量
 * @param {Number} nameTextY 工程划分后文字竖向偏移量
 * @param {Number} partSize 工程划分文字大小
 * @param {Number} nameSize 工程划分后的文字大小
 */
export function customCellType(data,nameKey,colorRange,partTextY,nameTextY,partSize,nameSize){
    this.partSize = partSize;
    this.nameSize = nameSize;
    this.data = data;
    this.partTextY = partTextY || 21
    this.nameTextY = nameTextY || 20
    this.colorRange = colorRange
    this.nameKey = nameKey
}

// customCellType.prototype = new spreadNS.CellTypes.Base();
customCellType.prototype = new spreadNS.CellTypes.Text();
// customCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
customCellType.prototype.paintContent = function (ctx, value, x, y, w, h, style, context) {
    let row = context.row
    if (!ctx) {
        return;
    }

    ctx.save();

    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.beginPath();

    //获取文字属性
    var textInfo = ctx.measureText(value)
    //绘制矩形
    if(this.colorRange && this.colorRange.length){
        let level = this.data[row].level.split("-").length-1
        ctx.fillStyle = this.colorRange[level].partBg;
    }else{
        ctx.fillStyle = "#ccc"
    }
    ctx.fillRect(x+5, y+5, Math.ceil(textInfo.width)+10, h-10);

    //绘制矩形内文字
    ctx.beginPath();
    ctx.textAlign="start";
    if(this.colorRange && this.colorRange.length){
        let level = this.data[row].level.split("-").length-1
        ctx.fillStyle = this.colorRange[level].partTextClolr;
    }else{
        ctx.fillStyle = "#000"
    }
    if(this.partSize){
        ctx.font = this.partSize + "px  Arial";
    }
    ctx.fillText(value,x+10,y+this.partTextY);

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