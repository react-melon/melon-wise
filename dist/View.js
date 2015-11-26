define('melon/View', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('View');
    function View(props) {
        return React.createElement('div', babelHelpers._extends({}, props, { className: cx(props).build() }));
    }
    module.exports = View;
});