import React from 'react';
import dotenv from 'dotenv';
import { GoogleLogout } from 'react-google-login';
import styled from 'styled-components';
import { Menu, Dropdown, Button } from 'antd';
import { HeartTwoTone, LoginOutlined, MenuOutlined, LogoutOutlined } from '@ant-design/icons';

dotenv.config();

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

const Header = ({ loginState, onMoveToLogin, onLogoutSucess }) => {
  const menu = (
    <Menu>
      {loginState && (
        <>
          <Menu.Item key='0'>
            <Button icon={<HeartTwoTone twoToneColor='#eb2f96' />} onClick={onMoveToLogin}>
              관심회사
            </Button>
          </Menu.Item>
          <Menu.Item key='1'>
            <GoogleLogout
              clientId={process.env.REACT_APP_GOOGLE_ID}
              onLogoutSuccess={onLogoutSucess}
              render={renderProps => (
                <Button icon={<LogoutOutlined />} onClick={renderProps.onClick} disabled={renderProps.disabled}>
                  로그아웃
                </Button>
              )}
            />
          </Menu.Item>
        </>
      )}

      {!loginState && (
        <Menu.Item key='1'>
          <Button icon={<LoginOutlined />} onClick={onMoveToLogin}>
            로그인
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Wrapper>
      <h1>
        <a href='/'>
          프론트엔드 개발자
          <br />
          취업 소식
        </a>
      </h1>
      <Dropdown overlay={menu} trigger={['click']} placement='bottomCenter'>
        <a href='/' className='ant-dropdown-link' onClick={e => e.preventDefault()}>
          <MenuOutlined />
        </a>
      </Dropdown>
      {loginState && <Button icon={<HeartTwoTone twoToneColor='#eb2f96' />}>관심회사</Button>}
      {loginState ? (
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_ID}
          onLogoutSuccess={onLogoutSucess}
          render={renderProps => (
            <Button icon={<LogoutOutlined />} onClick={renderProps.onClick} disabled={renderProps.disabled}>
              로그아웃
            </Button>
          )}
        />
      ) : (
        <Button icon={<LoginOutlined />} onClick={onMoveToLogin}>
          로그인
        </Button>
      )}
    </Wrapper>
  );
};

export default Header;
