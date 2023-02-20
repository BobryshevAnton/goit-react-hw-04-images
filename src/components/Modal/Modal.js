import css from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ handlerCloseModal, largeImageURL, alt }) => {
  const closeModal = event => {
    if (event.key === 'Escape') {
      handlerCloseModal();
    }
  };
  const handlerClickBackdrop = event => {
    handlerCloseModal();
  };

  useEffect(() => {
    window.addEventListener('keydown', closeModal);
  });

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
