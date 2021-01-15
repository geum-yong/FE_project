import React from 'react';
import styled from 'styled-components';
import { Button, Input, Radio, DatePicker, Checkbox, Space } from 'antd';
import TagFormContainer from '../../containers/jobForm/TagFormContainer';
import MapContainer from '../../containers/common/MapContainer';

require('dotenv').config();

const { TextArea } = Input;

const FormSection = styled.section`
  padding-top: 40px;

  .form-box {
    margin-bottom: 50px;
  }

  .title {
    margin-bottom: 10px;
    font-family: 'hannaPro';
    font-size: 23px;

    > span,
    > label {
      margin-left: 10px;
    }
  }

  .form-logo {
    display: inline-block;
    margin-right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
    }
  }

  .logo-upload-btn {
    vertical-align: bottom;
  }

  .data-input {
    margin-bottom: 10px;
  }

  .date-radio {
    display: block;
    height: 30px;
    line-height: 30px;
  }

  .submit-btn-box {
    display: block;
    text-align: center;
  }
`;

const JobFormData = ({
  imageInput,
  imageFile,
  previewURL,
  selectedDate,
  experienceLevel,
  onClickImageUpload,
  onChangeImage,
  onChangeInputValue,
  onChangeDate,
  onChangeCheck,
  onSubmit,
}) => {
  return (
    <FormSection>
      <h2 className='a11y-hidden'>공고 폼</h2>

      {/* 회사 로고 */}
      <div className='form-box'>
        <p className='title'>
          📕<span>회사 로고</span>
        </p>
        <div className='form-logo'>
          <img src={imageFile === '' ? `${process.env.REACT_APP_SERVER_URL}/img/noImage.png` : `${previewURL}`} alt='회사 로고' />
        </div>
        <Space>
          <input type='file' name='imgFile' hidden ref={imageInput} onChange={onChangeImage} accept='.jpg,.png,.jpeg,.gif' />
        </Space>
        <Button type='primary' className='logo-upload-btn' onClick={onClickImageUpload}>
          회사 로고 업로드
        </Button>
      </div>

      {/* 회사명 */}
      <div className='form-box'>
        <p className='title'>
          📗<label htmlFor='companyName'>회사명</label>
        </p>
        <Input id='companyName' name='companyName' placeholder='ex) NAVER' maxLength='10' size='large' allowClear onChange={onChangeInputValue} />
      </div>

      {/* 경력 */}
      <div className='form-box'>
        <p className='title'>
          📘<label htmlFor='experienceLevel'>경력</label>
        </p>
        <Radio.Group id='experienceLevel' name='experienceLevel' onChange={onChangeInputValue} value={experienceLevel}>
          <Radio value={1}>신입</Radio>
          <Radio value={2}>경력</Radio>
          <Radio value={3}>경력 무관</Radio>
        </Radio.Group>
      </div>

      {/* 회사 소개 */}
      <div className='form-box'>
        <p className='title'>
          👨‍💻<label htmlFor='introduce'>회사 소개</label>
        </p>
        <TextArea
          id='introduce'
          name='introduce'
          rows={6}
          size='large'
          placeholder='ex) 네이버 주식회사는 No. 1 검색 포털 네이버 (www.naver.com)를 운영하고 있는 국내 최고의 인터넷 전문 기업입니다'
          onChange={onChangeInputValue}
          allowClear
        />
      </div>

      {/* 담당 업무 */}
      <div className='form-box'>
        <p className='title'>
          📌<label htmlFor='task'>담당 업무</label>
        </p>
        <TextArea
          id='task'
          name='task'
          rows={6}
          size='large'
          placeholder='- 웹 애플리케이션 유지보수를 담당합니다.
          - 데이터베이스 시각화 업무를 담당하게 됩니다.'
          onChange={onChangeInputValue}
          allowClear
        />
      </div>

      {/* 자격 요건 */}
      <div className='form-box'>
        <p className='title'>
          📜<label htmlFor='condition'>자격 요건</label>
        </p>
        <TextArea
          id='condition'
          name='condition'
          rows={6}
          size='large'
          placeholder='- HTML/CSS를 다룰 수 있는 인재
          - ES6 기반의 자바스크립트를 다룰 수 있는 인재'
          onChange={onChangeInputValue}
          allowClear
        />
      </div>

      {/* 우대 사항 */}
      <div className='form-box'>
        <p className='title'>
          👍<label htmlFor='preferentialTreatment'>우대 사항</label>
        </p>
        <TextArea
          id='preferentialTreatment'
          name='preferentialTreatment'
          rows={6}
          size='large'
          placeholder='- Webpack을 다뤄본 경험
          - 1만명 이상의 유저가 있는 사이트를 다뤄본 경험'
          onChange={onChangeInputValue}
          allowClear
        />
      </div>

      {/* 기술 스택 */}
      <TagFormContainer />

      {/* 회사 복지 */}
      <div className='form-box'>
        <p className='title'>
          ✨<label htmlFor='welfare'>회사 복지</label>
        </p>
        <TextArea
          id='welfare'
          name='welfare'
          rows={6}
          size='large'
          placeholder='- 개인 교육비 지원합니다.
          - 최신 맥북을 지원합니다.'
          onChange={onChangeInputValue}
          allowClear
        />
      </div>

      {/* 마감일 */}
      <div className='form-box'>
        <p className='title'>
          📆<label htmlFor='selectedDate'>마감일</label>
        </p>
        <Radio.Group id='selectedDate' name='selectedDate' onChange={onChangeInputValue} value={selectedDate}>
          <Radio className='date-radio' value={1}>
            상시
          </Radio>
          <Radio className='date-radio' value={2}>
            <label htmlFor='deadline' className='a11y-hidden'>
              기한 날짜
            </label>
            <DatePicker id='deadline' name='deadline' onChange={onChangeDate} allowClear />
            까지
          </Radio>
        </Radio.Group>
      </div>

      {/* 위치 */}
      <div className='form-box'>
        <p className='title'>
          📍<label htmlFor='address1'>위치</label>
        </p>
        <Input
          id='address1'
          name='address1'
          className='data-input'
          placeholder='도로명을 입력해주세요'
          size='large'
          onChange={onChangeInputValue}
          allowClear
        />
        <Input
          id='address2'
          name='address2'
          className='data-input'
          placeholder='상세주소를 입력해주세요 (선택)'
          size='large'
          onChange={onChangeInputValue}
          allowClear
        />
        <MapContainer />
      </div>

      {/* 공고 출처 */}
      <div className='form-box'>
        <p className='title'>
          📎<label htmlFor='source'>공고 출처</label>
        </p>
        <Input
          id='source'
          name='source'
          placeholder='ex) https://www.naver.com/'
          maxLength='10'
          size='large'
          onChange={onChangeInputValue}
          allowClear
        />
      </div>

      {/* 기타 추가 정보 */}
      <div className='form-box'>
        <p className='title'>
          💡<label htmlFor='other'>기타 추가 정보</label>
        </p>
        <TextArea
          id='other'
          name='other'
          rows={6}
          size='large'
          placeholder='회사에 대한 추가 정보 혹은 여러분들의 자유로운 의견을 써주세요. (선택)'
          onChange={onChangeInputValue}
          allowClear
        />
      </div>

      {/* 체크박스 */}
      <div className='form-box'>
        <Checkbox onChange={onChangeCheck}>
          욕설 혹은 거짓 정보 등 다른 유저들에게 불쾌함을 줄 수 있는 공고는 관리자에 의해 삭제될 수 있습니다.
        </Checkbox>
      </div>
      <Space className='submit-btn-box'>
        <Button type='primary' onClick={onSubmit}>
          공고 등록
        </Button>
      </Space>
    </FormSection>
  );
};

export default JobFormData;
