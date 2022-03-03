import './style.less';

const RadioButton = ({ label, value, checked, name, onChange }) => (
  <p className="radio-input-text">
    <input
      type="radio"
      className="input-radio"
      name={name}
      value={value}
      id={value}
      onChange={onChange}
      checked={checked}
    />
    <label htmlFor={value}> {label}</label>
  </p>
);

export default RadioButton;
