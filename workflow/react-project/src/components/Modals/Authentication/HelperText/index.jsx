import './style.less';

const HelperText = ({ normalText, coloredText, onClick }) => (
  <p className="primary-text">
    {normalText}
    <span className="colored-text" onClick={onClick}>
      {coloredText}
    </span>
  </p>
);

export default HelperText;
