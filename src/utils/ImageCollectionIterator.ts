interface Iterator<T> {
    next(): T | null;
    hasNext(): boolean;
}

class Image {
    constructor(
        public id: string,
        public title: string,
        public isFavorite: boolean,
    ) {}
}

class SequentialImageIterator implements Iterator<Image> {
    private position: number = 0;

    constructor(private images: Image[]) {}

    next(): Image | null {
        if (this.hasNext()) {
            return this.images[this.position++];
        }
        return null;
    }

    hasNext(): boolean {
        return this.position < this.images.length;
    }
}

class FavoriteImageIterator implements Iterator<Image> {
    private position: number = 0;
    private favoriteImages: Image[];

    constructor(images: Image[]) {
        // Filter favorite images on initialization
        this.favoriteImages = images.filter((image) => image.isFavorite);
    }

    next(): Image | null {
        if (this.hasNext()) {
            return this.favoriteImages[this.position++];
        }
        return null;
    }

    hasNext(): boolean {
        return this.position < this.favoriteImages.length;
    }
}

export class ImageCollectionIterator {
    private images: Image[] = [];

    addImage(image: Image): void {
        this.images.push(image);
    }

    // Factory method to get a sequential iterator
    getSequentialIterator(): Iterator<Image> {
        return new SequentialImageIterator(this.images);
    }

    // Factory method to get a favorite-only iterator
    getFavoriteIterator(): Iterator<Image> {
        return new FavoriteImageIterator(this.images);
    }
}

/*
// Create an image collection and add some images
const gallery = new ImageCollectionIterator();
gallery.addImage(new Image("1", "Sunset", true));
gallery.addImage(new Image("2", "Mountain", false));
gallery.addImage(new Image("3", "Forest", true));
gallery.addImage(new Image("4", "Ocean", false));

// Use the sequential iterator
const sequentialIterator = gallery.getSequentialIterator();
console.log("Sequential traversal:");
while (sequentialIterator.hasNext()) {
    const image = sequentialIterator.next();
    if (image) {
        console.log(`Image ID: ${image.id}, Title: ${image.title}`);
    }
}

// Use the favorite-only iterator
const favoriteIterator = gallery.getFavoriteIterator();
console.log("Favorite-only traversal:");
while (favoriteIterator.hasNext()) {
    const image = favoriteIterator.next();
    if (image) {
        console.log(`Favorite Image ID: ${image.id}, Title: ${image.title}`);
    }
}
*/
