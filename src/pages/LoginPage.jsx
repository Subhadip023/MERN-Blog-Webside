import axios from "axios";
import React, { useState ,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import {UserContext} from '../contex/userContex.js'
import Logout from "./Logout.jsx";
import Loader from '../components/Loader.jsx'

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const changeInputHandel = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      setIsLoading(true)
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = await response.data;
      setCurrentUser(user)
      setIsLoading(false)
      navigate('/');
    } catch (error) {
      setError(error.response.data.message || "An error occurred. Please try again.");
      setIsLoading(false)

    }
  };
  if (isLoading){
    return <Loader/>
  }



  return (
    <section className="register">
      <div className="container">
        <h2>Sign In</h2>

        <form className="form login_form" onSubmit={loginUser}>
          {error && <p className="form__error-message">{error}</p>}

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

          <button type="submit" className="btn primary">
            LogIn
          </button>
        </form>
        <small>
          Don't have an Account? <Link to="/register">Sign Up</Link>
        </small>
      </div>
    </section>
  );
}

export default Login;
