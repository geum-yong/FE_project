import React, { memo, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import JobList from '../../../components/home/jobList/JobList';
import {
  closeModal,
  getJobLikeListAsync,
  getJobListAsync,
  getJobMoreAsync,
  upRollingCount,
  changeMode,
  getJobFindAsync,
  getJobTagsAsync,
} from '../../../modules/jobs';

const JobListContainer = ({ history }) => {
  const rollingCnt = useSelector(state => state.jobs.rollingCnt);
  const jobs = useSelector(state => state.jobs.jobs);
  const mode = useSelector(state => state.jobs.mode);
  const totalJobsCnt = useSelector(state => state.jobs.totalJobCnt);
  const isModalVisible = useSelector(state => state.jobs.isModalVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === 'all') {
      changeMode('all');
      dispatch(getJobListAsync());
    }

    if (mode === 'find') {
      changeMode('find');
      dispatch(getJobFindAsync());
    }

    if (mode === 'tag') {
      changeMode('tag');
      dispatch(getJobTagsAsync());
    }

    if (mode === 'like') {
      dispatch(getJobLikeListAsync());
    }
  }, [dispatch, mode, rollingCnt]);

  const handleOk = useCallback(() => {
    dispatch(closeModal());
    history.push('/login');
  }, [dispatch, history]);

  const handleCancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const onClickMoreBtn = useCallback(() => {
    dispatch(upRollingCount());
    dispatch(getJobMoreAsync());
  }, [dispatch]);

  return (
    <JobList
      jobs={jobs}
      totalJobsCnt={totalJobsCnt}
      isModalVisible={isModalVisible}
      handleOk={handleOk}
      handleCancel={handleCancel}
      onClickMoreBtn={onClickMoreBtn}
    />
  );
};

export default memo(withRouter(JobListContainer));
