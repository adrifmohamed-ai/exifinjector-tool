# EXIF Editor — Tool Documentation

> Edit, correct, and enrich the metadata embedded in your images — no software to install.

**→ [Open EXIF Editor](https://exifinjector.com/en/exif-editor)**

---

## Overview

The **ExifInjector EXIF Editor** is a professional, browser-based tool for modifying any metadata field inside image files. Whether you need to fix a wrong timestamp, add copyright information, embed GPS coordinates, or enrich IPTC fields for SEO — the editor provides a clean, intuitive interface that handles the technical complexity for you.

All editing happens locally in your browser. Your images are never transmitted to any server.

---

## Key Features

- **Full EXIF/IPTC/XMP editing** — modify any standard metadata field
- **GPS map picker** — add precise coordinates using an interactive map
- **Date/time corrector** — shift timestamps across entire batches with offset support
- **Copyright templates** — save your copyright info once, apply to any image
- **Lossless operation** — pixel data is never recompressed or modified
- **Undo/redo** — full edit history within the session
- **Before/after diff** — see exactly what changed before saving
- **Batch mode** — apply the same edits to multiple images simultaneously

---

## Getting Started

### 1. Load an Image
Drag and drop, click to browse, or paste a URL. The editor accepts JPEG, PNG, TIFF, WEBP, and HEIC files.

### 2. Browse and Edit Fields
Metadata fields are organized into labeled sections. Click any field value to edit it inline. Empty fields appear with a placeholder prompt. Fields changed since loading are highlighted.

### 3. Validate Your Changes
The built-in validator flags issues:
- ⚠️ Values that exceed field length limits
- ⚠️ Invalid GPS coordinate formats
- ⚠️ Character encoding problems
- ⚠️ Conflicting data between EXIF and XMP

### 4. Save the Modified File
Click **"Save Changes"** to download the modified image. The filename and all pixel data are preserved.

---

## Editable Field Reference

### EXIF Fields

#### Date & Time
| Field | Type | Notes |
|-------|------|-------|
| `DateTimeOriginal` | YYYY:MM:DD HH:MM:SS | When the shutter fired |
| `DateTimeDigitized` | YYYY:MM:DD HH:MM:SS | When digitized (same for digital cameras) |
| `DateTime` | YYYY:MM:DD HH:MM:SS | File modification date |
| `OffsetTimeOriginal` | +HH:MM | Timezone offset |
| `SubSecTimeOriginal` | Integer | Sub-second precision |

#### Camera (Editable)
| Field | Type | Notes |
|-------|------|-------|
| `Make` | String | Camera manufacturer |
| `Model` | String | Camera model |
| `Software` | String | Processing software |
| `Artist` | String | Creator name |
| `Copyright` | String | Copyright statement |
| `ImageDescription` | String | Short description |

#### GPS
| Field | Type | Notes |
|-------|------|-------|
| `GPSLatitude` | Decimal / DMS | North/South coordinate |
| `GPSLongitude` | Decimal / DMS | East/West coordinate |
| `GPSAltitude` | Float | Meters above sea level |
| `GPSAltitudeRef` | 0/1 | 0=above, 1=below sea level |
| `GPSImgDirection` | Float | 0–360 degrees |
| `GPSSpeed` | Float | Speed in km/h |

---

### IPTC Fields

#### Description
| Field | Max Length | Notes |
|-------|-----------|-------|
| `Headline` | 256 chars | Short, punchy title |
| `Caption/Abstract` | 2000 chars | Full descriptive caption |
| `Keywords` | 64 chars each | Multiple values supported |
| `SpecialInstructions` | 256 chars | Usage instructions |
| `Subject Reference` | — | IPTC Subject Codes |

#### Credits
| Field | Max Length | Notes |
|-------|-----------|-------|
| `Byline` (Creator) | 32 chars | Photographer's name |
| `Byline Title` | 32 chars | Job title |
| `Credit` | 32 chars | Providing organization |
| `Source` | 32 chars | Original source |
| `Copyright Notice` | 128 chars | Full copyright statement |

#### Location
| Field | Max Length | Notes |
|-------|-----------|-------|
| `Sublocation` | 32 chars | Specific location |
| `City` | 32 chars | City name |
| `Province-State` | 32 chars | State or province |
| `Country-Name` | 64 chars | Full country name |
| `Country-Primary-Location-Code` | 3 chars | ISO 3166-1 alpha-2 |

#### Date
| Field | Format | Notes |
|-------|--------|-------|
| `Date Created` | YYYYMMDD | Original creation date |
| `Time Created` | HHMMSS±HH | Original creation time |
| `Digital Creation Date` | YYYYMMDD | When digitized |

---

### XMP Fields

| Namespace | Field | Description |
|-----------|-------|-------------|
| `dc` | `title` | Image title |
| `dc` | `description` | Long description |
| `dc` | `creator` | Array of creators |
| `dc` | `rights` | Rights statement |
| `dc` | `subject` | Keywords array |
| `xmp` | `Rating` | 1–5 star rating |
| `xmp` | `Label` | Color label |
| `xmp` | `CreateDate` | ISO 8601 create date |
| `xmpRights` | `UsageTerms` | Licensing terms |
| `xmpRights` | `WebStatement` | URL to rights page |
| `photoshop` | `Credit` | Credit line |
| `photoshop` | `City` | City |
| `photoshop` | `State` | State |
| `photoshop` | `Country` | Country |
| `Iptc4xmpCore` | `Location` | Location name |
| `Iptc4xmpCore` | `CountryCode` | ISO country code |

---

## Copyright Templates

Save your commonly used metadata as templates and apply them with one click:

**Photographer Template Example:**
```
Artist:              Jane Smith
Copyright:           © 2026 Jane Smith Photography. All rights reserved.
IPTC Byline:         Jane Smith
IPTC Credit:         Jane Smith Photography
IPTC Copyright:      © 2026 Jane Smith Photography
XMP Creator:         Jane Smith
XMP Rights:          © 2026 Jane Smith. All rights reserved.
XMP UsageTerms:      Editorial use requires credit. Commercial use by license.
XMP WebStatement:    https://janesmithphotography.com/licensing
```

**Brand / Agency Template Example:**
```
Copyright:           © 2026 Acme Brand. All rights reserved.
IPTC Credit:         Acme Brand
IPTC Source:         Acme Marketing
XMP Rights:          © 2026 Acme Brand
XMP UsageTerms:      Internal use only. External distribution prohibited.
```

---

## GPS Coordinate Picker

The built-in map picker eliminates the need to manually enter coordinates:

1. Click the **"Pick on Map"** button next to the GPS fields
2. Search for an address or location name
3. Click the map to drop a pin at the exact location
4. Coordinates are automatically populated in decimal degrees format
5. Altitude can be fetched automatically from elevation data

**Supported input formats:**
```
Decimal degrees:  48.856614, 2.352222
DMS:              48°51'23.8"N 2°21'7.9"E
DM:               48°51.397'N 2°21.133'E
```

---

## Batch Editing

Switch to **Batch Mode** to apply the same metadata changes across multiple images:

1. Upload 2–500 images at once
2. Define which fields to edit and their new values
3. Choose conflict resolution:
   - **Overwrite all** — replace existing values
   - **Fill empty only** — skip fields that already have values
   - **Merge keywords** — add to existing keyword lists
4. Preview changes on a sample image
5. Apply to all and download as a ZIP

**Batch editing use cases:**
- Add copyright to an entire shoot (1 click for 300 photos)
- Standardize creator name after rebranding
- Bulk-add city/country to a trip's photo set
- Apply consistent keywords to a product catalog

For the dedicated bulk tool, see: [Bulk EXIF Editor](https://exifinjector.com/en/bulk-exif-editor)

---

## Lossless Editing Guarantee

ExifInjector's editor uses a **metadata-only write** strategy:

1. The original image pixel data block is extracted and preserved exactly as-is
2. Only the APP1 (EXIF) and APP13 (IPTC) marker segments are rewritten
3. The pixel data block is reattached without any recompression
4. The output file's image quality is **bit-for-bit identical** to the input

This means you can edit metadata as many times as you like with zero cumulative quality loss.

---

## Related Tools

| Tool | Use Case |
|------|----------|
| [EXIF Viewer](https://exifinjector.com/en/exif-viewer) | Read-only metadata inspection |
| [EXIF Injector](https://exifinjector.com/en/exif-injector) | Bulk metadata injection from template |
| [EXIF Remover](https://exifinjector.com/en/exif-remover) | Strip metadata for privacy |
| [Copyright Embedder](https://exifinjector.com/en/copyright-embedder) | Focused copyright workflow |
| [Image SEO Audit](https://exifinjector.com/en/image-seo-audit) | Audit and score metadata quality |

---

## Further Reading

- [Guide: How to Edit EXIF Metadata](../guides/edit-exif-metadata.md)
- [Guide: EXIF Metadata & SEO](../guides/exif-seo.md)
- [Tutorial: Add Metadata to Images](../tutorials/add-metadata-to-images.md)
