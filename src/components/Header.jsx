import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../img/logo.png'
import { CiMenuBurger } from "react-icons/ci";
import { ImCross } from "react-icons/im";

function Header() {
  const [isNavShowing,setIsNavShowing]=useState(window.innerWidth>800 ? true : false);
 const CloseNavHandeler=()=>{
  if(window.innerWidth<800){
    setIsNavShowing(false)
  }else{
    setIsNavShowing(true)
  }
 }
  
  return (
  <>
  <nav>
    <div className="container nav_container">
      <Link to='/' className='nav_logo' onClick={CloseNavHandeler}>
        <img src={Logo} alt="Navbar Logo" />
      </Link>
    
{ isNavShowing && <ul className="nav_menu">
<li><Link to="/profile/sfdfs"onClick={CloseNavHandeler}>Ernest Achiever</Link></li>
<li><Link to="/create"  onClick={CloseNavHandeler}>Create Post</Link></li>
<li><Link to="/authors" onClick={CloseNavHandeler}>Authors</Link></li>
<li><Link to="/logout"  onClick={CloseNavHandeler}>Logout</Link></li>
</ul>}
<button className="nav_toggle-btn" onClick={()=>setIsNavShowing(!isNavShowing)}>
{
 isNavShowing?<ImCross/>:<CiMenuBurger/> 
}
</button> </div> </nav>

  </>
  )
}

export default Header