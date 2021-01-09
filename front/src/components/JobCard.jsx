/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 16px 16px -1px rgba(8, 11, 14, 0.1);

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
    text-align: center;
    line-height: 1.8;

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

const JobCard = () => {
  return (
    <CardWrapper>
      <div className='logo'>
        <img src={'http://localhost:3050/img/naver.png'} alt='네이버 로고' />
      </div>
      <p className='company-name'>NAVER</p>
      <p className='company-description'>신입</p>
      <p className='company-description'>2021년 01월 31일까지</p>
      <div className='company-tags'>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>blue</Tag>
        <Tag color='blue'>오잉</Tag>
      </div>
      <div className='like-cnt'>
        <HeartTwoTone twoToneColor='#eb2f96' />
        <span>12</span>
      </div>
    </CardWrapper>
  );
};

export default JobCard;
