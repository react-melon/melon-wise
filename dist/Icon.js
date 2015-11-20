define('melon/Icon', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Icon = function (_Component) {
        babelHelpers.inherits(Icon, _Component);
        function Icon() {
            babelHelpers.classCallCheck(this, Icon);
            _Component.apply(this, arguments);
        }
        Icon.prototype.render = function render() {
            return React.createElement('i', babelHelpers._extends({}, this.props, { className: this.getClassName() }), this.props.children);
        };
        babelHelpers.createClass(Icon, null, [{
                key: 'displayName',
                value: 'Icon',
                enumerable: true
            }]);
        return Icon;
    }(Component);
    module.exports = Icon;
});