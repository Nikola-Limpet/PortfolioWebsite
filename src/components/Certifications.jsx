import React from 'react'
import { metaCert } from '../assets'
import { styles } from "../styles";

const Certs = () => {
  return (
    <section className='container text-center m-2 pb-4' >
    <h4 className={styles.sectionText}>Certifications</h4>
    <div className="grid grid-cols-3 ml-16 grid-rows-12 gap-9">
      <div className="row-span-3 "><img src={metaCert}></img></div>
      <div className="row-span-3"></div>
      <div className="row-span-3"></div>
      <div className="row-span-3 row-start-4">4</div>
      <div className="row-span-3 row-start-4">5</div>
      <div className="row-span-3 row-start-4">6</div>
      <div className="row-span-3 row-start-7">7</div>
      <div className="row-span-3 row-start-7">8</div>
      <div className="row-span-3 row-start-7">9</div>
      <div className="row-span-3 row-start-10">10</div>
      <div className="row-span-3 row-start-10">11</div>
      <div className="row-span-3 row-start-10">12</div>
    </div>
      
    </section>
  )
}

export default Certs;