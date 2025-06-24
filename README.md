# Tic-Tac-Toe Web Application

A full-stack Tic-Tac-Toe game with React frontend and Node.js backend, containerized with Docker.

## Features

- Interactive Tic-Tac-Toe game interface
- RESTful API backend with game state management
- Fully containerized with Docker
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx

## Running with Docker

```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:3001

## API Endpoints

- `POST /api/games` - Create a new game
- `GET /api/games/:id` - Get game state
- `POST /api/games/:id/move` - Make a move
- `POST /api/games/:id/reset` - Reset the game

## Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```