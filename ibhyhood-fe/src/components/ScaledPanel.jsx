import bgPanel from "../assets/images/bg-panel.png";

export default function ScaledPanel({ children }) {
    return (
        <div className="relative h-full w-full overflow-hidden rounded-[42px] shadow-2xl shadow-black/50">
            {/* Layer 0: background panel, absolute, jadi keluar dari flow */}
            <img
                src={bgPanel}
                alt="Panel Background"
                className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none select-none"
            />
            {/* Layer 1: konten, di atas bg-panel */}
            <div className="relative h-full w-full">
                {children}
            </div>
        </div>
    );
}