define('melon/ScrollView', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/dom',
    './util/date',
    './util/easing',
    './util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _utilDom = require('./util/dom');
    var _utilDom2 = babelHelpers.interopRequireDefault(_utilDom);
    var _utilDate = require('./util/date');
    var _utilDate2 = babelHelpers.interopRequireDefault(_utilDate);
    var _utilEasing = require('./util/easing');
    var _utilEasing2 = babelHelpers.interopRequireDefault(_utilEasing);
    var PropTypes = _react2.default.PropTypes;
    var cx = require('./util/cxBuilder').create('Scrollview');
    var transitionStyles = Object.assign({}, {
        transform: _utilDom2.default.prefixStyle('transform'),
        transitionTimingFunction: _utilDom2.default.prefixStyle('transitionTimingFunction'),
        transitionDuration: _utilDom2.default.prefixStyle('transitionDuration'),
        transitionDelay: _utilDom2.default.prefixStyle('transitionDelay'),
        transformOrigin: _utilDom2.default.prefixStyle('transformOrigin')
    });
    var momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start;
        var speed = Math.abs(distance) / time;
        var destination;
        var duration;
        deceleration = deceleration === undefined ? 0.0006 : deceleration;
        destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;
        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }
        return {
            destination: Math.round(destination),
            duration: duration
        };
    };
    var ScrollView = function (_React$Component) {
        babelHelpers.inherits(ScrollView, _React$Component);
        babelHelpers.createClass(ScrollView, null, [
            {
                key: 'displayName',
                value: 'ScrollView',
                enumerable: true
            },
            {
                key: 'propTypes',
                value: {
                    horizontal: PropTypes.bool,
                    component: PropTypes.any,
                    bounce: PropTypes.bool,
                    bounceTime: PropTypes.number,
                    bounceEasing: PropTypes.string,
                    useTransition: PropTypes.bool,
                    useTransform: PropTypes.bool,
                    directionLockThreshold: PropTypes.number,
                    disableMouse: PropTypes.bool
                },
                enumerable: true
            },
            {
                key: 'defaultProps',
                value: {
                    horizontal: false,
                    component: 'div',
                    bounce: true,
                    bounceTime: 600,
                    bounceEasing: '',
                    useTransform: true,
                    useTransition: true,
                    disableMouse: true,
                    momentum: true
                },
                enumerable: true
            }
        ]);
        function ScrollView(props) {
            babelHelpers.classCallCheck(this, ScrollView);
            _React$Component.call(this, props);
            this.onTouchStart = this.onTouchStart.bind(this);
            this.onTouchMove = this.onTouchMove.bind(this);
            this.onTouchEnd = this.onTouchEnd.bind(this);
            this.onTransitionEnd = this.onTransitionEnd.bind(this);
            this.state = {
                x: 0,
                y: 0,
                time: 0,
                easing: ''
            };
            this.touchStart = false;
        }
        ScrollView.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
            return this.props !== nextProps || nextState.x !== this.state.x || nextState.y !== this.state.y || nextState.time !== this.state.time || nextState.easing !== this.state.easing;
        };
        ScrollView.prototype.componentDidMount = function componentDidMount() {
            this.useTransition = _utilDom2.default.hasTransition && this.props.useTransition;
            this.useTransform = _utilDom2.default.hasTransform && this.props.useTransform;
            this.directionX = 0;
            this.directionY = 0;
            this.refresh();
        };
        ScrollView.prototype.componentWillUnMount = function componentWillUnMount() {
            this.clearEvents();
        };
        ScrollView.prototype.refresh = function refresh() {
            var main = this.refs.main;
            this.wrapperWidth = main.clientWidth;
            this.wrapperHeight = main.clientHeight;
            this.scrollerWidth = this.refs.scroller.offsetWidth;
            this.scrollerHeight = this.refs.scroller.offsetHeight;
            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;
            this.hasHorizontalScroll = this.props.horizontal && this.maxScrollX < 0;
            this.hasVerticalScroll = this.maxScrollY < 0;
            if (!this.hasHorizontalScroll) {
                this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth;
            }
            if (!this.hasVerticalScroll) {
                this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight;
            }
            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.touchStart = false;
            this.wrapperOffset = _utilDom2.default.getPosition(main);
            this.resetPosition();
        };
        ScrollView.prototype.scrollTo = function scrollTo(x, y, time, easing) {
            easing = easing || _utilEasing2.default.circular;
            this.isInTransition = this.useTransition && time > 0;
            this.translate(x, y, time, easing.style);
        };
        ScrollView.prototype.transitionTime = function transitionTime(time) {
            time = time || 0;
            this.setState({ time: time });
        };
        ScrollView.prototype.translate = function translate(x, y, time, easingStyle) {
            var _this = this;
            time = time || 0;
            var easing = easingStyle || _utilEasing2.default.circular;
            this.setState({
                x: x,
                y: y,
                time: time,
                easing: easing
            }, function () {
                _this.fire('Scroll', {
                    target: _this,
                    postion: {
                        x: x,
                        y: y
                    }
                });
            });
        };
        ScrollView.prototype.onTouchStart = function onTouchStart(e) {
            e.preventDefault();
            var point = e.touches ? e.touches[0] : e;
            var pos = undefined;
            var onScrollEnd = this.props.onScrollEnd;
            this.touchStart = true;
            this.moved = false;
            this.distX = 0;
            this.distY = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.directionLocked = 0;
            this.startTime = _utilDate2.default.now();
            if (this.useTransition && this.isInTransition) {
                this.isInTransition = false;
                pos = this.getComputedPosition();
                this.translate(Math.round(pos.x), Math.round(pos.y));
                onScrollEnd && onScrollEnd();
            }
            this.startX = this.state.x;
            this.startY = this.state.y;
            this.absStartX = this.startX;
            this.absStartY = this.startY;
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            _utilDom2.default.on(window, 'touchmove', this.onTouchMove);
            _utilDom2.default.on(window, 'touchend', this.onTouchEnd);
            _utilDom2.default.on(window, 'touchcancel', this.onTouchEnd);
            var scroller = this.refs.scroller;
            _utilDom2.default.on(scroller, 'transitionend', this.onTransitionEnd);
            _utilDom2.default.on(scroller, 'webkitTransitionEnd', this.onTransitionEnd);
            _utilDom2.default.on(scroller, 'oTransitionEnd', this.onTransitionEnd);
            _utilDom2.default.on(scroller, 'MSTransitionEnd', this.onTransitionEnd);
            if (!this.props.disableMouse) {
                _utilDom2.default.on(window, 'mousemove', this.onTouchMove);
                _utilDom2.default.on(window, 'mousecancel', this.onTouchEnd);
                _utilDom2.default.on(window, 'mouseup', this.onTouchEnd);
            }
        };
        ScrollView.prototype.clearEvents = function clearEvents() {
            _utilDom2.default.off(window, 'touchmove', this.onTouchMove);
            _utilDom2.default.off(window, 'touchend', this.onTouchEnd);
            _utilDom2.default.off(window, 'touchcancel', this.onTouchEnd);
            var scroller = this.refs.scroller;
            _utilDom2.default.off(scroller, 'transitionend', this.onTransitionEnd);
            _utilDom2.default.off(scroller, 'webkitTransitionEnd', this.onTransitionEnd);
            _utilDom2.default.off(scroller, 'oTransitionEnd', this.onTransitionEnd);
            _utilDom2.default.off(scroller, 'MSTransitionEnd', this.onTransitionEnd);
            if (!this.props.disableMouse) {
                _utilDom2.default.off(window, 'mousemove', this.onTouchMove);
                _utilDom2.default.off(window, 'mousecancel', this.onTouchEnd);
                _utilDom2.default.off(window, 'mouseup', this.onTouchEnd);
            }
        };
        ScrollView.prototype.onTouchEnd = function onTouchEnd(e) {
            e.preventDefault();
            this.clearEvents();
            if (!this.touchStart) {
                return;
            }
            var duration = _utilDate2.default.now() - this.startTime;
            var newX = Math.round(this.state.x);
            var newY = Math.round(this.state.y);
            var time = 0;
            var easing = '';
            this.isInTransition = 0;
            this.initiated = 0;
            this.endTime = _utilDate2.default.now();
            if (this.resetPosition(this.props.bounceTime)) {
                return;
            }
            if (!this.moved) {
                this.fire('Click');
                this.fire('ScrollCancel');
                return;
            }
            var momentumX = undefined;
            var momentumY = undefined;
            if (this.props.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll ? momentum(this.state.x, this.startX, duration, this.maxScrollX, this.props.bounce ? this.wrapperWidth : 0, this.props.deceleration) : {
                    destination: newX,
                    duration: 0
                };
                momentumY = this.hasVerticalScroll ? momentum(this.state.y, this.startY, duration, this.maxScrollY, this.props.bounce ? this.wrapperHeight : 0, this.props.deceleration) : {
                    destination: newY,
                    duration: 0
                };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1;
            }
            if (newX !== this.state.x || newY !== this.state.y) {
                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                    easing = _utilEasing2.default.quadratic;
                }
                this.scrollTo(newX, newY, time, easing);
                return;
            }
        };
        ScrollView.prototype.onTouchMove = function onTouchMove(e) {
            e.preventDefault();
            var point = e.touches ? e.touches[0] : e;
            var deltaX = point.pageX - this.pointX;
            var deltaY = point.pageY - this.pointY;
            var timestamp = _utilDate2.default.now();
            this.pointX = point.pageX;
            this.pointY = point.pageY;
            this.distX += deltaX;
            this.distY += deltaY;
            var absDistX = Math.abs(this.distX);
            var absDistY = Math.abs(this.distY);
            if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
                return;
            }
            if (!this.directionLocked) {
                if (absDistX > absDistY + this.props.directionLockThreshold) {
                    this.directionLocked = 'h';
                } else if (absDistY >= absDistX + this.props.directionLockThreshold) {
                    this.directionLocked = 'v';
                } else {
                    this.directionLocked = 'n';
                }
            }
            if (this.directionLocked === 'h') {
                deltaY = 0;
            } else if (this.directionLocked === 'v') {
                deltaX = 0;
            }
            deltaX = this.hasHorizontalScroll ? deltaX : 0;
            deltaY = this.hasVerticalScroll ? deltaY : 0;
            var newX = this.state.x + deltaX;
            var newY = this.state.y + deltaY;
            if (newX > 0 || newX < this.maxScrollX) {
                newX = this.props.bounce ? this.state.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
            }
            if (newY > 0 || newY < this.maxScrollY) {
                newY = this.props.bounce ? this.state.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
            }
            this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
            this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;
            if (!this.moved) {
                this.fire('ScrollStart');
            }
            this.moved = true;
            this.translate(newX, newY);
            if (timestamp - this.startTime > 300) {
                this.startTime = timestamp;
                this.startX = this.state.x;
                this.startY = this.state.y;
            }
        };
        ScrollView.prototype.onTransitionEnd = function onTransitionEnd(e) {
            if (e.target !== this.refs.scroller || !this.isInTransition) {
                return;
            }
            this.transitionTime();
            if (!this.resetPosition(this.props.bounceTime)) {
                this.isInTransition = false;
                this.fire('ScrollEnd');
            }
        };
        ScrollView.prototype.fire = function fire(eventName) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
            var eventHandler = this.props['on' + eventName];
            eventHandler && eventHandler(data);
        };
        ScrollView.prototype.getComputedPosition = function getComputedPosition() {
            var matrix = window.getComputedStyle(this.refs.scroller, null);
            var x = undefined;
            var y = undefined;
            if (this.useTransform) {
                matrix = matrix[transitionStyles.transform].split(')')[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            } else {
                x = +matrix.left.replace(/[^-\d.]/g, '');
                y = +matrix.top.replace(/[^-\d.]/g, '');
            }
            return {
                x: x,
                y: y
            };
        };
        ScrollView.prototype.resetPosition = function resetPosition(time) {
            var _state = this.state;
            var x = _state.x;
            var y = _state.y;
            time = time || 0;
            if (!this.hasHorizontalScroll || this.state.x > 0) {
                x = 0;
            } else if (this.state.x < this.maxScrollX) {
                x = this.maxScrollX;
            }
            if (!this.hasVerticalScroll || this.state.y > 0) {
                y = 0;
            } else if (this.state.y < this.maxScrollY) {
                y = this.maxScrollY;
            }
            if (x === this.state.x && y === this.state.y) {
                return false;
            }
            this.scrollTo(x, y, time, this.props.bounceEasing);
            return true;
        };
        ScrollView.prototype.render = function render() {
            var _props = this.props;
            var children = _props.children;
            var component = _props.component;
            var style = _props.style;
            var disableMouse = _props.disableMouse;
            var other = babelHelpers.objectWithoutProperties(_props, [
                'children',
                'component',
                'style',
                'disableMouse'
            ]);
            var disabled = this.props.disabled;
            var _state2 = this.state;
            var x = _state2.x;
            var y = _state2.y;
            var time = _state2.time;
            var easing = _state2.easing;
            var scrollerStyle = babelHelpers._extends({}, style);
            scrollerStyle[transitionStyles.transitionDuration] = time + 'ms';
            scrollerStyle[transitionStyles.transitionTimingFunction] = easing || 'linear';
            scrollerStyle[transitionStyles.transform] = 'translate(' + x + 'px,' + y + 'px)' + ' translateZ(0)';
            children = _react2.default.createElement(component, {
                className: cx().part('scroller').build(),
                ref: 'scroller',
                style: scrollerStyle
            }, children);
            return _react2.default.createElement('div', babelHelpers._extends({}, other, {
                ref: 'main',
                className: cx(this.props).build(),
                onTouchStart: disabled ? null : this.onTouchStart,
                onMouseDown: disabled || disableMouse ? null : this.onTouchStart
            }), children);
        };
        return ScrollView;
    }(_react2.default.Component);
    exports.default = ScrollView;
    module.exports = exports.default;
});