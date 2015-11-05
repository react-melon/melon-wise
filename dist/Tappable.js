define('melon/Tappable', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var ReactDOM = require('react-dom');
    var PropTypes = React.PropTypes;
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
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none',
        cursor: 'pointer'
    };
    var Tappable = function (_React$Component) {
        babelHelpers.inherits(Tappable, _React$Component);
        babelHelpers.createClass(Tappable, null, [
            {
                key: 'displayName',
                value: 'Tappable',
                enumerable: true
            },
            {
                key: 'propTypes',
                value: {
                    moveThreshold: PropTypes.number,
                    activeDelay: PropTypes.number,
                    pressDelay: PropTypes.number,
                    pressMoveThreshold: PropTypes.number,
                    preventDefault: PropTypes.bool,
                    stopPropagation: PropTypes.bool,
                    onTap: PropTypes.func,
                    onPress: PropTypes.func,
                    onTouchStart: PropTypes.func,
                    onTouchMove: PropTypes.func,
                    onTouchEnd: PropTypes.func,
                    onMouseDown: PropTypes.func,
                    onMouseUp: PropTypes.func,
                    onMouseMove: PropTypes.func,
                    onMouseOut: PropTypes.func,
                    component: PropTypes.any,
                    className: PropTypes.string,
                    classBase: PropTypes.string,
                    style: PropTypes.object,
                    disabled: PropTypes.bool
                },
                enumerable: true
            },
            {
                key: 'defaultProps',
                value: {
                    activeDelay: 0,
                    moveThreshold: 100,
                    pressDelay: 1000,
                    pressMoveThreshold: 5,
                    component: 'span',
                    classBase: 'Tappable'
                },
                enumerable: true
            }
        ]);
        function Tappable(props) {
            babelHelpers.classCallCheck(this, Tappable);
            _React$Component.call(this, props);
            this.state = { isActive: false };
            this.onTouchStart = this.onTouchStart.bind(this);
            this.onTouchMove = this.onTouchMove.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
            this.onMouseDown = this.onMouseDown.bind(this);
            this.onMouseUp = this.onMouseUp.bind(this);
            this.onMouseMove = this.onMouseMove.bind(this);
            this.onMouseOut = this.onMouseOut.bind(this);
            this.makeActive = this.makeActive.bind(this);
        }
        Tappable.prototype.componentWillUnmount = function componentWillUnmount() {
            this.cleanupScrollDetection();
            this.cancelPressDetection();
            this.clearActiveTimeout();
        };
        Tappable.prototype.processEvent = function processEvent(event) {
            if (this.props.preventDefault) {
                event.preventDefault();
            }
            if (this.props.stopPropagation) {
                event.stopPropagation();
            }
        };
        Tappable.prototype.onTouchStart = function onTouchStart(event) {
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
            } else if (this.onPinchStart && (this.props.onPinchStart || this.props.onPinchMove || this.props.onPinchEnd) && event.touches.length === 2) {
                this.onPinchStart(event);
            }
        };
        Tappable.prototype.makeActive = function makeActive() {
            this.clearActiveTimeout();
            this.setState({ isActive: true });
        };
        Tappable.prototype.clearActiveTimeout = function clearActiveTimeout() {
            clearTimeout(this._activeTimeout);
            this._activeTimeout = false;
        };
        Tappable.prototype.initScrollDetection = function initScrollDetection() {
            this._scrollPos = {
                top: 0,
                left: 0
            };
            this._scrollParents = [];
            this._scrollParentPos = [];
            var node = ReactDOM.findDOMNode(this);
            while (node) {
                if (node.scrollHeight > node.offsetHeight || node.scrollWidth > node.offsetWidth) {
                    this._scrollParents.push(node);
                    this._scrollParentPos.push(node.scrollTop + node.scrollLeft);
                    this._scrollPos.top += node.scrollTop;
                    this._scrollPos.left += node.scrollLeft;
                }
                node = node.parentNode;
            }
        };
        Tappable.prototype.calculateMovement = function calculateMovement(touch) {
            return {
                x: Math.abs(touch.clientX - this._initialTouch.clientX),
                y: Math.abs(touch.clientY - this._initialTouch.clientY)
            };
        };
        Tappable.prototype.detectScroll = function detectScroll() {
            var currentScrollPos = {
                top: 0,
                left: 0
            };
            for (var i = 0; i < this._scrollParents.length; i++) {
                currentScrollPos.top += this._scrollParents[i].scrollTop;
                currentScrollPos.left += this._scrollParents[i].scrollLeft;
            }
            return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
        };
        Tappable.prototype.cleanupScrollDetection = function cleanupScrollDetection() {
            this._scrollParents = undefined;
            this._scrollPos = undefined;
        };
        Tappable.prototype.initPressDetection = function initPressDetection(event, callback) {
            var _this = this;
            if (!this.props.onPress) {
                return;
            }
            this._pressTimeout = setTimeout(function () {
                _this.props.onPress(event);
                callback();
            }, this.props.pressDelay);
        };
        Tappable.prototype.cancelPressDetection = function cancelPressDetection() {
            clearTimeout(this._pressTimeout);
        };
        Tappable.prototype.onTouchMove = function onTouchMove(event) {
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
            } else if (this._initialPinch && event.touches.length === 2 && this.onPinchMove) {
                this.onPinchMove(event);
                event.preventDefault();
            }
        };
        Tappable.prototype.onTouchEnd = function onTouchEnd(event) {
            var me = this;
            if (this._initialTouch) {
                this.processEvent(event);
                var afterEndTouch;
                var movement = this.calculateMovement(this._lastTouch);
                if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
                    event.preventDefault();
                    afterEndTouch = function () {
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
            } else if (this.onPinchEnd && this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
                this.onPinchEnd(event);
                event.preventDefault();
            }
        };
        Tappable.prototype.endTouch = function endTouch(event, callback) {
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
        };
        Tappable.prototype.onMouseDown = function onMouseDown(event) {
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
        };
        Tappable.prototype.onMouseMove = function onMouseMove(event) {
            if (window._blockMouseEvents || !this._mouseDown) {
                return;
            }
            this.processEvent(event);
            this.props.onMouseMove && this.props.onMouseMove(event);
        };
        Tappable.prototype.onMouseUp = function onMouseUp(event) {
            if (window._blockMouseEvents || !this._mouseDown) {
                return;
            }
            this.processEvent(event);
            this.props.onMouseUp && this.props.onMouseUp(event);
            this.props.onTap && this.props.onTap(event);
            this.endMouseEvent();
        };
        Tappable.prototype.onMouseOut = function onMouseOut(event) {
            if (window._blockMouseEvents || !this._mouseDown) {
                return;
            }
            this.processEvent(event);
            this.props.onMouseOut && this.props.onMouseOut(event);
            this.endMouseEvent();
        };
        Tappable.prototype.endMouseEvent = function endMouseEvent() {
            this.cancelPressDetection();
            this._mouseDown = false;
            this.setState({ isActive: false });
        };
        Tappable.prototype.cancelTap = function cancelTap() {
            this.endTouch();
            this._mouseDown = false;
        };
        Tappable.prototype.handlers = function handlers() {
            return {
                onTouchStart: this.onTouchStart,
                onTouchMove: this.onTouchMove,
                onTouchEnd: this.onTouchEnd,
                onMouseDown: this.onMouseDown,
                onMouseUp: this.onMouseUp,
                onMouseMove: this.onMouseMove,
                onMouseOut: this.onMouseOut
            };
        };
        Tappable.prototype.render = function render() {
            var props = this.props;
            var className = props.classBase + (this.state.isActive ? '-active' : '-inactive');
            if (props.className) {
                className += ' ' + props.className;
            }
            var style = babelHelpers._extends({}, touchStyles, props.style);
            var newComponentProps = babelHelpers._extends({}, props, {
                style: style,
                className: className,
                disabled: props.disabled,
                handlers: this.handlers
            }, this.handlers());
            delete newComponentProps.onTap;
            delete newComponentProps.onPress;
            delete newComponentProps.onPinchStart;
            delete newComponentProps.onPinchMove;
            delete newComponentProps.onPinchEnd;
            delete newComponentProps.moveThreshold;
            delete newComponentProps.pressDelay;
            delete newComponentProps.pressMoveThreshold;
            delete newComponentProps.preventDefault;
            delete newComponentProps.stopPropagation;
            delete newComponentProps.component;
            return React.createElement(props.component, newComponentProps, props.children);
        };
        return Tappable;
    }(React.Component);
    module.exports = Tappable;
});