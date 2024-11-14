import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import ErrorComponent from "./Components/ErrorComponent";
import { Container } from "@mui/material";
import Skills from "./Pages/Skills";
function App() {
  return (
    <>
      <NavBar />
      <Container
        maxWidth={false}
        sx={{
          bgcolor: "background.default",
          height: "100vh",
          color: "text.primary",
          paddingTop: { xs: 7, sm: 8 },
        }}
      >
        <Routes>
          <Route path="/" element={<About />} errorElement={<ErrorComponent />} />
          <Route path="/About" element={<About />} />
          <Route path="/Skills" element={<Skills />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
