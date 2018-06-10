const groupFileSize = require('../../lib/group-file-size/group-file-size');
const path = require('path');

describe('Group File Size', () => {
    it('should return an array of file pathes grouped by file sizes', () => {
        const fakeFilepathes = [
            path.join('tests', 'group-file-size', 'group-file-size-dummy-1.dummy'),
            path.join('tests', 'group-file-size', 'group-file-size-dummy-2.dummy'),
            path.join('tests', 'group-file-size', 'group-file-size-dummy-3.dummy'),
            path.join('tests', 'group-file-size', 'group-file-size-dummy-4.dummy'),
        ];

        expect(groupFileSize(fakeFilepathes)).toEqual([
            [
                fakeFilepathes[0],
                fakeFilepathes[1],
            ],
            [
                fakeFilepathes[2],
            ],
            [
                fakeFilepathes[3],
            ],
        ]);
    });
});
