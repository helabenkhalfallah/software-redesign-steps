import { useParams } from 'react-router-dom';

import useFetchImageDetails from '../api/useFetchImageDetails.tsx';
import ImageDetailsView from '../components/ImageDetailsView.tsx';

function ImageDetailsPage() {
    const { imageId } = useParams<{ imageId: string }>();
    const { image, error } = useFetchImageDetails(imageId || '');

    if (error) return <p>{error}</p>;

    return <ImageDetailsView image={image} />;
}

export default ImageDetailsPage;
