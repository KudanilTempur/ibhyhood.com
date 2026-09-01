import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Merch", path: "/merch" },
        { name: "Vume", path: "/vume" },
        { name: "Gigs", path: "/gigs" },
    ];

    return (
        <nav className="fixed top-0 left-0 z-50 w-full bg-[#6B7CB4] px-4 sm:px-10 py-4 text-white shadow-md">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <Link to="/" className="font-bold text-lg sm:text-xl tracking-wide">
                    Ibhyhood
                </Link>

                {/* Container Navigasi Desktop & Mobile Toggle */}
                <div className="flex items-center gap-3 sm:gap-8">
                    {/* Navigasi Desktop */}
                    <div className="hidden sm:flex gap-8 text-sm font-medium items-center">
                        {navLinks.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    isActive
                                        ? "border-b-2 border-white pb-0.5 font-semibold"
                                        : "hover:opacity-80 transition-opacity"
                                }
                            >
                                {item.name}
                            </NavLink>
                        ))}
                    </div>

                    {/* Tombol Hamburger Mobile */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="sm:hidden p-2 rounded-lg hover:bg-white/10 transition active:scale-95"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Menu Dropdown Mobile */}
            {isOpen && (
                <div className="sm:hidden mt-3 pb-2 border-t border-white/20 pt-3 flex flex-col gap-1 font-medium animate-in fade-in slide-in-from-top-2">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                                `px-4 py-2.5 rounded-xl text-sm transition-colors ${isActive
                                    ? "bg-white/25 font-bold"
                                    : "hover:bg-white/10 opacity-90"
                                }`
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    );
}