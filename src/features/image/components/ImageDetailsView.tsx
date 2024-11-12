import { Link } from 'react-router-dom';

interface ImageDetailsViewProps {
    image: Record<string, string> | null;
    popularityScore: number;
    userRole: string;
    addToFavorites: () => void;
}

const ImageDetailsView = ({
    image,
    popularityScore,
    userRole,
    addToFavorites,
}: ImageDetailsViewProps) => {
    if (!image) return <p>Loading...</p>;

    return (
        <div>
            <h1>Image Details for ID {image.id}</h1>
            <h2 className="image-title">{image.title}</h2>
            <p>{image.description}</p>
            <small>Added on: {new Date(image.createdAt).toLocaleString()}</small>
            <p>Popularity Score: {popularityScore.toFixed(2)}</p>
            {userRole !== 'guest' ? (
                <button onClick={addToFavorites}>Add to Favorites</button>
            ) : (
                <p>Login to add this image to your favorites.</p>
            )}
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default ImageDetailsView;
