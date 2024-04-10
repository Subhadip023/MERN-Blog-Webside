import React, { useContext, useEffect } from "react";
import { UserContext } from "../contex/userContex";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function DeletePost({ id }) { // Destructure id properly here
  const { currentUser } = useContext(UserContext);
  const history = useNavigate();
  const location = useLocation();
  const token = currentUser?.token;

  const deletePost = async (postId) => { // Change parameter name to postId
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}`, // Use postId here
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}/delete`) {
          history(0); // Go back in history
          return;
        }
      }else{
        history("/");
      }
      history("/");

      
    } catch (error) {
      console.error("Error deleting post:", error);
      // Provide user feedback about the error
    }
  };

  useEffect(() => {
    if (!currentUser?.token) {
      history("/login");
    }
  }, []); // Include history in the dependency array

  return (
    <button
      className="btn sm danger"
      onClick={() => deletePost(id)} // Pass id to deletePost function
      disabled={!currentUser?.token}
    >
      Delete
    </button>
  );
}

export default DeletePost;
