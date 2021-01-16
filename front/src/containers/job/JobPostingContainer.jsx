import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import JobPosting from '../../components/job/JobPosting';
import { getJob, putComment, putLikeJob, putUnlikeJob } from '../../modules/jobFormData';

const JobPostingContainer = ({ match }) => {
  const imgPath = useSelector(state => state.jobFormData.jobData.imgPath);
  const companyName = useSelector(state => state.jobFormData.jobData.companyName);
  const experienceLevel = useSelector(state => state.jobFormData.jobData.experienceLevel);
  const likeCnt = useSelector(state => state.jobFormData.jobData.likeCnt);
  const introduce = useSelector(state => state.jobFormData.jobData.introduce);
  const task = useSelector(state => state.jobFormData.jobData.task);
  const condition = useSelector(state => state.jobFormData.jobData.condition);
  const preferentialTreatment = useSelector(state => state.jobFormData.jobData.preferentialTreatment);
  const skills = useSelector(state => state.jobFormData.jobData.skills);
  const welfare = useSelector(state => state.jobFormData.jobData.welfare);
  const deadline = useSelector(state => state.jobFormData.jobData.deadline);
  const address1 = useSelector(state => state.jobFormData.jobData.address1);
  const address2 = useSelector(state => state.jobFormData.jobData.address2);
  const source = useSelector(state => state.jobFormData.jobData.source);
  const other = useSelector(state => state.jobFormData.jobData.other);
  const liked = useSelector(state => state.jobFormData.liked);
  const comments = useSelector(state => state.jobFormData.jobData.comments);

  const commentInput = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJob({ jobId: match.params.id, userToken: localStorage.getItem('FESITE_TOKEN') }));
  }, [match.params.id, dispatch]);

  const onClickLikeBtn = useCallback(() => {
    if (!liked) {
      dispatch(putLikeJob(match.params.id));
    } else {
      dispatch(putUnlikeJob(match.params.id));
    }
  }, [dispatch, liked, match.params.id]);

  const onClickCommentBtn = useCallback(
    value => {
      if (!value.trim()) return;

      dispatch(putComment({ jobId: match.params.id, comment: value }));
      commentInput.current.state.value = '';
      commentInput.current.onBlur();
    },
    [dispatch, match.params.id]
  );

  return (
    <JobPosting
      imgPath={imgPath}
      companyName={companyName}
      experienceLevel={experienceLevel}
      likeCnt={likeCnt}
      liked={liked}
      introduce={introduce}
      task={task}
      condition={condition}
      preferentialTreatment={preferentialTreatment}
      skills={skills}
      welfare={welfare}
      deadline={deadline}
      address1={address1}
      address2={address2}
      source={source}
      other={other}
      comments={comments}
      commentInput={commentInput}
      onClickLikeBtn={onClickLikeBtn}
      onClickCommentBtn={onClickCommentBtn}
    />
  );
};

export default memo(withRouter(JobPostingContainer));
