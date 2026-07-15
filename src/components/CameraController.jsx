import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function CameraController({ activeRegion, activeLandmarkIndex }) {
  const { camera, controls } = useThree();
  
  // Vectors for target position and look-at point
  const targetPos = useRef(new THREE.Vector3());
  const targetLook = useRef(new THREE.Vector3());
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Get target settings based on active view mode (landmark zoom vs. overall region view)
    const cameraSettings = 
      (activeLandmarkIndex !== null && activeRegion.landmarks[activeLandmarkIndex])
        ? activeRegion.landmarks[activeLandmarkIndex].camera
        : activeRegion.camera;

    targetPos.current.set(...cameraSettings.position);
    targetLook.current.set(...cameraSettings.lookAt);

    // Smoothly interpolate (lerp) the camera position
    camera.position.lerp(targetPos.current, 0.04);

    // Smoothly interpolate (lerp) the look-at target
    currentLook.current.lerp(targetLook.current, 0.04);

    // If OrbitControls is bound to R3F, update its target so they coordinate
    if (controls) {
      controls.target.copy(currentLook.current);
      controls.update();
    } else {
      camera.lookAt(currentLook.current);
    }
  });

  return null;
}
