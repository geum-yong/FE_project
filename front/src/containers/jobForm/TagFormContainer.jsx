import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tag } from 'antd';
import TagForm from '../../components/jobForm/TagForm';
import { changeTagInputValue, changeTags, changeTagVisible } from '../../modules/jobFormData';

const TagFormContainer = () => {
  const inputVisible = useSelector(state => state.jobFormData.skillSetting.inputVisible);
  const inputValue = useSelector(state => state.jobFormData.skillSetting.inputValue);
  let tags = useSelector(state => state.jobFormData.jobData.skills);
  const dispatch = useDispatch();

  const handleClose = removedTag => {
    tags = tags.filter(tag => tag !== removedTag);
    dispatch(changeTags(tags));
  };

  const showInput = () => {
    dispatch(changeTagVisible(true));
  };

  const handleInputChange = e => {
    dispatch(changeTagInputValue(e.target.value));
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    dispatch(changeTags(tags));
    dispatch(changeTagVisible(false));
    dispatch(changeTagInputValue(''));
  };

  const forMap = tag => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          handleClose(tag);
        }}
        color='blue'
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const tagChild = tags.map(forMap);

  return (
    <TagForm
      inputVisible={inputVisible}
      inputValue={inputValue}
      handleClose={handleClose}
      showInput={showInput}
      handleInputChange={handleInputChange}
      handleInputConfirm={handleInputConfirm}
      tagChild={tagChild}
    />
  );
};

export default TagFormContainer;
