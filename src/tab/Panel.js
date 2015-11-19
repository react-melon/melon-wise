/**
 * @file esui-react Tabs Panel
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var Component = require('../Component');

class TabPanel extends Component {

    static displayName = 'TabPanel';

    getStates(props) {

        var states = {};

        if (props.active) {
            states.active = true;
        }

        return states;
    }

    render() {

        var props = this.props;

        return (
            <div {...props} className={this.getClassName()}>
                {props.children}
            </div>
        );

    }

}

TabPanel.propTypes = {
    active: React.PropTypes.bool
};

module.exports = TabPanel;
