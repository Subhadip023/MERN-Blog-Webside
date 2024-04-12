import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DeletePost from "./DeletePost.jsx";


import axios from "axios";

import { UserContext } from "../contex/userContex.js";
import Loader from "../components/Loader.jsx";

function DashBoard() {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!currentUser?.token) {
      navigate('/login');
    } else {
      const getPost = async () => {
        try {
          setIsLoading(true)
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`);
          setPosts(response.data);
          setIsLoading(false)
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      getPost();
    }
  }, [currentUser, navigate, id]);

if(isLoading){
  return <Loader/>
}

  return (
    <section className="dashboard">
      {posts.length > 0 ? (
        <div className="container dashboard_container">
          {posts.map((post) => (
            <article key={post._id} className="dashboard_post">
              <div className="dashboard_post-info">
                <div className="dashboard_post-thumbnail">
                  <img src={post.thumbnail} alt="" />
                </div>
                <h5>{post.title}</h5>
              </div>
              <div className="dashboard_post-action">
                <Link to={`/posts/${post._id}`} className="btn sm">
                  View
                </Link>
                <Link to={`/post/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost id={post._id} />

              </div>
            </article>
          ))}
        </div>
      ) : ( 
        <h2 className="center">You have No posts yet</h2>
      )}
    </section>
  );
}

export default DashBoard;
