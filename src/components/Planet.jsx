import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '../store/useStore';

export default function Planet({ project, index }) {
    const meshRef = useRef();
    const groupRef = useRef();
    const { setFocus, openModal, focusTarget } = useStore();

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const { orbitRadius, orbitSpeed, color, name } = project;

    // Larger planets on mobile for better visibility
    const size = isMobile ? project.size * 1.4 : project.size;

    // Starting angle offset for each planet (spread across 5 planets now)
    const startAngle = useMemo(() => (index * Math.PI * 2) / 5, [index]);

    // Orbital animation
    useFrame((state) => {
        if (groupRef.current) {
            const angle = startAngle + state.clock.elapsedTime * orbitSpeed;
            groupRef.current.position.x = Math.cos(angle) * orbitRadius;
            groupRef.current.position.z = Math.sin(angle) * orbitRadius;

            // Gentle floating motion
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;
        }

        // Planet rotation
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.005;
            meshRef.current.rotation.x += 0.002;
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        setFocus(`planet-${index}`);
        // Open contact modal for the comms array planet
        if (project.isContact) {
            openModal('contact');
        } else {
            openModal('project', project);
        }
    };

    const isActive = focusTarget === `planet-${index}`;

    // Create glow texture
    const glowTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, color);
        gradient.addColorStop(0.3, color + '80');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);

        return new THREE.CanvasTexture(canvas);
    }, [color]);

    // Glow size - bigger on mobile
    const glowSize = isMobile ? size * 5 : size * 4;

    return (
        <group ref={groupRef}>
            {/* Main planet mesh */}
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'default'}
            >
                <icosahedronGeometry args={[size, 1]} />
                <meshBasicMaterial
                    color={color}
                    wireframe={!isActive}
                    transparent
                    opacity={isActive ? 1 : 0.8}
                />
            </mesh>

            {/* Inner core */}
            <mesh>
                <icosahedronGeometry args={[size * 0.6, 0]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Glow sprite - larger on mobile */}
            <sprite scale={[glowSize, glowSize, 1]}>
                <spriteMaterial
                    map={glowTexture}
                    transparent
                    opacity={isActive ? 0.7 : 0.4}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </sprite>

            {/* Html Labels - larger and more visible on mobile */}
            <Html
                position={[0, size + (isMobile ? 1.2 : 0.8), 0]}
                center
                distanceFactor={isMobile ? 6 : 8}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                <div className="text-center whitespace-nowrap">
                    <p
                        className="font-display tracking-wider font-bold"
                        style={{
                            fontSize: isMobile ? '14px' : '12px',
                            color: color,
                            textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}50`
                        }}
                    >
                        {name.toUpperCase()}
                    </p>
                    <p
                        className="text-gray-300 mt-0.5 font-medium"
                        style={{ fontSize: isMobile ? '11px' : '10px' }}
                    >
                        {project.status}
                    </p>
                </div>
            </Html>
        </group>
    );
}
