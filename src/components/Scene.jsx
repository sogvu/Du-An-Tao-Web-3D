import React from 'react';
import { Sparkles } from '@react-three/drei';
import Lights from './Lights';
import Water from './Water';
import Island from './Island';
import CameraController from './CameraController';

export default function Scene({ activeRegion, regions, activeLandmarkIndex }) {
  return (
    <>
      {/* Dynamic ambient fog blending into the background color */}
      <fog attach="fog" args={[activeRegion.color, 8, 22]} />

      {/* Cinematic Lights */}
      <Lights />

      {/* Shimmering water plane with shoreline foam and depth parallax */}
      <Water color={activeRegion.theme.waterColor} />

      {/* Ambient glowing atmosphere particles (Sparkles) */}
      <Sparkles
        count={80}
        scale={[10, 6, 10]}
        size={2.5}
        speed={0.4}
        opacity={0.6}
        color={activeRegion.theme.accent}
        position={[0, 2, 0]}
      />

      {/* Floating Islands Carousel */}
      {regions.map((region) => (
        <Island
          key={region.id}
          region={region}
          isActive={region.id === activeRegion.id}
        />
      ))}

      {/* Camera flight interpolation manager */}
      <CameraController 
        activeRegion={activeRegion} 
        activeLandmarkIndex={activeLandmarkIndex} 
      />
    </>
  );
}
