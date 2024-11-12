import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useFetchImageDetails from '../api/useFetchImageDetails.tsx';
import ImageDetailsView from '../components/ImageDetailsView.tsx';

function ImageDetailsPage() {
    const { imageId } = useParams<{ imageId: string }>();
    const [favorites, setFavorites] = useState<string[]>(
        JSON.parse(localStorage.getItem('favorites') || '[]'),
    );
    const [userRole, setUserRole] = useState<string>('guest');
    const [popularityScore, setPopularityScore] = useState<number>(0);

    const { image, error } = useFetchImageDetails(imageId || '');

    useEffect(() => {
        const fetchUserRole = async () => {
            const roleFromAPI = await new Promise<string>((resolve) => {
                setTimeout(() => resolve('premium'), 1000);
            });
            setUserRole(roleFromAPI);
        };
        fetchUserRole();
    }, []);

    useEffect(() => {
        if (image) {
            // Convert views, likes, and shares to numbers if they are strings
            const views = Number(image.views);
            const likes = Number(image.likes);
            const shares = Number(image.shares);

            calculatePopularity(views, likes, shares);
        }
    }, [image]);

    const addToFavorites = () => {
        if (!image || favorites.includes(imageId!)) {
            alert('This image is already in your favorites!');
            return;
        }

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

        const updatedFavorites = [...favorites, imageId!];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Added to favorites!');
    };

    const calculatePopularity = (views: number, likes: number, shares: number) => {
        let score = views * 0.1 + likes * 0.5 + shares * 1.5;
        if (userRole === 'premium') score *= 1.2;
        setPopularityScore(score);
    };

    if (error) return <p>{error}</p>;

    return (
        <ImageDetailsView
            image={image}
            popularityScore={popularityScore}
            userRole={userRole}
            addToFavorites={addToFavorites}
        />
    );
}

export default ImageDetailsPage;
