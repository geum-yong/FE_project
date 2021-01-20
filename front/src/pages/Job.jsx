import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppContainer from '../containers/common/AppContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import JobPostingContainer from '../containers/job/JobPostingContainer';
import Footer from '../components/common/Footer';
import { checkUserAsync } from '../modules/user';

const Job = ({ history }) => {
  const loginState = useSelector(state => state.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!loginState && localStorage.getItem('FESITE_TOKEN')) {
      dispatch(checkUserAsync(localStorage.getItem('FESITE_TOKEN')));
    }

    if (!localStorage.getItem('FESITE_TOKEN')) {
      history.push('/');
    }
  }, [dispatch, history, loginState]);

  return (
    <AppContainer>
      <HeaderContainer />
      <JobPostingContainer />
      <Footer />
    </AppContainer>
  );
};

export default Job;
