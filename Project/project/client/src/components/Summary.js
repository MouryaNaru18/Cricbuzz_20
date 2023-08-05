import React, { useEffect, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";

function Summary() {
  const { id } = useParams();
  const matchId = id;
  const [teamIds, setTeamIds] = useState({});

  const [summary1, setSummary1] = useState([]);
  const [summary2, setSummary2] = useState([]);

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
  
  // async function player_prof(id) {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/players/prof/${id}`,
  //       {
  //         method: "GET",
  //       }
  //     );
  //     const parseRes = await res.json();
  //     setPlayerProf(parseRes);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // }
  
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

  // const vid = parseInt(details.venue_id);
  // Good Idea
  // console.log(summary1);
  return (
    <div>
      <div>
        <h4 className="mt-3">
          Match: {team1.team_name} v/s {team2.team_name} - {details.season_year}
        </h4>

        <h6 className="mt-3">
          {teamIds[details.match_winner]} won by {details.win_margin}{" "}
          {details.win_type}
        </h6>
        
        <h6 className="mt-3">
          Player of the Match - {playerProf.player_name}
        </h6>
      </div>
      <div className="mt-3">
        <h6> {team1.team_name} Innings - {parseInt(team1.runs) + parseInt(team1.extras)}/{parseInt(team1.wkts)}</h6>
      </div>
      <div className="mt-3 pt-3 d-flex">
        <div className="col my-3">
          {summary1}
        </div>
      </div>
      <div>
        <div className="mt-3">
          <h6> {team2.team_name} Innings - {parseInt(team2.runs) + parseInt(team2.extras)}/{parseInt(team2.wkts)}</h6>
        </div>
        <div className="col my-3">
          {summary2}
        </div>
        
        {/* <div>
          <h6>
            Venue: {venueIds[vid].venue_name}, {venueIds[vid].city_name},{" "}
            {venueIds[vid].country_name}
          </h6>
          <h6>
            Toss: {teamIds[details.toss_winner]} choose to {details.toss_name}
          </h6>
        </div> */}
      </div>
    </div>
  );
}

export default Summary;
