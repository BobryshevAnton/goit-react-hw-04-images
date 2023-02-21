import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';

import { getImages } from './Fetch/Fetch';

const App = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [collection, setCollection] = useState([]);
  const [isButton, setIsButton] = useState(false);
  const [isLoadingSpin, setIsLoadingSpin] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [alt, setAlt] = useState('');
  //
  const [isEmptyText, setIsEmptyText] = useState(false);
  const [isEmptyCollection, setIsEmptyCollection] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleForm = searchForm => {
    setPage(1);
    setSearchQuery(searchForm);
    setCollection([]);
    setIsEmptyText(false);
    setAlt(searchForm);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const setLargeImgUrl = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setIsOpenModal(true);
  };

  const handlerCloseModal = () => {
    setIsOpenModal(!true);
  };
  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    async function images() {
      try {
        setIsLoadingSpin(true);
        setIsEmptyText(true);
        const { hits, totalHits } = await getImages(searchQuery, page);
        setIsButton(page < Math.ceil(totalHits / 12));
        setCollection(collection => [...collection, ...hits]);
        setIsEmptyCollection(hits.length === 0);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoadingSpin(false);
      }
    }
    images();
  }, [page, searchQuery]);

  return (
    <div>
      <Searchbar onForm={handleForm} />
      {!isEmptyText && (
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 22 }}>
          Please, enter any text...!
        </div>
      )}
      {isLoadingSpin && <Loader />}
      {isEmptyCollection && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 10,
            color: 'red',
            fontSize: 22,
          }}
        >
          Sorry, this pictures,name'{searchQuery}' not found!...
        </div>
      )}

      <ImageGallery collection={collection} setLargeImgUrl={setLargeImgUrl} />
      {isOpenModal && (
        <Modal
          largeImageURL={largeImageURL}
          handlerCloseModal={handlerCloseModal}
          alt={alt}
        />
      )}
      {isButton && <Button loadMore={loadMore} />}
    </div>
  );
};
export default App;
