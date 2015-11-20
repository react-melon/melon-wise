define('melon/tab/Item', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component',
    '../Tappable'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var Tappable = require('../Tappable');
    var TabItem = function (_Component) {
        babelHelpers.inherits(TabItem, _Component);
        babelHelpers.createClass(TabItem, null, [{
                key: 'displayName',
                value: 'TabItem',
                enumerable: true
            }]);
        function TabItem(props) {
            babelHelpers.classCallCheck(this, TabItem);
            _Component.call(this, props);
        }
        TabItem.prototype.getStates = function getStates(props) {
            var states = {};
            if (props.selected) {
                states.selected = true;
            }
            if (props.disabled) {
                states.disabled = true;
            }
            return states;
        };
        TabItem.prototype.render = function render() {
            var props = this.props;
            return React.createElement(Tappable, babelHelpers._extends({}, props, { className: this.getClassName() }), props.label);
        };
        return TabItem;
    }(Component);
    TabItem.propTypes = {
        disabled: React.PropTypes.bool,
        type: React.PropTypes.string,
        selected: React.PropTypes.bool,
        label: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.element
        ]),
        onClick: React.PropTypes.func,
        tabIndex: React.PropTypes.number
    };
    module.exports = TabItem;
});