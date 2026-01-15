"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows, Float, Stars, Sparkles } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function HeroCarModel() {
    // A stylistic, low-poly abstract sports car
    const groupRef = useRef<THREE.Group>(null);

    // Animate the car slightly
    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Subtle floating rotation
            groupRef.current.rotation.y = Math.sin(t / 4) * 0.1 + -0.5;
            groupRef.current.rotation.z = Math.sin(t / 4) * 0.05;
        }
    });

    const carColor = "#3b82f6"; // Tailwind Blue-500
    const glassColor = "#0f172a"; // Dark Slate
    const wheelColor = "#1e293b";

    return (
        <group ref={groupRef} rotation={[0, -0.5, 0]}>
            {/* Main Chassis */}
            <mesh position={[0, 0.6, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.2, 0.7, 4.8]} />
                <meshStandardMaterial
                    color={carColor}
                    roughness={0.2}
                    metalness={0.8}
                    envMapIntensity={1.5}
                />
            </mesh>

            {/* Cabin / Roof */}
            <mesh position={[0, 1.25, -0.3]} castShadow>
                <boxGeometry args={[1.7, 0.7, 2.5]} />
                <meshStandardMaterial
                    color={glassColor}
                    roughness={0.1}
                    metalness={1}
                    transparent
                    opacity={0.9}
                />
            </mesh>

            {/* Spoiler */}
            <mesh position={[0, 1.1, 2.2]} castShadow>
                <boxGeometry args={[2, 0.1, 0.8]} />
                <meshStandardMaterial color={carColor} metalness={0.6} roughness={0.2} />
            </mesh>
            <mesh position={[0.8, 0.9, 2.2]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                <meshStandardMaterial color={wheelColor} />
            </mesh>
            <mesh position={[-0.8, 0.9, 2.2]}>
                <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                <meshStandardMaterial color={wheelColor} />
            </mesh>

            {/* Wheels */}
            <Wheel position={[1.2, 0.35, 1.4]} color={wheelColor} />
            <Wheel position={[-1.2, 0.35, 1.4]} color={wheelColor} />
            <Wheel position={[1.2, 0.35, -1.4]} color={wheelColor} />
            <Wheel position={[-1.2, 0.35, -1.4]} color={wheelColor} />

            {/* Headlights */}
            <mesh position={[0.8, 0.6, -2.41]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
            </mesh>
            <mesh position={[-0.8, 0.6, -2.41]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
            </mesh>

            {/* Tail lights */}
            <mesh position={[0.8, 0.7, 2.41]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} />
            </mesh>
            <mesh position={[-0.8, 0.7, 2.41]}>
                <boxGeometry args={[0.4, 0.1, 0.1]} />
                <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={3} />
            </mesh>
        </group>
    );
}

function Wheel({ position, color }: { position: [number, number, number], color: string }) {
    return (
        <group position={position} rotation={[0, 0, Math.PI / 2]}>
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.35, 0.35, 0.5, 32]} />
                <meshStandardMaterial color="#000" roughness={0.5} />
            </mesh>
            <mesh position={[0, 0.26, 0]}>
                <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} />
            </mesh>
            <mesh position={[0, -0.26, 0]}>
                <cylinderGeometry args={[0.25, 0.25, 0.1, 16]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} />
            </mesh>
        </group>
    );
}

export function Hero3DView() {
    return (
        <div className="h-[400px] w-full md:h-[600px] scale-110 lg:scale-125">
            <Canvas shadows camera={{ position: [6, 2, 6], fov: 35 }}>
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.25}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#60a5fa" />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
                    <HeroCarModel />
                </Float>

                <Environment preset="city" />

                <ContactShadows
                    resolution={1024}
                    scale={20}
                    blur={2}
                    opacity={0.4}
                    far={4.5}
                    color="#1e293b"
                />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                />
            </Canvas>
        </div>
    );
}
