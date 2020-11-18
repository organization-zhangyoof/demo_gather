import React, { Component } from 'react';
import { Button, Input } from 'antd';
class Page3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: '',
    };
  }

  render() {
    const handleClick = () => {
      let { inputVal } = this.state;
      window.__TEST_STRING__ = inputVal;
      console.log('window.__TEST_STRING__===', window.__TEST_STRING__);
    };
    const handleChange = e => {
      this.setState({ inputVal: e.target.value });
      // console.log('e=====',e.target.value)
    };
    const openNewTag = () => {
      window.open('http://www.baidu.com');
    };
    return (
      <div style={{ width: '100%', height: '100%', background: '#D8D8F7' }}>
        <h1>this is page3</h1>
        <Input onChange={handleChange} />
        <Button onClick={handleClick}>changeVal</Button>
        <Button onClick={openNewTag}>openNewTag</Button>
        <div style={{display:'flex',width: '100%', height: '80%'}}>
        <div style={{ width: '20%', height: '100%' }}></div>
        <div style={{ width: '80%', height: '100%' }}>
          <iframe
            src="http://localhost:8991/bMap"
            style={{ width: '100%', height: '100%' }}
          ></iframe>
        </div>
        </div>

      </div>
    );
  }
}

export default Page3;
