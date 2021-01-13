import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FindInput from '../../components/home/FindInput';
import { changeFindInputValue, changeMode, getJobFindAsync, getJobListAsync, getTagListAsync } from '../../modules/jobs';

const FindInputContainer = () => {
  const inputValue = useSelector(state => state.jobs.findInputValue);
  const dispatch = useDispatch();

  const onChange = e => {
    if (e.target.value === '') {
      dispatch(changeMode('all'));
      dispatch(changeFindInputValue(e.target.value));
      dispatch(getJobListAsync());
      dispatch(getTagListAsync());
    } else {
      dispatch(changeMode('find'));
      dispatch(changeFindInputValue(e.target.value));
      dispatch(getJobFindAsync());
    }
  };

  return <FindInput inputValue={inputValue} onChange={onChange} />;
};

export default FindInputContainer;
