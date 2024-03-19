import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const changeInputHandel = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>

        <form className="form register_form">
          <p className="form__error-message">This is an Error Message</p>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandel}
          />

          <input
            type="text"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandel}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandel}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={userData.password2}
            onChange={changeInputHandel}
          />

          <button type="submit" className="btn primary">
            Resiter
          </button>
        </form>
        <small>
          Already have an Account? <Link to="/login">Sign In</Link>
        </small>
      </div>
    </section>
  );
}

export default Register;
