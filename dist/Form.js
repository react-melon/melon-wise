define('melon-wise/lib/Form', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Validator'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var validator = require('./Validator');
    var PropTypes = React.PropTypes;
    var Form = function (_React$Component) {
        babelHelpers.inherits(Form, _React$Component);
        babelHelpers.createClass(Form, null, [{
                key: 'displayName',
                value: 'Form',
                enumerable: true
            }]);
        function Form(props) {
            babelHelpers.classCallCheck(this, Form);
            _React$Component.call(this, props);
            this.onSubmit = this.onSubmit.bind(this);
            this.addField = this.addField.bind(this);
            this.removeField = this.removeField.bind(this);
            this.fields = [];
        }
        Form.prototype.getChildContext = function getChildContext() {
            return {
                pointer: '/',
                attachForm: this.addField,
                detachForm: this.removeField,
                validator: this.props.validator
            };
        };
        Form.prototype.componentWillUnmount = function componentWillUnmount() {
            this.fields.length = 0;
            this.fields = null;
        };
        Form.prototype.addField = function addField(field) {
            this.fields.push(field);
        };
        Form.prototype.removeField = function removeField(field) {
            var fields = this.fields;
            if (fields) {
                this.fields = this.fields.filter(function (f) {
                    return f !== field;
                });
            }
        };
        Form.prototype.isValidFormField = function isValidFormField(field) {
            var value = field.getValue();
            var pointer = field.pointer;
            var props = field.props;
            var name = props.name;
            var disabled = props.disabled;
            return name && !disabled && value != null && pointer && pointer.lastIndexOf('/') === 0;
        };
        Form.prototype.getData = function getData() {
            var _this = this;
            return this.fields.reduce(function (data, field) {
                if (_this.isValidFormField(field)) {
                    data[field.props.name] = field.getValue();
                }
                return data;
            }, {});
        };
        Form.prototype.validate = function validate() {
            return this.checkValidity().isValid;
        };
        Form.prototype.checkValidity = function checkValidity() {
            var _this2 = this;
            return this.fields.reduce(function (formValidity, field) {
                if (!_this2.isValidFormField(field)) {
                    return formValidity;
                }
                var value = field.getValue();
                var validity = field.validate(value);
                return {
                    isValid: formValidity.isValid && validity.isValid(),
                    errors: [].concat(formValidity.errors, validity.states.filter(function (state) {
                        return !state.isValid;
                    }))
                };
            }, {
                isValid: true,
                errors: []
            });
        };
        Form.prototype.onSubmit = function onSubmit(e) {
            var _props = this.props;
            var onSubmit = _props.onSubmit;
            var noValidate = _props.noValidate;
            if (!noValidate) {
                if (!this.validate()) {
                    e.preventDefault();
                    return;
                }
            }
            if (onSubmit) {
                e.data = this.getData();
                onSubmit(e);
            }
        };
        Form.prototype.render = function render() {
            var props = this.props;
            return React.createElement('form', babelHelpers._extends({}, props, { onSubmit: this.onSubmit }));
        };
        babelHelpers.createClass(Form, null, [
            {
                key: 'propTypes',
                value: {
                    onSumbit: PropTypes.func,
                    target: PropTypes.string,
                    action: PropTypes.string,
                    method: PropTypes.oneOf([
                        'POST',
                        'GET'
                    ]),
                    validator: PropTypes.shape({ validate: PropTypes.func.isRequired })
                },
                enumerable: true
            },
            {
                key: 'defaultProps',
                value: { validator: validator },
                enumerable: true
            },
            {
                key: 'childContextTypes',
                value: {
                    attachForm: PropTypes.func,
                    detachForm: PropTypes.func,
                    validator: PropTypes.shape({ validate: PropTypes.func.isRequired }),
                    pointer: PropTypes.string.isRequired
                },
                enumerable: true
            }
        ]);
        return Form;
    }(React.Component);
    module.exports = Form;
});