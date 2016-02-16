define('melon-wise/lib/createInputComponent', [
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
    var defaultValidator = require('./Validator');
    var PropTypes = React.PropTypes;
    var InputComponent = React.createClass({
        displayName: 'InputComponent',
        propTypes: {
            name: PropTypes.string,
            pointer: PropTypes.string,
            validate: PropTypes.func,
            renderErrorMessage: PropTypes.func,
            onChange: PropTypes.func,
            validator: PropTypes.shape({ validate: PropTypes.func.isRequired })
        },
        getDefaultProps: function getDefaultProps() {
            return { defaultValue: '' };
        },
        getInitialState: function getInitialState() {
            var name = this.props.name;
            this.validator = this.props.validator || this.context.validator || defaultValidator;
            var pointer = this.context.pointer;
            this.pointer = name != null && pointer ? '' + this.context.pointer + name : null;
            var _props = this.props;
            var value = _props.value;
            var defaultValue = _props.defaultValue;
            return { value: value != null ? value : defaultValue };
        },
        contextTypes: {
            pointer: PropTypes.string,
            validator: PropTypes.shape({ validate: PropTypes.func.isRequired }),
            attachForm: PropTypes.func,
            detachForm: PropTypes.func
        },
        childContextTypes: { pointer: PropTypes.string },
        getChildContext: function getChildContext() {
            var pointer = this.pointer;
            return { pointer: pointer ? pointer + '/' : null };
        },
        componentDidMount: function componentDidMount() {
            var attachForm = this.context.attachForm;
            if (attachForm) {
                attachForm(this);
            }
        },
        componentWillUnmount: function componentWillUnmount() {
            var detachForm = this.context.detachForm;
            if (detachForm) {
                detachForm(this);
            }
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var customValidity = nextProps.customValidity;
            var defaultValue = nextProps.defaultValue;
            var _nextProps$value = nextProps.value;
            var value = _nextProps$value === undefined ? defaultValue : _nextProps$value;
            if (value !== this.getValue() || customValidity !== this.props.customValidity) {
                this.setState({
                    value: value,
                    validity: customValidity ? this.validator.createCustomValidity(customValidity) : this.checkValidity(value)
                });
            }
        },
        validate: function validate(value) {
            var validity = this.checkValidity(value);
            this.setState({ validity: validity });
            return validity;
        },
        checkValidity: function checkValidity(value) {
            return this.validator.validate(value, this);
        },
        onChange: function onChange(e) {
            var onChange = this.props.onChange;
            if (onChange) {
                onChange(e);
                return;
            }
            var value = e.value;
            if (value === this.state.value) {
                return;
            }
            var customValidity = this.props.customValidity;
            this.setState({
                value: value,
                validity: customValidity ? this.validator.createCustomValidity(customValidity) : this.checkValidity(value)
            });
        },
        getValue: function getValue() {
            var child = this.child;
            if (child) {
                if (typeof child.getValue === 'function') {
                    return child.getValue();
                }
                if (child.props.value) {
                    return child.props.value;
                }
            }
            return this.state.value;
        },
        render: function render() {
            var _this = this;
            var props = this.props;
            var onChange = this.onChange;
            var pointer = this.pointer;
            var children = props.children;
            var _props$validate = props.validate;
            var validate = _props$validate === undefined ? this.validate : _props$validate;
            var _props$states = props.states;
            var states = _props$states === undefined ? {} : _props$states;
            var restProps = babelHelpers.objectWithoutProperties(props, [
                'children',
                'validate',
                'states'
            ]);
            var _state = this.state;
            var value = _state.value;
            var validity = _state.validity;
            if (value === '') {
                states.empty = true;
            }
            if (validity && !validity.isValid()) {
                states.invalid = true;
            }
            var input = React.cloneElement(React.Children.only(children), babelHelpers.extends({}, restProps, {
                pointer: pointer,
                validity: validity,
                validate: validate,
                value: value,
                states: states,
                onChange: onChange,
                ref: function ref(child) {
                    if (child) {
                        _this.child = child;
                    }
                }
            }));
            return input;
        }
    });
    exports.isValidInputElement = function (element) {
        return React.isValidElement(element) && element.type === InputComponent;
    };
    exports.create = function (Component) {
        var InputComponentWrapper = React.createClass({
            displayName: 'InputComponentWrapper',
            render: function render() {
                var props = this.props;
                var children = props.children;
                var rest = babelHelpers.objectWithoutProperties(props, ['children']);
                return React.createElement(InputComponent, rest, React.createElement(Component, rest, children));
            }
        });
        InputComponentWrapper.displayName = Component.displayName + 'InputWrapper';
        InputComponentWrapper.defaultProps = Component.defaultProps;
        InputComponentWrapper.propTypes = Component.propTypes;
        return InputComponentWrapper;
    };
});