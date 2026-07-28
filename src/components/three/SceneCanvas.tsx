"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import OfficeScene from "./OfficeScene";

export default function SceneCanvas() {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 3, 6], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        {/* Ambient fill */}
        <ambientLight intensity={0.3} />
        {/* Key light — warm top-left */}
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          color="#fff8f0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        {/* Accent rim light — orange from right */}
        <pointLight position={[-4, 2, -2]} intensity={0.8} color="#e8621a" />
        {/* Cool fill from left */}
        <pointLight position={[6, 1, 4]} intensity={0.4} color="#3060a0" />

        <Environment preset="city" />

        <OfficeScene />

        {/* Temp: orbit controls to inspect the scene — REMOVE in next step */}
        <OrbitControls enableZoom={true} enablePan={false} />
      </Suspense>
    </Canvas>
  );
}
