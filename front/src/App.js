import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GlobalStyles from './components/common/GlobalStyles';
import NotFound from './pages/NotFound';

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
        <Route path={['/jobForm/:id', '/jobForm']} component={JobForm} />
        <Route path='/login' component={Login} />
        <Route component={NotFound} />
      </Switch>
      <GlobalStyles />
    </>
  );
}

export default App;
