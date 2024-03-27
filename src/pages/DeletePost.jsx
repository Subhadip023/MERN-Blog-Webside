import React, { useContext, useEffect } from "react";
import { UserContext } from "../contex/userContex";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function DeletePost({ id }) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmRlYWQyNDZjNzU1YmFlZjliM2M4NSIsIm5hbWUiOiJzdWJoYWRpcCIsImlhdCI6MTcxMTUxOTYwMiwiZXhwIjoxNzExNTIzMjAyfQ.fXQ9aQQDszSEZePi7nX3dVIbbmQoEHBGWJ5G3aqsOvk";

  const { currentUser } = useContext(UserContext);
  const history = useNavigate();

  const deletePost = async () => {
    try {
      if (!currentUser?.token) {
        history("/login");
        return;
      }

      await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      });


      history("/posts");
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
