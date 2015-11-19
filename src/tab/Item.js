/**
 * @file esui-react Tabs Tab
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var Component = require('../Component');
var Tappable = require('../Tappable');

class TabItem extends Component {

    static displayName = 'TabItem';

    constructor(props) {
        super(props);
    }

    getStates(props) {

        var states = {};

        if (props.selected) {
            states.selected = true;
        }

        if (props.disabled) {
            states.disabled = true;
        }

        return states;
    }

    render() {

        var props = this.props;

        return (
            <Tappable {...props} className={this.getClassName()}>
                {props.label}
            </Tappable>
        );

    }

}

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
