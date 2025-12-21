import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { skills } from '../data/skills';

const PARTICLE_COUNT = 40;

export default function DebrisField() {
    const meshRef = useRef();

    // Generate random positions for debris particles
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Random position in a donut shape around the sun
            const angle = Math.random() * Math.PI * 2;
            const radius = 3 + Math.random() * 12; // Between inner and outer orbit
            const height = (Math.random() - 0.5) * 4;

            temp.push({
                position: new THREE.Vector3(
                    Math.cos(angle) * radius,
                    height,
                    Math.sin(angle) * radius
                ),
                rotation: new THREE.Euler(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI
                ),
                scale: 0.1 + Math.random() * 0.15,
                speed: 0.2 + Math.random() * 0.3,
                floatOffset: Math.random() * Math.PI * 2,
                color: skills[i % skills.length].color,
            });
        }
        return temp;
    }, []);

    // Create instanced mesh matrices
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        particles.forEach((particle, i) => {
            // Floating animation
            const floatY = Math.sin(state.clock.elapsedTime * particle.speed + particle.floatOffset) * 0.5;

            // Slow drift around the center
            const driftAngle = state.clock.elapsedTime * 0.02 * particle.speed;
            const currentRadius = Math.sqrt(
                particle.position.x ** 2 + particle.position.z ** 2
            );

            dummy.position.set(
                Math.cos(Math.atan2(particle.position.z, particle.position.x) + driftAngle) * currentRadius,
                particle.position.y + floatY,
                Math.sin(Math.atan2(particle.position.z, particle.position.x) + driftAngle) * currentRadius
            );

            // Rotation
            dummy.rotation.x = particle.rotation.x + state.clock.elapsedTime * 0.5;
            dummy.rotation.y = particle.rotation.y + state.clock.elapsedTime * 0.3;

            dummy.scale.setScalar(particle.scale);
            dummy.updateMatrix();

            meshRef.current.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    // Create color attribute for instances
    const colorArray = useMemo(() => {
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        particles.forEach((particle, i) => {
            const color = new THREE.Color(particle.color);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;
        });
        return colors;
    }, [particles]);

    return (
        <instancedMesh
            ref={meshRef}
            args={[null, null, PARTICLE_COUNT]}
            frustumCulled={false}
        >
            <octahedronGeometry args={[1, 0]}>
                <instancedBufferAttribute
                    attach="attributes-instanceColor"
                    args={[colorArray, 3]}
                />
            </octahedronGeometry>
            <meshBasicMaterial
                vertexColors
                transparent
                opacity={0.7}
                wireframe
            />
        </instancedMesh>
    );
}
