import router  from 'umi/router'

// 获取有权限的项目列表
export function getMyProjectList() {
  let projectList = [];
  if(window.__SELECT_PROJECT_ID__){
    projectList.push(window.__SELECT_PROJECT__);
  }else{
    projectList = window.__PROJECT_LIST__
  }
    return projectList;
};

// 根据项目ID获取项目对象
export function getProjectById(pid) {
  const projectList = window.__PROJECT_LIST__;
  let project = null;
  for(let i in projectList){
    if(projectList[i].id == pid){
      project = projectList[i];
    }
  }
  return project;
};

// 获取所有权限的合同段列表
export function getMyAllContractList() {
  return window.__CONTRACT_LIST__;
};

// 根据项目ID获取有权限的合同段列表
export function getContractListByPrj(projectId) {
  const contractList = window.__CONTRACT_LIST__;
  let contractData = []
  for(let i in contractList){
    if(contractList[i].projectId == projectId){
      contractData.push(contractList[i]);
    }
  }
  return contractData;
};

// 根据项目ID获取有权限的施工合同段列表
export function getSgContractListByPrj(projectId) {
  const contractList = window.__CONTRACT_LIST__;
  let contractData = []
  for(let i in contractList){
    if(contractList[i].projectId == projectId && contractList[i].type == 'SGDW'){
      contractData.push(contractList[i]);
    }
  }
  return contractData;
};


// 根据项目ID获取有权限的施工合同段列表
export function getContractById(id) {
  const contractList = window.__CONTRACT_LIST__;
  let contract = null;
  for(let i in contractList){
    if(contractList[i].id == id){
      contract = contractList[i];
    }
  }
  return contract;
};

// 根据项目ID合同段的wbs启用状态
export function updateContractWbsStatus(id,status) {
  const contractList = window.__CONTRACT_LIST__;
  let cont = JSON.parse(sessionStorage.contractList);
  for(let i in contractList){
    if(contractList[i].id == id){
      contractList[i].wbsStatus = status;
    }
  }
  for(let i in cont){
    if(cont[i].id == id){
      cont[i].wbsStatus = status;
    }
  }
  sessionStorage.contractList = JSON.stringify(cont);
};
