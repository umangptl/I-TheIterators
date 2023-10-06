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
}));
ActionButton.defaultProps = {
  variant: "contained",
  color: "secondary",
  component: Link,
  size: "small",
};

export interface Job {
  title: string;
  type: string;
  department: string;
  location: string;
  experience: string;
  applicantNo: number;
  creationDate: string;
  lastApplicationDate: string;
  description: string;
}

interface Props {
  details: Job;
  onEdit: (title: string) => void;
  onDelete: (title: string) => void;
}

const JobCard = ({ details, onEdit, onDelete }: Props) => {
  return (
    <Card elevation={6} sx={{ mb: "15px" }}>
      <CardContent>
        <Typography variant="h5">{details.title}</Typography>
        <Typography>
          {details.type} - {details.location}
        </Typography>
        <Typography variant="body2">{details.description}</Typography>
        <Typography></Typography>
      </CardContent>
      <CardActions>
        <ActionButton to="/job-detail">View details</ActionButton>
        <ActionButton onClick={() => onEdit(details.title)}>
          Edit posting
        </ActionButton>
        <ActionButton onClick={() => onDelete(details.title)}>
          Delete posting
        </ActionButton>
      </CardActions>
    </Card>
  );
};

export default JobCard;
