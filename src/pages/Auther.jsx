import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import avatar_default from '../img/Author-img/user-33638_640.png'
import axios from "axios";
import upperCase1st from '../uppercase1st.js'
import Loader from '../components/Loader.jsx'

function Auther() {
  const [authors, setAuthors] = useState([]);
  const [isLoading,setIsLoading]=useState(false);
const {id}=useParams();
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/authors`
        );
        if (
          response &&
          response.data &&
          response.data.authors &&
          response.data.authors.length > 0
        ) {
          // If authors data exists in the response, set it to the state
          setAuthors(response.data.authors);
        } else {
          // If no authors data received, log a message
          console.log("No authors data received");
        }
        setIsLoading(false)
      } catch (error) {
        // Log error if fetching data fails
        console.error("Error fetching authors:", error);
      }
    };

    fetchAuthors();
  }, []);

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="authors">
      {authors.length > 0 ? (
        <div className="container auther_container">
          {authors.map(({ _id, avatar, name, posts }) => (
            <Link key={_id} to={`/posts/users/${_id}`} className="author">
              <div className="author_avatar">
                {avatar ? (
                  <img
src={avatar}                    alt={`Image Of ${name}`}
                  />
                ) : (
                  <img src={avatar_default} alt={`Image Of ${name}`} />
                )}{" "}
              </div>
              <div className="author_info">
                <h4>{upperCase1st(name)}</h4>
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
