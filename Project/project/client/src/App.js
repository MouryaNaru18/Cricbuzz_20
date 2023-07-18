// import logo from './logo.svg';
import React, {useEffect, useState} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import './App.css';
import Matches from './components/Matches';
import MatchCentre from './components/MatchCentre';
import PlayerProf from './components/PlayerProf';
import Venues from './components/Venues';
import VenueStats from './components/VenueStats';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
        <Routes>
          <Route path="/matches" element = {<Matches />} />
          <Route path="/matches/:id" element = {<MatchCentre/>} />
          <Route path="/players/:id" element = {<PlayerProf/>} />
          <Route path="/venues" element = {<Venues/>} />
          <Route path="/venues/:id" element = {<VenueStats/>} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
