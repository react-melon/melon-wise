/**
 * @file esui-react/View
 * @author cxtom<cxtom2010@gmail.com>
 */

var React = require('react');

var Component = require('./Component');

class View extends Component {

    static displayName = 'View';

    render() {

        let {
            children,
            ...rest
        } = this.props;

        return (
            <div {...rest} className={this.getClassName()}>
                {children}
            </div>
        );

    }

}


module.exports = View;
