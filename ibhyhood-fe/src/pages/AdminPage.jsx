import { useState } from "react";
import { FEATURED_PROMO, MERCH_FILTERS, MERCH_ITEMS } from "../data/merchData";
import { GIGS_DATA } from "../data/gigsData";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("home");

    // 1. STATE HOME SCHEDULE
    const [schedules, setSchedules] = useState([
        { day: "31", title: "Mobile Legends", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "1", title: "REANIMAL", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "2", title: "Mobile Legends", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "3", title: "A SPACE FOR THE UNBOUND", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "4", title: "Mobile Legends", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "5", title: "Mobile Legends", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
    ]);

    // 2. STATE MERCH & BANNER
    const [promo, setPromo] = useState(FEATURED_PROMO);
    const [filters, setFilters] = useState(MERCH_FILTERS);
    const [merchItems, setMerchItems] = useState(MERCH_ITEMS);
    const [newType, setNewType] = useState("");
    const [newTheme, setNewTheme] = useState("");

    // 3. STATE VUME SHOWCASE
    const [vumeItems, setVumeItems] = useState([
        {
            id: "voici",
            title: "VOICI",
            subtitle: "Eau de Parfum",
            top: "Orange Mandarin",
            middle: "Honey, Orange Blossom, Jasmine",
            base: "Caramel, Patchouli",
            size: "30ml",
            bgColor: "#E5CADD"
        },
        {
            id: "phantovi",
            title: "PHANTOVI",
            subtitle: "Wood & Candy",
            top: "Saffron, Jasmine",
            middle: "Ambergris, Sugar",
            base: "Fir Resin, Amber Wood",
            size: "30ml",
            bgColor: "#BFE5EE"
        }
    ]);

    // 4. STATE GIGS
    const [gigs, setGigs] = useState(GIGS_DATA);
    const [editingGig, setEditingGig] = useState(null);

    // --- HANDLERS HOME SCHEDULE ---
    const handleScheduleChange = (index, field, value) => {
        const updated = [...schedules];
        updated[index][field] = value;
        setSchedules(updated);
    };

    // --- HANDLERS MERCH & FILTERS ---
    const handleAddFilter = (category, value, setter) => {
        if (!value.trim()) return;
        setFilters((prev) => ({ ...prev, [category]: [...prev[category], value] }));
        setter("");
    };

    const handleDeleteFilter = (category, item) => {
        setFilters((prev) => ({
            ...prev,
            [category]: prev[category].filter((f) => f !== item)
        }));
    };

    const handleDeleteMerch = (id) => {
        setMerchItems(merchItems.filter((item) => item.id !== id));
    };

    // --- HANDLERS VUME ---
    const handleVumeChange = (index, field, value) => {
        const updated = [...vumeItems];
        updated[index][field] = value;
        setVumeItems(updated);
    };

    // --- HANDLERS GIGS ---
    const handleDeleteGig = (id) => {
        setGigs(gigs.filter((g) => g.id !== id));
    };

    return (
        <div className="min-h-screen  bg-gray-100 flex flex-col md:flex-row ">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-slate-900 text-white p-6 shrink-0 fixed h-screen">
                <h1 className="text-xl font-black tracking-wider text-[#8C9CCF] mb-8">
                    IBHYHOOD ADMIN
                </h1>
                <nav className="flex flex-col gap-2">
                    {[
                        { id: "home", label: "📅 Home Schedule" },
                        { id: "merch", label: "🛍️ Merch & Banner" },
                        { id: "vume", label: "🧪 Vume Perfume" },
                        { id: "gigs", label: "🎨 Gigs & Services" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all ${activeTab === tab.id
                                ? "bg-[#6B7CB4] text-white shadow-md"
                                : "text-gray-400 hover:bg-slate-800 hover:text-white"
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:pl-72 md:p-10 overflow-y-auto">
                {/* 1. HOME TAB */}
                {activeTab === "home" && (
                    <div className="space-y-6">
                        <header className="flex justify-between items-center border-b pb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Weekly Schedule</h2>
                                <p className="text-xs text-gray-500">Kelola 6 slot jadwal live stream mingguan</p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {schedules.map((item, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-bold text-gray-400">Slot #{idx + 1}</span>
                                        <input
                                            type="text"
                                            value={item.day}
                                            onChange={(e) => handleScheduleChange(idx, "day", e.target.value)}
                                            className="w-12 text-center border rounded font-bold text-sm py-0.5"
                                            placeholder="Tgl"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={(e) => handleScheduleChange(idx, "title", e.target.value)}
                                        className="w-full border rounded p-2 text-sm font-semibold"
                                        placeholder="Judul Stream / Game"
                                    />
                                    <div className="grid grid-cols-2 gap-2">
                                        <input
                                            type="text"
                                            value={item.type}
                                            onChange={(e) => handleScheduleChange(idx, "type", e.target.value)}
                                            className="border rounded p-2 text-xs"
                                            placeholder="Tipe (e.g. LIVE STREAM)"
                                        />
                                        <input
                                            type="text"
                                            value={item.time}
                                            onChange={(e) => handleScheduleChange(idx, "time", e.target.value)}
                                            className="border rounded p-2 text-xs"
                                            placeholder="Jam Tayang"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. MERCH TAB */}
                {activeTab === "merch" && (
                    <div className="space-y-8">
                        {/* Promo Banner Editor */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h3 className="font-bold text-lg text-gray-900">Featured Promo Banner</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600">Promo Title</label>
                                    <input
                                        type="text"
                                        value={promo.title}
                                        onChange={(e) => setPromo({ ...promo, title: e.target.value })}
                                        className="w-full border rounded p-2 text-sm mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600">Subtitle & Price</label>
                                    <input
                                        type="text"
                                        value={promo.subtitle}
                                        onChange={(e) => setPromo({ ...promo, subtitle: e.target.value })}
                                        className="w-full border rounded p-2 text-sm mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600">Timer Display</label>
                                    <input
                                        type="text"
                                        value={promo.timer}
                                        onChange={(e) => setPromo({ ...promo, timer: e.target.value })}
                                        className="w-full border rounded p-2 text-sm mt-1 font-mono"
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Filter Management */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h3 className="font-bold text-lg text-gray-900">Filter Management</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Types */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Merch Types</h4>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {filters.type.map((t) => (
                                            <span key={t} className="bg-gray-100 text-xs px-2.5 py-1 rounded-full flex items-center gap-2">
                                                {t}
                                                <button onClick={() => handleDeleteFilter("type", t)} className="text-red-500 hover:font-bold">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newType}
                                            onChange={(e) => setNewType(e.target.value)}
                                            placeholder="Tipe Baru..."
                                            className="border rounded p-1.5 text-xs flex-1"
                                        />
                                        <button onClick={() => handleAddFilter("type", newType, setNewType)} className="bg-[#6B7CB4] text-white text-xs px-3 rounded font-semibold">+</button>
                                    </div>
                                </div>
                                {/* Themes */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Themes</h4>
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {filters.theme.map((th) => (
                                            <span key={th} className="bg-gray-100 text-xs px-2.5 py-1 rounded-full flex items-center gap-2">
                                                {th}
                                                <button onClick={() => handleDeleteFilter("theme", th)} className="text-red-500 hover:font-bold">×</button>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newTheme}
                                            onChange={(e) => setNewTheme(e.target.value)}
                                            placeholder="Tema Baru..."
                                            className="border rounded p-1.5 text-xs flex-1"
                                        />
                                        <button onClick={() => handleAddFilter("theme", newTheme, setNewTheme)} className="bg-[#6B7CB4] text-white text-xs px-3 rounded font-semibold">+</button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Products List */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h3 className="font-bold text-lg text-gray-900">Products Catalog</h3>
                            <div className="divide-y">
                                {merchItems.map((item) => (
                                    <div key={item.id} className="py-3 flex justify-between items-center">
                                        <div>
                                            <p className="font-semibold text-sm text-gray-900">{item.title}</p>
                                            <p className="text-xs text-gray-400">{item.type} • {item.theme} • <span className="font-bold text-gray-700">{item.price}</span></p>
                                        </div>
                                        <button onClick={() => handleDeleteMerch(item.id)} className="text-red-500 text-xs hover:underline">Hapus</button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* 3. VUME TAB */}
                {activeTab === "vume" && (
                    <div className="space-y-6">
                        <header className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Vume Perfume Showcase</h2>
                            <p className="text-xs text-gray-500">Edit informasi aroma dan detail botol parfum</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {vumeItems.map((vume, idx) => (
                                <div key={vume.id} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-lg">{vume.title}</h3>
                                        <input
                                            type="color"
                                            value={vume.bgColor}
                                            onChange={(e) => handleVumeChange(idx, "bgColor", e.target.value)}
                                            className="w-8 h-8 rounded border cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600">Sub-Title / Scent Description</label>
                                        <input
                                            type="text"
                                            value={vume.subtitle}
                                            onChange={(e) => handleVumeChange(idx, "subtitle", e.target.value)}
                                            className="w-full border rounded p-2 text-sm mt-1"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-600">Fragrance Notes</label>
                                        <input
                                            type="text"
                                            value={vume.top}
                                            onChange={(e) => handleVumeChange(idx, "top", e.target.value)}
                                            placeholder="Top Notes"
                                            className="w-full border rounded p-2 text-xs"
                                        />
                                        <input
                                            type="text"
                                            value={vume.middle}
                                            onChange={(e) => handleVumeChange(idx, "middle", e.target.value)}
                                            placeholder="Middle Notes"
                                            className="w-full border rounded p-2 text-xs"
                                        />
                                        <input
                                            type="text"
                                            value={vume.base}
                                            onChange={(e) => handleVumeChange(idx, "base", e.target.value)}
                                            placeholder="Base Notes"
                                            className="w-full border rounded p-2 text-xs"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. GIGS TAB */}
                {activeTab === "gigs" && (
                    <div className="space-y-6">
                        <header className="flex justify-between items-center border-b pb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Gigs & Services</h2>
                                <p className="text-xs text-gray-500">Kelola daftar jasa freelance dan paket harga</p>
                            </div>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {gigs.map((gig) => (
                                <div key={gig.id} className="bg-white p-5 rounded-xl shadow-sm border space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-sm text-gray-900">{gig.title}</h3>
                                            <p className="text-xs font-semibold text-[#6B7CB4] mt-0.5">From {gig.startingPrice}</p>
                                        </div>
                                        <button onClick={() => handleDeleteGig(gig.id)} className="text-red-500 text-xs hover:underline">
                                            Hapus
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 line-clamp-2">{gig.description || "Belum ada deskripsi."}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}