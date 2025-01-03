import React, { Suspense, useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls } from '@react-three/drei';
import CinemaHall from './CinemaHall';

const Scene = () => {
  const defaultCameraPos = useMemo(() => [0, 30, 35], []);
  const defaultTargetPos = useMemo(() => [0, 2, -5], []);
  const controlsRef = useRef();
  const cameraRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [cameraPosition, setCameraPosition] = useState(defaultCameraPos);
  const [cameraTarget, setCameraTarget] = useState(defaultTargetPos);
  const [isInSeatView, setIsInSeatView] = useState(false);
  const [currentSeatNumber, setCurrentSeatNumber] = useState(null);

  const handleViewFromSeat = useCallback((seatPosition, seatNumber) => {
    const viewHeight = isMobile ? seatPosition[1] + 1.0 : seatPosition[1] + 1.2;
    const newPosition = [
      seatPosition[0],
      viewHeight,
      seatPosition[2]
    ];
    
    setCameraPosition(newPosition);

    const isFirstTwoRows = seatPosition[2] > -10;
    const targetHeight = isFirstTwoRows ? 8 : 6;
    const targetZ = isMobile ? -12 : -15;

    setCameraTarget([0, targetHeight, targetZ]);
    setIsInSeatView(true);
    setCurrentSeatNumber(seatNumber);

    if (cameraRef.current) {
      cameraRef.current.position.set(...newPosition);
      cameraRef.current.lookAt(0, targetHeight, targetZ);
      cameraRef.current.updateProjectionMatrix();
    }
  }, [isMobile]);

  const resetView = useCallback(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(...defaultCameraPos);
      cameraRef.current.lookAt(...defaultTargetPos);
      cameraRef.current.updateProjectionMatrix();
    }
    setIsInSeatView(false);
    setCameraPosition(defaultCameraPos);
    setCameraTarget(defaultTargetPos);
    setCurrentSeatNumber(null);
  }, [defaultCameraPos, defaultTargetPos]);

  const getMobileStyles = () => {
    if (!isMobile) return {};
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      touchAction: 'none'
    };
  };

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh', 
      background: '#1a1a1a', 
      position: 'relative',
      overflow: 'hidden',
      ...getMobileStyles()
    }}>
      {isInSeatView && (
        <div style={{ 
          position: 'absolute', 
          top: isMobile ? '10px' : '20px', 
          right: isMobile ? '10px' : '20px', 
          zIndex: 1000, 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center', 
          gap: isMobile ? '10px' : '15px' 
        }}>
          <div style={{
            backgroundColor: 'rgba(10,10,255,0.7)',
            padding: isMobile ? '8px 12px' : '10px 15px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: isMobile ? '14px' : '16px'
          }}>
            Koltuk: {currentSeatNumber}
          </div>
          <button
            onClick={resetView}
            style={{
              padding: isMobile ? '8px 16px' : '10px 20px',
              backgroundColor: '#8B0000',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              fontSize: isMobile ? '14px' : '16px',
              width: isMobile ? '100%' : 'auto'
            }}
          >
            Genel Görünüme Dön
          </button>
        </div>
      )}
      <Canvas shadows>
        <PerspectiveCamera 
          ref={cameraRef}
          makeDefault 
          position={cameraPosition}
          fov={isMobile ? 65 : 50}
        />
        {!isInSeatView && (
          <OrbitControls 
            ref={controlsRef}
            target={cameraTarget}
            minPolarAngle={Math.PI * 0.2}
            maxPolarAngle={Math.PI * 0.4}
            minAzimuthAngle={-Math.PI * 0.2}
            maxAzimuthAngle={Math.PI * 0.2}
            minDistance={isMobile ? 25 : 30}
            maxDistance={isMobile ? 35 : 40}
            enablePan={false}
            rotateSpeed={0.5}
            enableDamping={true}
            dampingFactor={0.1}
            touchAction="none"
            enableZoom={!isMobile}
          />
        )}
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
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

          <mesh position={[0, 6, -15]} receiveShadow>
            <planeGeometry args={[16, 9]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.2} />
          </mesh>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#2c2c2c" />
          </mesh>

          <mesh position={[-20, 10, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[50, 20]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>
          <mesh position={[20, 10, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <planeGeometry args={[50, 20]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>

          <mesh position={[0, 10, 20]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[40, 20]} />
            <meshStandardMaterial color="#8B0000" />
          </mesh>

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