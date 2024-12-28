import React from 'react';

const GameStatus = ({ winner, gameMode, isXNext }) => {
  return (
    <div className="text-3xl text-blue-400 mb-8">
      {winner 
        ? winner.winner === 'draw'
          ? "It's a Draw!"
          : gameMode === 'cpu'
            ? winner.winner === 'X'
              ? 'You Win!'
              : 'CPU Wins!'
            : `Player ${winner.winner} Wins!`
        : gameMode === 'cpu' && !isXNext 
          ? 'CPU Thinking...'
          : `${isXNext ? 'X' : 'O'}'s Turn`}
    </div>
  );
};

export default GameStatus;