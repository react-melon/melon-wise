/**
 * @file esui-react/Icon
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var Component = require('./Component');

class Icon extends Component {

    static displayName = 'Icon';

    render() {

        return (
            <i {...this.props} className={this.getClassName()}>{this.props.children}</i>
        );

    }

}

module.exports = Icon;
