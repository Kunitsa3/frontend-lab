import { useState } from 'react';

import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../common/Button';
import Modal from '../common/Modal';

import './style.less';

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
