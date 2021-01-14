import React from 'react';
import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';

const TagForm = ({ inputVisible, inputValue, showInput, handleInputChange, handleInputConfirm, tagChild }) => {
  return (
    <div className='form-box'>
      <p className='title'>
        🔧
        <label htmlFor='skills'>기술 스택</label>
      </p>
      {inputVisible && (
        <Input
          type='text'
          size='small'
          style={{ width: 78, marginBottom: 16 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
          autoFocus
        />
      )}
      {!inputVisible && (
        <Tag onClick={showInput} className='site-tag-plus' style={{ height: 24, marginBottom: 16 }}>
          <PlusOutlined /> New Tag
        </Tag>
      )}
      <div style={{ height: 22 }}>
        <TweenOneGroup
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
            onComplete: e => {
              e.target.style = '';
            },
          }}
          leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
          appear={false}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
    </div>
  );
};

export default TagForm;
