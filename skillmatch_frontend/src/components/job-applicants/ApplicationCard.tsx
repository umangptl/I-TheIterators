import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useLoginContext } from "../../hooks/useLoginContext";
import LinkButton from "../common/LinkButton";
import { Job } from "../../models/Job";
import { Applicant } from "../../models/Applicant";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";

interface Props {
  application: Application;
  job: Job | undefined;
}

export interface Application {
  applicationId: string;
  status: string;
  jobId: string;
  applicantId: string;
  applicant: Applicant;
}

const ApplicationCard = ({ application, job }: Props) => {
  const { isLogin } = useLoginContext();
  if (application === undefined) {
    return <></>;
  }
  const applicant = application.applicant;

  const getStatusIcon = (status: any) => {
    switch (status) {
      case "SELECTED":
        return <CheckCircleIcon color="primary" />;
      case "REJECTED":
        return <ErrorIcon color="error" />;
      case "PENDING":
        return <HourglassEmptyIcon color="info" />;
      case "SHORTLISTED":
        return <PlaylistAddCheckIcon color="warning" />;
      default:
        return <PlaylistAddCheckIcon color="warning" />;
    }
  };

  return (
    <Card elevation={2} sx={{ padding: 2, backgroundColor: "#fafaff" }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography variant="h5">
              {applicant.firstName} {applicant.lastName}
            </Typography>
            <Typography>
              {applicant.actualJobTitle !== "" &&
              applicant.actualJobTitle !== null &&
              applicant.actualJobTitle.toLowerCase() !== "unemployed" ? (
                <>
                  {applicant.actualJobTitle} at {applicant.actualEmployer}
                </>
              ) : (
                "Unemployed"
              )}
            </Typography>
            <Typography>
              {applicant.phoneNumber} | {applicant.email}
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5">{job?.title}</Typography>
            <Chip
                label={application.status.toUpperCase()}
                color="primary"
                size="medium"
                icon={getStatusIcon(application.status)}
                sx={{mt:1.5}}
              />
            {/* <Typography>{application.status}</Typography> */}
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <LinkButton to={"/applicant/" + application.applicationId}>
            View details
          </LinkButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ApplicationCard;
