import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchPath, useLocation, useNavigate } from 'react-router';

import clsx from 'clsx';
import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AuthenticationModal from '../Modals/Authentication/AuthenticationModal';
import Button from '@common/Button';
import Tooltip from '@common/Tooltip';
import { paths } from '@routing';

import { changeModalKey } from '@store/appConfigurations/action';
import { selectAuthenticationIsUserLoggedIn } from '@store/authentication/selectors';
import './style.less';

const navigationIcons = [
  {
    icon: faMagnifyingGlass,
    path: paths.search,
    text: 'Search',
  },
  {
    icon: faStar,
    text: 'Favorite',
  },
  {
    icon: faHouseUser,
    text: 'Main page',
  },
];

const Header = () => {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector(selectAuthenticationIsUserLoggedIn);
  const [isAuthenticationModalOpened, setAuthenticationModalOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleModal = modalKey => {
    const willOpened = !isAuthenticationModalOpened;
    setAuthenticationModalOpened(willOpened);
    dispatch(changeModalKey(willOpened ? modalKey : null));
  };

  const isIconActive = path => !!matchPath(path, location.pathname);

  return (
    <header className="header-wrapper">
      <div className="logo-wrapper">
        <FontAwesomeIcon
          icon={faMartiniGlassCitrus}
          className={clsx('logo', isIconActive(paths.home) && 'active')}
          onClick={() => navigate(paths.home)}
        />
        <p className="logo-title">Cocktail App</p>
      </div>
      {!isUserLoggedIn ? (
        <Button onClick={() => toggleModal('Authentication')}>Get Started</Button>
      ) : (
        <div className="header-icons-wrapper">
          {navigationIcons.map(({ icon, path, text }, index) => (
            <Tooltip text={text} key={index}>
              <FontAwesomeIcon
                icon={icon}
                className={clsx('header-icon', path && isIconActive(path) && 'active')}
                onClick={path && (() => navigate(path))}
              />
            </Tooltip>
          ))}
        </div>
      )}

      {isAuthenticationModalOpened && <AuthenticationModal toggleModal={toggleModal} />}
    </header>
  );
};

export default Header;
