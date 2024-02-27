import './App.css'
import React, { useState } from 'react'
import { IoCheckbox } from "react-icons/io5";
import { TbSubtask } from "react-icons/tb";

const AddToDoTask = ({ NewTask }) => {
  const [task, setTask] = useState("");
  return (
    <>
      <div className="flex items-center mb-4 leading-none">
        <TbSubtask size={40} className="text-2xl font-bold text-left mr-2" />
        <h1 className="text-4xl font-bold text-left m-4 leading-none">TO DO APP</h1>
      </div>
      <p className="text-gray text-left leading-none mb-10">Stay organized, focused, and in control of your tasks!</p>
      <form id="task-form" className="flex justify-center mb-4 mt-2">
        <input type="text" id="task-input" className="w-full text-black p-2 rounded-lg outline-green" placeholder="New Task" value={task} onChange={(e) => setTask(e.target.value)} />
        <button type="button" className="ms-2 text-sm bg-darkGreen hover:bg-green text-white" onClick={() => { NewTask(task); setTask("") }}>Add</button>
      </form>
    </>
  )
}
const DoneTask = ({ Task, DateCreated, Status, DateFinished }) => {
  return (
    <div class="w-500 p-5 mt-2 rounded-lg shadow-lg bg-white">
      <div class="flex">
        <div class="flex items-center h-5">
          <h2> <IoCheckbox class="bg-green mt-10 w-6 h-6" /></h2>
        </div>
        <div class="ms-2 text-sm ml-5">
          <p id="helper-radio-text" class="text-xs font-normal text-gray dark:text-gray-300"> Date Created: {DateCreated}  </p>
          <h3 class="text-green text-xl font-bold uppercase">{Task}</h3>
          <p id="helper-radio-text" class="text-xs font-normal text-gray dark:text-gray-300">Status ({Status}) | Date Finished: {DateFinished}</p>
        </div>
      </div>
    </div>

  )
}
const ToDoItem = ({ Task, DateCreated, Status, Done, Remove, Index, TaskIndex }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <form id="task-form" className="flex justify-center mb-4 mt-2">
        <input type="text" id="task-input" className="w-full text-black p-2 rounded-lg outline-green" placeholder="Search Task" value={searchTerm} onChange={handleSearch} />
      </form>
      <div className="w-500 mt-2 p-5 rounded-lg shadow-lg bg-white hover:bg-lightBlue">
        {Task.toLowerCase().includes(searchTerm.toLowerCase()) && (
          <div className="flex justify-between">
            <div className="flex items-center h-5">
              <input
                class="mt-8 w-6 h-6  bg-green hover:outline-5 hover:outline-green"
                id="default-checkbox"
                type="checkbox"
                checked={false}
                onClick={() => Done(Task, TaskIndex)}
              />
            </div>
            <div className="flex-grow ml-5">
              <p id="helper-radio-text" className="text-xs font-normal text-gray dark:text-gray-300">
                {DateCreated}
              </p>
              <h3 className="text-black text-xl font-bold uppercase">{Task}</h3>
              <p id="helper-radio-text" className="text-xxs font-normal text-gray dark:text-gray-300">
                Status ({Status})
              </p>
            </div>
            <div className="flex ">
              <button
                type="button"
                className="text-sm bg-lightremove hover:bg-delete text-white mt-3 h-12"
                onClick={() => Remove(Index)}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function App() {
  const [pendingTasks, setPendingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const [isPending, setIsPending] = useState(true);
  const [isDone, setIsDone] = useState(false);

  const current = new Date();
  // const month = ['January', 'Febuary', 'March', 'April','May', 'June', 'July', 'August','September', 'October', 'November']
  const now = `${current.getMonth()}/${current.getDate()}/${current.getFullYear()}`;
  const addTask = (task) => {
    if (task.trim()) {
      setPendingTasks([...pendingTasks, task]);
    }
  };
  const removeTask = (index) => {
    const newTasks = [...pendingTasks];
    newTasks.splice(index, 1);
    setPendingTasks(newTasks);
  };
  const removeAllTasks = () => {
    setDoneTasks([]);
  };
  const doneTask = (task, index) => {
    if (task.trim()) {
      setDoneTasks([...doneTasks, task]);
    }
    const newTasks = [...pendingTasks];
    newTasks.splice(index, 1);
    setPendingTasks(newTasks);
  };

  const onPending = () => {
    setIsPending(true);
    setIsDone(false);
  }
  const onDone = () => {
    setIsDone(true);
    setIsPending(false)
  }

  return (
    <>
      <div className='container' class="bg-midnight p-10 mt-20 rounded-lg text-white md:container max-w-lg md:mx-auto" >

        <AddToDoTask NewTask={addTask} />
        <div className='taskTab'>
          <button type="button" class={`${isPending ? "ms-2 text-sm bg-orange hover:bg-orange text-white" : "ms-2 text-sm hover:bg-lightOrange text-white"}`} onClick={onPending}>Pending</button>
          <button type="button" class={`${isDone ? "ms-2 text-sm bg-orange hover:bg-orange text-white" : "ms-2 text-sm hover:bg-lightOrange text-white"}`} onClick={onDone}>Done</button>
          {isDone &&
            <>
              <button type="button" className="clearTab" onClick={removeAllTasks}>
                Clear Tasks
              </button>
            </>
          }
        </div>

        {isPending &&
          <>
            {pendingTasks.map((task, index) => (
              <ToDoItem
                key={index}
                Task={task}
                DateCreated={now}
                Status={"Pending"}
                Done={doneTask}
                Remove={removeTask}
                Index={index}
              />
            ))} {pendingTasks.length === 0 && (
              <div className="w-500 p-5 rounded-lg shadow-lg bg-white">
                <h3 className="text-gray">NO PENDING TASK</h3>
              </div>
            )}
          </>
        }
        {isDone &&
          <>
            {doneTasks.map((task, index) => (
              <DoneTask
                key={index}
                Task={task}
                DateCreated={now}
                Status={"Done"}
                DateFinished={now}
              />
            ))}{doneTasks.length === 0 && (
              <div className="w-500 p-5 rounded-lg shadow-lg bg-white">
                <h3 className="text-gray">NO TASKS DONE</h3>
              </div>
            )}
          </>
        }
      </div>
    </>
  )
}
