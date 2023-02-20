import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
//
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
  //for Button
  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };
  // for search img
  const setLargeImgUrl = largeImageURL => {
    setLargeImageURL(largeImageURL);
    setIsOpenModal(true);
  };
  // };
  // for modal
  const handlerCloseModal = () => {
    setIsOpenModal(!true);
  };

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setIsLoadingSpin(true);
    setIsEmptyText(true);
    getImages(searchQuery, page)
      .then(({ hits, totalHits }) => {
        setIsButton(page < Math.ceil(totalHits / 12));

        setCollection([...collection, ...hits]);
        setIsEmptyCollection(hits.length === 0);
      })
      .catch(error => {
        console.log(error.message);
      })
      .finally(() => {
        setIsLoadingSpin(false);
      });
  }, [searchQuery, page]);

  // async  componentDidUpdate(_, prevState) {
  //   const { page, searchQuery, collection } = this.state;

  //   if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
  //     try {
  //       this.setState({ isLoadingSpin: true, isEmptyText: true });
  //       const { hits, totalHits } = await getImages(searchQuery, page);

  //       this.setState({
  //         isButton: page < Math.ceil(totalHits / 12),
  //         collection: [...collection, ...hits],
  //         isEmptyCollection: hits.length === 0,
  //       });
  //     } catch (error) {
  //       console.log(error.message);
  //     } finally {
  //       this.setState({ isLoadingSpin: false });
  //     }
  //   }

  // render() {
  //   const {
  //     collection,
  //     isButton,
  //     isLoadingSpin,
  //     searchQuery,
  //     largeImageURL,
  //     isEmptyText,
  //     isEmptyCollection,
  //     isOpenModal,
  //     alt,
  //   } = this.state;

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

// class App extends Component {
//   state = {
//     page: 1,
//     searchQuery: '',
//     collection: [],
//     isButton: false,
//     isLoadingSpin: false,
//     largeImageURL: '',
//     alt: '',
//     //
//     isEmptyText: false,
//     isEmptyCollection: '',
//     isOpenModal: false,
//   };

//   handleForm = searchForm => {
//     this.setState({
//       page: 1,
//       searchQuery: searchForm,
//       collection: [],
//       isEmptyText: false,
//       alt: searchForm,
//     });
//   };
//   //for Button
//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };
//   // for search img
//   setLargeImgUrl = largeImageURL => {
//     this.setState({
//       largeImageURL: largeImageURL,
//       isOpenModal: true,
//     });
//   };
//   // for modal
//   handlerCloseModal = () => {
//     this.setState({
//       isOpenModal: !true,
//     });
//   };

//   async componentDidUpdate(_, prevState) {
//     const { page, searchQuery, collection } = this.state;

//     if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
//       try {
//         this.setState({ isLoadingSpin: true, isEmptyText: true });
//         const { hits, totalHits } = await getImages(searchQuery, page);

//         this.setState({
//           isButton: page < Math.ceil(totalHits / 12),
//           collection: [...collection, ...hits],
//           isEmptyCollection: hits.length === 0,
//         });
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         this.setState({ isLoadingSpin: false });
//       }
//     }
//   }

//   render() {
//     const {
//       collection,
//       isButton,
//       isLoadingSpin,
//       searchQuery,
//       largeImageURL,
//       isEmptyText,
//       isEmptyCollection,
//       isOpenModal,
//       alt,
//     } = this.state;

//     return (
//       <div>
//         <Searchbar onForm={this.handleForm} />
//         {!isEmptyText && (
//           <div style={{ textAlign: 'center', marginTop: 10, fontSize: 22 }}>
//             Please, enter any text...!
//           </div>
//         )}

//         {isLoadingSpin && <Loader />}
//         {isEmptyCollection && (
//           <div
//             style={{
//               textAlign: 'center',
//               marginTop: 10,
//               color: 'red',
//               fontSize: 22,
//             }}
//           >
//             Sorry, this pictures,name'{searchQuery}' not found!...
//           </div>
//         )}

//         <ImageGallery
//           collection={collection}
//           setLargeImgUrl={this.setLargeImgUrl}
//         />
//         {isOpenModal && (
//           <Modal
//             largeImageURL={largeImageURL}
//             handlerCloseModal={this.handlerCloseModal}
//             alt={alt}
//           />
//         )}
//         {isButton && <Button loadMore={this.loadMore} />}
//       </div>
//     );
//   }
// }
// export default App;
