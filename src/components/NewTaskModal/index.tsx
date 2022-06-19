import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import { FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

import './styles.scss';

interface Task {
  id: string,
  type: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  taskDeadline: Date | string;
}

interface NewTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onCreateNewTask: (type: string, description: string, dateLimit: string) => void;
  onEditTask: (id: string, type: string, description: string, dateLimit: string) => void;
  taskToEdit?: Task | undefined;
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

const taskHasDeadlineOptions = [{ value: 0, label: "Não" }, { value: 1, label: "Sim" }]

export function NewTaskModal({ isOpen, onRequestClose, onEditTask, onCreateNewTask, taskToEdit }: NewTaskModalProps) {
  const [taskType, setTaskType] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskHasDeadline, setTaskHasDeadline] = useState(0);
  const [taskDeadline, setTaskDeadline] = useState('');

  useEffect(() => {
    if (taskToEdit !== undefined) {
      setTaskType(taskToEdit.type);
      setTaskDescription(taskToEdit.description);
      if (taskToEdit.taskDeadline !== '') {
        setTaskHasDeadline(1);
        setTaskDeadline(() => {
          let formatedDate = '';
          const fullDate = new Intl.DateTimeFormat('fr-ca', { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(new Date(taskToEdit.taskDeadline));
          const date = fullDate.split(',')[0];
          const time = fullDate.split(',')[1].split('h').join(':').replace(/\s/g, '');

          formatedDate = date + 'T' + time;

          return formatedDate;
        });
      };
    }
  }, [taskToEdit]);

  function verifyTaskConditions() {
    if (taskType.trim() === '') {
      toast.error('Por favor, selecione um tipo de tarefa');
      return;
    } else if (taskDescription.trim() === '') {
      toast.error('Por favor, descreva a tarefa');
      return;
    } else if (taskHasDeadline === 1 && taskDeadline.trim() === '') {
      toast.error('Por favor, selecione uma data limite');
      return;
    }

    if (taskToEdit !== undefined) {
      onEditTask(taskToEdit.id, taskType, taskDescription, taskDeadline);
    } else {
      onCreateNewTask(taskType, taskDescription, taskDeadline);
    }

    onRequestClose();
    setTaskType('');
    setTaskDescription('');
    setTaskDeadline('');
    setTaskHasDeadline(0);
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => { onRequestClose(); setTaskType(''); setTaskDescription(''); setTaskDeadline(''); setTaskHasDeadline(0); }}
      contentLabel='Crie uma nova tarefa'
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
    >
      <div className='new-task-modal-container'>
        <FaTimes className='close-modal-btn' size={24} onClick={() => { onRequestClose(); setTaskType(''); setTaskDescription(''); setTaskDeadline(''); setTaskHasDeadline(0); }} />
        <div className="new-task-modal-header">
          <h2>{taskToEdit !== undefined ? 'Edite sua tarefa' : 'Crie uma nova tarefa'}</h2>
        </div>
        <div className="form-control">
          <label htmlFor="">Selecione um tipo de tarefa</label>
          <Select
            options={taskTypes}
            isClearable
            isSearchable
            placeholder='Tipo de tarefa'
            defaultValue={taskToEdit !== undefined ? taskTypes.filter(task => task.value === taskToEdit.type) : undefined}
            onChange={e => e ? setTaskType(e.value) : setTaskType('')}
          />
        </div>
        <div className="form-control">
          <label htmlFor="">Existe uma data limite para realização?</label>
          <Select
            options={taskHasDeadlineOptions}
            isSearchable
            placeholder='Existe data limite?'
            defaultValue={taskToEdit !== undefined ? taskHasDeadlineOptions.filter(option => option.value === (taskToEdit.taskDeadline !== '' ? 1 : 0)) : undefined}
            onChange={e => e ? setTaskHasDeadline(e.value) : setTaskHasDeadline(0)}
          />
        </div>
        {
          taskHasDeadline === 1 && (
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
          )
        }
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
          onClick={verifyTaskConditions}
        >
          {
            taskToEdit !== undefined ? 'Editar tarefa' : 'Criar tarefa'
          }
        </button>
      </div>
    </Modal>
  );
}