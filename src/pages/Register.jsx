import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Navigate
import axios from "axios";
import Loader from "../components/Loader";

function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [error, setError] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const changeInputHandel = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");
  
    // Validate password length
    if (userData.password.length < 6 || userData.password.length > 17) {
      return setError("Password should be between 6 and 16 characters.");
    }
  
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userData
      );
      const newuser = await response.data;
      console.log(newuser);
      if (!response) {
        setError("Couldn't register user. Please try again.");
        setIsLoading(false)
      } else {
        // Redirect the user upon successful registration
        navigate("/login"); // Use Navigate
      }
    } catch (error) {
      setError(error.response.data.message || "An error occurred. Please try again.");
      setIsLoading(false)

    }
  };
  
if(isloading){
  return <Loader/>
}
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>

        <form className="form register_form" onSubmit={registerUser}>
          {error && <p className="form__error-message">{error}</p>}
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
            Register
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
