import React from 'react';
import Seat from './Seat';

const CinemaHall = ({ onViewFromSeat }) => {
  // Koltuk sıralarını oluştur
  const createRows = () => {
    const rows = [];
    const rowCount = 8;
    const seatsPerRow = 12;
    const rowSpacing = 2.2;
    const seatSpacing = 1.2;
    const rowElevation = 0.8; // Her sıra için yükseklik artışı

    for (let row = 0; row < rowCount; row++) {
      for (let seat = 0; seat < seatsPerRow; seat++) {
        const xPos = (seat - (seatsPerRow - 1) / 2) * seatSpacing;
        const yPos = row * rowElevation; // Her sıra bir öncekinden daha yüksek
        const zPos = row * rowSpacing;
        const seatNumber = `${String.fromCharCode(65 + row)}${seat + 1}`;

        rows.push(
          <Seat
            key={seatNumber}
            position={[xPos, yPos, zPos]}
            seatNumber={seatNumber}
            onViewFromSeat={onViewFromSeat}
          />
        );
      }

      // Her sıra için zemin ekle
      rows.push(
        <mesh
          key={`floor-${row}`}
          position={[0, row * rowElevation - 0.4, row * rowSpacing]}
          rotation={[-Math.PI * 0.1, 0, 0]}
        >
          <boxGeometry args={[seatsPerRow * seatSpacing + 1, 0.1, 2]} />
          <meshStandardMaterial color="#2c2c2c" />
        </mesh>
      );
    }
    return rows;
  };

  return (
    <group position={[0, 0, 0]}>
      {createRows()}
      {/* Ana zemin */}
      <mesh position={[0, -0.5, 8]} rotation={[-Math.PI * 0.1, 0, 0]}>
        <boxGeometry args={[20, 0.2, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

export default CinemaHall; 