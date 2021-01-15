import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

require('dotenv').config();

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 16px 16px -1px rgba(8, 11, 14, 0.1);
  background: #fff;
  transition: 0.5s;
  cursor: pointer;

  :hover {
    transform: scale(1.05);
    z-index: 1;
  }

  > .logo {
    margin-top: 30px;
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

  > .company-name {
    margin-top: 25px;
    font-family: 'jua';
    font-size: 22px;
  }

  > .company-description {
    margin-top: 5px;
    font-size: 15px;
    color: #a7aab0;
  }

  > .company-tags {
    padding-top: 15px;
    width: 200px;
    height: 99px;
    text-align: center;
    line-height: 1.8;
    overflow: hidden;

    > span {
      margin: 0 4px;
      font-size: 16px;
    }
  }

  > .like-cnt {
    position: absolute;
    top: 15px;
    left: 15px;

    > span {
      margin-left: 3px;
    }
  }
`;

const JobCard = ({ job, tags, onClickCard }) => {
  return (
    <CardWrapper onClick={onClickCard(job.id)}>
      <div className='logo'>
        {job.imgPath && <img src={`${process.env.REACT_APP_SERVER_URL}/img/${job.imgPath}`} alt={`${job.companyName} 로고`} />}
        {!job.imgPath && <img src={`${process.env.REACT_APP_SERVER_URL}/img/noImage.png`} alt='로고 이미지 없음' />}
      </div>
      <p className='company-name'>{job.companyName}</p>
      <p className='company-description'>
        {job.exprerienceLevel === 1 && '신입'}
        {job.exprerienceLevel === 2 && '경력'}
        {job.exprerienceLevel === 3 && '경력 무관'}
      </p>
      <p className='company-description'>{job.deadline === '상시' ? '상시 모집' : `${job.deadline}까지`}</p>
      <div className='company-tags'>
        {tags.map((tag, i) => (
          <Tag color='blue' key={tag + i}>
            {tag}
          </Tag>
        ))}
      </div>
      <div className='like-cnt'>
        <HeartTwoTone twoToneColor='#eb2f96' />
        <span>{job.cntLike}</span>
      </div>
    </CardWrapper>
  );
};

export default JobCard;
