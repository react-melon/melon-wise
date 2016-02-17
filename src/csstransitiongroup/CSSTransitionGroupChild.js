/**
 * @file esui-react/CSSTransitionGroupChild
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const ReactDOM = require('react-dom');
const domUtil = require('../util/dom');
const PropTypes = React.PropTypes;

class CSSTransitionGroupChild extends React.Component {

    constructor(props) {
        super(props);

        this.classNameQueue = [];
        this.transitionTimeouts = [];

        this.flushClassNameQueue = this.flushClassNameQueue.bind(this);
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.transitionTimeouts.forEach(function (timeout) {
            clearTimeout(timeout);
        });
    }

    componentWillEnter(done) {
        this.transition('enter', done);
    }

    componentWillLeave(done) {
        this.transition('leave', done);
    }

    queueClass(className, tick) {
        this.classNameQueue.push(className);

        if (!this.timeout) {
            this.timeout = setTimeout(this.flushClassNameQueue, tick);
        }
    }

    flushClassNameQueue() {
        this.classNameQueue.forEach(domUtil.addClass.bind(domUtil, ReactDOM.findDOMNode(this)));
        this.classNameQueue.length = 0;
        this.timeout = null;
    }

    transition(animationType, finishCallback) {
        const node = ReactDOM.findDOMNode(this);

        if (!node) {
            if (finishCallback) {
                finishCallback();
            }
            return;
        }

        const {
            transitionTimeout,
            transitionType,
            translateFrom
        } = this.props;

        const type = transitionType === 'translate'
            ? transitionType + '-' + translateFrom
            : transitionType;

        const className = 'transition-' + type + '-' + animationType;
        const activeClassName = className + '-active';
        let timeout = null;

        const endListener = function (e) {
            if (e && e.target !== node) {
                return;
            }

            clearTimeout(timeout);

            domUtil.removeClass(node, className);
            domUtil.removeClass(node, activeClassName);

            // Usually this optional callback is used for informing an owner of
            // a leave animation and telling it to remove the child.
            if (finishCallback) {
                finishCallback();
            }
        };

        domUtil.addClass(node, className);

        // Need to do this to actually trigger a transition.
        this.queueClass(activeClassName, transitionTimeout / 100);

        timeout = setTimeout(endListener, transitionTimeout);
        this.transitionTimeouts.push(timeout);
    }

    render() {
        const onlyChild = React.Children.only(this.props.children);
        return React.cloneElement(onlyChild, {
            style: {
                ...this.props.style,
                WebkitTransitionDuration: this.props.transitionTimeout + 'ms',
                transitionDuration: this.props.transitionTimeout + 'ms'
            }
        });
    }
}

CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';

CSSTransitionGroupChild.propTypes = {
    transitionTimeout: PropTypes.number.isRequired,
    transitionType: PropTypes.oneOf(['instant', 'opacity', 'translate', 'scale']).isRequired,
    translateFrom: PropTypes.oneOf(['top', 'bottom', 'left', 'right'])
};

CSSTransitionGroupChild.defaultProps = {
    transitionTimeout: 500,
    transitionType: 'instant',
    translateFrom: 'bottom'
};

module.exports = CSSTransitionGroupChild;
