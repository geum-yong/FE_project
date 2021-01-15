import React, { memo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import JobFormList from '../../components/jobForm/JobFormList';
import { changeImage, changePreviewURL, changeInputValue, changeDate, changecheck, postJob } from '../../modules/jobFormData';

const JobFormDataContainer = ({ history }) => {
  const userToken = useSelector(state => state.user.token);
  const imageInput = useRef();
  const newJobId = useSelector(state => state.jobFormData.newJobId);
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
  const source = useSelector(state => state.jobFormData.jobData.source);
  const checked = useSelector(state => state.jobFormData.jobData.checked);
  const dispatch = useDispatch();

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

      if (e.target.files[0].size > 2000) {
        Modal.error({
          title: '파일 크기 제한',
          content: '2000byte 이하의 이미지만 업로드 가능합니다.',
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
    dispatch(changecheck(e.target.checked));
  };

  const onSubmit = async () => {
    if (userToken !== localStorage.getItem('FESITE_TOKEN')) {
      Modal.error({
        title: '잘못된 유저 정보',
        content: '잘못된 유저 정보를 갖고 있습니다. 관리자에게 문의해주세요.',
      });
      return;
    }

    if (
      !imageFile ||
      !companyName.trim() ||
      !introduce.trim() ||
      !task.trim() ||
      !condition.trim() ||
      !preferentialTreatment.trim() ||
      !skills.length ||
      !welfare.trim() ||
      (selectedDate === 2 && !deadline) ||
      !address1.trim() ||
      !source.trim() ||
      !checked
    ) {
      Modal.error({
        title: '양식 오류',
        content: '(선택)을 제외한 양식은 작성해야됩니다.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('img', imageFile);
    dispatch(postJob(formData));

    console.log('작동');
    history.push(`/job/${newJobId}`);
  };

  return (
    <JobFormList
      imageInput={imageInput}
      imageFile={imageFile}
      previewURL={previewURL}
      selectedDate={selectedDate}
      experienceLevel={experienceLevel}
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
