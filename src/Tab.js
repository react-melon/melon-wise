/**
 * @file Tab
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes, Component} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

import Item from './tab/Item';
import TabPanel from './tab/Panel';

const cx = create('Tab');

export default class Tab extends Component {

    constructor(props) {
        super(props);

        const selectedIndex = this.props.selectedIndex;
        this.state = {
            selectedIndex
        };
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.selectedIndex !== this.state.selectedIndex) {
            this.setState({
                selectedIndex: nextProps.selectedIndex
            });
        }
    }

    getTabCount() {
        return React.Children.count(this.props.children);
    }

    getSelected(tab, index) {
        return this.state.selectedIndex === index;
    }

    handleTabClick(index, e) {

        if (index === this.state.selectedIndex) {
            return;
        }

        const onChange = this.props.onChange;

        e.index = index;

        // Controlled
        if (onChange) {
            onChange(e);
            return;
        }

        this.setState({selectedIndex: index});

    }

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

}

Tab.displayName = 'Tab';

Tab.propTypes = {
    selectedIndex: PropTypes.number,
    onChange: PropTypes.func,
    onBeforeChange: PropTypes.func
};

Tab.defaultProps = {
    selectedIndex: 0
};

Tab.Item = Item;
