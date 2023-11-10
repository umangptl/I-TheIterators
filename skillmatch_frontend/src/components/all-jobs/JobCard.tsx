import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Job } from "../../models/Job";

interface Props {
  job: Job;
  onEdit: (title: string) => void;
  onDelete: (title: string) => void;
}

const JobCard = ({ job, onEdit, onDelete }: Props) => {
  return (
    <Card elevation={2} sx={{ backgroundColor: "#fafaff" }}>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography>
          {job.type} - {job.location}
        </Typography>
        <Typography variant="body2">{job.description}</Typography>
        <Typography></Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" href="/job">
            View job
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => onEdit(job.title)}
          >
            Edit posting
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(job.title)}
          >
            Delete posting
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default JobCard;
