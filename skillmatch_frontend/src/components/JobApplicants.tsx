import { useNavigate, useParams } from "react-router-dom";
import useApplicationsByJob from "../hooks/useApplicationsByJob";
import NavBar from "./common/NavBar";
import { CSSProperties, useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TextFilter from "./all-jobs/TextFilter";
import SelectFilter from "./all-jobs/SelectFilter";
import { useLoginContext } from "../hooks/useLoginContext";
import ApplicationCard from "./job-applicants/ApplicationCard";
import useJobs from "../hooks/useJobs";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import "./job-applicants/styles.css";

const drawerWidth = "300px";

const JobApplicants = () => {
  const { isLogin, setIsLogin } = useLoginContext();
  const navigate = useNavigate();
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (!isLogin) navigate("/login");
  }, [isLogin, navigate]);

  const { jobId } = useParams();
  const { applications, setApplications } = useApplicationsByJob("-1");
  const { jobs } = useJobs();

  let filteredApplications = applications;

  const [positionFilter, setPositionFilter] = useState("");

  useEffect(() => {
    if (jobs.length !== 0 && jobId !== undefined) {
      const initialJob = jobs.find((job) => job.jobId === jobId)
        ?.title as string;
      setPositionFilter(initialJob);
    }
  }, [jobs, jobId]);

  filteredApplications = positionFilter
    ? filteredApplications.filter((application) => {
        const position = jobs
          .find((job) => job.jobId === application.jobId)
          ?.title.toLowerCase();
        if (position === undefined) {
          return false;
        }
        return position.includes(positionFilter.toLowerCase());
      })
    : filteredApplications;

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

  const [statusFilter, setStatusFilter] = useState("all");
  const statusOptions = [
    "PENDING",
    "WITHDRAWN",
    "REJECTED",
    "INTERVIEWING",
    "SHORTLISTED",
    "SELECTED",
  ];
  filteredApplications =
    statusFilter !== "all"
      ? filteredApplications.filter(
          (application) => application.status === statusFilter
        )
      : filteredApplications;

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filterDrawer = (
    <Stack direction={"column"} spacing={4} sx={{ mt: 4, p: 2 }}>
      <TextField
        label="Job Posting Title"
        onChange={(e) => setPositionFilter(e.target.value)}
        value={positionFilter}
      ></TextField>
      <TextFilter
        label="Applicant Name"
        onChange={(text) => setNameFilter(text)}
      ></TextFilter>
      <TextFilter
        label="Actual Job Position"
        onChange={(text) => setJobTitleFilter(text)}
      ></TextFilter>
      <TextFilter
        label="Actual Employer"
        onChange={(text) => setActualEmployerFilter(text)}
      ></TextFilter>
      <SelectFilter
        label="Status"
        value={statusFilter}
        options={statusOptions}
        onSelect={(selection) => {
          setStatusFilter(selection);
        }}
      />
    </Stack>
  );

  return (
    <>
      <NavBar />
      <Box
        sx={{
          display: "flex",
          alignItems: "stretch",
          height: "calc(100% - 95px)",
        }}
      >
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
        <Box
          sx={{
            width: { md: `calc(100% - ${drawerWidth})` },
            p: "15px",
            pr: 0,
          }}
        >
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
          <AutoSizer>
            {({ height, width }: { height: number; width: number }) => (
              <List
                className="List"
                height={height}
                itemCount={filteredApplications.length}
                itemSize={185}
                width={width}
              >
                {({
                  index,
                  style,
                }: {
                  index: number;
                  style: CSSProperties;
                }) => (
                  <Box style={style}>
                    <ApplicationCard
                      application={filteredApplications[index]}
                      job={jobs.find(
                        (job) => job.jobId === filteredApplications[index].jobId
                      )}
                    />
                  </Box>
                )}
              </List>
            )}
          </AutoSizer>
        </Box>
      </Box>
    </>
  );
};

export default JobApplicants;
