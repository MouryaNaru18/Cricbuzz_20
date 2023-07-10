import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = ({setAuth}) => {
    const [inputs, setInputs] = useState({
        email:"",
        password:""
    });
    const {email, password} = inputs;
    const changeHandler = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try{
            const body = {email, password}
            const response = await fetch(
                "http://localhost:5000/auth/login", 
                {
                    method: "POST",
                    headers: {"Content-Type" : "application/json"},
                    body: JSON.stringify(body)
                }
            );
            
            const parseRes = await response.json();
            if (parseRes.token) {
                // console.log(parseRes);
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Login Successfully!");
            }
            else{
                setAuth(false);
                toast.error(parseRes);
                
            }
        }
        catch(err){
            console.error(err.message);
            toast.error(err.message);
            setAuth(false);
            
        }
    }
    return (
        <React.Fragment>
            <h1 className="text-center my-5">Login Page</h1>
            <form onSubmit={onSubmitForm}>
                <input type="email" name="email" placeholder='email' className= "form-control my-3" value= {email} onChange={changeHandler}/>
                <input type="password" name = "password" placeholder='password' className= "form-control my-3" value= {password} onChange={changeHandler}/>
                <div class="d-grid gap-2">
                    <button className='btn btn-primary btn-block'>Login</button>
                </div>
            </form>
            <div className = "my-2 text-center">
                <Link to="/register"> Don't have an Account?</Link>
            </div>
        </React.Fragment>
    );
}
export default Login;
