import React, { memo, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import JobList from '../../../components/home/jobList/JobList';
import { closeModal, getJobListAsync, getJobMoreAsync, upRollingCount } from '../../../modules/jobs';

const JobListContainer = ({ history }) => {
  const rollingCnt = useSelector(state => state.jobs.rollingCnt);
  const jobs = useSelector(state => state.jobs.jobs);
  const mode = useSelector(state => state.jobs.mode);
  const totalJobsCnt = useSelector(state => state.jobs.totalJobCnt);
  const isModalVisible = useSelector(state => state.jobs.isModalVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === 'all' && rollingCnt === 0) {
      dispatch(getJobListAsync());
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
