"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import HomeSlide from '@/components/Carousel/HomeSlide'
import NavBar from './NavBar';
// import TaskList from '@/components/TaskList';
// import TaskForm from '@/components/TaskForm';
// import Header from '@/components/Header';


const App = () => {
    const navbarProps = {
        title: 'TaskDuty',
        links: [
          { href: '/NewTask', label: 'New Task' },
          { href: '/MyTask', label: 'All Tasks' },
        ],
      };
//   const [tasks, setTasks] = useState([]);
//   const [taskToEdit, setTaskToEdit] = useState(null);

//   const handleAddOrUpdateTask = (task) => {
//     if (taskToEdit) {
//       setTasks(tasks.map(t => (t.id === task.id ? task : t)));
//       setTaskToEdit(null);
//     } else {
//       setTasks([...tasks, task]);
//     }
//   };

//   const handleDeleteTask = (id) => {
//     setTasks(tasks.filter(task => task.id !== id));
//   };

//   const handleToggleTask = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const handleEditTask = (task) => {
//     setTaskToEdit(task);
//   };

  return (
    <div>
      
{/*       
      <TaskForm onSave={handleAddOrUpdateTask} taskToEdit={taskToEdit} />
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
        onEdit={handleEditTask}
      /> */}
      <NavBar {...navbarProps}/>

      <div className='grid grid-cols-1 lg:grid-cols-2 w-10/12 mx-auto mt-3 lg:mt-20'>
        <div className='flex flex-col gap-4 lg:gap-10'>
          <h1 className='text-[28px] lg:text-[45px] font-medium'>
          Manage your Tasks on <span className='text-[#974FD0]'>TaskDuty</span>
          </h1>


          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non tellus, sapien, morbi ante nunc euismod ac felis ac. Massa et, at platea tempus duis non eget. Hendrerit tortor fermentum bibendum mi nisl semper porttitor. Nec accumsan.
          </p>

          <Link href="#" className='px-4 w-[150px] rounded-lg py-2 bg-[#974FD0] text-white' >Go to My Tasks</Link>
        </div>

        <div className='flex justify-end '>
          <HomeSlide/>
        </div>
      </div>

      




    </div>
  );
};

export default App;
