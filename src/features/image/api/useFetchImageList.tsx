import { useEffect, useState } from 'react';

import HttpRequestManager from '../../../infrastructure/adapters/api/HttpRequestManager.ts';

const useFetchImageList = () => {
    const [images, setImages] = useState<Record<string, string>[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchImageList = async () => {
            try {
                const data = await HttpRequestManager.getInstance().request<
                    Record<string, string>[]
                >('/images', 'GET');
                setImages(data);
            } catch (err) {
                setError('Failed to fetch image list');
                console.error(err);
            }
        };

        fetchImageList();
    }, []);

    return { images, error };
};

export default useFetchImageList;
