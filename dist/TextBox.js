define('melon/TextBox', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './InputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var InputComponent = require('./InputComponent');
    var TextBox = function (_InputComponent) {
        babelHelpers.inherits(TextBox, _InputComponent);
        babelHelpers.createClass(TextBox, null, [{
                key: 'displayName',
                value: 'TextBox',
                enumerable: true
            }]);
        function TextBox(props) {
            babelHelpers.classCallCheck(this, TextBox);
            _InputComponent.call(this, props);
            this.onChange = this.onChange.bind(this);
        }
        TextBox.prototype.onChange = function onChange(e) {
            var value = e.target.value;
            var onChange = this.props.onChange;
            onChange && onChange(babelHelpers._extends({}, e, { value: value }));
        };
        TextBox.prototype.render = function render() {
            var _props = this.props;
            var label = _props.label;
            var options = _props.options;
            var unit = _props.unit;
            var className = _props.className;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'label',
                'options',
                'unit',
                'className'
            ]);
            return React.createElement('div', { className: this.getClassName() }, React.createElement('label', null, label), React.createElement('input', babelHelpers._extends({}, rest, {
                onChange: this.onChange,
                type: 'text'
            })), unit ? React.createElement('label', { className: this.getPartClassName('unit') }, unit) : null);
        };
        return TextBox;
    }(InputComponent);
    module.exports = TextBox;
});