import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroVume from "../assets/images/hero-vume.png";

export default function VumePage() {
    return (
        <main className="min-h-screen flex flex-col bg-white">
            <Navbar />

            {/* Hero Vume dengan Offset Navbar */}
            <section className="pt-16 sm:pt-12">
                <img
                    src={heroVume}
                    alt="Vume Hero"
                    className="w-full h-auto object-cover"
                />
            </section>

            {/* Bestseller Section */}
            <section className="flex-1 px-4 sm:px-6 py-8 sm:py-12">
                <div className="text-center">
                    <p className="text-[10px] sm:text-xs tracking-[3px] text-gray-500 font-semibold">BATCH 1</p>
                    <h2 className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-light tracking-wide text-gray-900">
                        OUR BESTSELLERS
                    </h2>
                </div>

                {/* VOICI */}
                <div className="mx-auto mt-10 sm:mt-16 flex flex-col md:flex-row max-w-6xl items-center gap-8 md:gap-12">
                    <div className="h-64 w-64 sm:h-72 sm:w-72 shrink-0 rounded-xl bg-[#E5CADD] shadow-sm">
                        {/* tempat gambar parfum */}
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-gray-900">
                            VOICI
                        </h3>

                        <p className="mt-1 italic text-gray-600 text-sm sm:text-base">
                            Eau de Parfum
                        </p>

                        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-700 space-y-1">
                            <p className="font-semibold text-gray-900">Note</p>
                            <p>Top : Orange Mandarin</p>
                            <p>Middle : Honey, Orange Blossom, Jasmine</p>
                            <p>Base : Caramel, Patchouli</p>
                        </div>

                        <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-medium text-gray-800">
                            Size : 30ml
                        </p>
                    </div>
                </div>

                {/* Tagline Responsive */}
                <div className="my-10 sm:my-16 flex flex-wrap justify-center items-center gap-3 sm:gap-8 text-sm sm:text-xl text-gray-600 font-light">
                    <span>Eau De Parfume</span>
                    <span className="hidden sm:inline">|</span>
                    <span>Home Made</span>
                    <span className="hidden sm:inline">|</span>
                    <span>Intimate</span>
                </div>

                {/* PHANTOVI */}
                <div className="mx-auto flex flex-col-reverse md:flex-row max-w-6xl items-center gap-8 md:gap-12">
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-3xl sm:text-5xl font-medium tracking-tight text-gray-900">
                            PHANTOVI
                        </h3>

                        <p className="mt-1 italic text-gray-600 text-sm sm:text-base">
                            Wood & Candy
                        </p>

                        <div className="mt-4 sm:mt-6 text-xs sm:text-sm text-gray-700 space-y-1">
                            <p className="font-semibold text-gray-900">Note</p>
                            <p>Top : Saffron, Jasmine</p>
                            <p>Middle : Ambergris, Sugar</p>
                            <p>Base : Fir Resin, Amber Wood</p>
                        </div>

                        <p className="mt-4 sm:mt-6 text-xs sm:text-sm font-medium text-gray-800">
                            Size : 30ml
                        </p>
                    </div>

                    <div className="h-64 w-64 sm:h-72 sm:w-72 shrink-0 rounded-xl bg-[#BFE5EE] shadow-sm">
                        {/* tempat gambar parfum */}
                    </div>
                </div>
            </section>

            {/* Reusable Footer Component */}
            <Footer />
        </main>
    );
}