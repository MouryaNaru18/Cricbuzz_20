import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
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

import { Pie, Line, Chart } from 'react-chartjs-2';

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
function VenueStats() {

  const { id } = useParams();
  const [venueStat, setVenueStat] = useState({});
  const [avgScores, setAvgScores] = useState([]);
  const [winStats, setWinState] = useState([]);
  async function venueInfo(id) {
    try {
      const res = await fetch(
        `http://localhost:5000/venue/${id}`,
        {
          method: "GET",
        }
      );
      const parseRes = await res.json();
      setVenueStat(parseRes);
      setWinState([parseRes.bat_1, parseRes.bat_2, parseRes.draw]);
      setAvgScores(parseRes.first_avg_score.map(obj => ({ "x": obj.year.toString(), "y": obj.avg })));
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => { venueInfo(id) }, [id]);
  const data1 = {
    labels: ["First Batting", "Second Batting", "Draw"],
    datasets: [{
      label: 'Wins',
      data: winStats,
      backgroundColor: [
        'rgba(75,192,192,0.6)',
        'rgba(255,99,132,0.6)',
        'rgba(255,206,86,0.6)'
      ],
      hoverBackgroundColor: [
        'rgba(75,192,192,0.8)',
        'rgba(255,99,132,0.8)',
        'rgba(255,206,86,0.8)'
      ]
    }]
  }

  const data2 = {
    labels: ["2011", "2013", "2015", "2017"],
    datasets: [
      {
        label: 'Average Value',
        data: avgScores,
        fill: false,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  }
  const options2 = {
    responsive: true,  // This will make the pie chart responsive to the container size
    maintainAspectRatio: false,
    title: {
      display: true,
      text: 'Win, Loss, Draw',
      fontSize: 25
    },
    legend: {
      display: true,
      position: 'right'
    },
    scales: {
      x:
      {
        type: 'linear',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Year'
        },
        grid: {
          display: false
        },
        ticks: {
          stepSize: 1,
          callback: function(value, index, values) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "");
          }
        }
      },
      y:
      {
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Average'
        },
        grid: {
          display: false
        },
      },
    },
  };

  return (
    <div>
      <h2>{venueStat.venue_name}, {venueStat.city_name}</h2>

      <div className='row d-flex justify-content-evenly'>

        <div className='col-5'>
          <div className='my-3 ms-2 py-2 ps-2 d-flex row'>
            <h4>Venue Information</h4>
          </div>
          <div className='row'>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Address</p>
              <h6 className='px-2 mx-2 col'>{venueStat.city_name}, {venueStat.country_name}</h6>
            </div>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Capacity</p>
              <h6 className='px-2 mx-2 col'>{venueStat.capacity}</h6>
            </div>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Matches</p>
              <h6 className='px-2 mx-2 col'>{venueStat.n_matches}</h6>
            </div>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Highest Total Recorded</p>
              <h6 className='px-2 mx-2 col'>{venueStat.max_score}</h6>
            </div>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Lowest Total Recorded</p>
              <h6 className='px-2 mx-2 col'>{venueStat.min_score}</h6>
            </div>
            <div className='ms-2 py-1 ps-2 d-flex row'>
              <p className='px-2 mx-2 col'>Highest Score Chased</p>
              <h6 className='px-2 mx-2 col'>{venueStat.highest_chase ? venueStat.highest_chase : "-"}</h6>
            </div>
          </div>
        </div>
        <div className='col-7 my-3 ms-2 py-2 ps-2' style={{ width: '350px', height: '350px' }}>
          <h4> Win Percentage</h4>
          <Pie
            data={data1}
            options={{
              responsive: true,  // This will make the pie chart responsive to the container size
              maintainAspectRatio: false,
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
        <h4 className='my-3'>Average First Innings Score</h4>
      <div className=' d-flex justify-content-center my-2 mx-auto align-items-center' style={{ width: '500px', height: '500px' }}>
        <Line data={data2} options={options2} />
      </div>
    </div>
  )
}

export default VenueStats