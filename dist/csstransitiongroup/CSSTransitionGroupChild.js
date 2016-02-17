define('melon-wise/lib/csstransitiongroup/CSSTransitionGroupChild', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'react-dom',
    '../util/dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');
    var domUtil = require('../util/dom');
    var PropTypes = React.PropTypes;
    var CSSTransitionGroupChild = function (_React$Component) {
        babelHelpers.inherits(CSSTransitionGroupChild, _React$Component);
        function CSSTransitionGroupChild(props) {
            babelHelpers.classCallCheck(this, CSSTransitionGroupChild);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CSSTransitionGroupChild).call(this, props));
            _this.classNameQueue = [];
            _this.transitionTimeouts = [];
            _this.flushClassNameQueue = _this.flushClassNameQueue.bind(_this);
            return _this;
        }
        babelHelpers.createClass(CSSTransitionGroupChild, [
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    if (this.timeout) {
                        clearTimeout(this.timeout);
                    }
                    this.transitionTimeouts.forEach(function (timeout) {
                        clearTimeout(timeout);
                    });
                }
            },
            {
                key: 'componentWillEnter',
                value: function componentWillEnter(done) {
                    this.transition('enter', done);
                }
            },
            {
                key: 'componentWillLeave',
                value: function componentWillLeave(done) {
                    this.transition('leave', done);
                }
            },
            {
                key: 'queueClass',
                value: function queueClass(className, tick) {
                    this.classNameQueue.push(className);
                    if (!this.timeout) {
                        this.timeout = setTimeout(this.flushClassNameQueue, tick);
                    }
                }
            },
            {
                key: 'flushClassNameQueue',
                value: function flushClassNameQueue() {
                    this.classNameQueue.forEach(domUtil.addClass.bind(domUtil, ReactDOM.findDOMNode(this)));
                    this.classNameQueue.length = 0;
                    this.timeout = null;
                }
            },
            {
                key: 'transition',
                value: function transition(animationType, finishCallback) {
                    var node = ReactDOM.findDOMNode(this);
                    if (!node) {
                        if (finishCallback) {
                            finishCallback();
                        }
                        return;
                    }
                    var _props = this.props;
                    var transitionTimeout = _props.transitionTimeout;
                    var transitionType = _props.transitionType;
                    var translateFrom = _props.translateFrom;
                    var type = transitionType === 'translate' ? transitionType + '-' + translateFrom : transitionType;
                    var className = 'transition-' + type + '-' + animationType;
                    var activeClassName = className + '-active';
                    var timeout = null;
                    var endListener = function endListener(e) {
                        if (e && e.target !== node) {
                            return;
                        }
                        clearTimeout(timeout);
                        domUtil.removeClass(node, className);
                        domUtil.removeClass(node, activeClassName);
                        if (finishCallback) {
                            finishCallback();
                        }
                    };
                    domUtil.addClass(node, className);
                    this.queueClass(activeClassName, transitionTimeout / 100);
                    timeout = setTimeout(endListener, transitionTimeout);
                    this.transitionTimeouts.push(timeout);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var onlyChild = React.Children.only(this.props.children);
                    return React.cloneElement(onlyChild, {
                        style: babelHelpers.extends({}, this.props.style, {
                            WebkitTransitionDuration: this.props.transitionTimeout + 'ms',
                            transitionDuration: this.props.transitionTimeout + 'ms'
                        })
                    });
                }
            }
        ]);
        return CSSTransitionGroupChild;
    }(React.Component);
    CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';
    CSSTransitionGroupChild.propTypes = {
        transitionTimeout: PropTypes.number.isRequired,
        transitionType: PropTypes.oneOf([
            'instant',
            'opacity',
            'translate',
            'scale'
        ]).isRequired,
        translateFrom: PropTypes.oneOf([
            'top',
            'bottom',
            'left',
            'right'
        ])
    };
    CSSTransitionGroupChild.defaultProps = {
        transitionTimeout: 500,
        transitionType: 'instant',
        translateFrom: 'bottom'
    };
    module.exports = CSSTransitionGroupChild;
});