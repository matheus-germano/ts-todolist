import { useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';

import './styles.scss';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
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

export function NewTaskModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const [taskType, setTaskType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => { onRequestClose(); setTaskType(''); setTaskDescription('') }}
      contentLabel='Crie uma nova tarefa'
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <div className='new-task-modal-container'>
        <FaTimes className='close-modal-btn' size={24} onClick={() => { onRequestClose(); setTaskType(''); setTaskDescription('') }} />
        <div className="new-task-modal-header">
          <h2>Crie uma nova tarefa</h2>
        </div>
        <Select
          options={taskTypes}
          isClearable
          isSearchable
          placeholder='Selecione um tipo de tarefa'
          defaultValue={taskType !== '' ? taskTypes.filter(task => task.value === taskType) : undefined}
          onChange={e => e ? setTaskType(e.value) : setTaskDescription('')}
        />
        <input
          type='text'
          name='taskDescription'
          id='taskDescription'
          placeholder='Descreva sua tarefa'
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button className='new-task-btn'>Criar tarefa</button>
      </div>
    </Modal>
  );
}