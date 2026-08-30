import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VumePage from "./pages/VumePage";
import GigsPage from "./pages/GigsPage";
import MerchPage from "./pages/MerchPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/vume" element={<VumePage />} />
        <Route path="/gigs" element={<GigsPage />} />
        <Route path="/merch" element={<MerchPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}