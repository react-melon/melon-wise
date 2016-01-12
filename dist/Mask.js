define('melon/Mask', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    exports.__esModule = true;
    var React = require('react');
    var cx = require('./util/cxBuilder').create('Mask');
    var PropTypes = React.PropTypes;
    var Mask = function () {
        function Mask() {
            babelHelpers.classCallCheck(this, Mask);
        }
        Mask.prototype.render = function render() {
            var props = this.props;
            var show = props.show;
            return React.createElement('div', babelHelpers._extends({}, props, { className: cx(props).addStates({ show: show }).build() }));
        };
        babelHelpers.createClass(Mask, null, [{
                key: 'propTypes',
                value: { show: PropTypes.bool },
                enumerable: true
            }]);
        return Mask;
    }();
    exports.default = Mask;
    module.exports = exports.default;
});