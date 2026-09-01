import { useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function CartModal() {
    const cart = useCart();

    if (!cart) return null;

    const {
        cartItems = [],
        isCartOpen = false,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getTotalPrice,
        parsePrice,
    } = cart;

    // Menutup modal dengan tombol ESC di keyboard
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isCartOpen) {
                setIsCartOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isCartOpen, setIsCartOpen]);

    if (!isCartOpen) return null;

    // ⚠️ GANTI NOMOR WHATSAPP ADMIN DI SINI (Gunakan awalan 62)
    const ADMIN_WA_NUMBER = "6281234567890";

    // Format & Kirim Pesan ke WA
    const handleCheckoutWA = () => {
        if (cartItems.length === 0) return;

        let message = "Halo Admin Ibhyhood! 👋\nSaya ingin memesan beberapa produk/jasa berikut:\n\n";
        message += "*DAFTAR PESANAN:*\n";
        message += "----------------------------------\n";

        cartItems.forEach((item, index) => {
            const unitPrice = parsePrice ? parsePrice(item.price) : 0;
            const itemSubtotal = unitPrice * item.quantity;

            message += `${index + 1}. *${item.title}*\n`;
            if (item.variant) {
                message += `   - Detail/Varian: ${item.variant}\n`;
            }
            message += `   - Qty: ${item.quantity} x Rp ${unitPrice.toLocaleString("id-ID")}\n`;
            message += `   - Subtotal: Rp ${itemSubtotal.toLocaleString("id-ID")}\n\n`;
        });

        message += "----------------------------------\n";
        message += `*TOTAL ESTIMASI PRODUK:* Rp ${getTotalPrice ? getTotalPrice().toLocaleString("id-ID") : 0}\n\n`;
        message += "Mohon konfirmasi ketersediaan pesanan dan rincian ongkos kirim ke alamat saya ya. Terima kasih!";

        const waUrl = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, "_blank");
    };

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop Gelap */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar Drawer */}
            <div className="relative z-10 w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                {/* Header Modal */}
                <div className="p-4 bg-[#6B7CB4] text-white flex justify-between items-center shrink-0">
                    <h2 className="font-bold text-lg flex items-center gap-2">
                        🛒 Keranjang Belanja
                    </h2>
                    <button
                        type="button"
                        onClick={() => setIsCartOpen(false)}
                        className="text-white hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg transition-colors cursor-pointer"
                        aria-label="Tutup Keranjang"
                    >
                        ✕
                    </button>
                </div>

                {/* List Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 flex flex-col items-center justify-center h-full">
                            <p className="text-4xl mb-2">🛒</p>
                            <p className="text-sm font-semibold">Keranjang kamu masih kosong</p>
                        </div>
                    ) : (
                        cartItems.map((item) => {
                            const unitPrice = parsePrice ? parsePrice(item.price) : 0;
                            return (
                                <div
                                    key={`${item.id}-${item.variant || ""}`}
                                    className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 items-center hover:border-gray-200 transition-colors"
                                >
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded-lg bg-gray-200 shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-xs text-gray-900 line-clamp-1">
                                            {item.title}
                                        </h4>
                                        {item.variant && (
                                            <p className="text-[10px] text-gray-500 truncate">{item.variant}</p>
                                        )}
                                        <p className="text-xs font-semibold text-[#6B7CB4] mt-1">
                                            Rp {unitPrice.toLocaleString("id-ID")}
                                        </p>

                                        {/* Control Qty */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity && updateQuantity(item.id, item.variant, -1)}
                                                className="w-6 h-6 bg-gray-200 rounded text-xs font-bold flex items-center justify-center hover:bg-gray-300 transition-colors active:scale-95"
                                            >
                                                -
                                            </button>
                                            <span className="text-xs font-bold w-4 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => updateQuantity && updateQuantity(item.id, item.variant, 1)}
                                                className="w-6 h-6 bg-gray-200 rounded text-xs font-bold flex items-center justify-center hover:bg-gray-300 transition-colors active:scale-95"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeFromCart && removeFromCart(item.id, item.variant)}
                                        className="text-red-400 hover:text-red-600 text-xs p-1.5 transition-colors rounded-lg hover:bg-red-50"
                                        title="Hapus produk"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Total & Order Button */}
                {cartItems.length > 0 && (
                    <div className="p-4 border-t bg-gray-50 space-y-3 shrink-0">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-500 font-medium">Total Produk:</span>
                            <span className="font-black text-lg text-gray-900">
                                Rp {getTotalPrice ? getTotalPrice().toLocaleString("id-ID") : 0}
                            </span>
                        </div>
                        <p className="text-[10px] text-gray-400 italic">
                            *Belum termasuk ongkos kirim. Ongkir akan dihitung oleh Admin.
                        </p>
                        <button
                            type="button"
                            onClick={handleCheckoutWA}
                            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                        >
                            <span>Pesan via WhatsApp</span>
                            <span>→</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}