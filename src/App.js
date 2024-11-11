import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./ui/Navbar";
import Home from "./pages/Home";
import Footer from "./ui/Footer";
import RegisterSeller from "./pages/RegisterSeller";

function App() {
  return (
    <div className="relative min-h-screen bg-hero-pattern bg-auto bg-center">
      <div className="absolute inset-0 bg-lighthouse opacity-90"></div>
      <div className="relative z-10 flex min-h-screen flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} exact={true} />
          <Route path="*" element={<Home />} exact={true} />
          <Route path="/sell" element={<RegisterSeller />} exact={true} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
