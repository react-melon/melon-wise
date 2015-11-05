/**
 * @file esui-react/Button
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var Component = require('./Component');
var Tapable = require('./Tappable');

class Button extends Component {

    static displayName = 'Button';

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

module.exports = Button;
