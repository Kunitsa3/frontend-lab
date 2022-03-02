import './style.less';

const HelperText = ({ text, linkText, onClick }) => (
  <p className="primary-text">
    {text}
    <span className="link-text" onClick={onClick}>
      {linkText}
    </span>
  </p>
);

export default HelperText;
