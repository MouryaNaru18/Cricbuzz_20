import React, { useState } from 'react'

const EditTodo = ({ todo }) => {
    const [description, setDescription] = useState(todo.description);
    const editText = async (id) =>{
        try {
            const body = {description}
            const res = await fetch(`http://localhost:5000/todos/${id}`,{
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                token: localStorage.token
            },
            body:JSON.stringify(body)
        });
        window.location = "/dashboard";
        } catch (error) {
            console.error(error.message)
        }
    }
  return (
    <React.Fragment>
        <button type="button" className="btn btn-warning rounded-pill text-uppercase" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
        Edit
        </button>

        <div className="modal fade" id={`id${todo.todo_id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id={`id${todo.todo_id}label`}>Edit Todo</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={e => setDescription(todo.description)}></button>
            </div>
            <div className="modal-body">
                <input type='text' className="form-control" value={description} onChange={e => setDescription(e.target.value)}></input>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => editText(todo.todo_id)}>Save changes</button>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={e => setDescription(todo.description)}>Close</button>
            </div>
            </div>
        </div>
        </div>
    </React.Fragment>
  ) 
}

export default EditTodo
