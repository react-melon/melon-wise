define('melon/Mask', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('Mask');
    var PropTypes = React.PropTypes;
    var Mask = function (props) {
        var show = props.show;
        return React.createElement('div', babelHelpers._extends({}, props, { className: cx(props).addStates({ show: show }).build() }));
    };
    Mask.propTypes = { show: PropTypes.bool };
    module.exports = Mask;
});