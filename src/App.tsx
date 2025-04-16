import { Container } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import ErrorComponent from "./Components/ErrorComponent";
import NavBar from "./Components/NavBar";
import { BlogGrid, Contact, Projects, Skills } from "./Pages";
import About from "./Pages/About";
function App() {
  return (
    <Container
      maxWidth={false}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        paddingTop: { xs: 7, sm: 8 },
      }}
    >
      <NavBar />

      <Routes>
        <Route path="/" element={<Navigate to={"/About"} />} />
        <Route path="/About" element={<About />} />
        <Route path="/Skills" element={<Skills />} />
        <Route path="/Projects" element={<Projects />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Blog" element={<BlogGrid />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </Container>
  );
}

export default App;
