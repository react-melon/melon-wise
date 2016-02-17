/**
 * @file esui-react/Button
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('melon-classname').create('Button');
const Tapable = require('./Tappable');

function Button(props) {

    const {
        label,
        children,
        ...other
    } = props;

    const content = label || children;

    return (
        <Tapable {...other} component="button" classBase="variant" className={cx(props).build()}>
            {content}
        </Tapable>
    );

}

Button.displayName = 'Button';

module.exports = Button;
