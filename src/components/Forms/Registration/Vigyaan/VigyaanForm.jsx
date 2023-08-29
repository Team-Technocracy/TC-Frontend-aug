import React from "react";
import urls from "../../../../urls.json";
import { Formik } from "formik";
import { useState } from "react";
import styles from "../Styles/styles.module.css";
import Navbar from "../../../Home/Navbar-new/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button } from "@mui/material";

import {
  Container,
  TextField,
  Grid,
  useThemeProps,
  Alert,
} from "@mui/material";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import img from "../../../../assets/images/leftArrow.png";
import useFullPageLoader from "../../../utils/useFullPageLoader";
import { toast } from "react-toastify";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const backend = urls.backend;

const categories = ["A", "B", "C", "D", "E"];
const subcategories = {
  A: ["A1", "A2", "A3"],
  B: ["B1", "B2", "B3"],
  C: ["C1", "C2", "C3"],
  D: ["D1", "D2", "D3"],
  E: ["E1", "E2", "E3"],
};

function VigyaanForm() {
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  const [alert0, setErrorAlert] = useState(false);
  const [alert1, setAlert] = useState(false);
  const [alertContent0, setErrorAlertContent] = useState("");
  const [alertContent1, setSuccessAlertContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const [uploadedFileName, setUploadedFileName] = useState("");

  function handleFileChange(file) {
    // Handle the selected file here
    console.log("Selected file:", file);
    if (file) {
      setUploadedFileName(file.name);
    } else {
      setUploadedFileName("");
    }
  }

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
    Leader_college: "",
    Leader_branch: "",
    YOS: "",
    Member2: "",
    Member3: "",
  });

  function handle(e) {
    const newData = { ...form };
    newData[e.target.name] = e.target.value;
    set(newData);
  }

  async function submit() {
    showLoader();
    if (
      form.Team_name !== "" &&
      form.Leader_name !== "" &&
      form.Leader_email !== "" &&
      form.Leader_whatsapp !== "" &&
      form.Leader_college !== "" &&
      form.YOS !== "" &&
      form.Leader_branch !== "" &&
      form.Member3 !== "" &&
      form.Member2 !== ""
    ) {
      try {
        const response = await axios.post(`${backend}/vigyanReg`, form, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const res = response.data;
        alert(res.message);
      } catch (err) {
        console.log(err);
        alert("An error occurred");
      }
    } else {
      hideLoader();
      setErrorAlertContent("Fill the required details!!!");
      setErrorAlert(true);
      setAlert(false);
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
                <form className={styles.form}>
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
                        name="Leader_college"
                        label="Leader's College Name"
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
                        label="Branch"
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
                        name="YOS"
                        label="Year"
                        variant="outlined"
                        autoComplete="off"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        margin="normal"
                        name="Member2"
                        id="name2"
                        label="Team Member Name 2"
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
                        name="Member3"
                        id="name3"
                        label="Team Member Name 3"
                        type="text"
                        required
                        fullWidth
                        variant="outlined"
                        autoComplete="none"
                        onKeyUp={(e) => handle(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                          labelId="category-label"
                          id="category"
                          name="category"
                          label="Category"
                          value={selectedCategory}
                          onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setSelectedSubcategory(""); // Reset subcategory when changing category
                          }}
                        >
                          {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                              {category}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    {selectedCategory && (
                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <InputLabel id="subcategory-label">
                            Subcategory
                          </InputLabel>
                          <Select
                            labelId="subcategory-label"
                            id="subcategory"
                            name="subcategory"
                            label="Subcategory"
                            value={selectedSubcategory}
                            onChange={(e) =>
                              setSelectedSubcategory(e.target.value)
                            }
                          >
                            {subcategories[selectedCategory].map(
                              (subcategory) => (
                                <MenuItem key={subcategory} value={subcategory}>
                                  {subcategory}
                                </MenuItem>
                              )
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <input
                        accept="image/*"
                        style={{ display: "none" }}
                        id="file-input"
                        type="file"
                        onChange={(e) => handleFileChange(e.target.files[0])}
                      />
                      <label htmlFor="file-input">
                        <Button variant="outlined" component="span">
                          Upload File
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
                </form>
              </Formik>
            </div>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
}
export default VigyaanForm;
