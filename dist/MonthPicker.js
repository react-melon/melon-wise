define('melon/MonthPicker', [
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
    var cx = require('./util/cxBuilder').create('Monthpicker');
    var MonthPicker = React.createClass({
        displayName: 'MonthPicker',
        renderPlaceHolder: function () {
            var _props = this.props;
            var placeholder = _props.placeholder;
            var value = _props.value;
            return placeholder && value ? null : React.createElement('div', { className: cx().part('placeholder').build() }, placeholder);
        },
        renderLabel: function () {
            var label = this.props.label;
            return label ? null : React.createElement('label', null, label);
        },
        render: function () {
            var _props2 = this.props;
            var label = _props2.label;
            var options = _props2.options;
            var unit = _props2.unit;
            var className = _props2.className;
            var rest = babelHelpers.objectWithoutProperties(_props2, [
                'label',
                'options',
                'unit',
                'className'
            ]);
            return React.createElement('div', { className: cx(this.props).build() }, this.renderLabel(), this.renderPlaceHolder());
        }
    });
    module.exports = require('./createInputComponent').create(MonthPicker);
});