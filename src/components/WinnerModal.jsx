import React from 'react';

const WinnerModal = ({ winner, gameMode, onPlayAgain, onMainMenu }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm 
                    flex items-center justify-center z-50">
      <div className="bg-gray-800/90 p-8 rounded-2xl flex flex-col items-center space-y-6
                      border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 
                      text-transparent bg-clip-text">
          {winner.winner === 'draw'
            ? "It's a Draw!"
            : gameMode === 'cpu'
              ? winner.winner === 'X'
                ? 'You Win!'
                : 'CPU Wins!'
              : `Player ${winner.winner} Wins!`}
        </h2>
        <div className="flex gap-4">
          <button 
            onClick={onPlayAgain}
            className="px-6 py-3 bg-blue-600/80 rounded-xl text-white font-bold
                      hover:bg-blue-500/80 transform hover:scale-105 transition-all"
          >
            Play Again
          </button>
          <button 
            onClick={onMainMenu}
            className="px-6 py-3 bg-gray-700/80 rounded-xl text-white font-bold
                      hover:bg-gray-600/80 transform hover:scale-105 transition-all"
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerModal;