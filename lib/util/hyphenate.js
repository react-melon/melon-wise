module.exports = function (source) {
    return source.replace(/[A-Z]/g, function ($0) {
        return '-' + $0;
    }).slice(1).toLowerCase();
};