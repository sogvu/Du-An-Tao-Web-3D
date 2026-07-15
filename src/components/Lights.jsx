import React from 'react';

export default function Lights() {
  return (
    <>
      {/* Soft environmental ambient light */}
      <ambientLight intensity={0.5} />

      {/* Hemisphere light for rich outdoor sky/ground bounce gradients */}
      <hemisphereLight
        args={['#bae6fd', '#1e293b', 0.45]} // Sky light, ground light, intensity
      />

      {/* Sun Light (Strong direction to cast crisp low-poly shadows) */}
      <directionalLight
        position={[12, 16, 8]}
        intensity={2.2}
        color="#fffcf5" // Warm sun tone
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={35}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0002}
        shadow-normalBias={0.03} // Eliminates low-poly shadow acne/striping
      />

      {/* Warm backlight/rimlight to bring out shapes and edge glow */}
      <directionalLight
        position={[-10, 6, -8]}
        intensity={0.75}
        color="#fef08a" // Soft golden rim
      />

      {/* Cool fill light from bottom/side for shadowed areas */}
      <directionalLight
        position={[0, -5, 0]}
        intensity={0.2}
        color="#38bdf8" // Sky reflection bounce
      />
    </>
  );
}
