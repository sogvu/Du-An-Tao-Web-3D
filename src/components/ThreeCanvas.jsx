import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, AdaptiveDpr } from '@react-three/drei';
import Scene from './Scene';

export default function ThreeCanvas({ activeRegion, regions, activeLandmarkIndex }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 select-none">
      <Canvas
        shadows="soft"
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          toneMapping: 0, // Disable built-in tone mapping — we handle via postprocessing
          toneMappingExposure: 1.0,
          outputColorSpace: 'srgb',
        }}
        camera={{ fov: 48, near: 0.1, far: 200 }}
        className="w-full h-full"
        dpr={[1, 2]} // Respect device pixel ratio up to 2x
      >
        {/* Adaptive DPR drops resolution when framerate is low to stay smooth */}
        <AdaptiveDpr pixelated />

        {/* Default Camera */}
        <PerspectiveCamera makeDefault position={[0, 6, 13]} fov={45} />

        {/* Main 3D scene */}
        <Scene
          activeRegion={activeRegion}
          regions={regions}
          activeLandmarkIndex={activeLandmarkIndex}
        />

        {/* OrbitControls — limited range so user can orbit gently */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 7}
          maxPolarAngle={Math.PI / 2.4}
          dampingFactor={0.04}
          enableDamping
          rotateSpeed={0.45}
        />
      </Canvas>
    </div>
  );
}
