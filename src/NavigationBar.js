/**
 * @file esui-react/NavigationBar
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const cx = require('./util/cxBuilder').create('NavigationBar');
const Title = require('./Title');
const Tappable = require('./Tappable');

function NavigationBar(props) {

    let {
        title,
        leftIcon,
        rightIcon,
        onLeftTap,
        onRightTap,
        ...other
    } = props;

    let leftButton = leftIcon ? (
        <Tappable className={cx().part('left').build()} onTap={onLeftTap}>
            {leftIcon}
        </Tappable>
    ) : null;

    let rightButton = rightIcon ? (
        <Tappable className={cx().part('right').build()} onTap={onRightTap}>
            {leftIcon}
        </Tappable>
    ) : null;

    return (
        <nav className={this.getClassName()}>
            {leftButton}
            {rightButton}
            <Title level={1}>{title}</Title>
        </nav>
    );

}

NavigationBar.displayName = 'NavigationBar';

let {PropTypes} = React;

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
