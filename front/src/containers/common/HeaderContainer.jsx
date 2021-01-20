import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../modules/user';
import Header from '../../components/common/Header';
import { changeFindInputValue, changeMode, getJobLikeListAsync, getJobListAsync, getTagListAsync } from '../../modules/jobs';

const HeaderContainer = ({ history, match }) => {
  const loginState = useSelector(state => state.user.login);
  const mode = useSelector(state => state.jobs.mode);
  const dispatch = useDispatch();
  const { path } = match;

  const onMoveToLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  const onLogoutSucess = useCallback(() => {
    dispatch(logout());
    localStorage.removeItem('FESITE_TOKEN');
    onMoveToLogin();
  }, [dispatch, onMoveToLogin]);

  const onClickLikeBtn = useCallback(() => {
    window.scrollTo(0, 0);
    dispatch(changeMode('like'));
    dispatch(getJobLikeListAsync());
  }, [dispatch]);

  const onClickAllBtn = useCallback(() => {
    window.scrollTo(0, 0);
    dispatch(changeMode('all'));
    dispatch(getJobListAsync());
    dispatch(getTagListAsync());
    dispatch(changeFindInputValue(''));
  }, [dispatch]);

  return (
    <Header
      path={path}
      loginState={loginState}
      mode={mode}
      onMoveToLogin={onMoveToLogin}
      onLogoutSucess={onLogoutSucess}
      onClickLikeBtn={onClickLikeBtn}
      onClickAllBtn={onClickAllBtn}
    />
  );
};

export default memo(withRouter(HeaderContainer));
