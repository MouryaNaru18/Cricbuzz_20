import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
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
} from 'chart.js'
import { Bar, Chart, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PlayerProf() {
  const { id } = useParams();

  const [playerBat, setPlayerBat] = useState({});
  const [playerBowl, setPlayerBowl] = useState({});
  const [playerProf, setPlayerProf] = useState({});

  const [matchIdsBat, setMatchIdsBat] = useState([]);
  const [matchIdsBowl, setMatchIdsBowl] = useState([]);
  const [matchRuns, setMatchRuns] = useState([]);
  const [matchWkts, setMatchWkts] = useState([]);
  const [matchRunTaken, setMatchRunTaken] = useState([]);
  const [backCol, setbackCol] = useState([]);

  function getColor(run) {
    if (run < 20) {
      return 'rgba(255, 99, 132)';
    } else if (run >= 20 && run <= 50) {
      return 'rgba(255, 205, 86)';
    } else if (run > 50) {
      return 'rgba(75, 192, 192)';
    }
  }

  async function player_bat(id) {
    try {
      const res = await fetch(
        `http://localhost:5000/players/bat/${id}`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      setPlayerBat(parseRes);
      setMatchIdsBat(parseRes.match_stats_bat.map(match => match.match_id));
      setMatchRuns(parseRes.match_stats_bat.map(match => parseInt(match.sum)));
      setbackCol(parseRes.match_stats_bat.map(match => getColor(match.sum)));
    } catch (error) {
      console.error(error.message);
    }
  }

  async function player_bowl(id) {
    try {
      const res = await fetch(
        `http://localhost:5000/players/bowl/${id}`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      setPlayerBowl(parseRes);
      setMatchIdsBowl(parseRes.match_stats_bowl.map(match => match.match_id));
      setMatchRunTaken(parseRes.match_stats_bowl.map(match => parseInt(match.runs_scored_sum) + parseInt(match.extra)));
      setMatchWkts(parseRes.match_stats_bowl.map(match => match.outs ? match.outs : 0));

    } catch (error) {
      console.error(error.message);
    }
  }
  async function player_prof(id) {
    try {
      const res = await fetch(
        `http://localhost:5000/players/prof/${id}`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      setPlayerProf(parseRes);
    } catch (error) {
      console.error(error.message);
    }
  }



  useEffect(() => { player_prof(id) }, [id]);
  useEffect(() => { player_bowl(id) }, [id]);
  useEffect(() => { player_bat(id) }, [id]);

  const dateObj = new Date(playerProf.dob);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  const data1 = {
    labels: matchIdsBat,
    datasets: [{
      label: 'Runs',
      data: matchRuns,
      backgroundColor: backCol,
      borderColor: backCol,
      borderWidth: 1
    }]
  }
  const data2 = {
    labels: matchIdsBowl,
    datasets: [{
      type: 'line',
      label: 'Wickets',
      data: matchWkts,
      yAxisID: 'y',
      borderColor: `rgba(255,200,100)`,
      backgroundColor: `rgba(255,200,100)`,
    },{
      type: 'bar',
      label: 'Runs',
      data: matchRunTaken,
      yAxisID: 'y1',
      borderColor:"rgb(120, 80, 0, 0.8)",
      backgroundColor: "rgb(50, 216, 190, 0.3)",
   }],
  }
  
  console.log(data2);
  // console.log(data1);

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "Runs",
          font: {
            size: 10
          },
        },
      },
      x:{
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "Match ID",
          font: {
            size: 10
          },
        },
      }
    },
  };
  
  const options2 = {
    scales: {
      x:{
        grid: {
          display: false
        },
        title: {
          display: true,
          text: "Match ID",
          font: {
            size: 10
          },
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        
        title: {
          display: true,
          text: "Wickets",
          font: {
            size: 10
          },
        },
        grid: {
          display: false
        },
      },
      y1: {
        type: 'linear',
        display: true,
        beginAtZero: true,
        
        position: 'right',
        title: {
          display: true,
          text: "Runs Given",
          font: {
            size: 10
          },
        },
        grid: {
          display: false
        },
      },
    }
  };

  return (
    <div>
      <div>
        <div className='my-3 ms-2 py-3 ps-2 d-flex justify-content-sm-start'>
          <h1>{playerProf.player_name}</h1>
        </div>
      </div>
      <div className='row'>
        <div className='col-4'>
          <div className='my-3 ms-2 py-2 ps-2 d-flex row'>
            <h4>Personal Information</h4>
          </div>
          <div className='row'>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Nationality</p>
              <h6 className='px-2 mx-2 col'>{playerProf.country_name}</h6>
            </div>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>DOB</p>
              <h6 className='px-2 mx-2 col'>{formattedDate}</h6>
            </div>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Batting Style</p>
              <h6 className='px-2 mx-2 col'>{playerProf.batting_hand}</h6>
            </div>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Bowling Style</p>
              <h6 className='px-2 mx-2 col'>{playerProf.bowling_skill}</h6>
            </div>
          </div>
        </div>
        <div className='col-8'>
          <div className='my-1 ms-2 py-1 ps-2 d-flex row'>
            <h4>Batting Stats</h4>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">M</th>
                  <th scope="col">Runs</th>
                  <th scope="col">4s</th>
                  <th scope="col">6s</th>
                  <th scope="col">50</th>
                  <th scope="col">HS</th>
                  <th scope="col">SR</th>
                  <th scope="col">Avg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">IPL</th>
                  <td>{playerBat.n_matches}</td>
                  <td>{playerBat.runs_scored}</td>
                  <td>{isNaN(parseInt(playerBat.runs_4)) ? "-" : playerBat.runs_4}</td>
                  <td>{isNaN(parseInt(playerBat.runs_6)) ? "-" : playerBat.runs_6}</td>
                  <td>{playerBat.n_fifty}</td>
                  <td>{playerBat.hs}</td>
                  <td>{isNaN(parseFloat(playerBat.strike_rate)) ? "-" : parseFloat(parseFloat(playerBat.strike_rate).toFixed(2))}</td>
                  <td>{isNaN(parseFloat(playerBat.bat_avg)) ? "-" : parseFloat(parseFloat(playerBat.bat_avg).toFixed(2))}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='my-1 ms-2 py-1 ps-2 d-flex row'>
            <h4>Bowling Stats</h4>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">M</th>
                  <th scope="col">Balls</th>
                  <th scope="col">Runs</th>
                  <th scope="col">O</th>
                  <th scope="col">Wkts</th>
                  <th scope="col">Econ</th>
                  <th scope="col">5W</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">IPL</th>
                  <td>{playerBowl.n_matches}</td>
                  <td>{playerBowl.balls_bowl}</td>
                  <td>{isNaN(parseInt(playerBowl.runs)) ? "-" : playerBowl.runs}</td>
                  <td>{isNaN(parseInt(playerBowl.overs)) ? "-" : playerBowl.overs}</td>
                  <td>{isNaN(parseInt(playerBowl.wkts)) ? "-" : playerBowl.wkts}</td>
                  <td>{isNaN(parseFloat(playerBowl.eco)) ? "-" : parseFloat(parseFloat(playerBowl.eco).toFixed(2))}</td>
                  <td>{isNaN(parseInt(playerBowl.five_wkts)) ? "-" : playerBowl.five_wkts}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className='row my-5'>
        <div className='col'>
          <h4>Batting Performance</h4>
          <Bar data={data1} options={barOptions} />
        </div>
        <div className='col'>
          <h4>Bowling Performance</h4>
          {/* <Chart> */}
            {/* <Bar data={data2} options={options2} /> */}
            <Line data={data2} options={options2} />
          {/* </Chart> */}
        </div>

      </div>

    </div>

  )
}

export default PlayerProf