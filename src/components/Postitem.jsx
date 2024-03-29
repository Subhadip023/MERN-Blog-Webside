import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PsotAuther';
import DOMPurify from 'dompurify';

const PostItem = ({ id, category, title, desc, authorID, thumbnail, updatedAt }) => {

  const sanitizeHTML = (html) => ({
    __html: DOMPurify.sanitize(html)
  });

  const shortDescription = desc.length > 145 ? desc.substr(0, 145) + '...' : desc;
  const shortTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

  return (
    <article className="post">
      <div className="post_thumbnail">
        {/* Display the thumbnail image */}
        <img src={thumbnail} alt={title} />
      </div>
      <div className="post_content">
        <Link to={`/posts/${id}`}>
          <h3>{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={sanitizeHTML(shortDescription)}></p>
        <div className="post_footer">
          <PostAuthor authorID={authorID} updatedAt={updatedAt} />
          <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
