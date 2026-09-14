# Users Management - Full Stack CRUD Application

A simple full-stack User CRUD application built with React, Express, TypeScript, and MongoDB.

## Technologies Used

### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- Axios

### Backend
- Node.js
- Express v5
- TypeScript
- MongoDB
- Mongoose
- dotenv
- cors

## Project Structure

```
/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmDialog.tsx
│   │   │   ├── Notification.tsx
│   │   │   ├── UserForm.tsx
│   │   │   └── UserTable.tsx
│   │   ├── pages/
│   │   │   └── UsersPage.tsx
│   │   ├── services/
│   │   │   └── userService.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   └── userController.ts
│   │   ├── middleware/
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   └── userRoutes.ts
│   │   ├── services/
│   │   │   └── userService.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Install Backend Dependencies
```bash
cd backend
npm install
```

### Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Environment Variables

### Backend
Create a `.env` file in the `backend/` directory:

```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
```

For local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/users-crud
```

### Frontend
Create a `.env` file in the `frontend/` directory:

```
VITE_API_URL=http://localhost:4000/api
```

## Running the Application

### Start MongoDB
Make sure MongoDB is running locally, or update `MONGODB_URI` with your Atlas connection string.

### Start Backend
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:4000`

### Start Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a user |
| PUT | `/api/users/:id` | Update a user |
| DELETE | `/api/users/:id` | Delete a user |

## Example API Requests

### Create User
```bash
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "age": 25}'
```

### Get All Users
```bash
curl http://localhost:4000/api/users
```

### Get User by ID
```bash
curl http://localhost:4000/api/users/<user_id>
```

### Update User
```bash
curl -X PUT http://localhost:4000/api/users/<user_id> \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "age": 30}'
```

### Delete User
```bash
curl -X DELETE http://localhost:4000/api/users/<user_id>
```

## Production Build

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Notes

- No authentication or authorization is implemented.
- Frontend validation exists but backend also validates all inputs.
- CORS is configured to allow requests from the frontend dev server.
