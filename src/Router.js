import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import FilmList from './containers/app/module/films'
import FilmDetails from './containers/app/module/film_details'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/:slug" component={FilmDetails} />
      <Route path="/" component={FilmList} />
    </Switch>
  </Router>
);

export default Routes;
