const fsDef = require('fs');

module.exports = ({
    fs = fsDef,
} = {}) => async ({ duplicates }) => {
    const deleteOperations = duplicates.map(duplicate => new Promise((resolve, reject) => {
        fs.unlink(duplicate, (err) => {
            if (err) reject(err);
            resolve();
        });
    }));

    await Promise.all(deleteOperations);
};
