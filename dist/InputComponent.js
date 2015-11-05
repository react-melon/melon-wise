define('melon/InputComponent', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './common/util/Validity',
    './Validator',
    './Component',
    './Validity'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Validity = require('./common/util/Validity');
    var Validator = require('./Validator');
    var Component = require('./Component');
    var ValidityLabel = require('./Validity');
    var InputComponent = function (_Component) {
        babelHelpers.inherits(InputComponent, _Component);
        babelHelpers.createClass(InputComponent, null, [{
                key: 'displayName',
                value: 'InputComponent',
                enumerable: true
            }]);
        function InputComponent(props) {
            babelHelpers.classCallCheck(this, InputComponent);
            _Component.call(this, props);
            var rawValue = props.rawValue || props.defaultRawValue;
            var value = props.value || props.defaultValue;
            if (rawValue == null) {
                rawValue = this.parseValue(value);
            }
            this.state = { rawValue: rawValue };
        }
        InputComponent.prototype.componentDidMount = function componentDidMount() {
            var form = this.context.form;
            if (form) {
                form.attach(this);
            }
        };
        InputComponent.prototype.componentWillUnmount = function componentWillUnmount() {
            var form = this.context.form;
            if (form) {
                form.detach(this);
            }
        };
        InputComponent.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
            var rawValue = props.rawValue == null ? this.parseValue(props.value) : props.rawValue;
            if (this.props.rawValue === rawValue || !this.isControlled()) {
                return;
            }
            var value = this.stringifyValue(rawValue);
            var validity = this.checkValidity(value);
            this.setState({ rawValue: rawValue });
            this.showValidity(validity);
        };
        InputComponent.prototype.isControlled = function isControlled() {
            var props = this.props;
            var value = props.rawValue || props.value;
            return props.disabled || props.readOnly || value != null && props.onChange;
        };
        InputComponent.prototype.getRawValue = function getRawValue() {
            return this.state.rawValue;
        };
        InputComponent.prototype.getValue = function getValue() {
            return this.stringifyValue(this.getRawValue());
        };
        InputComponent.prototype.parseValue = function parseValue(value) {
            return value;
        };
        InputComponent.prototype.stringifyValue = function stringifyValue(rawValue) {
            return rawValue ? rawValue + '' : '';
        };
        InputComponent.prototype.onFocus = function onFocus(e) {
            if (this.willValidate('focus')) {
                this.validate(e.getValue());
            }
        };
        InputComponent.prototype.onChange = function onChange(e) {
            if (this.willValidate('change')) {
                this.validate(e.value);
            }
        };
        InputComponent.prototype.onBlur = function onBlur(e) {
            if (this.willValidate('blur')) {
                this.validate(this.getValue());
            }
        };
        InputComponent.prototype.getStates = function getStates(props) {
            var states = _Component.prototype.getStates.call(this, props);
            var state = this.state;
            var isValid = state.isValid;
            if (state.isValidating) {
                states.isValidating = true;
            } else if (typeof isValid === 'boolean') {
                states.invalid = !isValid;
                states.valid = isValid;
            }
            states.readOnly = !!props.readOnly;
            return states;
        };
        InputComponent.prototype.checkValidity = function checkValidity(value) {
            var _this = this;
            var validity = new Validity();
            var rules = Validator.resolve(this);
            rules.forEach(function (rule) {
                validity.addState(rule.name, rule.check(value, _this));
            });
            return validity;
        };
        InputComponent.prototype.getValidateMessage = function getValidateMessage(validity) {
            var isValid = validity.isValid();
            return isValid ? '' : validity.getErrorMessage();
        };
        InputComponent.prototype.showValidity = function showValidity(validity) {
            var isValid = validity.isValid();
            this.setState({
                isValid: isValid,
                validateMessage: this.getValidateMessage(validity)
            });
        };
        InputComponent.prototype.hideValidity = function hideValidity() {
            this.setState({
                isValid: void 0,
                validateMessage: ''
            });
        };
        InputComponent.prototype.validate = function validate(value) {
            var validity = this.checkValidity(value);
            if (validity.isValid()) {
                this.props.onValid && this.props.onValid({
                    type: 'valid',
                    target: this,
                    validity: validity
                });
            } else {
                this.props.onInvalid && this.props.onInvalid({
                    type: 'invalid',
                    target: this,
                    validity: validity
                });
            }
            this.showValidity(validity);
            return validity;
        };
        InputComponent.prototype.renderValidateMessage = function renderValidateMessage() {
            var validateMessage = this.state.validateMessage;
            return React.createElement(ValidityLabel, {
                message: validateMessage,
                isValid: this.state.isValid
            });
        };
        InputComponent.prototype.willValidate = function willValidate(eventName) {
            return this.props.validateEvents.indexOf(eventName) !== -1;
        };
        return InputComponent;
    }(Component);
    var PropTypes = React.PropTypes;
    InputComponent.defaultProps = {
        defaultValue: '',
        validateEvents: ['blur']
    };
    InputComponent.contextTypes = { form: PropTypes.object };
    InputComponent.propTypes = {
        required: PropTypes.bool,
        name: PropTypes.string,
        max: PropTypes.number,
        min: PropTypes.number,
        maxLength: PropTypes.number,
        minLength: PropTypes.number,
        maxByteLength: PropTypes.number,
        minByteLength: PropTypes.number,
        pattern: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    };
    module.exports = InputComponent;
});