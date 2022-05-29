// import { Component } from 'react';
import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import { fetchPhotos } from '../shared/servises/fetchPhotos';
import ImageGallery from './ImageGallery';
import Button from 'shared/components/button/Button';
import Modal from 'shared/components/modal';
import styles from './app.module.css';
// import * as basicLightbox from 'basiclightbox'

import { Audio } from 'react-loader-spinner';

<Audio height="100" width="100" color="grey" ariaLabel="loading" />;

const App = () => {
  const [photos, setPhotos] = useState({
    items: [],
    loading: false,
    error: null,
    total: 0,
  });
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    open: false,
    body: {},
  });

  useEffect(() => {
    if (q === '') {
      return;
    }
    setPhotos(prevState => ({
      ...prevState,
      loading: true,
      error: null,
    }));
    const fetch = async () => {
      try {
        const data = await fetchPhotos(q, page);
        setPhotos(prevState => ({
          ...prevState,
          items: [...prevState.items, ...data.hits],
          loading: false,
          total: data.total,
        }));
      } catch (error) {
        setPhotos(prevState => ({
          ...prevState,
          loading: false,
          error: error.message,
        }));
      }
    };
    fetch();
  }, [q, page]);

  const setSearch = ({ q }) => {
    setQ(q);
    setPage(1);
    setPhotos({ ...photos, items: [] });
  };

  const showModal = body => {
    setModal({ open: true, body: { ...body } });
  };

  const closeModal = () => {
    setModal({ open: false, body: {} });
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const { items, loading, total } = photos;
  const { largeImageURL, tags } = modal.body;

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={setSearch} />
      {loading && <Audio color="#00BFFF" height={80} width={80} />}
      {Boolean(items.length) && (
        <ImageGallery items={items} onClick={showModal} />
      )}
      {!loading && !items.length && Boolean(q.length) && (
        <p className={styles.description}>Требуется правильный ввод!</p>
      )}
      {!loading && Boolean(items.length) && items.length < total && (
        <div className={styles.btnContainer}>
          <Button text="Load more" onClick={loadMore} />
        </div>
      )}
      {modal.open && (
        <Modal close={closeModal}>
          <img src={largeImageURL} alt={tags} width="500" />
        </Modal>
      )}
    </div>
  );
};

export default App;

// class App extends Component {
//   state = {
// items: [],
// loading: false,
// error: null,
//     q: '',
//     page: 1,
// isModalOpen: false,
// modalBody: {},
//     total: 0,
//   };

//   componentDidMount() {
//     this.fetchPhotos();
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { q, page } = this.state;
//     if (q !== prevState.q || page > prevState.page) {
//       this.fetchPhotos();
//     }
//   }

// async fetchPhotos() {
//   const { q, page } = this.state;
//   this.setState({
//     loading: true,
//     error: null,
//   });

//   try {
//     const items = await fetchPhotos(q, page);
//     this.setState(prevState => {
//       return {
//         items: [...prevState.items, ...items.hits],
//         loading: false,
//         total: items.total,
//       };
//     });
//   } catch (error) {
//     this.setState({
//       loading: false,
//       error: error.message,
//     });
//   }
// }

//   setSearch = ({ q, page }) => {
//     this.setState({
//       q,
//       page: 1,
//       items: [],
//     });
//   };

//   loadMore = () => {
//     this.setState(({ page }) => {
//       return {
//         page: page + 1,
//       };
//     });
//   };

//   showModal = modalBody => {
//     this.setState({
//       isModalOpen: true,
//       modalBody,
//     });
//   };

//   closeModal = () => {
//     this.setState({
//       isModalOpen: false,
//     });
//   };

//   render() {
//     const { items, loading, isModalOpen, modalBody, q, total } = this.state;
//     console.log(total);
//     const { setSearch, loadMore, showModal, closeModal } = this;
// return (
//   <div className={styles.App}>
//     <Searchbar onSubmit={setSearch} />
//     {loading && <Audio color="#00BFFF" height={80} width={80} />}
//     {Boolean(items.length) && (
//       <ImageGallery items={items} onClick={showModal} />
//     )}
//     {!loading && !items.length && Boolean(q.length) && (
//       <p className={styles.description}>Требуется правильный ввод!</p>
//     )}
//     {!loading && Boolean(items.length) && items.length < total && (
//       <div className={styles.btnContainer}>
//         <Button text="Load more" onClick={loadMore} />
//       </div>
//     )}
//     {isModalOpen && (
//       <Modal close={closeModal}>
//         {/* { items.map((item) => (
//         <img key={item.id} src={item.largeImageURL} alt={item.tag} width='500' />
//         ))
//         } */}
//         <img
//           src={modalBody.largeImageURL}
//           alt={modalBody.tags}
//           width="500"
//         />
//       </Modal>
//     )}
//   </div>
// );
//   }
// }
