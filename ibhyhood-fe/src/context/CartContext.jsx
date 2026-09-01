import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    // Ambil data keranjang dari localStorage agar tidak hilang saat di-refresh
    const [cartItems, setCartItems] = useState(() => {
        const saved = localStorage.getItem("ibhyhood_cart");
        return saved ? JSON.parse(saved) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("ibhyhood_cart", JSON.stringify(cartItems));
    }, [cartItems]);

    // Tambah barang ke keranjang
    const addToCart = (product) => {
        setCartItems((prev) => {
            const existingIndex = prev.findIndex(
                (item) => item.id === product.id && item.variant === product.variant
            );

            if (existingIndex > -1) {
                const updated = [...prev];
                updated[existingIndex].quantity += product.quantity || 1;
                return updated;
            }

            return [...prev, { ...product, quantity: product.quantity || 1 }];
        });
        setIsCartOpen(true); // Otomatis buka slide keranjang saat menambah barang
    };

    // Hapus barang dari keranjang
    const removeFromCart = (id, variant) => {
        setCartItems((prev) =>
            prev.filter((item) => !(item.id === id && item.variant === variant))
        );
    };

    // Ubah jumlah (+ / -)
    const updateQuantity = (id, variant, delta) => {
        setCartItems((prev) =>
            prev
                .map((item) => {
                    if (item.id === id && item.variant === variant) {
                        const newQty = item.quantity + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter(Boolean)
        );
    };

    const clearCart = () => setCartItems([]);

    // Helper untuk mengubah format teks harga (seperti "IDR 100.000" atau "Rp 150k") ke angka murni
    const parsePrice = (priceStr) => {
        if (typeof priceStr === "number") return priceStr;
        if (!priceStr) return 0;
        let clean = priceStr.toLowerCase().replace(/[^0-9k]/g, "");
        if (clean.endsWith("k")) {
            return parseFloat(clean.replace("k", "")) * 1000;
        }
        return parseInt(clean, 10) || 0;
    };

    // Total Harga
    const getTotalPrice = () => {
        return cartItems.reduce(
            (sum, item) => sum + parsePrice(item.price) * item.quantity,
            0
        );
    };

    // Total Jumlah Item
    const getTotalCount = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getTotalPrice,
                getTotalCount,
                parsePrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);