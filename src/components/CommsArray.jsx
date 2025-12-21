import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import useStore from '../store/useStore';

export default function CommsArray() {
    const groupRef = useRef();
    const dishRef = useRef();
    const { setFocus, openModal, focusTarget } = useStore();

    // Rotate the dish
    useFrame((state) => {
        if (dishRef.current) {
            dishRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
        }
        // Gentle floating
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
        }
    });

    const handleClick = (e) => {
        e.stopPropagation();
        setFocus('comms');
        openModal('contact');
    };

    const isActive = focusTarget === 'comms';

    // Create glow texture
    const glowTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const ctx = canvas.getContext('2d');

        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, '#ff00ff');
        gradient.addColorStop(0.3, 'rgba(255, 0, 255, 0.5)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);

        return new THREE.CanvasTexture(canvas);
    }, []);

    return (
        <group ref={groupRef} position={[20, 0, 0]}>
            {/* Main body - octagonal station */}
            <mesh
                onClick={handleClick}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'default'}
            >
                <octahedronGeometry args={[0.8, 0]} />
                <meshBasicMaterial
                    color="#ff00ff"
                    wireframe={!isActive}
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Satellite dish */}
            <group ref={dishRef} position={[0, 0.6, 0]}>
                <mesh rotation={[Math.PI * 0.3, 0, 0]}>
                    <coneGeometry args={[0.6, 0.3, 8, 1, true]} />
                    <meshBasicMaterial
                        color="#ff00ff"
                        wireframe
                        side={THREE.DoubleSide}
                    />
                </mesh>
                {/* Antenna */}
                <mesh position={[0, 0.4, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.5]} />
                    <meshBasicMaterial color="#ff00ff" />
                </mesh>
            </group>

            {/* Solar panels */}
            <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI * 0.1]}>
                <boxGeometry args={[0.8, 0.05, 0.4]} />
                <meshBasicMaterial color="#00f5ff" transparent opacity={0.6} />
            </mesh>
            <mesh position={[-1.2, 0, 0]} rotation={[0, 0, -Math.PI * 0.1]}>
                <boxGeometry args={[0.8, 0.05, 0.4]} />
                <meshBasicMaterial color="#00f5ff" transparent opacity={0.6} />
            </mesh>

            {/* Glow sprite */}
            <sprite scale={[4, 4, 1]}>
                <spriteMaterial
                    map={glowTexture}
                    transparent
                    opacity={isActive ? 0.6 : 0.3}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </sprite>

            {/* Html Label - readable on all devices */}
            <Html
                position={[0, 1.8, 0]}
                center
                distanceFactor={8}
                style={{
                    pointerEvents: 'none',
                    userSelect: 'none',
                }}
            >
                <div className="text-center whitespace-nowrap">
                    <p
                        className="font-display text-xs md:text-sm tracking-wider font-semibold"
                        style={{
                            color: '#ff00ff',
                            textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff'
                        }}
                    >
                        COMMS ARRAY
                    </p>
                    <p className="text-[10px] md:text-xs text-gray-400 mt-0.5">
                        Contact Terminal
                    </p>
                </div>
            </Html>
        </group>
    );
}
