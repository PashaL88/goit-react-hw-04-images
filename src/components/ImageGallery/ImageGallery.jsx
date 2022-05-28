import styles from './ImageGallery.module.css'

import PropTypes from "prop-types";
import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = ({ items, onClick }) => {
 return (<ul className={styles.imageGallery}>
     {
         items.map(item => (<ImageGalleryItem key={item.id} item={item} onClick={ onClick}/>))
        }
    </ul>)
}

export default ImageGallery

ImageGallery.propTypes = {
    onClick: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,

    }))
}