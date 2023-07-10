import React, { useEffect, useState } from 'react'
import EditTodo from './EditTodo';

const ListTodo = ()  =>{
    const [todos, setTodos] = useState([]);
    async function getTodos(){
        const res = await fetch("http://localhost:5000/todos",{
            method:"GET",
            headers: {token: localStorage.token},
        });
        const todoArray = await res.json();
        setTodos(todoArray);
    }
    
    // delete todo
    async function deleteTodo(id){
        try {
            const res = await fetch(`http://localhost:5000/todos/${id}`,{
            method:"DELETE",
            headers: {token: localStorage.token},
        });
        setTodos(todos.filter(todo => todo.todo_id !== id));
        } catch (error) {
            console.error(error.message)
        }
    }
    useEffect(() =>{
        getTodos();
    }, [])
    // console.log(todos);
  return (
    <React.Fragment>
      <h3 className='text-center my-5'>List Tasks</h3>
      <table className="table table-striped table-bordered  mt -5">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            </tr> */}
            {
                todos.map((todo, index) =>
                   {
                    return (<tr key={todo.todo_id}>
                        <th>{index+1}</th>
                        <td className="text-capitalize  text-bolder">{todo.description}</td>
                        <td><EditTodo todo = {todo}/></td>
                        <td><button className='btn btn-danger rounded-pill text-uppercase' onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                    </tr>
                    );
                   }
                )
            }
        </tbody>
        </table>
    </React.Fragment>
  )
}

export default ListTodo;
