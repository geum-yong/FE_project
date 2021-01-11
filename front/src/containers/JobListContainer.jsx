import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobList from '../components/JobList';
import { getJobListAsync } from '../modules/job';

const JobListContainer = () => {
  const jobs = useSelector(state => state.job.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJobListAsync());
  }, [dispatch]);

  return <JobList jobs={jobs} />;
};

export default memo(JobListContainer);
