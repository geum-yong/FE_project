import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;

const FindSection = styled.section`
  padding-top: 15px;

  @media (min-width: 768px) {
    text-align: center;

    > span {
      width: 500px;
    }
  }
`;

const FindInput = ({ onSearch }) => {
  return (
    <FindSection>
      <h2 className='a11y-hidden'>검색창</h2>
      <Search placeholder='회사명을 검색해보세요.' size='large' onSearch={onSearch} enterButton />
    </FindSection>
  );
};

export default FindInput;
