import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TaskListPage from './pages/TaskListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NewTaskPage from './pages/NewTaskPage';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path='/'
          element={user ? <TaskListPage /> : <Navigate to='/login' />}
        />
        <Route
          path='/tasks/new'
          element={user ? <NewTaskPage /> : <Navigate to='/login' />}
        />
        <Route
          path='/login'
          element={user ? <Navigate to='/' /> : <LoginPage />}
        />
        <Route
          path='/register'
          element={user ? <Navigate to='/' /> : <RegisterPage />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
