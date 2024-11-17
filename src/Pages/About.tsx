import { Container, Divider, Typography } from "@mui/material";
import { useData } from "../Context/DataContext";

function About() {
  const { about } = useData();
  return (
    <Container maxWidth={false} sx={{ pt: 10 }}>
      <Typography variant="h2" paddingBlockEnd={5} color="primary.dark" fontWeight={"bold"}>
        About me
      </Typography>

      <Divider />

      <Typography variant="h4" paddingBlock={5} textAlign={"left"} lineHeight={1.5}>
        Hi I'm{" "}
        <Typography variant="inherit" component={"span"} color="primary.dark" fontWeight={"bold"}>
          {about.fname} {about.lname}
          {". "}
        </Typography>
        I'm a{" "}
        <Typography variant="inherit" component={"span"} color="primary.dark" fontWeight={"bold"}>
          {about.occ}
          {"  "}
        </Typography>
        {about.primary}
      </Typography>
    </Container>
  );
}

export default About;
