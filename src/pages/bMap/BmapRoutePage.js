import React from 'react';
import { connect } from 'dva';
import  {BmapGeo,BmapGeoT}  from "./components/BmapGeo/index"

const BmapRoutePage = (obj) => {
  const { location, dispatch, map  } = obj

  const mapProps = {
    tspSiteList: map.tspSiteList,
    roadData: map.roadData,
    monitorData:map.monitorData,
    // getMonitorData:()=>{
    //   dispatch({type:'map/getMonitorData',payload:{}})
    // }
  }


  return (
    <BmapGeo {...mapProps}/>
    //TODO BmapGeoT组件存在问题待修复
    // <BmapGeoT {...mapProps}/> 
  );
}

function mapStateToProps({ map }) {
  return { map };
}
export default connect(mapStateToProps)(BmapRoutePage);
//export default Database;