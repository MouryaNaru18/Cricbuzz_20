import React from 'react'
import ScoreChart from './ScoreChart'
import { useParams } from 'react-router-dom';

function MatchCentre() {
  const {id} = useParams();
//   console.log(id);
  return (
    <div>
      <ScoreChart matchId={id}/>
    </div>
  )
}

export default MatchCentre
