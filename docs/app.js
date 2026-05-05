// EXIF Injector - Main Application
class EXIFInjector {
    constructor() {
        this.currentImage = null;
        this.currentImageData = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Upload
        const uploadArea = document.getElementById('uploadArea');
        const imageInput = document.getElementById('imageInput');

        uploadArea.addEventListener('click', () => imageInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--border-color)';
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            const files = e.dataTransfer.files;
            if (files.length) this.handleImageUpload(files[0]);
        });

        imageInput.addEventListener('change', (e) => {
            if (e.target.files.length) this.handleImageUpload(e.target.files[0]);
        });

        // Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                const tabId = e.target.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // Actions
        document.getElementById('removeMetadataBtn').addEventListener('click', () => this.removeMetadata());
        document.getElementById('downloadBtn').addEventListener('click', () => this.downloadImage());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetUpload());
    }

    handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImageData = e.target.result;
            this.currentImage = file;
            this.displayImage();
            this.readMetadata();
            document.getElementById('uploadArea').parentElement.classList.add('hidden');
            document.getElementById('editorContainer').classList.remove('hidden');
        };
        reader.readAsArrayBuffer(file);
    }

    displayImage() {
        const preview = document.getElementById('imagePreview');
        const blob = new Blob([this.currentImageData], { type: this.currentImage.type });
        preview.src = URL.createObjectURL(blob);
    }

    readMetadata() {
        try {
            // Try to read EXIF data
            const exifData = piexif.load(this.currentImageData);
            this.displayExifData(exifData);
            this.displayIptcData();
            this.displayXmpData();
        } catch (e) {
            console.log('No EXIF data found or error reading:', e);
            const msg = '<p class="metadata-info-empty">No metadata found in this image</p>';
            document.getElementById('exifInfo').innerHTML = msg;
        }
    }

    displayExifData(exifData) {
        let html = '';
        const thumbnail = exifData.Thumbnail || {};
        const image = exifData['0th'] || {};
        const exif = exifData.Exif || {};

        const displayFields = {
            'Make': image[piexif.ImageIFD.Make],
            'Model': image[piexif.ImageIFD.Model],
            'Software': image[piexif.ImageIFD.Software],
            'DateTime': image[piexif.ImageIFD.DateTime],
            'Orientation': image[piexif.ImageIFD.Orientation],
            'XResolution': image[piexif.ImageIFD.XResolution],
            'YResolution': image[piexif.ImageIFD.YResolution],
            'FocalLength': exif[piexif.ExifIFD.FocalLength],
            'FNumber': exif[piexif.ExifIFD.FNumber],
            'ISOSpeedRatings': exif[piexif.ExifIFD.ISOSpeedRatings],
            'ExposureTime': exif[piexif.ExifIFD.ExposureTime],
            'DateTimeOriginal': exif[piexif.ExifIFD.DateTimeOriginal],
            'LensModel': exif[piexif.ExifIFD.LensModel],
        };

        Object.entries(displayFields).forEach(([key, value]) => {
            if (value) {
                html += `<div class="metadata-field"><strong>${key}:</strong> <span>${this.formatValue(value)}</span></div>`;
            }
        });

        // Check for GPS data
        const gps = exifData.GPS || {};
        if (Object.keys(gps).length > 0) {
            html += `<div class="metadata-field"><strong>⚠️ GPS Data Found</strong> <span>This image contains location information</span></div>`;
        }

        document.getElementById('exifInfo').innerHTML = html || '<p class="metadata-info-empty">No EXIF data found</p>';
    }

    displayIptcData() {
        // Simplified IPTC display
        document.getElementById('iptcInfo').innerHTML = '<p class="metadata-info-empty">IPTC data reading - use editor to add tags</p>';
    }

    displayXmpData() {
        // Simplified XMP display
        document.getElementById('xmpInfo').innerHTML = '<p class="metadata-info-empty">XMP data reading - use editor to add metadata</p>';
    }

    formatValue(value) {
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        if (typeof value === 'object') {
            return JSON.stringify(value);
        }
        return String(value);
    }

    removeMetadata() {
        if (confirm('Remove all metadata from this image? This cannot be undone.')) {
            try {
                const canvas = document.getElementById('imagePreview');
                const ctx = canvas.getContext('2d');
                
                // Create a clean copy without metadata
                const img = new Image();
                img.onload = () => {
                    const tempCanvas = document.createElement('canvas');
                    tempCanvas.width = img.width;
                    tempCanvas.height = img.height;
                    const tempCtx = tempCanvas.getContext('2d');
                    tempCtx.drawImage(img, 0, 0);
                    
                    tempCanvas.toBlob((blob) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.currentImageData = e.target.result;
                            this.currentImage = new File([blob], 'image-clean.jpg', { type: 'image/jpeg' });
                            this.displayImage();
                            document.getElementById('exifInfo').innerHTML = '<p class="metadata-info-empty">Metadata removed</p>';
                        };
                        reader.readAsArrayBuffer(blob);
                    });
                };
                const preview = document.getElementById('imagePreview');
                img.src = preview.src;
                this.showAlert('Metadata removed successfully', 'success');
            } catch (e) {
                this.showAlert('Error removing metadata: ' + e.message, 'error');
            }
        }
    }

    downloadImage() {
        const preview = document.getElementById('imagePreview');
        const link = document.createElement('a');
        link.href = preview.src;
        link.download = 'image-modified.jpg';
        link.click();
        this.showAlert('Image downloaded successfully', 'success');
    }

    resetUpload() {
        this.currentImage = null;
        this.currentImageData = null;
        document.getElementById('uploadArea').parentElement.classList.remove('hidden');
        document.getElementById('editorContainer').classList.add('hidden');
        document.getElementById('imageInput').value = '';
    }

    showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        document.querySelector('main').insertBefore(alert, document.querySelector('#editorContainer, .uploader-section'));
        setTimeout(() => alert.remove(), 4000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EXIFInjector();
});
