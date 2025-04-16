import { Container, Divider, Typography } from "@mui/material";
import { useData } from "../Context/DataContext";


function About() {
  const { about } = useData();
  return (
    <Container maxWidth={false} sx={{ pt: 10, height: "calc(100vh - 64px)" }}>
      <Typography variant="h2" paddingBlockEnd={5} color="primary.dark" fontWeight={"bold"} fontFamily={"monospace"}>
        About me
      </Typography>
      <Divider />
      <Typography variant="h4" paddingBlock={5} textAlign={"left"} lineHeight={1.5} fontFamily={"monospace"}>
        {about.primary}
      </Typography>
      <Divider />
      <Typography variant="h4" paddingBlock={5} textAlign={"left"} lineHeight={1.5} fontFamily={"monospace"}>
        {about.secondary}
      </Typography>
    </Container>
  );
}

export default About;
