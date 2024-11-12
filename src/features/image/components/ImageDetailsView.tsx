import { Link } from 'react-router-dom';

interface ImageDetailsViewProps {
    image: Record<string, string> | null;
}

const ImageDetailsView = ({ image }: ImageDetailsViewProps) => {
    if (!image) return <p>Loading...</p>;

    return (
        <div>
            <h1>Image Details for ID {image.id}</h1>
            <h2 className="image-title">{image.title}</h2>
            <p>{image.description}</p>
            <small>Added on: {new Date(image.createdAt).toLocaleString()}</small>
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default ImageDetailsView;
