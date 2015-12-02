define('melon/Select', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder',
    './createInputComponent'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('Select');
    var Select = React.createClass({
        displayName: 'Select',
        onChange: function (e) {
            var value = e.target.value;
            var onChange = this.props.onChange;
            onChange({
                type: 'change',
                target: this,
                value: value
            });
        },
        render: function () {
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
            return React.createElement('div', { className: cx(this.props).build() }, React.createElement('label', null, label), React.createElement('select', babelHelpers._extends({}, rest, { onChange: this.onChange }), children));
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