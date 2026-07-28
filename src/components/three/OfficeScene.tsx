"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Box, Cylinder } from "@react-three/drei";
import * as THREE from "three";

// Reusable material helpers
const MATERIALS = {
  floor: new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.8 }),
  wall: new THREE.MeshStandardMaterial({ color: "#1e1e1e", roughness: 0.9 }),
  desk: new THREE.MeshStandardMaterial({ color: "#3d2b1f", roughness: 0.6 }),
  deskLeg: new THREE.MeshStandardMaterial({ color: "#2a2a2a", roughness: 0.4, metalness: 0.6 }),
  monitor: new THREE.MeshStandardMaterial({ color: "#111111", roughness: 0.3, metalness: 0.7 }),
  screen: new THREE.MeshStandardMaterial({ color: "#1a3a5c", roughness: 0.1, emissive: "#0a1f33", emissiveIntensity: 0.5 }),
  chair: new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.8 }),
  chairBase: new THREE.MeshStandardMaterial({ color: "#333333", roughness: 0.4, metalness: 0.5 }),
  ac: new THREE.MeshStandardMaterial({ color: "#e0e0e0", roughness: 0.3, metalness: 0.2 }),
  acVent: new THREE.MeshStandardMaterial({ color: "#aaaaaa", roughness: 0.5 }),
  accent: new THREE.MeshStandardMaterial({ color: "#e8621a", roughness: 0.4, emissive: "#e8621a", emissiveIntensity: 0.2 }),
};

function Floor() {
  return (
    <Box args={[12, 0.1, 10]} position={[0, -0.05, 0]} material={MATERIALS.floor} receiveShadow />
  );
}

function Walls() {
  return (
    <group>
      {/* Back wall */}
      <Box args={[12, 6, 0.1]} position={[0, 3, -5]} material={MATERIALS.wall} receiveShadow />
      {/* Left wall */}
      <Box args={[0.1, 6, 10]} position={[-6, 3, 0]} material={MATERIALS.wall} receiveShadow />
      {/* Right wall */}
      <Box args={[0.1, 6, 10]} position={[6, 3, 0]} material={MATERIALS.wall} receiveShadow />
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, 0, -2]}>
      {/* Desktop surface */}
      <Box args={[3, 0.08, 1.2]} position={[0, 0.8, 0]} material={MATERIALS.desk} castShadow receiveShadow />
      {/* Four legs */}
      <Box args={[0.06, 0.8, 0.06]} position={[-1.4, 0.4, -0.55]} material={MATERIALS.deskLeg} castShadow />
      <Box args={[0.06, 0.8, 0.06]} position={[1.4, 0.4, -0.55]} material={MATERIALS.deskLeg} castShadow />
      <Box args={[0.06, 0.8, 0.06]} position={[-1.4, 0.4, 0.55]} material={MATERIALS.deskLeg} castShadow />
      <Box args={[0.06, 0.8, 0.06]} position={[1.4, 0.4, 0.55]} material={MATERIALS.deskLeg} castShadow />
      {/* Accent strip under desktop edge */}
      <Box args={[3, 0.02, 0.02]} position={[0, 0.75, 0.61]} material={MATERIALS.accent} />
    </group>
  );
}

function Monitor() {
  return (
    <group position={[0, 0, -2]}>
      {/* Screen */}
      <Box args={[1.4, 0.85, 0.04]} position={[0, 1.72, 0]} material={MATERIALS.monitor} castShadow />
      {/* Screen face */}
      <Box args={[1.3, 0.75, 0.01]} position={[0, 1.72, 0.025]} material={MATERIALS.screen} />
      {/* Stand neck */}
      <Box args={[0.06, 0.3, 0.06]} position={[0, 1.24, 0]} material={MATERIALS.monitor} castShadow />
      {/* Stand base */}
      <Box args={[0.5, 0.03, 0.3]} position={[0, 1.09, 0.05]} material={MATERIALS.monitor} castShadow />
    </group>
  );
}

function Chair() {
  return (
    <group position={[0, 0, -0.6]}>
      {/* Seat */}
      <Box args={[0.7, 0.08, 0.7]} position={[0, 0.55, 0]} material={MATERIALS.chair} castShadow receiveShadow />
      {/* Backrest */}
      <Box args={[0.7, 0.7, 0.06]} position={[0, 1.0, -0.32]} material={MATERIALS.chair} castShadow />
      {/* Central pole */}
      <Cylinder args={[0.04, 0.04, 0.5, 8]} position={[0, 0.25, 0]} material={MATERIALS.chairBase} castShadow />
      {/* Base star (5 arms) */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <Box
          key={i}
          args={[0.5, 0.04, 0.06]}
          position={[
            Math.cos((deg * Math.PI) / 180) * 0.22,
            0.03,
            Math.sin((deg * Math.PI) / 180) * 0.22,
          ]}
          rotation={[0, (-deg * Math.PI) / 180, 0]}
          material={MATERIALS.chairBase}
          castShadow
        />
      ))}
    </group>
  );
}

function AcUnit() {
  return (
    <group position={[3.5, 3.5, -4.8]}>
      {/* Body */}
      <Box args={[2.2, 0.6, 0.25]} position={[0, 0, 0]} material={MATERIALS.ac} castShadow />
      {/* Vent slats (decorative) */}
      {[-0.6, -0.2, 0.2, 0.6].map((x, i) => (
        <Box key={i} args={[0.08, 0.35, 0.04]} position={[x, -0.05, 0.14]} material={MATERIALS.acVent} />
      ))}
      {/* Power LED */}
      <Box args={[0.05, 0.05, 0.02]} position={[0.95, 0.1, 0.14]} material={MATERIALS.accent} />
    </group>
  );
}

export default function OfficeScene() {
  const groupRef = useRef<THREE.Group>(null);

  // Gentle idle rotation so it doesn't look completely static before scroll starts
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <Floor />
      <Walls />
      <Desk />
      <Monitor />
      <Chair />
      <AcUnit />
    </group>
  );
}
