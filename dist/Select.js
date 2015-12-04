define('melon/Select', [
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
    var cx = require('./util/cxBuilder').create('Select');
    var nativeInputMixin = require('./minxins/NativeInputMixin');
    var Select = React.createClass({
        displayName: 'Select',
        mixins: [nativeInputMixin],
        renderLabel: function () {
            var label = this.props.label;
            return label ? React.createElement('label', null, label) : null;
        },
        render: function () {
            var _this = this;
            var _props = this.props;
            var label = _props.label;
            var options = _props.options;
            var className = _props.className;
            var children = _props.children;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'label',
                'options',
                'className',
                'children'
            ]);
            return React.createElement('div', { className: cx(this.props).build() }, this.renderLabel(), React.createElement('select', babelHelpers._extends({}, rest, {
                onChange: this.onChange,
                ref: function (input) {
                    _this.input = input;
                }
            }), children));
        }
    });
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