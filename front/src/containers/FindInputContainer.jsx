import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import FindInput from '../components/FindInput';
import { changeMode, getJobFindAsync } from '../modules/job';

const FindInputContainer = () => {
  const dispatch = useDispatch();
  const input = useRef();

  const onSearch = companyName => {
    if (!companyName.trim()) return;

    dispatch(changeMode('find'));
    dispatch(getJobFindAsync(companyName));
  };

  return <FindInput onSearch={onSearch} input={input} />;
};

export default FindInputContainer;
