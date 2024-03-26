import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


function Auther() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/authors");
        if (response && response.data && response.data.authors && response.data.authors.length > 0) {
          // If authors data exists in the response, set it to the state
          setAuthors(response.data.authors);
        } else {
          // If no authors data received, log a message
          console.log("No authors data received");
        }
      } catch (error) {
        // Log error if fetching data fails
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []); 

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container author_container">
          {authors.map(({ _id, avatar, name, posts }) => (
            <Link key={_id} to={`post/user/${_id}`} className="author">
              <div className="author_avatar">
                <img src={`server/uploads/avatar-3680134_6401e7e2112-265a-452b-a6dc-aceb5a10e203.png`} alt={`Image Of ${name}`} />
              </div>
              <div className="author_info">
                <h4>{name}</h4>
                <p>{posts}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <h2 className="center"> No User/Auther Found</h2>
      )}
    </section>
  );
}

export default Auther;
