import React from 'react'
import { metaCert } from '../assets'
import { styles } from "../styles";
import Cards from './Cards';

const Certs = () => {
  return (
    <section className='container text-center m-2 pb-4' >
    <h4 className={styles.sectionText}>Certifications</h4>
        <div className='container'>
          <Cards />
        </div>
    </section>
  )
}

export default Certs;