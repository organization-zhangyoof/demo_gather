import React,{useState,useEffect } from'react'
import { Button,Input } from 'antd'
import styles from '../../index.less'
import { router } from 'umi';

const ReactHookPage = () => {
    const [obj, setObj] = useState({'name':'tom',age:22});
    const [name, setName] = useState('tom');
    const [age, setAge] = useState('22');
    const [gender, setGender] = useState('');
    const [time, setTime] = useState(0);
    useEffect(() => {
        // Update the document title using the browser API
        // document.title = `You clicked ${count} times`;
        console.log('chenge=====')
        setTime(time + 1)
      },[age]);
      const changeObj = (newObj) => {
          setObj({...obj,...newObj})
      }
    return(
        <div style={{width:'100%',height:'100%',background:'#FAE5E5'}}>
            this is react hook api test page
            <p>name: {obj.name}; age: {obj.age}; gender: {obj.gender?obj.gender:'*'};time: {time}</p>
            <p>name:<Input defaultValue = {name} onChange = {(e)=>setName(e.target.value)}/></p>
            <p>age:<Input defaultValue = {age} onChange = {(e)=>setAge(e.target.value)}/></p>
            <p>gender:<Input defaultValue = {gender} onChange = {(e)=>setGender(e.target.value)}/></p>
            <Button onClick={() => changeObj({age,name,gender})}>
                Click me
            </Button>
            
        </div>
    )
}

export default ReactHookPage;
