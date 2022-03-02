import clsx from 'clsx';

import './style.less';

const Button = ({ children, className, onClick, type }) => (
  <button type={type || 'button'} onClick={onClick} className={clsx('button', className)}>
    {children}
  </button>
);

export default Button;
