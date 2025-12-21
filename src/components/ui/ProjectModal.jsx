import useStore from '../../store/useStore';

export default function ProjectModal() {
    const { isModalOpen, modalType, activeProject, closeModal } = useStore();

    if (!isModalOpen || modalType !== 'project' || !activeProject) return null;

    const statusColors = {
        'Completed': 'text-green-400 border-green-400/30 bg-green-400/10',
        'In Development': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
        'Writing': 'text-purple-400 border-purple-400/30 bg-purple-400/10',
    };

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
                style={{ borderColor: activeProject.color + '40' }}
            >
                {/* Drag handle for mobile */}
                <div className="md:hidden flex justify-center pt-3 pb-2">
                    <div
                        className="w-12 h-1 rounded-full opacity-50"
                        style={{ backgroundColor: activeProject.color }}
                    />
                </div>

                {/* Close button - larger touch target on mobile */}
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-10 h-10 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-2xl z-10"
                    style={{ color: activeProject.color }}
                >
                    ×
                </button>

                {/* Scrollable content */}
                <div className="overflow-y-auto max-h-[calc(85vh-60px)] md:max-h-[calc(90vh-20px)] px-5 pb-6 md:p-8">
                    {/* Header with glowing planet indicator */}
                    <div className="mb-5 md:mb-6">
                        <div className="flex items-center gap-3 mb-3">
                            {/* Animated planet dot */}
                            <div className="relative">
                                <div
                                    className="w-5 h-5 md:w-4 md:h-4 rounded-full animate-pulse"
                                    style={{
                                        backgroundColor: activeProject.color,
                                        boxShadow: `0 0 20px ${activeProject.color}, 0 0 40px ${activeProject.color}50`
                                    }}
                                />
                                <div
                                    className="absolute inset-0 rounded-full animate-ping opacity-30"
                                    style={{ backgroundColor: activeProject.color }}
                                />
                            </div>
                            <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[activeProject.status] || 'text-gray-400'}`}>
                                {activeProject.status}
                            </span>
                        </div>

                        <h2
                            className="font-display text-2xl md:text-3xl mb-1 leading-tight"
                            style={{ color: activeProject.color, textShadow: `0 0 30px ${activeProject.color}` }}
                        >
                            {activeProject.name.toUpperCase()}
                        </h2>
                        <p className="text-gray-400 text-sm italic">{activeProject.tagline}</p>

                        {/* Gradient divider */}
                        <div
                            className="h-0.5 mt-4 rounded-full"
                            style={{ background: `linear-gradient(to right, ${activeProject.color}, ${activeProject.color}20, transparent)` }}
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-5 md:space-y-6">
                        {/* Description */}
                        <div>
                            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeProject.color }} />
                                MISSION BRIEF
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                {activeProject.description}
                            </p>
                        </div>

                        {/* Tech stack - horizontal scroll on mobile */}
                        <div>
                            <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeProject.color }} />
                                TECHNOLOGIES
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {activeProject.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 text-xs rounded-full border font-medium"
                                        style={{
                                            color: activeProject.color,
                                            borderColor: activeProject.color + '40',
                                            backgroundColor: activeProject.color + '15'
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Stats - visual cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <div
                                className="p-4 rounded-xl border"
                                style={{
                                    borderColor: activeProject.color + '20',
                                    background: `linear-gradient(135deg, ${activeProject.color}08, transparent)`
                                }}
                            >
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase mb-1">Orbit Radius</p>
                                <p className="text-xl md:text-2xl font-display" style={{ color: activeProject.color }}>
                                    {activeProject.orbitRadius}
                                    <span className="text-sm ml-1 opacity-60">AU</span>
                                </p>
                            </div>
                            <div
                                className="p-4 rounded-xl border"
                                style={{
                                    borderColor: activeProject.color + '20',
                                    background: `linear-gradient(135deg, ${activeProject.color}08, transparent)`
                                }}
                            >
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase mb-1">Velocity</p>
                                <p className="text-xl md:text-2xl font-display" style={{ color: activeProject.color }}>
                                    {activeProject.orbitSpeed}
                                    <span className="text-sm ml-1 opacity-60">rad/s</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Footer - sticky on mobile */}
                    <div className="mt-6 pt-4 border-t border-gray-800/50">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                            <p className="text-[10px] md:text-xs text-gray-600 font-mono order-2 md:order-1 text-center md:text-left">
                                ID: {activeProject.id.toUpperCase()}
                            </p>
                            <div className="flex gap-3 order-1 md:order-2">
                                {activeProject.link && activeProject.link !== '#' && (
                                    <a
                                        href={activeProject.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 md:flex-none btn-neon text-sm text-center py-3 md:py-2"
                                        style={{ borderColor: activeProject.color, color: activeProject.color }}
                                    >
                                        LAUNCH
                                    </a>
                                )}
                                <button
                                    onClick={closeModal}
                                    className="flex-1 md:flex-none btn-neon text-sm py-3 md:py-2"
                                >
                                    CLOSE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />
            </div>
        </div>
    );
}
