import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register=({setAuth}) => {
    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        name:""
    });
    const {email, password, name} = inputs;
    const changeHandler = (e) =>{
      setInputs({...inputs, [e.target.name]: e.target.value})  
    }
    const onSubmitForm = async (e) => {
        e.preventDefault();
        try{
            const body = {email, password, name}
            const response = await fetch(
                "http://localhost:5000/auth/register", 
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
                toast.success("Registered Successfully!");
            }
            else{
                setAuth(false);
                toast.error(parseRes);
            }
        }
        catch(err){
            setAuth(false);
            console.error(err.message);
            toast.error(err);
            
        }
    }
    return (
        <React.Fragment>
            <h1 className='text-center my-5'>Register Form</h1>
            <form onSubmit={onSubmitForm}>
                <input type = "text" name = "name" placeholder='name' className='form-control my-3' value={name} onChange={changeHandler}/>
                <input type = "email" name = "email" placeholder='email' className='form-control my-3' value={email} onChange={changeHandler}/>
                <input type = "password" name = "password" placeholder='password' className='form-control my-3' value={password} onChange={changeHandler}/>
                <div class="d-grid gap-2">
                    <button type = "submit" className='btn btn-primary'>Register</button>
                </div>
            </form>
            <div className = "my-2 text-center">
                <Link to="/login"> Already have an account?</Link>
            </div>
            
        </React.Fragment>

    );
}

export default Register;
