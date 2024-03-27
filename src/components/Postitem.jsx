import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PsotAuther'; // Assuming you have a PostAuthor component

const PostItem = ({ id, category, title, desc, authorID, thumbnail ,updatedAt}) => {
  const shortDescription=desc.length>145 ? desc.substr(0,145)+'...':desc;
  const shortTitle=title.length>30 ? title.substr(0,30)+'...':title;
  
  return (
    <article className="post">
      <div className="post_thumbnail">
      <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${authorID}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p>{shortDescription}</p>
        <div className="post_footer">
          <PostAuthor authorID={authorID} updatedAt={updatedAt}/>
          <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
