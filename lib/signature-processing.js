module.exports = run => (directory, excludes, opts) => {
    if (!directory || typeof directory !== 'string') throw new Error('You must define a target directory!');

    const $directory = directory;
    const $excludes = Array.isArray(excludes) ? excludes : [];
    const $opts = Array.isArray(excludes) ? opts : excludes;

    return run($directory, $excludes, $opts);
};
