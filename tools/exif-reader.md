# EXIF Viewer — Tool Documentation

> Read, inspect, and understand all metadata embedded in any image file.

**→ [Open EXIF Viewer](https://exifinjector.com/en/exif-viewer)**

---

## Overview

The **ExifInjector EXIF Viewer** is a free, browser-based tool that reads and displays every metadata field embedded in image files. It supports all three major metadata standards — EXIF, IPTC, and XMP — and presents them in a clean, organized interface that requires no technical knowledge to interpret.

Unlike command-line tools or desktop applications, the EXIF Viewer works entirely in your browser. Your images are never uploaded to any server — all parsing happens locally on your device.

---

## Key Features

- **Comprehensive metadata display** — reads EXIF, IPTC, XMP, ICC profiles, and Maker Notes
- **GPS map visualization** — plots image location on an interactive map if GPS data is present
- **Thumbnail extraction** — displays the embedded JPEG thumbnail alongside the full image
- **Raw hex view** — for technical users who need to inspect the actual binary data
- **Export as JSON** — download all metadata as a structured JSON file
- **Batch viewing** — inspect multiple images and compare their metadata
- **Zero upload** — all processing is client-side; files never leave your device

---

## Supported File Formats

| Format | EXIF | IPTC | XMP | GPS | Thumbnail |
|--------|------|------|-----|-----|-----------|
| JPEG (.jpg, .jpeg) | ✅ | ✅ | ✅ | ✅ | ✅ |
| TIFF (.tif, .tiff) | ✅ | ✅ | ✅ | ✅ | ✅ |
| PNG (.png) | Limited | — | ✅ | ✅ | — |
| WEBP (.webp) | ✅ | — | ✅ | ✅ | — |
| HEIC (.heic) | ✅ | — | ✅ | ✅ | ✅ |
| RAW (CR2, NEF, ARW) | ✅ | ✅ | ✅ | ✅ | ✅ |
| DNG (.dng) | ✅ | ✅ | ✅ | ✅ | ✅ |

---

## Interface Walkthrough

### 1. Upload Panel
Drag and drop an image into the upload zone, or click to browse. Multiple files can be loaded simultaneously for batch inspection.

### 2. Metadata Sections

The viewer organizes all metadata into collapsible sections:

#### 📷 Camera & Settings
```
Make:               Canon
Model:              EOS R5
LensModel:          RF 24-70mm f/2.8L IS USM
FocalLength:        35.0 mm
FocalLengthIn35mm:  35 mm
FNumber:            2.8
ExposureTime:       1/500 sec
ISOSpeedRatings:    800
ExposureBias:       0 EV
MeteringMode:       Pattern
Flash:              Off, did not fire
WhiteBalance:       Auto
ExposureProgram:    Aperture-priority AE
```

#### 📅 Date & Time
```
DateTimeOriginal:     2026:04:12 14:22:45
DateTimeDigitized:    2026:04:12 14:22:45
DateTime (Modified):  2026:04:14 09:15:30
OffsetTimeOriginal:   +02:00
SubSecTimeOriginal:   40
```

#### 🗺️ GPS Data
```
GPSLatitude:          48° 51' 23.85" N
GPSLongitude:         2° 17' 45.12" E
GPSAltitude:          38.4 m Above Sea Level
GPSSpeed:             0.0 km/h
GPSImgDirection:      247.5°
GPSDateStamp:         2026:04:12
GPSTimeStamp:         12:22:45 UTC
GPSMapDatum:          WGS-84
```

#### 📝 IPTC / Editorial
```
Headline:             Eiffel Tower at Golden Hour
Caption:              The Eiffel Tower photographed from Champ de Mars 
                      during golden hour light on a clear spring afternoon.
Keywords:             eiffel tower, paris, france, landmark, golden hour
Byline:               Marie Dubois
Copyright:            © 2026 Marie Dubois Photography
City:                 Paris
State/Province:       Île-de-France
Country:              France
```

#### 🎨 XMP / Creative
```
Rating:               4
Label:                Green
Creator:              Marie Dubois
Rights:               © 2026 Marie Dubois. All rights reserved.
CreateDate:           2026-04-12T14:22:45+02:00
ModifyDate:           2026-04-14T09:15:30+02:00
```

#### 🖼️ Image Properties
```
ImageWidth:           8192 px
ImageLength:          5464 px
BitsPerSample:        8
Compression:          JPEG
ColorSpace:           sRGB
Orientation:          Horizontal (normal)
XResolution:          300 dpi
YResolution:          300 dpi
ExifImageWidth:       8192
ExifImageHeight:      5464
```

#### 🔧 Software & Processing
```
Software:             Adobe Lightroom Classic 13.2 (Windows)
ProcessingSoftware:   Adobe Camera Raw 16.1
```

#### 🏭 Maker Notes (Proprietary)
Manufacturer-specific data stored in proprietary format. Canon, Nikon, Sony, and other manufacturers store lens correction data, in-camera settings, and focus information here. The viewer decodes and displays these where possible.

---

## GPS Map View

When an image contains GPS coordinates, the viewer displays an interactive map showing the exact location where the photo was taken. Features include:

- Satellite and street map toggle
- Coordinate display in decimal degrees and DMS format
- Copy coordinates button
- "Open in Google Maps" link
- Direction indicator (if `GPSImgDirection` is present)

---

## Exporting Metadata

### Export as JSON
Click **"Export JSON"** to download all metadata as a structured file:

```json
{
  "exif": {
    "Make": "Canon",
    "Model": "EOS R5",
    "DateTimeOriginal": "2026:04:12 14:22:45",
    "FNumber": 2.8,
    "ExposureTime": "1/500",
    "ISOSpeedRatings": 800,
    "GPS": {
      "GPSLatitude": 48.856625,
      "GPSLongitude": 2.295867,
      "GPSAltitude": 38.4
    }
  },
  "iptc": {
    "Caption": "The Eiffel Tower photographed...",
    "Keywords": ["eiffel tower", "paris", "france"],
    "Copyright": "© 2026 Marie Dubois Photography"
  },
  "xmp": {
    "Rating": 4,
    "Creator": "Marie Dubois"
  }
}
```

### Export as CSV
For batch metadata analysis, the viewer can export metadata from multiple images as a CSV spreadsheet.

---

## Privacy Guarantee

The EXIF Viewer processes all files locally in your browser using the **Web File API** and **JavaScript**. No image data is transmitted to ExifInjector servers at any point.

You can verify this by opening your browser's **Network DevTools** (F12 → Network tab) and watching for any outgoing requests when uploading and viewing an image. You will see none related to your file.

---

## Technical Details

The viewer is built on ExifInjector's custom JavaScript metadata parser, which implements:

- **EXIF**: Full TIFF/EXIF 2.32 specification support including all standard IFD tags and sub-IFDs
- **IPTC**: IIM (Information Interchange Model) record 2 fields
- **XMP**: Adobe XMP specification with Dublin Core, IPTC extension, and custom namespaces
- **Maker Notes**: Decoded entries for Canon, Nikon, Sony, Fuji, Olympus, Panasonic, and Leica

---

## Related Tools

| Tool | Use Case |
|------|----------|
| [EXIF Editor](https://exifinjector.com/en/exif-editor) | Modify any metadata field |
| [EXIF Injector](https://exifinjector.com/en/exif-injector) | Bulk-add metadata to many images |
| [EXIF Remover](https://exifinjector.com/en/exif-remover) | Strip metadata for privacy |
| [EXIF Map Viewer](https://exifinjector.com/en/exif-map-viewer) | GPS-focused map visualization |
| [Image SEO Audit](https://exifinjector.com/en/image-seo-audit) | SEO health check |

---

## Further Reading

- [What Is EXIF Metadata?](../guides/what-is-exif.md)
- [Tutorial: Add Metadata to Images](../tutorials/add-metadata-to-images.md)
- [Guide: EXIF & SEO](../guides/exif-seo.md)
