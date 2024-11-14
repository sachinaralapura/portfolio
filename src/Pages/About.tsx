import { Container, Divider, Typography } from "@mui/material";
import { useData } from "../Context/DataContext";

function About() {
  const { about } = useData();
  return (
    <Container maxWidth={false} sx={{ pt: 10 }}>
      <Typography variant="h2" paddingBlockEnd={5}>
        About me
      </Typography>
      <Divider />
      <Typography variant="h4" paddingBlock={5} textAlign={"left"} lineHeight={1.5}>
        {about.primary}
      </Typography>
    </Container>
  );
}

export default About;
