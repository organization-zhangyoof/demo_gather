const config = {
  //风险源等级
  RISK_LEVEL: [
    { id: '1', name: '风险等级:I级（低度风险）' },
    { id: '2', name: '风险等级:II级（中度风险）' },
    { id: '3', name: '风险等级:III级（高度风险）' },
    { id: '4', name: '风险等级:IV级（极高风险）' },
  ],
  //施工状态
  CONSTRUCT_STATUS: [
    { id: '1', name: '未施工' },
    { id: '2', name: '施工中' },
    { id: '3', name: '停工' },
    { id: '4', name: '已完工' },
  ],
  //危险源状态
  RISK_STATUS: [
    { id: '1', name: '已激活' },
    { id: '2', name: '未激活' },
    { id: '3', name: '已关闭' },
  ],
  //巡查情况
  CHECK_STATUS: [
    { id: '1', name: '正常', color: 'green' },
    { id: '2', name: '异常', color: 'red' },
  ],
};

export default config;
