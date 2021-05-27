import React,{Component} from 'react'
import styles from '../index.less'
import { Button,Menu } from 'antd'
import { router } from 'umi';
import { Link } from 'umi';
const { SubMenu } = Menu;
const MenuItem = Menu.Item
const menuList = [
    {
        name:'page1',
        route:'/page1',
        children:[]
    },
    {
        name:'Page2',
        route:'/page2',
        children:[]
    },
    {
        name:'Page3',
        route:'/page3',
        children:[]
    },
    {
        name:'Page4',
        route:'/page4',
        children:[]
    },
    {
        name:'spreadJS相关',
        route:'',
        children:[
            {
                name:'spread',
                route:'/spreadIo',
                children:[]
            },
            {
                name:'spread导入导出',
                route:'/spreadJS',
                children:[]
            },
            {
                name:'spread设计器',
                route:'/spreadDesign',
                children:[]
            },
        ]
    },
    {
        name:'iframe嵌套页面',
        route:'/iframe',
        children:[]
    },
    {
        name:'BaseTest',
        route:'/basetest',
        children:[]
    },
    {
        name:'hook相关',
        route:'',
        children:[
            {
                name:'reactHook',
                route:'/reactHook',
            },
            {
                name:'ahook',
                route:'/ahook',
            },
        ]
    },
    {
        name:'BIM/GIS相关',
        route:'',
        children:[
            {
                name:'BIM',
                route:'/bim',
                children:[]
            },
            {
                name:'百度地图',
                route:'/bMap',
                children:[]
            },
            {
                name:'BIMDemo',
                route:'/bimDemo',
                children:[]
            },
        ]
    },
    {
        name:'容联云',
        route:'/ytx',
    }
]
class HomePage extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    componentDidMount(){
        window.__TEST_STRING__ = 'this is init string'
        window.__CHANGE_FUN__ = ()=>{
            alert(123)
        }
    }
    render(){
        console.log("menuList===",menuList)
        let obj = {a:789,b:456}
        const renderMenu = () => {
            return (
                <Menu
                    defaultSelectedKeys={'/page1'}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                >
                    {
                        menuList.map((item,i)=>{
                            if(item.children && item.children.length){
                                let key = i
                                return(
                                    <SubMenu title={item.name} key = {key}>
                                        {
                                            item.children.map((tmp,j) => {
                                                return(
                                                    <MenuItem
                                                        onClick={tmp.onClcik?tmp.onClcik:()=>router.push(tmp.route)} 
                                                        key = {tmp.route}
                                                    >
                                                        {tmp.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            }else{
                                return (
                                    <MenuItem
                                        onClick={item.onClcik?item.onClcik:()=>router.push(item.route)} 
                                        key = {item.route}
                                    >
                                        {item.name}
                                    </MenuItem>
                                )
                            }
                        })
                    }
                </Menu>
            )
        }
        return (
            <div className={styles.main}>
                {/* <div className = {styles.nav}>
                    <h1>导航区</h1>
                </div> */}
                <div className = {styles.btn_box}>
                    {renderMenu()}
                    {/* <Button onClick={()=>router.push('/page1')} className = {styles.btn}>跳转至Page1</Button>
                    <Button onClick={()=>router.push('/page2')} className = {styles.btn}>跳转至Page2</Button>
                    <Button onClick={()=>router.push('/page3')} className = {styles.btn}>跳转至Page3</Button>
                    <Button onClick={()=>router.push('/page4')} className = {styles.btn}>跳转至Page4</Button>
                    <Button onClick={()=>router.push('/spreadJS')} className = {styles.btn}>跳转至spread</Button>
                    <Button onClick={()=>router.push('/spreadIo')} className = {styles.btn}>跳转至spread导入导出</Button>
                    <Button onClick={()=>router.push('/basetest')} className = {styles.btn}>跳转至BaseTest</Button>
                    <Button onClick={()=>router.push('/spreadDesign')} className = {styles.btn}>跳转至spread设计器</Button>
                    <Button onClick={()=>router.push('/iframe')} className = {styles.btn}>跳转至iframe嵌套页面</Button>
                    <Button onClick={()=>router.push('/bim')} className = {styles.btn}>跳转至BIM</Button>
                    <Button onClick={()=>router.push('/bMap?a=123&b=456&c='+JSON.stringify(obj))} className = {styles.btn}>跳转百度地图</Button>
                    
                    <Button onClick={()=>router.push('/bimDemo')} className = {styles.btn}>跳转至BIMDemo</Button> */}
                </div>
                <div className = {styles.container}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default HomePage;
