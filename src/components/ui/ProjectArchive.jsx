import { useState } from 'react';
import useStore from '../../store/useStore';
import { projects } from '../../data/projects';

export default function ProjectArchive() {
    const { viewMode, openModal } = useStore();
    const [hoveredId, setHoveredId] = useState(null);

    // We need to inject "About Me" into the list manually since it's not in projects array
    const allItems = [
        {
            id: 'about',
            name: 'About Me',
            tagline: 'Creative Developer',
            description: 'Explore my background, skills, and mission as a developer operating in the digital cosmos.',
            color: '#00f5ff',
            techStack: ['Profile', 'Skills', 'Bio'],
            status: 'Online',
            isAbout: true // Flag to handle click differently
        },
        ...projects
    ];

    if (viewMode !== 'list') return null;

    const handleItemClick = (item) => {
        if (item.isAbout) {
            openModal('about');
        } else if (item.isContact) {
            openModal('contact');
        } else {
            openModal('project', item);
        }
    };

    return (
        <div className="fixed inset-0 z-20 overflow-y-auto pt-24 pb-12 px-4 md:px-12 bg-black/90 animate-fade-in">
            {/* Background decorations */}
            <div className="fixed inset-0 pointer-events-none scanlines opacity-20"></div>

            <div className="max-w-7xl mx-auto">
                <div className="mb-8 border-b border-gray-800 pb-4 flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-display text-gray-400 tracking-widest">
                    // ARCHIVE_ACCESS
                        </h2>
                        <p className="text-sm text-gray-600 font-mono mt-1">
                            DIRECTORY LISTING • {allItems.length} FILES FOUND
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`
                relative p-6 rounded-lg border transition-all duration-300 cursor-pointer
                group overflow-hidden
                ${hoveredId === item.id ? 'bg-white/5 scale-[1.02]' : 'bg-black/40'}
              `}
                            style={{
                                borderColor: item.color + '40',
                                boxShadow: hoveredId === item.id ? `0 0 20px ${item.color}20` : 'none',
                                animationDelay: `${index * 50}ms`
                            }}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => handleItemClick(item)}
                        >
                            {/* Glow effect on hover */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at center, ${item.color}10, transparent 70%)`
                                }}
                            />

                            {/* Header */}
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div
                                    className="w-10 h-10 rounded flex items-center justify-center border"
                                    style={{
                                        borderColor: item.color,
                                        backgroundColor: item.color + '10'
                                    }}
                                >
                                    <span className="text-xl" style={{ color: item.color }}>
                                        {item.isAbout ? '👤' : item.isContact ? '📡' : '🪐'}
                                    </span>
                                </div>
                                <div className="px-2 py-1 rounded text-[10px] font-mono border" style={{ color: item.color, borderColor: item.color + '30' }}>
                                    {item.status.toUpperCase()}
                                </div>
                            </div>

                            {/* Content */}
                            <h3
                                className="text-xl font-display mb-2 group-hover:tracking-wider transition-all duration-300"
                                style={{ color: item.color }}
                            >
                                {item.name.toUpperCase()}
                            </h3>

                            <p className="text-sm text-gray-400 mb-4 line-clamp-2 h-10">
                                {item.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.techStack.slice(0, 3).map(tech => (
                                    <span
                                        key={tech}
                                        className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/10"
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {item.techStack.length > 3 && (
                                    <span className="text-[10px] px-2 py-0.5 text-gray-500">+{item.techStack.length - 3}</span>
                                )}
                            </div>

                            {/* Link */}
                            <div className="flex items-center text-xs font-mono group-hover:translate-x-1 transition-transform" style={{ color: item.color }}>
                                <span>ACCESS_FILE</span>
                                <span className="ml-2">→</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
