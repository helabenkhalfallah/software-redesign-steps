import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useFetchImageDetails from '../api/useFetchImageDetails.tsx';
import { calculatePopularity, canAddToFavorites } from '../commons/ImageUtils.ts';
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
            const views = Number(image.views || 0);
            const likes = Number(image.likes || 0);
            const shares = Number(image.shares || 0);
            setPopularityScore(calculatePopularity(views, likes, shares, userRole));
        }
    }, [image, userRole]);

    const addToFavorites = () => {
        if (!image) return;

        const { canAdd, message } = canAddToFavorites(image, userRole, favorites);

        if (!canAdd) {
            alert(message);
            return;
        }

        const updatedFavorites = [...favorites, imageId!];
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert(message);
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
