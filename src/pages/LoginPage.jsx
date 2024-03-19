import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Login() {
  const [userData,setUserData]=useState({
    email:'',
    password:'',
  });

  const changeInputHandel =(e)=>{
setUserData(prevState=>{
  return {...prevState,[e.target.name]:e.target.value}
})
  }
  return (
   <section className="register">
    <div className="container">
      <h2>Sign In</h2>

    <form  className="form login_form">
      <p className="form__error-message">
        This is an Error Message
      </p>

<input type="text" placeholder='Email' name='email' value={userData.email} onChange={changeInputHandel}/>

<input type="password" placeholder='Password' name='password' value={userData.password} onChange={changeInputHandel}/>


<button type='submit' className='btn primary'>LogIn</button>
    </form>
    <small>
      Don't have an Account? <Link to='/register'>Sign Up</Link>
    </small>
    </div>
   </section>
  )
}

export default Login
