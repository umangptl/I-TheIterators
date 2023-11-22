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
import { Job } from "../../models/Job";

interface Props {
  job: Job;
  onDelete: (title: string) => void;
}

const JobCard = ({ job, onDelete }: Props) => {
  const { isLogin } = useLoginContext();

  return (
    <Card elevation={2} sx={{ padding: 2, backgroundColor: "#fafaff" }}>
      <CardContent>
        <Typography variant="h5">{job.title}</Typography>
        <Typography>
          {job.type} - {job.location}
        </Typography>
        <Box mt="2  px" mb="5px">
          {job.skillsRequired.map((skill) => (
            <Chip
              key={skill}
              clickable={false}
              label={skill}
              variant="outlined"
              sx={{ mr: "4px" }}
              size="small"
            ></Chip>
          ))}
        </Box>
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
      </CardContent>
      <CardActions>
        <Stack direction="row" spacing={2}>
          <LinkButton to={"/job/" + job.jobId}>View details</LinkButton>
          {isLogin && (
            <>
              <LinkButton to={"/edit-job/" + job.jobId}>
                Edit posting
              </LinkButton>
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
