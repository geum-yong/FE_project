import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginBox from '../components/LoginBox';
import { getUserAsync } from '../modules/user';

const LoginContainer = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('FESITE_TOKEN')) {
      history.push('/');
    }
  }, [history]);

  const onLoginSuccess = async res => {
    try {
      await dispatch(getUserAsync(res));
      localStorage.setItem('FESITE_TOKEN', res.googleId);
      history.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  return <LoginBox onLoginSuccess={onLoginSuccess} />;
};

export default withRouter(LoginContainer);
