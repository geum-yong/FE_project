import React from 'react';
import Footer from '../components/home/Footer';
import Introduce from '../components/home/Introduce';
import AppContainer from '../containers/common/AppContainer';
import FindInputContainer from '../containers/home/FindInputContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import JobListContainer from '../containers/home/jobList/JobListContainer';
import TagListContainer from '../containers/home/TagListContainer';
import PostJobBtn from '../components/home/PostJobBtn';

const Home = () => {
  return (
    <AppContainer>
      <HeaderContainer />
      <Introduce />
      <FindInputContainer />
      <TagListContainer />
      <JobListContainer />
      <PostJobBtn />
      <Footer />
    </AppContainer>
  );
};

export default Home;
