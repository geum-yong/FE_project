import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { showModal } from '../modules/job';

const JobCardContainer = ({ job, history }) => {
  const loginState = useSelector(state => state.user.login);
  const dispatch = useDispatch();
  const tags = [];

  const onClickCard = useCallback(
    id => () => {
      if (!loginState) {
        dispatch(showModal());
        return;
      }

      history.push(`/job/${id}`);
    },
    [dispatch, loginState, history]
  );

  job.skills.forEach((skill, i) => {
    if (i > 4) return;

    tags.push(skill);
  });

  return <JobCard job={job} tags={tags} onClickCard={onClickCard} />;
};

export default memo(withRouter(JobCardContainer));
