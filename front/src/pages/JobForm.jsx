import React from 'react';
import Footer from '../components/common/Footer';
import AppContainer from '../containers/common/AppContainer';
import HeaderContainer from '../containers/common/HeaderContainer';
import JobFormListContainer from '../containers/jobForm/JobFormListContainer';

const JobForm = () => {
  return (
    <AppContainer>
      <HeaderContainer />
      <JobFormListContainer />
      <Footer />
    </AppContainer>
  );
};

export default JobForm;
