import React from 'react';
import dotenv from 'dotenv';
import styled from 'styled-components';
import { GoogleLogin } from 'react-google-login';

dotenv.config();

const LoginWrapper = styled.section`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);

  > p:first-of-type {
    margin-bottom: 20px;
    font-family: 'hannaPro';
    font-size: 40px;
  }

  > p:nth-of-type(n + 2) {
    margin-bottom: 5px;
    font-family: 'jua';
    font-size: 16px;
    color: #a7aab0;
  }

  @media (min-width: 768px) {
    > p:first-of-type {
      font-size: 60px;
    }

    > p:nth-of-type(n + 2) {
      font-size: 20px;
    }
  }

  @media (min-width: 992px) {
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 60px;
    border: 1px solid #eee;
    border-radius: 12px;
    box-shadow: 0 0 1px 0 rgba(8, 11, 14, 0.06), 0 16px 16px -1px rgba(8, 11, 14, 0.1);

    > p:first-of-type {
      margin-bottom: 20px;
      font-family: 'hannaPro';
      font-size: 50px;
    }

    > p:nth-of-type(n + 2) {
      margin-bottom: 5px;
      font-family: 'jua';
      font-size: 16px;
      color: #a7aab0;
    }
  }
`;

const GoogleLoginCustom = styled(GoogleLogin)`
  margin: 80px auto 0 !important;
  padding: 4px 10px !important;
  font-size: 16px !important;
  box-shadow: none !important;
  background: #e24939 !important;
  color: #fff !important;

  > div {
    padding-bottom: 6px !important;
    border-radius: 50% !important;
  }
`;

const LoginBox = ({ onLoginSuccess }) => {
  return (
    <LoginWrapper>
      <h1 className='a11y-hidden'>로그인</h1>
      <p>환영합니다.</p>
      <p>안전한 사이트 관리를 위해 로그인이 필요합니다.</p>
      <p>회원님의 어떠한 정보도 유출 혹은 제3자에게 제공되지 않습니다.</p>
      <GoogleLoginCustom
        clientId={process.env.REACT_APP_GOOGLE_ID}
        buttonText='google로 이용하기'
        onSuccess={onLoginSuccess}
        onFailure={'1'}
        cookiePolicy={'single_host_origin'}
      />
    </LoginWrapper>
  );
};

export default LoginBox;
