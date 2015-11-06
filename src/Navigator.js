/**
 * @file esui-react/Navigator
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var Component = require('./Component');
var Tapable = require('./Tappable');

class Navigator extends Component {

    static displayName = 'Navigator';

    render() {

        var {
            label,
            children,
            ...other
        } = this.props;

        var content = label || children;

        return (
            <Tapable {...other} classBase="variant" className={this.getClassName()}>
                {content}
            </Tapable>
        );

    }

}

module.exports = Navigator;
