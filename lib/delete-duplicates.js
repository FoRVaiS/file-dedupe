const fsDef = require('fs');

module.exports = ({
    fs = fsDef,
} = {}) => async ({ duplicates }) => {
    const flattenArray = array => array.reduce((acc, nest) => [...acc, ...nest], []);

    const deleteOperations = flattenArray(Object.values(duplicates))
        .map(duplicate => new Promise((resolve, reject) => {
            fs.unlink(duplicate, (err) => {
                if (err) reject(err);
                resolve();
            });
        }));

    await Promise.all(deleteOperations);
};
