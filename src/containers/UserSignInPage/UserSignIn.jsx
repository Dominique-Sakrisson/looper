import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
import { loginUser } from '../../utils/userFunctions';
import style from './style.css';

const userSignIn = () => {
  const search = useLocation().search;
  const name = new URLSearchParams(search).get('error');

  const [email, setEmail] = useState('');
  const [acceptEmail, setAcceptEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [acceptPassword, setAcceptPassword] = useState(false);
  const [user, setUser] = useState({});


  useEffect(() => {
    document.getElementById('password').style.display = 'none';
  }), [];

  useEffect(() => {
    if(acceptEmail){
      document.getElementById('email').style.display = 'none';
      document.getElementById('password').style.display = 'block';
    }
  }), [acceptEmail];



  useEffect(() => {
    if(acceptPassword){
      document.getElementById('password').style.display = 'none';
      
    }
  }), [acceptPassword];

  const InputLabel = styled.div`
  font-size: .8rem;
  padding: 0;
  margin: 0;
  `;

  function handleLogIn(e){
    e.preventDefault();
    setUser({email, password});
  }

  useEffect(async ()=> {
    if(user.password && user.email) {
      const userResult = await loginUser(user.email, user.password);
      console.log(userResult);
      (userResult.error) ? 
      window.location.href = `./signIn?error=${userResult.error}`
      :
      window.location.href = `./user/tracks/${userResult.id}`
      
    }
  }), [user];

  return (
    <div className={style.signUpForm}>
      <div className={style.toggleUserForm}>
        <Link rel="stylesheet" to='/signUp'>
        Need an account?
        </Link>
        </div>
      {/* main header for the form
      displays users name as they fill out forms */}
      <h1>Looper</h1>

      <p>Sign In</p>
      {/* the form for collecting user information */}
      <form id="userForm" onSubmit={handleLogIn}>
        { //Check input first and last name to greet user
          (acceptPassword) ? 
          //prompt of complete form
            <div> 
              <h3>You entered</h3>
              <p>
          Email: {email}<br/> 
          password: {'*'.repeat(password.length)} <br/>
              </p>
        Is this all correct?
              <button type="submit" onClick={(e) => {
               
              }}> Confirm</button> 
            </div>
            : 
          //prompt if form isnt complete
            ''
        }

        <div id="inputLabels">      
          <label id="email" htmlFor="email">
            <InputLabel>Email address</InputLabel>
            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" value={email}/>
            <div>
            
              { //does email name have a value?
                (email.substring(email.length - 4, email.length) === '.com') 
                  ? //yes it does
                  <div>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setAcceptEmail(true);
                      }}> submit</button>
                  </div> : 'youremail@examplemail.com'
              }
              
            </div>
          </label>
          <label id="password" htmlFor="password">
            <p>{email}</p>
            <InputLabel>Password</InputLabel>
            <input onChange={(e) => setPassword(e.target.value)} type="password"  name="password" value={password}/>
            <div>
              { //does password name have a value?
          
                (password) 
                  ? <div>
                    <button type="submit" onClick={(e) => {
                      
            
                    }}> Sign In</button>
                  </div> : ''
              }
            </div>
          </label>
        
        </div>

      </form>
      {(name && !acceptEmail) ? <div className={style.errorMessage}>{name}</div> : ''}
    </div>
  );
};

export default userSignIn;
