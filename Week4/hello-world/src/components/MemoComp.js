import React from 'react'

function MemoComp({name}) {
    console.log("Render Memo")
  return (
    <div>
      {name}
    </div>
  )
}

export default React.memo(MemoComp)
