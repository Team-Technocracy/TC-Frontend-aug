import React, { useState } from "react";
import urls from "../../../../urls.json";
import { Formik } from "formik";
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
// import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import img from "../../../../assets/images/leftArrow.png";
import useFullPageLoader from "../../../utils/useFullPageLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [isWhatsAppValid, setIsWhatsAppValid] = useState(false);
  const [isWhatsAppValidMember2, setIsWhatsAppValidMember2] = useState(false);
  const [isWhatsAppValidMember3, setIsWhatsAppValidMember3] = useState(false);
  const [alertContent1, setSuccessAlertContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedSubcategory, setSelectedSubcategory] = useState("");

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
    Member2_email: "",
    Member2_yog: "",
    Member2_whatsapp: "",
    Member2_branch: "",
    Member3_name: "",
    Member3_email: "",
    Member3_yog: "",
    Member3_whatsapp: "",
    Member3_branch: "",
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

    if (e.target.name === "Leader_whatsapp") {
      const isNumberValid = isWhatsAppNumberValid(e.target.value);
      setIsWhatsAppValid(isNumberValid);
    }
    if (e.target.name === "Member2_whatsapp") {
      const isNumberValid = isWhatsAppNumberValid(e.target.value);
      setIsWhatsAppValidMember2(isNumberValid);
    }

    if (e.target.name === "Member3_whatsapp") {
      const isNumberValid = isWhatsAppNumberValid(e.target.value);
      setIsWhatsAppValidMember3(isNumberValid);
    }
  }

  async function submit() {
    console.log(form)
    setIsSubmitting(true);
    showLoader();

    const isLeaderWhatsAppValid = isWhatsAppNumberValid(form.Leader_whatsapp);
    const isMember2WhatsAppValid = isWhatsAppNumberValid(form.Member2_whatsapp);
    const isMember3WhatsAppValid = isWhatsAppNumberValid(form.Member3_whatsapp);

    let condition1 = form.Team_name !== "" && form.Leader_name !== "" && form.Leader_email !== "" && form.Leader_whatsapp !== "" && isLeaderWhatsAppValid && form.College !== "" && form.YOG !== "" && form.Leader_branch !== "" && form.Member2_name !== "" && form.Member2_email !== "" && form.Member2_yog !== "" && form.Member2_whatsapp !== "" && form.Member2_branch !== "" && isMember2WhatsAppValid && form.Problem_code !== "" && form.file

    let condition2 = true
    if (member3) condition2 = form.Member3_email !== "" && form.Member3_name !== "" && form.Member3_whatsapp !== "" && form.Member3_whatsapp !== "" && form.Member3_yog !== "" && isMember3WhatsAppValid && form.Member3_branch !== ""
    console.log(condition1)
    console.log(condition2)

    if (condition1 && condition2) {
      try {
        const res1 = await axios.post(`${backend}/vigyaanReg`, form, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res1.data.ok) {
          try {
            const res2 = await axios.post(`${backend}/vigyaanAbstract`, form, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
            if (res2.data.ok) {
              toast.success(res2.data.message)
            }
            else {
              toast.error(res2.data.message)
            }
          }
          catch (err2) {
            console.log(err2);
            toast.error(err2.reponse.data.message);
          }
        }
        else {
          toast.error(res1.data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.reponse.data.message);
      }
    } else {
      setIsSubmitting(false);
      toast.warning("Fill the required details correctly!!!");
    }
    setIsSubmitting(false);
  }

  const [attri, setAttri] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [member3, setMember3] = useState(false)

  function member3Click() {
    if (member3) {
      form.Member3_name = ""
      form.Member3_email = ""
      form.Member3_whatsapp = ""
      form.Member3_branch = ""
      form.Member3_yog = ""
    }
    setMember3(!member3)
  }

  function changeState() {
    setToggle(!toggle);
    setAttri(!attri);
  }

  function isWhatsAppNumberValid(number) {
    return /^\d{10}$/.test(number);
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
                <p>
                  <b>NOTE</b>: Teams can be inter-branch or inter-year
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

                    {/* First Column */}
                    <Grid item xs={12} sm={4}>
                      <span style={{ color: "white" }}>Leader Details</span>
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
                        {form.Leader_whatsapp && !isWhatsAppValid && (
                          <p style={{ color: "red" }}>WhatsApp number must be of 10 digits.</p>
                        )}
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
                          id="college_name"
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
                    </Grid>

                    {/* Second Column */}
                    <Grid item xs={12} sm={4}>
                      <span style={{ color: "white" }}>Member 2 Details</span>
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
                          name="Member2_email"
                          id="name2"
                          label="Member 2 Email"
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
                          label="Member 2 Whatsapp No."
                          type="text"
                          required
                          fullWidth
                          variant="outlined"
                          autoComplete="none"
                          onKeyUp={(e) => handle(e)}
                        />
                        {form.Member2_whatsapp && !isWhatsAppValidMember2 && (
                          <p style={{ color: "red" }}>WhatsApp number must be of 10 digits.</p>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="college_name"
                          name="Member2_branch"
                          label="Member 2 Branch"
                          variant="outlined"
                          autoComplete="off"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          margin="normal"
                          name="Member2_yog"
                          id="name2"
                          label="Member 2 Year of graduation"
                          type="text"
                          required
                          fullWidth
                          variant="outlined"
                          autoComplete="none"
                          onKeyUp={(e) => handle(e)}
                        />
                      </Grid>
                      <Button variant="outlined" component="span" onClick={member3Click}>
                        {!member3 ? "Add 3rd Team Member" : "Remove 3rd Team Member"}
                      </Button>
                    </Grid>

                    {/* 3rd Column */}
                    {member3 ?
                      <Grid item xs={12} sm={4}>
                        <span style={{ color: "white" }}>Member 3 Details</span>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
                            name="Member3_name"
                            id="name3"
                            label="Team Member 3 Name"
                            type="text"
                            fullWidth
                            variant="outlined"
                            autoComplete="none"
                            onKeyUp={(e) => handle(e)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
                            name="Member3_email"
                            id="name2"
                            label="Member 3 Email"
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
                            label="Member 3 Whatsapp No."
                            type="text"
                            fullWidth
                            variant="outlined"
                            autoComplete="none"
                            onKeyUp={(e) => handle(e)}
                          />
                          {form.Member3_whatsapp && !isWhatsAppValidMember3 && (
                            <p style={{ color: "red" }}>WhatsApp number must be of 10 digits.</p>
                          )}
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="college_name"
                            name="Member3_branch"
                            label="Member 3 Branch"
                            variant="outlined"
                            autoComplete="off"
                            onKeyUp={(e) => handle(e)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            margin="normal"
                            name="Member3_yog"
                            id="name2"
                            label="Member 3 Year of graduation"
                            type="text"
                            required
                            fullWidth
                            variant="outlined"
                            autoComplete="none"
                            onKeyUp={(e) => handle(e)}
                          />
                        </Grid>
                      </Grid>
                      : <></>}
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
                        <p style={{ color: "white", paddingTop: "1rem" }}>Uploaded File: {uploadedFileName}</p>
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
                    disabled={isSubmitting} // Disable the button during submission
                  >
                    {isSubmitting ? "Submitting" : "Register"}
                  </button>
                </form>
              </Formik>
            </div>
          </Container>
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </ThemeProvider>
    </>
  );
}
export default VigyaanForm;
