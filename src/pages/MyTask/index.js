import NavBar from '@/components/NavBar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log('Fetching tasks from API...');
    fetch('/api/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Tasks fetched successfully:', data);
        setTasks(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleEdit = (id) => {
    console.log(`Editing task with ID: ${id}`);
    router.push(`/NewTask?id=${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting task with ID: ${id}`);
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        console.log(`Task with ID: ${id} deleted successfully.`);
        setTasks(tasks.filter(task => task._id !== id)); // Adjusted to use _id if needed
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const navbarProps = {
    title: 'TaskDuty',
    links: [
      { href: '/NewTask', label: 'New Task' }
    ],
  };

  return (
    <>
      <NavBar {...navbarProps} />
      <div className='w-10/12 mx-auto py-20'>
        <h1 className='text-2xl font-bold'>All Tasks</h1>
        <div className='mt-10'>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task._id} className='task-item border border-gray-300 p-4 mb-4'>
                <h2 className='text-xl font-semibold'>{task.title}</h2>
                <p>{task.description}</p>
                <span className='block mt-2 text-sm text-gray-600'>{task.tag}</span>
                <div className='mt-4'>
                  <button 
                    onClick={() => handleEdit(task._id)} 
                    className='bg-blue-500 text-white py-2 px-4 rounded mr-2'
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(task._id)} 
                    className='bg-red-500 text-white py-2 px-4 rounded'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllTasks;
