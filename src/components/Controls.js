import React from 'react';
import { OrbitControls } from '@react-three/drei';

const Controls = () => {
  return (
    <OrbitControls
      enableZoom={true}
      enablePan={true}
      enableRotate={true}
      minDistance={5}
      maxDistance={20}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2}
    />
  );
};

export default Controls; 