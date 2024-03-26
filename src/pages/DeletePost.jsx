import React from 'react'
import { useContext,useEffect} from 'react'

import { UserContext } from '../contex/userContex';
import { useNavigate } from 'react-router-dom';


function DeletePost() {
  const {currentUser}=useContext(UserContext);

  const history=useNavigate()

  useEffect(() => {
    if (!currentUser?.token) {
      history('/login');
    }
  }, [currentUser, history]);

  return (
    <section className='container'>
      Delete Post 
    </section>
  )
}

export default DeletePost
