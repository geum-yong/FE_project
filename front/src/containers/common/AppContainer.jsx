import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { checkUserAsync } from '../../modules/user';
import AppWrapper from '../../components/common/AppWrapper';

const AppContainer = ({ children, match, history }) => {
  const loginState = useSelector(state => state.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (match.path === '/login' && localStorage.getItem('FESITE_TOKEN')) {
      history.push('/');
    } else if (!loginState && localStorage.getItem('FESITE_TOKEN')) {
      dispatch(checkUserAsync(localStorage.getItem('FESITE_TOKEN')));
    }
  }, [loginState, dispatch, history, match.path]);

  return <AppWrapper>{children}</AppWrapper>;
};

export default withRouter(AppContainer);
