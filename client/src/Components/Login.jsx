import { useState, useRef } from 'react';
import Button from '../UI/Button';
import classes from "../Modules/Login.module.css";


const Login = (props) => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleSubmit = (e) => {
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        e.preventDefault();
        fetch('http://localhost:5157/api/Auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Expose-Headers': 'Authorization'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            console.log(response);
            console.log(response.headers)
            const token = response.headers.get('authorization');
            console.log(token);
            localStorage.setItem('token', token);
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data.response === "Success"){
                props.onLogin(data.user.id, data.user.name, data.user.email);
            } 
        });
               
        
    }

    return (
        <>
            {isLoggingIn ?
                <form onSubmit={handleSubmit} className={classes['login-form']}>
                    <input ref={emailRef} placeholder="Your Email" />
                    <input ref={passwordRef} placeholder="Your Password" type="password" />
                    <div style={{display: "flex", justifyContent: "space-between", gap: "1rem"}}>
                        <Button type="submit">Login</Button>
                        <Button type="button" onClick={() => setIsLoggingIn(false)}>Cancel</Button>
                    </div>
                </form>
            :
                <Button onClick={() => setIsLoggingIn(true)}>Login</Button>
            }
        </>
    )
}

export default Login