import { createPortal } from 'react-dom';
import styles from './modal.module.css';
import { useCallback, useEffect } from 'react';
const modalRoot = document.getElementById('modal-root');

const Modal = ({ close, children }) => {
  const closeModal = useCallback(
    e => {
      if (e.code === 'Escape') {
        close();
      }
      if (e.target === e.currentTarget) {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     document.addEventListener('keydown', this.closeModal);
//   }

//   componentWillUnmount() {
//     document.removeEventListener('keydown', this.closeModal);
//   }

//   closeModal = e => {
//     if (e.code === 'Escape') {
//       this.props.close();
//     }
//     if (e.target === e.currentTarget) {
//       this.props.close();
//     }
//   };

//   render() {
//     const { children } = this.props;
//     const { closeModal } = this;
//     return createPortal(
//       <div className={styles.overlay} onClick={closeModal}>
//         <div className={styles.modal}>{children}</div>
//       </div>,
//       modalRoot
//     );
//   }
// }
