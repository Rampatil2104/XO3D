import React from 'react';

const GameCell = ({ value, onClick, isWinning }) => {
  return (
    <button
      onClick={onClick}
      className={`
        aspect-square bg-gray-800/30 backdrop-blur rounded-xl
        border-2 overflow-hidden
        ${isWinning 
          ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]' 
          : 'border-white/10 hover:border-blue-500/50'}
        transition-all duration-300 hover:scale-105
        relative
      `}
    >
      {value && (
        <div className={`
          relative w-full h-full flex items-center justify-center
          ${isWinning ? 'animate-float' : ''}
        `}>
          {value === 'X' ? (
            <div className="w-16 h-16 relative">
              <div className="absolute inset-0">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full
                              h-4 bg-gradient-to-r from-blue-500 to-blue-600
                              rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]
                              transform rotate-45" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full
                              h-4 bg-gradient-to-r from-blue-500 to-blue-600
                              rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]
                              transform -rotate-45" />
              </div>
            </div>
          ) : (
            <div className="w-16 h-16 relative">
              <div className="absolute inset-2 rounded-full
                            border-8 border-cyan-400
                            shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>
          )}
        </div>
      )}
    </button>
  );
};

export default GameCell;

