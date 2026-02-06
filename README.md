# Gemini Chat Application

A full-stack AI chat application powered by Google's Gemini API with conversation history management.

## Features

- Real-time AI chat using Gemini 2.5 Flash
- Conversation thread management
- Persistent chat history with MongoDB
- CSRF protection and secure authentication
- Responsive UI

## Tech Stack

**Frontend:**
- React + Vite
- Context API for state management

**Backend:**
- Node.js + Express
- MongoDB with Mongoose
- Google Generative AI (Gemini)
- CSRF protection with csurf

## Setup

### Backend

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (see `.env.example`):
```env
PORT=3000
GEMINI_API_KEY=your_api_key
MONGO_URI=your_mongodb_uri
MODEL=gemini-2.5-flash
FRONTEND_URL=http://localhost:5173
```

4. Start server:
```bash
npm run dev
```

### Frontend

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```env
VITE_BACKEND_URL=http://localhost:3000
```

4. Start development server:
```bash
npm run dev
```

## Usage

Access the application at `http://localhost:5173`

- Start a new chat
- View chat history in sidebar
- Delete conversations
- Switch between threads

## Security

- CORS configured for specific origins
- CSRF token protection on all API routes
- Credentials included in requests
- Environment variables for sensitive data

## License

ISC