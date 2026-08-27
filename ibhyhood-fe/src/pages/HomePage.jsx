import bgHome from "../assets/images/bg-home.png";
import heroMain from "../assets/images/hero-main-full.png";
import sideButtonSurface from "../assets/images/side-button-surface.png";
import ScaledPanel from "../components/ScaledPanel";
import ibhyLogo from "../assets/images/ibhy-logo.png";
import planeButton from "../assets/images/plane-button.png";
import yellowShape from "../assets/images/yellow-shape.png";
import blackShape from "../assets/images/black-shape.png";
import homeButtonDefault from "../assets/icons/home-button-default.png";
import homeButtonClicked from "../assets/icons/home-button-clicked.png";

import merchandiseButtonDefault from "../assets/icons/merchandise-button-default.png";
import merchandiseButtonClicked from "../assets/icons/merchandise-button-clicked.png";

import perfumeButtonDefault from "../assets/icons/perfume-button-default.png";
import perfumeButtonClicked from "../assets/icons/perfume-button-clicked.png";

import gigsButtonDefault from "../assets/icons/gigs-button-default.png";
import gigsButtonClicked from "../assets/icons/gigs-button-clicked.png";

import VumePage from "./VumePage";

import { useNavigate } from "react-router-dom";


import pandaGiveaway from "../assets/images/panda-giveaway.png";
import { useState } from "react";

const bgImageStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
};

const getIndonesianMonth = () => {
    const months = [
        "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    const currentMonth = new Date().getMonth();
    return months[currentMonth];
};

export default function HomePage() {
    const [activeMenu, setActiveMenu] = useState(0);
    return (
        <main className="fixed inset-0 isolate h-dvh w-dvw overflow-hidden bg-black">
            {/* Background utama */}
            <img
                src={bgHome}
                alt="Background"
                style={bgImageStyle}
                className="z-0"
            />

            {/* Overlay */}
            <div className="absolute inset-0 z-10 bg-black/25" />

            {/* Panel + Content */}
            <div className="absolute inset-0 z-20 flex items-center justify-center p-[clamp(12px,2vw,32px)]">
                <div
                    className="relative"
                    style={{
                        width: "min(90vw, calc(90dvh * 1.566), 1680px)",
                        aspectRatio: "1433 / 915",
                        containerType: "inline-size",
                    }}
                >
                    <ScaledPanel>

                        <HeroImageStack
                            heroImage={heroMain}
                            sideImage={sideButtonSurface}
                            logoImage={ibhyLogo}
                            iconButton={planeButton}
                            activeMenu={activeMenu}
                            setActiveMenu={setActiveMenu}
                        />

                        <RightSchedule />
                        <GiveawayCard promoImage={pandaGiveaway} />
                    </ScaledPanel>
                </div>
            </div>
        </main>
    );
}

function HeroImageStack({
    heroImage,
    sideImage,
    logoImage,
    iconButton,
    activeMenu,
    setActiveMenu,
}) {
    return (
        <div
            className="
                absolute
                left-[1%]
                top-[2%]
                h-[80%]
                w-[68%]
            "
        >
            {/* Shape kiri, posisinya bebas keluar dari hero */}
            <img
                src={sideImage}
                alt="Side Surface"
                className="
        pointer-events-none
        absolute
        -left-[1%]
        -top-[2.5%]
        z-20
        h-[120%]
        w-auto
        select-none
        object-contain
    "
            />

            {/* Navigasi kiri, ikut skala HeroImageStack / side surface */}
            <SidebarMenu
                activeMenu={activeMenu}
                setActiveMenu={setActiveMenu}
            />

            {/* Hero utama */}
            <div className="absolute inset-0 z-10 overflow-hidden rounded-[36px]">
                <img
                    src={heroImage}
                    alt="Hero Main"
                    className="h-full w-full object-cover object-center"
                />
            </div>

            {/* Logo IBHYHOOD */}
            <img
                src={logoImage}
                alt="IBHYHOOD Logo"
                className="
                    pointer-events-none
                    absolute
                    bottom-[5%]
                    left-[5%]
                    z-30
                    w-[18%]
                    min-w-[120px]
                    select-none
                    object-contain
                "
            />
            {/* Button YouTube */}
            <a
                href="https://www.youtube.com/@IbhyHood"
                target="_blank"
                rel="noreferrer"
                className="
        absolute
        left-0
        top-[101.5%]
        z-30
        flex
        h-[16%]
        w-full
        items-center
        rounded-full
        bg-white
        pl-[4%]
        pr-[1%]
        text-black
        shadow-lg
        transition
        hover:scale-[1.01]
    "
            >
                <span className="ml-auto text-[clamp(14px,1.4vw,24px)] font-medium tracking-wide">
                    Go To Youtube..
                </span>

                <img
                    src={iconButton}
                    alt="Open YouTube"
                    className="
            ml-[3%]
            h-[78%]
            aspect-square
            select-none
            object-contain
        "
                />
            </a>
        </div>


    );
}

function SidebarMenu({
    activeMenu,
    setActiveMenu,
}) {
    const navigate = useNavigate();

    const menus = [
        {
            label: "Home",
            path: "/",
            defaultIcon: homeButtonDefault,
            clickedIcon: homeButtonClicked,
        },
        {
            label: "Merch",
            path: null,
            defaultIcon: merchandiseButtonDefault,
            clickedIcon: merchandiseButtonClicked,
        },
        {
            label: "Vume",
            path: "/vume",
            defaultIcon: perfumeButtonDefault,
            clickedIcon: perfumeButtonClicked,
        },
        {
            label: "Gigs",
            path: null,
            defaultIcon: gigsButtonDefault,
            clickedIcon: gigsButtonClicked,
        },
    ];

    return (
        <nav
            className="
                absolute
                left-[2.5%]
                top-[4.5%]
                z-40
                flex
                w-[20%]
                flex-col
                gap-[0.55em]
                p-[1.2%]
            "
        >
            {menus.map((menu, index) => {
                const isActive = activeMenu === index;

                return (
                    <button
                        key={menu.label}
                        onClick={() => {
                            setActiveMenu(index);

                            if (menu.path) {
                                navigate(menu.path);
                            }
                        }}
                        className={`
                            flex
                            items-center
                            gap-[10%]
                            rounded-full
                            px-[10%]
                            py-[5%]
                            text-left
                            text-[clamp(8px,1.05vw,18px)]
                            font-semibold
                            transition
                            ${isActive
                                ? "bg-black text-white"
                                : "text-black hover:bg-black/10"
                            }
                        `}
                    >
                        <img
                            src={
                                isActive
                                    ? menu.clickedIcon
                                    : menu.defaultIcon
                            }
                            alt={menu.label}
                            className="
                                h-[1.1em]
                                w-[1.1em]
                                shrink-0
                                object-contain
                            "
                        />

                        <span>
                            {menu.label}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
}

function RightSchedule() {
    const schedules = [
        {
            day: "31",
            title: "Mobile Legends",
            time: "[21.00/21.30 WIB]",
            type: "LIVE STREAM",
        },
        {
            day: "1",
            title: "REANIMAL",
            time: "[21.00/21.30 WIB]",
            type: "LIVE STREAM",
        },
        {
            day: "2",
            title: "Mobile Legends",
            time: "[21.00/21.30 WIB]",
            type: "LIVE STREAM",
        },
        {
            day: "3",
            title: "A SPACE FOR THE UNBOUND",
            time: "[21.00/21.30 WIB]",
            type: "LIVE STREAM",
        },
        {
            day: "4",
            title: "Mobile Legends",
            time: "[21.00/21.30 WIB]",
            type: "LIVE STREAM",
        },
        {
            day: "5",
            title: "Mobile Legends",
            time: "[21.00/21.30 WIB]",
            type: "LIVE STREAM",
        },
    ];

    return (
        <section
            className="
                absolute
                right-[1.4%]
                top-[3%]
                z-30
                h-[68%]
                w-[28%]
                overflow-hidden
                rounded-[34px]
                bg-white/90
                p-[1.1%]
            "
        >
            {/* Header */}
            <div className="mb-[4%] flex items-center justify-between gap-[4%]">
                <div className="relative h-[clamp(28px,4cqw,56px)] flex-1">
                    <img
                        src={blackShape}
                        alt=""
                        className="h-full w-full object-fill"
                    />
                </div>

                <div className="text-right leading-none">
                    <h2 className="text-[clamp(14px,1.7cqw,30px)] font-black italic tracking-wide text-black">
                        SCHEDULE
                    </h2>
                    <p className="text-[clamp(13px,1.45cqw,26px)] font-black italic text-black">
                        {getIndonesianMonth()}
                    </p>
                </div>
            </div>

            {/* List */}
            <div className="flex h-[86%] flex-col gap-[2.2%]">
                {schedules.map((item) => (
                    <article
                        key={`${item.day}-${item.title}`}
                        className="
                            flex
                            min-h-0
                            flex-1
                            items-center
                            justify-between
                            gap-[4%]
                            rounded-[22px]
                            bg-[#667AB3]
                            px-[4%]
                            py-[3%]
                        "
                    >
                        <div className="min-w-0 flex-1 leading-none">
                            <p className="text-[clamp(6px,0.75cqw,13px)] font-medium italic text-white/80">
                                [{item.type}]
                            </p>

                            <h3 className="mt-[2%] line-clamp-2 text-[clamp(10px,1.25cqw,23px)] font-black italic leading-[0.95] text-white">
                                {item.title}
                            </h3>

                            <p className="mt-[3%] text-right text-[clamp(6px,0.72cqw,12px)] font-black italic text-yellow-300">
                                {item.time}
                            </p>
                        </div>

                        <div
                            className="
                                flex
                                aspect-square
                                w-[20%]
                                shrink-0
                                items-center
                                justify-center
                                rounded-[16px]
                                bg-[#07070D]
                                text-[clamp(16px,2cqw,34px)]
                                font-black
                                italic
                                text-white
                            "
                        >
                            {item.day}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function GiveawayCard({ promoImage }) {
    return (
        <section
            className="
                absolute
                bottom-[3%]
                right-[1.4%]
                z-30
                h-[24%]
                w-[28%]
                overflow-hidden
                rounded-[28px]
                bg-black
            "
        >
            <img
                src={promoImage}
                alt="Giveaway"
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    object-center
                "
            />

            <div className="absolute inset-0 bg-black/10" />

            <div
                className="
        absolute
        left-[4%]
        top-[8%]
        h-[34%]
        w-[46%]
    "
            >
                <img
                    src={yellowShape}
                    alt=""
                    className="
            absolute
            inset-0
            h-full
            w-full
            object-fill
        "
                />

                <div
                    className="
            absolute
            inset-0
            flex
            flex-col
            justify-center
            px-[8%]
            text-black
        "
                >
                    <p className="text-[clamp(7px,0.9cqw,14px)] font-black italic leading-none">
                        GIVEAWAY ON JUNE
                    </p>

                    <p className="mt-[4%] text-[clamp(8px,1cqw,16px)] font-black italic leading-none">
                        1000 SUBS++
                    </p>
                </div>
            </div>
        </section>
    );
}