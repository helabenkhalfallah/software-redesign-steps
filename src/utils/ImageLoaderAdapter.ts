// Unified ImageLoader interface
interface ImageLoader {
    load(path: string): Promise<Image>;
}

// Core Image class (remains the same)
class Image {
    constructor(
        public data: ArrayBuffer,
        public width: number,
        public height: number,
    ) {}

    display() {
        console.log('Displaying image with width:', this.width, 'and height:', this.height);
    }
}

// Local file loader (synchronous, wrapped in a Promise)
export class LocalFileLoader implements ImageLoader {
    load(path: string): Promise<Image> {
        console.log('Loading image from local file:', path);
        const data = new ArrayBuffer(1000); // Simulated data
        return Promise.resolve(new Image(data, 640, 480));
    }
}

// Web image loader (asynchronous)
export class WebImageLoader implements ImageLoader {
    async load(path: string): Promise<Image> {
        console.log('Loading image from web:', path);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async delay
        const data = new ArrayBuffer(1500);
        return new Image(data, 800, 600);
    }
}

// Cloud storage loader (asynchronous)
export class CloudStorageLoader implements ImageLoader {
    async load(path: string): Promise<Image> {
        console.log('Loading image from cloud storage:', path);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate async delay
        const data = new ArrayBuffer(2000);
        return new Image(data, 1024, 768);
    }
}

// Simplified ImageLoaderAdapter with unified handling
export class ImageLoaderAdapter {
    async loadImage(loader: ImageLoader, path: string): Promise<void> {
        const image = await loader.load(path);
        image.display();
    }
}

/*
// Usage examples with different loaders
const fileLoader = new LocalFileLoader();
const asyncLoader = new WebImageLoader();
const cloudLoader = new CloudStorageLoader();

const imageLoaderAdapter = new ImageLoaderAdapter();

imageLoaderAdapter.loadImage(fileLoader, "path/to/local/image.jpg").then(() => {}).catch(() => {});
imageLoaderAdapter.loadImage(asyncLoader, "https://example.com/image.png").then(() => {}).catch(() => {});
imageLoaderAdapter.loadImage(cloudLoader, "cloud://my-bucket/image.jpg").then(() => {}).catch(() => {});
*/
