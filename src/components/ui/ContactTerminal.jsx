import { useState, useEffect } from 'react';
import useStore from '../../store/useStore';

export default function ContactTerminal() {
    const { isModalOpen, modalType, closeModal } = useStore();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([]);
    const [currentField, setCurrentField] = useState('name');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    // Terminal boot sequence
    useEffect(() => {
        if (isModalOpen && modalType === 'contact') {
            setHistory([
                { type: 'system', text: 'COMMS ARRAY v2.1.0 - INITIALIZED' },
                { type: 'system', text: 'Establishing secure connection...' },
                { type: 'success', text: 'CONNECTION ESTABLISHED' },
                { type: 'system', text: '---' },
                { type: 'prompt', text: 'Enter your designation (name):' },
            ]);
            setCurrentField('name');
            setFormData({ name: '', email: '', message: '' });
            setInput('');
        }
    }, [isModalOpen, modalType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newHistory = [...history, { type: 'input', text: `> ${input}` }];

        if (currentField === 'name') {
            setFormData({ ...formData, name: input });
            newHistory.push({ type: 'success', text: `Designation recorded: ${input}` });
            newHistory.push({ type: 'prompt', text: 'Enter communication frequency (email):' });
            setCurrentField('email');
        } else if (currentField === 'email') {
            setFormData({ ...formData, email: input });
            newHistory.push({ type: 'success', text: `Frequency locked: ${input}` });
            newHistory.push({ type: 'prompt', text: 'Compose your transmission (message):' });
            setCurrentField('message');
        } else if (currentField === 'message') {
            setFormData({ ...formData, message: input });
            newHistory.push({ type: 'success', text: 'Message encoded.' });
            newHistory.push({ type: 'system', text: '---' });
            newHistory.push({ type: 'system', text: 'TRANSMISSION QUEUED FOR DELIVERY' });
            newHistory.push({ type: 'success', text: '✓ Your message has been received!' });
            newHistory.push({ type: 'system', text: 'Expect a response within 24-48 hours.' });
            setCurrentField('done');
        }

        setHistory(newHistory);
        setInput('');
    };

    if (!isModalOpen || modalType !== 'contact') return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop"
            style={{ backgroundColor: 'rgba(5, 5, 8, 0.95)' }}
            onClick={closeModal}
        >
            <div
                className="glass-panel rounded-lg max-w-2xl w-full modal-enter relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{ borderColor: '#ff00ff40' }}
            >
                {/* Terminal header */}
                <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-neon-pink/30">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/70" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                            <div className="w-3 h-3 rounded-full bg-green-500/70" />
                        </div>
                        <span className="text-xs text-neon-pink font-mono">
                            COMMS_TERMINAL — /secure/transmit
                        </span>
                    </div>
                    <button
                        onClick={closeModal}
                        className="text-neon-pink hover:text-white transition-colors"
                    >
                        ×
                    </button>
                </div>

                {/* Terminal body */}
                <div className="p-6 font-mono text-sm h-96 overflow-y-auto bg-black/30">
                    {/* History */}
                    {history.map((line, i) => (
                        <div
                            key={i}
                            className={`mb-1 ${line.type === 'system' ? 'text-gray-500' :
                                    line.type === 'success' ? 'text-green-400' :
                                        line.type === 'prompt' ? 'text-neon-pink' :
                                            line.type === 'input' ? 'text-neon-cyan' :
                                                'text-white'
                                }`}
                        >
                            {line.text}
                        </div>
                    ))}

                    {/* Input line */}
                    {currentField !== 'done' && (
                        <form onSubmit={handleSubmit} className="flex items-center mt-2">
                            <span className="text-neon-cyan mr-2">{'>'}</span>
                            <input
                                type={currentField === 'email' ? 'email' : 'text'}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none text-white font-mono"
                                placeholder={
                                    currentField === 'name' ? 'Your name...' :
                                        currentField === 'email' ? 'your@email.com' :
                                            'Type your message...'
                                }
                                autoFocus
                            />
                            <span className="animate-pulse text-neon-cyan">_</span>
                        </form>
                    )}

                    {/* Done state */}
                    {currentField === 'done' && (
                        <div className="mt-4 pt-4 border-t border-gray-800">
                            <button
                                onClick={closeModal}
                                className="btn-neon text-sm"
                                style={{ borderColor: '#ff00ff', color: '#ff00ff' }}
                            >
                                CLOSE TERMINAL
                            </button>
                        </div>
                    )}
                </div>

                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none scanlines" />
            </div>
        </div>
    );
}
