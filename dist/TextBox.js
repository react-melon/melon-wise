define('melon-wise/lib/TextBox', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    './mixins/NativeInputMixin',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('textbox');
    var nativeInputMixin = require('./mixins/NativeInputMixin');
    var TextBox = React.createClass({
        displayName: 'TextBox',
        mixins: [nativeInputMixin],
        componentWillUnmount: function componentWillUnmount() {
            this.timer && clearTimeout(this.timer);
        },
        renderLabel: function renderLabel() {
            var label = this.props.label;
            return label ? React.createElement('label', null, label) : null;
        },
        onFocus: function onFocus(e) {
            var target = e.target;
            var onFocus = this.props.onFocus;
            this.timer = setTimeout(function () {
                target.scrollIntoView();
            }, 100);
            onFocus && onFocus();
        },
        render: function render() {
            var _this = this;
            var _props = this.props;
            var unit = _props.unit;
            var value = _props.value;
            var className = _props.className;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'unit',
                'value',
                'className'
            ]);
            return React.createElement('div', { className: cx(this.props).build() }, this.renderLabel(), React.createElement('input', babelHelpers.extends({}, rest, {
                value: value,
                onChange: this.onChange,
                onBlur: this.onBlur,
                onFocus: this.onFocus,
                autoComplete: 'off',
                ref: function ref(input) {
                    _this.input = input;
                }
            })), unit ? React.createElement('div', { className: cx().part('unit').build() }, unit) : null);
        }
    });
    var PropTypes = React.PropTypes;
    TextBox.propTypes = {
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        defaultValue: PropTypes.string
    };
    TextBox.defaultProps = { defaultValue: '' };
    module.exports = require('./createInputComponent').create(TextBox);
});