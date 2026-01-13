"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Stage } from "@react-three/drei";
import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCw, ZoomIn, Loader2 } from "lucide-react";

function CarModel({ color }: { color: string }) {
    return (
        <mesh castShadow receiveShadow>
            <boxGeometry args={[2, 0.5, 4]} />
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[1.8, 0.4, 2]} />
                <meshStandardMaterial color="#333" />
            </mesh>
            <mesh position={[1, -0.2, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[-1, -0.2, 1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[1, -0.2, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
            <mesh position={[-1, -0.2, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
        </mesh>
    );
}

interface ShowroomCanvasProps {
    color: string;
}

export default function ShowroomCanvas({ color }: ShowroomCanvasProps) {
    const [autoRotate, setAutoRotate] = useState(true);

    return (
        <div className="relative h-[60vh] lg:h-full w-full bg-gradient-to-br from-slate-900/50 to-transparent backdrop-blur-sm border-r border-white/5">
            {/* Overlays removed to allow parent component to control display data */}

            <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
                <Button
                    size="icon"
                    variant="secondary"
                    className={`rounded-full bg-black/40 border border-white/10 text-white hover:bg-blue-600 ${autoRotate ? 'bg-blue-600' : ''}`}
                    onClick={() => setAutoRotate(!autoRotate)}
                >
                    <RotateCw className={`h-5 w-5 ${autoRotate ? 'animate-spin-slow' : ''}`} />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full bg-black/40 border border-white/10 text-white hover:bg-blue-600">
                    <ZoomIn className="h-5 w-5" />
                </Button>
            </div>

            <Canvas shadows camera={{ position: [4, 2, 5], fov: 45 }}>
                <Suspense fallback={null}>
                    <Stage environment="city" intensity={0.5}>
                        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                            <CarModel color={color} />
                        </Float>
                    </Stage>
                    <OrbitControls autoRotate={autoRotate} autoRotateSpeed={1} enableZoom={false} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
                </Suspense>
            </Canvas>

            <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
                    <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                </div>
            }>
            </Suspense>
        </div>
    );
}
