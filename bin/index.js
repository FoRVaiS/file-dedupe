const readdir = require('recursive-readdir');
const signatureProcessing = require('../lib/signature-processing');
const groupFileSize = require('../lib/group-file-size');
const parseFileGroups = require('../lib/parse-file-groups')();
const removeDuplicates = require('../lib/delete-duplicates')();

module.exports = signatureProcessing(async (directory, excludes, opts = {}) => {
    const {
        deleteDuplicates = false,
    } = opts;

    const files = await readdir(directory, excludes);
    const fileGroups = groupFileSize(files);
    const { uniques, duplicates } = parseFileGroups(fileGroups);

    if (deleteDuplicates === true) {
        await removeDuplicates({ duplicates });
    }

    return {
        uniques,
        [!deleteDuplicates ? 'duplicates' : 'removed']: duplicates,
    };
});
