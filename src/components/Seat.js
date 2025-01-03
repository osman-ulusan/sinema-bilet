import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring/three';
import * as THREE from 'three';

const Seat = ({ position, seatNumber, onViewFromSeat }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isEyeHovered, setIsEyeHovered] = useState(false);

  const { scale } = useSpring({
    scale: isHovered ? [1.1, 1.1, 1.1] : [1, 1, 1],
    config: { mass: 1, tension: 170, friction: 26 }
  });

  const handleClick = (event) => {
    event.stopPropagation();
    setIsSelected(!isSelected);
  };

  const handleEyeClick = (event) => {
    event.stopPropagation();
    if (onViewFromSeat) {
      onViewFromSeat(position);
    }
  };

  const color = isSelected ? '#1B5E20' : isHovered ? '#90CAF9' : '#9E9E9E';

  return (
    <animated.group
      position={position}
      scale={scale}
      rotation={[0, Math.PI, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
    >
      {/* Koltuk oturma kısmı */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color={new THREE.Color(color)} />
      </mesh>

      {/* Koltuk arkalığı */}
      <mesh position={[0, 0.8, -0.35]}>
        <boxGeometry args={[0.8, 1, 0.1]} />
        <meshStandardMaterial color={new THREE.Color(color)} />
      </mesh>

      {/* Koltuk kolçakları */}
      <mesh position={[0.4, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.8]} />
        <meshStandardMaterial color={new THREE.Color(color)} />
      </mesh>
      <mesh position={[-0.4, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.8]} />
        <meshStandardMaterial color={new THREE.Color(color)} />
      </mesh>

      {/* Koltuk ayağı */}
      <mesh position={[0, 0.15, 0]}>
        <boxGeometry args={[0.2, 0.3, 0.2]} />
        <meshStandardMaterial color={new THREE.Color('#757575')} />
      </mesh>

      {/* Bakış açısı topu - sadece koltuk seçiliyse göster */}
      {isSelected && (
        <mesh
          position={[0, 1.5, 0]}
          onClick={handleEyeClick}
          onPointerOver={(e) => {
            e.stopPropagation();
            setIsEyeHovered(true);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setIsEyeHovered(false);
          }}
        >
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial 
            color={isEyeHovered ? '#FFD700' : '#FFA500'} 
            emissive={isEyeHovered ? '#FFD700' : '#FFA500'}
            emissiveIntensity={0.5}
          />
        </mesh>
      )}
    </animated.group>
  );
};

export default Seat; 