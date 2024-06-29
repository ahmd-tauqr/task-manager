import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center'>
          <Link to='/' className='text-white mx-2'>
            Task Manager
          </Link>
        </div>
        <div>
          {user ? (
            <button onClick={handleLogout} className='text-white'>
              Logout
            </button>
          ) : (
            <>
              <Link to='/login' className='text-white mx-2'>
                Login
              </Link>
              <Link to='/register' className='text-white mx-2'>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
