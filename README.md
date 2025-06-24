# Tic-Tac-Toe Web Application

A full-stack Tic-Tac-Toe game with React frontend and Node.js backend, containerized with Docker.

## Features

- Interactive Tic-Tac-Toe game interface
- RESTful API backend with game state management
- Fully containerized with Docker
- Responsive design for mobile and desktop
- Real-time game state updates
- Win detection and game reset functionality

## Tech Stack

- **Frontend**: React 18, Axios
- **Backend**: Node.js, Express, CORS-enabled
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (for production builds)

## Prerequisites

- Docker and Docker Compose installed
- Node.js 18+ (for local development)
- npm or yarn package manager

## Quick Start

### Running with Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd tick-tac-toe

# Build and run with Docker Compose
docker compose up --build

# Or run in detached mode
docker compose up --build -d
```

The application will be available at:
- Frontend: http://localhost
- Backend API: http://localhost:3001

### Stopping the Application

```bash
# Stop containers
docker compose down

# Stop and remove volumes
docker compose down -v
```

## API Endpoints

- `POST /api/games` - Create a new game
  - Response: `{ id: string, board: Array, currentPlayer: 'X' | 'O', winner: null, gameOver: false }`

- `GET /api/games/:id` - Get game state
  - Response: `{ id: string, board: Array, currentPlayer: 'X' | 'O', winner: string | null, gameOver: boolean }`

- `POST /api/games/:id/move` - Make a move
  - Request: `{ position: number }` (0-8 for board positions)
  - Response: Updated game state

- `POST /api/games/:id/reset` - Reset the game
  - Response: Fresh game state

## Development

### Backend Development

```bash
cd backend
npm install
npm start

# For development with auto-reload (if configured)
npm run dev
```

Backend runs on http://localhost:3001

### Frontend Development

```bash
cd frontend
npm install
npm start
```

Frontend development server runs on http://localhost:3000

## Docker Configuration

### docker-compose.yml
- Frontend service: Nginx serving production React build on port 80
- Backend service: Node.js Express server on port 3001
- Custom network for container communication

### Environment Variables
- `NODE_ENV`: Set to 'production' in Docker
- `PORT`: Backend port (3001)
- `REACT_APP_API_URL`: API endpoint for frontend

## Project Structure

```
tick-tac-toe/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── index.css
├── docker-compose.yml
└── README.md
```

## Troubleshooting

### Docker Build Issues
- Ensure Docker Desktop is running
- Check that ports 80 and 3001 are not in use
- Run `docker compose down` before rebuilding

### Package Installation Issues
- Delete `node_modules` and `package-lock.json` in both frontend and backend
- Run `npm install` again
- Ensure Node.js version 18+ is installed

### CORS Issues
- Backend is configured with CORS enabled for all origins in development
- For production, update CORS settings in `backend/server.js`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.