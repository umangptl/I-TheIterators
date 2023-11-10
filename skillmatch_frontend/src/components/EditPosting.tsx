import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "./common/NavBar";
import { useEffect, useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import React from "react";
import apiClient from "../services/api-client";
import usePosting from "../hooks/usePosting";
import { useNavigate, useParams } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";
import { Job } from "../hooks/useJobs";

const grid_xs_1 = 5;
const grid_xs_2 = 7;

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        valueIsNumericString
        prefix="$"
      />
    );
  }
);

const EditPosting = () => {
  const { isLogin, setIsLogin } = useLoginContext();
  const navigate = useNavigate();

  const { jobId } = useParams();
  const { job, setJob } = usePosting(jobId as string);

  const [type, setType] = useState("");
  const [experience, setExperience] = useState("");
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [salary, setSalary] = useState(0);
  const [location, setLocation] = useState("");
  const [requiredQualifications, setRequiredQualifications] = useState("");
  const [tag, setTag] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>([]);

  const [alert, setAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLogin) navigate("/login");

    if (job !== undefined) {
      setIsLoading(false);

      setType(job.type);
      setExperience(job.experience);
      setTitle(job.title);
      setDescription(job.description);
      setSkillsRequired(job.skillsRequired);
      setSalary(job.salary);
      setLocation(job.location);
      setRequiredDocuments(job.requiredDocuments);
      setRequiredQualifications(job.requiredQualifications);
      setTag(job.tag);

      const inputDate = new Date(job.deadline);
      const year = inputDate.getFullYear();
      const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
      const day = inputDate.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      setDeadline(formattedDate);
    }
  }, [isLogin, job, navigate]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const editedJob = {
      jobId: job?.jobId,
      title: title,
      datePosted: job?.datePosted,
      deadline: deadline,
      description: description,
      skillsRequired: skillsRequired,
      salary: salary,
      location: location,
      requiredQualifications: requiredQualifications,
      requiredDocuments: requiredDocuments,
      tag: tag,
      type: type,
      experience: experience,
    };

    apiClient
      .put("/job", editedJob)
      .then(() => setAlert(true))
      .catch((err) => {});
  };

  return (
    <>
      <NavBar />
      {!isLoading && (
        <Container maxWidth="sm">
          {alert && (
            <Alert
              severity="success"
              sx={{ position: "sticky", top: 80, zIndex: "1" }}
              onClose={() => setAlert(false)}
            >
              <AlertTitle>Success!</AlertTitle>
              Changes to job posting were succesfull!
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container rowGap={2} alignItems="center">
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Job Title</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <TextField
                  type="text"
                  placeholder="Enter job title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Job Type</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  fullWidth
                  required
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    - Choose One -
                  </MenuItem>
                  <MenuItem value="Full time">Full time</MenuItem>
                  <MenuItem value="Part time">Part time</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Tag</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <TextField
                  type="text"
                  placeholder="Enter tag"
                  onChange={(e) => setTag(e.target.value)}
                  value={tag}
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Location</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <TextField
                  type="text"
                  placeholder="Enter location"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Experience</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <Select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as string)}
                  // onChange={(e) => setJob({ ...job, experience: e.target.value })}
                  fullWidth
                  required
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    - Choose One -
                  </MenuItem>
                  <MenuItem value="1 year">1 year</MenuItem>
                  <MenuItem value="2 years">2 years</MenuItem>
                  <MenuItem value="3+ years">3+ years</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Skills</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <Autocomplete
                  multiple
                  value={skillsRequired}
                  limitTags={3}
                  options={[
                    "CPP",
                    "JAVA",
                    "PYTHON",
                    "MYSQL",
                    "NOSQL",
                    "RUBY",
                    "SWIFT",
                    "PHP",
                    "HTML",
                    "TYPESCRIPT",
                    "JAVASCRIPT",
                    "CSS",
                    "REACT",
                  ]}
                  filterSelectedOptions
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Skill" />
                  )}
                  onChange={(event, value) => {
                    setSkillsRequired(value);
                  }}
                ></Autocomplete>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Required Documents</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <Autocomplete
                  multiple
                  limitTags={3}
                  options={["RESUME", "COVER_LETTER"]}
                  value={requiredDocuments}
                  filterSelectedOptions
                  // inputValue="hola"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Document" />
                  )}
                  onChange={(event, value) => {
                    setRequiredDocuments(value);
                  }}
                ></Autocomplete>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Salary</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <TextField
                  placeholder="Enter salary"
                  onChange={(e) => setSalary(parseFloat(e.target.value))}
                  value={salary}
                  fullWidth
                  required
                  name="numberformat"
                  id="formatted-numberformat-input"
                  InputProps={{
                    inputComponent: NumericFormatCustom as any,
                  }}
                ></TextField>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Application deadline</Typography>
              </Grid>
              <Grid item xs={grid_xs_2}>
                <TextField
                  type="date"
                  placeholder="Enter deadline"
                  onChange={(e) => setDeadline(e.target.value)}
                  value={deadline}
                  fullWidth
                  required
                ></TextField>
              </Grid>
              <Grid item xs={grid_xs_1}>
                <Typography variant="h6">Description</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  minRows={10}
                  type="text"
                  placeholder="Enter description"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  fullWidth
                  required
                ></TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} textAlign="center" p={5}>
              <Button type="submit" variant="contained">
                Confirm changes to job posting
              </Button>
            </Grid>
          </form>
        </Container>
      )}
    </>
  );
};

export default EditPosting;
