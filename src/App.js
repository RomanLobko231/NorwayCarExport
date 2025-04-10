import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./ui/Navbar";
import Home from "./pages/Home";
import Footer from "./ui/decorative/Footer";
import ScrollToTop from "./tools/ScrollToTop";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AddCarPage from "./pages/AddCarPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} exact={true} />
        <Route path="*" element={<Home />} exact={true} />
        <Route path="/register" element={<RegisterPage />} exact={true} />
        <Route path="/add-car" element={<AddCarPage />} exact={true} />
        <Route element={<ProtectedRoute />}>
          <Route path="/user/:id" element={<UserPage />} exact={false} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
