import React from 'react';
import Seat from './Seat';
import { Text } from '@react-three/drei';

const CinemaHall = ({ onViewFromSeat }) => {
  // Koltuk sıralarını oluştur
  const createRows = () => {
    const rows = [];
    const rowCount = 8;
    const seatsPerRow = 12;
    const rowSpacing = 2.5;
    const seatSpacing = 1.2;
    const rowElevation = 1.0;

    for (let row = 0; row < rowCount; row++) {
      const rowLetter = String.fromCharCode(65 + row);
      
      // Sıra harfi göstergesi
      rows.push(
        <Text
          key={`row-letter-${rowLetter}`}
          position={[
            -(seatsPerRow * seatSpacing) / 2 - 1,
            row * rowElevation,
            row * rowSpacing + 5
          ]}
          fontSize={0.5}
          color="#ffffff"
        >
          {rowLetter}
        </Text>
      );

      for (let seat = 0; seat < seatsPerRow; seat++) {
        const xPos = (seat - (seatsPerRow - 1) / 2) * seatSpacing;
        const yPos = row * rowElevation;
        const zPos = row * rowSpacing + 5;
        const seatNumber = `${rowLetter}${seat + 1}`;

        // Koltuk numarası göstergesi (ilk sıra için)
        if (row === 0) {
          rows.push(
            <Text
              key={`seat-number-${seat + 1}`}
              position={[
                xPos,
                -1,
                zPos + 2
              ]}
              rotation={[-Math.PI * 0.12, 0, 0]}
              fontSize={0.3}
              color="#ffffff"
            >
              {seat + 1}
            </Text>
          );
        }

        rows.push(
          <Seat
            key={seatNumber}
            position={[xPos, yPos, zPos]}
            seatNumber={seatNumber}
            onViewFromSeat={(pos) => onViewFromSeat(pos, seatNumber)}
          />
        );
      }

      // Her sıra için zemin ekle
      rows.push(
        <mesh
          key={`floor-${row}`}
          position={[0, row * rowElevation - 0.4, row * rowSpacing + 5]}
          rotation={[-Math.PI * 0.12, 0, 0]}
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
      <mesh position={[0, -0.5, 13]} rotation={[-Math.PI * 0.12, 0, 0]}>
        <boxGeometry args={[20, 0.2, 20]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
};

export default CinemaHall; 