import React from 'react';
import styled from 'styled-components';
import { Tag, Button, Input, Empty } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import MapContainer from '../../containers/common/MapContainer';
import Comment from './Comment';

require('dotenv').config();

const { Search } = Input;

const JobSection = styled.section`
  padding-top: 40px;

  .form-box {
    margin-bottom: 50px;

    &.btn-box {
      padding-bottom: 50px;
      text-align: center;
      border-bottom: 2px solid #c2cbd3;
    }
  }

  .title-box {
    text-align: center;

    .form-logo {
      display: inline-block;
      margin-bottom: 15px;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      object-fit: cover;
      overflow: hidden;

      > img {
        width: 100%;
        height: 100%;
      }
    }

    .company-name {
      margin-bottom: 10px;
      letter-spacing: 1px;
      font-family: 'hannaPro';
      font-weight: 900;
      font-size: 25px;
    }

    .experience {
      margin-bottom: 10px;
      color: #788896;
    }

    .like-btn {
      padding: 5px 15px;
      border: 2px solid #000;
      border-radius: 5px;
      background: #fff;
      font-size: 18px;
      cursor: pointer;
      transition: background 0.3s;

      > span {
        margin-right: 10px;
      }

      &.selected {
        background: #d3455b;
        border: 2px solid #d3455b;
        color: #fff;
      }
    }
  }

  .title {
    margin-bottom: 10px;
    font-family: 'hannaPro';
    font-size: 28px;

    > span {
      margin-left: 10px;
    }
  }

  .description {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 18px;
    line-height: 1.6;
    letter-spacing: 1.1px;

    > a {
      color: #1890ff;
    }

    @media (min-width: 768px) {
      font-size: 22px;
    }
  }

  .comment-list {
    padding: 20px 0;
  }
`;

const JobPosting = ({
  imgPath,
  companyName,
  experienceLevel,
  likeCnt,
  liked,
  introduce,
  task,
  condition,
  preferentialTreatment,
  skills,
  welfare,
  deadline,
  address1,
  address2,
  source,
  other,
  comments,
  commentInput,
  onClickLikeBtn,
  onClickCommentBtn,
}) => {
  return (
    <JobSection>
      <h2 className='a11y-hidden'>공고 상세 설명</h2>

      {/* 회사 로고 */}
      <div className='form-box title-box'>
        <div className='form-logo'>
          {imgPath && <img src={`${process.env.REACT_APP_SERVER_URL}/img/${imgPath}`} alt={`${companyName} 로고`} />}
          {!imgPath && <img src={`${process.env.REACT_APP_SERVER_URL}/img/noImage.png`} alt='로고 없음' />}
        </div>
        <p className='company-name'>{companyName}</p>
        <p className='experience'>
          {experienceLevel === 1 && '신입'}
          {experienceLevel === 2 && '경력'}
          {experienceLevel === 3 && '경력 무관'}
        </p>
        {liked && (
          <button className='like-btn selected' onClick={onClickLikeBtn}>
            <HeartFilled />
            {likeCnt}
          </button>
        )}
        {!liked && (
          <button className='like-btn' onClick={onClickLikeBtn}>
            <HeartOutlined />
            {likeCnt}
          </button>
        )}
      </div>

      {/* 회사 소개 */}
      <div className='form-box'>
        <p className='title'>
          👨‍💻<span>회사 소개</span>
        </p>
        <p className='description'>{introduce}</p>
      </div>

      {/* 담당 업무 */}
      <div className='form-box'>
        <p className='title'>
          📌<span>담당 업무</span>
        </p>
        <p className='description'>{task}</p>
      </div>

      {/* 자격 요건 */}
      <div className='form-box'>
        <p className='title'>
          📜<span>자격 요건</span>
        </p>
        <p className='description'>{condition}</p>
      </div>

      {/* 우대 사항 */}
      <div className='form-box'>
        <p className='title'>
          👍<span>우대 사항</span>
        </p>
        <p className='description'>{preferentialTreatment}</p>
      </div>

      {/* 기술 스택 */}
      <div className='form-box'>
        <p className='title'>
          🔧<span>기술 스택</span>
        </p>
        <div>
          {skills.map((skill, i) => (
            <Tag color='blue' key={skill + i}>
              {skill}
            </Tag>
          ))}
        </div>
      </div>

      {/* 회사 복지 */}
      <div className='form-box'>
        <p className='title'>
          ✨<span>회사 복지</span>
        </p>
        <p className='description'>{welfare}</p>
      </div>

      {/* 마감일 */}
      <div className='form-box'>
        <p className='title'>
          📆<span>마감일</span>
        </p>
        <p className='description'>{deadline === '상시' ? deadline : `${deadline}까지`}</p>
      </div>

      {/* 위치 */}
      <div className='form-box'>
        <p className='title'>
          📍<span>위치</span>
        </p>
        <p className='description'>{address2 ? `${address1}, ${address2}` : address1}</p>
        <MapContainer />
      </div>

      {/* 공고 출처 */}
      <div className='form-box'>
        <p className='title'>
          📎<span>공고 출처</span>
        </p>
        <p className='description'>
          <a href={source} target='_blank' rel='noopener noreferrer'>
            #공고 출처 사이트
          </a>
          로 이동
        </p>
      </div>

      {/* 기타 추가 정보 */}
      <div className='form-box'>
        <p className='title'>
          💡<span>기타 추가 정보</span>
        </p>
        <p className='description'>{other}</p>
      </div>

      <div className='form-box btn-box'>
        <Button type='primary'>수정</Button>
      </div>

      <div className='comments-box'>
        <div className='comment-input-box'>
          <Search placeholder='댓글 작성' allowClear enterButton='작성' size='large' onSearch={onClickCommentBtn} ref={commentInput} />
        </div>
        <div className='comment-list'>
          {comments.length === 0 && <Empty description={<span>첫 번째 댓글을 작성해보세요.</span>} />}
          {!comments.length !== 0 && (
            <>
              {comments.reverse().map(comment => (
                <Comment key={comment._id} comment={comment} />
              ))}
            </>
          )}
        </div>
      </div>
    </JobSection>
  );
};

export default JobPosting;
