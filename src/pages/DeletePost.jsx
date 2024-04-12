import React, { useContext, useEffect,useState } from "react";
import { UserContext } from "../contex/userContex";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader.jsx";


function DeletePost({ id }) { // Destructure id properly here
  const { currentUser } = useContext(UserContext);
  const history = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const token = currentUser?.token;

  const deletePost = async (postId) => { // Change parameter name to postId
    try {
      setIsLoading(true)

      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}`, // Use postId here
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser.id}`) {
          history(0); // Go back in history
          return;
        }
      }else{
        history("/");
      }
      history("/");

      setIsLoading(false)

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
  if(isLoading){
    return <Loader/>
  }
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
