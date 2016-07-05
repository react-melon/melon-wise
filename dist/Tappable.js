var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/Tappable', [
            'exports',
            'react',
            'react-dom',
            'melon-core/classname/cxBuilder'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('react-dom'), require('melon-core/classname/cxBuilder'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.reactDom, global.cxBuilder);
        global.Tappable = mod.exports;
    }
}(this, function (exports, _react, _reactDom, _cxBuilder) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var cx = (0, _cxBuilder.create)('Tappable');
    function getTouchProps(touch) {
        if (!touch) {
            return {};
        }
        return {
            pageX: touch.pageX,
            pageY: touch.pageY,
            clientX: touch.clientX,
            clientY: touch.clientY
        };
    }
    var touchStyles = {
        WebkitTapHighlightColor: 'rgba(0,0,0,0)',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none',
        cursor: 'pointer'
    };
    var Tappable = function (_React$Component) {
        babelHelpers.inherits(Tappable, _React$Component);
        function Tappable(props) {
            babelHelpers.classCallCheck(this, Tappable);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Tappable).call(this, props));
            _this.state = { isActive: false };
            _this.onTouchStart = _this.onTouchStart.bind(_this);
            _this.onTouchMove = _this.onTouchMove.bind(_this);
            _this.onTouchEnd = _this.onTouchEnd.bind(_this);
            _this.onMouseDown = _this.onMouseDown.bind(_this);
            _this.onMouseUp = _this.onMouseUp.bind(_this);
            _this.onMouseMove = _this.onMouseMove.bind(_this);
            _this.onMouseOut = _this.onMouseOut.bind(_this);
            _this.makeActive = _this.makeActive.bind(_this);
            return _this;
        }
        babelHelpers.createClass(Tappable, [
            {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    this.cleanupScrollDetection();
                    this.cancelPressDetection();
                    this.clearActiveTimeout();
                }
            },
            {
                key: 'processEvent',
                value: function processEvent(event) {
                    if (this.props.preventDefault) {
                        event.preventDefault();
                    }
                    if (this.props.stopPropagation) {
                        event.stopPropagation();
                    }
                }
            },
            {
                key: 'onTouchStart',
                value: function onTouchStart(event) {
                    if (this.props.onTouchStart && this.props.onTouchStart(event) === false) {
                        return;
                    }
                    this.processEvent(event);
                    window._blockMouseEvents = true;
                    if (event.touches.length === 1) {
                        this._initialTouch = this._lastTouch = getTouchProps(event.touches[0]);
                        this.initScrollDetection();
                        this.initPressDetection(event, this.endTouch);
                        this._activeTimeout = setTimeout(this.makeActive.bind(this), this.props.activeDelay);
                    }
                }
            },
            {
                key: 'makeActive',
                value: function makeActive() {
                    this.clearActiveTimeout();
                    this.setState({ isActive: true });
                }
            },
            {
                key: 'clearActiveTimeout',
                value: function clearActiveTimeout() {
                    clearTimeout(this._activeTimeout);
                    this._activeTimeout = false;
                }
            },
            {
                key: 'initScrollDetection',
                value: function initScrollDetection() {
                    this._scrollPos = {
                        top: 0,
                        left: 0
                    };
                    this._scrollParents = [];
                    this._scrollParentPos = [];
                    var node = _reactDom2.default.findDOMNode(this);
                    while (node) {
                        if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
                            this._scrollParents.push(node);
                            this._scrollParentPos.push(node.scrollTop + node.scrollLeft);
                            this._scrollPos.top += node.scrollTop;
                            this._scrollPos.left += node.scrollLeft;
                        }
                        node = node.parentNode;
                    }
                }
            },
            {
                key: 'calculateMovement',
                value: function calculateMovement(touch) {
                    return {
                        x: Math.abs(touch.clientX - this._initialTouch.clientX),
                        y: Math.abs(touch.clientY - this._initialTouch.clientY)
                    };
                }
            },
            {
                key: 'detectScroll',
                value: function detectScroll() {
                    var currentScrollPos = {
                        top: 0,
                        left: 0
                    };
                    for (var i = 0; i < this._scrollParents.length; i++) {
                        currentScrollPos.top += this._scrollParents[i].scrollTop;
                        currentScrollPos.left += this._scrollParents[i].scrollLeft;
                    }
                    return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
                }
            },
            {
                key: 'cleanupScrollDetection',
                value: function cleanupScrollDetection() {
                    this._scrollParents = undefined;
                    this._scrollPos = undefined;
                }
            },
            {
                key: 'initPressDetection',
                value: function initPressDetection(event, callback) {
                    var _this2 = this;
                    if (!this.props.onPress) {
                        return;
                    }
                    this._pressTimeout = setTimeout(function () {
                        _this2.props.onPress(event);
                        callback();
                    }, this.props.pressDelay);
                }
            },
            {
                key: 'cancelPressDetection',
                value: function cancelPressDetection() {
                    clearTimeout(this._pressTimeout);
                }
            },
            {
                key: 'onTouchMove',
                value: function onTouchMove(event) {
                    if (this._initialTouch) {
                        this.processEvent(event);
                        if (this.detectScroll()) {
                            return this.endTouch(event);
                        }
                        this.props.onTouchMove && this.props.onTouchMove(event);
                        this._lastTouch = getTouchProps(event.touches[0]);
                        var movement = this.calculateMovement(this._lastTouch);
                        if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
                            this.cancelPressDetection();
                        }
                        if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
                            if (this.state.isActive) {
                                this.setState({ isActive: false });
                            } else if (this._activeTimeout) {
                                this.clearActiveTimeout();
                            }
                        } else {
                            if (!this.state.isActive && !this._activeTimeout) {
                                this.setState({ isActive: true });
                            }
                        }
                    }
                }
            },
            {
                key: 'onTouchEnd',
                value: function onTouchEnd(event) {
                    var me = this;
                    if (this._initialTouch) {
                        this.processEvent(event);
                        var afterEndTouch = void 0;
                        var movement = this.calculateMovement(this._lastTouch);
                        if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
                            event.preventDefault();
                            afterEndTouch = function afterEndTouch() {
                                var finalParentScrollPos = me._scrollParents.map(function (node) {
                                    return node.scrollTop + node.scrollLeft;
                                });
                                var stoppedMomentumScroll = me._scrollParentPos.some(function (end, i) {
                                    return end !== finalParentScrollPos[i];
                                });
                                if (!stoppedMomentumScroll) {
                                    me.props.onTap(event);
                                }
                            };
                        }
                        this.endTouch(event, afterEndTouch);
                    }
                }
            },
            {
                key: 'endTouch',
                value: function endTouch(event, callback) {
                    this.cancelPressDetection();
                    this.clearActiveTimeout();
                    if (event && this.props.onTouchEnd) {
                        this.props.onTouchEnd(event);
                    }
                    this._initialTouch = null;
                    this._lastTouch = null;
                    if (callback) {
                        callback();
                    }
                    if (this.state.isActive) {
                        this.setState({ isActive: false });
                    }
                }
            },
            {
                key: 'onMouseDown',
                value: function onMouseDown(event) {
                    if (window._blockMouseEvents) {
                        window._blockMouseEvents = false;
                        return;
                    }
                    if (this.props.onMouseDown && this.props.onMouseDown(event) === false) {
                        return;
                    }
                    this.processEvent(event);
                    this.initPressDetection(event, this.endMouseEvent);
                    this._mouseDown = true;
                    this.setState({ isActive: true });
                }
            },
            {
                key: 'onMouseMove',
                value: function onMouseMove(event) {
                    if (window._blockMouseEvents || !this._mouseDown) {
                        return;
                    }
                    this.processEvent(event);
                    this.props.onMouseMove && this.props.onMouseMove(event);
                }
            },
            {
                key: 'onMouseUp',
                value: function onMouseUp(event) {
                    if (window._blockMouseEvents || !this._mouseDown) {
                        return;
                    }
                    this.processEvent(event);
                    this.props.onMouseUp && this.props.onMouseUp(event);
                    this.props.onTap && this.props.onTap(event);
                    this.endMouseEvent();
                }
            },
            {
                key: 'onMouseOut',
                value: function onMouseOut(event) {
                    if (window._blockMouseEvents || !this._mouseDown) {
                        return;
                    }
                    this.processEvent(event);
                    this.props.onMouseOut && this.props.onMouseOut(event);
                    this.endMouseEvent();
                }
            },
            {
                key: 'endMouseEvent',
                value: function endMouseEvent() {
                    this.cancelPressDetection();
                    this._mouseDown = false;
                    this.setState({ isActive: false });
                }
            },
            {
                key: 'cancelTap',
                value: function cancelTap() {
                    this.endTouch();
                    this._mouseDown = false;
                }
            },
            {
                key: 'handlers',
                value: function handlers() {
                    return {
                        onTouchStart: this.onTouchStart,
                        onTouchMove: this.onTouchMove,
                        onTouchEnd: this.onTouchEnd,
                        onMouseDown: this.onMouseDown,
                        onMouseUp: this.onMouseUp,
                        onMouseMove: this.onMouseMove,
                        onMouseOut: this.onMouseOut
                    };
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var className = cx(props).addStates({ active: this.state.isActive }).build();
                    var style = babelHelpers.extends({}, touchStyles, props.style);
                    var newComponentProps = babelHelpers.extends({}, props, {
                        style: style,
                        className: className,
                        disabled: props.disabled,
                        handlers: this.handlers
                    }, this.handlers());
                    delete newComponentProps.onTap;
                    delete newComponentProps.onPress;
                    delete newComponentProps.moveThreshold;
                    delete newComponentProps.pressDelay;
                    delete newComponentProps.pressMoveThreshold;
                    delete newComponentProps.preventDefault;
                    delete newComponentProps.stopPropagation;
                    delete newComponentProps.component;
                    return _react2.default.createElement(props.component, newComponentProps, props.children);
                }
            }
        ]);
        return Tappable;
    }(_react2.default.Component);
    exports.default = Tappable;
    Tappable.displayName = 'Tappable';
    Tappable.propTypes = {
        moveThreshold: _react.PropTypes.number,
        activeDelay: _react.PropTypes.number,
        pressDelay: _react.PropTypes.number,
        pressMoveThreshold: _react.PropTypes.number,
        preventDefault: _react.PropTypes.bool,
        stopPropagation: _react.PropTypes.bool,
        onTap: _react.PropTypes.func,
        onPress: _react.PropTypes.func,
        onTouchStart: _react.PropTypes.func,
        onTouchMove: _react.PropTypes.func,
        onTouchEnd: _react.PropTypes.func,
        onMouseDown: _react.PropTypes.func,
        onMouseUp: _react.PropTypes.func,
        onMouseMove: _react.PropTypes.func,
        onMouseOut: _react.PropTypes.func,
        component: _react.PropTypes.any,
        className: _react.PropTypes.string,
        classBase: _react.PropTypes.string,
        style: _react.PropTypes.object,
        disabled: _react.PropTypes.bool
    };
    Tappable.defaultProps = {
        activeDelay: 0,
        moveThreshold: 100,
        pressDelay: 1000,
        pressMoveThreshold: 5,
        component: 'span',
        classBase: 'Tappable'
    };
}));