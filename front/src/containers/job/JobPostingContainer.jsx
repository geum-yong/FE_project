import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import emailjs from 'emailjs-com';
import { withRouter } from 'react-router-dom';
import JobPosting from '../../components/job/JobPosting';
import { getJob, putComment, putLikeJob, putUnlikeJob, setJobData } from '../../modules/jobFormData';
import { changeDeclarationJobVisible, changeDeleteVisible } from '../../modules/jobModal';
import { changeMode, deleteJobAsync } from '../../modules/jobs';

require('dotenv').config();

const JobPostingContainer = ({ match, history }) => {
  const deleteVisible = useSelector(state => state.jobModal.deleteVisible);
  const declarationJobVisible = useSelector(state => state.jobModal.declarationJobVisible);

  const loginToken = useSelector(state => state.user.token);
  const userToken = useSelector(state => state.jobFormData.jobData.userToken);
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

    return () => {
      dispatch(setJobData());
    };
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

  const onClickModifyBtn = useCallback(() => {
    history.push(`/jobForm/${match.params.id}`);
  }, [history, match.params.id]);

  const onClickDeleteBtn = useCallback(() => {
    dispatch(changeDeleteVisible(true));
  }, [dispatch]);

  const deleteProcess = useCallback(() => {
    dispatch(deleteJobAsync(match.params.id));
    dispatch(changeMode('all'));
    dispatch(changeDeleteVisible(false));
    history.push(`/`);
  }, [dispatch, history, match.params.id]);

  const cancelDelete = useCallback(() => {
    dispatch(changeDeleteVisible(false));
  }, [dispatch]);

  const onClickDeclarationJobBtn = useCallback(() => {
    dispatch(changeDeclarationJobVisible(true));
  }, [dispatch]);

  const declarationJobTitle = useRef();
  const declarationJobId = useRef();
  const declarationJobDescription = useRef();

  const declarationJobProcess = useCallback(async () => {
    const data = {
      title: declarationJobTitle.current.value,
      id: declarationJobId.current.value,
      description: declarationJobDescription.current.value,
      sender: loginToken,
    };

    await emailjs.send(process.env.REACT_APP_EMAIL_ID, process.env.REACT_APP_TEMPLATE_ID, data, process.env.REACT_APP_USER_ID);

    dispatch(changeDeclarationJobVisible(false));
  }, [dispatch, loginToken]);

  const cancelDeclarationJob = useCallback(() => {
    dispatch(changeDeclarationJobVisible(false));
  }, [dispatch]);

  return (
    <JobPosting
      declarationJobTitle={declarationJobTitle}
      declarationJobId={declarationJobId}
      declarationJobDescription={declarationJobDescription}
      declarationJobProcess={declarationJobProcess}
      cancelDeclarationJob={cancelDeclarationJob}
      jobId={match.params.id}
      deleteVisible={deleteVisible}
      deleteProcess={deleteProcess}
      cancelDelete={cancelDelete}
      declarationJobVisible={declarationJobVisible}
      loginToken={loginToken}
      userToken={userToken}
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
      onClickModifyBtn={onClickModifyBtn}
      onClickDeleteBtn={onClickDeleteBtn}
      onClickDeclarationJobBtn={onClickDeclarationJobBtn}
    />
  );
};

export default memo(withRouter(JobPostingContainer));
