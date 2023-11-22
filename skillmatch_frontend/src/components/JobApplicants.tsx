import { useNavigate, useParams } from "react-router-dom";
import useApplicationsByJob from "../hooks/useApplicationsByJob";
import NavBar from "./common/NavBar";
import { useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextFilter from "./all-jobs/TextFilter";
import SelectFilter from "./all-jobs/SelectFilter";
import MultiSelectFilter from "./all-jobs/MultiSelectFilter";
import { useLoginContext } from "../hooks/useLoginContext";
import usePosting, { defaultJob } from "../hooks/usePosting";
import ApplicationCard from "./job-applicants/ApplicationCard";

const drawerWidth = "300px";

const JobApplicants = () => {
  const { isLogin, setIsLogin } = useLoginContext();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  const { jobId } = useParams();

  const { applications } = useApplicationsByJob(jobId as string);
  const { job } = usePosting(jobId as string);
  console.log(applications);

  let filteredApplications = applications;

  const [nameFilter, setNameFilter] = useState("");
  filteredApplications = nameFilter
    ? filteredApplications.filter((application) => {
        const name = (
          application.applicant?.firstName + application.applicant?.lastName
        ).toLowerCase();

        return name.includes(nameFilter.toLowerCase());
      })
    : filteredApplications;

  const [jobTitleFilter, setJobTitleFilter] = useState("");
  filteredApplications = jobTitleFilter
    ? filteredApplications.filter((application) =>
        application.applicant.actualJobTitle
          .toLowerCase()
          .includes(jobTitleFilter.toLowerCase())
      )
    : filteredApplications;

  const [actualEmployerFilter, setActualEmployerFilter] = useState("");
  filteredApplications = actualEmployerFilter
    ? filteredApplications.filter((application) =>
        application.applicant.actualEmployer
          .toLowerCase()
          .includes(actualEmployerFilter.toLowerCase())
      )
    : filteredApplications;

  const [addressFilter, setAddressFilter] = useState("");
  filteredApplications = addressFilter
    ? filteredApplications.filter((application) =>
        application.applicant.address
          .toLowerCase()
          .includes(addressFilter.toLowerCase())
      )
    : filteredApplications;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filterDrawer = (
    <Stack direction={"column"} spacing={4} sx={{ mt: 1, p: 2 }}>
      <TextFilter
        label="Applicant Name"
        onChange={(text) => setNameFilter(text)}
      ></TextFilter>
      <TextFilter
        label="Actual Job Title"
        onChange={(text) => setJobTitleFilter(text)}
      ></TextFilter>
      <TextFilter
        label="Actual Employer"
        onChange={(text) => setActualEmployerFilter(text)}
      ></TextFilter>
      <TextFilter
        label="Address"
        onChange={(text) => setAddressFilter(text)}
      ></TextFilter>
    </Stack>
  );

  return (
    <>
      <NavBar />
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
            sx={{ px: 1, py: 2, mt: 2 }}
          >
            {filteredApplications.map((application) => (
              <ApplicationCard
                application={application}
                job={job !== undefined ? job : defaultJob}
                key={application.applicationId}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default JobApplicants;
