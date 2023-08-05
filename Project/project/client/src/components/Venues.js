import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom';

function Venues() {
    const [venueIds, setVenueIds] = useState([]);
    const [inputs, setInputs] = useState({
        venueName: "",
        cityName: "",
        countryName: "",
        capacity: 0,
    });
    const { venueName, cityName, countryName, capacity } = inputs;
    async function venue() {
        try {
            const res = await fetch(
                "http://localhost:5000/venue",
                {
                    method: "GET",
                }
            );
            const parseRes = await res.json();
            setVenueIds(parseRes);
        } catch (error) {
            console.error(error.message);
        }
    }
    const changeHandler = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = { venueName, cityName, countryName, capacity }
            console.log(JSON.stringify(body));
            const response = await fetch(
                "http://localhost:5000/venue",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                }
            );
            const parseRes = await response.json();
            if (parseRes) {
                console.log("Added Successfully!");
            }
            else {
                console.log(parseRes);
            }
            window.location = "/venues";
        }
        catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => { venue() }, []);

    return (
        <div>
            <button type="button" className="btn btn-primary mt-3 pt-2" data-bs-toggle="modal" data-bs-target="#mod" >Add Venue</button>

            <div className="modal fade" id="mod" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="mod">Add Venue</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { }}></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={onSubmitForm}>
                                <input type="venueName" name="venueName" placeholder='Venue Name' className="form-control my-3" value={venueName} onChange={changeHandler} />
                                <input type="cityName" name="cityName" placeholder='City Name' className="form-control my-3" value={cityName} onChange={changeHandler} />
                                <input type="countryName" name="countryName" placeholder='Country Name' className="form-control my-3" value={countryName} onChange={changeHandler} />
                                <input type="capacity" name="capacity" placeholder='Capacity' className="form-control my-3" value={capacity} onChange={changeHandler} />
                                <div className="d-grid gap-2">
                                    <button className='btn btn-primary btn-block'>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


            <div className='mt-5 pt-5'>
                <ul className="list-group">
                    {
                        venueIds.map((venue) => {
                            return (
                                <div id={venue.venue_id}>
                                    <Link to={`/venues/${venue.venue_id}`} className="list-group-item">{venue.venue_name}</Link>
                                </ div>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Venues