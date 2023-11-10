import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Application } from "../models/Application";
import { Applicant } from "../models/Applicant";
import axios from "axios";
import NavBar from "./common/NavBar";

export default function JobApplication() {
  const [workedPreviously, setWorkedPreviously] = useState("");
  const [authorizedToWork, setAuthorizedToWork] = useState("");
  const [requireSponsorship, setRequireSponsorship] = useState("");
  const [needRelocationAssistance, setNeedRelocationAssistance] = useState("");

  const [applicant, setApplicant] = useState<Applicant>({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    resume: undefined,
    coverLetter: undefined,
  });
  const [resume, setResume] = useState<File | null>(null);
  const { jobId } = useParams();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApplicant((prevApplicant) => ({
      ...prevApplicant,
      [name]: value,
    }));
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!validateForm()) {
      console.log("Form is not valid");
      return;
    }
    let application: Application = {
      jobId: jobId? jobId:"",
      status: "PENDING",
      applicant: applicant,
    };
    const formData = new FormData();
    if(resume)
      formData.append('file', resume);
    formData.append('applicant', JSON.stringify(application));
    axios
      .post("http://localhost:8081/application", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }})
      .then((res) => console.log("SUCCESS"))
      .catch((err) => console.log(err));
  };

  const [formErrors, setFormErrors] = useState({
    email: "",
    phoneNumber: "",
    workedPreviously: "",
    authorizedToWork: "",
    requireSponsorship: "",
    needRelocationAssistance: "",
  });

  const validateForm = () => {
    const errors = {
      email: "",
      phoneNumber: "",
      workedPreviously: "",
      authorizedToWork: "",
      requireSponsorship: "",
      needRelocationAssistance: "",
    };

    let isValid = true;

    // Validate mandatory fields
    if (
      !applicant.firstName ||
      !applicant.lastName ||
      !applicant.email ||
      !applicant.phoneNumber
    ) {
      isValid = false;
    }

    // Validate email format
    if (applicant.email && !isValidEmail(applicant.email)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    // Validate mobile number format
    if (applicant.phoneNumber && !isValidPhoneNumber(applicant.phoneNumber)) {
      errors.phoneNumber =
        "Invalid phone number format. Number should start with +1";
      isValid = false;
    }

    if (!workedPreviously) {
      errors.workedPreviously = "This field is mandatory";
      isValid = false;
    }
    if (!authorizedToWork) {
      errors.authorizedToWork = "This field is mandatory";
      isValid = false;
    }
    if (!requireSponsorship) {
      errors.requireSponsorship = "This field is mandatory";
      isValid = false;
    }
    if (!needRelocationAssistance) {
      errors.needRelocationAssistance = "This field is mandatory";
      isValid = false;
    }
    setFormErrors(errors);

    return isValid;
  };

  const isValidEmail = (email: string) => {
    // Replace with your email validation logic
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    // Replace with your phone number validation logic
    const phoneRegex = /^\+\d{1,3}\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div>
      <NavBar />
      <Container
        sx={{ padding: 2, background: "#fafaff" }}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit}>
          <Typography variant="h4">Apply for this Job</Typography>
          <Typography variant="h5">Job Id: {jobId}</Typography>

          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            margin="normal"
            variant="outlined"
            value={applicant?.firstName}
            onChange={handleInputChange}
            required
          />

          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            margin="normal"
            variant="outlined"
            value={applicant?.lastName}
            onChange={handleInputChange}
            required
          />

          <TextField
            label="Mobile"
            name="phoneNumber"
            fullWidth
            margin="normal"
            variant="outlined"
            value={applicant?.phoneNumber}
            onChange={handleInputChange}
            required
            error={Boolean(formErrors.phoneNumber)}
          />
          {formErrors.phoneNumber && (
            <FormHelperText error>{formErrors.phoneNumber}</FormHelperText>
          )}

          <TextField
            label="Email"
            name="email"
            fullWidth
            margin="normal"
            variant="outlined"
            value={applicant?.email}
            onChange={handleInputChange}
            required
            error={Boolean(formErrors.phoneNumber)}
          />
          {formErrors.email && (
            <FormHelperText error>{formErrors.email}</FormHelperText>
          )}

          <TextField
            label="Address"
            name="address"
            fullWidth
            margin="normal"
            variant="outlined"
            value={applicant?.address}
            onChange={handleInputChange}
          />

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(formErrors.workedPreviously)}
          >
            <InputLabel>
              Have you ever worked for our company previously
            </InputLabel>
            <Select
              value={workedPreviously}
              onChange={(e) => setWorkedPreviously(e.target.value)}
              label="Have you ever worked for our company previously?"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {formErrors.workedPreviously && (
              <FormHelperText error>
                {formErrors.workedPreviously}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(formErrors.authorizedToWork)}
          >
            <InputLabel>
              Are you authorized to work in the United States?
            </InputLabel>
            <Select
              value={authorizedToWork}
              onChange={(e) => setAuthorizedToWork(e.target.value)}
              label="Are you authorized to work in the United States?"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {formErrors.authorizedToWork && (
              <FormHelperText error>
                {formErrors.authorizedToWork}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(formErrors.requireSponsorship)}
          >
            <InputLabel>
              Will you now, or in the future, require sponsorship to work in the
              United States?
            </InputLabel>
            <Select
              value={requireSponsorship}
              onChange={(e) => setRequireSponsorship(e.target.value)}
              label="Will you now, or in the future, require sponsorship to work in the
              United States?"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {formErrors.requireSponsorship && (
              <FormHelperText error>
                {formErrors.requireSponsorship}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl
            fullWidth
            margin="normal"
            variant="outlined"
            error={Boolean(formErrors.needRelocationAssistance)}
          >
            <InputLabel>
              Will you need relocation assistance to work at this role's
              specified location?
            </InputLabel>
            <Select
              value={needRelocationAssistance}
              onChange={(e) => setNeedRelocationAssistance(e.target.value)}
              label="Will you need relocation assistance to work at this role's
              specified location?"
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
            {formErrors.needRelocationAssistance && (
              <FormHelperText error>
                {formErrors.needRelocationAssistance}
              </FormHelperText>
            )}
          </FormControl>

          <Typography variant="h6" sx={{ mt: 2 }}>
            US Voluntary Demographic Question
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>Voluntary Self-Identification</Typography>
          <Typography variant="body2">
            Our vision at Skllmatch is to bring out the best in our team members
            by creating a sense of belonging, We are working to better
            understand the diversity of our candidate population. This data will
            also be aggregated and sent to the government for reporting
            purposes. Please know that the completion of this form is entirely
            voluntary. Your personally identifiable information (name, address,
            etc) will not be considered in the hiring process or thereafter. Any
            information that you choose to provide will be recorded and
            maintained in a confidential file for XX time.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>Protected Veteran</Typography>
          <Typography variant="body2">
            You are a “protected veteran” under United States law if any of the
            following apply to you: Disabled Veteran: a veteran of the U.S.
            military who is entitled to compensation (or who would be entitled
            to compensation if not for the receipt of military retired pay)
            under the administration of the Secretary of Veterans Affairs and/or
            a person who was discharged or released from active duty because of
            a service-connected disability. Recently Separated Veteran: a
            veteran who has discharged or released from active duty in the U.S.
            military within the last three years. Armed Forces Service Medal
            Veteran: a veteran who, while serving on active duty in the U.S.
            military, participated in a U.S. military operation for which an
            Armed Forces Service Medal was awarded pursuant to Executive Order
            12985.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>Disability</Typography>
          <Typography variant="body2">
            Under U.S. law, you are considered to have a disability if you have
            a physical or mental impairment or medical condition that
            substantially limits a major life activity, or if you have a history
            or record of such an impairment or medical condition. Identifying
            yourself as an individual with a disability is voluntary, and we
            hope that you will choose to do so. Your answer will be maintained
            confidentially and will not be seen by selecting officials or anyone
            else involved in making personnel decisions, nor will it be shared
            with our accommodations team . Completing the form will not
            negatively impact you in any way, regardless of whether you have
            self-identified in the past.
          </Typography>
          {/* Radio buttons for gender */}
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">Gender (Select one)</FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="I don't wish to answer"
                control={<Radio />}
                label="I don't wish to answer"
              />
            </RadioGroup>
          </FormControl>

          {/* Radio buttons for race/ethnicity */}
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">
              Please identify your race/ethnicity (Select one)
            </FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="American Indian or Alaskan Native"
                control={<Radio />}
                label="American Indian or Alaskan Native"
              />
              <FormControlLabel
                value="Asian"
                control={<Radio />}
                label="Asian"
              />
              <FormControlLabel
                value="Black or African American"
                control={<Radio />}
                label="Black or African American"
              />
              <FormControlLabel
                value="Native Hawaiian or Other Pacific Islander"
                control={<Radio />}
                label="Native Hawaiian or Other Pacific Islander"
              />
              <FormControlLabel
                value="Two or More Races"
                control={<Radio />}
                label="Two or More Races"
              />
              <FormControlLabel
                value="White"
                control={<Radio />}
                label="White"
              />
              <FormControlLabel
                value="NA"
                control={<Radio />}
                label="I don't wish to answer"
              />
            </RadioGroup>
          </FormControl>

          {/* Radio buttons for protected veteran status */}
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">
              Are you a protected veteran? (Select one)
            </FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="I identify as one or more of the above categories of 'protected veteran'"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="I do not fall into one of the above categories of 'protected veteran'"
              />
              <FormControlLabel
                value="NA"
                control={<Radio />}
                label="I previously served in the military (US), but none of the above apply to me."
              />
              <FormControlLabel
                value="I don't wish to answer"
                control={<Radio />}
                label="I don't wish to answer"
              />
            </RadioGroup>
          </FormControl>

          {/* Radio buttons for disability */}
          <FormControl component="fieldset" fullWidth margin="normal">
            <FormLabel component="legend">
              Do you have a disability? (Select one)
            </FormLabel>
            <RadioGroup>
              <FormControlLabel
                value="Yes"
                control={<Radio />}
                label="Yes, I have a disability, or have a history/record of having a disability"
              />
              <FormControlLabel
                value="No"
                control={<Radio />}
                label="No, I don’t have a disability, or a history/record of having a disability"
              />
              <FormControlLabel
                value="I don't wish to answer"
                control={<Radio />}
                label="I don't wish to answer"
              />
            </RadioGroup>
          </FormControl>

          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeChange}
            style={{ display: "none" }}
            id="resume-upload"
          />
          <Stack direction="row" sx={{ mt: "16px" }} spacing={2}>
            {resume?.name && (
              <Typography variant="body2">Resume: {resume.name}</Typography>
            )}
            <label htmlFor="resume-upload">
              <Button component="span" variant="outlined" color="primary">
                Upload Resume (PDF)
              </Button>
            </label>
            <Button
              type="submit"
              variant="contained"
              color="success"
              onClick={validateForm}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Container>
    </div>
  );
}
