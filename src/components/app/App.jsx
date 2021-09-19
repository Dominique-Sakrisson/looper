/* eslint-disable max-len */
import React, { useState } from 'react';

import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Header from './header/Header';
import HomePage from '../../containers/Homepage/Homepage.jsx';
import TrackListPage  from '../../containers/TrackListPage/TrackListPage';
import RecordTrackPage from '../../containers/RecordTrackPage/RecordTrackPage';
import UserSignUpPage from '../../containers/UserSignUpPage/UserSignUp';
// import ChallengeTrackPage from '../../containers/ChallengeTrackPage/ChallengeTrackPage';
import Footer from './footer/Footer';

export default function App() {

  return <>
    <Router>
      <Header />
    
      <Switch>
        <Route exact path="/"  
          component={HomePage} />
        <Route exact path="/tracks"  
          component={TrackListPage} 
        />
        <Route exact path="/record"  
          component={RecordTrackPage} 
        />
        <Route exact path="/signUp"  
          component={() => <UserSignUpPage/>} 
        />
        {/* <Route exact path="/challenge"  
          component={ChallengeTrackPage} 
        /> */}
      </Switch>
    </Router>
    
    <Footer />
  </>;
}
