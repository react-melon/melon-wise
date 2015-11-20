define('melon/Select', [
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
    var Select = function (_InputComponent) {
        babelHelpers.inherits(Select, _InputComponent);
        babelHelpers.createClass(Select, null, [{
                key: 'displayName',
                value: 'Select',
                enumerable: true
            }]);
        function Select(props) {
            babelHelpers.classCallCheck(this, Select);
            _InputComponent.call(this, props);
            this.onChange = this.onChange.bind(this);
        }
        Select.prototype.onChange = function onChange(e) {
            var value = this.refs.select.value;
            var onChange = this.props.onChange;
            onChange && onChange(babelHelpers._extends({}, e, { value: value }));
        };
        Select.prototype.render = function render() {
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
            return React.createElement('div', { className: this.getClassName() }, React.createElement('label', null, label), React.createElement('select', babelHelpers._extends({}, rest, {
                onChange: this.onChange,
                ref: 'select'
            }), renderOptions()));
        };
        return Select;
    }(InputComponent);
    module.exports = Select;
});