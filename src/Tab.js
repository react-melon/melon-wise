/**
 * @file esui-react/Tab
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('melon-classname').create('Tab');

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

        const {selectedIndex} = this.props;

        return {
            selectedIndex
        };

    },

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            }, () => {
                const {onChange, selectedIndex} = nextProps;
                onChange({selectedIndex});
            });
        }
    },

    getTabCount() {
        return React.Children.count(this.props.children);
    },

    getSelected(tab, index) {
        return this.state.selectedIndex === index;
    },

    handleTabClick(index) {

        if (index === this.state.selectedIndex) {
            return;
        }

        const {onBeforeChange, onChange} = this.props;

        let defaultPrevented = false;

        let e = {
            selectedIndex: index,
            preventDefault() {
                defaultPrevented = true;
            }
        };

        if (onBeforeChange) {
            onBeforeChange(e);
            if (defaultPrevented) {
                return;
            }
        }

        this.setState({selectedIndex: index}, function () {
            onChange && onChange(e);
        });

    },

    render() {

        const props = this.props;
        const percent = 1 / this.getTabCount() * 100 + '%';
        let tabIndex = 0;
        let tabContent = [];

        const tabs = React.Children.map(props.children, function (tab, index) {

            const selected = this.getSelected(tab, index);
            const {
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
                selected,
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
