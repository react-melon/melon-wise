define('melon/Button', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './ripples/TouchRipple'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var TouchRipple = require('./ripples/TouchRipple');
    var Button = function (_Component) {
        babelHelpers.inherits(Button, _Component);
        function Button() {
            babelHelpers.classCallCheck(this, Button);
            _Component.apply(this, arguments);
        }
        Button.prototype.getVariants = function getVariants(props) {
            var variants = _Component.prototype.getVariants.call(this, props);
            if (props.hasRipple) {
                variants.push('ripple');
            }
            return variants;
        };
        Button.prototype.render = function render() {
            var _props = this.props;
            var hasRipple = _props.hasRipple;
            var label = _props.label;
            var children = _props.children;
            var other = babelHelpers.objectWithoutProperties(_props, [
                'hasRipple',
                'label',
                'children'
            ]);
            var content = label || children;
            var useRipple = hasRipple && !other.disabled;
            var style = useRipple ? { position: 'relative' } : {};
            return React.createElement('button', babelHelpers._extends({}, other, {
                className: this.getClassName(),
                style: style
            }), useRipple ? React.createElement(TouchRipple, null) : null, content);
        };
        babelHelpers.createClass(Button, null, [{
                key: 'displayName',
                value: 'Button',
                enumerable: true
            }]);
        return Button;
    }(Component);
    Button.defaultProps = { hasRipple: true };
    Button.propTypes = { hasRipple: React.PropTypes.bool };
    module.exports = Button;
});