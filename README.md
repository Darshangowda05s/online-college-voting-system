# College Election

A full-stack college election application built with React, Vite, and Express/MongoDB.

## Project Structure

- `client/` - React frontend built with Vite.
- `server/` - Express backend with MongoDB, Google authentication, and election management APIs.

## Key Features

- Google OAuth sign-in for students and admins
- JWT access and refresh token authentication via cookies
- Election listing, details, voting, and result viewing
- Admin-only election creation, update, and deletion
- MongoDB models for users, elections, votes, and refresh tokens
- CORS support for local frontend development

## Prerequisites

- Node.js 18+ / npm
- MongoDB database
- Google Cloud OAuth 2.0 Client ID

## Setup

### 1. Clone repository

```bash
cd c:\college-election
```

### 2. Install dependencies

```bash
npm install
cd client
npm install
cd ..\server
npm install
```

## Environment Variables

Create a `.env` file in `server/` with the following values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/<dbname>
GOOGLE_CLIENT_ID=<your-google-client-id>
JWT_ACCESS_SECRET=<access-token-secret>
JWT_REFRESH_SECRET=<refresh-token-secret>
COLLEGE_DOMAIN=@college.edu
CORS_ORIGINS=http://localhost:5173,http://localhost:5174,http://localhost:5175
```

- `COLLEGE_DOMAIN` is optional; when set, it restricts login to that email domain.
- `CORS_ORIGINS` defaults to `http://localhost:5173,http://localhost:5174,http://localhost:5175`.

## Running the App

### Start the backend

```bash
cd server
npm run dev
```

The server starts on the port defined in `.env`.

### Swagger API docs

Once the backend is running, open the Swagger UI at:

```text
http://localhost:5000/api/docs
```

The OpenAPI specification is also available in the repo at `docs/openapi.yaml`.

### Start the frontend

```bash
cd client
npm run dev
```

By default, Vite serves the frontend at `http://localhost:5173`.

## Frontend Configuration

The client uses `VITE_API_URL` to determine the backend API base URL.

Create `client/.env` if needed:

```env
VITE_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication

- `POST /api/auth/google` - sign in with Google credential
- `POST /api/auth/refresh` - refresh access token using refresh cookie
- `POST /api/auth/logout` - clear authentication cookies

### User

- `GET /api/users/me` - get currently authenticated user profile

### Elections

- `GET /api/elections` - list elections
- `GET /api/elections/:id` - get election details
- `POST /api/elections/:id/vote` - cast vote for a candidate
- `GET /api/elections/:id/results` - get election results

### Admin-only

- `POST /api/elections` - create election
- `PUT /api/elections/:id` - update election
- `DELETE /api/elections/:id` - delete election
- `GET /api/admin/dashboard` - sample admin-only route

## Notes

- The backend uses cookie-based access and refresh tokens.
- The frontend sends credentials with requests via Axios.
- Election status is computed from `startTime` and `endTime`.

## Optional Improvements

- Add production-ready HTTPS and secure cookie settings
- Add seed data script or admin onboarding flow
- Implement role-based admin dashboard UI
- Add tests for backend routes and frontend components

## Contact

For development questions, inspect `server/src/` and `client/src/` source files.

## Author

Darshan B N
