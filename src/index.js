import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route , Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';



// screens 
import {LandingPage} from './screens';


ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={LandingPage}/>
        </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
