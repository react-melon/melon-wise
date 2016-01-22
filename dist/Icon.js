define('melon-wise/lib/Icon', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('melon-classname').create('Icon');
    function Icon(props) {
        return React.createElement('i', babelHelpers._extends({}, props, { className: cx(props).build() }));
    }
    module.exports = Icon;
});