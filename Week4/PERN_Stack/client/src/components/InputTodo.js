import React, { useState } from 'react'

const InputTodo = (props) => {
  const user_id = props.user_id;  
  const [description, setDescription] = useState("");
  const onSubmitForm = async (e) =>{
    // e.preventDefault();
    try{
        const body = {description, user_id};
        console.log(body);
        const response = await fetch("http://localhost:5000/todos",
        {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(body)
        });
        console.log(response);
    }catch(err){
        console.error(err.message);
    }
  } 
  return (
    <React.Fragment>
      <div className='container my-5'>
        <form className='d-flex' onSubmit={onSubmitForm}>
            <input type='text' placeholder="Add Todo" className="form-control" value={description} onChange={e => setDescription(e.target.value)}/>
            <button className='btn btn-info text-light rounded-pill mx-3 text-uppercase'>Add</button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default InputTodo
