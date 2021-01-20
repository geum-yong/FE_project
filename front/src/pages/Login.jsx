import React, { useEffect } from 'react';
import AppContainer from '../containers/common/AppContainer';
import LoginContainer from '../containers/login/LoginContainer';

const Login = ({ history }) => {
  useEffect(() => {
    if (localStorage.getItem('FESITE_TOKEN')) {
      history.push('/');
    }
  }, [history]);

  return (
    <AppContainer>
      <LoginContainer />
    </AppContainer>
  );
};

export default Login;
