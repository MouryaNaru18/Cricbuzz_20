import React, { useState, useEffect } from 'react';  
// import { Bar } from 'react-chartjs-2';
// import "./lineChart.css";
import {
    useParams,
  } from "react-router-dom";

function Pointstable(){
    const {season_year} = useParams();
    //TODO must be done by selecting a drop down menu...
    const fetchdata = async (api) => {
        const res = await fetch(api)
        const json = await res.json();
        return json
    }
    const [table, setTable] = useState([]);
    useEffect(() => {
        console.log(season_year);
        const api1 = `http://localhost:5000/pointstable/${season_year}`;
        fetchdata(api1).then(data => {
            setTable(data)
        })
    }, [])
    return(
        <div>
            <div>
            <div class="dropdown mt-3 d-flex justify-content-start">
            <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Season Year
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="/pointstable/2011">2011</a></li>
                <li><a class="dropdown-item" href="/pointstable/2013">2013</a></li>
                <li><a class="dropdown-item" href="/pointstable/2015">2015</a></li>
                <li><a class="dropdown-item" href="/pointstable/2017">2017</a></li>
            </ul>
            </div>
            <main>
            <h2 className='my-4'>{season_year} POINTS TABLE</h2>
                {
                    <table className="table table-striped table-bordered my-4">
                        <thead  className="bg-info">
                            <th>Team name</th>
                            <th>Matches</th>
                            <th>Won</th>
                            <th>Lost</th>
                            <th>Tied</th>
                            <th>NRR</th>
                            <th>Points</th>
                        </thead>
                        <tbody id="myTable">
                            {   
                                table.map((item) => (
                                    <tr>
                                    <td>{item.team_name}</td>
                                    <td>{item.matches}</td> 
                                    <td>{item.win}</td> 
                                    <td>{item.lost} </td> 
                                    <td>0 </td> 
                                    <td>{item.nrr} </td> 
                                    <td>{item.points} </td> 
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                }
            </main>
            </div>
        </div>
    )
}

export default Pointstable;