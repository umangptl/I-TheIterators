import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { Job } from "../../hooks/useJobs";
import { useLoginContext } from "../../hooks/useLoginContext";

interface Props {
  job: Job;
  onDelete: (title: string) => void;
}

const JobCard = ({ job, onDelete }: Props) => {
  const { isLogin } = useLoginContext();

  return (
    <Card elevation={2} sx={{ padding:2, backgroundColor: "#fafaff" }}>
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
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="success"
            href={"/job/" + job.jobId}
          >
            View details
          </Button>
          {isLogin && (
            <>
              <Button
                variant="contained"
                color="success"
                href={"/edit-job/" + job.jobId}
              >
                Edit posting
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => onDelete(job.jobId)}
              >
                Delete posting
              </Button>
            </>
          )}
        </Stack>
      </CardActions>
    </Card>
  );
};

export default JobCard;
