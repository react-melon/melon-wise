/**
 * @file esui-react/Tab
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./util/cxBuilder').create('Tab');

const Item = require('./tab/Item');
const TabPanel = require('./tab/Panel');

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

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            });
        }
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

        let {onBeforeChange, onChange} = this.props;

        e.selectedIndex = index;

        if (onBeforeChange) {
            onBeforeChange(e);
            if (e.isDefaultPrevented()) {
                return;
            }
        }

        this.setState({selectedIndex: index}, function () {
            onChange && onChange(e);
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
                tabIndex: index,
                style: {width: percent},
                onTap: disabled ? null : this.handleTabClick.bind(this, index)
            });

        }, this);

        const transform = 'translate3d(' + (100 * tabIndex) + '%, 0, 0)';

        const InkBarStyles = {
            width: percent,
            WebkitTransform: transform,
            transform
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
