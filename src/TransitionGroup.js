/**
 * @file esui-react/TransitionGroup
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./util/cxBuilder').create('Transitiongroup');
const PropTypes = React.PropTypes;
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const TransitionGroup = function TransitionGroup(props) {

    const {translateFrom, transitionTimeout, transitionType, ...others} = props;

    let type = transitionType === 'translate'
            ? transitionType + '-' + translateFrom
            : transitionType;

    return (
        <ReactCSSTransitionGroup
            {...others}
            component="div"
            className={cx(props).build()}
            transitionName={'transition-' + type}
            transitionEnterTimeout={transitionTimeout}
            transitionLeaveTimeout={transitionTimeout}
            transitionEnter={transitionType !== 'instant'}
            transitionLeave={transitionType !== 'instant'} />
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
