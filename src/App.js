import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./ui/Navbar";
import Home from "./pages/Home";
import Footer from "./ui/Footer";
import ScrollToTop from "./tools/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        <Route path="*" element={<Home />} exact={true} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
