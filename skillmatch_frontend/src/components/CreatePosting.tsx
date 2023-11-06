import {
  Autocomplete,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "./common/NavBar";
import { useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import React from "react";

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
      <Container maxWidth="sm">
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
                <TextField {...params} placeholder="Skill" />
              )}
              onChange={(event, value) => {
                setSkillsRequired(value);
              }}
            ></Autocomplete>
          </Grid>
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Required Documents</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
            <Autocomplete
              multiple
              limitTags={3}
              options={["RESUME", "CV"]}
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
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Salary</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
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
          <Grid xs={grid_xs_1}>
            <Typography variant="h6">Description</Typography>
          </Grid>
          <Grid xs={grid_xs_2}>
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
      </Container>
    </>
  );
};

export default CreatePosting;
