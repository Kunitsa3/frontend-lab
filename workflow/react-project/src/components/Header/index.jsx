import './style.less';
import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../generic/Button';
import { useState } from 'react';
import Modal from '../generic/Modal';

const Header = () => {
  const [isAuthenticationModalOpened, setAuthenticationModalOpened] = useState(false);

  const handleModalStateChange = () => setAuthenticationModalOpened(!isAuthenticationModalOpened);

  return (
    <header className="header-wrapper">
      <div className="logo-wrapper">
        <FontAwesomeIcon icon={faMartiniGlassCitrus} className="logo" />
        <p className="logo-title">Cocktail App</p>
      </div>
      <Button onClick={handleModalStateChange}>Get Started</Button>
      {isAuthenticationModalOpened && <Modal title="Authentication" setModalClosed={handleModalStateChange} />}
    </header>
  );
};

export default Header;
