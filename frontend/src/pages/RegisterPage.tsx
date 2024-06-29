import React from 'react';
import Register from '../components/Auth/Register';

const RegisterPage: React.FC = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-center mt-10'>Register</h2>
      <Register />
    </div>
  );
};

export default RegisterPage;
