define('melon/Button', [
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
    var Button = function (_Component) {
        babelHelpers.inherits(Button, _Component);
        function Button() {
            babelHelpers.classCallCheck(this, Button);
            _Component.apply(this, arguments);
        }
        Button.prototype.render = function render() {
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
        babelHelpers.createClass(Button, null, [{
                key: 'displayName',
                value: 'Button',
                enumerable: true
            }]);
        return Button;
    }(Component);
    module.exports = Button;
});