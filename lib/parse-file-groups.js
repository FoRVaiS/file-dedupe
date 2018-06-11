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

    const duplicates = flattenArray(Object.values(duplicateMD5Groups).map((duplicateGroups) => {
        duplicateGroups.reverse();

        uniques.push(duplicateGroups.pop());

        return duplicateGroups;
    }));

    return {
        uniques: uniques.sort(),
        duplicates: duplicates.sort(),
    };
};
