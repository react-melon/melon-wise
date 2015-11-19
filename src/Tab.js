/**
 * @file esui-react/Tab
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');
var Component = require('./Component');

var Item = require('./tab/Item');
var TabPanel = require('./tab/Panel');

var dom = require('./util/dom');

class Tab extends Component {

    static displayName = 'Tab';

    constructor(props) {
        super(props);

        let {selectedIndex} = this.props;

        this.state = {
            selectedIndex: selectedIndex
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

    }

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
                className: this.getPartClassName('item')
            });

        }, this);

        var InkBarStyles = {
            width: percent,
            [dom.prefixStyle('transform')]: 'translate3d(' + (100 * tabIndex) + '%, 0, 0)'
        };

        return (
            <section {...props} className={this.getClassName()}>
                <div className={this.getPartClassName('bar')}>
                    {tabs}
                    <i className={this.getPartClassName('inkbar')} style={InkBarStyles}></i>
                </div>
                {tabContent}
            </section>
        );

    }

}

Tab.propTypes = {
    selectedIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
    onBeforeChange: React.PropTypes.func
};

Tab.defaultProps = {
    selectedIndex: 0
};

Tab.Item = Item;

module.exports = Tab;
