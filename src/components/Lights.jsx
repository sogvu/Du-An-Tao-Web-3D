import React from 'react';

export default function Lights() {
  return (
    <>
      {/* Soft environmental ambient light */}
      <ambientLight intensity={0.6} />

      {/* Hemisphere light for natural sky/ground bounce gradients */}
      <hemisphereLight
        args={['#bae6fd', '#312e81', 0.4]} // Sky light, ground light, intensity
      />

      {/* Key Directional Light to cast crisp low-poly shadows */}
      <directionalLight
        position={[10, 14, 8]}
        intensity={1.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={35}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />

      {/* Warm Fill Light to create cinematic contrast */}
      <directionalLight
        position={[-8, 6, -6]}
        intensity={0.6}
        color="#fbbf24" // Warm amber fill
      />
    </>
  );
}
