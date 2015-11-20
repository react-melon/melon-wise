define('melon/Component', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './config',
    './util/classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var config = require('./config');
    var cx = require('./util/classname');
    function joinByStrike() {
        var result = [];
        for (var i = 0, len = arguments.length; i < len; ++i) {
            var arg = arguments[i];
            if (arg) {
                result.push(arg);
            }
        }
        return result.join('-');
    }
    var Component = function (_React$Component) {
        babelHelpers.inherits(Component, _React$Component);
        function Component(props) {
            babelHelpers.classCallCheck(this, Component);
            _React$Component.call(this, props);
            this.type = this.constructor.displayName.toLowerCase();
        }
        Component.prototype.getClassName = function getClassName() {
            return cx.create(this.props.className, this.getPartClassName(), this.getVariantClasses(), this.getStateClasses());
        };
        Component.prototype.getPartClassName = function getPartClassName(part) {
            return joinByStrike(config.COMPONENT_CLASS_PREFIX, this.type, part);
        };
        Component.prototype.getVariants = function getVariants(props) {
            var variants = props.variants ? props.variants.slice() : [];
            var size = props.size;
            if (config.COMPONENT_SIZES.indexOf(size) !== -1) {
                variants.push('size-' + size);
            }
            return variants;
        };
        Component.prototype.getVariantClasses = function getVariantClasses() {
            var variants = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
            variants = this.getVariants(this.props).concat(variants);
            return variants.map(function (variant) {
                return joinByStrike(config.COMPONENT_VARIANT_PREFIX, variant);
            });
        };
        Component.prototype.getVariantClassName = function getVariantClassName() {
            var props = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            var variants = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
            return this.getVariantClasses(props, variants).join(' ');
        };
        Component.prototype.getStates = function getStates(props) {
            var states = props.states;
            var hidden = props.hidden;
            var disabled = props.disabled;
            return babelHelpers._extends({}, states, {
                hidden: hidden,
                disabled: disabled
            });
        };
        Component.prototype.getStateClasses = function getStateClasses() {
            var states = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            states = babelHelpers._extends({}, this.getStates(this.props), states);
            return Object.keys(states).reduce(function (result, name) {
                var state = states[name];
                if (state) {
                    result.push(joinByStrike(config.COMPONENT_STATE_PREFIX, name));
                }
                return result;
            }, []);
        };
        Component.prototype.getStateClassName = function getStateClassName() {
            return this.getStateClasses().join(' ');
        };
        Component.prototype.fire = function fire(eventName, params) {
            var event = this.props['on' + eventName];
            event && event(params);
        };
        return Component;
    }(React.Component);
    var PropTypes = React.PropTypes;
    Component.propTypes = {
        variants: PropTypes.arrayOf(PropTypes.string),
        states: PropTypes.object,
        size: PropTypes.oneOf(require('./config').COMPONENT_SIZES),
        disabled: PropTypes.bool,
        hidden: PropTypes.bool
    };
    module.exports = Component;
});