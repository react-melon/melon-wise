define('melon/TextBox', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('textbox');
    var TextBox = React.createClass({
        displayName: 'TextBox',
        onChange: function onChange(e) {
            var value = e.target.value;
            var onChange = this.props.onChange;
            onChange && onChange(babelHelpers._extends({}, e, { value: value }));
        },
        render: function render() {
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
            return React.createElement('div', { className: cx(this.props).build() }, React.createElement('label', null, label), React.createElement('input', babelHelpers._extends({}, rest, {
                onChange: this.onChange,
                type: 'text'
            })), unit ? React.createElement('label', { className: cx().part('unit').build() }, unit) : null);
        }
    });
    module.exports = TextBox;
});