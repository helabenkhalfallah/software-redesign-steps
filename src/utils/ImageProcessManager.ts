// The core interface for processing images
interface ImageHandler {
    process(): Image;
}

// The base Image class implementing ImageHandler
class Image implements ImageHandler {
    constructor(
        public data: ArrayBuffer,
        public width: number,
        public height: number,
    ) {}

    // Basic process method
    process(): Image {
        console.log('Processing base image with dimensions:', this.width, 'x', this.height);
        return this; // Return the processed Image instance
    }
}

// Abstract decorator class implementing ImageHandler
abstract class ImageDecorator implements ImageHandler {
    constructor(protected imageHandler: ImageHandler) {}

    process(): Image {
        return this.imageHandler.process(); // Delegate processing to the wrapped handler
    }
}

// Filter decorator class
class FilterDecorator extends ImageDecorator {
    constructor(
        imageHandler: ImageHandler,
        private filterType: string,
    ) {
        super(imageHandler);
    }

    process(): Image {
        const image = super.process();
        console.log(`Applying ${this.filterType} filter to the image.`);
        return image; // Return the processed Image instance
    }
}

// Resize decorator class
class ResizeDecorator extends ImageDecorator {
    constructor(
        imageHandler: ImageHandler,
        private newWidth: number,
        private newHeight: number,
    ) {
        super(imageHandler);
    }

    process(): Image {
        const image = super.process();
        console.log(`Resizing image to ${this.newWidth}x${this.newHeight}.`);
        // Assuming resizing modifies image width and height directly
        image.width = this.newWidth;
        image.height = this.newHeight;
        return image; // Return the processed Image instance
    }
}

// Compression decorator class
class CompressionDecorator extends ImageDecorator {
    constructor(
        imageHandler: ImageHandler,
        private compressionLevel: number,
    ) {
        super(imageHandler);
    }

    process(): Image {
        const image = super.process();
        console.log(`Compressing image with compression level: ${this.compressionLevel}.`);
        return image; // Return the processed Image instance
    }
}

// Manager to handle the image processing
export class ImageProcessManager {
    processImage(): Image {
        // Instantiate the base image
        const baseImage = new Image(new ArrayBuffer(1024), 800, 600);

        // Apply decorators in sequence
        const filteredImage = new FilterDecorator(baseImage, 'sepia');
        const resizedImage = new ResizeDecorator(filteredImage, 640, 480);
        const compressedImage = new CompressionDecorator(resizedImage, 80);

        // Process the final decorated image and return it
        return compressedImage.process();
    }
}

/*
// Example usage
const manager = new ImageProcessManager();
const processedImage = manager.processImage();
console.log("Final processed image dimensions:", processedImage.width, "x", processedImage.height);
*/
