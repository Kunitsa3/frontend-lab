import UsernameControl from './UsernameControl';
import PasswordControl from './PasswordControl';

import './style.less';

const Input = ({ type, label, errorsMessage, ...inputProps }) => {
  return (
    <div className="input-wrapper">
      <p className="label">{label}</p>
      {type === 'password' ? <PasswordControl {...inputProps} /> : <UsernameControl {...inputProps} />}
      <div>{errorsMessage && <p className="error-message">{errorsMessage}</p>}</div>
    </div>
  );
};

export default Input;
