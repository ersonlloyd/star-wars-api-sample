import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import FilmList from './containers/app/module/films'

const Routes = () => (
  <Router>
    <Switch>
      {/* <Route path="/:id" component={} /> */}
      <Route path="/" component={FilmList} />
    </Switch>
  </Router>
);

export default Routes;
