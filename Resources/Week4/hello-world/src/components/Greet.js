import React from 'react';

// function Greet(){
//     return <h2> Hello, Shasmith Krishna</h2>
// }
const Greet = (props) => {
    console.log(props)
    return( 
        <div>
            <h2> Hello, {props.name}</h2>
            {props.children}
        </div>
    )
    
}
export default Greet;