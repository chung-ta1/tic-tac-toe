const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const games = {};

class TicTacToeGame {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
    this.isDraw = false;
  }

  makeMove(position) {
    if (this.board[position] || this.winner || this.isDraw) {
      return false;
    }
    
    this.board[position] = this.currentPlayer;
    
    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
    } else if (this.board.every(cell => cell !== null)) {
      this.isDraw = true;
    } else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    return true;
  }

  checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
      const [a, b, c] = pattern;
      return this.board[a] && 
             this.board[a] === this.board[b] && 
             this.board[a] === this.board[c];
    });
  }

  getState() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      winner: this.winner,
      isDraw: this.isDraw
    };
  }
}

app.post('/api/games', (req, res) => {
  const gameId = uuidv4();
  games[gameId] = new TicTacToeGame();
  res.json({ gameId, ...games[gameId].getState() });
});

app.get('/api/games/:id', (req, res) => {
  const game = games[req.params.id];
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }
  res.json(game.getState());
});

app.post('/api/games/:id/move', (req, res) => {
  const game = games[req.params.id];
  if (!game) {
    return res.status(404).json({ error: 'Game not found' });
  }

  const { position } = req.body;
  if (position < 0 || position > 8) {
    return res.status(400).json({ error: 'Invalid position' });
  }

  const success = game.makeMove(position);
  if (!success) {
    return res.status(400).json({ error: 'Invalid move' });
  }

  res.json(game.getState());
});

app.post('/api/games/:id/reset', (req, res) => {
  const gameId = req.params.id;
  if (!games[gameId]) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  games[gameId] = new TicTacToeGame();
  res.json(games[gameId].getState());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});