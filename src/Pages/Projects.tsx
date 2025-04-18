import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useData } from "../Context/DataContext";
import { project } from "../utils/type.d";

function Project({ projectProps }: project) {
  // console.log(projectProps);
  return (
    <Card
      elevation={5}
      sx={{
        padding: 2,
        display: { lg: "flex" },
        flexDirection: "row",
        justifyContent: "space-between",
        "&:hover": {
          boxShadow: 10,
        },
      }}
    >
      <CardMedia
        component={"img"}
        image={projectProps.image}
        sx={{
          width: 250,
          objectFit: "cover", // Maintain aspect ratio
          borderRadius: 2, // Optional: Rounded corners
          marginRight: "10px",
          boxShadow: 1,
        }}
      />

      <Divider orientation="vertical" flexItem />

      <Box boxShadow={1} borderRadius={2} ml={"10px"} padding={2}>
        <CardHeader
          title={projectProps.name}
          titleTypographyProps={{ fontWeight: "bold", color: "primary.dark" }}
        />
        <CardContent>
          <Typography variant="body1">{projectProps.description}</Typography>
        </CardContent>
        <CardActions>
          {projectProps.githublink && (
            <Button
              startIcon={<GitHubIcon />}
              variant="contained"
              sx={{ textTransform: "none" }}
              href={projectProps.githublink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link
            </Button>
          )}

          {projectProps.link && (
            <Button
              variant="contained"
              sx={{ textTransform: "none" }}
              href={projectProps.githublink}
              target="_blank"
              rel="noopener noreferrer"
            >
              live
            </Button>
          )}
        </CardActions>

        {projectProps?.skills && (
          <Stack direction="row" spacing={2} alignItems="center" marginTop={2}>
            <Typography variant="body2" fontWeight="bold">
              Skills :{" "}
            </Typography>
            {projectProps?.skills?.map((skill) => (
              <Button
                key={skill}
                sx={{ bgcolor: "primary.light", color: "InfoText" }}
              >
                {skill}
              </Button>
            ))}
          </Stack>
        )}
      </Box>
    </Card>
  );
}

function Projects() {
  const { projects } = useData();
  return (
    <Container maxWidth={false} sx={{ py: 10 }}>
      <Stack spacing={10}>
        {projects.map((project, index) => (
          <Project key={index} projectProps={project}></Project>
        ))}
      </Stack>
    </Container>
  );
}

export default Projects;
