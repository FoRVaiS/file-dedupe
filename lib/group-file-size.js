const { statSync } = require('fs');

const getByteSize = file => statSync(file).size;

module.exports = (filePathes, sourceFiles = []) => {
    const filesizeObj = [...sourceFiles, ...filePathes].reduce((acc, filePath) => {
        const size = getByteSize(filePath);

        if (Array.isArray(acc[size])) {
            acc[size].push(filePath);
        } else {
            acc[size] = [filePath];
        }

        return acc;
    }, {});

    return Object.values(filesizeObj);
};
