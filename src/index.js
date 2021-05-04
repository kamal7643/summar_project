import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';



// screens 
import LandingPage from './screens/LandingPage';
import Ranks from './screens/Ranks';
import NotFound from './screens/NotFound';


// player side
import Watch from './playerSide/Watch';
import Suggestion from './playerSide/Suggestion';
import ProfileWall from './playerSide/ProfileWall';
import Events from './playerSide/Events';


// admin side
import AdminEvents from './adminSide/Event';


ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact={true} component={LandingPage} />
      <Route path="/ranks" exact={true} component={Ranks} />
      <Route path="/events" exact={true} component={Events} />
      <Route path="/watch" exact={true} component={Watch} />
      <Route path="/suggestion" exact={true} component={Suggestion} />
      <Route path="/profileWall" exact={true} component={ProfileWall}/>
    
    
      {
        //godmode
      }
      <Route path="/admin/events" exact={true} component={AdminEvents}/>
      <Route path="/404" exact={true} component={NotFound} />
      </Switch>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
