define('melon/Select', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('select');
    var Select = React.createClass({
        displayName: 'Select',
        onChange: function onChange(e) {
            var value = e.target.value;
            var onChange = this.props.onChange;
            onChange && onChange(babelHelpers._extends({}, e, { value: value }));
        },
        render: function render() {
            var _props = this.props;
            var label = _props.label;
            var options = _props.options;
            var renderOptions = _props.renderOptions;
            var className = _props.className;
            var rest = babelHelpers.objectWithoutProperties(_props, [
                'label',
                'options',
                'renderOptions',
                'className'
            ]);
            return React.createElement('div', { className: cx(this.props).build() }, React.createElement('label', null, label), React.createElement('select', babelHelpers._extends({}, rest, { onChange: this.onChange }), renderOptions()));
        }
    });
    module.exports = Select;
});