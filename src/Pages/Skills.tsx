import { Card, CardHeader, CardMedia, Container, Grid2 } from "@mui/material";
import { useData } from "../Context/DataContext";

function Skills() {
  const { skills } = useData();
  return (
    <Container maxWidth={false} sx={{ pt: 10, height: "calc(100vh - 64px)" }}>
      <Grid2
        container
        spacing={10}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {skills.skillList.map(
          (skill, index) =>
            skill.add && (
              <Card
                raised
                key={index}
                elevation={5}
                sx={{
                  "&:hover": {
                    boxShadow: 20,
                  },
                }}
              >
                {/* ----------------------- card image ----------------- */}
                <CardMedia
                  component={"img"}
                  image={
                    skill.image !== ""
                      ? skill.image
                      : "https://i.pinimg.com/236x/08/64/0b/08640b34412b64c5be6d0296bc6192cd.jpg"
                  }
                  sx={{ width: 200, height: 200, objectFit: "contain", p: 2 }}
                />

                {/* ----------------------- card content ------------------- */}

                <CardHeader
                  sx={{ textAlign: "center" }}
                  titleTypographyProps={{ fontWeight: "bold" }}
                  title={skill.name}
                />
              </Card>
            )
        )}
      </Grid2>
    </Container>
  );
}

export default Skills;
