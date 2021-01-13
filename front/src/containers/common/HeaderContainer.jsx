import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../modules/user';
import Header from '../../components/common/Header';

const HeaderContainer = ({ history }) => {
  const loginState = useSelector(state => state.user.login);
  const dispatch = useDispatch();

  const onMoveToLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  const onLogoutSucess = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem('FESITE_TOKEN');
    onMoveToLogin();
  }, [dispatch, onMoveToLogin]);

  return <Header loginState={loginState} onMoveToLogin={onMoveToLogin} onLogoutSucess={onLogoutSucess} />;
};

export default memo(withRouter(HeaderContainer));
