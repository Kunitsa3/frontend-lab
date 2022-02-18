import clsx from 'clsx';

import './style.less';

const Button = ({ children, className, onClick }) => (
  <button type="button" onClick={onClick} className={clsx('button', className)}>
    {children}
  </button>
);

export default Button;
