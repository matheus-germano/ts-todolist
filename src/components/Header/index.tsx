import { useEffect, useState } from 'react';
import { BsPlusSquare, BsPlusSquareFill } from 'react-icons/bs';

import './styles.scss';

export function Header() {
  const [welcomeMessage, setWelcomeMessage] = useState('Bom dia!');
  const [isNewTaskButtonOnHover, setIsNewTaskButtonOnHover] = useState(false);

  useEffect(() => {
    let hours = new Date().getHours();

    hours >= 5 && hours < 12 ? setWelcomeMessage('Bom dia!') : hours >= 12 && hours < 18 ? setWelcomeMessage('Boa tarde!') : setWelcomeMessage('Boa noite!');
  }, []);

  return (
    <div className='header-container'>
      <div className="header-content">
        <h2>{welcomeMessage} Esta é sua todo list.</h2>
        <button
          onMouseEnter={() => setIsNewTaskButtonOnHover(true)}
          onMouseLeave={() => setIsNewTaskButtonOnHover(false)}
          className='btn new-task'
        >
          Adicionar tarefa
          {isNewTaskButtonOnHover ? <BsPlusSquareFill size={20} /> : <BsPlusSquare size={20} />}
        </button>
      </div>
    </div>
  );
}