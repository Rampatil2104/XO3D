import React from 'react';
import { User, Users } from 'lucide-react';

const GameMenu = ({ onGameStart }) => {
  return (
    <div className="flex flex-col items-center space-y-8 animate-fade-in">
      <h1 className="text-6xl font-bold bg-clip-text text-transparent 
                     bg-gradient-to-r from-blue-400 to-cyan-400
                     filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
        3D Tic Tac Toe
      </h1>
      
      <div className="flex flex-col space-y-4 w-72 mt-8">
        <button 
          onClick={() => onGameStart('multiplayer')}
          className="w-full px-6 py-4 bg-blue-600/50 backdrop-blur-sm rounded-xl
                     hover:bg-blue-500/60 transform hover:scale-105 transition-all
                     text-white font-bold text-xl flex items-center justify-center gap-3"
        >
          <Users className="w-6 h-6" />
          2 Players
        </button>
        
        <button 
          onClick={() => onGameStart('cpu')}
          className="w-full px-6 py-4 bg-cyan-600/50 backdrop-blur-sm rounded-xl
                     hover:bg-cyan-500/60 transform hover:scale-105 transition-all
                     text-white font-bold text-xl flex items-center justify-center gap-3"
        >
          <User className="w-6 h-6" />
          Play vs CPU
        </button>
      </div>
    </div>
  );
};

export default GameMenu;