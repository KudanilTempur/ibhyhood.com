import { useState } from "react";
import Navbar from "../components/Navbar";
import { FEATURED_PROMO, MERCH_FILTERS, MERCH_ITEMS } from "../data/merchData";
import Footer from "../components/Footer";

export default function MerchPage() {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedThemes, setSelectedThemes] = useState([]);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    const toggleTypeFilter = (type) => {
        setSelectedTypes((prev) =>
            prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type]
        );
    };

    const toggleThemeFilter = (theme) => {
        setSelectedThemes((prev) =>
            prev.includes(theme) ? prev.filter((item) => item !== theme) : [...prev, theme]
        );
    };

    const filteredProducts = MERCH_ITEMS.filter((item) => {
        const matchesType =
            selectedTypes.length === 0 || selectedTypes.includes(item.type);
        const matchesTheme =
            selectedThemes.length === 0 || selectedThemes.includes(item.theme);

        return matchesType && matchesTheme;
    });

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar Component */}
            <Navbar />

            {/* Main Content dengan Offset Top Padding untuk Navbar Fixed */}
            <div className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-24 sm:pt-28 pb-6 space-y-6">
                {/* Banner Promo Responsive */}
                <section className="bg-gradient-to-r from-[#6B7CB4] to-[#8C9CCF] rounded-2xl p-5 md:p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-2 md:space-y-3 w-full md:max-w-lg">
                        <span className="bg-white/20 text-[10px] md:text-xs px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                            Limited Drop
                        </span>
                        <h1 className="text-xl md:text-3xl font-extrabold tracking-tight leading-snug">
                            {FEATURED_PROMO.title}
                        </h1>
                        <p className="text-white/80 text-xs md:text-sm">
                            {FEATURED_PROMO.subtitle}
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                            <span className="font-mono bg-black/20 px-3 py-1.5 rounded-md text-xs md:text-sm font-semibold">
                                ⏳ {FEATURED_PROMO.timer}
                            </span>
                            <button className="bg-white text-[#6B7CB4] hover:bg-opacity-90 font-semibold px-4 py-1.5 rounded-lg text-xs md:text-sm transition-all">
                                Shop Drop
                            </button>
                        </div>
                    </div>
                    <div className="w-full md:w-80 h-36 md:h-44 bg-white/10 rounded-xl overflow-hidden flex items-center justify-center">
                        <span className="text-white/40 text-xs md:text-sm font-medium">
                            [ Hero Image ]
                        </span>
                    </div>
                </section>

                {/* Mobile Filter Button */}
                <div className="lg:hidden flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <button
                        onClick={() => setShowMobileFilter(!showMobileFilter)}
                        className="bg-[#6B7CB4] text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <span>⚙️</span>{" "}
                        {showMobileFilter ? "Sembunyikan Filter" : "Tampilkan Filter"}
                    </button>
                    <span className="text-xs text-gray-500 font-medium">
                        {filteredProducts.length} Items
                    </span>
                </div>

                {/* Content Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar Filter */}
                    <aside
                        className={`space-y-6 bg-gray-50 p-5 rounded-xl border border-gray-100 h-fit ${showMobileFilter ? "block" : "hidden lg:block"
                            }`}
                    >
                        <div className="flex justify-between items-center border-b pb-3">
                            <h2 className="font-bold text-gray-900 text-sm md:text-base">
                                Filters
                            </h2>
                            {(selectedTypes.length > 0 || selectedThemes.length > 0) && (
                                <button
                                    onClick={() => {
                                        setSelectedTypes([]);
                                        setSelectedThemes([]);
                                    }}
                                    className="text-xs text-red-500 hover:underline"
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Merch Type */}
                        <div>
                            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                                Merch Type
                            </h3>
                            <div className="space-y-2">
                                {MERCH_FILTERS.type.map((type) => (
                                    <label
                                        key={type}
                                        className="flex items-center gap-2 text-xs md:text-sm text-gray-600 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(type)}
                                            onChange={() => toggleTypeFilter(type)}
                                            className="rounded text-[#6B7CB4] focus:ring-[#6B7CB4]"
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Theme Filter */}
                        <div>
                            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">
                                Theme
                            </h3>
                            <div className="space-y-2">
                                {MERCH_FILTERS.theme.map((theme) => (
                                    <label
                                        key={theme}
                                        className="flex items-center gap-2 text-xs md:text-sm text-gray-600 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedThemes.includes(theme)}
                                            onChange={() => toggleThemeFilter(theme)}
                                            className="rounded text-[#6B7CB4] focus:ring-[#6B7CB4]"
                                        />
                                        {theme}
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Product Cards Grid */}
                    <main className="lg:col-span-3 space-y-4">
                        <div className="hidden lg:flex justify-between items-center pb-2 border-b">
                            <h2 className="font-bold text-gray-900 text-lg">
                                Featured Collection
                            </h2>
                            <span className="text-xs text-gray-500">
                                {filteredProducts.length} Items
                            </span>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-12 text-gray-500 text-sm">
                                Tidak ada produk yang cocok.
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
                                {filteredProducts.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col group"
                                    >
                                        <div className="h-36 md:h-48 bg-[#C1D0FF]/20 relative flex items-center justify-center">
                                            {item.badge && (
                                                <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-[#6B7CB4] text-white text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                    {item.badge}
                                                </span>
                                            )}
                                            <span className="text-gray-400 text-[10px] md:text-xs">
                                                [ Product Preview ]
                                            </span>
                                        </div>

                                        <div className="p-3 md:p-4 flex-1 flex flex-col justify-between space-y-2 md:space-y-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-xs md:text-sm group-hover:text-[#6B7CB4] line-clamp-1">
                                                    {item.title}
                                                </h3>
                                                <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">
                                                    {item.type}
                                                </p>
                                            </div>

                                            <div className="pt-2 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <span className="font-bold text-xs md:text-sm text-gray-900">
                                                    {item.price}
                                                </span>
                                                <button className="w-full sm:w-auto bg-[#6B7CB4] hover:bg-[#5a6a9d] text-white text-[11px] md:text-xs px-2.5 py-1.5 rounded-lg transition-colors">
                                                    + Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Footer Custom Sesuai Desain Baru */}
            <Footer />
        </div>
    );
}