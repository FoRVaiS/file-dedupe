# File Dedupe &middot; [![Build Status](https://travis-ci.org/FoRVaiS/file-dedupe.svg?branch=master)](https://travis-ci.org/FoRVaiS/file-dedupe)

Dedupe files based on their file size and MD5 hash. Sub-directory support included.

# Usage

### Directory

```
assets/
    content/
        images/
            Album-1/
                image-1.png
                image-1 - Copy.png
                image-1 - Copy - Copy.png
            image-2.png
            image-3.png
            image-3 - Copy.png
        videos/
            video-1.mp4
            video-2.mp4
            video-2 - Copy.mp4
```
### Script

```javascript
const dedupe = require('@forvais/file-dedupe');

(async () => {
    try {
        const directory = './assets/content/';
    
        /* NO DUPLICATION REMOVAL / Return unique and duplicate files */
        const { uniques, duplicates } = await dedupe(directory);
        
        console.log('Uniques:', uniques);
        console.log('Duplicates:', duplicates);
        
        /* DELETE DUPLICATES / Output unique and removed files */
        const { /* uniques, */ removed } = await dedupe(directory, { deleteDuplicates: true });
        
        console.log('Removed:', removed);
    } catch (e) { console.log(e); }
})();

```
### Results

```
Uniques: [
    'assets/content/images/Album-1/image-1.png',
    'assets/content/images/image-2.png',
    'assets/content/images/image-3.png',
    'assets/content/videos/video-1.mp4',
    'assets/content/videos/video-2.mp4'
]
Duplicates: [
    'assets/content/images/Album-1/image-1 - Copy.png',
    'assets/content/images/Album-1/image-1 - Copy - Copy.png',
    'assets/content/images/image-3 - Copy.png',
    'assets/content/videos/video-2 - Copy.mp4'
]
Removed: [
    'assets/content/images/Album-1/image-1 - Copy.png',
    'assets/content/images/Album-1/image-1 - Copy - Copy.png',
    'assets/content/images/image-3 - Copy.png',
    'assets/content/videos/video-2 - Copy.mp4'
]

```

```
assets/
    content/
        images/
            Album-1/
                image-1.png
            image-2.png
            image-3.png
        videos/
            video-1.mp4
            video-2.mp4
```
