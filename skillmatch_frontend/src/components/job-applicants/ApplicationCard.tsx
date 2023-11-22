import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { useLoginContext } from "../../hooks/useLoginContext";
import LinkButton from "../common/LinkButton";
import { Application } from "../../models/Application";
import { Job } from "../../models/Job";

interface Props {
  application: Application;
  job: Job;
  //   onDelete: (title: string) => void;
}

const ApplicationCard = ({ application, job }: Props) => {
  const { isLogin } = useLoginContext();
  const applicant = application.applicant;
  if (applicant === undefined) {
    return <></>;
  }

  return (
    <Card elevation={2} sx={{ padding: 2, backgroundColor: "#fafaff" }}>
      <CardContent>
        <Typography variant="h5">
          {applicant.firstName} {applicant.lastName}
        </Typography>
        <Typography>
          {applicant.actualJobTitle} at {applicant.actualEmployer}
        </Typography>
        <Typography>{job.title}</Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <LinkButton to={"/applicant/"}>View details</LinkButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default ApplicationCard;
