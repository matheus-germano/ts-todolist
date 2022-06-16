import { useEffect, useState } from 'react';
import { BsDashSquare, BsDashSquareFill } from 'react-icons/bs';

import './styles.scss';

interface Task {
  id: string,
  type: string;
  description: string;
  isDone: boolean;
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
        <p>{task.description}</p>
      </div>
      <div className='task-options'>
        <BsDashSquareFill
          size={20}
          color={'#f00'}
          onClick={() => deleteTask(task.id)}
        />
      </div>
    </div>
  );
}