import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';



// screens 
import LandingPage from './screens/LandingPage';
import Ranks from './screens/Ranks';
import Events from './screens/Events';

// player side
import Watch from './playerSide/Watch';
import Suggestion from './playerSide/Suggestion';
import ProfileWall from './playerSide/ProfileWall';


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/ranks" exact={true} component={Ranks} />
      <Route path="/events" exact={true} component={Events} />
      <Route path="/watch" exact={true} component={Watch} />
      <Route path="/suggestion" exact={true} component={Suggestion} />
      <Route path="/profileWall" exact={true} component={ProfileWall}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
