import React, { Suspense, useState, useCallback, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import CinemaHall from './CinemaHall';

const Scene = () => {
  // Varsayılan kamera pozisyonları
  const defaultCameraPos = useMemo(() => [0, 30, 35], []);
  const defaultTargetPos = useMemo(() => [0, 2, -5], []);
  const controlsRef = useRef();

  const [cameraPosition, setCameraPosition] = useState(defaultCameraPos);
  const [cameraTarget, setCameraTarget] = useState(defaultTargetPos);
  const [isInSeatView, setIsInSeatView] = useState(false);
  const [currentSeatNumber, setCurrentSeatNumber] = useState(null);

  const handleViewFromSeat = (seatPosition, seatNumber) => {
    const viewHeight = seatPosition[1] + 1.2;
    
    setCameraPosition([
      seatPosition[0],
      viewHeight,
      seatPosition[2]
    ]);

    // Öndeki 2 sıra için kontrol (z pozisyonu -10'dan büyükse ön sıralardadır)
    const isFirstTwoRows = seatPosition[2] > -10;
    
    // Ön 2 sıra için daha yukarı bak, diğerleri için normal
    const targetHeight = isFirstTwoRows ? 8 : 6;

    setCameraTarget([0, targetHeight, -15]);
    setIsInSeatView(true);
    setCurrentSeatNumber(seatNumber);
  };

  const resetView = useCallback(() => {
    setIsInSeatView(false);
    setCameraPosition(defaultCameraPos);
    setCameraTarget(defaultTargetPos);
    setCurrentSeatNumber(null);
  }, [defaultCameraPos, defaultTargetPos]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a', position: 'relative' }}>
      {isInSeatView && (
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{
            backgroundColor: 'rgba(10,10,255,255.7)',
            padding: '10px 15px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold'
          }}>
            Koltuk: {currentSeatNumber}
          </div>
          <button
            onClick={resetView}
            style={{
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
        </div>
      )}
      <Canvas shadows>
        <PerspectiveCamera 
          makeDefault 
          position={cameraPosition}
          fov={50}
        />
        {!isInSeatView ? (
          <OrbitControls 
            ref={controlsRef}
            target={cameraTarget}
            minPolarAngle={Math.PI * 0.2}
            maxPolarAngle={Math.PI * 0.4}
            minAzimuthAngle={-Math.PI * 0.2}
            maxAzimuthAngle={Math.PI * 0.2}
            minDistance={30}
            maxDistance={40}
            enablePan={false}
            rotateSpeed={0.5}
          />
        ) : (
          <group>
            <PerspectiveCamera 
              makeDefault 
              position={cameraPosition}
              fov={50}
            />
            <mesh position={cameraPosition}>
              <sphereGeometry args={[0.1]} />
              <meshBasicMaterial visible={false} />
              <group
                onPointerMove={(e) => {
                  if (e.buttons === 1) {
                    const movementX = e.movementX * 0.002;
                    const movementY = e.movementY * 0.002;
                    
                    const newTarget = [...cameraTarget];
                    newTarget[0] = Math.max(Math.min(
                      newTarget[0] + movementX * 10,
                      5
                    ), -5);
                    
                    newTarget[1] = Math.max(Math.min(
                      newTarget[1] - movementY * 5,
                      10
                    ), 2);
                    
                    setCameraTarget(newTarget);
                  }
                }}
              />
            </mesh>
          </group>
        )}
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