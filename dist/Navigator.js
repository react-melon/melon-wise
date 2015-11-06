define('melon/Navigator', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './Tappable'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Tapable = require('./Tappable');
    var Navigator = function (_Component) {
        babelHelpers.inherits(Navigator, _Component);
        function Navigator() {
            babelHelpers.classCallCheck(this, Navigator);
            _Component.apply(this, arguments);
        }
        Navigator.prototype.render = function render() {
            var _props = this.props;
            var label = _props.label;
            var children = _props.children;
            var other = babelHelpers.objectWithoutProperties(_props, [
                'label',
                'children'
            ]);
            var content = label || children;
            return React.createElement(Tapable, babelHelpers._extends({}, other, {
                classBase: 'variant',
                className: this.getClassName()
            }), content);
        };
        babelHelpers.createClass(Navigator, null, [{
                key: 'displayName',
                value: 'Navigator',
                enumerable: true
            }]);
        return Navigator;
    }(Component);
    module.exports = Navigator;
});