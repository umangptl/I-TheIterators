import {
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

const ActionButton = styled(Button)<ButtonProps>(({ theme }) => ({
  borderRadius: 0,
  marginLeft: "8px",
  marginBottom: "8px",
}));
ActionButton.defaultProps = {
  variant: "contained",
  color: "secondary",
  size: "small",
};

export interface Job {
  jobId: string;
  title: string;
  datePosted: string;
  deadline: string;
  description: string;
  skillsRequired: string[];
  location: string;
  requiredQualifications: string;
  hiringTeamInfo: string;
  requiredDocuments: string;
  tag: string;
  experience: string;
  //applicantNo: number;
  type: string;
  //department: string;
}

interface Props {
  job: Job;
  onEdit: (title: string) => void;
  onDelete: (title: string) => void;
}

const JobCard = ({ job, onEdit, onDelete }: Props) => {
  return (
    <Card elevation={6} sx={{ mb: "15px" }}>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography>
          {job.type} - {job.location}
        </Typography>
        <Typography variant="body2">{job.description}</Typography>
        <Typography></Typography>
      </CardContent>
      <CardActions>
        <ActionButton href="/job">View job</ActionButton>
        <ActionButton onClick={() => onEdit(job.title)}>
          Edit posting
        </ActionButton>
        <ActionButton onClick={() => onDelete(job.title)}>
          Delete posting
        </ActionButton>
      </CardActions>
    </Card>
  );
};

export default JobCard;
