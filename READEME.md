# Task Management Application

This project is a simple task management application that allows users to create, update, and delete tasks. Tasks have a title, description, and status (e.g., "To Do," "In Progress," "Done"). Users can view a list of tasks and filter them by status. The application includes both front-end and back-end components and is structured as a monorepo.

## Monorepo Structure

The monorepo contains two main directories:
- `frontend`: Contains the React application for the front-end.
- `backend`: Contains the Node.js application for the back-end.

## Front-End

### User Interface

The user-friendly interface includes the following components:
- **Task Form**: A form to create a new task with fields for title, description, and status.
- **Task List**: A list of tasks with the ability to update the status or delete a task.
- **Status Filter**: A dropdown to filter tasks by status (e.g., "All," "To Do," "In Progress," "Done").

### User Experience

- **Form Validation**: Ensures that tasks cannot be created without a title.
- **Modern Technologies**: Implemented using React.
- **Styling**: Styled using Tailwind CSS for modern, responsive design.
- **Responsive Design**: Ensures the application works well on both desktop and mobile devices.

## Back-End

### API Development

- **RESTful API**: Handles the CRUD operations for tasks.
- **Back-End Technology**: Built using Node.js with Express.

### Data Storage

- **Database**: PostgreSQL used to store task data.
- **Data Models**: Set up necessary models to represent tasks.

### Validation and Error Handling

- **Server-Side Validation**: Ensures that task data is valid before saving it to the database.
- **Error Handling**: Properly handles errors, including sending appropriate error messages and status codes in response.

## General

### Code Quality

- **Clean Code**: Written in a clean, well-documented, and maintainable manner.
- **Best Practices**: Uses coding best practices and conventions for JavaScript and React.

### Version Control

- **Git**: Version control system used to track changes in the code.

### Testing

- **Unit Tests**: Written for critical parts of the application, such as API endpoints and data validation.

### Security

- **Basic Security Measures**: Implemented to protect the application from common vulnerabilities.

## Bonus Features

- **User Authentication**: Implemented to restrict access to tasks.
- **Task Sorting and Searching**: Capabilities to sort and search tasks.
- **Additional Features**: Task due dates and reminders, user profiles with avatars.

## Setup Instructions

### Prerequisites

- **Node.js**: Ensure Node.js is installed.
- **PostgreSQL**: Ensure PostgreSQL is installed and running.

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-repo/task-manager.git
    cd task-manager
    ```

2. **Set up the environment variables** for both `frontend` and `backend`:
    - Create a `.env` file in the `backend` directory with the following content:
        ```
        JWT_SECRET=your_jwt_secret
        DB_URL=postgres://user:password@localhost:5432/taskmanager
        ```
    - Create a `.env` file in the `frontend` directory with the following content:
        ```
        REACT_APP_API_URL=http://localhost:5000
        ```

3. **Install dependencies**:
    - For the backend:
      ```sh
      cd backend
      npm install
      ```
    - For the frontend:
      ```sh
      cd ../frontend
      npm install
      ```

4. **Set up the database**:
    - Create a new PostgreSQL database named `taskmanager`.
    - Run the migrations to set up the database schema:
      ```sh
      cd ../backend
      npx prisma migrate deploy
      ```

5. **Start the servers**:
    - For the backend:
      ```sh
      npm run start
      ```
    - For the frontend:
      ```sh
      cd ../frontend
      npm start
      ```

### Running Tests

- **Run unit tests**:
    ```sh
    cd backend
    npm test
    ```

### Usage

- **Access the application**: Open `http://localhost:3000` in your browser.
- **Register/Login**: Create a new account or log in to an existing account.
- **Manage Tasks**: Create, update, delete, and filter tasks.

## Notes

- **Improvement Suggestions**: Additional features like real-time updates, notifications, and more sophisticated error handling can be added.
- **Known Issues**: None reported at the time of submission.
