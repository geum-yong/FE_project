import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 15px;
  background: red;

  @media (min-width: 992px) {
    padding: 0;
  }
`;

const AppWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default AppWrapper;
