import { useEffect, useState } from 'react';

import HttpRequestManager from '../../../infrastructure/adapters/api/HttpRequestManager.ts';

const useFetchImageDetails = (imageId: string) => {
    const [image, setImage] = useState<Record<string, string> | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageDetails = async () => {
            try {
                const data = await HttpRequestManager.getInstance().request<Record<string, string>>(
                    `/images/${imageId}`,
                    'GET',
                );
                setImage(data);
            } catch (err) {
                setError('Failed to fetch image details');
                console.error(err);
            }
        };

        fetchImageDetails();
    }, [imageId]);

    return { image, error };
};

export default useFetchImageDetails;
