import React, { useContext, useEffect } from "react";
import { UserContext } from "../contex/userContex";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function DeletePost({ id }) {

  const { currentUser } = useContext(UserContext);
  const token = currentUser.token;  const history = useNavigate();

  const deletePost = async () => {
    try {
      if (!currentUser?.token) {
        history("/login");
        return;
      }

      await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });


      history("/");
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle deletion error
    }
  };

  useEffect(() => {
    if (!currentUser?.token) {
      history("/login");
    }
  }, [currentUser, history]);

  return (
    <button className="btn sm danger" onClick={deletePost}>
      Delete
    </button>
  );
}

export default DeletePost;
