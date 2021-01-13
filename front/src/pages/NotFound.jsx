import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import AppWrapper from '../components/common/AppWrapper';

const ErrorWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  > em {
    display: inline-block;
    font-size: 90px;
    font-weight: 900;
  }

  > p {
    margin-top: 20px;
    font-size: 20px;

    > a {
      color: #1890ff;
    }
  }

  > button {
    margin-top: 20px;
    padding: 4px 10px;
    font-size: 20px;
  }
`;

const Error404 = () => {
  return (
    <AppWrapper>
      <ErrorWrapper>
        <em>404</em>
        <p>주소 확인 후 다시 이용해주세요.</p>
        <p>
          문의 : <a href='mailto:geum_yong@kakao.com'>geum_yong@kakao.com</a>
        </p>
        <button>
          <Link to='/'>홈 화면으로 이동</Link>
        </button>
      </ErrorWrapper>
    </AppWrapper>
  );
};

export default Error404;
