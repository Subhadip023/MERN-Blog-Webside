import React, { useState, useContext, useEffect } from "react";
import { DUMMY_POSTS } from "../data";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { UserContext } from "../contex/userContex.js";

function DashBoard() {
  const { currentUser } = useContext(UserContext);
  const history = useNavigate();
  const [posts, setPosts] = useState(DUMMY_POSTS);

  useEffect(() => {
    if (!currentUser?.token) {
      history('/login');
    }
  }, [currentUser, history]);

  return (
    <section className="dashboard">
      {posts.length > 0 ? 
        <div className="container dashboard_container">
          {posts.map((post) => {
            return (
              <article key={post.id} className="dashboard_post">
                <div className="dashboard_post-info">
                  <div className="dashboard_post-thumbnail">
                    <img src={post.thumbnail} alt="" />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard_post-action">
                  <Link to={`/posts/${post.id}`} className="btn sm">
                    View
                  </Link>
                  <Link to={`/posts/${post.id}/edit`} className="btn sm primary">
                    Edit
                  </Link>
                  <Link to={`/posts/${post.id}/delete`} className="btn sm danger">
                    Delete
                  </Link>
                </div>
              </article>
            );
          })}
        </div>:<h2 className="center">You have No posts yet</h2>
      }
    </section>
  );
}

export default DashBoard;
