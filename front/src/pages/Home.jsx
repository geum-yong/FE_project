import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Introduce from '../components/home/Introduce';
import AppContainer from '../containers/common/AppContainer';
import FindInputContainer from '../containers/home/FindInputContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import JobListContainer from '../containers/home/jobList/JobListContainer';
import TagListContainer from '../containers/home/TagListContainer';
import PostJobBtnContainer from '../containers/home/PostJobBtnContainer';
import Footer from '../components/common/Footer';
import { checkUserAsync } from '../modules/user';

const Home = () => {
  const loginState = useSelector(state => state.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loginState && localStorage.getItem('FESITE_TOKEN')) {
      dispatch(checkUserAsync(localStorage.getItem('FESITE_TOKEN')));
    }
  }, [dispatch, loginState]);

  return (
    <AppContainer>
      <HeaderContainer />
      <Introduce />
      <FindInputContainer />
      <TagListContainer />
      <JobListContainer />
      <PostJobBtnContainer />
      <Footer />
    </AppContainer>
  );
};

export default Home;
