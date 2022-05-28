import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);

  const handleChange = ({ target }) => {
    setQ(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ q, page });
    reset();
  };

  const reset = () => {
    setQ('');
    setPage();
  };

  return (
    <header className={styles.searchbar}>
      <form className="styles.searchForm" action="" onSubmit={handleSubmit}>
        {/* <button type="submit" className={styles.button}>
                        <span className={styles.label}>Search</span>
                </button> */}
        <input
          className={styles.input}
          value={q}
          onChange={handleChange}
          name="q"
          type="text"
          placeholder="Введите строку поиска"
          required
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

// class Searchbar extends Component {
//   state = {
//     q: '',
//     page: 1,
//   };

//   handleChange = ({ target }) => {
//     const { name, value } = target;
//     this.setState({
//       [name]: value,
//     });
//   };

// //   handleSubmit = e => {
// //     e.preventDefault();
// //     this.props.onSubmit({ ...this.state });
// //     this.reset();
// //   };

// //   reset() {
// //     this.setState({
// //       q: '',
// //     });
// //   }

// //   render() {
// //     const { handleChange, handleSubmit } = this;
// //     const { q } = this.state;
// //     return (
// //       <header className={styles.searchbar}>
// //         <form className="styles.searchForm" action="" onSubmit={handleSubmit}>
// //           {/* <button type="submit" className={styles.button}>
// //                         <span className={styles.label}>Search</span>
// //                 </button> */}
// //           <input
// //             className={styles.input}
// //             value={q}
// //             onChange={handleChange}
// //             name="q"
// //             type="text"
// //             placeholder="Введите строку поиска"
// //             required
// //           />
// //         </form>
// //       </header>
// //     );
// //   }
// // }
