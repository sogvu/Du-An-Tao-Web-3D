import React from 'react';
import { SoftShadows } from '@react-three/drei';

export default function Lights() {
  return (
    <>
      {/* Soft Shadow Sampling — eliminates aliased blocky shadow edges */}
      <SoftShadows size={28} samples={14} focus={0.9} />

      {/* Mild ambient fill so nothing goes fully black */}
      <ambientLight intensity={0.35} color="#c7d8f0" />

      {/* Sky-dome hemisphere gradient (sky blue → warm ground) */}
      <hemisphereLight
        args={['#87ceeb', '#5a4128', 0.55]}
        position={[0, 10, 0]}
      />

      {/* PRIMARY: Sun — strong warm directional with high-res shadows */}
      <directionalLight
        name="sun"
        position={[14, 20, 10]}
        intensity={2.6}
        color="#fff8e8"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0001}
        shadow-normalBias={0.04}
      />

      {/* FILL: Cool atmospheric scatter from opposite side */}
      <directionalLight
        position={[-10, 8, -8]}
        intensity={0.5}
        color="#9bbfd4"
      />

      {/* RIM: Warm backlight accent to sculpt 3D edges */}
      <directionalLight
        position={[-4, 3, 12]}
        intensity={0.45}
        color="#ffcc88"
      />

      {/* BOUNCE: Subtle ocean-water reflective fill from below */}
      <pointLight
        position={[0, -1.5, 0]}
        intensity={0.3}
        color="#4499cc"
        distance={10}
        decay={2}
      />
    </>
  );
}
