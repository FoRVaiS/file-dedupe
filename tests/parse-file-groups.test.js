const parseFileGroupsFactory = require('../lib/parse-file-groups');
const getDummyFiles = require('./files/get-dummy-files');

describe('Parse File Groups', () => {
    it('should return unique and duplicate files', () => {
        const parseFileGroups = parseFileGroupsFactory({

        });

        const fakeFileGroups = [
            [
                getDummyFiles[0],
                getDummyFiles[1],
                getDummyFiles[4],
            ],
            [
                getDummyFiles[2],
            ],
            [
                getDummyFiles[3],
            ],
        ];

        expect(parseFileGroups(fakeFileGroups)).toEqual({
            uniques: [
                getDummyFiles[0],
                getDummyFiles[1],
                getDummyFiles[2],
                getDummyFiles[3],
            ],
            duplicates: {
                cfcd208495d565ef66e7dff9f98764da: [
                    getDummyFiles[4],
                ],
            },
        });
    });
});
