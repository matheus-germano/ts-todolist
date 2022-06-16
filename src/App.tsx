import { useState } from 'react';

import { Header } from './components/Header';
import { Task } from './components/Task';

import './App.scss';
import './styles/global.scss';

interface Task {
  id: number,
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
  const [tasks, setTasks] = useState<Task[]>(mockedTasks);

  function switchTaskStatus(id: number) {
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

  function editTask(id: number) {

  }

  function deleteTask(id: number) {
    console.log('deleteTask');
    let tempTasks = [...tasks];

    tempTasks.filter(task => task.id === id);

    setTasks(tempTasks);
  }

  return (
    <div className='App'>
      <Header />
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
    </div>
  )
}