const readdir = require('recursive-readdir');
const signatureProcessing = require('../lib/signature-processing');
const groupFileSize = require('../lib/group-file-size');
const parseFileGroups = require('../lib/parse-file-groups')();
const removeDuplicates = require('../lib/delete-duplicates')();

module.exports = signatureProcessing(async (source, target, excludes, {
    deleteDuplicates = false,
}) => {
    const sourceFiles = source && await readdir(source, [target]);
    const targetFiles = await readdir(target, [...excludes, target]);
    const fileGroups = groupFileSize(targetFiles, sourceFiles);
    const { uniques, duplicates } = parseFileGroups(fileGroups);

    if (deleteDuplicates === true) {
        await removeDuplicates({ duplicates });
    }

    return {
        uniques,
        [!deleteDuplicates ? 'duplicates' : 'removed']: duplicates,
    };
});
