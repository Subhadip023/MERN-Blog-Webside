import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Avatar from "../img/Author(dumy).jpeg";
import upperCase1st from "../uppercase1st";

const PostAuther = ({ authorID, updatedAt }) => {
  const [author, setAuthor] = useState(null); // Set initial state to null

  useEffect(() => {
    const getAuthor = async () => { // Added async keyword here
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data);
        console.log(response?.data); // Log the response data, not `author`
      } catch (error) {
        console.log(error);
      }
    };

    getAuthor();
  }, [authorID]); // Include authorID in dependency array to re-run effect when it changes

  return (
    <Link to={`/posts/users/${authorID}`} className="post_author">
      <div className="post_author-avatar">
        <img src={Avatar} alt="Author Avatar" /> {/* Use imported Avatar */}
      </div>
      <div className="post_author-details">
        {author && ( // Check if author exists before rendering author details
          <>
            <h5>By: { upperCase1st(author.name)}</h5>
            <small>{updatedAt}</small>
          </>
        )}
      </div>
    </Link>
  );
};
export default PostAuther;
