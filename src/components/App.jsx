import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
//
import { getImages } from './Fetch/Fetch';

class App extends Component {
  state = {
    page: 1,
    searchQuery: '',
    collection: [],
    isButton: false,
    isLoadingSpin: false,
    largeImageURL: '',
    alt: '',
    //
    isEmptyText: false,
    isEmptyCollection: '',
    isOpenModal: false,
  };

  handleForm = searchForm => {
    this.setState({
      page: 1,
      searchQuery: searchForm,
      collection: [],
      isEmptyText: false,
      alt: searchForm,
    });
  };
  //for Button
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  // for search img
  setLargeImgUrl = largeImageURL => {
    this.setState({
      largeImageURL: largeImageURL,
      isOpenModal: true,
    });
  };
  // for modal
  handlerCloseModal = () => {
    this.setState({
      isOpenModal: !true,
    });
  };

  async componentDidUpdate(_, prevState) {
    const { page, searchQuery, collection } = this.state;

    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      try {
        this.setState({ isLoadingSpin: true, isEmptyText: true });
        const { hits, totalHits } = await getImages(searchQuery, page);

        this.setState({
          isButton: page < Math.ceil(totalHits / 12),
          collection: [...collection, ...hits],
          isEmptyCollection: hits.length === 0,
        });
      } catch (error) {
        console.log(error.message);
      } finally {
        this.setState({ isLoadingSpin: false });
      }
    }
  }

  render() {
    const {
      collection,
      isButton,
      isLoadingSpin,
      searchQuery,
      largeImageURL,
      isEmptyText,
      isEmptyCollection,
      isOpenModal,
      alt,
    } = this.state;

    return (
      <div>
        <Searchbar onForm={this.handleForm} />
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

        <ImageGallery
          collection={collection}
          setLargeImgUrl={this.setLargeImgUrl}
        />
        {isOpenModal && (
          <Modal
            largeImageURL={largeImageURL}
            handlerCloseModal={this.handlerCloseModal}
            alt={alt}
          />
        )}
        {isButton && <Button loadMore={this.loadMore} />}
      </div>
    );
  }
}
export default App;
