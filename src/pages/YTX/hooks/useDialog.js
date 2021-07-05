import React, { useEffect, useState } from 'react';

export default function useDialog(initial) {
  const {dragId} = initial;
  let drag = document.getElementById(dragId);
  const [styleTop, setStyleTop] = useState(-10000);
  const [styleLeft, setStyleLeft] = useState(-10000);

  const onMouseDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const diffX = e.clientX - drag.offsetLeft;
    const diffY = e.clientY - drag.offsetTop;
    drag.style.pointerEvents = 'none';

    document.onmousemove = e => {
      let left = e.clientX - diffX;
      let top = e.clientY - diffY;
      // 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
      if (left < 0) {
        left = 0;
      } else if (left > window.innerWidth - drag.offsetWidth) {
        left = window.innerWidth - drag.offsetWidth;
      }
      if (top < 0) {
        top = 0;
      } else if (top > window.innerHeight - drag.offsetHeight) {
        top = window.innerHeight - drag.offsetHeight;
      }
      setStyleLeft(left);
      setStyleTop(top);
    };
    document.onmouseup = function (e) {
      drag.style.pointerEvents = 'auto';
      document.onmousemove = null;
      document.onmouseup = null;
    }
    return false;
  }

  const open = () => {
    const windowH = document.body.clientHeight;
    const windowW = document.body.clientWidth;
    drag = document.getElementById(dragId);

    setStyleLeft(windowW / 2 - drag.offsetWidth / 2);
    setStyleTop(windowH / 2 - drag.offsetHeight / 2);
  }

  const close = () => {
    setStyleLeft(-10000);
    setStyleTop(-10000);
  }

  useEffect(() => {
    drag = document.getElementById(dragId);
  }, []);

  return {
    styleTop,
    styleLeft,
    onMouseDown,
    close,
    open,
  }
}