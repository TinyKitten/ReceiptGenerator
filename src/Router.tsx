import { createBrowserHistory } from 'history';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import HomeScreen from './screens/Home';
import NoMatchScreen from './screens/NoMatch';

const history = createBrowserHistory();

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" component={HomeScreen} />
      <Route component={NoMatchScreen} />
    </Switch>
  </Router>
);

export default Routes;
