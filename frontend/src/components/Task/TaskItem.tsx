import React, { useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface TaskItemProps {
  task: Task;
  fetchTasks: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, fetchTasks }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [editedStatus, setEditedStatus] = useState(task.status);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/v1/tasks/${task.id}`,
        { withCredentials: true }
      );
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/v1/tasks/${task.id}`,
        {
          title: editedTitle,
          description: editedDescription,
          status: editedStatus,
        },
        { withCredentials: true }
      );
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  return (
    <div className='p-4 border rounded-lg shadow-lg bg-white'>
      {isEditing ? (
        <>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='title'
            >
              Title
            </label>
            <input
              type='text'
              id='title'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='description'
            >
              Description
            </label>
            <textarea
              id='description'
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='status'
            >
              Status
            </label>
            <select
              id='status'
              value={editedStatus}
              onChange={(e) => setEditedStatus(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            >
              <option value='To Do'>To Do</option>
              <option value='In Progress'>In Progress</option>
              <option value='Done'>Done</option>
            </select>
          </div>
          <div className='flex justify-between items-center'>
            <button
              onClick={handleUpdate}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className='text-lg font-bold'>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>
          <div className='flex justify-between items-center mt-4'>
            <button
              onClick={() => setIsEditing(true)}
              className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
