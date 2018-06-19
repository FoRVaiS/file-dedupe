module.exports = run => (source, target, excludes, opts) => {
    const isObject = obj => typeof obj === 'object' && !Array.isArray(obj);

    if (!source || typeof source !== 'string') throw new Error('You must define a target directory!');

    const $source = typeof target === 'string' ? source : '';
    const $target = typeof target === 'string' ? target || '' : source;

    let $excludes = excludes || [];
    let $opts = opts || {};

    if (Array.isArray(target)) {
        $excludes = target;
    } else if (isObject(excludes)) {
        $excludes = [];
    }

    if (isObject(target)) {
        $opts = target;
    } else if (isObject(excludes)) {
        $opts = excludes;
    }

    return run($source, $target, $excludes, $opts);
};
