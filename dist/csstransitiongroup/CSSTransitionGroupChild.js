var babelHelpers = require('../babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/csstransitiongroup/CSSTransitionGroupChild', [
            'exports',
            'react',
            'react-dom',
            '../util/dom'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('react-dom'), require('../util/dom'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.reactDom, global.dom);
        global.CSSTransitionGroupChild = mod.exports;
    }
}(this, function (exports, _react, _reactDom, _dom) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var domUtil = babelHelpers.interopRequireWildcard(_dom);
    var CSSTransitionGroupChild = function (_Component) {
        babelHelpers.inherits(CSSTransitionGroupChild, _Component);
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
                    this.transitionTimeouts.forEach(clearTimeout);
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
                    this.classNameQueue.forEach(domUtil.addClass.bind(domUtil, _reactDom2.default.findDOMNode(this)));
                    this.classNameQueue.length = 0;
                    this.timeout = null;
                }
            },
            {
                key: 'transition',
                value: function transition(animationType, finishCallback) {
                    var node = _reactDom2.default.findDOMNode(this);
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
                    var onlyChild = _react2.default.Children.only(this.props.children);
                    return _react2.default.cloneElement(onlyChild, {
                        style: babelHelpers.extends({}, this.props.style, {
                            WebkitTransitionDuration: this.props.transitionTimeout + 'ms',
                            transitionDuration: this.props.transitionTimeout + 'ms'
                        })
                    });
                }
            }
        ]);
        return CSSTransitionGroupChild;
    }(_react.Component);
    exports.default = CSSTransitionGroupChild;
    CSSTransitionGroupChild.displayName = 'CSSTransitionGroupChild';
    CSSTransitionGroupChild.propTypes = {
        transitionTimeout: _react.PropTypes.number.isRequired,
        transitionType: _react.PropTypes.oneOf([
            'instant',
            'opacity',
            'translate',
            'scale'
        ]).isRequired,
        translateFrom: _react.PropTypes.oneOf([
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
}));