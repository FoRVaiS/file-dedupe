const deleteDuplicatesFactory = require('../lib/delete-duplicates');
const getDummyFiles = require('./files/get-dummy-files');

describe('Delete Duplicates', () => {
    it('should delete correct file paths', () => {
        const fakeDependencies = {
            fs: {
                unlink: jest.fn(),
            },
        };

        const fakeDuplicates = {
            duplicates: [
                getDummyFiles[0],
                getDummyFiles[1],
                getDummyFiles[2],
            ],
        };

        const deleteDuplicates = deleteDuplicatesFactory(fakeDependencies);

        deleteDuplicates(fakeDuplicates);

        expect(fakeDependencies.fs.unlink.mock.calls[0][0]).toBe(getDummyFiles[0]);
        expect(fakeDependencies.fs.unlink.mock.calls[1][0]).toBe(getDummyFiles[1]);
        expect(fakeDependencies.fs.unlink.mock.calls[2][0]).toBe(getDummyFiles[2]);
    });
});
