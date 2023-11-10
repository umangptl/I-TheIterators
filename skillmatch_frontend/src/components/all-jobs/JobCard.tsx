import {
  Box,
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
import { useLoginContext } from "../../hooks/useLoginContext";
import { Link } from "react-router-dom";
import ActionLinkButton from "../common/ActionLinkButtom";

interface Props {
  job: Job;
  onDelete: (title: string) => void;
}

const JobCard = ({ job, onDelete }: Props) => {
  const { isLogin } = useLoginContext();

  return (
    <Card elevation={4} sx={{ mb: "15px" }}>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography>
          {job.type} - {job.location}
        </Typography>
        <Box maxHeight={"60px"} overflow="hidden" textOverflow={"ellipsis"}>
          <Typography
            variant="body2"
            sx={{
              cursor: "default",
              overflow: "hidden",
              textOverflow: "ellipsis",
              height: "100%",
            }}
          >
            {job.description}
          </Typography>
        </Box>
        <Typography></Typography>
      </CardContent>
      <CardActions>
        <ActionLinkButton to={"/job/" + job.jobId}>
          View details
        </ActionLinkButton>
        {isLogin && (
          <>
            <ActionLinkButton to={"/edit-job/" + job.jobId}>
              Edit posting
            </ActionLinkButton>
            <ActionButton onClick={() => onDelete(job.jobId)}>
              Delete posting
            </ActionButton>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default JobCard;
