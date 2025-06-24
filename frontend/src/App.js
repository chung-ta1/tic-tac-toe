import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

function App() {
  const [gameId, setGameId] = useState(null);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = async () => {
    try {
      const response = await axios.post(`${API_URL}/games`);
      const { gameId, board, currentPlayer, winner, isDraw } = response.data;
      setGameId(gameId);
      setBoard(board);
      setCurrentPlayer(currentPlayer);
      setWinner(winner);
      setIsDraw(isDraw);
    } catch (error) {
      console.error('Error starting new game:', error);
    }
  };

  const makeMove = async (position) => {
    if (!gameId || winner || isDraw || board[position]) {
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/games/${gameId}/move`, { position });
      const { board, currentPlayer, winner, isDraw } = response.data;
      setBoard(board);
      setCurrentPlayer(currentPlayer);
      setWinner(winner);
      setIsDraw(isDraw);
    } catch (error) {
      console.error('Error making move:', error);
    }
  };

  const resetGame = async () => {
    if (!gameId) {
      startNewGame();
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/games/${gameId}/reset`);
      const { board, currentPlayer, winner, isDraw } = response.data;
      setBoard(board);
      setCurrentPlayer(currentPlayer);
      setWinner(winner);
      setIsDraw(isDraw);
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const renderSquare = (position) => {
    return (
      <button 
        className="square" 
        onClick={() => makeMove(position)}
        disabled={winner || isDraw || board[position]}
      >
        {board[position]}
      </button>
    );
  };

  const getStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (isDraw) {
      return 'Game Draw!';
    } else {
      return `Next player: ${currentPlayer}`;
    }
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <div className="status">{getStatus()}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        {gameId ? 'Reset Game' : 'Start New Game'}
      </button>
    </div>
  );
}

export default App;