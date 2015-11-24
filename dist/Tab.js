define('melon/Tab', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/cxBuilder',
    './tab/Item',
    './tab/Panel',
    './util/dom'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var cx = require('./util/cxBuilder').create('Tab');
    var Item = require('./tab/Item');
    var TabPanel = require('./tab/Panel');
    var dom = require('./util/dom');
    var PropTypes = React.PropTypes;
    var Tab = React.createClass({
        displayName: 'Tab',
        propTypes: {
            selectedIndex: PropTypes.number,
            onChange: PropTypes.func,
            onBeforeChange: PropTypes.func
        },
        getDefaultProps: function getDefaultProps() {
            return { selectedIndex: 0 };
        },
        getInitialState: function getInitialState() {
            var selectedIndex = this.props.selectedIndex;
            return { selectedIndex: selectedIndex };
        },
        getTabCount: function getTabCount() {
            return React.Children.count(this.props.children);
        },
        getSelected: function getSelected(tab, index) {
            return this.state.selectedIndex === index;
        },
        handleTabClick: function handleTabClick(index, e) {
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
        },
        render: function render() {
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
                    className: cx().part('item').build()
                });
            }, this);
            var InkBarStyles = (_InkBarStyles = { width: percent }, _InkBarStyles[dom.prefixStyle('transform')] = 'translate3d(' + 100 * tabIndex + '%, 0, 0)', _InkBarStyles);
            return React.createElement('section', babelHelpers._extends({}, props, { className: cx(props).build() }), React.createElement('div', { className: cx().part('bar').build() }, tabs, React.createElement('i', {
                className: cx().part('inkbar').build(),
                style: InkBarStyles
            })), tabContent);
        }
    });
    Tab.Item = Item;
    module.exports = Tab;
});