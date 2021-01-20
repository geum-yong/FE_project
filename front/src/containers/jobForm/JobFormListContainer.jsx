import React, { memo, useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import JobFormList from '../../components/jobForm/JobFormList';
import {
  changeImage,
  changePreviewURL,
  changeInputValue,
  changeDate,
  changeCheck,
  postJob,
  getJob,
  changeModifyMode,
  setJobData,
} from '../../modules/jobFormData';

const JobFormDataContainer = ({ history, match }) => {
  const userToken = useSelector(state => state.user.token);
  const imageInput = useRef();
  const modifyMode = useSelector(state => state.jobFormData.modifyMode);
  const imgPath = useSelector(state => state.jobFormData.jobData.imgPath);
  const imageFile = useSelector(state => state.jobFormData.jobData.img);
  const previewURL = useSelector(state => state.jobFormData.jobData.previewURL);
  const companyName = useSelector(state => state.jobFormData.jobData.companyName);
  const experienceLevel = useSelector(state => state.jobFormData.jobData.experienceLevel);
  const introduce = useSelector(state => state.jobFormData.jobData.introduce);
  const task = useSelector(state => state.jobFormData.jobData.task);
  const condition = useSelector(state => state.jobFormData.jobData.condition);
  const preferentialTreatment = useSelector(state => state.jobFormData.jobData.preferentialTreatment);
  const skills = useSelector(state => state.jobFormData.jobData.skills);
  const welfare = useSelector(state => state.jobFormData.jobData.welfare);
  const deadline = useSelector(state => state.jobFormData.jobData.deadline);
  const selectedDate = useSelector(state => state.jobFormData.jobData.selectedDate);
  const address1 = useSelector(state => state.jobFormData.jobData.address1);
  const address2 = useSelector(state => state.jobFormData.jobData.address2);
  const source = useSelector(state => state.jobFormData.jobData.source);
  const other = useSelector(state => state.jobFormData.jobData.other);
  const checked = useSelector(state => state.jobFormData.jobData.checked);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (match.params.id) {
      dispatch(changeModifyMode(true));
      dispatch(getJob({ jobId: match.params.id, userToken: localStorage.getItem('FESITE_TOKEN') }));
    }

    return () => {
      dispatch(setJobData());
    };
  }, [dispatch, match.params.id]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, []);

  const onChangeImage = useCallback(
    e => {
      if (!e.target.files[0]) {
        dispatch(changeImage(''));
        dispatch(changePreviewURL(''));
        return;
      }

      if (e.target.files[0].size > 2000000000) {
        Modal.error({
          title: '파일 크기 제한',
          content: '2000000000byte 이하의 이미지만 업로드 가능합니다.',
        });
        dispatch(changeImage(''));
        dispatch(changePreviewURL(''));
        e.target.value = '';
        return;
      }

      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onloadend = () => {
        dispatch(changeImage(file));
        dispatch(changePreviewURL(reader.result));
      };
      reader.readAsDataURL(file);
    },
    [dispatch]
  );

  const onChangeInputValue = e => {
    dispatch(changeInputValue(e.target));
  };

  const onChangeDate = (date, dateString) => {
    dispatch(changeDate(dateString));
  };

  const onChangeCheck = e => {
    dispatch(changeCheck(e.target.checked));
  };

  const onSubmit = useCallback(() => {
    if (userToken !== localStorage.getItem('FESITE_TOKEN')) {
      Modal.error({
        title: '잘못된 유저 정보',
        content: '잘못된 유저 정보를 갖고 있습니다. 관리자에게 문의해주세요.',
      });
      return;
    }

    if (!companyName.trim()) {
      Modal.error({
        title: '양식 오류',
        content: '회사명을 입력해주세요.',
      });
      return;
    }

    if (!introduce.trim()) {
      Modal.error({
        title: '양식 오류',
        content: '회사 소개를 입력해주세요.',
      });
      return;
    }

    if (!task.trim()) {
      Modal.error({
        title: '양식 오류',
        content: '담당 업무를 입력해주세요.',
      });
      return;
    }

    if (!condition.trim()) {
      Modal.error({
        title: '양식 오류',
        content: '자격 요건을 입력해주세요.',
      });
      return;
    }

    if (!preferentialTreatment.trim()) {
      Modal.error({
        title: '양식 오류',
        content: '우대 사항을 입력해주세요.',
      });
      return;
    }

    if (!skills.length) {
      Modal.error({
        title: '양식 오류',
        content: '기술 스택을 입력해주세요.',
      });
      return;
    }

    if (!welfare.trim()) {
      Modal.error({
        title: '양식 오류',
        content: '회사 복지를 입력해주세요.',
      });
      return;
    }

    if (selectedDate === 2 && !deadline) {
      Modal.error({
        title: '양식 오류',
        content: '마감일을 선택해주세요.',
      });
      return;
    }

    if (!address1.trim()) {
      Modal.error({
        title: '양식 오류',
        content: '도로명을 입력해주세요.',
      });
      return;
    }

    if (!source.trim()) {
      Modal.error({
        title: '양식 오류',
        content: '공고 출처를 입력해주세요.',
      });
      return;
    }

    if (!modifyMode && !checked) {
      Modal.error({
        title: '양식 오류',
        content: '공지를 확인하고 체크해주세요.',
      });
      return;
    }

    if (imageFile) {
      const formData = new FormData();
      formData.append('img', imageFile);
      dispatch(postJob({ formData, jobId: match.params }));
    } else {
      dispatch(postJob({ jobId: match.params }));
    }

    if (!modifyMode) {
      setTimeout(() => {
        history.push(`/`);
      }, 500);
    } else {
      setTimeout(() => {
        history.push(`/job/${match.params.id}`);
      }, 500);
    }
  }, [
    address1,
    checked,
    companyName,
    condition,
    deadline,
    dispatch,
    history,
    imageFile,
    introduce,
    match.params,
    modifyMode,
    preferentialTreatment,
    selectedDate,
    skills.length,
    source,
    task,
    userToken,
    welfare,
  ]);

  return (
    <JobFormList
      modifyMode={modifyMode}
      imgPath={imgPath}
      companyName={companyName}
      experienceLevel={experienceLevel}
      introduce={introduce}
      task={task}
      condition={condition}
      preferentialTreatment={preferentialTreatment}
      welfare={welfare}
      deadline={deadline}
      address1={address1}
      address2={address2}
      source={source}
      other={other}
      imageInput={imageInput}
      imageFile={imageFile}
      previewURL={previewURL}
      selectedDate={selectedDate}
      onClickImageUpload={onClickImageUpload}
      onChangeImage={onChangeImage}
      onChangeInputValue={onChangeInputValue}
      onChangeDate={onChangeDate}
      onChangeCheck={onChangeCheck}
      onSubmit={onSubmit}
    />
  );
};

export default memo(withRouter(JobFormDataContainer));
