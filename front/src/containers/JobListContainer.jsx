import React, { memo, useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import JobList from '../components/JobList';
import { closeModal, getJobListAsync } from '../modules/job';

const JobListContainer = ({ history }) => {
  const jobs = useSelector(state => state.job.jobs);
  const isModalVisible = useSelector(state => state.job.isModalVisible);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobListAsync());
  }, [dispatch]);

  const handleOk = useCallback(() => {
    dispatch(closeModal());
    history.push('/login');
  }, [dispatch, history]);

  const handleCancel = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return <JobList jobs={jobs} isModalVisible={isModalVisible} handleOk={handleOk} handleCancel={handleCancel} />;
};

export default memo(withRouter(JobListContainer));
