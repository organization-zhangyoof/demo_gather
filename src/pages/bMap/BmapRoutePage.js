import React from 'react';
import { connect } from 'dva';
import { BmapGeo, VideoPlayModal, VideoListModal } from "./components/index"

const BmapRoutePage = (obj) => {
  const { location, dispatch, map,video, type  } = obj

  const {
    dangereData,
    roadData,
    bimPoints,
    videoPoints,
    startAndEndData,
    stationData,
    keyProjectData,
    panoramicData
  } = map
  const {
    videoList,
    currentIndex,
    videoListVisible,
    videoPlayVisible,
    playTitle,
  } = video
  const mapProps = {
    //危险源数据
    dangereData,
    //线路数据
    roadData,
    stationData,
    keyProjectData,
    panoramicData,
    bimPoints,
    videoPoints,
    startAndEndData,
    type,
    //关键工程数据
    //驻地与场站数据
    //全景照片数据
    //起讫点数据
    //获取视频监控数据
    getVideoList: ( ) => {
        dispatch({
            type:'video/getVideoList',
            payload:{ }
        })
    },

  }

  const videoPlayProps = {
    videoList,
    currentIndex,
    videoPlayVisible,
    playTitle,
    //切换视频
    changeVideo: (index) => {
        dispatch({
            type:'video/setState',
            payload:{
                currentIndex:index,
                playTitle:videoList[index].name
            }
        })
    },
    //关闭视频播放
    closeVideoPlay: () => {
        dispatch({
            type:'video/setState',
            payload:{videoPlayVisible:false}
        })
    },
  }

  const videoListProps={
    videoList,
    videoListVisible,
    closeVideoList:()=>{
        dispatch({
            type:'video/setState',
            payload:{videoListVisible:false}
        })
    },
    playVideo:(index,name) => {
        debugger
        dispatch({
            type:'video/setState',
            payload:{
                videoPlayVisible:true,
                currentIndex:index,
                playTitle:name
            }
        })
    }
  }


  return (
    <>
        <BmapGeo {...mapProps}/> 
        <VideoPlayModal {...videoPlayProps}/>
        <VideoListModal {...videoListProps}/>
    </>
  );
}

function mapStateToProps(state) {
  return { ...state };
}
export default connect(mapStateToProps)(BmapRoutePage);
//export default Database;