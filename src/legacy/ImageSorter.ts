interface ImageSortingStrategy {
    sort(images: Image[]): Image[];
}

// Define an Image class (for demonstration purposes)
export class Image {
    constructor(
        public name: string,
        public date: string,
        public size: number,
    ) {}
}

interface ImageSortingStrategy {
    sort(images: Image[]): Image[];
}

class SortByName implements ImageSortingStrategy {
    sort(images: Image[]): Image[] {
        console.log('Sorting images by name.');
        return images.sort((a, b) => a.name.localeCompare(b.name));
    }
}

class SortByDate implements ImageSortingStrategy {
    sort(images: Image[]): Image[] {
        console.log('Sorting images by date.');
        return images.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
}

class SortBySize implements ImageSortingStrategy {
    sort(images: Image[]): Image[] {
        console.log('Sorting images by size.');
        return images.sort((a, b) => a.size - b.size);
    }
}

export class ImageSorter {
    private sortingStrategy: ImageSortingStrategy;

    // Constructor that accepts a string and selects the appropriate sorting strategy
    constructor(sortMethod: string) {
        this.sortingStrategy = this.selectSortingStrategy(sortMethod);
    }

    // Method to change the sorting strategy at runtime
    setStrategy(sortMethod: string): void {
        this.sortingStrategy = this.selectSortingStrategy(sortMethod);
    }

    // Select the strategy based on the provided string
    private selectSortingStrategy(sortMethod: string): ImageSortingStrategy {
        switch (sortMethod.toLowerCase()) {
            case 'name':
                return new SortByName();
            case 'date':
                return new SortByDate();
            case 'size':
                return new SortBySize();
            default:
                throw new Error('Invalid sort method');
        }
    }

    // Sort the images using the current strategy
    sortImages(images: Image[]): Image[] {
        return this.sortingStrategy.sort(images);
    }
}

/*
// Creating an ImageSorter and selecting a strategy using a string
const sorter = new ImageSorter("date");
const images = [
    new Image("Beach", "2021-05-01", 200),
    new Image("Mountains", "2022-01-15", 300),
    new Image("Cityscape", "2020-12-30", 150)
];
console.log("Sorted by Date:", sorter.sortImages(images));

// Change strategy to sort by name
sorter.setStrategy("name");
console.log("Sorted by Name:", sorter.sortImages(images));

// Change strategy to sort by size
sorter.setStrategy("size");
console.log("Sorted by Size:", sorter.sortImages(images));
 */
