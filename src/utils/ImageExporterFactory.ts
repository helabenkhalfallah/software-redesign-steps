// 1. Define the interface for Image Exporters
interface ImageExporter {
    export(imageData: string): void; // Takes raw image data as input
}

// 2. Implement Concrete Exporters for each format
class PNGExporter implements ImageExporter {
    export(imageData: string): void {
        console.log('Exporting image as PNG with transparency: ', imageData);
        // PNG-specific export logic goes here
    }
}

class JPEGExporter implements ImageExporter {
    export(imageData: string): void {
        console.log('Exporting image as JPEG with compression: ', imageData);
        // JPEG-specific export logic goes here
    }
}

class SVGExporter implements ImageExporter {
    export(imageData: string): void {
        console.log('Exporting image as SVG vector format: ', imageData);
        // SVG-specific export logic goes here
    }
}

// 3. Create the ImageExporterFactory to centralize object creation
export class ImageExporterFactory {
    static createExporter(type: string): ImageExporter {
        switch (type) {
            case 'PNG':
                return new PNGExporter();
            case 'JPEG':
                return new JPEGExporter();
            case 'SVG':
                return new SVGExporter();
            default:
                throw new Error(`Unknown format type: ${type}`);
        }
    }
}

/*
// 4. Client code uses the factory to get the desired exporter
export function exportImage(imageData: string, format: string): void {
    const exporter = ImageExporterFactory.createExporter(format);
    exporter.export(imageData); // Client only cares about export, not about instantiation details
}

// Usage example
exportImage("image-data", "PNG"); // Output: "Exporting image as PNG with transparency."
exportImage("image-data", "JPEG"); // Output: "Exporting image as JPEG with compression."
*/
