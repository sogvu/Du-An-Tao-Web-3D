import React from 'react';
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

      {/* Interactive Water Plane */}
      <Water color={activeRegion.theme.waterColor} />

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
