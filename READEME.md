# Task Manager Application

## Overview

This repository contains the source code for a task management application. The application allows users to create, update, delete, and view tasks. Users can also filter tasks by their status (e.g., "To Do," "In Progress," "Done"). The application is built as a monorepo containing both frontend and backend projects.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Assumptions](#assumptions)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Testing](#testing)

## Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- React Router
- React Toastify for notifications

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT for authentication
- Bcrypt for password hashing

## Features

### Frontend
- User-friendly interface for managing tasks
- Form for creating new tasks
- List of tasks with the ability to update or delete tasks
- Filter tasks by status
- Responsive design for both desktop and mobile devices
- Authentication pages (login and register)
- Persist user session with cookies

### Backend
- RESTful API for managing tasks
- User authentication with JWT
- CRUD operations for tasks
- Server-side validation for task data
- Error handling

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL

### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd task-manager/frontend
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add your environment variables:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```sh
   npm start
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```sh
   cd task-manager/backend
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add your environment variables:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/taskmanager
   JWT_SECRET=your_jwt_secret
   ```

4. Migrate the database schema:
   ```sh
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Assumptions

During the design and implementation of this task management application, the following assumptions were made:

1. **Authentication**:
   - Users need to be authenticated to access the task management features.
   - JWT (JSON Web Token) is used for user authentication, and tokens are stored in cookies for maintaining session state.

2. **Task Management**:
   - Each task has a title, description, and status (e.g., "To Do," "In Progress," "Done").
   - A task must have a valid title and status before it can be created.
   - Users can filter tasks based on their status.
   - Tasks are associated with the user who created them, and only authenticated users can manage their tasks.

3. **Error Handling**:
   - Basic error handling is implemented to return appropriate status codes and messages for invalid requests.
   - Validation errors are handled both on the client-side (form validation) and server-side (API validation).

4. **Security**:
   - Basic security measures are implemented, such as HTTP-only cookies for storing JWT tokens and server-side validation to prevent common vulnerabilities.
   - Passwords are hashed before storing in the database to enhance security.

5. **Routing**:
   - The application has a default route (`/`) that shows all tasks for authenticated users and redirects unauthenticated users to the login page.
   - The `/login` route is used for user authentication, and `/register` for new user registration.
   - The `/tasks/new` route is used to create new tasks.

6. **Environment Variables**:
   - Environment variables are used to configure API URLs and database connections.
   - `.env` files are used to manage these variables in both frontend and backend directories.

7. **Technology Stack**:
   - The frontend is built using React and styled with Tailwind CSS for a responsive and modern design.
   - The backend is built using Node.js and Express, with PostgreSQL as the database.

8. **User Experience**:
   - The application is designed to be user-friendly with a simple and intuitive interface.
   - Smooth and responsive user interactions are prioritized, including form validation and error messages.

## API Endpoints

### Auth Endpoints
- `POST /v1/auth/register` - Register a new user
- `POST /v1/auth/login` - Login a user
- `GET /v1/auth/me` - Get the current authenticated user

### Task Endpoints
- `GET /v1/tasks` - Get all tasks
- `POST /v1/tasks` - Create a new task
- `PUT /v1/tasks/:id` - Update a task
- `DELETE /v1/tasks/:id` - Delete a task

## Folder Structure

```
task-manager/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   └── ...
│   ├── public/
│   ├── .env
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.ts
│   │   └── ...
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
│
└── README.md
```

## Testing

### Frontend Testing
To run the frontend tests:
```sh
cd task-manager/frontend
npm test
```

### Backend Testing
To run the backend tests:
```sh
cd task-manager/backend
npm test
```

This project implements basic unit tests to ensure the functionality of critical parts of the application.

## Conclusion

This task management application demonstrates a full-stack implementation using modern web development technologies. It provides user authentication, task management features, and a responsive user interface. For any questions or further clarifications, please refer to the code documentation or contact the project maintainers.