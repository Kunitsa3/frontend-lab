import './style.less';

const AuthenticationNotification = ({ normalText, coloredText, onClick }) => (
  <p className="sign-up-notification">
    {normalText}
    <span className="sign-up-text" onClick={onClick}>
      {coloredText}
    </span>
  </p>
);

export default AuthenticationNotification;
