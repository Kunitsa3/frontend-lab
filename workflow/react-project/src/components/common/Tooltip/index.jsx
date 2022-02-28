import './style.less';

const Tooltip = ({ children, text }) => {
  return (
    <div className="tooltip-wrapper">
      <div className="tooltip-text-wrapper">{text}</div>
      {children}
    </div>
  );
};

export default Tooltip;
