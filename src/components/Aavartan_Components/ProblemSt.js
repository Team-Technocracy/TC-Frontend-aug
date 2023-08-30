import React, { useEffect, useState } from "react";
import styles from "./ProblemSt.module.css";
import classnames from "classnames";
import registerform from "../../assets/ProblemSt/SampleAbstract.pdf";
import vigyaanrules from "../../assets/ProblemSt/VigyaanRules.pdf";
import Architecture from "../../assets/ProblemSt/ARCHITECTURE.pdf";
import Biomed from "../../assets/ProblemSt/BIOMED PS.pdf";
import Biotech from "../../assets/ProblemSt/BIOTECH PS.pdf";
import Chemical from "../../assets/ProblemSt/Chemical.pdf";
import Civil from "../../assets/ProblemSt/Civil.pdf";
import CSE from "../../assets/ProblemSt/CSE+IT+MCA.pdf";
import ECE from "../../assets/ProblemSt/ECE.pdf";
import EE from "../../assets/ProblemSt/EE.pdf";
import IT from "../../assets/ProblemSt/CSE+IT+MCA.pdf";
import MCA from "../../assets/ProblemSt/CSE+IT+MCA.pdf";
import MECH from "../../assets/ProblemSt/Mechanical.pdf";
import META from "../../assets/ProblemSt/Meta.pdf";
import Mining from "../../assets/ProblemSt/Mining.pdf";
import { Link } from "react-router-dom";
import axios from 'axios';
import urls from '../../urls.json'

const backend = urls.backend

// import circle from '../../assets/svgs/circle2.svg'

const ProblemSt = () => {
  const alerty = () => {
    alert('Will Open Soon');
  };
  const title = "vigyaan"
  const url = "/register/" + title.replaceAll(' ', '');
  const [problem, setProblems] = useState({})

  useEffect(() => {
    async function get() {
      try {
        const response = await axios.get(`${backend}/getFileURL`);
        console.log(response.data.message)
        setProblems(response.data.message)
      }
      catch (error) {
        console.error('Error fetching file URL:', error);
      }
    }

    get()
    console.log(problem)
  }, [])
  return (
    <>
      <div className={styles.problemstatementcontainer}>
        <div className={styles.problemstatementmiddle}>
          <div className={classnames(styles.psrow, styles.pshrow)}>
            <div className={classnames(styles.pscol, styles.pshcol)}>

              <a
              // href="https://docs.google.com/forms/d/e/1FAIpQLSemtta09XJhAFOMBCybYNCqZxruu6JMqclM8THaY8IMQOzLfQ/viewform?usp=send_form"
              // target="_blank"
              // rel="noreferrer"
              >
                <Link to={url}>
                  <button className={classnames(styles.button49, styles.btnh)}>
                    REGISTRATION FORM
                  </button>
                </Link>
              </a>
            </div>
            {/* <div className={classnames(styles.pscol, styles.pshcol)}>
              <a
              // href="https://docs.google.com/forms/d/e/1FAIpQLSfCUbeaZcqwaZRpBKhjzCFN6X4PCHqmoAjwW60uUI5ukpj7oA/viewform"
              // target="_blank"
              // rel="noreferrer"
              >
                <button onClick={alerty} className={classnames(styles.button49, styles.btnh)}>
                  ABSTRACT SUBMISSION
                </button>
              </a>
            </div> */}
            <div className={classnames(styles.pscol, styles.pshcol)}>
              <a href={registerform} target="_blank" rel="noreferrer">
                <button className={classnames(styles.button49, styles.btnh)}>
                  SAMPLE ABSTRACT
                </button>
              </a>
            </div>
            <div className={classnames(styles.pscol, styles.pshcol)}>
              <a href={vigyaanrules} target="_blank" rel="noreferrer">
                <button className={classnames(styles.button49, styles.btnh)}>
                  RULES & REGULATIONS
                </button>
              </a>
            </div>
          </div>
          <div className={styles.pstitle}>Problem &nbsp; Statements</div>
          <div className={styles.psrow}>
            <div className={styles.pscol}>
              <a href={problem['Architecture']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>ARCH</button>
              </a>
            </div>
            <div className={styles.pscol}>
              <a href={problem['BIOMEDICAL ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>BIOMED</button>
              </a>
            </div>
            <div className={styles.pscol}>
              <a href={problem['BIO-TECHNOLOGY ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>BIOTECH</button>
              </a>
            </div>
          </div>
          <div className={styles.psrow}>
            <div className={styles.pscol}>
              <a href={problem['CIVIL ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>CIVIL</button>
              </a>
            </div>
            <div className={styles.pscol}>
              <a href={problem['CSE_IT_MCA']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>CSE/ IT/ MCA</button>
              </a>
            </div>
            <div className={styles.pscol}>
              <a href={problem['ELECTRONICS AND COMMUNICATION ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>ECE</button>
              </a>
            </div>
          </div>
          <div className={styles.psrow}>
            <div className={styles.pscol}>
              <a href={problem['ELECTRICAL ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>EE</button>
              </a>
            </div>
            {/* <div className={styles.pscol}><a href={IT} target="_blank" rel='noreferrer'><button className={styles.button49}>IT</button></a></div> */}
            {/* <div className={styles.pscol}><a href={MCA} target="_blank" rel='noreferrer'><button className={styles.button49}>MCA</button></a></div> */}
            <div className={styles.pscol}>
              <a href={problem['MECHANICAL ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>MECH</button>
              </a>
            </div>
            <div className={styles.pscol}>
              <a href={problem['METALLURGICAL AND MATERIALS ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>META</button>
              </a>
            </div>
          </div>
          <div className={styles.psrow}>
            <div className={styles.pscol}>
              <a href={problem['MINING ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>MINING</button>
              </a>
            </div>
            <div className={styles.pscol}>
              <a href={problem['CHEMICAL ENGINEERING']} target="_blank" rel="noreferrer">
                <button className={styles.button49}>CHEMICAL</button>
              </a>
            </div>
          </div>
          <div className={styles.psrow}></div>
        </div>
      </div>
    </>
  );
};

export default ProblemSt;
