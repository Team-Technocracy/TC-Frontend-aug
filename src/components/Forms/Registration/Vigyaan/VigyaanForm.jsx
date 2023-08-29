import React from "react";
import { Formik } from "formik";
import { useState } from "react";
import styles from "../Styles/styles.module.css";
import Navbar from '../../../Home/Navbar-new/Navbar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, TextField, Grid, useThemeProps, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
// import events from '../../../assets/datas/EventsDatas'
import axios from "axios";
// import Cookies from 'js-cookie';
import { NavLink } from "react-router-dom";
import img from '../../../../assets/images/leftArrow.png' 
import useFullPageLoader from '../../../utils/useFullPageLoader';
const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function VigyaanForm() {
    const [loader,showLoader,hideLoader]= useFullPageLoader();
	const [alert0, setErrorAlert] = useState(false);
	const [alert1, setAlert] = useState(false);
    const [alertContent0, setErrorAlertContent] = useState('');
	const [alertContent1, setSuccessAlertContent] = useState('');
	const { id } = useParams();
	// data of event
	const data = {
		name: "",
		desc: "",
		teamSize: 0,
		teamMin: 0
	}

	// events.map((event) => {
	// 	if (String(event.id) === id) {
	// 		data.name = event.title;
	// 		data.desc = event.details;
	// 		data.teamSize = event.teamSize;
	// 		data.teamMin = event.teamMin;
	// 	}
	// });

	const count = [];
	for (let i = 1; i < data.teamSize; i++) {
		count.push(String(i));
	}
	console.log(count);

	const [form, set] = useState({
		"event": "Code Tag",
		"team_name": "",
		"leader_name": "",
		"leader_mail": "",
		"leader_whatsapp": "",
		"leader_college": "",
		"leader_number": "",
		"leader_branch": "",
		"yos": "",
		"mem2": "",
		"mem3": "",
		"lang": ""
	});

	function handle(e) {
		const newData = { ...form }
		newData[e.target.name] = e.target.value
		set(newData)
	}

	function submit() {
		showLoader();
		if (form.event !== ""&&form.team_name !== ""&&form.leader_name !== ""&&form.leader_mail !== ""&&form.leader_number !== "" && form.leader_whatsapp !== ""&&form.leader_college !== ""&&form.yos !== ""&&form.leader_branch !== ""&&form.mem3 !== ""&&form.mem2 !== ""&&form.lang !== "") {
			console.log(form);
			axios.post(`https://aavartan-backend-production.up.railway.app/codetag/${JSON.stringify(form)}`)
				.then(res => {
					if (res.data === 0) {
						hideLoader();
						setErrorAlertContent('Error occurred');
						setErrorAlert(true);
						setAlert(false);
					}
					else if (res.data === 1) {
						hideLoader();
						setSuccessAlertContent('Registered successfully');
						setAlert(true);
						setErrorAlert(false);
					}
				})
		}else{
			hideLoader();
			setErrorAlertContent('Fill the required details!!!');
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
						<NavLink to="/events"><img src={img} alt="" /></NavLink>
					</div>
					<div className={styles.description}>
						<div>
							<h3 className={styles.event_title}>Vigyaan</h3>
							<p className={styles.event_description}>Greetings once again to the highly anticipated Science exhibition - VIGYAAN, the flagship event of AAVARTAN'23-24! 🚀 Team Technocracy is thrilled to extend a hearty invitation to all the brilliant intellects spanning diverse dimensions. We beckon you to grace the stage with your inventive concepts, innovations, and masterpieces. 🌠
</p>
							<p className={styles.event_more}>🧠 Get ready to seize this opportunity as we embark on a journey to unravel the mysteries of the future. Come, join us in embracing the realm of Vigyaan. The captivating Problem Statements for Vigyaan will soon be unveiled, and we eagerly invite you all to delve into them.
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
							<p className={styles.event_time}><b>CONTACT : </b>Somya Kabra : 6266307431, Sachin Saini : 9352152742</p>
						</div>
					</div>
				</Container>
                <Container>
                <div className={`${styles.registration} ${styles.registration_wrapper}`}>
						{/* <h2 className={styles.heading}>Registration Closed</h2> */}
						<Formik initialValues={{ team_name: "", team_leader_name: "", college: "", full_name_1: "", number_1: "", full_name_2: "", number_2: "", full_name_3: "", number_3: "" }}>
							<form className={styles.form} >
								<Grid container spacing={2}>
									<Grid item xs={12} >
										<TextField
											margin="normal"
											required
											fullWidth
											id="team_name"
											name="team_name"
											label="Team Name"
											variant="outlined"
											autoFocus

											autoComplete='off'
											onKeyUp={(e) => handle(e)}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											required
											fullWidth
											id="team_leader_name"
											name="leader_name"
											label="Team Leader's Name"
											variant="outlined"
											autoComplete='off'
											onKeyUp={(e) => handle(e)}
										/>
									</Grid>
									<Grid item xs={12} >
										<TextField
											margin="normal"
											required
											fullWidth
											id="email"
											label="Leader's Email Address"
											name="leader_mail"
											autoComplete="email"
											variant="outlined"
											
											onKeyUp={(e) => handle(e)}

										/>
									</Grid>
									<Grid item xs={12} >
										<TextField
											margin="normal"
											required
											fullWidth
											id="whatsapp_no"
											name="leader_whatsapp"
											label="Leader's WhatsApp No"
											variant="outlined"

											autoComplete='off'
											onKeyUp={(e) => handle(e)}

										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											required
											fullWidth
											id="college_name"
											name="leader_college"
											label="Leader's College Name"
											variant="outlined"
											autoComplete='off'
											onKeyUp={(e) => handle(e)}
										/>
									</Grid>

									<Grid item xs={12}>
										<TextField
											margin="normal"
											required
											fullWidth
											id="team_leader_number"
											name="leader_number"
											label="Team Leader Contact no"
											variant="outlined"
											autoComplete='off'
											onKeyUp={(e) => handle(e)}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											required
											fullWidth
											id="branch"
											name="leader_branch"
											label="Branch"
											variant="outlined"
											autoComplete='off'
											onKeyUp={(e) => handle(e)}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											required
											fullWidth
											id="year"
											name="yos"
											label="Year"
											variant="outlined"
											autoComplete='off'
											onKeyUp={(e) => handle(e)}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											name="mem2"
											id="name2"
											label="Team Member Name 2"
											type="text"
											required
											fullWidth
											variant="outlined"
											autoComplete='none'
											onKeyUp={(e) => handle(e)}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											margin="normal"
											name="mem3"
											id="name3"
											label="Team Member Name 3"
											type="text"
											required
											fullWidth
											variant="outlined"
											autoComplete='none'
											onKeyUp={(e) => handle(e)}
										/>
									</Grid>
								</Grid>
								<br></br>
								   {alert0 ? <Alert variant="outlined" severity='error'>{alertContent0}</Alert> : <></> }
								   <br></br>
								   {alert1 ? <Alert variant="outlined" severity='success'>{alertContent1}</Alert> : <></> }
								   <br></br>
								<button type="button" className={styles.registration_button} onClick={submit} >Register</button>
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