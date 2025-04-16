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
        <Route path="/" element={<Navigate to={"/about"} />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogGrid />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </Container>
  );
}

export default App;
