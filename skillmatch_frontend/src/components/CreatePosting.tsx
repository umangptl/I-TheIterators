import {
  Autocomplete,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "./common/NavBar";
import JobDetails from "./job-posting/JobDetails";
import { useState } from "react";

const grid_xs_1 = 5;
const grid_xs_2 = 7;

const CreatePosting = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [deadline, setDeadline] = useState("");
  const [description, setDescription] = useState("");
  const [skillsRequired, setSkillsRequired] = useState<string[]>([]);
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [requiredQualifications, setRequiredQualifications] = useState("");
  const [tag, setTag] = useState("");
  const [requiredDocuments, setRequiredDocuments] = useState<string[]>([]);
  const _class = "com.iterators.skillmatch.model.Job";

  //   console.log(skillsRequired);

  return (
    <>
      <NavBar />
      <Container maxWidth="md">
        <Grid container rowGap={2} alignItems="center">
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Job Title</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
            <TextField
              type="text"
              placeholder="Enter job title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Job Type</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
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
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
            </Select>
          </Grid>
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Tag</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
            <TextField
              type="text"
              placeholder="Enter tag"
              onChange={(e) => setTag(e.target.value)}
              value={tag}
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Location</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
            <TextField
              type="text"
              placeholder="Enter location"
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              fullWidth
              required
            ></TextField>
          </Grid>
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Experience</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
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
              <MenuItem value="2 years">1 years</MenuItem>
              <MenuItem value="3+ years">3+ years</MenuItem>
            </Select>
          </Grid>
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Experience</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
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
              <MenuItem value="2 years">1 years</MenuItem>
              <MenuItem value="3+ years">3+ years</MenuItem>
            </Select>
          </Grid>
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Skills</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
            <Autocomplete
              multiple
              limitTags={3}
              options={["a", "b", "c", "d", "e"]}
              filterSelectedOptions
              fullWidth
              renderInput={(params) => (
                <TextField {...params} label="label" placeholder="Skill" />
              )}
              onChange={(event, value) => {
                setSkillsRequired(value);
              }}
            ></Autocomplete>
          </Grid>
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Application deadline</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
            <TextField
              type="date"
              placeholder="Enter location"
              onChange={(e) => setDeadline(e.target.value)}
              value={deadline}
              fullWidth
              required
            ></TextField>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreatePosting;
