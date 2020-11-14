const { BMap } = window;
/**
 *自定义信息弹窗
 *悬浮弹窗
 * @param {*} point 信息弹窗的显示位置即坐标
 * @param {*} text  信息弹窗内容，支持HTML代码片段
 * @param {*} width 信息弹窗宽度
 * @param {*} offsetTop 信息弹窗基于显示位置的向上偏移量
 */
export function customInfoWindow(point,text,width,offsetTop){

    function ComplexCustomOverlay(point, text,width,offsetTop){
        this._point = point;
        this._text = text;
        this._width = width;
        this._offsetTop = offsetTop;
      }

      ComplexCustomOverlay.prototype = new BMap.Overlay();//继承百度地图提供的覆盖物的类

      ComplexCustomOverlay.prototype.initialize = function(map){
        this._map = map;
        let div = this._div = document.createElement("div");
        div.setAttribute("id","customInfoWindow")
        div.style.position = "absolute";
        div.style.width = this._width + "px"
        div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        div.innerHTML=this._text
        let leftMove = (this._width - 20)/2 + "px"
        if(offsetTop){
          let arrow = this._arrow = document.createElement("div");
          arrow.style.position =  "absolute";
          arrow.style.bottom = "-20px";
          arrow.style.left = leftMove;//（（div宽度）-20（边框宽度））/2
          arrow.style.border = "10px solid transparent";
          arrow.style.borderTopColor =  "#414141";
          div.appendChild(arrow);
        }
        map.getPanes().labelPane.appendChild(div);
        return div;
      }

      ComplexCustomOverlay.prototype.draw = function(){
        let H = document.getElementById("customInfoWindow").offsetHeight;
        let map = this._map;
        let pixel = map.pointToOverlayPixel(this._point);
        this._div.style.left = pixel.x - parseInt(this._arrow.style.left)-10 + "px";
        this._div.style.top  = pixel.y - H - this._offsetTop + "px";
      }

      let  myCompOverlay = new ComplexCustomOverlay(point,text,width,offsetTop);
      return myCompOverlay;
}

export const mapStylesJson = [
    {
              "featureType": "poilabel",
              "elementType": "all",
              "stylers": {
                        "visibility": "off"
              }
    },
    {
              "featureType": "water",
              "elementType": "all",
              "stylers": {
                        "color": "#d6e6f4ff"
              }
    },
    {
              "featureType": "green",
              "elementType": "all",
              "stylers": {
                        "color": "#d9ead3ff"
              }
    }
  ]