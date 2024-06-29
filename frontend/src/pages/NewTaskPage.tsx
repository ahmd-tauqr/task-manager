import React from 'react';
import TaskForm from '../components/Task/TaskForm';

const NewTaskPage: React.FC = () => {
  return (
    <div>
      <h2 className='text-2xl font-bold text-center mt-10'>New Task</h2>
      <TaskForm />
    </div>
  );
};

export default NewTaskPage;
