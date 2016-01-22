var babelHelpers = require('./babelHelpers');
var React = require('react');
var cx = require('melon-classname').create('Tab');
var Item = require('./tab/Item');
var TabPanel = require('./tab/Panel');
var PropTypes = React.PropTypes;
var Tab = React.createClass({
    displayName: 'Tab',
    propTypes: {
        selectedIndex: PropTypes.number,
        onChange: PropTypes.func,
        onBeforeChange: PropTypes.func
    },
    getDefaultProps: function () {
        return { selectedIndex: 0 };
    },
    getInitialState: function () {
        var selectedIndex = this.props.selectedIndex;
        return { selectedIndex: selectedIndex };
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({ selectedIndex: nextProps.selectedIndex });
        }
    },
    getTabCount: function () {
        return React.Children.count(this.props.children);
    },
    getSelected: function (tab, index) {
        return this.state.selectedIndex === index;
    },
    handleTabClick: function (index, e) {
        if (index === this.state.selectedIndex) {
            return;
        }
        var _props = this.props;
        var onBeforeChange = _props.onBeforeChange;
        var onChange = _props.onChange;
        e.selectedIndex = index;
        if (onBeforeChange) {
            onBeforeChange(e);
            if (e.isDefaultPrevented()) {
                return;
            }
        }
        this.setState({ selectedIndex: index }, function () {
            onChange && onChange(e);
        });
    },
    render: function () {
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
                tabIndex: index,
                style: { width: percent },
                onTap: disabled ? null : this.handleTabClick.bind(this, index)
            });
        }, this);
        var transform = 'translate3d(' + 100 * tabIndex + '%, 0, 0)';
        var InkBarStyles = {
            width: percent,
            WebkitTransform: transform,
            transform: transform
        };
        return React.createElement('section', babelHelpers._extends({}, props, { className: cx(props).build() }), React.createElement('div', { className: cx().part('bar').build() }, tabs, React.createElement('i', {
            className: cx().part('inkbar').build(),
            style: InkBarStyles
        })), tabContent);
    }
});
Tab.Item = Item;
module.exports = Tab;