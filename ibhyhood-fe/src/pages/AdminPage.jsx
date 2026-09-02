import { useState } from "react";
import { FEATURED_PROMO, MERCH_FILTERS, MERCH_ITEMS } from "../data/merchData";
import { GIGS_DATA } from "../data/gigsData";
import { VUME_DATA } from "../data/vumeData";

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("home");

    // ================= STATE MANAGEMENT =================
    // 1. Home Schedule State
    const [schedules, setSchedules] = useState([
        { day: "31", title: "Mobile Legends", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "1", title: "REANIMAL", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "2", title: "Mobile Legends", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "3", title: "A SPACE FOR THE UNBOUND", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "4", title: "Mobile Legends", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
        { day: "5", title: "Mobile Legends", time: "[21.00/21.30 WIB]", type: "LIVE STREAM" },
    ]);

    // 2. Merch & Banner State (dengan fallback nilai aman)
    const [promo, setPromo] = useState(FEATURED_PROMO || { title: "", subtitle: "", image: "" });
    const [filters, setFilters] = useState(MERCH_FILTERS || { types: [], themes: [] });
    const [merchItems, setMerchItems] = useState(MERCH_ITEMS || []);
    const [newType, setNewType] = useState("");
    const [newTheme, setNewTheme] = useState("");
    const [newMerch, setNewMerch] = useState({ title: "", price: "", image: "", type: "", theme: "" });

    // 3. Vume Perfume State
    const [vumeItems, setVumeItems] = useState(VUME_DATA || []);

    // 4. Gigs State
    const [gigs, setGigs] = useState(GIGS_DATA || []);
    const [newGig, setNewGig] = useState({ title: "", category: "", price: "", image: "" });

    // ================= HANDLERS =================
    // Schedule Handlers
    const handleScheduleChange = (index, field, value) => {
        const updated = [...schedules];
        updated[index][field] = value;
        setSchedules(updated);
    };

    // Merch Handlers
    const handleAddFilter = (category, value, setter) => {
        if (!value.trim()) return;
        setFilters((prev) => ({
            ...prev,
            [category]: [...(prev[category] || []), value]
        }));
        setter("");
    };

    const handleDeleteFilter = (category, item) => {
        setFilters((prev) => ({
            ...prev,
            [category]: (prev[category] || []).filter((f) => f !== item)
        }));
    };

    const handleAddMerch = (e) => {
        e.preventDefault();
        if (!newMerch.title || !newMerch.price) return;
        const newItem = { ...newMerch, id: Date.now().toString() };
        setMerchItems((prev) => [newItem, ...(prev || [])]);
        setNewMerch({ title: "", price: "", image: "", type: "", theme: "" });
    };

    const handleDeleteMerch = (id) => {
        setMerchItems((prev) => (prev || []).filter((item) => item.id !== id));
    };

    // Vume Handlers
    const handleVumeChange = (index, field, value) => {
        const updated = [...vumeItems];
        updated[index][field] = value;
        setVumeItems(updated);
    };

    const handleVumeImageUpload = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleVumeChange(index, "image", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveVumeImage = (index) => {
        handleVumeChange(index, "image", "");
    };

    // Gigs Handlers
    const handleAddGig = (e) => {
        e.preventDefault();
        if (!newGig.title || !newGig.price) return;
        const item = { ...newGig, id: Date.now().toString() };
        setGigs((prev) => [item, ...(prev || [])]);
        setNewGig({ title: "", category: "", price: "", image: "" });
    };

    const handleDeleteGig = (id) => {
        setGigs((prev) => (prev || []).filter((g) => g.id !== id));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-64 bg-slate-900 text-white p-6 shrink-0 md:h-screen md:fixed">
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
                {/* 1. HOME SCHEDULE TAB */}
                {activeTab === "home" && (
                    <div className="space-y-6">
                        <header className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Weekly Stream Schedule</h2>
                            <p className="text-xs text-gray-500">Update jadwal live stream mingguan yang tampil di Homepage</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {schedules.map((sched, idx) => (
                                <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
                                    <div className="flex items-center justify-between border-b pb-2">
                                        <span className="font-bold text-sm text-slate-700">Hari #{idx + 1}</span>
                                        <input
                                            type="text"
                                            value={sched.day}
                                            onChange={(e) => handleScheduleChange(idx, "day", e.target.value)}
                                            className="w-12 text-center border rounded p-1 text-xs font-bold"
                                            placeholder="Tgl"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Judul Stream / Game</label>
                                        <input
                                            type="text"
                                            value={sched.title}
                                            onChange={(e) => handleScheduleChange(idx, "title", e.target.value)}
                                            className="w-full border rounded p-2 text-sm mt-1"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <label className="text-[10px] text-gray-400 uppercase font-semibold">Waktu</label>
                                            <input
                                                type="text"
                                                value={sched.time}
                                                onChange={(e) => handleScheduleChange(idx, "time", e.target.value)}
                                                className="w-full border rounded p-2 text-xs mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] text-gray-400 uppercase font-semibold">Tipe</label>
                                            <input
                                                type="text"
                                                value={sched.type}
                                                onChange={(e) => handleScheduleChange(idx, "type", e.target.value)}
                                                className="w-full border rounded p-2 text-xs mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 2. MERCH & BANNER TAB */}
                {activeTab === "merch" && (
                    <div className="space-y-8">
                        <header className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Merch & Promo Banner</h2>
                            <p className="text-xs text-gray-500">Kelola banner promo, filter kategori, dan katalog merchandise</p>
                        </header>

                        {/* Promo Banner Section */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h3 className="font-bold text-base text-gray-800">Featured Promo Banner</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    placeholder="Judul Banner"
                                    value={promo?.title || ""}
                                    onChange={(e) => setPromo({ ...promo, title: e.target.value })}
                                    className="border rounded p-2 text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Sub-Judul"
                                    value={promo?.subtitle || ""}
                                    onChange={(e) => setPromo({ ...promo, subtitle: e.target.value })}
                                    className="border rounded p-2 text-sm"
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={promo?.image || ""}
                                    onChange={(e) => setPromo({ ...promo, image: e.target.value })}
                                    className="border rounded p-2 text-sm col-span-2"
                                />
                            </div>
                        </section>

                        {/* Filter Categories */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h3 className="font-bold text-base text-gray-800">Filter Categories</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-semibold text-gray-600">Types</label>
                                    <div className="flex gap-2 my-2">
                                        <input
                                            type="text"
                                            value={newType}
                                            onChange={(e) => setNewType(e.target.value)}
                                            placeholder="Tambah type..."
                                            className="border rounded p-2 text-xs flex-1"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleAddFilter("types", newType, setNewType)}
                                            className="bg-slate-800 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Tambah
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {(filters?.types || []).map((t) => (
                                            <span key={t} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                                {t}
                                                <button type="button" onClick={() => handleDeleteFilter("types", t)} className="text-red-500 font-bold">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600">Themes</label>
                                    <div className="flex gap-2 my-2">
                                        <input
                                            type="text"
                                            value={newTheme}
                                            onChange={(e) => setNewTheme(e.target.value)}
                                            placeholder="Tambah theme..."
                                            className="border rounded p-2 text-xs flex-1"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleAddFilter("themes", newTheme, setNewTheme)}
                                            className="bg-slate-800 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Tambah
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {(filters?.themes || []).map((th) => (
                                            <span key={th} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center gap-1">
                                                {th}
                                                <button type="button" onClick={() => handleDeleteFilter("themes", th)} className="text-red-500 font-bold">×</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Merch Items List */}
                        <section className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h3 className="font-bold text-base text-gray-800">Katalog Merchandise</h3>
                            <form onSubmit={handleAddMerch} className="grid grid-cols-1 md:grid-cols-5 gap-2 border-b pb-4">
                                <input
                                    type="text"
                                    placeholder="Nama Merch"
                                    value={newMerch.title}
                                    onChange={(e) => setNewMerch({ ...newMerch, title: e.target.value })}
                                    className="border rounded p-2 text-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Harga (cth: Rp 150.000)"
                                    value={newMerch.price}
                                    onChange={(e) => setNewMerch({ ...newMerch, price: e.target.value })}
                                    className="border rounded p-2 text-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={newMerch.image}
                                    onChange={(e) => setNewMerch({ ...newMerch, image: e.target.value })}
                                    className="border rounded p-2 text-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Tipe"
                                    value={newMerch.type}
                                    onChange={(e) => setNewMerch({ ...newMerch, type: e.target.value })}
                                    className="border rounded p-2 text-xs"
                                />
                                <button type="submit" className="bg-[#6B7CB4] text-white p-2 rounded text-xs font-semibold">
                                    + Tambah Item
                                </button>
                            </form>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {(merchItems || []).map((item) => (
                                    <div key={item.id} className="border p-3 rounded-lg flex items-center justify-between gap-3 bg-gray-50">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-12 h-12 object-cover rounded" />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-[10px] text-gray-500">No Img</div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-xs truncate">{item.title}</p>
                                            <p className="text-xs text-gray-500">{item.price}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteMerch(item.id)}
                                            className="text-red-500 text-xs font-bold hover:bg-red-50 p-2 rounded"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {/* 3. VUME PERFUME TAB */}
                {activeTab === "vume" && (
                    <div className="space-y-6">
                        <header className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Vume Perfume Showcase</h2>
                            <p className="text-xs text-gray-500">Upload gambar botol parfum dan ubah informasi aroma</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {(vumeItems || []).map((vume, idx) => (
                                <div key={vume.id || idx} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                                    <div className="border-b pb-2 flex justify-between items-center">
                                        <h3 className="font-bold text-lg text-slate-800">{vume.title}</h3>
                                        <span className="text-xs font-semibold text-gray-400">ID: {vume.id}</span>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 block mb-1">
                                            Upload Gambar Botol (dari Komputer/HP)
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleVumeImageUpload(idx, e)}
                                            className="w-full border rounded p-1.5 text-xs bg-white cursor-pointer file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-white hover:file:bg-slate-700"
                                        />
                                    </div>

                                    <div className="w-full h-48 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col justify-center items-center overflow-hidden relative">
                                        {vume.image ? (
                                            <div className="relative w-full h-full flex items-center justify-center p-2">
                                                <img src={vume.image} alt={vume.title} className="h-full object-contain" />
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveVumeImage(idx)}
                                                    className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow hover:bg-red-600"
                                                >
                                                    Hapus Gambar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center p-4">
                                                <p className="text-xs text-gray-400 font-medium">Belum ada gambar</p>
                                                <p className="text-[10px] text-gray-400 mt-1">Pilih file foto dari laptop/HP kamu</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-gray-600">Sub-Title / Deskripsi Scent</label>
                                        <input
                                            type="text"
                                            value={vume.subtitle || ""}
                                            onChange={(e) => handleVumeChange(idx, "subtitle", e.target.value)}
                                            className="w-full border rounded p-2 text-xs mt-1"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-600">Fragrance Notes</label>
                                        <input
                                            type="text"
                                            value={vume.top || ""}
                                            onChange={(e) => handleVumeChange(idx, "top", e.target.value)}
                                            placeholder="Top Notes"
                                            className="w-full border rounded p-2 text-xs"
                                        />
                                        <input
                                            type="text"
                                            value={vume.middle || ""}
                                            onChange={(e) => handleVumeChange(idx, "middle", e.target.value)}
                                            placeholder="Middle Notes"
                                            className="w-full border rounded p-2 text-xs"
                                        />
                                        <input
                                            type="text"
                                            value={vume.base || ""}
                                            onChange={(e) => handleVumeChange(idx, "base", e.target.value)}
                                            placeholder="Base Notes"
                                            className="w-full border rounded p-2 text-xs"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-gray-600">Ukuran Botol</label>
                                        <input
                                            type="text"
                                            value={vume.size || ""}
                                            onChange={(e) => handleVumeChange(idx, "size", e.target.value)}
                                            className="w-full border rounded p-2 text-xs mt-1"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* 4. GIGS & SERVICES TAB */}
                {activeTab === "gigs" && (
                    <div className="space-y-6">
                        <header className="border-b pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Gigs & Art Services</h2>
                            <p className="text-xs text-gray-500">Kelola portofolio layanan komisi / jasa ilustrasi</p>
                        </header>

                        {/* Add New Gig Form */}
                        <form onSubmit={handleAddGig} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                            <h3 className="font-bold text-base text-gray-800">Tambah Jasa / Gig Baru</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                <input
                                    type="text"
                                    placeholder="Judul Jasa"
                                    value={newGig.title}
                                    onChange={(e) => setNewGig({ ...newGig, title: e.target.value })}
                                    className="border rounded p-2 text-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Kategori"
                                    value={newGig.category}
                                    onChange={(e) => setNewGig({ ...newGig, category: e.target.value })}
                                    className="border rounded p-2 text-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="Harga Mulai Dari"
                                    value={newGig.price}
                                    onChange={(e) => setNewGig({ ...newGig, price: e.target.value })}
                                    className="border rounded p-2 text-xs"
                                />
                                <input
                                    type="text"
                                    placeholder="URL Sampel Gambar"
                                    value={newGig.image}
                                    onChange={(e) => setNewGig({ ...newGig, image: e.target.value })}
                                    className="border rounded p-2 text-xs"
                                />
                            </div>
                            <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded text-xs font-semibold">
                                + Simpan Gig Baru
                            </button>
                        </form>

                        {/* Gig List */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {(gigs || []).map((gig) => (
                                <div key={gig.id} className="bg-white p-4 rounded-xl shadow-sm border space-y-3">
                                    {gig.image && (
                                        <img src={gig.image} alt={gig.title} className="w-full h-32 object-cover rounded-lg" />
                                    )}
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-sm text-gray-800">{gig.title}</h4>
                                            <p className="text-xs text-gray-500">{gig.category}</p>
                                            <p className="text-xs font-semibold text-[#6B7CB4] mt-1">{gig.price}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteGig(gig.id)}
                                            className="text-red-500 text-xs font-bold hover:bg-red-50 p-1.5 rounded"
                                        >
                                            Hapus
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}