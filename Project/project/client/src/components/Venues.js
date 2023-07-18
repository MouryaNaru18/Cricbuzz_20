import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom';

function Venues() {
    const [venueIds, setVenueIds] = useState([]);

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

    useEffect(() => { venue() }, []);

    return (
        <div>
            <div className='mt-5 pt-5'>
            <ul class="list-group">
                {
                    venueIds.map((venue) => {
                        return(
                            <div>
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