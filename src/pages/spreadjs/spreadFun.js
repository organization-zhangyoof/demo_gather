import GC from '@grapecity/spread-sheets';
let spreadNS = GC.Spread.Sheets
export function FivePointedStarCellType(size){
    this.size = size;
}
FivePointedStarCellType.prototype = new spreadNS.CellTypes.Base();
FivePointedStarCellType.prototype.paint = function (ctx, value, x, y, w, h, style, context) {
    // if(value == "1"){
        console.log("ctx====",ctx)
        console.log("value====",value)
        console.log("x====",x)
        console.log("y====",y)
        console.log("w====",w)
        console.log("h====",h)
        console.log("style====",style)
        console.log("context====",context)
    // }
    if (!ctx) {
        console.log(456)
        return;
    }

    ctx.save();

    // draw inside the cell's boundary
    ctx.rect(x, y, w, h);
    ctx.clip();
    ctx.beginPath();

    // if (value) {
    //     ctx.fillStyle = "orange";
    // } else {
    //     ctx.fillStyle = "gray";
    // }

    // ctx.fillStyle = "orange";

    // var size = this.size;
    // var dx = x + w / 2;
    // var dy = y + h / 2;
    // ctx.beginPath();
    // var dig = Math.PI / 5 * 4;
    // ctx.moveTo(dx + Math.sin(0 * dig) * size, dy + Math.cos(0 * dig) * size);
    // for (var i = 1; i < 5; i++) {
    //     ctx.lineTo(dx + Math.sin(i * dig) * size, dy + Math.cos(i * dig) * size);
    // }
    // ctx.closePath();
    // ctx.fill();
    var tm1 = ctx.measureText(value);
    ctx.fillStyle = 'red';
    ctx.fillRect(x+5, y+5, w-20, h-10);
    // ctx.fillStyle = 'red';
    // ctx.strokeStyle = 'blue';
    // ctx.lineWidth = 1;
    // ctx.fillRect(50, 50, 100, 100);
    // ctx.strokeRect(50, 50, 100, 100);
    var tm1 = ctx.measureText(value);
    if(value == "1-1-1-4"){
        // console.log("tm1=====",Math.ceil(tm1.width))
    }
    // ctx.beginPath();
    // ctx.fillStyle = '#000';
    // ctx.fillText(value,x+80,y+20);

    ctx.restore();
};