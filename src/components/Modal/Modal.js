import css from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ handlerCloseModal, largeImageURL, alt }) => {
  useEffect(() => {
    const closeModal = event => {
      if (event.key === 'Escape') {
        handlerCloseModal();
      }
    };

    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [handlerCloseModal]);

  const handlerClickBackdrop = e => {
    if (e.currentTarget === e.target) {
      handlerCloseModal();
    }
  };

  return (
    <div className={css.modal__backdrop} onClick={handlerClickBackdrop}>
      <div className={css.modal__content}>
        <img
          src={largeImageURL}
          alt={alt}
          className={css.imageGalleryItem__image}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
};
export default Modal;
