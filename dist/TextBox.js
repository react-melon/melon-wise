define('melon/TextBox', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder',
    './minxins/NativeInputMixin',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('textbox');
    var nativeInputMixin = require('./minxins/NativeInputMixin');
    var TextBox = React.createClass({
        displayName: 'TextBox',
        mixins: [nativeInputMixin],
        renderPlaceHolder: function () {
            var _props = this.props;
            var placeholder = _props.placeholder;
            var value = _props.value;
            return placeholder && value ? React.createElement('div', { className: cx().part('placeholder').build() }, placeholder) : null;
        },
        renderLabel: function () {
            var label = this.props.label;
            return label ? React.createElement('label', null, label) : null;
        },
        render: function () {
            var _this = this;
            var _props2 = this.props;
            var unit = _props2.unit;
            var value = _props2.value;
            var className = _props2.className;
            var rest = babelHelpers.objectWithoutProperties(_props2, [
                'unit',
                'value',
                'className'
            ]);
            return React.createElement('div', { className: cx(this.props).build() }, this.renderLabel(), this.renderPlaceHolder(), React.createElement('input', babelHelpers._extends({}, rest, {
                value: value,
                onChange: this.onChange,
                ref: function (input) {
                    _this.input = input;
                }
            })), unit ? React.createElement('div', { className: cx().part('unit').build() }, unit) : null);
        }
    });
    module.exports = require('./createInputComponent').create(TextBox);
});