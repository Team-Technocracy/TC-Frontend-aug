import React from 'react'
import styles from './Vigyaan.module.css'
import vigyaanLappy from '../../assets/svgs/2.png'
import vigyaanPhone from '../../assets/svgs/1.png'
import ProblemSt from './ProblemSt'
import Layout from './Vlayout'
import Navbar from '../Home/Navbar-new/Navbar'

const Vigyaan = () => {
  return (
    <>
      <Navbar/>
      <div id="vigyaan" className={styles.vigyaancontainer}>
        <img src={vigyaanLappy} alt="" width="100%" className={styles.vigyaanlappy} />
        <img src={vigyaanPhone} alt="" width="100%" className={styles.vigyaanphone} />
      </div>
      <ProblemSt/>
      <Layout/>
    </>
  )
}

export default Vigyaan