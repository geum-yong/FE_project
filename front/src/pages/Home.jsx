import React from 'react';
import FindInput from '../components/FindInput';
import Footer from '../components/Footer';
import Introduce from '../components/Introduce';
import TagList from '../components/TagList';
import AppContainer from '../containers/AppContainer';
import HeaderContainer from '../containers/HeaderContainer';
import JobListContainer from '../containers/JobListContainer';

const Home = () => {
  return (
    <AppContainer>
      <HeaderContainer />
      <Introduce />
      <FindInput />
      <TagList />
      <JobListContainer />
      <Footer />
    </AppContainer>
  );
};

export default Home;
