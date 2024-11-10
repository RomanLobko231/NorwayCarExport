import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./ui/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="relative min-h-screen bg-hero-pattern bg-auto bg-center">
      <div className="absolute inset-0 bg-lighthouse opacity-90"></div>
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact={true} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
