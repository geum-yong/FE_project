import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  padding: 60px 0 20px;
  text-align: center;

  > address {
    margin-bottom: 5px;

    > a {
      color: #1890ff;
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <address>
        문의: <a href='mailto:geum_yong@kakao.com'>geum_yong@kakao.com</a>
      </address>
      <small>본 사이트는 사업적&nbsp;용도의&nbsp;사이트가 아닙니다.</small>
    </FooterWrapper>
  );
};

export default Footer;
