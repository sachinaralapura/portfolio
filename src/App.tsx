import NavBar from "./Components/NavBar";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import ErrorComponent from "./Components/ErrorComponent";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<About />} errorElement={<ErrorComponent />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<ErrorComponent />} />
      </Routes>
    </>
  );
}

export default App;
