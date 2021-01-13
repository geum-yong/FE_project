import React from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginBox from '../../components/login/LoginBox';
import { getUserAsync } from '../../modules/user';

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch();

  const onLoginSuccess = res => {
    dispatch(getUserAsync(res));
    localStorage.setItem('FESITE_TOKEN', res.googleId);
    history.push('/');
  };

  return <LoginBox onLoginSuccess={onLoginSuccess} />;
};

export default withRouter(LoginContainer);
