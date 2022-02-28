import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthenticationModal from '../Modals/Authentication/AuthenticationModal';
import Button from '@common/Button';

import { changeModalKey } from '@store/appConfigurations/action';
import { selectAuthenticationIsUserLoggedIn } from '@store/authentication/selectors';
import './style.less';

const Header = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectAuthenticationIsUserLoggedIn);
  const [isAuthenticationModalOpened, setAuthenticationModalOpened] = useState(false);

  const toggleModal = modalKey => {
    const willOpened = !isAuthenticationModalOpened;
    setAuthenticationModalOpened(willOpened);
    dispatch(changeModalKey(willOpened ? modalKey : null));
  };

  return (
    <header className="header-wrapper">
      <div className="logo-wrapper">
        <FontAwesomeIcon icon={faMartiniGlassCitrus} className="logo" />
        <p className="logo-title">Cocktail App</p>
      </div>
      {!isUserLoggedIn ? (
        <Button onClick={() => toggleModal('Authentication')}>Get Started</Button>
      ) : (
        <div className="header-icons-wrapper">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="header-icon" />
          <FontAwesomeIcon icon={faStar} className="header-icon" />
          <FontAwesomeIcon icon={faHouseUser} className="header-icon" />
        </div>
      )}

      {isAuthenticationModalOpened && <AuthenticationModal toggleModal={toggleModal} />}
    </header>
  );
};

export default Header;
