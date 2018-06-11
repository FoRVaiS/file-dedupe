const readdir = require('recursive-readdir');
const groupFileSize = require('../lib/group-file-size/group-file-size');
const parseFileGroups = require('../lib/parse-file-groups/parse-file-groups')();
const removeDuplicates = require('../lib/delete-duplicates/delete-duplicates')();

module.exports = async (directory, { deleteDuplicates = false } = {}) => {
    const files = await readdir(directory);
    const fileGroups = groupFileSize(files);
    const { uniques, duplicates } = parseFileGroups(fileGroups);

    if (deleteDuplicates === true) {
        await removeDuplicates({ duplicates });
    }

    return {
        uniques,
        [!deleteDuplicates ? 'duplicates' : 'removed']: duplicates,
    };
};
