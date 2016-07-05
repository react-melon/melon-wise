/**
 * @file NavigationBar
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes, Component} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

import Tappable from './Tappable';
import Title from './Title';

const cx = create('NavigationBar');

export default class NavigationBar extends Component {

    render() {

        const props = this.props;

        const {
            title,
            leftIcon,
            rightIcon,
            onLeftTap,
            onRightTap
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

}

NavigationBar.displayName = 'NavigationBar';

NavigationBar.propTypes = {
    hidden: PropTypes.bool,
    title: PropTypes.any,
    leftIcon: PropTypes.element,
    rightIcon: PropTypes.element
};

NavigationBar.defaultProps = {
    hidden: false
};
