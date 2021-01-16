import React from 'react';
import AppContainer from '../containers/common/AppContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import JobPostingContainer from '../containers/job/JobPostingContainer';
import Footer from '../components/common/Footer';

const Job = () => {
  return (
    <AppContainer>
      <HeaderContainer />
      <JobPostingContainer />
      <Footer />
    </AppContainer>
  );
};

export default Job;
