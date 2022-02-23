import { useState } from 'react';

import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.less';

const PasswordInput = ({ title, name, value, placeholder, onChange }) => {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const onPasswordIconClick = () => setPasswordVisible(!isPasswordVisible);

  return (
    <>
      <p className="authentication-subtitle">{title}</p>
      <div className="password-input-wrapper">
        <input
          className="password-input"
          placeholder={placeholder}
          type={isPasswordVisible ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          required
        ></input>
        <FontAwesomeIcon icon={faEyeSlash} className="password-icon" onClick={onPasswordIconClick} />
      </div>
    </>
  );
};

export default PasswordInput;
