import '../style.less';

const UsernameControl = ({ ...inputProps }) => (
  <input className="input" placeholder="Username" name="name" {...inputProps} />
);

export default UsernameControl;
