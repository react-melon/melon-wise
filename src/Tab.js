/**
 * @file esui-react/Tab
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./util/cxBuilder').create('Tab');

const Item = require('./tab/Item');
const TabPanel = require('./tab/Panel');

const dom = require('./util/dom');

const {PropTypes} = React;

const Tab = React.createClass({

    displayName: 'Tab',

    propTypes: {
        selectedIndex: PropTypes.number,
        onChange: PropTypes.func,
        onBeforeChange: PropTypes.func
    },

    getDefaultProps() {
        return {
            selectedIndex: 0
        };
    },

    getInitialState() {

        let {selectedIndex} = this.props;

        return {
            selectedIndex: selectedIndex
        };

    },

    getTabCount() {
        return React.Children.count(this.props.children);
    },

    getSelected(tab, index) {
        return this.state.selectedIndex === index;
    },

    handleTabClick(index, e) {

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

        this.setState({selectedIndex: index}, function () {
            this.props.onChange && this.props.onChange({
                target: this,
                selectedIndex: index
            });
        });

    },

    render() {

        var props = this.props;
        var percent = 1 / this.getTabCount() * 100 + '%';
        var tabIndex = 0;
        var tabContent = [];

        var tabs = React.Children.map(props.children, function (tab, index) {

            var selected = this.getSelected(tab, index);
            var {
                disabled,
                children
            } = tab.props;

            if (selected) {
                tabIndex = index;

                tabContent = (
                    <TabPanel
                        key={index}
                        active={selected} >
                        {children}
                    </TabPanel>
                );
            }

            return React.cloneElement(tab, {
                key: index,
                selected: selected,
                disabled: disabled,
                tabIndex: index,
                style: {width: percent},
                onTap: disabled ? null : this.handleTabClick.bind(this, index),
                className: cx().part('item').build()
            });

        }, this);

        var InkBarStyles = {
            width: percent,
            [dom.prefixStyle('transform')]: 'translate3d(' + (100 * tabIndex) + '%, 0, 0)'
        };

        return (
            <section {...props} className={cx(props).build()}>
                <div className={cx().part('bar').build()}>
                    {tabs}
                    <i className={cx().part('inkbar').build()} style={InkBarStyles}></i>
                </div>
                {tabContent}
            </section>
        );

    }

});

Tab.Item = Item;

module.exports = Tab;
