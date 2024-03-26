import React, { useContext, useEffect } from 'react'
import { UserContext } from '../contex/userContex'
import { useNavigate } from 'react-router-dom'

function Logout() {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentUser(null);
    navigate('/login');
  }, []);

  return null; // Since this component doesn't render anything, return null.
}

export default Logout;
