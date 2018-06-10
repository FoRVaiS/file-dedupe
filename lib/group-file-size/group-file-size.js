const { statSync } = require('fs');

const getByteSize = file => statSync(file).size;

module.exports = (filePathes) => {
    const filesizeObj = filePathes.reduce((acc, filePath) => {
        const size = getByteSize(filePath);

        if (Array.isArray(acc[size])) {
            acc[size].push(filePath);
        } else {
            acc[size] = [filePath];
        }

        return acc;
    }, {});

    return Object.entries(filesizeObj).map(sizeGroup => sizeGroup[1]);
};
