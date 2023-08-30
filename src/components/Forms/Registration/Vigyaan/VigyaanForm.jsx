import React, { useState } from "react";
import { Formik } from "formik";
import { Button, Container, Grid, TextField, Alert } from "@mui/material";
import useFullPageLoader from "../../../utils/useFullPageLoader";
import axios from "axios";
import { toast } from "react-toastify";
// ... (other imports)

import urls from "../../../../urls.json";
import styles from "../Styles/styles.module.css";
import Navbar from "../../../Home/Navbar-new/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import img from "../../../../assets/images/leftArrow.png";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const backend = urls.backend;

// const categories = ["A", "B", "C", "D", "E"];
// const subcategories = {
//   A: ["A1", "A2", "A3"],
//   B: ["B1", "B2", "B3"],
//   C: ["C1", "C2", "C3"],
//   D: ["D1", "D2", "D3"],
//   E: ["E1", "E2", "E3"],
// };

function VigyaanForm() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [alert0, setErrorAlert] = useState(false);
  const [alert1, setAlert] = useState(false);
  const [alertContent0, setErrorAlertContent] = useState("");
  const [alertContent1, setSuccessAlertContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState(new FormData());

  const { id } = useParams();
  // data of event

  // events.map((event) => {
  // 	if (String(event.id) === id) {
  // 		data.name = event.title;
  // 		data.desc = event.details;
  // 		data.teamSize = event.teamSize;
  // 		data.teamMin = event.teamMin;
  // 	}
  // });

  const [form, set] = useState({
    Team_name: "",
    Leader_name: "",
    Leader_email: "",
    Leader_whatsapp: "",
    College: "",
    Leader_branch: "",
    YOG: "",
    Member2_name: "",
    Member2_whatsapp: "",
    Member3_name: "",
    Member3_whatsapp: "",
    Problem_code: "",
    file: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newData = { ...form };
      newData["file"] = file;
      set(newData);
      setUploadedFileName(file.name);
    }
  };

  function handle(e) {
    const newData = { ...form };
    newData[e.target.name] = e.target.value;
    set(newData);
  }

  async function submit(values, { setSubmitting, resetForm }) {
    showLoader();
    setErrorAlert(false);
    setAlert(false);

    try {
      const res1 = await axios.post(`${backend}/vigyaanReg`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res1.data.ok) {
        const res2 = await axios.post(`${backend}/vigyaanAbstract`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Successfully Submitted");
        resetForm(); // Reset form values
      } else {
        toast.error(res1.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred");
    } finally {
      hideLoader();
      setSubmitting(false);
    }
  }

  const [attri, setAttri] = useState(false);
  const [toggle, setToggle] = useState(false);

  function changeState() {
    setToggle(!toggle);
    setAttri(!attri);
  }

  return (
    <>
      <Navbar />
      <ThemeProvider className={styles} theme={darkTheme}>
        <div className={styles.container}>
          <Container>
            <div className={styles.goback}>
              <NavLink to="/events">
                <img src={img} alt="" />
              </NavLink>
            </div>
            <div className={styles.description}>
              <div>
                <h3 className={styles.event_title}>Vigyaan</h3>
                <p className={styles.event_description}>
                  Greetings once again to the highly anticipated Science
                  exhibition - VIGYAAN, the flagship event of AAVARTAN'23-24! 🚀
                  Team Technocracy is thrilled to extend a hearty invitation to
                  all the brilliant intellects spanning diverse dimensions. We
                  beckon you to grace the stage with your inventive concepts,
                  innovations, and masterpieces. 🌠
                </p>
                <p className={styles.event_more}>
                  🧠 Get ready to seize this opportunity as we embark on a
                  journey to unravel the mysteries of the future. Come, join us
                  in embracing the realm of Vigyaan. The captivating Problem
                  Statements for Vigyaan will soon be unveiled, and we eagerly
                  invite you all to delve into them.
                </p>
                <p className={styles.event_materials}>
                  <b>Abstract Submission :</b>
                  <ul>
                    <li> 10th September, 2023</li>
                  </ul>
                  <br />
                  <b>Presentation Round :</b>
                  <ul>
                    <li> 27th - 28th September, 2023</li>
                  </ul>
                  <br />
                  <b>Prototype Round :</b>
                  <ul>
                    <li> 23rd October, 2023</li>
                  </ul>
                </p>
                {/* <p className={styles.event_location}><b>LOCATION : </b>Left Garden</p>
							<p className={styles.event_time}><b>TIME : </b>9:30 AM- 11:30 AM</p>
							<p className={styles.event_time}><b>DATE : </b>04.02.2023</p> */}
                <p className={styles.event_time}>
                  <b>CONTACT : </b>Somya Kabra : 6266307431, Sachin Saini :
                  9352152742
                </p>
              </div>
            </div>
          </Container>
          <Container>
            <div
              className={`${styles.registration} ${styles.registration_wrapper}`}
            >
              {/* <h2 className={styles.heading}>Registration Closed</h2> */}
              <Formik
                initialValues={{
                  Team_name: "",
                  team_Leader_name: "",
                  college: "",
                  full_name_1: "",
                  number_1: "",
                  full_name_2: "",
                  number_2: "",
                  full_name_3: "",
                  number_3: "",
                }}
              >
                {/* <form className={styles.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Team_name"
                        name="Team_name"
                        label="Team Name"
                        variant="outlined"
                        autoFocus
                        autoComplete="off"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="team_Leader_name"
                        name="Leader_name"
                        label="Team Leader's Name"
                        variant="outlined"
                        autoComplete="off"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Leader's Email Address"
                        name="Leader_email"
                        autoComplete="email"
                        variant="outlined"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="whatsapp_no"
                        name="Leader_whatsapp"
                        label="Leader's WhatsApp No"
                        variant="outlined"
                        autoComplete="off"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="college_name"
                        name="College"
                        label="College Name"
                        variant="outlined"
                        autoComplete="off"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="branch"
                        name="Leader_branch"
                        label="Leader's Branch"
                        variant="outlined"
                        autoComplete="off"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="year"
                        name="YOG"
                        label="Year of graduation"
                        variant="outlined"
                        autoComplete="off"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        name="Member2_name"
                        id="name2"
                        label="Team Member 2 Name"
                        type="text"
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="none"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        name="Member2_whatsapp"
                        id="whatsapp3"
                        label="Team Member 2 Whatsapp No."
                        type="text"
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="none"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        name="Member3_name"
                        id="name3"
                        label="Team Member 3 Name"
                        type="text"
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="none"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        name="Member3_whatsapp"
                        id="whatsapp3"
                        label="Team Member 3 Whatsapp No."
                        type="text"
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="none"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        type="text"
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="none"
                        labelId="category-label"
                        id="category"
                        name="Problem_code"
                        label="Problem Code"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input
                        accept="application/pdf"
                        style={{ display: "none" }}
                        id="file-input"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <label htmlFor="file-input">
                        <Button variant="outlined" component="span">
                          Upload Your Abstract
                        </Button>
                      </label>
                      {uploadedFileName && (
                        <p>Uploaded File: {uploadedFileName}</p>
                      )}
                    </Grid>
                  </Grid>
                  <br></br>
                  {alert0 ? (
                    <Alert variant="outlined" severity="error">
                      {alertContent0}
                    </Alert>
                  ) : (
                    <></>
                  )}
                  <br></br>
                  {alert1 ? (
                    <Alert variant="outlined" severity="success">
                      {alertContent1}
                    </Alert>
                  ) : (
                    <></>
                  )}
                  <br></br>
                  <button
                    type="button"
                    className={styles.registration_button}
                    onClick={submit}
                  >
                    Register
                  </button>
                </form> */}
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="Team_name"
                          name="Team_name"
                          label="Team Name"
                          variant="outlined"
                          autoFocus
                          autoComplete="off"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="team_Leader_name"
                          name="Leader_name"
                          label="Team Leader's Name"
                          variant="outlined"
                          autoComplete="off"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Leader's Email Address"
                          name="Leader_email"
                          autoComplete="email"
                          variant="outlined"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="whatsapp_no"
                          name="Leader_whatsapp"
                          label="Leader's WhatsApp No"
                          variant="outlined"
                          autoComplete="off"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="college_name"
                          name="College"
                          label="College Name"
                          variant="outlined"
                          autoComplete="off"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="branch"
                          name="Leader_branch"
                          label="Leader's Branch"
                          variant="outlined"
                          autoComplete="off"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="year"
                          name="YOG"
                          label="Year of graduation"
                          variant="outlined"
                          autoComplete="off"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          name="Member2_name"
                          id="name2"
                          label="Team Member 2 Name"
                          type="text"
                          required
                          fullWidth
                          variant="outlined"
                          autoComplete="none"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          name="Member2_whatsapp"
                          id="whatsapp3"
                          label="Team Member 2 Whatsapp No."
                          type="text"
                          required
                          fullWidth
                          variant="outlined"
                          autoComplete="none"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          name="Member3_name"
                          id="name3"
                          label="Team Member 3 Name"
                          type="text"
                          required
                          fullWidth
                          variant="outlined"
                          autoComplete="none"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          name="Member3_whatsapp"
                          id="whatsapp3"
                          label="Team Member 3 Whatsapp No."
                          type="text"
                          required
                          fullWidth
                          variant="outlined"
                          autoComplete="none"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          type="text"
                          required
                          fullWidth
                          variant="outlined"
                          autoComplete="none"
                          labelId="category-label"
                          id="category"
                          name="Problem_code"
                          label="Problem Code"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <input
                          accept="application/pdf"
                          style={{ display: "none" }}
                          id="file-input"
                          type="file"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="file-input">
                          <Button variant="outlined" component="span">
                            Upload Your Abstract
                          </Button>
                        </label>
                        {uploadedFileName && (
                          <p>Uploaded File: {uploadedFileName}</p>
                        )}
                      </Grid>
                    </Grid>
                    <br></br>
                    {alert0 && (
                      <Alert variant="outlined" severity="error">
                        {alertContent0}
                      </Alert>
                    )}
                    {alert1 && (
                      <Alert variant="outlined" severity="success">
                        {alertContent1}
                      </Alert>
                    )}
                    <button
                      type="submit"
                      className={styles.registration_button}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Register"}
                    </button>
                  </form>
                )}
              </Formik>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}
export default VigyaanForm;
