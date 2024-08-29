import NavBar from '@/components/NavBar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi2';
import Image from 'next/image';
import ScrollToTopButton from '@/components/ScrollToTopButton';

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
        setTasks(data.data || []); // Use the `data` field to get the array of tasks
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleEdit = (id) => {
    console.log(`Editing task with ID: ${id}`);
    router.push(`/EditTask?id=${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Deleting task with ID: ${id}`);
    fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        console.log(`Task with ID: ${id} deleted successfully.`);
        setTasks(tasks.filter(task => task._id !== id));
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
        <div className='flex justify-between'>
          <h1 className='text-2xl font-bold'>My Tasks</h1>
          <div className='flex items-center gap-2'>
            <HiPlus size={20} color='#974FD0' />
            <Link href="/NewTask" className='text-[#974FD0]'>Add New Task</Link>
          </div>
        </div>
        
        <div className='mt-10 flex flex-col gap-10'>
          {tasks.length > 0 ? (
            tasks.map(task => (
              <div key={task._id} className='task-item rounded-md border border-gray-300 pb-6 p-2 mb-4'>
                <div className='flex justify-between pb-2 border-b-[1px]'>
                  <div className='flex mt-4'>
                    <h1 className={task.tag === "Urgent" ? "text-red-500" : "text-green-500"}>
                      {task.tag}
                    </h1>
                  </div>
                  <div className='flex flex-col md:flex-row items-center justify-center gap-2 '>
                    <button 
                      onClick={() => handleEdit(task._id)} 
                      className='bg-[#974FD0] mx-auto text-white py-1 w-[100px] md:w-[90px] rounded flex font-medium items-center gap-1 justify-center'
                    >
                      <Image src="/note.svg" width={15} height={100} alt=''/>
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(task._id)} 
                      className=' text-[#974FD0] border-[#974FD0] border w-[100px] py-1 rounded flex items-center font-medium gap-1 justify-center'
                    >
                      <Image src="/delete.svg" width={15} height={100} alt=''/>
                      Delete
                    </button>
                  </div>
                </div>
                <h2 className='text-2xl font-[500] mt-2 '>{task.title}</h2>
                <p className='text-[#737171]'>{task.description}</p>
                {/* <span className='block mt-2 text-sm text-gray-600'>{task.tag}</span> */}
              </div>
            ))
          ) : (
            <p className='text-center'>No tasks available.</p>
          )}
        </div>

        <ScrollToTopButton/>
      </div>
    </>
  );
};

export default AllTasks;
