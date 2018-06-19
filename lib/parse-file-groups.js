const md5File = require('md5-file');

module.exports = ({
    calculateMD5 = md5File.sync,
} = {}) => (filePathGroups) => {
    const flattenArray = array => array.reduce((acc, nest) => [...acc, ...nest], []);

    const uniques = flattenArray(filePathGroups.filter(group => group.length === 1));

    const possibleDuplicates = flattenArray(filePathGroups.filter(group => group.length > 1));
    const duplicateMD5Groups = possibleDuplicates.reduce((acc, filePath) => {
        const md5 = calculateMD5(filePath);

        if (Array.isArray(acc[md5])) {
            acc[md5].push(filePath);
        } else {
            acc[md5] = [filePath];
        }

        return acc;
    }, {});

    const duplicates = Object.entries(duplicateMD5Groups).reduce((acc, [md5, duplicateGroup]) => {
        duplicateGroup.reverse();

        uniques.push(duplicateGroup.pop());

        if (duplicateGroup.length > 0) {
            acc[md5] = duplicateGroup.sort();
        }

        return acc;
    }, {});

    return {
        uniques: uniques.sort(),
        duplicates,
    };
};
