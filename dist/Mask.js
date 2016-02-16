define('melon-wise/lib/Mask', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('Mask');
    var PropTypes = React.PropTypes;
    function Mask(props) {
        var show = props.show;
        return React.createElement('div', babelHelpers.extends({}, props, { className: cx(props).addStates({ show: show }).build() }));
    }
    Mask.propTypes = { show: PropTypes.bool };
    module.exports = Mask;
});