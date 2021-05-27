//弹框拖拽
function popDrag(id){
  var oWin = document.getElementsByClassName(id)[0].getElementsByClassName("modal-dialog")[0];
  var oH2 =  document.getElementsByClassName(id)[0].getElementsByClassName("modal-header")[0];
  var bDrag = false;
  var disX = 0;
        var disY = 0;
        // console.log(oH2)
  oH2.onmousedown = function (event){  
               // console.log(event )
      var event = event || window.event;
      bDrag = true;
      disX = event.clientX - oWin.offsetLeft;
      disY = event.clientY - oWin.offsetTop;  
      this.setCapture && this.setCapture();  
      return false
  };
  document.onmousemove = function (event){
    if (!bDrag) return;
    var event = event || window.event;
    var iL = event.clientX - disX;
    var iT = event.clientY - disY;
    var maxL = document.documentElement.clientWidth - oWin.offsetWidth;
    var maxT = document.documentElement.clientHeight - oWin.offsetHeight;  
    iL = iL < 0 ? 0 : iL;
    iL = iL > maxL ? maxL : iL;   
    iT = iT < 0 ? 0 : iT;
    iT = iT > maxT ? maxT : iT;
    
    oWin.style.marginTop = oWin.style.marginLeft = 0;
    oWin.style.left = iL + "px";
    oWin.style.top = iT + "px";  
    return false
  };
  document.onmouseup = window.onblur = oH2.onlosecapture = function (){
    bDrag = false;    
    oH2.releaseCapture && oH2.releaseCapture();
  };
}