/* eslint-disable */
var str = '12345678901'
var aNum = 0
var maxLen = 10
var strCopy = ''
var len = JSON.parse(JSON.stringify(str)).length
var start = 0
var end = JSON.parse(JSON.stringify(str)).length
if(str.length > maxLen){
    testFunR()
}

function testFunR(){
    len =  Math.ceil(len - (end - start)/2)
    strCopy = (JSON.parse(JSON.stringify(str))).slice(0,len)
    if(strCopy.length<maxLen){
        start = len
        testFunA()
    }else if(strCopy.length>maxLen){
        end = len
        testFunR()
    }
}
function testFunA(){
    len = Math.ceil(len + (end-start)/2)
    strCopy = (JSON.parse(JSON.stringify(str))).slice(0,len)
    if(strCopy.length<maxLen){
        start = len
        testFunA()
    }else if(strCopy.length>maxLen){
        end = len
        testFunR()
    }
}
