import {
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import { Job } from "../../hooks/useJobs";
import ActionButton from "../common/ActionButton";

interface Props {
  job: Job;
  onEdit: (title: string) => void;
  onDelete: (title: string) => void;
}

const JobCard = ({ job, onEdit, onDelete }: Props) => {
  return (
    <Card elevation={4} sx={{ mb: "15px" }}>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography>
          {job.type} - {job.location}
        </Typography>
        <Typography variant="body2">{job.description}</Typography>
        <Typography></Typography>
      </CardContent>
      <CardActions>
        <ActionButton href={"/job/" + job.jobId}>View job</ActionButton>
        <ActionButton onClick={() => onEdit(job.jobId)}>
          Edit posting
        </ActionButton>
        <ActionButton onClick={() => onDelete(job.jobId)}>
          Delete posting
        </ActionButton>
      </CardActions>
    </Card>
  );
};

export default JobCard;
