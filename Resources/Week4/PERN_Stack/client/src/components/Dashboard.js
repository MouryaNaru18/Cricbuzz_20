import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import InputTodo from './InputTodo';
import ListTodo from './ListTodo';

function Dashboard({setAuth}) {
    const [name, setName] = useState("");
    const [user_id, setUserID] = useState("");
    
    async function getName(){
        try{
            const response = await fetch(
                "http://localhost:5000/dashboard", 
                {
                    method: "GET",
                    headers: {token: localStorage.token},
                }
            );
            const parseRes = await response.json();
            // console.log(parseRes);
            setName(parseRes.user_name);
            setUserID(parseRes.user_id);
        }
        catch(err){
            console.error(err.message);
        }
    }
    useEffect(() => {
        getName();
    },[]);
    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        
        toast.success("Logout Successfully!");
        
        setAuth(false);
     }
    return (
        <React.Fragment>
            <h1 className="my-5 fst-italic">Hello, {name} </h1>
            <h3 className="text-center my-3">My Dashboard</h3>
            <button className="btn btn-outline-primary position-absolute top-0 end-0 my-2 mx-4 rounded-pill" onClick={logout}>LogOut</button>
            <InputTodo user_id = {user_id} />
            <ListTodo user_id = {user_id} />
        </React.Fragment>

    );
}

export default Dashboard;
