import bgHome from "../assets/images/bg-home.png";
import heroMain from "../assets/images/hero-main-full.png";
import sideButtonSurface from "../assets/images/side-button-surface.png";
import ScaledPanel from "../components/ScaledPanel";
import ibhyLogo from "../assets/images/ibhy-logo.png";
import planeButton from "../assets/images/plane-button.png";

const bgImageStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
};

export default function HomePage() {
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
            <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                <div className="relative h-[90%] w-[90%] max-w-[1440px]">
                    <ScaledPanel>
                        <HeroImageStack
                            heroImage={heroMain}
                            sideImage={sideButtonSurface}
                            logoImage={ibhyLogo}
                            iconButton={planeButton}
                        />


                    </ScaledPanel>
                </div>
            </div>
        </main>
    );
}

function HeroImageStack({ heroImage, sideImage, logoImage, iconButton }) {
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
                    -left-[2%]
                    -top-[4%]
                    z-20
                    h-[64%]
                    w-auto
                    select-none
                    object-contain
                "
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
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                className="
        absolute
        left-0
        top-[101.5%]
        z-30
        flex
        h-[18%]
        w-full
        items-center
        rounded-full
        bg-white
        pl-[4%] pr-[1%]
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