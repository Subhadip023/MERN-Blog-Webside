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
  const calculateReadTime = (text) => {
    // Assuming an average reading speed of 200 words per minute
    const wordsPerMinute = 130;
    const words = text.split(/\s+/).length;
    const readTimeInMinutes = words / wordsPerMinute;
    // Round up to the nearest whole number
    return Math.ceil(readTimeInMinutes);
  };
  
  const readTime = calculateReadTime(desc);
  
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
          <PostAuthor authorID={authorID} updatedAt={updatedAt} readTime={readTime}/>
         
          <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
