import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import { LoginOutlined, HeartTwoTone } from '@ant-design/icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  background: blue;

  > h1 {
    font-family: 'hannaPro';
    flex-grow: 1;
  }

  > Button {
    padding: 4px;
  }

  > Button + Button {
    margin-left: 10px;
  }

  @media (min-width: 768px) {
    height: 60px;
    background: brown;

    > h1 {
      font-family: 'hannaPro';
      font-size: 20px;
      flex-grow: 1;
    }

    > Button {
      padding: 4px 14px;
    }
  }

  @media (min-width: 992px) {
    background: yellow;
    margin: 0 auto;
    width: 962px;
  }
`;

// 리덕스 먼저 만들자
const Header = () => {
  return (
    <Wrapper>
      <h1>
        <Link to='/'>
          프론트엔드 개발자
          <br />
          취업 소식
        </Link>
      </h1>
      <Button icon={<HeartTwoTone twoToneColor='#eb2f96' />}>관심회사</Button>
      <Button icon={<LoginOutlined />}>로그인</Button>
    </Wrapper>
  );
};

export default Header;
