import React,{useState,useEffect } from'react'
import { Button,Input } from 'antd'
import styles from '../../index.less'
import { router } from 'umi';

const AhookPage = () => {
    return(
        <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
            this is react ahook api test page
            {/* <p>name: {obj.name}; age: {obj.age}; gender: {obj.gender?obj.gender:'*'};time: {info}</p>
            <p>name:<Input defaultValue = {name} onChange = {(e)=>setName(e.target.value)}/></p>
            <p>age:<Input defaultValue = {age} onChange = {(e)=>setAge(e.target.value)}/></p>
            <p>gender:<Input defaultValue = {gender} onChange = {(e)=>setGender(e.target.value)}/></p>
            <Button onClick={() => changeObj({age,name,gender})}>
                Click me
            </Button> */}
            
        </div>
    )
}

export default AhookPage;
