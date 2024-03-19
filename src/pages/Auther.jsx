import React, { useState } from 'react'
import Avatar1 from '../img/Author-img/Author(dumy).jpeg'
import Avatar2 from '../img/Author-img/user-33638_640.png'
import Avatar3 from '../img/Author-img/avatar-3680134_640.png'
import Avatar4 from '../img/Author-img/avatar-659652_640.png'
import Avatar5 from '../img/Author-img/user-310807_640.png'
import { Link } from 'react-router-dom'
const authorsData = [
  {id: 1, avatar: Avatar1, name: 'Ernest Achiever', posts: 3},
  {id: 2, avatar: Avatar2, name: 'Jane Doe', posts: 5},
  {id: 3, avatar: Avatar3, name: 'Dramani Mahama', posts: 0},
  {id: 4, avatar: Avatar4, name:  'Nana Addo', posts: 2},
  {id: 5, avatar: Avatar5, name: 'Hajia Bintu', posts: 1}
  ]
function Auther() {
  const [authors,SetAuthor] =useState(authorsData);
  return (
   <section className="authors">
   {authors.length>0 ? <div className="container auther_container">
{
  authors.map(({id, avatar,name, posts})=>{
return <Link key={id} to={`post/user/${id}`} className='author'>
  <div className="author_avater">
    <img src={avatar} alt={`Image Of ${name}`} />
  </div>
  <div className="auther_info">
    <h4>{name}</h4>
    <p>{posts}</p>
  </div>

</Link>
  })
}
    </div>: <h2 className='center'> No User/Auther Found</h2>
    }
   </section>
  )
}

export default Auther
