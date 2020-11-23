import localforage from 'localforage'
/**
 * 
 */
// 获取有权限的项目列表
export async function  localDbGetItem(key) {
    let res = await  localforage.getItem(key)
    return res
};


