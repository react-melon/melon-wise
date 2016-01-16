define('melon-wise/lib/Select', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder',
    './mixins/NativeInputMixin',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('Select');
    var nativeInputMixin = require('./mixins/NativeInputMixin');
    var Select = React.createClass({
        displayName: 'Select',
        mixins: [nativeInputMixin],
        renderLabel: function () {
            var label = this.props.label;
            return label ? React.createElement('label', null, label) : null;
        },
        renderResult: function () {
            var _props = this.props;
            var value = _props.value;
            var children = _props.children;
            var result = '';
            React.Children.forEach(children, function (child) {
                if (child.props.value === value) {
                    result = child.props.label;
                }
            });
            return value ? React.createElement('div', { className: cx().part('result').build() }, result) : null;
        },
        render: function () {
            var _this = this;
            var _props2 = this.props;
            var label = _props2.label;
            var options = _props2.options;
            var className = _props2.className;
            var children = _props2.children;
            var value = _props2.value;
            var rest = babelHelpers.objectWithoutProperties(_props2, [
                'label',
                'options',
                'className',
                'children',
                'value'
            ]);
            return React.createElement('div', { className: cx(this.props).build() }, this.renderLabel(), this.renderResult(), React.createElement('select', babelHelpers._extends({}, rest, {
                value: value,
                onChange: this.onChange,
                ref: function (input) {
                    _this.input = input;
                }
            }), value ? null : React.createElement('option', {
                label: '\u672A\u9009\u62E9',
                value: ''
            }), children));
        }
    });
    var PropTypes = React.PropTypes;
    Select.propTypes = {
        onChange: PropTypes.func,
        defaultValue: PropTypes.string
    };
    Select.defaultProps = { defaultValue: '' };
    Select = require('./createInputComponent').create(Select);
    Select.createOptions = function (dataSource) {
        return dataSource.map(function (option, index) {
            return React.createElement('option', {
                key: index,
                disabled: option.disabled,
                value: option.value,
                label: option.name
            });
        });
    };
    module.exports = Select;
});