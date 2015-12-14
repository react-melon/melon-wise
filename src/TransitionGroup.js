/**
 * @file esui-react/TransitionGroup
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./util/cxBuilder').create('Transitiongroup');
const PropTypes = React.PropTypes;
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const DEFAULT_TRANSITION_DURATION = 300;

const TransitionGroup = function TransitionGroup(props) {

    let {
        translateFrom,
        transitionTimeout,
        transitionType,
        children,
        ...others
    } = props;

    const type = transitionType === 'translate'
            ? transitionType + '-' + translateFrom
            : transitionType;

    if (transitionTimeout !== DEFAULT_TRANSITION_DURATION) {
        children = React.Children.map(
            children,
            (child) => React.cloneElement(child, {
                style: {
                    ...child.props.style,
                    transitionDuration: transitionTimeout + 'ms',
                    WebkitTransitionDuration: transitionTimeout + 'ms'
                }
            })
        );
    }

    const isAnimate = transitionType !== 'instant';

    return (
        <ReactCSSTransitionGroup
            {...others}
            component="div"
            className={cx(props).build()}
            transitionName={'transition-' + type}
            transitionEnterTimeout={transitionTimeout}
            transitionLeaveTimeout={transitionTimeout}
            transitionEnter={isAnimate}
            transitionLeave={isAnimate}>
            {children}
        </ReactCSSTransitionGroup>
    );

};

TransitionGroup.propTypes = {
    transitionTimeout: PropTypes.number,
    transitionType: PropTypes.oneOf(['instant', 'opacity', 'translate', 'scale']),
    translateFrom: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

TransitionGroup.defaultProps = {
    transitionTimeout: 500,
    transitionType: 'instant',
    translateFrom: 'bottom'
};

module.exports = TransitionGroup;
