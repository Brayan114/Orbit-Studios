import useStore from '../../store/useStore';

export default function HUD() {
    const { focusTarget, resetView, viewMode, setViewMode } = useStore();

    const isListMode = viewMode === 'list';

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {/* Top left - Logo/Title */}
            <div className="absolute top-6 left-6 pointer-events-auto">
                <h1 className="font-display text-2xl text-neon-cyan text-neon-glow tracking-widest cursor-pointer" onClick={() => window.location.reload()}>
                    ORBIT STUDIOS
                </h1>
                <p className="text-xs text-gray-500 mt-1 tracking-wide">
                    {isListMode ? 'ARCHIVE MODE' : 'BASE OF OPERATIONS'}
                </p>
            </div>

            {/* Top right - Navigation hint / Toggle */}
            <div className="absolute top-6 right-6 text-right z-50">
                <div className="flex flex-col items-end gap-2">
                    {/* View Toggle Button - Always visible and clickable */}
                    <button
                        onClick={() => setViewMode(isListMode ? 'orbit' : 'list')}
                        className="pointer-events-auto btn-neon px-4 py-2 bg-black/50 hover:bg-neon-cyan/10 flex items-center gap-2 transition-all relative z-50"
                    >
                        <span>{isListMode ? '🪐 RETURN TO ORBIT' : '📂 ACCESS ARCHIVES'}</span>
                    </button>

                    {/* Hints - Only in orbit mode */}
                    {!isListMode && (
                        <p className="text-xs text-gray-600 mt-1">
                            {focusTarget ? <span className="text-neon-cyan">LOCKED ON TARGET</span> : 'SCROLL TO ZOOM • DRAG TO ROTATE'}
                        </p>
                    )}
                </div>
            </div>

            {/* Bottom left - Coordinates display - Orbit only */}
            {!isListMode && (
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
            )}

            {/* Back button when focused - Orbit only */}
            {!isListMode && focusTarget && (
                <div className="absolute bottom-6 right-6 pointer-events-auto">
                    <button
                        onClick={resetView}
                        className="btn-neon"
                    >
                        ← RETURN TO ORBIT
                    </button>
                </div>
            )}

            {/* Center crosshair when not focused - Orbit only */}
            {!isListMode && !focusTarget && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-6 h-6 border border-neon-cyan/30 rounded-full flex items-center justify-center">
                        <div className="w-1 h-1 bg-neon-cyan/50 rounded-full" />
                    </div>
                </div>
            )}

            {/* Corner decorations - Visible in both but dimmed in list */}
            <div className={`transition-opacity duration-500 ${isListMode ? 'opacity-20' : 'opacity-100'}`}>
                <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-neon-cyan/20" />
                <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-neon-cyan/20" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-neon-cyan/20" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-neon-cyan/20" />
            </div>
        </div>
    );
}
