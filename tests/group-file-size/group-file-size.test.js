const groupFileSize = require('../../lib/group-file-size/group-file-size');
const getDummyFiles = require('../files/get-dummy-files');

describe('Group File Size', () => {
    it('should return an array of file pathes grouped by file sizes', () => {
        expect(groupFileSize(getDummyFiles)).toEqual([
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
});
