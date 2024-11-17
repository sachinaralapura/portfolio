import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import ErrorComponent from "./Components/ErrorComponent";
import { Container } from "@mui/material";
import Skills from "./Pages/Skills";
import Projects from "./Pages/Projects";
function App() {
  return (
    <>
      <NavBar />
      <Container
        maxWidth={false}
        sx={{
          bgcolor: "background.default",
         
          color: "text.primary",
          paddingTop: { xs: 7, sm: 8 },
        }}
      >
        <Routes>
          <Route path="/" element={<About />} errorElement={<ErrorComponent />} />
          <Route path="/About" element={<About />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
