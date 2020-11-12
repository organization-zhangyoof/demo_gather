import {Modal, Row, Col, Form, Layout, message, Table, DatePicker, Pagination, Tooltip, Icon} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

export function defaultNumberRender(start) {
  return function(text, record, index){
    return <Tooltip  title={start + index}>{start + index}</Tooltip>
  }
};

export function defaultToolTipRender() {
  const breakStyle = {
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  };
  return function(text, record, index){
    return <Tooltip style={breakStyle} title={<span style={breakStyle}>{text}</span>}>{text}</Tooltip>
  }
};
export function defaultToolTipRenderWithText(text, searchName) {
  const breakStyle = {
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
  if(searchName){
    const index = text.indexOf(searchName);
    const beforeStr = text.substr(0, index);
    const afterStr = text.substr(index + searchName.length);
    const titleSpan = index > -1 ? (
      <span>
          {beforeStr}
        <span style={{ color: '#f50' }}>{searchName}</span>
        {afterStr}
        </span>
    ) : <span>{text}</span>;
    text = titleSpan;
  }

  return <Tooltip style={breakStyle} title={<span style={breakStyle}>{text}</span>}><span style={breakStyle}>{text}</span></Tooltip>
};

export function defaultToolTipRenderWithTextForEntityType(text,type, searchName) {
  const breakStyle = {
    wordBreak: 'break-all',
    wordWrap: 'break-word',
    textOverflow: 'ellipsis',
    whiteSpace: 'normal'
  };
  const wbsType = (type) => {
    if(type == 1){
      return <span style={{fontSize: '12px',marginRight: '5px', padding: '1px 7px', backgroundColor: 'rgba(19, 194, 194, 0.1)', color:'#13C2C2'}}>分类</span>;
    }else if(type ==2){
      return <span style={{fontSize: '12px',marginRight: '5px', padding: '1px 7px', backgroundColor: 'rgba(255, 85, 1, 0.1)', color:'#ff5501'}}>实体</span>;
    }else if(type ==3){
      return <span style={{fontSize: '12px',marginRight: '5px', padding: '1px 7px', backgroundColor: 'rgba(250, 145, 33, 0.1)', color:'#fa9121'}}>分项</span>;
    }else{
      return '';
    }
  };
  if(searchName){
    const index = text.indexOf(searchName);
    const beforeStr = text.substr(0, index);
    const afterStr = text.substr(index + searchName.length);
    const titleSpan = index > -1 ? (
      <span>
          {beforeStr}
        <span style={{ color: '#f50' }}>{searchName}</span>
        {afterStr}
        </span>
    ) : <span>{text}</span>;
    text = titleSpan;
  }

  return <Tooltip style={breakStyle} title={<span style={breakStyle}>{text}</span>}>{wbsType(type)}<span style={breakStyle}>{text}</span></Tooltip>
};
export function defaultToolTipRenderWithIndex(indexes) {
  const breakStyle = {
    wordBreak: 'break-all',
    wordWrap: 'break-word',
  };
  return function(text, record, index){
    return <Tooltip style={breakStyle} title={<span style={breakStyle}>{indexes[text]}</span>}><span style={breakStyle}>{indexes[text]}</span></Tooltip>
  }
};

export function setDatePicker(getFieldDecorator, colSpan, offSet, itemLayout, label, key, initialValue, required, editable, disabledDate, hasFeedback,){
  disabledDate = disabledDate ? disabledDate : ()=> {};
  return (
    <Col span={colSpan} offset={offSet}>
      <FormItem hasFeedback={hasFeedback}{...itemLayout} label={label}>
        {getFieldDecorator(key, {
          initialValue: initialValue ? moment(initialValue) : moment(),
          rules: [{required: required, message: "请选择" + label}]
        })
        (<DatePicker disabledDate={disabledDate} disabled={!editable}/>)}
      </FormItem>
    </Col>);
};

/**
 *
 * @param getFieldDecorator 表单函数
 * @param required      是否必填
 * @param isEdit        是否可编辑
 * @param startKey      开始时间的key
 * @param initStartData 开始时间的初始值
 * @param startMessage  开始时间的错误信息
 * @param disabledStartDate 限制开始时间的函数
 * @param endkey        结束时间的key
 * @param initEndData   结束时间的初始值
 * @param endMessage    结束时间的错误信息
 * @param disabledEndDate   限制结束时间的函数
 * @returns {*}
 */
export function setDoubleDatePicker(getFieldDecorator,required,isEdit,startKey,initStartDate,startMessage,disabledStartDate,
                                    endkey,initEndDate,endMessage,disabledEndDate){
  return (<div className={"item-row"} style={{display: "flex"}}>
    <div className={"start_date"} style={{width: 120}}>
      {getFieldDecorator(startKey, {
        initialValue: initStartDate ? moment(initStartDate) : "",
        rules: [{required: required, message: startMessage}]
      })
      (<DatePicker disabledDate={disabledStartDate} disabled={isEdit}/>)}
    </div>
    <span className={"item-line"} style={{width: 30,display: "flex", alignItems: "center"}}>
            <a style={{height: 1,width: "69%",border: "0.4px solid #bbb",margin: "auto"}}></a>
        </span>
    <div className={"end_date"} style={{width: 120}}>
      {getFieldDecorator(endkey, {
        initialValue: initEndDate ? moment(initEndDate) : "",
        rules: [{required: required, message: endMessage}]
      })
      (<DatePicker disabledDate={disabledEndDate} disabled={isEdit}/>)}
    </div>
  </div>);
}

