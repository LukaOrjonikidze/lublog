import { useState, useRef } from 'react';
import Button from '../UI/Button';
import classes from "../Modules/Registration.module.css";

const Registration = (props) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5157/api/Auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // ragac qeni mere aq
            setIsRegistering(false);
        });
    }

    return (
        <>
            {isRegistering ?
                <form onSubmit={handleSubmit} className={classes['registration-form']}>
                    <input ref={nameRef} placeholder="Your Name" />
                    <input ref={emailRef} placeholder="Your Email" />
                    <input ref={passwordRef} placeholder="Your Password" type="password" />
                    <div style={{display: "flex", justifyContent: "space-between", gap: "1rem"}}>
                        <Button type="submit">Register</Button>
                        <Button type="button" onClick={() => setIsRegistering(false)}>Cancel</Button>
                    </div>
                </form>
            :
                <Button onClick={() => setIsRegistering(true)}>Register</Button>
            }
        </>
    )
}

export default Registration