import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import ErrorComponent from "./Components/ErrorComponent";
import { Container } from "@mui/material";

function App() {
  return (
    <Container
      sx={{
        bgcolor: "primary.main",
        height: "100vh",
      }}
    >
      <NavBar />
      <Routes>
        <Route path="/" element={<About />} errorElement={<ErrorComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </Container>
  );
}

export default App;
