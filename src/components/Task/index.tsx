import { useEffect, useState } from 'react';
import { BsDashSquare, BsDashSquareFill } from 'react-icons/bs';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im';

import './styles.scss';

interface Task {
  id: string,
  type: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  taskDeadline: Date | string;
}

interface TaskProps {
  task: Task;
  switchTaskStatus: (id: string) => void;
  editTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export function Task({ task, switchTaskStatus, editTask, deleteTask }: TaskProps) {
  const [image, setImage] = useState('');

  useEffect(() => {
    setImage(`/src/assets/images/${task.type}.png`);
  }, []);

  return (
    <div className='task-container'>
      <div className='task-id'>
        <img src={image} alt={task.type} title={task.type} />
        <p style={task.isDone ? { textDecoration: 'line-through' } : undefined}>{task.description}</p>
      </div>
      <div className='task-other-info'>
        {
          task.taskDeadline === '' ? (
            <p
              className='task-deadline'
              style={task.isDone ? { textDecoration: 'line-through' } : undefined}
            >
              Sem data limite
            </p>
          ) : (
            <p
              className='task-deadline'
              style={task.isDone ? { textDecoration: 'line-through' } : undefined}
            >
              Realizar até {new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(task.taskDeadline))}
            </p>
          )
        }
        <div className='task-options'>
          {
            task.isDone ?
              <ImCheckboxChecked
                color={'#0f0'}
                onClick={() => switchTaskStatus(task.id)}
                title='Desmarcar tarefa como feita'
              /> :
              <ImCheckboxUnchecked
                color={'#333'}
                onClick={() => switchTaskStatus(task.id)}
                title='Marcar tarefa como feita'
              />
          }
          <AiFillEdit
            size={20}
            color={'#3a7ca5'}
            onClick={() => editTask(task.id)}
            title='Editar tarefa'
          />
          <AiFillDelete
            size={20}
            color={'#f00'}
            onClick={() => deleteTask(task.id)}
            title='Tarefa tarefa'
          />
        </div>
      </div>
    </div>
  );
}