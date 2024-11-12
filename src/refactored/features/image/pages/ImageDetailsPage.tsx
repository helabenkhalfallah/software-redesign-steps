import { useEffect, useState } from 'react';

import { useRole } from '../../../commons/providers/RoleContext.tsx';
import { useNavigation } from '../../../infrastructure/adapters/navigation/useNavigation.tsx';
import useFetchImageDetails from '../api/useFetchImageDetails.tsx';
import { calculatePopularity, canAddToFavorites } from '../commons/ImageUtils.ts';
import ImageDetailsView from '../components/ImageDetailsView.tsx';

function ImageDetailsPage() {
    const { getParam } = useNavigation();
    const imageId = getParam('imageId');

    const [favorites, setFavorites] = useState<string[]>(
        JSON.parse(localStorage.getItem('favorites') || '[]'),
    );
    const [popularityScore, setPopularityScore] = useState<number>(0);

    const { userRole } = useRole(); // Access userRole from RoleContext
    const { image, error } = useFetchImageDetails(imageId || '');

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
