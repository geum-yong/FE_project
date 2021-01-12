import React from 'react';
import Footer from '../components/Footer';
import Introduce from '../components/Introduce';
import AppContainer from '../containers/AppContainer';
import FindInputContainer from '../containers/FindInputContainer';
import HeaderContainer from '../containers/HeaderContainer';
import JobListContainer from '../containers/JobListContainer';
import TagListContainer from '../containers/TagListContainer';

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
