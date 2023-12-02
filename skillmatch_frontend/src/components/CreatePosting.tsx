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
import { useLoginContext } from "../hooks/useLoginContext";
import { useNavigate } from "react-router-dom";

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

const CreatePosting = () => {
  const { isLogin, setIsLogin } = useLoginContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [requiredQualifications, setRequiredQualifications] = useState("");
  const [tag, setTag] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>([]);
  // const _class = "com.iterators.skillmatch.model.Job";

  const [alert, setAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const alertStatus = alertMsg.includes("fail") ? "Warning" : "Success";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const now = new Date();
    const datePosted = now.toString;

    const newJob = {
      title: title,
      datePosted: datePosted,
      deadline: deadline,
      description: description,
      skillsRequired: skillsRequired,
      location: location,
      requiredQualifications: requiredQualifications,
      requiredDocuments: requiredDocuments,
      tag: tag,
      experience: experience,
      type: type,
    };

    apiClient
      .post("/job", newJob)
      .then(() => setAlertMsg("Job posting created successfully"))
      .catch((err) => setAlertMsg("Job posting created failure"))
      .finally(() => setAlert(true));
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ padding: "32px", background: "#fafaff" }}>
        {(alert && alertStatus==="Warning") && (
          <Alert
            severity="warning"
            sx={{ position: "sticky", top: 80, zIndex: "1" }}
            onClose={() => setAlert(false)}
          >
            <AlertTitle>{alertStatus}</AlertTitle>
            {alertMsg}
          </Alert>
        )}
        {(alert && alertStatus==="Success") && (
          <Alert
            severity="info"
            sx={{ position: "sticky", top: 80, zIndex: "1" }}
            onClose={() => setAlert(false)}
          >
            <AlertTitle>{alertStatus}</AlertTitle>
            {alertMsg}
          </Alert>
        )}
        <Typography variant="h4" color={"#30343f"}>
          Create a Job Posting
        </Typography>
        <form onSubmit={handleSubmit} style={{ padding: "16px" }}>
          <Grid container rowGap={2} alignItems="center">
            <Grid item xs={grid_xs_1}>
              <Typography variant="h6">Job Title</Typography>
            </Grid>
            <Grid item sm={grid_xs_2}>
              <TextField
                type="text"
                placeholder="Enter job title"
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setType(e.target.value as string)}
                fullWidth
                required
                displayEmpty
              >
                <MenuItem value="" disabled>
                  - Choose One -
                </MenuItem>
                <MenuItem value="full-time">Full-time</MenuItem>
                <MenuItem value="part-time">Part-time</MenuItem>
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
                filterSelectedOptions
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
                onChange={(e) => setSalary(e.target.value)}
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
                placeholder="Enter location"
                onChange={(e) => setDeadline(e.target.value)}
                value={deadline}
                fullWidth
                required
              ></TextField>
            </Grid>
            <Grid item xs={grid_xs_1}>
              <Typography variant="h6">Description</Typography>
            </Grid>
            <Grid item xs={grid_xs_2}>
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
              Create new job posting
            </Button>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default CreatePosting;
