import { DUMMY_POSTS } from "../data.js";
import React, { useState } from "react";
import Postitem from "./Postitem";


function Post() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    
    <section className="posts">
      <div className="container post_conatainer">
      {posts.length > 0 ? posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
        <Postitem
          key={id}
          id={id}
          thumbnail={thumbnail}
          category={category}
          title={title}
          desc={desc}
          authorID={authorID}
        />
      ))
    : <h2 className="center">No post Fund </h2>
    }   
       </div>

    </section>

  );
}

export default Post;
