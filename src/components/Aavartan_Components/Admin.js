import { useState } from "react"
import { Button } from "@mui/material";
import axios from "axios";
import url from '../../urls.json'

const backend = url.backend

const Admin = () => {
  const [form, set] = useState({
    branch: "",
    password: "",
    file: null
  })
  const [click, setClick] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState("");
  const branches = ['Architecture', 'BIO-TECHNOLOGY ENGINEERING', 'BIOMEDICAL ENGINEERING', 'CHEMICAL ENGINEERING', 'CIVIL ENGINEERING', 'CSE_IT_MCA', 'ELECTRICAL ENGINEERING', 'ELECTRONICS AND COMMUNICATION ENGINEERING', 'MECHANICAL ENGINEERING', 'METALLURGICAL AND MATERIALS ENGINEERING', 'MINING ENGINEERING']
  const [selectedBranch, setSelectedBranch] = useState('');

  function handle(e) {
    const newData = { ...form };
    newData[e.target.name] = e.target.value;
    set(newData);
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newData = { ...form }
      newData['file'] = file
      set(newData)
      setUploadedFileName(file.name)
    }
  }

  async function submit() {
    setClick(true)
    console.log(form.file.size / (1024 * 1024))
    if (form.branch !== "" && form.password !== "" && form.file) {
      const size = form.file.size / (1024 * 1024)
      if (size > 1) {
        alert("File size limit: 1 MB")
      }
      else {
        const response = await axios.post(`${backend}/changeFile`, form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        alert(response.data.message)
      }
    }
    setClick(false)
  }

  return (
    <center>
      <div style={{ backgroundColor: "white" }}>
        Hello Admin
        <p></p>
        <form>
          <label htmlFor="branchSelect">Select a Branch:</label>
          <select id="branchSelect" name="branch" value={form.branch} onChange={handle}>
            <option value="">Select an option</option>
            {branches.map((branch, index) => (
              <option key={index} name='branch' value={branch}>
                {branch}
              </option>
            ))}
          </select>
          <p></p>
          <br />
          <input
            accept="application/pdf"
            style={{ display: "none" }}
            id="file-input"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-input">
            <Button variant="outlined" component="span">
              Upload Problem Statement
            </Button>
          </label>
          {uploadedFileName && (
            <p>Uploaded File: {uploadedFileName}</p>
          )}
          <p></p>
          <br />
          <input placeholder="Password" type="password" name="password" onChange={(e) => handle(e)} />
          <p></p>
          <br />
          <button
            type="button"
            // className={styles.registration_button}
            style={{ marginLeft: "20px" }}
            onClick={submit}
          >
            {click ? "Submitting" : "Submit"}
          </button>
        </form>
      </div>
    </center>
  )
}

export default Admin