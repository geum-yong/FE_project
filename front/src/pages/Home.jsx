import React from 'react';
import AppWrapper from '../components/AppWrapper';
import FindInput from '../components/FindInput';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Introduce from '../components/Introduce';
import JobList from '../components/JobList';
import TagList from '../components/TagList';

const Home = () => {
  return (
    <AppWrapper>
      <Header />
      <Introduce />
      <FindInput />
      <TagList />
      <JobList />
      <Footer />
    </AppWrapper>
  );
};

export default Home;
