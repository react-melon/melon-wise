/**
 * @file esui-react/NavigationBar
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('melon-classname').create('NavigationBar');

const Title = require('./Title');
const Tappable = require('./Tappable');

function NavigationBar(props) {

    const {
        title,
        leftIcon,
        rightIcon,
        onLeftTap,
        onRightTap,
        ...other
    } = props;

    const leftButton = leftIcon ? (
        <Tappable className={cx().part('left').build()} onTap={onLeftTap}>
            {leftIcon}
        </Tappable>
    ) : null;

    const rightButton = rightIcon ? (
        <Tappable className={cx().part('right').build()} onTap={onRightTap}>
            {leftIcon}
        </Tappable>
    ) : null;

    return (
        <nav className={cx(props).build()}>
            {leftButton}
            {rightButton}
            <Title level={2}>{title}</Title>
        </nav>
    );

}

NavigationBar.displayName = 'NavigationBar';

const {PropTypes} = React;

NavigationBar.propTypes = {
    hidden: PropTypes.bool,
    title: PropTypes.any,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element
};

NavigationBar.defaultProps = {
    hidden: false
};


module.exports = NavigationBar;
