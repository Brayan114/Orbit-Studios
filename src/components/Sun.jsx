import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '../store/useStore';

export default function Sun() {
    const meshRef = useRef();
    const glowRef = useRef();
    const { setFocus, openModal, focusTarget } = useStore();

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Larger sun on mobile
    const coreSize = isMobile ? 1.6 : 1.2;
    const innerSize = isMobile ? 1.1 : 0.8;
    const glowSize = isMobile ? 8 : 6;

    // Pulsing animation
    useFrame((state) => {
        if (meshRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 2) * 0.1 + 1;
            meshRef.current.scale.setScalar(pulse);
        }
        if (glowRef.current) {
            const glowPulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.2 + 0.8;
            glowRef.current.material.opacity = glowPulse * 0.6;
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        setFocus('sun');
        openModal('about');
    };

    const isActive = focusTarget === 'sun';

    return (
        <group position={[0, 0, 0]}>
            {/* Core geometry */}
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'default'}
            >
                <icosahedronGeometry args={[coreSize, 2]} />
                <meshBasicMaterial
                    color={isActive ? '#00ffff' : '#00f5ff'}
                    wireframe
                />
            </mesh>

            {/* Inner solid core */}
            <mesh>
                <icosahedronGeometry args={[innerSize, 1]} />
                <meshBasicMaterial
                    color="#00f5ff"
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Glow sprite (fallback when bloom disabled) */}
            <sprite ref={glowRef} scale={[glowSize, glowSize, 1]}>
                <spriteMaterial
                    map={createGlowTexture()}
                    color="#00f5ff"
                    transparent
                    opacity={0.5}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </sprite>

            {/* Html Label - larger on mobile */}
            <Html
                position={[0, coreSize + (isMobile ? 1.5 : 1), 0]}
                center
                distanceFactor={isMobile ? 7 : 10}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                <div className="text-center whitespace-nowrap">
                    <p
                        className="font-display tracking-widest font-bold"
                        style={{
                            fontSize: isMobile ? '16px' : '14px',
                            color: '#00f5ff',
                            textShadow: '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 30px #00f5ff50'
                        }}
                    >
                        ABOUT ME
                    </p>
                </div>
            </Html>
        </group>
    );
}

// Create a radial gradient texture for glow effect
function createGlowTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, 'rgba(0, 245, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(0, 245, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(0, 245, 255, 0.1)');
    gradient.addColorStop(1, 'rgba(0, 245, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
}
