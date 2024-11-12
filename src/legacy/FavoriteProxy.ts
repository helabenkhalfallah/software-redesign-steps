interface FavoriteHandler {
    addToFavorites(imageId: string): void;
}

class FavoriteStorage {
    private storageKey = 'favorites';

    getFavorites(): string[] {
        const favorites = localStorage.getItem(this.storageKey);
        return favorites ? JSON.parse(favorites) : [];
    }

    addFavorite(imageId: string): void {
        const favorites = this.getFavorites();
        const updatedFavorites = [...favorites, imageId];
        localStorage.setItem(this.storageKey, JSON.stringify(updatedFavorites));
    }

    isFavorite(imageId: string): boolean {
        const favorites = this.getFavorites();
        return favorites.includes(imageId);
    }
}

class RealFavoriteHandler implements FavoriteHandler {
    constructor(private storage: FavoriteStorage) {}

    addToFavorites(imageId: string): void {
        // Add the image to favorites via FavoriteStorage
        this.storage.addFavorite(imageId);

        // Alert the user and log the addition
        alert('Added to favorites!');
        console.log('Updated favorites:', this.storage.getFavorites());
    }
}

export class FavoriteProxy implements FavoriteHandler {
    private realHandler: RealFavoriteHandler;

    constructor(
        private userRole: string,
        private image: { createdAt: string; type: string },
        private storage: FavoriteStorage,
    ) {
        this.realHandler = new RealFavoriteHandler(storage);
    }

    addToFavorites(imageId: string): void {
        const currentDate = new Date();
        const imageDate = new Date(this.image.createdAt);
        const imageAgeInDays = Math.floor(
            (currentDate.getTime() - imageDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        // Access control: only admins can favorite images older than a year
        if (this.userRole !== 'admin' && imageAgeInDays > 365) {
            alert('Only admin users can favorite images older than 1 year.');
            return;
        }

        // Restriction based on image type and user role
        if (this.image.type === 'restricted' && this.userRole !== 'premium') {
            alert('Restricted images can only be favorited by premium users.');
            return;
        }

        // Check for duplicates using FavoriteStorage
        if (this.storage.isFavorite(imageId)) {
            alert('This image is already in your favorites!');
            return;
        }

        // Delegate to the real handler to add to favorites if all checks pass
        this.realHandler.addToFavorites(imageId);
    }
}

/*
// Set up user permissions and image metadata
const userPermissions = { isPremium: false };
const image = { createdAt: "2022-01-01", type: "restricted" };

// Initialize the FavoriteStorage instance
const favoriteStorage = new FavoriteStorage();

// Initialize the proxy with necessary dependencies
const favoriteProxy = new FavoriteProxy(
    userPermissions.isPremium ? "premium" : "guest",
    image,
    favoriteStorage
);

// Attempt to add an image to favorites
favoriteProxy.addToFavorites("789");
 */
