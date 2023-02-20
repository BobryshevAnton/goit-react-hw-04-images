import css from './imageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ elem, setLargeImgUrl }) => {
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
};
ImageGalleryItem.propTypes = {
  elem: PropTypes.object,
  setLargeImgUrl: PropTypes.func,
};
export default ImageGalleryItem;
