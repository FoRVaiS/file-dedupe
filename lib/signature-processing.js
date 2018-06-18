module.exports = run => (target, excludes, opts) => {
    if (!target || typeof target !== 'string') throw new Error('You must define a target directory!');

    const $target = target;
    const $excludes = Array.isArray(excludes) ? excludes : [];
    const $opts = Array.isArray(excludes) ? opts : excludes;

    return run($target, $excludes, $opts);
};
