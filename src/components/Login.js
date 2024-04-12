import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [msg, setMsg]=useState('');
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5001/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: credentials.username, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            navigate('/');
            window.location.reload();
        }
        else{
            setMsg('Invalid credentials')
        }
    }

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ background: 'linear-gradient(to right, #222222, #111111)', height: '100vh' }} >
            <div className="card p-4 rounded-circle-border shadow-lg" style={{ width: "50vh" }}>
                <h2 className="text-center mb-4" style={{fontSize: '4vh'}}><b>Get your notes </b></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="text" className="form-control" id="username" onChange={handleChange} value={credentials.username} name='username' placeholder='username' style={{border: '1px black solid', padding: '1vh'}} aria-describedby="usernameHelp" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} placeholder='your password' style={{border: '1px black solid'}} name='password' />
                    </div>
                    <div style={{color: 'red', paddingBottom: '2vh'}}>{msg}</div>
                    <button type="submit" className="btn btn-outline-dark btn-block" style={{width: '100%'}}>Login</button>
                    <p style={{fontSize: '1.75vh', paddingTop: '2.5vh'}}>Remember your password; it's unchangeable</p>
                </form>
            </div>
        </div>
    )
}

export default Login;
