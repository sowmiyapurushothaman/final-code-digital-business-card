import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { auth } from "../fb-config";
import '../App.css';
import logo from '../images/logo_fsa.png';
import { Link, useNavigate } from 'react-router-dom';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const navigate = useNavigate();

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then ((userCredential) => {
            console.log(userCredential);
            navigate(`/dashboard/${email}`)
        }).catch((error) => {
            setError("Email/Password is incorrect")
            console.log("not registered user");
        })


    }
  return (
    <div className='main-container'>
        <form onSubmit={signIn}>
            <div>
                <img className="fsa-logo" alt="fsa_logo" src={logo} />
                <h2 className="main-heading main-content">
                    Welcome to FSA BizCard
                </h2>
            </div>
    
            <div className='form-group'>
            {error && <p>{error}</p>}
            <input 
                className="input-name" 
                type="email" 
                placeholder='Enter your email' 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            </div>
            <div className='form-group'>
            <input 
                type="password" 
                placeholder='Enter your password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            </div>
            <div className='form-one-button'>
                <button className='submit-button'>Login</button>
            </div>
            <div className='form-one-button'>
                <button className="submit-button"><Link to="/" className="link backToMain">Back to Main</Link></button>
            </div>
        </form>
    </div>
        
  )
}


export default Signin