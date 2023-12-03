import React, { useCallback, useReducer, useRef, useState } from "react";
import {
  Grid,
  Container,
  LinearProgress,
  Typography,
  Divider,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NavBar from "./common/NavBar";
import { useLoginContext } from "../hooks/useLoginContext";
import { useParams } from "react-router-dom";
import ApplicantResume from "./job-applicants/ApplicantResume";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./styles/ApplicantInfo.css";
import { useApplicationsContext } from "../hooks/ApplicationsContext";
import { useJobsContext } from "../hooks/JobsContext";
import CurrentStageChip from "./common/CurrentStageChip";
import CurrentStageChipOverview from "./common/CurrentStageChipOverview";
import usePutApplicationsByJob from "../hooks/usePutApplication";
import useResume from "../hooks/useResume";

const ApplicantInfo = () => {
  // const { isLogin, setIsLogin } = useLoginContext();
  // const navigate = useNavigate();
  // const [alert, setAlert] = useState(false);

  // useEffect(() => {
  //     if (!isLogin) navigate("/login");
  // }, [isLogin, navigate]);

  const { applicationId } = useParams<{ applicationId: string }>();
  const { resume } = useResume(applicationId);
  console.log(resume);
  const { applications } = useApplicationsContext();
  const { jobs } = useJobsContext();

  let filteredApplications: any = [];
  let filteredJobs: any = [];

  if (applications.length > 0) {
    filteredApplications = applications.filter(
      (application) => application.applicationId == applicationId
    );
  }
  if (filteredApplications.length > 0) {
    filteredJobs = jobs.filter(
      (job) => job.jobId == filteredApplications[0].jobId
    );
    console.log("Filtering jobs");
  }

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log("Applications: ");
  console.log(applications);
  console.log("Filtered: ");
  console.log(filteredApplications?.[0]);
  console.log("Jobs: ");
  console.log(jobs);
  console.log("Filtered Jobs: ");
  console.log(filteredJobs?.[0]);

  const {
    updateApplicationStatus,
    isLoading,
    error: updateError,
  } = usePutApplicationsByJob();

  type ApplicationStatus =
    | "PENDING"
    | "REJECTED"
    | "INTERVIEWING"
    | "SELECTED"
    | "SHORTLISTED"
    | "WITHDRAWN";
  const handleUpdateApplicationStatus = async (
    applicationId: string,
    newStatus: ApplicationStatus
  ) => {
    await updateApplicationStatus(applicationId, newStatus);
  };

  const [loadingClick, setLoadingClick] = useState(false);

  if (filteredJobs.length > 0 && filteredApplications.length > 0) {
    let activeChipClass = "";
    let activeChipId = -1;
    switch (filteredApplications?.[0].status) {
      case "REJECTED":
        activeChipClass = "stageSelectedRejected";
        activeChipId = 0;
        break;
      case "PENDING":
        activeChipClass = "stageSelectedPending";
        activeChipId = 1;
        break;
      case "INTERVIEWING":
        activeChipClass = "stageSelectedInterviewing";
        activeChipId = 2;
        break;
      case "SELECTED":
        activeChipClass = "stageSelectedSent";
        activeChipId = 3;
        break;
      case "SHORTLISTED":
        activeChipClass = "stageSelectedShortlisted";
        activeChipId = 4;
        break;
      case "WITHDRAWN":
        activeChipClass = "stageSelectedWithdrawn";
        activeChipId = 5;
        break;
      default:
    }

    const handleRejectButton = async (e: any) => {
      e.preventDefault();
      setLoadingClick(true);
      let applicationIDToUpdate: string = filteredApplications[0].applicationId;
      await handleUpdateApplicationStatus(applicationIDToUpdate, "REJECTED");
      window.location.reload();
    };

    const handleMoveForwardButton = async (e: any) => {
      e.preventDefault();
      setLoadingClick(true);
      let applicationIDToUpdate: string = filteredApplications[0].applicationId;
      let nextStatus: ApplicationStatus;
      switch (filteredApplications[0].status) {
        case "PENDING":
          nextStatus = "INTERVIEWING";
          break;
        case "INTERVIEWING":
          nextStatus = "SHORTLISTED";
          break;
        case "SHORTLISTED":
          nextStatus = "SELECTED";
          break;
        default:
          throw new Error(
            "Unhandled case of application status not valid in button handling"
          );
      }
      await handleUpdateApplicationStatus(applicationIDToUpdate, nextStatus);
      window.location.reload();
    };

    const datePosted = new Date(filteredJobs?.[0].datePosted);
    const dateDeadline = new Date(filteredJobs?.[0].deadline);
    const currentTime = new Date();
    let timeLeftTilDeadline = null;
    let colorProgressBar: any = "info";
    if (!isNaN(datePosted.getTime()) && !isNaN(dateDeadline.getTime())) {
      const totalDuration = dateDeadline.getTime() - datePosted.getTime();
      const timeElapsed = currentTime.getTime() - datePosted.getTime();
      const timeRemaining = totalDuration - timeElapsed;
      const percentTimeLeft = (timeRemaining / totalDuration) * 100;
      timeLeftTilDeadline = Math.floor(
        Math.min(Math.max(percentTimeLeft, 0), 100)
      );
      if (100 - timeLeftTilDeadline > 90) {
        colorProgressBar = "error";
      } else if (100 - timeLeftTilDeadline > 80) {
        colorProgressBar = "warning";
      }
    }

    return (
      <>
        <NavBar />
        <Container maxWidth="xl" style={{ marginTop: "5em" }}>
          <Grid container spacing={1}>
            <Grid item xs={5}>
              <Paper
                elevation={1}
                style={{ padding: "1.5em", marginRight: "2em" }}
              >
                <Grid item xs={12}>
                  <h2>
                    {filteredApplications?.[0].applicant.firstName +
                      " " +
                      filteredApplications?.[0].applicant.lastName}{" "}
                  </h2>
                  <h3>
                    {filteredApplications?.[0].applicant.actualEmployer &&
                    filteredApplications?.[0].applicant.actualJobTitle
                      ? filteredApplications?.[0].applicant.actualJobTitle +
                        " @ " +
                        filteredApplications?.[0].applicant.actualEmployer
                      : null}
                  </h3>
                  <CurrentStageChipOverview
                    activeLabel={filteredApplications?.[0].status}
                    activeClass={activeChipClass}
                  />

                  <br />
                  <Divider style={{ marginTop: "1em" }} />
                  <h4>Contact Info</h4>
                  <p>
                    <span className="contactInfoHeader">Address:</span>{" "}
                    {filteredApplications?.[0].applicant.address}
                  </p>
                  <p>
                    <span className="contactInfoHeader">Email:</span>{" "}
                    {filteredApplications?.[0].applicant.email}
                  </p>
                  <p>
                    <span className="contactInfoHeader">Phone:</span>{" "}
                    {filteredApplications?.[0].applicant.phoneNumber}
                  </p>
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={7}>
              <Grid item xs={12}>
                <Box sx={{ width: "100%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab label="Hiring Progress" {...a11yProps(0)} />
                      <Tab label="Resume" {...a11yProps(1)} />
                      <Tab label="Job Description" {...a11yProps(2)} />
                    </Tabs>
                  </Box>
                  <CustomTabPanel value={value} index={0}>
                    <p style={{ fontWeight: 300 }}>
                      <span style={{ fontWeight: 600 }}>Applied for: </span>
                      {filteredJobs?.[0].title} @ {filteredJobs?.[0].location}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1.5em",
                      }}
                    >
                      <div style={{ flexShrink: 0 }}>
                        <span style={{ fontWeight: 600 }}>Deadline: </span>
                        <span style={{ fontWeight: 300 }}>
                          {dateDeadline.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                          })}
                        </span>
                      </div>
                      {timeLeftTilDeadline != null ? (
                        <div
                          style={{
                            flexGrow: 1,
                            minWidth: "50px",
                          }}
                        >
                          <LinearProgress
                            variant="determinate"
                            color={colorProgressBar}
                            value={100 - timeLeftTilDeadline}
                          />
                        </div>
                      ) : null}
                    </div>

                    <br />
                    <p style={{ fontWeight: 600 }}>Current Stage:</p>
                    <Grid container maxWidth={"xl"}>
                      <Grid item xs={3}>
                        {activeChipId == 1 ? (
                          <CurrentStageChip
                            activeLabel="Application Pending"
                            activeClass="stageSelectedPending"
                            isActive={true}
                          />
                        ) : (
                          <CurrentStageChip
                            activeLabel="Application Pending"
                            activeClass="stageSelectedPending"
                            isActive={false}
                          />
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        {activeChipId == 2 ? (
                          <CurrentStageChip
                            activeLabel="Interviewing"
                            activeClass="stageSelectedInterviewing"
                            isActive={true}
                          />
                        ) : (
                          <CurrentStageChip
                            activeLabel="Interviewing"
                            activeClass="stageSelectedInterviewing"
                            isActive={false}
                          />
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        {activeChipId == 4 ? (
                          <CurrentStageChip
                            activeLabel="Shortlisted"
                            activeClass="stageSelectedShortlisted"
                            isActive={true}
                          />
                        ) : (
                          <CurrentStageChip
                            activeLabel="Shortlisted"
                            activeClass="stageSelectedShortlisted"
                            isActive={false}
                          />
                        )}
                      </Grid>
                      <Grid item xs={3}>
                        {activeChipId == 3 ||
                        activeChipId == 5 ||
                        activeChipId == 0 ? (
                          <CurrentStageChip
                            activeLabel="Offer Sent / Declined"
                            activeClass={activeChipClass}
                            isActive={true}
                          />
                        ) : (
                          <CurrentStageChip
                            activeLabel="Offer Sent / Declined"
                            activeClass={activeChipClass}
                            isActive={false}
                          />
                        )}
                      </Grid>
                    </Grid>
                    <br />

                    <Grid container maxWidth={"xl"}>
                      <Grid item xs={4}>
                        {activeChipId != 0 &&
                        activeChipId != 5 &&
                        activeChipId != 3 ? (
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            style={{ marginRight: "1em" }}
                            onClick={handleMoveForwardButton}
                          >
                            Move to Next Stage
                          </Button>
                        ) : null}
                        {activeChipId != 0 && activeChipId != 5 ? (
                          <Button
                            // variant="outlined"
                            color="error"
                            size="small"
                            onClick={handleRejectButton}
                          >
                            Reject
                          </Button>
                        ) : null}
                        <CircularProgress
                          id="handleButtonLoadingCircle"
                          className={loadingClick ? "" : "loadingInvisible"}
                        />
                      </Grid>
                    </Grid>
                    <br />
                    <Divider />
                    <br />
                    <h3>Notes</h3>
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={1}>
                    {filteredApplications?.[0].applicant.resume ? (
                      <ApplicantResume base64={resume} />
                    ) : (
                      <p>No Resume provided</p>
                    )}
                  </CustomTabPanel>
                  <CustomTabPanel value={value} index={2}>
                    <p>
                      <span style={{ fontWeight: 600 }}>Job Title:</span>{" "}
                      {filteredJobs?.[0].title}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>Location:</span>{" "}
                      {filteredJobs?.[0].location}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>Date Posted:</span>{" "}
                      {datePosted.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>Deadline:</span>{" "}
                      {dateDeadline.toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>Salary ($):</span>{" "}
                      {filteredJobs?.[0].salary}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>Type:</span>{" "}
                      {filteredJobs?.[0].type}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>Tag:</span>{" "}
                      {filteredJobs?.[0].tag}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>
                        Desired Experience:
                      </span>{" "}
                      {filteredJobs?.[0].experience}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>Skills: </span>
                      {console.log(filteredJobs?.[0].skillsRequired)}
                      {filteredJobs?.[0].skillsRequired.map((skill: any) => {
                        return <span>{skill} </span>;
                      })}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>
                        Required Qualifications:
                      </span>{" "}
                      {filteredJobs?.[0].requiredQualifications}
                    </p>
                    <p>
                      <span style={{ fontWeight: 600 }}>Description:</span>{" "}
                      {filteredJobs?.[0].description}
                    </p>
                  </CustomTabPanel>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  } else {
    return <div>Skeleton</div>;
  }
};
export default ApplicantInfo;
