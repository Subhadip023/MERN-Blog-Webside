import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PsotAuther'; // Assuming you have a PostAuthor component

const PostItem = ({ id, category, title, desc, authorID, thumbnail }) => {
  const shortDescription=desc.length>145 ? desc.substr(0,145)+'...':desc;
  const shortTitle=title.length>30 ? title.substr(0,30)+'...':title;
  
  return (
    <article className="post">
      <div className="post_thumbnail">
      <img src={'/home/subhadip/Desktop/MERN-Blog-backend/server/uploads/Screenshot from 2024-03-18 20-48-2354624db2-b8fb-4a47-a40a-dc6b3e0343bd.png'} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${id}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p>{shortDescription}</p>
        <div className="post_footer">
          <PostAuthor authorID={authorID} />
          <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
