import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './components/GlobalStyles';
import Error404 from './pages/Error404';

import Home from './pages/Home';
import Job from './pages/Job';
import JobForm from './pages/JobForm';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/job/:id' component={Job} exact />
        <Route path='/jobForm' component={JobForm} />
        <Route path='/login' component={Login} />
        <Route component={Error404} />
      </Switch>
      <GlobalStyles />
    </>
  );
}

export default App;
