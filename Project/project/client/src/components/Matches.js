import React, { useEffect, useState} from 'react'
import { Link, Route } from 'react-router-dom';

function Matches() {
    const [teamIds, setTeamIds] = useState({});
    const [venueIds, setVenueIds] = useState({});
    const [matchL, setMatchL] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    // const _ref = useRef(pageNo);
    
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
    async function venue() {
        try {
            const res = await fetch(
                "http://localhost:5000/venue",
                {
                    method: "GET",
                }
            );
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

    async function matches(pageNo) {
        // console.log(pageNo);
        try {
            const res = await fetch(
                `http://localhost:5000/matches/?skip=${(pageNo-1)*10}&limit=10`,
                {
                    method: "GET",
                }

            );
            const todoArray = await res.json();
            setMatchL(todoArray);
            // return todoArray;
        } catch (error) {
            console.error(error.message);
        }
    }
    
    function increment(pageNo) {
        setPageNo(parseInt(pageNo)+1);
        // console.log(pageNo);
    }
    function decrement(pageNo) {
        setPageNo(Math.max(parseInt(pageNo)-1, 1));
        // console.log(pageNo);
    }
    useEffect(() => { teams() }, []);
    useEffect(() => { venue() }, []);
    useEffect(() => { matches(pageNo) }, [pageNo]);
    // useEffect(() => {increment(pageNo)}, [pageNo]);
    // useEffect(() => {decrement()}, []);
    return (
        <div>
        <div className='mt-5 pt-5'>
            {
                matchL.map((match) => {
                    const team1 = teamIds[match.team1];
                    const team2 = teamIds[match.team2];
                    const wTeam = teamIds[match.match_winner];
                    const wMargin = match.win_margin;
                    const wType = match.win_type;
                    const std = venueIds[match.venue_id].venue_name;
                    const city = venueIds[match.venue_id].city_name;
                    const mId = match.match_id;
                    const year = match.season_year;
                    return (<div className="card pd-5 my-3 mx-5" key={mId}>
                        <h5 className="card-header">{team1} v/s {team2}</h5>
                        <div className="card-body">
                            <p className="card-text">{std}, {city}, {year}</p>
                            <div className='md-4'>
                                <Link to={`/matches/${mId}`} className="btn btn-primary">Match Center</Link>
                            </div>
                        </div>
                            <h6 className="card-footer">{wTeam} won by {wMargin} {wType}</h6>
                    </div>);
                })

            }
        </div>
           <div className='d-flex justify-content-center align-items-center'>
            {/* <button className="btn btn-primary" onClick={() => {increment(pageNo)}}>Next</button> */}
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><button className="page-link" onClick={() => decrement(pageNo)}>Previous</button></li>
                    <li className="page-item"><button className="page-link" onClick={() => increment(pageNo)}>Next</button></li>
                </ul>
            </nav>
            </div>
        </div>
    )
}

export default Matches

