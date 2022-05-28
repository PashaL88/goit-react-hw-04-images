import styles from './ImageGalleryItem.module.css'
import PropTypes from "prop-types";

function ImageGalleryItem({ item, onClick }) {
    const { id, webformatURL, tags, largeImageURL } = item;
    return (<li key={id} onClick={()=> onClick({largeImageURL, tags})} className={styles.imageGalleryItem}>
            <img className={styles.image} src={webformatURL} alt={tags} height='200px' />
 </li>)
}

export default ImageGalleryItem

ImageGalleryItem.propTypes = {
    onClick: PropTypes.func,
    item: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
            largeImageURL: PropTypes.string.isRequired,
                tags: PropTypes.string.isRequired
})

}