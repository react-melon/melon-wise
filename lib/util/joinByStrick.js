function joinByStrike() {
    var result = [];
    for (var i = 0, len = arguments.length; i < len; ++i) {
        var arg = arguments[i];
        if (arg) {
            result.push(arg);
        }
    }
    return result.join('-');
}
module.exports = joinByStrike;