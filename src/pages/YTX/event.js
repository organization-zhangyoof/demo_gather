import {EventBus} from './utils/EventBus';

// 资源列表
export const EventSoucesList = new EventBus();

// 地图左键鼠标点击
export const EventCanvasLeftClick = new EventBus();

// 地图左键鼠标双击
export const EventCanvasLeftDoubleClick = new EventBus();

// 绘制点和面
export const EventEntityDraw = new EventBus();

// 监听数值变化
export const EventSourcesTotal = new EventBus();

// 发送信息
export const EventSendMessage = new EventBus();

// 树列表
export const EventTreeShow = new EventBus();