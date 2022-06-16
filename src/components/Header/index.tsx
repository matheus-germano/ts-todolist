import { useEffect, useState } from 'react';
import { BsPlusSquare, BsPlusSquareFill } from 'react-icons/bs';

import './styles.scss';

interface HeaderProps {
  onOpenNewTaskModal: () => void;
}

export function Header({ onOpenNewTaskModal }: HeaderProps) {
  const [welcomeMessage, setWelcomeMessage] = useState('Bom dia!');
  const [image, setImage] = useState('');
  const [isNewTaskButtonOnHover, setIsNewTaskButtonOnHover] = useState(false);

  useEffect(() => {
    let hours = new Date().getHours();
    let welcomeImage = '';

    if (hours >= 5 && hours < 12) {
      setWelcomeMessage('Bom dia!');
      welcomeImage = 'sun';
    }
    else if (hours >= 12 && hours < 18) {
      setWelcomeMessage('Boa tarde!');
      welcomeImage = 'sunrise';
    }
    else {
      setWelcomeMessage('Boa noite!');
      welcomeImage = 'moon';
    }

    setImage(`/src/assets/images/${welcomeImage}.png`)
  }, []);

  return (
    <div className='header-container'>
      <div className="header-content">
        <div>
          <h1>{welcomeMessage} <img src={image} alt={welcomeMessage} /></h1>
          <p>Esta é sua todo list.</p>
        </div>
        <button
          onClick={onOpenNewTaskModal}
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