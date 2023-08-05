import React, { useEffect, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";
import { Pie, Line, Chart } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
  LineController,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend);

function Summary() {
  const { id } = useParams();
  const matchId = id;
  const [teamIds, setTeamIds] = useState({});

  const [summary1, setSummary1] = useState([]);
  const [summary2, setSummary2] = useState([]);

  const [runs1, setRuns1] = useState([]);
  const [runs2, setRuns2] = useState([]);

  const [team2, setTeam2] = useState({});
  const [team1, setTeam1] = useState({});

  const [details, setDetails] = useState({});
  const [playerProf, setPlayerProf] = useState({});

  async function teams() {
    try {
      const res = await fetch("http://localhost:5000/team", {
        method: "GET",
      });
      const parseRes = await res.json();
      // console.log(parseRes);
      const dic = {};
      for (let i = 0; i < parseRes.length; i++) {
        dic[parseRes[i].team_id] = parseRes[i].team_name;
      }
      setTeamIds(dic);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getSummary1(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/summary/1`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      var divArray1 = [];
      for (var i = 0; i < 3; i += 1) {
        divArray1.push(
          <div className="d-flex justify-content-evenly row">
            <div id="left" className="col">
              <div>
                <b>{parseRes[0][i].batter}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                {parseRes[0][i].runs}&nbsp;&nbsp;({parseRes[0][i].balls_faced})
              </div>
            </div>
            <div id="right" className="col">
              <div>
                <b>{parseRes[1][i].bowler}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                {parseRes[1][i].wickets}-{parseRes[1][i].runs_given} ({parseRes[1][i].overs_bowled}.{parseInt(parseRes[1][i].balls_bowled) % 6})
              </div>
            </div>
          </div>
        );
      }

      setSummary1(divArray1);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function getSummary2(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/summary/2`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      var divArray1 = [];
      for (var i = 0; i < 3; i += 1) {
        divArray1.push(
          <div className="d-flex justify-content-evenly row">
            <div id="left" className="col">
              <div>
                <b>{parseRes[0][i].batter}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                {parseRes[0][i].runs}&nbsp;&nbsp;({parseRes[0][i].balls_faced})
              </div>
            </div>
            <div id="right" className="col">
              <div>
                <b>{parseRes[1][i].bowler}</b>&nbsp;&nbsp;&nbsp;&nbsp;
                {parseRes[1][i].wickets}-{parseRes[1][i].runs_given} ({parseRes[1][i].overs_bowled}.{parseInt(parseRes[1][i].balls_bowled) % 6})
              </div>
            </div>
          </div>
        );
      }

      setSummary2(divArray1);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function matches(matchId) {
    try {
      const res = await fetch(`http://localhost:5000/matches/${matchId}`, {
        method: "GET",
      });
      const todoArray = await res.json();
      setDetails(todoArray);

      const res1 = await fetch(
        `http://localhost:5000/players/prof/${todoArray.man_of_match}`,
        {
          method: "GET",
        }
      );
      const parseRes = await res1.json();
      setPlayerProf(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getTeam1(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/team/1`,
        {
          method: "GET",
        }
      );
      const todoArray = await res.json();
      setTeam1(todoArray);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getTeam2(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/team/2`,
        {
          method: "GET",
        }
      );
      const todoArray = await res.json();
      setTeam2(todoArray);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function getRuns1(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/runs/1`,
        {
          method: "GET",
        }
      );
      const todoArray = await res.json();
      const runs = [todoArray.ones, todoArray.twos, todoArray.fours, todoArray.sixes, todoArray.extras]
      setRuns1(runs);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getRuns2(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/runs/2`,
        {
          method: "GET",
        }
      );
      const todoArray = await res.json();
      const runs = [todoArray.ones, todoArray.twos, todoArray.fours, todoArray.sixes, todoArray.extras]
      setRuns2(runs);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    teams();
  }, []);

  useEffect(() => {
    matches(matchId);
  }, [matchId]);
  useEffect(() => {
    getSummary1(matchId);
  }, [matchId]);
  useEffect(() => {
    getSummary2(matchId);
  }, [matchId]);

  useEffect(() => {
    getTeam1(matchId);
  }, [matchId]);
  useEffect(() => {
    getTeam2(matchId);
  }, [matchId]);
  useEffect(() => {
    getRuns1(matchId);
  }, [matchId]);
  useEffect(() => {
    getRuns2(matchId);
  }, [matchId]);


  const data1 = {
    labels: ["ones", "twos", "fours", "sixes", "extras"],
    datasets: [{
      label: 'Runs',
      data: runs1,
      backgroundColor: [
        'rgba(75,192,192,0.6)',
        'rgba(255,99,132,0.6)',
        'rgba(255,206,86,0.6)',
        'rgba(200,200,200,0.6)',
        'rgba(100,100,100,0.6)',
      ],
      hoverBackgroundColor: [
        'rgba(75,192,192,0.8)',
        'rgba(255,99,132,0.8)',
        'rgba(255,206,86,0.8)',
        'rgba(200,200,200,0.8)',
        'rgba(100,100,100,0.8)',
      ]
    }]
  }
  const data2 = {
    labels: ["ones", "twos", "fours", "sixes", "extras"],
    datasets: [{
      label: 'Runs',
      data: runs2,
      backgroundColor: [
        'rgba(75,192,192,0.6)',
        'rgba(255,99,132,0.6)',
        'rgba(255,206,86,0.6)',
        'rgba(200,200,200,0.6)',
        'rgba(100,100,100,0.6)',
      ],
      hoverBackgroundColor: [
        'rgba(75,192,192,0.8)',
        'rgba(255,99,132,0.8)',
        'rgba(255,206,86,0.8)',
        'rgba(200,200,200,0.8)',
        'rgba(100,100,100,0.8)',
      ]
    }]
  }

  return (
    <div>
      <div className='mt-3 pt-3'>
        <ul class="nav justify-content-center">

          <li class="nav-item">
            <Link to={`/matches`} className="nav-link">Matches</Link>
          </li>
          <li class="nav-item">
            <Link to={`/scorechart/${id}`} className="nav-link">ScoreChart</Link>
          </li>
          <li class="nav-item">

            <Link to={`/scorecard/${id}`} className="nav-link">ScoreCard</Link>

          </li>
          <li class="nav-item">
            <Link to={`/summary/${id}`} className="nav-link">Summary</Link>

          </li>
        </ul>
      </div>
      <div className="card mt-3">
        <div className="card-header">
          <h4 className="">
            Match: {team1.team_name} v/s {team2.team_name} - {details.season_year}
          </h4>
          <h6>{teamIds[details.match_winner]} won by {details.win_margin}{" "}
            {details.win_type}</h6>
          <h6 className="">
            Player of the Match - {playerProf.player_name}
          </h6>
        </div>

        <div className="card-body">
          <h6 className="card-header"> {team1.team_name} Innings - {parseInt(team1.runs) + parseInt(team1.extras)}/{parseInt(team1.wkts)}</h6>
          <div className="col">
            {summary1}
          </div>
        </div>
        <div className="card-body">
          <h6 className="card-header"> {team2.team_name} Innings - {parseInt(team2.runs) + parseInt(team2.extras)}/{parseInt(team2.wkts)}</h6>
          <div className="col">
            {summary2}
          </div>
        </div>
      </div>
      <div className="mt-3 d-flex justify-content-evenly">
        <div>
          <h6>{team1.team_name} Innings</h6>
          <Pie
            data={data1}
            options={{
              responsive: true,  // This will make the pie chart responsive to the container size
              // maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Win, Loss, Draw',
                fontSize: 25
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>
        <div>
          <h6>{team2.team_name} Innings</h6>
          <Pie
            data={data2}
            options={{
              responsive: true,  // This will make the pie chart responsive to the container size
              // maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Win, Loss, Draw',
                fontSize: 25
              },
              legend: {
                display: true,
                position: 'right'
              }
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default Summary;
