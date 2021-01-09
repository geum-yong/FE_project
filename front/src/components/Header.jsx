import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import { HeartTwoTone, LoginOutlined, MenuOutlined } from '@ant-design/icons';

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  height: 50px;

  > h1 {
    font-family: 'hannaPro';
    flex-grow: 1;
  }

  > Button {
    display: none;
  }

  @media (min-width: 768px) {
    height: 60px;

    > h1 {
      font-family: 'hannaPro';
      font-size: 20px;
      flex-grow: 1;
    }

    > a {
      display: none;
    }

    > Button {
      display: inline-block;
    }

    > Button + Button {
      margin-left: 10px;
    }
  }
`;

const menu = (
  <Menu>
    <Menu.Item key='0'>
      <a href='http://www.alipay.com/'>
        <HeartTwoTone twoToneColor='#eb2f96' />
        관심회사
      </a>
    </Menu.Item>
    <Menu.Item key='1'>
      <a href='http://www.taobao.com/'>
        <LoginOutlined />
        로그인
      </a>
    </Menu.Item>
  </Menu>
);

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
      <Dropdown overlay={menu} trigger={['click']} placement='bottomCenter'>
        <a href='/' className='ant-dropdown-link' onClick={e => e.preventDefault()}>
          <MenuOutlined />
        </a>
      </Dropdown>
      <Button icon={<HeartTwoTone twoToneColor='#eb2f96' />}>관심회사</Button>
      <Button icon={<LoginOutlined />}>로그인</Button>
    </Wrapper>
  );
};

export default Header;
