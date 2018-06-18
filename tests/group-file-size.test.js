const groupFileSize = require('../lib/group-file-size');
const getDummyFiles = require('./files/get-dummy-files');

describe('Group File Size', () => {
    it('should return an array of file pathes grouped by file sizes', () => {
        expect(groupFileSize([
            getDummyFiles[0],
            getDummyFiles[1],
            getDummyFiles[2],
            getDummyFiles[3],
        ])).toEqual([
            [
                getDummyFiles[0],
                getDummyFiles[1],
            ],
            [
                getDummyFiles[2],
            ],
            [
                getDummyFiles[3],
            ],
        ]);
    });

    it('source files should end up on the bottom of the stack', () => {
        expect(groupFileSize([
            getDummyFiles[0],
            getDummyFiles[1],
            getDummyFiles[2],
            getDummyFiles[3],
        ], [
            getDummyFiles[6],
            getDummyFiles[7],
        ])).toEqual([
            [
                getDummyFiles[6],
                getDummyFiles[0],
                getDummyFiles[1],
            ],
            [
                getDummyFiles[2],
            ],
            [
                getDummyFiles[7],
                getDummyFiles[3],
            ],
        ]);
    });
});
