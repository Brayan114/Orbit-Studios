import useStore from '../../store/useStore';

export default function HUD() {
    const { focusTarget, resetView } = useStore();

    return (
        <div className="fixed inset-0 pointer-events-none z-10">
            {/* Top left - Logo/Title */}
            <div className="absolute top-6 left-6">
                <h1 className="font-display text-2xl text-neon-cyan text-neon-glow tracking-widest">
                    ORBIT STUDIOS
                </h1>
                <p className="text-xs text-gray-500 mt-1 tracking-wide">
                    BASE OF OPERATIONS
                </p>
            </div>

            {/* Top right - Navigation hint */}
            <div className="absolute top-6 right-6 text-right">
                <p className="text-xs text-gray-500 tracking-wide">
                    {focusTarget ? (
                        <span className="text-neon-cyan">LOCKED ON TARGET</span>
                    ) : (
                        <span>CLICK TO EXPLORE</span>
                    )}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                    SCROLL TO ZOOM • DRAG TO ROTATE
                </p>
            </div>

            {/* Bottom left - Coordinates display */}
            <div className="absolute bottom-6 left-6">
                <div className="glass-panel px-4 py-2 rounded">
                    <p className="text-xs text-gray-500 font-mono">
                        SECTOR: <span className="text-neon-cyan">ALPHA-7</span>
                    </p>
                    <p className="text-xs text-gray-500 font-mono">
                        STATUS: <span className="text-green-400">OPERATIONAL</span>
                    </p>
                </div>
            </div>

            {/* Back button when focused */}
            {focusTarget && (
                <div className="absolute bottom-6 right-6 pointer-events-auto">
                    <button
                        onClick={resetView}
                        className="btn-neon"
                    >
                        ← RETURN TO ORBIT
                    </button>
                </div>
            )}

            {/* Center crosshair when not focused */}
            {!focusTarget && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border border-neon-cyan/30 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-neon-cyan/50 rounded-full" />
                    </div>
                </div>
            )}

            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-neon-cyan/20" />
            <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-neon-cyan/20" />
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-neon-cyan/20" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-neon-cyan/20" />
        </div>
    );
}
