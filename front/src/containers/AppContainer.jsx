import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserAsync } from '../modules/user';
import AppWrapper from '../components/AppWrapper';

const AppContainer = ({ children }) => {
  const loginState = useSelector(state => state.user.login);
  const mode = useSelector(state => state.user.mode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginState && localStorage.getItem('FESITE_TOKEN')) {
      dispatch(checkUserAsync(localStorage.getItem('FESITE_TOKEN')));
    }
  }, [loginState, dispatch]);

  return <AppWrapper mode={mode}>{children}</AppWrapper>;
};

export default AppContainer;
