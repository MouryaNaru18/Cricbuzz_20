import React, { useEffect, useState } from "react";
import { Link, Route, useParams } from "react-router-dom";

function ScoreCard() {
  const { id } = useParams();
  const [teamIds, setTeamIds] = useState({});
  const [venueIds, setVenueIds] = useState({});

  const [Bowling1, setBowling1] = useState([]);
  const [Batting1, setBatting1] = useState([]);
  const [Batting2, setBatting2] = useState([]);
  const [Bowling2, setBowling2] = useState([]);

  const [team2, setTeam2] = useState({});
  const [team1, setTeam1] = useState({});

  const [details, setDetails] = useState({});
  const [umpires, setUmpires] = useState([]);

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
  async function venue() {
    try {
      const res = await fetch("http://localhost:5000/venue", {
        method: "GET",
      });
      const parseRes = await res.json();
      const dic = {};
      for (let i = 0; i < parseRes.length; i++) {
        dic[parseRes[i].venue_id] = parseRes[i];
      }
      setVenueIds(dic);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function bowling1(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/bowling/1`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      setBowling1(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function bowling2(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/bowling/2`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      setBowling2(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function batting1(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/batting/1`,
        {
          method: "GET",
        }
      );

      const parseRes = await res.json();
      setBatting1(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }
  async function batting2(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/batting/2`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      setBatting2(parseRes);
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
      // return todoArray;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function ump(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/matches/${matchId}/umpires`,
        {
          method: "GET",
        }
      );
      const todoArray = await res.json();
      console.log(todoArray);
      setUmpires(todoArray);
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
      // console.log(todoArray)
      setTeam1(todoArray);
    } catch (error) {
      console.log(error, "reached");
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

  useEffect(() => {
    matches(id);
    teams();
    venue();
    bowling1(id);
    bowling2(id);
    batting1(id);
    batting2(id);
    getTeam1(id);
    getTeam2(id);
    ump(id);
  }, [id]);

  // const vid = parseInt(details.venue_id);
  return (
    <div>
      <div>
        <h4 className="mt-3">
          Match: {team1.team_name} v/s {team2.team_name} - {details.season_year}
        </h4>

        <h6>
          Toss: {teamIds[details.toss_winner]} choose to {details.toss_name}
        </h6>
        <h5>
          {teamIds[details.match_winner]} won by {details.win_margin}{" "}
          {details.win_type}
        </h5>
      </div>
      <div className="mt-2, pt-2">
        <h4>
          {" "}
          {team1.team_name} Innings -{" "}
          {parseInt(team1.runs) + parseInt(team1.extras)}/{parseInt(team1.wkts)}
        </h4>
      </div>
      <div className="mt-2">
        <h5>Batting</h5>

        <table className="table table-striped table-bordered my-4">
          <thead className="bg-info bg-gradient">
            <th>Player Name</th>
            <th>Runs</th>
            <th>BF</th>
            <th>4s</th>
            <th>6s</th>
            <th>Strike Rate</th>
          </thead>
          <tbody id="myTable1">
            {Batting1.map((batter) => {
              const name = batter.player_name;
              const id = batter.player_id;
              const runs = batter.runs;
              const balls_faced = batter.balls_faced;
              const fours = batter.fours;
              const sixes = batter.sixes;
              let str = (parseFloat(runs) / parseFloat(balls_faced)) * 100;
              str = str.toFixed(2);
              return (
                <tr>
                  <td>
                    <Link to={`/players/${id}`} className="nav-link">
                      {name}
                    </Link>
                  </td>
                  <td>{runs}</td>
                  <td>{balls_faced}</td>
                  <td>{fours} </td>
                  <td>{sixes} </td>
                  <td>{str} </td>
                </tr>
              );
            })}
            <tr>
                  <td>
                    <b>Extras</b>
                  </td>
                  <td></td>
                  <td></td>
                  <td><b>{team1.extras}</b></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <b>Total</b>
                  </td>
                  <td />
                  <td/>
                  <td><b>{parseInt(team1.runs) + parseInt(team1.extras)}/{parseInt(team1.wkts)}</b></td>
                  <td />
                  <td />
                </tr>
          </tbody>
        </table>
        
          
        <h5>Bowling</h5>

        <table className="table table-striped table-bordered my-4">
          <thead className="bg-info bg-gradient">
            <th>Player Name</th>
            <th>Overs</th>
            <th>Balls</th>
            <th>Runs</th>
            <th>Wkts</th>
            <th>Eco</th>
          </thead>
          <tbody id="myTable2">
            {Bowling1.map((bowler) => {
              const name = bowler.bowler;
              const id = bowler.player_id;
              const runs = bowler.runs_given;
              const balls_bowled = bowler.balls_bowled;
              const wickets = bowler.wickets;
              const overs = bowler.overs_bowled;
              let eco = (parseFloat(runs) / parseFloat(balls_bowled)) * 6;
              eco = eco.toFixed(2);
              return (
                <tr>
                  <td>
                    <Link to={`/players/${id}`} className="nav-link">
                      {name}
                    </Link>
                  </td>
                  <td>{overs}</td>
                  <td>{balls_bowled}</td>
                  <td>{runs}</td>
                  <td>{wickets} </td>
                  <td>{eco} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-2 pt-2">
        <h4>
          {" "}
          {team2.team_name} Innings -{" "}
          {parseInt(team2.runs) + parseInt(team2.extras)}/{parseInt(team2.wkts)}{" "}
        </h4>
      </div>
      <div className="mt-2">
        <h5>Batting</h5>

        <table className="table table-striped table-bordered my-4">
          <thead className="bg-info bg-gradient">
            <th>Player Name</th>
            <th>Runs</th>
            <th>BF</th>
            <th>4s</th>
            <th>6s</th>
            <th>Strike Rate</th>
          </thead>
          <tbody id="myTable3">
            {Batting2.map((batter) => {
              const name = batter.player_name;
              const id = batter.player_id;
              const runs = batter.runs;
              const balls_faced = batter.balls_faced;
              const fours = batter.fours;
              const sixes = batter.sixes;
              let str = (parseFloat(runs) / parseFloat(balls_faced)) * 100;
              str = str.toFixed(2);
              return (
                <tr>
                  <td>
                    <Link to={`/players/${id}`} className="nav-link">
                      {name}
                    </Link>
                  </td>
                  <td>{runs}</td>
                  <td>{balls_faced}</td>
                  <td>{fours} </td>
                  <td>{sixes} </td>
                  <td>{str} </td>
                </tr>
              );
            })}
            
            <tr>
                  <td>
                    <b>Extras</b>
                  </td>
                  <td></td>
                  <td></td>
                  <td><b>{team2.extras}</b></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <b>Total</b>
                  </td>
                  <td />
                  <td/>
                  <td><b>{parseInt(team2.runs) + parseInt(team2.extras)}/{parseInt(team2.wkts)}</b></td>
                  <td />
                  <td />
                </tr>
                
          </tbody>
        </table>
        <h5>Bowling</h5>

        <table className="table table-striped table-bordered my-4">
          <thead className="bg-info bg-gradient">
            <th>Player Name</th>
            <th>Overs</th>
            <th>Balls</th>
            <th>Runs</th>
            <th>Wkts</th>
            <th>Eco</th>
          </thead>
          <tbody id="myTable2">
            {Bowling2.map((bowler) => {
              const name = bowler.bowler;
              const id = bowler.player_id;
              const runs = bowler.runs_given;
              const balls_bowled = bowler.balls_bowled;
              const wickets = bowler.wickets;
              const overs = bowler.overs_bowled;
              let eco = (parseFloat(runs) / parseFloat(balls_bowled)) * 6;
              eco = eco.toFixed(2);
              return (
                <tr>
                  <td>
                    <Link to={`/players/${id}`} className="nav-link">
                      {name}
                    </Link>
                  </td>
                  <td>{overs}</td>
                  <td>{balls_bowled}</td>
                  <td>{runs}</td>
                  <td>{wickets} </td>
                  <td>{eco} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h6>
          Umpires:&nbsp;&nbsp;
          {umpires.map((umpire) => {
            return <span>{umpire.umpire_name}&nbsp;&nbsp;</span>;
          })}
        </h6>
      </div>
            
      <div>
        <h6>
          Venues: {venueIds[details.venue_id] ? (
            <>
              {venueIds[details.venue_id].venue_name},{' '}
              {venueIds[details.venue_id].city_name},{' '}
              {venueIds[details.venue_id].country_name}
            </>
          ) : (
            'Venue details not available'
          )}
        </h6>
      </div>


    </div>
  );
}

export default ScoreCard;
