import React from 'react';
import Introduce from '../components/home/Introduce';
import AppContainer from '../containers/common/AppContainer';
import FindInputContainer from '../containers/home/FindInputContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import JobListContainer from '../containers/home/jobList/JobListContainer';
import TagListContainer from '../containers/home/TagListContainer';
import PostJobBtnContainer from '../containers/home/PostJobBtnContainer';
import Footer from '../components/common/Footer';

const Home = () => {
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
