import { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

import './styles.scss';

interface NewTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreateNewTask: (type: string, description: string, dateLimit: string) => void;
}

const taskTypes = [
  {
    value: 'house',
    label: 'Tarefas de casa'
  },
  {
    value: 'family',
    label: 'Tarefas para/com a familia'
  },
  {
    value: 'pets',
    label: 'Tarefas para/com pets'
  },
  {
    value: 'job',
    label: 'Tarefas do trabalho'
  },
];

export function NewTaskModal({ isOpen, onRequestClose, onCreateNewTask }: NewTaskModalProps) {
  const [taskType, setTaskType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');

  function verifyTaskCreationConditions() {
    if (taskType.trim() === '') {
      toast.error('Por favor, selecione um tipo de tarefa');
      return;
    } else if (taskDescription.trim() === '') {
      toast.error('Por favor, descreva a tarefa');
      return;
    }

    onCreateNewTask(taskType, taskDescription, taskDeadline);
    onRequestClose();
    setTaskType('');
    setTaskDescription('');
    setTaskDeadline('');
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => { onRequestClose(); setTaskType(''); setTaskDescription(''); setTaskDeadline(''); }}
      contentLabel='Crie uma nova tarefa'
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <div className='new-task-modal-container'>
        <FaTimes className='close-modal-btn' size={24} onClick={() => { onRequestClose(); setTaskType(''); setTaskDescription(''); setTaskDeadline(''); }} />
        <div className="new-task-modal-header">
          <h2>Crie uma nova tarefa</h2>
        </div>
        <div className="form-control">
          <label htmlFor="">Selecione um tipo de tarefa</label>
          <Select
            options={taskTypes}
            isClearable
            isSearchable
            placeholder='Tipo de tarefa'
            defaultValue={taskType !== '' ? taskTypes.filter(task => task.value === taskType) : undefined}
            onChange={e => e ? setTaskType(e.value) : setTaskType('')}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Insira uma data limite</label>
          <input
            type='datetime-local'
            name='taskDeadline'
            id='taskDeadline'
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Descreva sua tarefa</label>
          <input
            type='text'
            name='taskDescription'
            id='taskDescription'
            placeholder='Ex.: Passear com o cachorro'
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>
        <button
          className='new-task-btn'
          onClick={verifyTaskCreationConditions}
        >Criar tarefa</button>
      </div>
    </Modal>
  );
}