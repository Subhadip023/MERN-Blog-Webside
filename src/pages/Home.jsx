import React from 'react'
import Post from '../components/Post'
import Logo from '../img/TechTrove Tribune.png'
function Home() {
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
    
    <Post />

    </>
    )
}

export default Home