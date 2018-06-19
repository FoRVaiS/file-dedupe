
# File Dedupe &middot; [![Build Status](https://travis-ci.org/FoRVaiS/file-dedupe.svg?branch=master)](https://travis-ci.org/FoRVaiS/file-dedupe) [![npm (scoped)](https://img.shields.io/npm/v/@forvais/file-dedupe.svg)](https://www.npmjs.com/package/@forvais/file-dedupe)

Dedupe files based on their file size and MD5 hash. Sub-directory support included.

# Usage

### Arguments
 - `targetDirectory`: The directory to check for duplicates in.
 - `sourceDirectory`: Used to check for duplicate unique files between sourceDirectory and targetDirectory. SourceDirectory uniques are preserved.
 - `excludes`: An array of path strings to prevent targetDirectory from reading.

### Options
 - `{ deleteDuplicates }` (def. false): Should duplicates be deleted when identified?

## (targetDirectory: string[, excludes: array][, opts: object])
```javascript
const dedupe = require('@forvais/file-dedupe');
const path = require('path');

/*
    assets/
    +-- files/
        +-- folder1/
        |   `-- file1 (2).txt
        +-- file1.txt
        `-- file2.txt
*/

(async () => {
    try {
        const targetDirectory = path.join('assets', 'files');
        const { uniques, duplicates } = await dedupe(targetDirectory, [ 'file2.txt' ]);

        console.log('Uniques:', uniques);
        console.log('Duplicates:', duplicates);

        // uniques is a valid output but is exactly the same as the one above
        const { /* uniques */, removed } = await dedupe(targetDirectory, { deleteDuplicates: true });

        console.log('Removed:', removed);
    } catch (e) { console.log(e); }
})();

/*
    Uniques: [
        'assets/files/file1.txt'
    ]

    Duplicates: {
        cfcd208495d565ef66e7dff9f98764da: [
            'assets/files/folder1/file1 (2).txt'
        ]
    }

    Removed: {
        cfcd208495d565ef66e7dff9f98764da: [
            'assets/files/folder1/file1 (2).txt'
        ]
    }
*/

/*
    assets/
    +-- files/
        +-- folder1/
        +-- file1.txt
        `-- file2.txt
*/
```

## (sourceDirectory: string, targetDirectory: string[, excludes: array][, opts: object])
```javascript
const dedupe = require('@forvais/file-dedupe');
const path = require('path');

/*
    assets/
    `-- files/
        +-- target/
        |   +-- asdf/
        |   |   `-- file1 (1).txt
        |   +-- file1.txt
        |   +-- file2.txt
        |   `-- file3.txt
        `-- src/
            +-- file1.txt
            `-- file2.txt
*/

(async () => {
    try {
    	const sourceDirectory = path.join('assets', 'files', 'src');
        const targetDirectory = path.join('assets', 'files', 'target');
        const { uniques, duplicates } = await dedupe(sourceDirectory, targetDirectory);

        console.log('Uniques:', uniques);
        console.log('Duplicates:', duplicates);
    } catch (e) { console.log(e); }
})();

/*
    Uniques: [
        'assets/files/src/file1.txt',
        'assets/files/src/file2.txt',
        'assets/files/target/file3.txt'
    ]

    Duplicates: {
        cfcd208495d565ef66e7dff9f98764da: [
            'assets/files/target/file1.txt',
            'assets/files/target/asdf/file1 (1).txt'
        ],
        abae5443572ad505433c979a974ac79d: [
            'assets/files/target/file2.txt'
        ]
    }
*/
```
**The above example also works with nested source and target directories:**
```
src/
`-- target/
```
and
```
target/
`-- src/
```
