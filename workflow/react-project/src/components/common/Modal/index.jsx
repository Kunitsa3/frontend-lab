import ReactDOM from 'react-dom';

import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './style.less';

const Modal = ({ children, title, setModalClosed }) =>
  ReactDOM.createPortal(
    <div className="dark-background">
      <div className="height-100" onClick={setModalClosed} />
      <div className="modal-wrapper">
        <div className="modal-header">
          <p className="modal-title">{title}</p>
          <FontAwesomeIcon icon={faXmark} className="modal-close-icon" onClick={setModalClosed} />
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  );

export default Modal;
