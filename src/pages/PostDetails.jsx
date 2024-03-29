import React, { useContext, useEffect, useState } from "react";
import PostAuther from "../components/PsotAuther.jsx"; // Typo fixed: PsotAuther -> PostAuther
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../contex/userContex.js"; // Typo fixed: contex -> context
import DeletePost from "./DeletePost.jsx";
import Loader from "../components/Loader.jsx";
import axios from "axios";
import DOMPurify from 'dompurify';





function PostDetails() {
  // Function to sanitize HTML content
const sanitizeHTML = (html) => ({
  __html: DOMPurify.sanitize(html)
});

  const {id} = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false); // Typo fixed: isloading -> isLoading
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
        // console.log((response.data))
        // console.log(id)
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getPost();
  }, []); // Added id to the dependency array to trigger useEffect when id changes

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post_detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="post-detail_container container">
          <div className="post-detail_header">
            <PostAuther authorID={post.creator} updatedAt={post.updatedAt} />
            {currentUser.id === post.creator && (
              <div className="post-detail_buttons">
                <Link to={`/post/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <DeletePost id={id} />
              </div>
            )}
          </div>
          <h1>{post ? post.title : "Loading..."}</h1>{" "}
          {/* Display post title or "Loading..." */}
          <div className="post-detail_thumbnail">
            <img
              src={ post ? post.thumbnail : ""}
              alt={post.title}
            />
          </div>
          {post && post.description && (
            <p dangerouslySetInnerHTML={sanitizeHTML(post.description)}></p>
          )}
          {/* <p>
        {post.description}
      </p> */}
        </div>
      )}
    </section>
  );
}

export default PostDetails;