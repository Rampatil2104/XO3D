// src/utils/gameLogic.js

export const calculateWinner = (squares) => {
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
  
  export const getBestMove = (currentBoard) => {
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