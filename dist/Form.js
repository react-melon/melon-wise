define('melon-wise/lib/Form', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Validator'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var validator = require('./Validator');
    var PropTypes = React.PropTypes;
    var Form = function (_React$Component) {
        babelHelpers.inherits(Form, _React$Component);
        function Form(props) {
            babelHelpers.classCallCheck(this, Form);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Form).call(this, props));
            _this.onSubmit = _this.onSubmit.bind(_this);
            _this.addField = _this.addField.bind(_this);
            _this.removeField = _this.removeField.bind(_this);
            _this.fields = [];
            return _this;
        }
        babelHelpers.createClass(Form, [
            {
                key: 'getChildContext',
                value: function getChildContext() {
                    return {
                        pointer: '/',
                        attachForm: this.addField,
                        detachForm: this.removeField,
                        validator: this.props.validator
                    };
                }
            },
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.fields.length = 0;
                    this.fields = null;
                }
            },
            {
                key: 'addField',
                value: function addField(field) {
                    this.fields.push(field);
                }
            },
            {
                key: 'removeField',
                value: function removeField(field) {
                    var fields = this.fields;
                    if (fields) {
                        this.fields = this.fields.filter(function (f) {
                            return f !== field;
                        });
                    }
                }
            },
            {
                key: 'isValidFormField',
                value: function isValidFormField(field) {
                    var value = field.getValue();
                    var pointer = field.pointer;
                    var props = field.props;
                    var name = props.name;
                    var disabled = props.disabled;
                    return name && !disabled && value != null && pointer && pointer.lastIndexOf('/') === 0;
                }
            },
            {
                key: 'getData',
                value: function getData() {
                    var _this2 = this;
                    return this.fields.reduce(function (data, field) {
                        if (_this2.isValidFormField(field)) {
                            data[field.props.name] = field.getValue();
                        }
                        return data;
                    }, {});
                }
            },
            {
                key: 'validate',
                value: function validate() {
                    return this.checkValidity().isValid;
                }
            },
            {
                key: 'checkValidity',
                value: function checkValidity() {
                    var _this3 = this;
                    return this.fields.reduce(function (formValidity, field) {
                        if (!_this3.isValidFormField(field)) {
                            return formValidity;
                        }
                        var value = field.getValue();
                        var validity = field.validate(value);
                        return {
                            isValid: formValidity.isValid && validity.isValid(),
                            errors: [].concat(babelHelpers.toConsumableArray(formValidity.errors), babelHelpers.toConsumableArray(validity.states.filter(function (state) {
                                return !state.isValid;
                            })))
                        };
                    }, {
                        isValid: true,
                        errors: []
                    });
                }
            },
            {
                key: 'onSubmit',
                value: function onSubmit(e) {
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
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return React.createElement('form', babelHelpers.extends({}, props, { onSubmit: this.onSubmit }));
                }
            }
        ]);
        return Form;
    }(React.Component);
    Form.displayName = 'Form';
    Form.propTypes = {
        onSumbit: PropTypes.func,
        target: PropTypes.string,
        action: PropTypes.string,
        method: PropTypes.oneOf([
            'POST',
            'GET'
        ]),
        validator: PropTypes.shape({ validate: PropTypes.func.isRequired })
    };
    Form.defaultProps = { validator: validator };
    Form.childContextTypes = {
        attachForm: PropTypes.func,
        detachForm: PropTypes.func,
        validator: PropTypes.shape({ validate: PropTypes.func.isRequired }),
        pointer: PropTypes.string.isRequired
    };
    module.exports = Form;
});