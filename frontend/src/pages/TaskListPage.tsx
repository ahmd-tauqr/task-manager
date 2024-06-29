import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/Task/TaskList';

const TaskListPage: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/v1/tasks`,
        {
          params: { search, status, page },
          withCredentials: true,
        }
      );
      setTasks(response.data.tasks);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  }, [search, status, page]);

  useEffect(() => {
    fetchTasks();
  }, [search, status, page, fetchTasks]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search change
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
    setPage(1); // Reset to first page on status change
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>My Tasks</h1>
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded'
          onClick={() => navigate('/tasks/new')}
        >
          Create New Task
        </button>
      </div>
      <div className='flex mb-4'>
        <input
          type='text'
          value={search}
          onChange={handleSearchChange}
          placeholder='Search tasks...'
          className='border p-2 mr-2 flex-grow'
        />
        <select
          value={status}
          onChange={handleStatusChange}
          className='border p-2'
        >
          <option value=''>All</option>
          <option value='To Do'>To Do</option>
          <option value='In Progress'>In Progress</option>
          <option value='Done'>Done</option>
        </select>
      </div>
      {loading ? (
        <p className='text-center mt-4'>Loading...</p>
      ) : error ? (
        <p className='text-center mt-4 text-red-500'>{error}</p>
      ) : (
        <>
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
          {tasks.length > 0 ? (
            <div className='flex justify-between mt-4'>
              <button
                className='bg-gray-500 text-white py-2 px-4 rounded'
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                className='bg-gray-500 text-white py-2 px-4 rounded'
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          ) : (
            <p className='text-center mt-4'>No tasks found</p>
          )}
        </>
      )}
    </div>
  );
};

export default TaskListPage;
