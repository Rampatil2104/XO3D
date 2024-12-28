// src/components/GameBoard.jsx
import React from 'react';
import GameCell from './GameCell';

const GameBoard = ({ 
  board, 
  onCellClick, 
  winner, 
  rotation, 
  boardPosition, 
  handleMouseDown, 
  handleMouseUp, 
  handleMouseMove 
}) => {
  return (
    <div 
      className="perspective-1000"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="w-96 h-96 relative transition-all duration-300"
        style={{
          transform: `translate(${boardPosition.x}px, ${boardPosition.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        <div className="grid grid-cols-3 gap-4 p-4">
          {board.map((cell, index) => (
            <GameCell 
              key={index}
              value={cell}
              onClick={() => onCellClick(index)}
              isWinning={winner?.line?.includes(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;