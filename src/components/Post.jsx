import React, { useEffect, useState } from "react";
import axios from "axios";
import Postitem from "./Postitem";
import Loader from './Loader' 
import Logo from '../img/TechTrove Tribune.png'


function Post() {
  const [posts, setPosts] = useState([]);
  const [isloading,setIsloading]=useState(false)
  useEffect(() => {
    setIsloading(true)
     axios.get(`${process.env.REACT_APP_BASE_URL}/posts/`)
      .then(response => {
        setIsloading(false)
        setPosts(response.data);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setIsloading(false)

      }); 
  }, []);

if(isloading){
  return <Loader />;
}

  return ( 

    <>
 <section > 
      <div className="banner container">
      <div className="text">
         
      <h1>
       
       <span className='Highlightted'>Welcome</span> to TechTrove Tribune, your premier destination for the latest insights, news, and developments in the ever-evolving world of science and technology. Explore our curated collection of articles, analyses, and features covering a wide range of topics, from cutting-edge innovations to fascinating discoveries. Join us on a journey through the digital frontier, where every click brings you closer to the forefront of technological advancement. Stay informed, inspired, and engaged with TechTrove Tribune.
     </h1>
      </div>
<div className="banner-img">
          <img src={Logo} alt="Banner Image" />
        </div>
      </div>
  
    </section>
    
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
              authorID={post.creator}
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
    </>
   
  );
}

export default Post;
