import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';

const ImageGallery = ({ collection, setLargeImgUrl }) => {
  return (
    <ul className={css.imageGallery}>
      {collection.map(elem => (
        <ImageGalleryItem
          elem={elem}
          key={elem.id}
          setLargeImgUrl={setLargeImgUrl}
        />
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  collection: PropTypes.array.isRequired,
  setLargeImgUrl: PropTypes.func,
};
export default ImageGallery;
