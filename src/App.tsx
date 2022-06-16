import { useState } from 'react';
import Modal from 'react-modal';
import { Toaster } from 'react-hot-toast';
import { v4 as uuid } from 'uuid';

import { Header } from './components/Header';
import { Task } from './components/Task';
import { NewTaskModal } from './components/NewTaskModal';

import './App.scss';
import './styles/global.scss';

interface Task {
  id: string,
  type: string;
  description: string;
  isDone: boolean;
}

const mockedTasks = [
  {
    id: 0,
    type: 'family',
    description: 'Buscar Julia Maria no Shopping',
    isDone: false,
  },
  {
    id: 1,
    type: 'pets',
    description: 'Buscar Woody no PetShop',
    isDone: false,
  },
  {
    id: 2,
    type: 'house',
    description: 'Recolher lixos',
    isDone: false,
  },
]

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  function handleOpenNewTaskModal() {
    setIsNewTaskModalOpen(true);
  }

  function handleCloseNewTaskModal() {
    setIsNewTaskModalOpen(false);
  }

  function createNewTask(type: string, description: string) {
    setTasks([...tasks, { id: uuid(), type: type, description: description, isDone: false }]);
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
  }

  function editTask(id: string) {

  }

  function deleteTask(id: string) {
    setTasks(tasks.filter(task => task.id !== id));
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
          ) : <p>Nenhuma tarefa adicionada ate o momento.</p>
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