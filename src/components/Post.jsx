import Thumbnail1 from "../img/1.png";
import Thumbnail2 from "../img/2.png";
import Thumbnail3 from "../img/3.png";
import Thumbnail4 from "../img/4.png";
import React, { useState } from "react";
import Postitem from "./Postitem";

const DUMMY_POSTS = [
  {
    id: "1",
    thumbnail: Thumbnail1,
    category: "education",
    title: "This is the title of the very first post on this blog.",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolor dolor",
    authorID: 3,
  },
  {
    id: "2",
    thumbnail: Thumbnail2,
    category: "technology",
    title: "Exploring the Latest Technological Innovations",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolor dolor",
    authorID: 1,
  },
  {
    id: "3",
    thumbnail: Thumbnail3,
    category: "travel",
    title: "Journey Through Exotic Destinations",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolor dolor",
    authorID: 2,
  },
  {
    id: "4",
    thumbnail: Thumbnail4,
    category: "food",
    title: "Culinary Adventures: Discovering New Flavors",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat dolor dolor",
    authorID: 4,
  },
];

function Post() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  return (
    
    <section className="posts">
      <div className="conatainer post_conatainer">
      {posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
        <Postitem
          key={id}
          id={id}
          thumbnail={thumbnail}
          category={category}
          title={title}
          desc={desc}
          authorID={authorID}
        />
      ))}   
       </div>

    </section>

  );
}

export default Post;
