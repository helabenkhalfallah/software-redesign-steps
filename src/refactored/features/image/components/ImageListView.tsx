interface ImageListViewProps {
    images: Record<string, string>[];
    onImageClick: (id: string) => void;
}

const ImageListView = ({ images, onImageClick }: ImageListViewProps) => (
    <div className="image-list-container">
        <h1>Image List</h1>
        <ul className="image-list">
            {images.length === 0 ? (
                <p>No images available</p>
            ) : (
                images.map((image) => (
                    <li
                        key={image.id || Math.random().toString()}
                        onClick={() => onImageClick(image.id || '')}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={image.thumbnailUrl}
                            alt={`${image.title} thumbnail`}
                            width="100"
                        />
                        <p>{image.title}</p>
                    </li>
                ))
            )}
        </ul>
    </div>
);

export default ImageListView;
