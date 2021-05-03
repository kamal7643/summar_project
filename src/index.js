import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';



// screens 
import LandingPage from './screens/LandingPage';
import Ranks from './screens/Ranks';
import Events from './screens/Events';


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/ranks" exact={true} component={Ranks} />
      <Route path="/events" exact={true} component={Events} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
