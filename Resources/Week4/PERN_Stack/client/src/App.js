import React, {useEffect, useState} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Login from './components/Login.js';
import Register from './components/Register.js';
import Dashboard from './components/Dashboard.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const setAuth = (boolean) =>{
    setIsAuthenticated(boolean);
  }; 
  async function isAuth(){
    try{
      const response = await fetch(
        "http://localhost:5000/auth/is-verify", 
        {
            method: "GET",
            headers: {token : localStorage.token}
        }
        );
        const parseRes = await response.json();
        parseRes === true ? setIsAuthenticated(true): setIsAuthenticated(false);
    }catch(err){
      console.error(err.message);
    }
  }
  useEffect(() =>{
    isAuth()
  },[])
  return (
    <React.Fragment>
      <Router>
        <div className="container">
        <Routes>
          <Route path="/login" element={ !isAuthenticated ? (<Login setAuth = {setAuth}/>) : (<Navigate to="/dashboard" replace/>)} />
          <Route path="/register" element={!isAuthenticated ? (<Register setAuth = {setAuth}/>): (<Navigate to="/login" replace/>)} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard setAuth = {setAuth}/>:(<Navigate to="/login" replace/>)}/>
        </Routes>
        </div>
      </Router>
      <ToastContainer />
      
    </React.Fragment>
  );
}

export default App;
