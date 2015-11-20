define('melon/tab/Panel', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../Component'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var Component = require('../Component');
    var TabPanel = function (_Component) {
        babelHelpers.inherits(TabPanel, _Component);
        function TabPanel() {
            babelHelpers.classCallCheck(this, TabPanel);
            _Component.apply(this, arguments);
        }
        TabPanel.prototype.getStates = function getStates(props) {
            var states = {};
            if (props.active) {
                states.active = true;
            }
            return states;
        };
        TabPanel.prototype.render = function render() {
            var props = this.props;
            return React.createElement('div', babelHelpers._extends({}, props, { className: this.getClassName() }), props.children);
        };
        babelHelpers.createClass(TabPanel, null, [{
                key: 'displayName',
                value: 'TabPanel',
                enumerable: true
            }]);
        return TabPanel;
    }(Component);
    TabPanel.propTypes = { active: React.PropTypes.bool };
    module.exports = TabPanel;
});