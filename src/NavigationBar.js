/**
 * @file esui-react/NavigationBar
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

const Component = require('./Component');
const Title = require('./Title');

class NavigationBar extends Component {

    static displayName = 'NavigationBar';

    render() {

        let {
            title,
            leftButton,
            rightButton,
            ...other
        } = this.props;

        leftButton = leftButton ? React.cloneElement(leftButton, {
            className: this.getPartClassName('left')
        }) : null;

        rightButton = rightButton ? React.cloneElement(rightButton, {
            className: this.getPartClassName('right')
        }) : null;

        return (
            <nav className={this.getClassName()}>
                {leftButton}
                {rightButton}
                <Title level={1}>{title}</Title>
            </nav>
        );

    }

}

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
