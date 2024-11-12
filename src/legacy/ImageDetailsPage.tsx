// ImageDetailsPage.tsx
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ImageDetailsPage() {
    const { imageId } = useParams<{ imageId: string }>();
    const [image, setImage] = useState<Record<string, string>>({});
    const [favorites, setFavorites] = useState<string[]>(
        localStorage.getItem('favorites')
            ? JSON.parse(localStorage.getItem('favorites') || '[]')
            : [],
    );

    const API_URL = 'https://api.example.com';
    const [userRole, setUserRole] = useState<string>('guest'); // Hardcoded default role
    const [popularityScore, setPopularityScore] = useState<number>(0);

    useEffect(() => {
        const fetchUserRole = async () => {
            const roleFromAPI = await new Promise<string>((resolve) => {
                setTimeout(() => resolve('premium'), 1000);
            });
            setUserRole(roleFromAPI);
        };

        fetchUserRole();

        // Hardcoded API call directly in the component
        fetch(`${API_URL}/images/${imageId}`)
            .then((response) => {
                if (!response.ok) {
                    console.error('Failed to fetch image details'); // Hardcoded error
                }
                return response.json();
            })
            .then((data) => {
                if (!data.title) data.title = 'Untitled Image';
                if (!data.description) data.description = 'No description available.';
                if (!data.createdAt) data.createdAt = new Date().toISOString();
                calculatePopularity(data.views, data.likes, data.shares);
                setImage(data);
            })
            .catch((error) => console.error('Fetch error:', error));
    }, [imageId]);

    const addToFavorites = (imageId: string) => {
        const currentDate = new Date();
        const imageDate = new Date(image.createdAt);
        const imageAgeInDays = Math.floor(
            (currentDate.getTime() - imageDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (userRole !== 'admin' && imageAgeInDays > 365) {
            alert('Only admin users can favorite images older than 1 year.');
            return;
        }

        if (image.type === 'restricted' && userRole !== 'premium') {
            alert('Restricted images can only be favorited by premium users.');
            return;
        }

        if (favorites.includes(imageId)) {
            alert('This image is already in your favorites!');
            return;
        }

        const updatedFavorites = [...favorites, imageId];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Added to favorites!');
    };

    const calculatePopularity = (views: number, likes: number, shares: number) => {
        let score = 0;
        if (views > 1000) score += views * 0.1;
        if (likes > 100) score += likes * 0.5;
        if (shares > 50) score += shares * 1.5;
        if (userRole === 'premium') score *= 1.2;
        setPopularityScore(score);
    };

    return (
        <div>
            <h1>Image Details for ID {imageId}</h1>
            {image ? (
                <>
                    <h2 className="image-title">{image.title}</h2>
                    <p>{image.description}</p>
                    <small>Added on: {new Date(image.createdAt).toLocaleString()}</small>
                    <p>Popularity Score: {popularityScore.toFixed(2)}</p>
                    {userRole !== 'guest' ? (
                        <button onClick={() => addToFavorites(imageId || '')}>
                            Add to Favorites
                        </button>
                    ) : (
                        <p>Login to add this image to your favorites.</p>
                    )}
                    <Link to="/">Back to Home</Link> {/* React Router-specific link */}
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default ImageDetailsPage;
