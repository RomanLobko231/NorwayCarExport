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
import EditCarPage from "./pages/EditCarPage";
import CarAuctionPage from "./pages/CarAuctionPage";
import AllAuctionsPage from "./pages/AllAuctionsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="flex w-full justify-center">
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} exact={true} />
          <Route path="*" element={<Home />} exact={true} />
          <Route path="/register" element={<RegisterPage />} exact={true} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user/:id" element={<UserPage />} exact={false} />
            <Route path="/car/:id" element={<EditCarPage />} exact={false} />
            <Route
              path="/auctions"
              element={<AllAuctionsPage />}
              exact={false}
            />
            <Route
              path="/auction/:id"
              element={<CarAuctionPage />}
              exact={false}
            />
            <Route
              path="/user/:id/add-car"
              element={<AddCarPage />}
              exact={true}
            />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
