import useStore from '../../store/useStore';

export default function AboutModal() {
    const { isModalOpen, modalType, closeModal } = useStore();

    if (!isModalOpen || modalType !== 'about') return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center modal-backdrop"
            style={{ backgroundColor: 'rgba(5, 5, 8, 0.95)' }}
            onClick={closeModal}
        >
            {/* Mobile: Slide up from bottom, Desktop: Centered modal */}
            <div
                className="glass-panel w-full md:max-w-2xl md:mx-4 md:rounded-lg rounded-t-2xl max-h-[85vh] md:max-h-[90vh] overflow-hidden modal-enter relative"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Drag handle for mobile */}
                <div className="md:hidden flex justify-center pt-3 pb-2">
                    <div className="w-12 h-1 rounded-full bg-neon-cyan/50" />
                </div>

                {/* Close button - larger touch target on mobile */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full text-neon-cyan hover:bg-white/10 transition-colors text-2xl z-10"
                >
                    ×
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[calc(85vh-60px)] md:max-h-[calc(90vh-20px)] px-5 pb-6 md:p-8">
                    {/* Header */}
                    <div className="mb-5 md:mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="relative">
                                <div className="w-5 h-5 md:w-4 md:h-4 rounded-full bg-neon-cyan animate-pulse"
                                    style={{ boxShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff50' }}
                                />
                                <div className="absolute inset-0 rounded-full animate-ping opacity-30 bg-neon-cyan" />
                            </div>
                            <span className="text-xs px-2.5 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
                                ONLINE
                            </span>
                        </div>
                        <h2 className="font-display text-2xl md:text-3xl text-neon-cyan text-neon-glow mb-1">
                            OPERATOR PROFILE
                        </h2>
                        <div className="h-0.5 mt-4 rounded-full bg-gradient-to-r from-neon-cyan via-neon-cyan/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="space-y-5 md:space-y-6">
                        {/* Bio section */}
                        <div>
                            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                                DESIGNATION
                            </h3>
                            <p className="text-lg md:text-xl text-white font-display">
                                CREATIVE DEVELOPER
                            </p>
                            <p className="text-gray-400 mt-2 leading-relaxed text-sm md:text-base">
                                A passionate developer orbiting through the cosmos of code and creativity.
                                Building digital experiences that push the boundaries of what's possible on the web.
                                When not coding, I'm exploring new technologies, writing science fiction, or
                                dreaming up the next big project.
                            </p>
                        </div>

                        {/* Stats grid - 3 columns on all devices */}
                        <div className="grid grid-cols-3 gap-2 md:gap-4">
                            <div className="p-3 md:p-4 rounded-xl border border-neon-cyan/20 text-center"
                                style={{ background: 'linear-gradient(135deg, rgba(0,245,255,0.08), transparent)' }}>
                                <p className="text-xl md:text-2xl font-display text-neon-cyan">4+</p>
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase">Projects</p>
                            </div>
                            <div className="p-3 md:p-4 rounded-xl border border-neon-pink/20 text-center"
                                style={{ background: 'linear-gradient(135deg, rgba(255,0,255,0.08), transparent)' }}>
                                <p className="text-xl md:text-2xl font-display text-neon-pink">10+</p>
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase">Tech</p>
                            </div>
                            <div className="p-3 md:p-4 rounded-xl border border-neon-purple/20 text-center"
                                style={{ background: 'linear-gradient(135deg, rgba(179,0,255,0.08), transparent)' }}>
                                <p className="text-xl md:text-2xl font-display text-neon-purple">∞</p>
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase">Curiosity</p>
                            </div>
                        </div>

                        {/* Mission statement */}
                        <div className="p-4 rounded-xl border-l-2 border-neon-cyan bg-neon-cyan/5">
                            <p className="text-sm text-gray-400 italic leading-relaxed">
                                "In the vast expanse of the digital universe, every line of code is a star,
                                and every project is a new world waiting to be explored."
                            </p>
                        </div>

                        {/* Skills preview */}
                        <div>
                            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-neon-cyan" />
                                SKILL MATRIX
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Python', 'Java', 'JavaScript', 'TypeScript', 'React', 'HTML/CSS', 'Node.js', 'Three.js'].map((skill) => (
                                    <span
                                        key={skill}
                                        className="px-3 py-1.5 text-xs rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-4 border-t border-gray-800/50">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <p className="text-[10px] md:text-xs text-gray-600 font-mono order-2 md:order-1 text-center md:text-left">
                                ID: OPERATOR-001 • CLEARANCE: ALPHA
                            </p>
                            <button
                                onClick={closeModal}
                                className="btn-neon text-sm py-3 md:py-2 order-1 md:order-2"
                            >
                                CLOSE TRANSMISSION
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />
            </div>
        </div>
    );
}
