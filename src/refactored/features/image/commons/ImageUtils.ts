// Calculates popularity score based on views, likes, shares, and user role
export function calculatePopularity(
    views: number,
    likes: number,
    shares: number,
    userRole: string,
): number {
    let score = 0;
    if (views > 1000) score += views * 0.1;
    if (likes > 100) score += likes * 0.5;
    if (shares > 50) score += shares * 1.5;
    if (userRole === 'premium') score *= 1.2;
    return score;
}

// Determines if the image can be added to favorites based on user role and image properties
export function canAddToFavorites(
    image: Record<string, string>,
    userRole: string,
    favorites: string[],
): { canAdd: boolean; message: string } {
    const currentDate = new Date();
    const imageDate = new Date(image.createdAt);
    const imageAgeInDays = Math.floor(
        (currentDate.getTime() - imageDate.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (favorites.includes(image.id)) {
        return { canAdd: false, message: 'This image is already in your favorites!' };
    }

    if (userRole !== 'admin' && imageAgeInDays > 365) {
        return {
            canAdd: false,
            message: 'Only admin users can favorite images older than 1 year.',
        };
    }

    if (image.type === 'restricted' && userRole !== 'premium') {
        return {
            canAdd: false,
            message: 'Restricted images can only be favorited by premium users.',
        };
    }

    return { canAdd: true, message: 'Added to favorites!' };
}
