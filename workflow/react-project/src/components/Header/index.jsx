import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { changeModalKey } from '@store';

import Button from '../common/Button';
import Modal from '../common/Modal';
import Authentication from '../common/Modal/ModalContent/Authentication';

import './style.less';

const Header = () => {
  const dispatch = useDispatch();
  const [isAuthenticationModalOpened, setAuthenticationModalOpened] = useState(false);

  const handleModalStateChange = modalKey => {
    setAuthenticationModalOpened(!isAuthenticationModalOpened);
    dispatch(changeModalKey(modalKey));
  };

  return (
    <header className="header-wrapper">
      <div className="logo-wrapper">
        <FontAwesomeIcon icon={faMartiniGlassCitrus} className="logo" />
        <p className="logo-title">Cocktail App</p>
      </div>
      <Button onClick={() => handleModalStateChange('Authentication')}>Get Started</Button>
      {isAuthenticationModalOpened && (
        <Modal title="Authentication" setModalClosed={() => handleModalStateChange(null)}>
          <Authentication />
        </Modal>
      )}
    </header>
  );
};

export default Header;
