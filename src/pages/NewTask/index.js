// /src/pages/NewTask.js
import NavBar from '@/components/NavBar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ScrollToTopButton from '@/components/ScrollToTopButton';

const NewTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [options] = useState(['urgent', 'important']);
  const router = useRouter();
  const { query } = router;
  const taskId = query.id;

  useEffect(() => {
    if (taskId) {
      fetch(`/api/tasks/${taskId}`)
        .then(response => response.json())
        .then(task => {
          setTitle(task.title);
          setDescription(task.description);
          setSelectedValue(task.tag);
        })
        .catch(error => console.error('Error fetching task:', error));
    }
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      tag: selectedValue,
    };

    const method = taskId ? 'PUT' : 'POST';
    const url = taskId ? `/api/tasks/${taskId}` : '/api/tasks';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error saving task');
      }
      console.log('Task saved successfully:', data);
      router.push('/MyTask');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    console.log('Tag selected:', event.target.value);
  };

  const navbarProps = {
    title: 'TaskDuty',
    links: [
      { href: '/NewTask', label: 'New Task' },
      { href: '/MyTask', label: 'All Tasks' },
    ],
  };

  return (
    <>
      <NavBar {...navbarProps} />
      <div className='w-10/12 mx-auto py-20'>
        <h1 className='text-2xl font-bold'>{taskId ? 'Edit Task' : 'New Task'}</h1>
        <form className='mt-10' onSubmit={handleSubmit}>
          <div className='relative w-full border border-[#B8B6B6] mx-auto'>
            <label className='absolute -mt-4 px-2 bg-white text-[22px] font-semibold ml-6 text-[#9C9C9C]'>Task Title</label>
            <input
              type='text'
              placeholder='E.g Project Defense, Assignment ...'
              className='px-8 py-5 w-full'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='relative w-full border border-[#B8B6B6] mx-auto mt-10'>
            <label className='absolute -mt-4 px-2 bg-white text-[22px] font-semibold ml-6 text-[#9C9C9C]'>Description</label>
            <textarea
              rows={5}
              cols={80}
              placeholder='Briefly describe your task...'
              className='px-8 py-5 w-full'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='relative w-full border border-[#B8B6B6] mx-auto mt-10'>
            <label className='absolute -mt-4 px-2 bg-white text-[22px] font-semibold ml-6 text-[#9C9C9C]'>Tags</label>
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              className='px-8 py-5 w-full'
            >
              <option value="" disabled>Select Tag</option>
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full mt-10'>
            <button className='w-full bg-[#974FD0] text-white py-5 font-semibold' type="submit">
              {taskId ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default NewTask;
