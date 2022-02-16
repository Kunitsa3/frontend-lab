import './style.less';

const Button = ({ children, style, onClick }) => (
  <button type="button" style={style} onClick={onClick} className="button">
    {children}
  </button>
);

export default Button;
