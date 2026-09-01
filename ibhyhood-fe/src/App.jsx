import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VumePage from "./pages/VumePage";
import GigsPage from "./pages/GigsPage";
import MerchPage from "./pages/MerchPage";
import AdminPage from "./pages/AdminPage";
import { CartProvider } from "./context/CartContext";
import CartModal from "./components/CartModal"; // Tambahkan modal keranjang

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <CartModal /> {/* Modal keranjang melayang */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vume" element={<VumePage />} />
          <Route path="/gigs" element={<GigsPage />} />
          <Route path="/merch" element={<MerchPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}