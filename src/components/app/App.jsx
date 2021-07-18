/* eslint-disable max-len */
import React from 'react';
import {Switch, Route, Link, BrowserRouter as Router} from 'react-router-dom';
import Header from './header/Header'
import TrackListPage  from '../../containers/TrackListPage/TrackListPage';
import RecordTrackPage from '../../containers/RecordTrackPage/RecordTrackPage';

export default function App() {
  return <>
    <Router>
      <Header />
      <Switch>
        <Route exact 
          path="/tracks"  

          component={TrackListPage} 
        />
        <Route exact 
          path="/record"  
          component={RecordTrackPage} 
        />
      </Switch>
    </Router>
  </>;
}
