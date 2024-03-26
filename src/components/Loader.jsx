import React from 'react'
import loder from "../img/loading.gif"
import './Loader.css'
function Loader() {
  return (
    <section className='loader'>
      <div className="loader_img">
        <img src={loder} alt="" />
      </div>
    </section>
  )
}

export default Loader
