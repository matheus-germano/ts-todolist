import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';

import { Header } from './components/Header';
import { Task } from './components/Task';
import { NewTaskModal } from './components/NewTaskModal';

import wind from './assets/images/wind.png';

import './App.scss';
import './styles/global.scss';

interface Task {
  id: string,
  type: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  taskDeadline: Date | string;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  useEffect(() => {
    try {
      let localTasks = JSON.parse(localStorage.getItem('tasks') || '');

      if (localTasks.length > 0) {
        localTasks.forEach((task: Task) => task.createdAt = new Date(task.createdAt));
        setTasks(localTasks);
      }
    } catch (e) {
      setTasks([]);
    }
  }, []);

  function handleOpenNewTaskModal() {
    setIsNewTaskModalOpen(true);
  }

  function handleCloseNewTaskModal() {
    setIsNewTaskModalOpen(false);
  }

  function sortTasksByIsDone(tasks: Task[]) {
    let tempTasks = [...tasks];
    tempTasks = tempTasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).sort((a, b) => Number(a.isDone) - Number(b.isDone));
    setTasks(tempTasks);

    localStorage.setItem('tasks', JSON.stringify(tempTasks));
  }

  function createNewTask(type: string, description: string, dateLimit: string) {
    let tempTasks = [...tasks];
    let thisDateLimit: Date | string = '';

    if (dateLimit !== '') thisDateLimit = new Date(dateLimit);

    tempTasks.push({ id: uuid(), type: type, description: description, isDone: false, createdAt: new Date(), taskDeadline: thisDateLimit })

    setTasks(tempTasks);
    sortTasksByIsDone(tempTasks);
  }

  function switchTaskStatus(id: string) {
    let tempTasks = [...tasks];

    tempTasks.forEach((task, index) => {
      let tempTask = { ...task };

      if (tempTask.id === id) {
        tempTask.isDone = !tempTask.isDone;
        tempTasks[index] = tempTask;
      }
    });

    setTasks(tempTasks);
    sortTasksByIsDone(tempTasks);
  }

  function editTask(id: string) {

  }

  function deleteTask(id: string) {
    let tempTasks = [...tasks];
    tempTasks = tempTasks.filter(task => task.id !== id);

    setTasks(tempTasks);
    sortTasksByIsDone(tempTasks);
  }

  Modal.setAppElement('#root');

  return (
    <div className='App'>
      <div><Toaster /></div>
      <Header onOpenNewTaskModal={handleOpenNewTaskModal} />
      <div className='app-content'>
        {
          tasks && tasks.length > 0 ? (
            <div className='tasks-wrapper'>
              {
                tasks.map((task, key) => (
                  <Task key={key} task={task} switchTaskStatus={switchTaskStatus} editTask={editTask} deleteTask={deleteTask} />
                ))
              }
            </div>
          ) : (
            <div className='empty-task-area'>
              <h3>Nenhuma tarefa adicionada ate o momento.</h3>
              <img src={wind} alt="" />
            </div>
          )
        }
      </div>

      <NewTaskModal
        isOpen={isNewTaskModalOpen}
        onRequestClose={handleCloseNewTaskModal}
        onCreateNewTask={createNewTask}
      />
    </div>
  )
}