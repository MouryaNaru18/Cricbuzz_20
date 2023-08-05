import React from 'react'
import ScoreChart from './ScoreChart'
import ScoreCard from './ScoreCard'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useParams
} from "react-router-dom";
function MatchCentre() {
  const { id } = useParams();
  return (
    <div className='mt-3 pt-3'>
      <ul class="nav justify-content-center">

        <li class="nav-item">
          <Link to={`/scorechart/${id}`} className="nav-link">Score Chart</Link>
        </li>
        <li class="nav-item">

          <Link to={`/scorecard/${id}`} className="nav-link">Score Card</Link>

        </li>
        <li class="nav-item">
          <Link to={`/summary/${id}`} className="nav-link">Summary</Link>

        </li>
      </ul>
      {/* <Link to={`/scorechart/${id}`} className="btn btn-primary">Score Chart</Link> */}
      {/* <Link to={`/scorecard/${id}`} className="btn btn-primary">Score Card</Link> */}
      {/* <Link to={`/summary/${id}`} className="btn btn-primary">Summary</Link> */}
    </div>
  )
}

export default MatchCentre
