import { useState } from 'react';

import SignIn from '../SignIn';
import SignUp from '../SignUp';

const AuthenticationModal = ({ toggleModal }) => {
  const [isSignInModalOpened, setSignInModalOpened] = useState(true);

  return isSignInModalOpened ? (
    <SignIn
      title="Authentication"
      setModalClosed={() => toggleModal(null)}
      setSignInModalOpened={() => {
        setSignInModalOpened(!isSignInModalOpened);
      }}
    />
  ) : (
    <SignUp
      title="Authentication"
      setModalClosed={() => toggleModal(null)}
      setSignInModalOpened={() => {
        setSignInModalOpened(!isSignInModalOpened);
      }}
    />
  );
};

export default AuthenticationModal;
