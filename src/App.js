import React, { useState, useEffect } from 'react';
import { User, Users } from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';


const App = () => {
  const [gameState, setGameState] = useState('menu');
  const [gameMode, setGameMode] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [rotation, setRotation] = useState({ x: 20, y: 20 });
  const [boardPosition, setBoardPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        const time = Date.now() / 2000;
        setBoardPosition({
          x: Math.sin(time) * 10,
          y: Math.cos(time * 0.8) * 10
        });
      }
    }, 16);
    return () => clearInterval(interval);
  }, [isDragging]);
  const handleStart = (e) => {
    setIsDragging(true);
    const point = e.touches ? e.touches[0] : e;
    setDragStart({
      x: point.clientX - rotation.y,
      y: point.clientY - rotation.x
    });
  };
  
  const handleMove = (e) => {
    if (!isDragging) return;
    const point = e.touches ? e.touches[0] : e;
    setRotation({
      x: Math.min(Math.max(point.clientY - dragStart.y, -30), 30),
      y: point.clientX - dragStart.x
    });
  };
  
  const handleEnd = () => {
    setIsDragging(false);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line };
      }
    }
    return null;
  };

  const getBestMove = (currentBoard) => {
    const availableMoves = currentBoard
      .map((cell, index) => cell === null ? index : null)
      .filter(move => move !== null);

    // Try to win
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'O';
      if (calculateWinner(testBoard)) {
        return move;
      }
    }

    // Block player's win
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'X';
      if (calculateWinner(testBoard)) {
        return move;
      }
    }

    // Take center if available
    if (availableMoves.includes(4)) {
      return 4;
    }

    // Take corners
    const corners = [0, 2, 6, 8].filter(corner => availableMoves.includes(corner));
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }

    // Take any available move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };
  const handleCellClick = async (index) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      return;
    }
    
    if (newBoard.every(Boolean)) {
      setWinner({ winner: 'draw' });
      return;
    }

    if (gameMode === 'multiplayer') {
      setIsXNext(!isXNext);
    } else if (gameMode === 'cpu' && isXNext) {
      setIsXNext(false);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const cpuBoard = [...newBoard];
      const aiMove = getBestMove(cpuBoard);
      
      cpuBoard[aiMove] = 'O';
      setBoard(cpuBoard);
      setIsXNext(true);

      const cpuWinner = calculateWinner(cpuBoard);
      if (cpuWinner) {
        setWinner(cpuWinner);
      } else if (cpuBoard.every(Boolean)) {
        setWinner({ winner: 'draw' });
      }
    }
  };

  const renderCell = (index) => {
    const cell = board[index];
    const isWinning = winner?.line?.includes(index);

    return (
      
      <button
        key={index}
        onClick={() => handleCellClick(index)}
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
        {cell && (
          <div className={`
            relative w-full h-full flex items-center justify-center
            ${isWinning ? 'animate-float' : ''}
          `}>
            {cell === 'X' ? (
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
  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 
                    flex flex-col items-center justify-center p-4">
                      <ParticleBackground />
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">               
      {gameState === 'menu' ? (
        <div className="flex flex-col items-center space-y-8 animate-fade-in">
          
          <h1 className="text-6xl font-extrabold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text 
              animate-text-shadow filter drop-shadow-[0_0_20px rgba(59,130,246,0.5)] 
              font-[PressStart2P, sans-serif] tracking-tight">
  Tic Tac Toe
</h1>
          
          <div className="flex flex-col space-y-4 w-72 mt-8">
            <button 
              onClick={() => {
                setGameMode('multiplayer');
                setGameState('playing');
                setBoard(Array(9).fill(null));
                setWinner(null);
                setIsXNext(true);
              }}
              className="w-full px-6 py-4 bg-blue-600/50 backdrop-blur-sm rounded-xl
                       hover:bg-blue-500/60 transform hover:scale-105 transition-all
                       text-white font-bold text-xl flex items-center justify-center gap-3"
            >
              <Users className="w-6 h-6" />
              2 Players
            </button>
            
            <button 
              onClick={() => {
                setGameMode('cpu');
                setGameState('playing');
                setBoard(Array(9).fill(null));
                setWinner(null);
                setIsXNext(true);
              }}
              className="w-full px-6 py-4 bg-cyan-600/50 backdrop-blur-sm rounded-xl
                       hover:bg-cyan-500/60 transform hover:scale-105 transition-all
                       text-white font-bold text-xl flex items-center justify-center gap-3"
            >
              <User className="w-6 h-6" />
              Play vs CPU
            </button>
          </div>
      
        </div>
      ) : (
        <>
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

          <div 
  className="perspective-1000"
  onMouseDown={handleStart}
  onMouseMove={handleMove}
  onMouseUp={handleEnd}
  onMouseLeave={handleEnd}
  onTouchStart={handleStart}
  onTouchMove={handleMove}
  onTouchEnd={handleEnd}
  onTouchCancel={handleEnd}
>
            <div 
              className="w-96 h-96 relative transition-all duration-300"
              style={{
                transform: `
                  translate(${boardPosition.x}px, ${boardPosition.y}px)
                  rotateX(${rotation.x}deg) 
                  rotateY(${rotation.y}deg)
                `
              }}
            >
              <div className="grid grid-cols-3 gap-4 p-4">
                {board.map((_, index) => renderCell(index))}
              </div>
            </div>
          </div>

          {winner && (
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
                    onClick={() => {
                      setBoard(Array(9).fill(null));
                      setWinner(null);
                      setIsXNext(true);
                    }}
                    className="px-6 py-3 bg-blue-600/80 rounded-xl text-white font-bold
                             hover:bg-blue-500/80 transform hover:scale-105 transition-all"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={() => {
                      setGameState('menu');
                      setBoard(Array(9).fill(null));
                      setWinner(null);
                      setIsXNext(true);
                    }}
                    className="px-6 py-3 bg-gray-700/80 rounded-xl text-white font-bold
                             hover:bg-gray-600/80 transform hover:scale-105 transition-all"
                  >
                    Main Menu
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
    </div> 
  );
};

export default App;