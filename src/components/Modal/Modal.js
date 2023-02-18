import { Component } from 'react';
import css from './modal.module.css';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  closeModal = event => {
    if (event.key === 'Escape') {
      this.props.handlerCloseModal();
    }
  };
  handlerClickBackdrop = event => {
    this.props.handlerCloseModal();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }
  render() {
    const { largeImageURL, alt } = this.props;

    return (
      <div className={css.modal__backdrop} onClick={this.handlerClickBackdrop}>
        <div className={css.modal__content}>
          <img
            src={largeImageURL}
            alt={alt}
            className={css.imageGalleryItem__image}
          />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
};
