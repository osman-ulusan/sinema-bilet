import React, { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import CinemaHall from './CinemaHall';

const Scene = () => {
  // Varsayılan kamera pozisyonları
  const defaultCameraPos = [25, 15, 0];
  const defaultTargetPos = [0, 6, -15];

  const [cameraPosition, setCameraPosition] = useState(defaultCameraPos);
  const [cameraTarget, setCameraTarget] = useState(defaultTargetPos);
  const [isInSeatView, setIsInSeatView] = useState(false);

  const handleViewFromSeat = (seatPosition) => {
    const viewHeight = seatPosition[1] + 1.2;
    setCameraPosition([
      seatPosition[0],
      viewHeight,
      seatPosition[2] - 0.8
    ]);
    setCameraTarget([0, 5, -15]);
    setIsInSeatView(true);
  };

  const resetView = useCallback(() => {
    setCameraPosition(defaultCameraPos);
    setCameraTarget(defaultTargetPos);
    setIsInSeatView(false);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a', position: 'relative' }}>
      {isInSeatView && (
        <button
          onClick={resetView}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 1000,
            padding: '10px 20px',
            backgroundColor: '#8B0000',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          Genel Görünüme Dön
        </button>
      )}
      <Canvas shadows>
        <PerspectiveCamera 
          makeDefault 
          position={cameraPosition}
          fov={50}
        />
        <OrbitControls 
          target={cameraTarget}
          minPolarAngle={Math.PI * 0.1}
          maxPolarAngle={Math.PI * 0.8}
          minDistance={5}
          maxDistance={50}
          enablePan={false}
        />
        <Suspense fallback={null}>
          {/* Ambient light for general illumination */}
          <ambientLight intensity={0.2} />
          
          {/* Spot lights for cinema effect */}
          <spotLight
            position={[-10, 15, 10]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />
          <spotLight
            position={[10, 15, 10]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />

          {/* Cinema screen */}
          <mesh position={[0, 6, -15]} receiveShadow>
            <planeGeometry args={[16, 9]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
          </mesh>

          {/* Floor */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#2c2c2c" />
          </mesh>

          {/* Walls */}
          <mesh position={[-20, 10, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[50, 20]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>
          <mesh position={[20, 10, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[50, 20]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>

          {/* Back wall */}
          <mesh position={[0, 10, 20]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[40, 20]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>

          {/* Ceiling with stars */}
          <mesh position={[0, 20, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 50]} />
            <meshStandardMaterial color="#0a0a0a" />
          </mesh>

          <CinemaHall onViewFromSeat={handleViewFromSeat} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene; 