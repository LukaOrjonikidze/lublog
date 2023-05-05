import { useState, useRef } from 'react';

const Registration = (props) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://localhost:7026/api/Auth/register', {
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
                <form onSubmit={handleSubmit}>
                    <input ref={nameRef} placeholder="Your Name" />
                    <input ref={emailRef} placeholder="Your Email" />
                    <input ref={passwordRef} placeholder="Your Password" type="password" />
                    <button type="submit">Register</button>
                </form>
            :
                <button onClick={() => setIsRegistering(true)}>Register</button>
            }
        </>
    )
}

export default Registration