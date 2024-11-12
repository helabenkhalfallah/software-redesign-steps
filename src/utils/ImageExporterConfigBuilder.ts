// 1. Define the Image Exporter configuration class
export class ImageExporterConfig {
    readonly format: string;
    readonly resolution: string;
    readonly watermark: string | null;
    readonly quality: number;

    // Private constructor, only accessible by ImageExporterConfigBuilder
    private constructor(builder: ImageExporterConfigBuilder) {
        this.format = builder.format;
        this.resolution = builder.resolution;
        this.watermark = builder.watermark;
        this.quality = builder.quality;
    }

    // Static method to get a new builder instance
    static get Builder() {
        return new ImageExporterConfigBuilder();
    }

    // Static method to create an instance of ImageExporterConfig
    static create(builder: ImageExporterConfigBuilder): ImageExporterConfig {
        return new ImageExporterConfig(builder);
    }
}

// 2. Define the Builder class for ImageExporterConfig separately
class ImageExporterConfigBuilder {
    format: string = 'JPEG'; // Default format
    resolution: string = '1080p'; // Default resolution
    watermark: string | null = null;
    quality: number = 80; // Default quality percentage

    setFormat(format: string): this {
        this.format = format;
        return this;
    }

    setResolution(resolution: string): this {
        this.resolution = resolution;
        return this;
    }

    setWatermark(watermark: string): this {
        this.watermark = watermark;
        return this;
    }

    setQuality(quality: number): this {
        this.quality = quality;
        return this;
    }

    // Builds and returns the configured ImageExporterConfig object
    build(): ImageExporterConfig {
        // Call the static method within the ImageExporterConfig class
        return ImageExporterConfig.create(this);
    }
}

/*
// Usage example
const exporterConfig = ImageExporterConfig.Builder
    .setFormat("PNG")
    .setResolution("4K")
    .setWatermark("© MyCompany")
    .setQuality(90)
    .build();

function exportImageWithConfig(imageData: string, config: ImageExporterConfig): void {
    console.log(`Exporting image data: ${imageData}`);
    console.log(`Exporting image with format: ${config.format}`);
    console.log(`Resolution: ${config.resolution}`);
    console.log(`Watermark: ${config.watermark ? config.watermark : "None"}`);
    console.log(`Quality: ${config.quality}%`);
    // Image export logic goes here
}

exportImageWithConfig("image-data", exporterConfig);
 */
