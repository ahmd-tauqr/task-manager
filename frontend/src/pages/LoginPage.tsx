import React from 'react';
import Login from '../components/Auth/Login';

const LoginPage: React.FC = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-center mt-10'>Login</h2>
      <Login />
    </div>
  );
};

export default LoginPage;
