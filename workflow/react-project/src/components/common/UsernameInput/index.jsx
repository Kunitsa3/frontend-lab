import './style.less';

const UsernameInput = ({ errorsMessage, ...inputProps }) => (
  <div className="username-input-wrapper">
    <p className="authentication-subtitle">Username</p>
    <input className="username-input" placeholder="Username" name="name" {...inputProps}></input>
    <div>{errorsMessage && <p className="error-message">{errorsMessage}</p>}</div>
  </div>
);

export default UsernameInput;
