import { useState } from "react";
import JobCard from "./JobCard";

import {
  Alert,
  AlertTitle,
  Box,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import useJobs from "../../hooks/useJobs";
import SelectFilter from "./SelectFilter";
import TextFilter from "./TextFilter";
import MultiSelectFilter from "./MultiSelectFilter";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import apiClient from "../../services/api-client";
import { Stack } from "@mui/system";

const drawerWidth = "240px";

const AllJobs = () => {
  const { jobs, setJobs, error } = useJobs();
  const [alert, setAlert] = useState(false);

  let filteredJobs = jobs;

  const [titleFilter, setTitleFilter] = useState("");
  filteredJobs = titleFilter
    ? filteredJobs.filter((job) =>
        job.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    : filteredJobs;

  const [locationFilter, setLocationFilter] = useState("");
  filteredJobs = locationFilter
    ? filteredJobs.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      )
    : filteredJobs;

  const [typeFilter, setTypeFilter] = useState("all");
  const typeOptions = [...new Set(jobs.map((job) => job.type))];
  filteredJobs =
    typeFilter !== "all"
      ? filteredJobs.filter((job) => job.type === typeFilter)
      : filteredJobs;

  const [experienceFilter, setExperienceFilter] = useState("all");
  const experienceOptions = ["1 year", "2 years", "3+ years"];
  filteredJobs =
    experienceFilter !== "all"
      ? filteredJobs.filter((job) => job.experience === experienceFilter)
      : filteredJobs;

  const [skillsFilter, setSkillsFilter] = useState<string[]>([]);
  const skillsOptions = [
    ...new Set(
      ([] as string[]).concat(...jobs.map((job) => job.skillsRequired))
    ),
  ];
  filteredJobs =
    skillsFilter.length !== 0
      ? filteredJobs.filter((job) =>
          job.skillsRequired.some((skill) => skillsFilter.includes(skill))
        )
      : filteredJobs;

  const handleDelete = (jobId: string) => {
    const originalJobs = jobs;
    console.log(jobs[0].jobId);
    console.log(jobId);
    setJobs(jobs.filter((job) => job.jobId !== jobId));

    apiClient.delete("/job/" + jobId).catch((err) => {
      setJobs(originalJobs);
    });
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filterDrawer = (
    <Stack direction={"column"} spacing={4} sx={{ mt: 1, p: 2 }}>
      <TextFilter
        label="Job Title"
        onChange={(text) => setTitleFilter(text)}
      ></TextFilter>
      <TextFilter
        label="Location"
        onChange={(text) => setLocationFilter(text)}
      ></TextFilter>
      <SelectFilter
        label="Type"
        value={typeFilter}
        options={typeOptions}
        onSelect={(selection) => {
          setTypeFilter(selection);
          console.log(selection);
        }}
      />
      <SelectFilter
        label="Experience"
        value={experienceFilter}
        options={experienceOptions}
        onSelect={(selection) => {
          setExperienceFilter(selection);
          console.log(selection);
          console.log(filteredJobs);
        }}
      />
      <MultiSelectFilter
        label="Skills"
        options={skillsOptions}
        handleChange={(selection) => {
          setSkillsFilter(selection);
          console.log(selection);
        }}
      />
    </Stack>
  );

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: { md: drawerWidth }, backgroundColor: "#fafaff" }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(!mobileOpen)}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                pt: 8,
              },
            }}
          >
            {filterDrawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                pt: 8,
              },
            }}
            open
          >
            {filterDrawer}
          </Drawer>
        </Box>
        <Box sx={{ p: 3, pt: 0, width: { md: `calc(100% - ${drawerWidth})` } }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            <FilterAltIcon />
            <Typography>Filter jobs</Typography>
          </IconButton>
          {error && <Typography>{error}</Typography>}
          {alert && (
            <Alert
              severity="warning"
              sx={{ position: "sticky", top: 80, zIndex: "1" }}
              onClose={() => setAlert(false)}
            >
              <AlertTitle>Warning</AlertTitle>
              Not implemented yet!
            </Alert>
          )}

          <Stack
            spacing={3}
            alignItems={"stretch"}
            justifyContent={"center"}
            sx={{ px: 1, py: 2 }}
          >
            {filteredJobs.map((job) => (
              <JobCard job={job} key={job.jobId} onDelete={handleDelete} />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AllJobs;
