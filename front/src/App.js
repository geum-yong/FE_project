import React from 'react';
import { Route } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';

import Home from './pages/Home';
import Job from './pages/Job';
import JobForm from './pages/JobForm';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Route path='/' component={Home} exact />
      <Route path='/job/:id' component={Job} exact />
      <Route path='/jobForm' component={JobForm} />
      <Route path='/login' component={Login} />
      <GlobalStyles />
    </>
  );
}

export default App;
