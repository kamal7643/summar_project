import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

// screens 
import {About, LandingPage, Ranks, Participate, Performance, Support, Admin,AdminLogin} from './Screens';
import ExtraLandingPage from './Screens/extralandingpage';


ReactDOM.render(
  <React.StrictMode>
      <Router>
          <Route path="/" component={LandingPage}></Route>
          <Route path="/" exact component={ExtraLandingPage}></Route>
          <Route path="/ranks" exact component={Ranks}></Route>
          <Route path="/participate" exact component={Participate}></Route>
          <Route path="/performance" exact component={Performance}></Route>
          <Route path="/support" exact component={Support}></Route>
          <Route path="/about" exact component={About}></Route>
          <Route path="/admin" exact component={Admin}></Route>
          <Route path="/admin-login" exact component={AdminLogin}></Route>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
