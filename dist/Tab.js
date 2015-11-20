define('melon/Tab', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './Component',
    './tab/Item',
    './tab/Panel',
    './util/dom'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var Component = require('./Component');
    var Item = require('./tab/Item');
    var TabPanel = require('./tab/Panel');
    var dom = require('./util/dom');
    var Tab = function (_Component) {
        babelHelpers.inherits(Tab, _Component);
        babelHelpers.createClass(Tab, null, [{
                key: 'displayName',
                value: 'Tab',
                enumerable: true
            }]);
        function Tab(props) {
            babelHelpers.classCallCheck(this, Tab);
            _Component.call(this, props);
            var selectedIndex = this.props.selectedIndex;
            this.state = { selectedIndex: selectedIndex };
        }
        Tab.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            if (nextProps.selectedIndex !== this.state.selectedIndex) {
                this.setState({ selectedIndex: nextProps.selectedIndex });
            }
        };
        Tab.prototype.getTabCount = function getTabCount() {
            return React.Children.count(this.props.children);
        };
        Tab.prototype.getSelected = function getSelected(tab, index) {
            return this.state.selectedIndex === index;
        };
        Tab.prototype.handleTabClick = function handleTabClick(index, e) {
            if (index === this.state.selectedIndex) {
                return;
            }
            var onBeforeChange = this.props.onBeforeChange;
            if (onBeforeChange) {
                var cancel = onBeforeChange(index, e);
                if (cancel === false) {
                    return;
                }
            }
            this.setState({ selectedIndex: index }, function () {
                this.props.onChange && this.props.onChange({
                    target: this,
                    selectedIndex: index
                });
            });
        };
        Tab.prototype.render = function render() {
            var _InkBarStyles;
            var props = this.props;
            var percent = 1 / this.getTabCount() * 100 + '%';
            var tabIndex = 0;
            var tabContent = [];
            var tabs = React.Children.map(props.children, function (tab, index) {
                var selected = this.getSelected(tab, index);
                var _tab$props = tab.props;
                var disabled = _tab$props.disabled;
                var children = _tab$props.children;
                if (selected) {
                    tabIndex = index;
                    tabContent = React.createElement(TabPanel, {
                        key: index,
                        active: selected
                    }, children);
                }
                return React.cloneElement(tab, {
                    key: index,
                    selected: selected,
                    disabled: disabled,
                    tabIndex: index,
                    style: { width: percent },
                    onTap: disabled ? null : this.handleTabClick.bind(this, index),
                    className: this.getPartClassName('item')
                });
            }, this);
            var InkBarStyles = (_InkBarStyles = { width: percent }, _InkBarStyles[dom.prefixStyle('transform')] = 'translate3d(' + 100 * tabIndex + '%, 0, 0)', _InkBarStyles);
            return React.createElement('section', babelHelpers._extends({}, props, { className: this.getClassName() }), React.createElement('div', { className: this.getPartClassName('bar') }, tabs, React.createElement('i', {
                className: this.getPartClassName('inkbar'),
                style: InkBarStyles
            })), tabContent);
        };
        return Tab;
    }(Component);
    Tab.propTypes = {
        selectedIndex: React.PropTypes.number,
        onChange: React.PropTypes.func,
        onBeforeChange: React.PropTypes.func
    };
    Tab.defaultProps = { selectedIndex: 0 };
    Tab.Item = Item;
    module.exports = Tab;
});