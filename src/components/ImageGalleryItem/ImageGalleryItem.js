import css from './imageGalleryItem.module.css';
import { Component } from 'react';
import PropTypes from 'prop-types';

export default class ImageGalleryItem extends Component {
  render() {
    const { elem, setLargeImgUrl } = this.props;

    return (
      <li
        className={css.imageGalleryItem}
        onClick={() => setLargeImgUrl(elem.largeImageURL)}
      >
        <img
          src={elem.webformatURL}
          alt={elem.user}
          className={css.imageGalleryItem__image}
        />
      </li>
    );
  }
}
ImageGalleryItem.propTypes = {
  elem: PropTypes.object,
  setLargeImgUrl: PropTypes.func,
};
