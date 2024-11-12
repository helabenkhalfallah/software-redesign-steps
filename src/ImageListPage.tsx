// ImageListPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import useNavigate for programmatic navigation

function ImageListPage() {
    const [images, setImages] = useState<Record<string, string>[]>([]);
    const [cache, setCache] = useState<{ [key: string]: Record<string, string>[] }>({ images: [] });
    const navigate = useNavigate(); // Initialize navigate for client-side routing

    useEffect(() => {
        if (cache['images'] && cache['images'].length > 0) {
            setImages(cache['images']);
        } else {
            fetch('/api/images')
                .then((response) => {
                    if (!response.ok) {
                        console.error('Failed to fetch image list');
                    }
                    return response.json();
                })
                .then((data) => {
                    const transformedData = data.map((image: Record<string, string>) => {
                        if (!image.title) {
                            console.warn('Image title missing, setting default title');
                            image.title = 'Untitled';
                        }
                        if (!image.thumbnailUrl) {
                            image.thumbnailUrl = '/images/default-thumbnail.jpg';
                        }
                        return image;
                    });
                    setImages(transformedData);
                    setCache({ ...cache, images: transformedData });
                })
                .catch((error) => console.error('Fetch error:', error));
        }
    }, [cache]);

    // Handle click with programmatic navigation
    const handleImageClick = (id: string) => {
        navigate(`/image/${id}`); // Client-side navigation to image details
    };

    return (
        <div className="image-list-container">
            <h1>Image List</h1>
            <ul className="image-list">
                {images.length === 0 ? (
                    <p>No images available</p>
                ) : (
                    images.map((image) => (
                        <li
                            key={image.id || Math.random()}
                            onClick={() => handleImageClick(image.id || '')} // Programmatic navigation on click
                            style={{ cursor: 'pointer' }} // Indicate clickable items
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
}

export default ImageListPage;
