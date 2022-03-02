import { useState } from 'react';
import { useSelector } from 'react-redux';

import Modal from '@common/Modal';
import Spinner from '@common/Spinner';
import SignIn from './SignIn';
import SignUp from './SignUp';

import { selectAuthenticationLoading } from '@store/authentication/selectors';

const AuthenticationModal = ({ toggleModal }) => {
  const [isSignInModalOpened, setSignInModalOpened] = useState(true);
  const authenticationLoadingStatus = useSelector(selectAuthenticationLoading);

  return (
    <Modal title="Authentication" setModalClosed={() => toggleModal(null)}>
      {authenticationLoadingStatus ? (
        <Spinner loading={authenticationLoadingStatus} />
      ) : isSignInModalOpened ? (
        <SignIn
          setSignInModalOpened={() => {
            setSignInModalOpened(!isSignInModalOpened);
          }}
          setModalClosed={() => toggleModal(null)}
        />
      ) : (
        <SignUp
          setSignInModalOpened={() => {
            setSignInModalOpened(!isSignInModalOpened);
          }}
          setModalClosed={() => toggleModal(null)}
        />
      )}
    </Modal>
  );
};

export default AuthenticationModal;
