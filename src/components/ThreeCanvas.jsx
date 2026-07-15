import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Scene from './Scene';

export default function ThreeCanvas({ activeRegion, regions, activeLandmarkIndex }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 select-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
        camera={{ fov: 50, near: 0.1, far: 100 }}
        className="w-full h-full"
      >
        {/* Default Camera setup */}
        <PerspectiveCamera makeDefault position={[0, 6, 12]} fov={45} />
        
        {/* Main 3D scene elements */}
        <Scene 
          activeRegion={activeRegion} 
          regions={regions} 
          activeLandmarkIndex={activeLandmarkIndex} 
        />

        {/* OrbitControls to let users explore slightly */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          dampingFactor={0.05}
          enableDamping
        />
      </Canvas>
    </div>
  );
}
