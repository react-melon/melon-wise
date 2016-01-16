var camelize = require('./camelize');
module.exports = function (source) {
    if (!source) {
        return '';
    }
    return '' + source.charAt(0).toUpperCase() + camelize(source.slice(1));
};