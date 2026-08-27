import heroVume from "../assets/images/hero-vume.png";
import logoVume from "../assets/images/logo-vume.png";

export default function VumePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Navbar */}
            <nav className="bg-[#7E8FC4] fixed top-0 w-full">
                <ul className="flex justify-end gap-36 py-6 pr-36 text-l text-white ">
                    <li><a href="\">Home</a> </li>
                    <li>Merch</li>
                    <li>Vume</li>
                    <li>Gigs</li>
                </ul>
            </nav>

            {/* Hero */}
            <section>
                <img
                    src={heroVume}
                    alt="Vume Hero"
                    className="w-full"
                />
            </section>

            {/* Bestseller */}
            <section className="px-6 py-12">
                <div className="text-center">
                    <p className="text-xs tracking-[3px]">BATCH 1</p>

                    <h2 className="mt-2 text-4xl font-light">
                        OUR BESTSELLERS
                    </h2>
                </div>

                {/* VOICI */}
                <div className="mx-auto mt-16 flex max-w-6xl items-center gap-12">
                    <div className="h-72 w-72 rounded-xl bg-[#E5CADD] shrink-0">
                        {/* nanti ganti img parfum */}
                    </div>

                    <div>
                        <h3 className="text-5xl font-medium">VOICI</h3>

                        <p className="mt-1 italic">
                            Eau de Parfum
                        </p>

                        <div className="mt-6 text-sm">
                            <p className="font-semibold">Note</p>

                            <p>Top : Orange Mandarin</p>
                            <p>
                                Middle : Honey, Orange Blossom,
                                Jasmine
                            </p>
                            <p>Base : Caramel, Patchouli</p>
                        </div>

                        <p className="mt-6 text-sm">
                            Size : 30ml
                        </p>
                    </div>
                </div>

                {/* Tagline */}
                <div className="my-16 flex justify-center gap-8 text-xl">
                    <span>Eau De Parfume</span>
                    <span>|</span>
                    <span>Home Made</span>
                    <span>|</span>
                    <span>Intimate</span>
                </div>

                {/* PHANTOVI */}
                <div className="mx-auto flex max-w-6xl items-center gap-12">
                    <div className="flex-1">
                        <h3 className="text-5xl font-medium">
                            PHANTOVI
                        </h3>

                        <p className="mt-1 italic">
                            Wood & Candy
                        </p>

                        <div className="mt-6 text-sm">
                            <p className="font-semibold">Note</p>

                            <p>Top : Saffron, Jasmine</p>
                            <p>Middle : Ambergris, Sugar</p>
                            <p>Base : Fir Resin, Amber Wood</p>
                        </div>

                        <p className="mt-6 text-sm">
                            Size : 30ml
                        </p>
                    </div>

                    <div className="h-72 w-72 rounded-xl bg-[#BFE5EE] shrink-0">
                        {/* nanti ganti img parfum */}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-12 bg-[#DDE1F5] px-8 py-10">
                <div className="flex items-center justify-between">
                    <img
                        src={logoVume}
                        alt="Vume"
                        className="h-10"
                    />

                    <div className="text-right text-sm">
                        <div className="mb-2 flex justify-end gap-3">
                            <span>FB</span>
                            <span>IG</span>
                            <span>TikTok</span>
                        </div>

                        <p>@vume.co</p>

                        <p className="mt-4">
                            Contact
                        </p>

                        <p>ibhyhood@gmail.com</p>

                        <p className="mt-6">
                            Copyright ©2026
                        </p>
                    </div>
                </div>
            </footer>
        </main>
    );
}