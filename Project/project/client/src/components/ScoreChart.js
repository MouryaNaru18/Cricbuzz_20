import React, { Component, useEffect, useRef, useState } from 'react';
import { Link, Route, useParams} from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Chart, Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

// Improvements ---> 
// Take fall of wickets query and increase accuracy of points plotted
// integrate wicket points with normal points 
// Double wicket points stacked 
const ScoreChart = () => {
  const {id} = useParams();
  const matchId = id;
  
  // const chartRef = useRef(null);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [batt1, setBatt1] = useState("");
  const [batt2, setBatt2] = useState("");

  const [wickets1, setWickets1] = useState([]);
  const [wickets2, setWickets2] = useState([]);

  const [teamIds, setTeamIds] = useState({});
  const [matchDesc, setMatchDesc] = useState({});

  async function teams() {
    try {
      const res = await fetch(
        "http://localhost:5000/team",
        {
          method: "GET",
        }
      );
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
      setBatt1(todoArray.team_name);
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
      setBatt2(todoArray.team_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function wickets(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/wickets/${matchId}`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      // console.log(parseRes);
      const tmp1 = [];
      const tmp2 = [];
      for (let i = 0; i < parseRes.length; i++) {
        // console.log(parseRes[i]);
        if (parseRes[i].innings_no === 1) {
          tmp1.push(parseRes[i].over_id);
        }
        else {
          tmp2.push(parseRes[i].over_id);
        }
      }
      setWickets1(tmp1);
      setWickets2(tmp2);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function matches(matchId) {
    try {
        const res = await fetch(
            `http://localhost:5000/matches/${matchId}`,
            {
                method: "GET",
            }

        );
        const todoArray = await res.json();
        setMatchDesc(todoArray);
    } catch (error) {
        console.error(error.message);
    }
}

  async function scores(matchId) {
    try {
      const res = await fetch(
        `http://localhost:5000/scores/${matchId}`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      const tmp1 = [];
      const tmp2 = [];
      for (let i = 0; i < parseRes.length; i++) {
        // console.log(parseRes[i]);
        if (parseRes[i].innings_no === 1) {
          const run = parseInt(parseRes[i].runs);
          const extra = parseInt(parseRes[i].extras);
          tmp1[i % 20] = run + extra;
        }
        else {
          tmp2[i % 20] = parseInt(parseRes[i].runs) + parseInt(parseRes[i].extras);
        }
      }
      for (let i = 1; i < tmp1.length; i++) {
        tmp1[i] += tmp1[i - 1];
      }
      for (let i = 1; i < tmp2.length; i++) {
        tmp2[i] += tmp2[i - 1];
      }
      setTeam1(tmp1);
      setTeam2(tmp2);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => { scores(matchId) }, [matchId]);
  useEffect(() => { wickets(matchId) }, [matchId]);
  useEffect(() => { getTeam1(matchId) }, [matchId]);
  useEffect(() => { getTeam2(matchId) }, [matchId]);
  
  useEffect(() => { teams() }, []);
  

  const overs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const f_wickets1 = [];
  const f_wickets2 = [];
  for (let i = 0; i < wickets1.length; i++) {
    f_wickets1[i] = { x: wickets1[i], y: team1[parseInt(wickets1[i]) - 1] };
  }
  for (let i = 0; i < wickets2.length; i++) {
    f_wickets2[i] = { x: wickets2[i], y: team2[parseInt(wickets2[i]) - 1] };
  }
  useEffect(() => { matches(matchId) }, [matchId]);
  
  
  const data1 = {
    labels: overs,
    datasets: [
      {
        label: batt1,
        data: [0, ...team1],
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        // pointBackgroundColor: f_wickets1.map(() => 'red'), // Customize point background color
        // pointBorderColor: f_wickets1.map(() => 'black'), // Customize point border color
      }
    ],
  };

  const data2 = {
    labels: overs,
    datasets: [
      {
        label: batt2,
        data: [0, ...team2],
        borderColor: 'blue',
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const combinedData = {
    labels: overs,
    datasets: [
    ...data1.datasets,
    {
      // label: 'Additional Points',
      data: f_wickets1,
      pointBackgroundColor: 'white',
      pointBorderColor: 'red',
      pointRadius: 5,
      pointHoverRadius: 5,
      showLine: false,
      borderWidth: 1,
      fill:true,
    },
    ...data2.datasets,
    {
      // label: 'Additional Points',
      data: f_wickets2,
      pointBackgroundColor: 'white',
      pointBorderColor: 'blue',
      pointRadius: 5,
      pointHoverRadius: 5,
      showLine: false,
      borderWidth: 1,
      fill:true,
      
    },
    ],

  };

  const options = {
    title: {
      display: true,
      text: 'Score Chart'
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    legend: {
      display: true,
      position: 'bottom',
    },
    spanGaps: true,
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    },
    scales: {
      x: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Over'
        },
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'OVERS', 
        }
      },
      y: {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Runs'
        },
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'RUNS', 
        }
      }
    }
  };
  
  const wTeam = teamIds[matchDesc.match_winner];
  const wMargin = matchDesc.win_margin;
  const wType = matchDesc.win_type;
  return (
    <div className='mt-3 pt-3'>
      <h4 className='mt-2'>Comparision Chart</h4>
      <Line data={combinedData} options={options} />
      <h3 className="mx-auto my-3">{wTeam} won by {wMargin} {wType}</h3>
      {/* <Line data={data2} /> */}
      

    </div>
  );


};

export default ScoreChart;