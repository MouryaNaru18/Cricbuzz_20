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
import PlayerProf from './components/PlayerProf';
import Venues from './components/Venues';
import VenueStats from './components/VenueStats';
import Pointstable from './components/PointsTable';
import ScoreCard from './components/ScoreCard';
import ScoreChart from './components/ScoreChart';
import Summary from './components/Summary';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Router>
        <div className="container">
        <Routes>
          <Route exact path="/matches" element = {<Matches />} />
          <Route exact path="/players/:id" element = {<PlayerProf/>} />
          <Route exact path="/venues" element = {<Venues/>} />
          <Route exact path="/venues/:id" element = {<VenueStats/>} />
          <Route exact path="/pointstable/:season_year" element = {<Pointstable/>} />
          <Route path={`/scorechart/:id`} element = {<ScoreChart/>} />
          <Route path={`/scorecard/:id`} element = {<ScoreCard/>} />
          <Route path={`/summary/:id`} element = {<Summary/>} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
