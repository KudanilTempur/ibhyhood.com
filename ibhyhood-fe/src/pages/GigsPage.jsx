import { useState } from "react";
import { Link } from "react-router-dom";
import { GIGS_DATA } from "../data/gigsData";
import GigDetailModal from "../components/GigDetailModal";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function GigsPage() {
    const [selectedGig, setSelectedGig] = useState(null);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="px-8 py-10 max-w-4xl pt-24">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                    You'll Find Gigs <br />
                    That <span className="text-[#6B7CB4]">Bring Your Ideas to Life</span> <br />
                    Just The Way You Imagine
                </h1>
                <p className="text-gray-500 text-xs md:text-sm mt-3">
                    With our services: illustrations, logos, design, and more. Affordable. Fast. Professional.
                </p>
            </section>

            {/* Catalog Grid */}
            <main className="px-8 pb-16 flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {GIGS_DATA.map((gig) => (
                        <div
                            key={gig.id}
                            onClick={() => setSelectedGig(gig)}
                            className="bg-[#C1D0FF]/40 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all flex flex-col group"
                        >
                            {/* Card Image Placeholder */}
                            <div className="h-40 bg-gray-300 relative flex items-end justify-center pb-2">
                                {/* Dots indicator */}
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                                    <span className="w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                                <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#6B7CB4] transition-colors line-clamp-2">
                                    {gig.title}
                                </h3>

                                <div className="pt-2 border-t border-gray-200/60 flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Starting at</span>
                                    <span className="font-bold text-xs md:text-sm text-gray-900">
                                        {gig.startingPrice || "IDR xxx.xxx"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Overlay Modal */}
            {selectedGig && (
                <GigDetailModal
                    gig={selectedGig}
                    onClose={() => setSelectedGig(null)}
                />
            )}

            {/* Footer */}
            <Footer />
        </div>
    );
}