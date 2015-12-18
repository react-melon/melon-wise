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
        onFocus: function (e) {
            var target = e.target;
            var onFocus = this.props.onFocus;
            setTimeout(function () {
                target.scrollIntoViewIfNeeded(true);
            }, 0);
            onFocus && onFocus();
        },
        renderLabel: function () {
            var label = this.props.label;
            return label ? React.createElement('label', null, label) : null;
        },
        render: function () {
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
            return React.createElement('div', { className: cx(this.props).build() }, this.renderLabel(), React.createElement('input', babelHelpers._extends({}, rest, {
                value: value,
                onChange: this.onChange,
                onBlur: this.onBlur,
                onFocus: this.onFocus,
                ref: function (input) {
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