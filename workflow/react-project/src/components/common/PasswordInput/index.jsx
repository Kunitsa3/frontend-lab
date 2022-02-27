import { useState } from 'react';

import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.less';

const PasswordInput = ({ title, errorsMessage, ...inputProps }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const onPasswordIconClick = () => setPasswordVisible(!isPasswordVisible);

  return (
    <div className="authentication-password-input-wrapper">
      <p className="authentication-subtitle">{title}</p>
      <div className="password-input-wrapper">
        <input className="password-input" type={isPasswordVisible ? 'text' : 'password'} {...inputProps}></input>
        <FontAwesomeIcon icon={faEyeSlash} className="password-icon" onClick={onPasswordIconClick} />
      </div>
      {errorsMessage && <p className="error-message">{errorsMessage}</p>}
    </div>
  );
};

export default PasswordInput;
