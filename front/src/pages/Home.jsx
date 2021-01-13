import React from 'react';
import Footer from '../components/home/Footer';
import Introduce from '../components/home/Introduce';
import AppContainer from '../containers/common/AppContainer';
import FindInputContainer from '../containers/home/FindInputContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import JobListContainer from '../containers/home/jobList/JobListContainer';
import TagListContainer from '../containers/home/TagListContainer';

const Home = () => {
  return (
    <AppContainer>
      <HeaderContainer />
      <Introduce />
      <FindInputContainer />
      <TagListContainer />
      <JobListContainer />
      <Footer />
    </AppContainer>
  );
};

export default Home;
