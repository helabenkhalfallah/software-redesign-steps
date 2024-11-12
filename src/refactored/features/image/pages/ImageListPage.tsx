import { useNavigation } from '../../../infrastructure/adapters/navigation/useNavigation.tsx';
import useFetchImageList from '../api/useFetchImageList.tsx';
import ImageListView from '../components/ImageListView.tsx';

function ImageListPage() {
    const { images, error } = useFetchImageList();
    const { navigate } = useNavigation();

    const handleImageClick = (id: string) => {
        navigate(`/image/${id}`);
    };

    if (error) return <p>{error}</p>;

    return <ImageListView images={images} onImageClick={handleImageClick} />;
}

export default ImageListPage;
