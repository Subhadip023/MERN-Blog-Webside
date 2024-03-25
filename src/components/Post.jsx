import React, { useEffect, useState } from "react";
import axios from "axios";
import Postitem from "./Postitem";


function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts/")
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <section className="posts">
      <div className="container post_conatainer">
        {posts.length > 0 ? (
          posts.map(post => (
            <Postitem
              key={post._id}
              id={post._id}
              thumbnail={post.thumbnail}
              category={post.category}
              title={post.title}
              desc={post.description}
              // Assuming you have a creator field, you can pass it as well
              creator={post.creator}
              // If you need createdAt and updatedAt timestamps, you can pass them too
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          ))
        ) : (
          <h2 className="center">No posts found</h2>
        )}
      </div>
    </section>
  );
}

export default Post;
