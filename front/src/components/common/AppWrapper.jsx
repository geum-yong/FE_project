import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  min-height: 100vh;

  @media (min-width: 992px) {
    margin: 0 auto;
    padding: 0;
    width: 962px;
  }
`;

const AppWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default AppWrapper;
