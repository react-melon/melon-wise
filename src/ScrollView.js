/**
 * @file esui-react/ScrollView
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import dom from './util/dom';
import date from './util/date';
import EASING from './util/easing';

const {PropTypes} = React;

const cx = require('./util/cxBuilder').create('Scrollview');


const transitionStyles = Object.assign({}, {
    transform: dom.prefixStyle('transform'),
    transitionTimingFunction: dom.prefixStyle('transitionTimingFunction'),
    transitionDuration: dom.prefixStyle('transitionDuration'),
    transitionDelay: dom.prefixStyle('transitionDelay'),
    transformOrigin: dom.prefixStyle('transformOrigin')
});


const momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
    var distance = current - start;
    var speed = Math.abs(distance) / time;
    var destination;
    var duration;

    deceleration = deceleration === undefined ? 0.0006 : deceleration;

    destination = current + (speed * speed) / (2 * deceleration) * (distance < 0 ? -1 : 1);
    duration = speed / deceleration;

    if (destination < lowerMargin) {
        destination = wrapperSize ? lowerMargin - (wrapperSize / 2.5 * (speed / 8)) : lowerMargin;
        distance = Math.abs(destination - current);
        duration = distance / speed;
    }
    else if (destination > 0) {
        destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
        distance = Math.abs(current) + destination;
        duration = distance / speed;
    }

    return {
        destination: Math.round(destination),
        duration: duration
    };
};

class ScrollView extends React.Component {

    static displayName = 'ScrollView';

    static propTypes = {
        horizontal: PropTypes.bool,
        component: PropTypes.any,

        bounce: PropTypes.bool,
        bounceTime: PropTypes.number,
        bounceEasing: PropTypes.string,

        useTransition: PropTypes.bool,
        useTransform: PropTypes.bool,

        directionLockThreshold: PropTypes.number,
        disableMouse: PropTypes.bool
    };

    static defaultProps = {
        horizontal: false,
        component: 'div',

        bounce: true,
        bounceTime: 600,
        bounceEasing: '',

        useTransform: true,
        useTransition: true,

        disableMouse: true,
        momentum: true
    };


    constructor(props) {
        super(props);

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
    }

    shouldComponentUpdate(nextProps, nextState) {

        return this.props !== nextProps
            || nextState.x !== this.state.x
            || nextState.y !== this.state.y
            || nextState.time !== this.state.time
            || nextState.easing !== this.state.easing;
    }

    componentDidMount() {

        this.useTransition = dom.hasTransition && this.props.useTransition;
        this.useTransform = dom.hasTransform && this.props.useTransform;

        this.directionX = 0;
        this.directionY = 0;

        this.refresh();
    }

    componentWillUnMount() {
        this.clearEvents();
    }

    refresh() {

        let main = this.refs.main;

        this.wrapperWidth   = main.clientWidth;
        this.wrapperHeight  = main.clientHeight;

/* REPLACE START: refresh */

        this.scrollerWidth  = this.refs.scroller.offsetWidth;
        this.scrollerHeight = this.refs.scroller.offsetHeight;

        this.maxScrollX     = this.wrapperWidth - this.scrollerWidth;
        this.maxScrollY     = this.wrapperHeight - this.scrollerHeight;

/* REPLACE END: refresh */

        this.hasHorizontalScroll    = this.props.horizontal && this.maxScrollX < 0;
        this.hasVerticalScroll      = this.maxScrollY < 0;

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

        this.wrapperOffset = dom.getPosition(main);

        this.resetPosition();
    }

    scrollTo(x, y, time, easing) {
        easing = easing || EASING.circular;

        this.isInTransition = this.useTransition && time > 0;

        // if (!time || (this.useTransition && easing.style)) {

        this.translate(x, y, time, easing.style);
        // }
        // else {
        //     this.animate(x, y, time, easing.fn);
        // }

    }

    transitionTime(time) {
        time = time || 0;
        this.setState({
            time: time
        });
    }

    translate(x, y, time, easingStyle) {
        // if (!this.useTransform) {
        //     x = Math.round(x);
        //     y = Math.round(y);
        //     this.scrollerStyle.left = x + 'px';
        //     this.scrollerStyle.top = y + 'px';
        // }

        time = time || 0;
        let easing = easingStyle || EASING.circular;

        this.setState({
            x,
            y,
            time,
            easing
        }, () => {
            this.fire('Scroll', {
                target: this,
                postion: {
                    x: x,
                    y: y
                }
            });
        });
    }

    onTouchStart(e) {

        e.preventDefault();

        let point = e.touches ? e.touches[0] : e;
        let pos;

        let {onScrollEnd} = this.props;

        this.moved      = false;
        this.distX      = 0;
        this.distY      = 0;
        this.directionX = 0;
        this.directionY = 0;
        this.directionLocked = 0;

        this.startTime = date.now();

        if (this.useTransition && this.isInTransition) {
            this.isInTransition = false;
            pos = this.getComputedPosition();
            this.translate(Math.round(pos.x), Math.round(pos.y));
            onScrollEnd && onScrollEnd();
        }

        this.startX    = this.state.x;
        this.startY    = this.state.y;
        this.absStartX = this.startX;
        this.absStartY = this.startY;
        this.pointX    = point.pageX;
        this.pointY    = point.pageY;

        dom.on(window, 'touchmove', this.onTouchMove);
        dom.on(window, 'touchend', this.onTouchEnd);
        dom.on(window, 'touchcancel', this.onTouchEnd);

        let scroller = this.refs.scroller;

        dom.on(scroller, 'transitionend', this.onTransitionEnd);
        dom.on(scroller, 'webkitTransitionEnd', this.onTransitionEnd);
        dom.on(scroller, 'oTransitionEnd', this.onTransitionEnd);
        dom.on(scroller, 'MSTransitionEnd', this.onTransitionEnd);

        if (!this.props.disableMouse) {
            dom.on(window, 'mousemove', this.onTouchMove);
            dom.on(window, 'mousecancel', this.onTouchEnd);
            dom.on(window, 'mouseup', this.onTouchEnd);
        }

    }

    clearEvents() {
        dom.off(window, 'touchmove', this.onTouchMove);
        dom.off(window, 'touchend', this.onTouchEnd);
        dom.off(window, 'touchcancel', this.onTouchEnd);

        let scroller = this.refs.scroller;

        dom.off(scroller, 'transitionend', this.onTransitionEnd);
        dom.off(scroller, 'webkitTransitionEnd', this.onTransitionEnd);
        dom.off(scroller, 'oTransitionEnd', this.onTransitionEnd);
        dom.off(scroller, 'MSTransitionEnd', this.onTransitionEnd);

        if (!this.props.disableMouse) {
            dom.off(window, 'mousemove', this.onTouchMove);
            dom.off(window, 'mousecancel', this.onTouchEnd);
            dom.off(window, 'mouseup', this.onTouchEnd);
        }
    }

    onTouchEnd(e) {

        e.preventDefault();

        // let point       = e.touches ? e.touches[0] : e;
        let duration    = date.now() - this.startTime;
        let newX = Math.round(this.state.x);
        let newY = Math.round(this.state.y);
        // let distanceX = Math.abs(newX - this.startX);
        // let distanceY = Math.abs(newY - this.startY);
        let time = 0;
        let easing = '';

        this.isInTransition = 0;
        this.initiated = 0;
        this.endTime = date.now();

        // reset if we are outside of the boundaries
        if (this.resetPosition(this.props.bounceTime)) {
            this.clearEvents();
            return;
        }

        // we scrolled less than 10 pixels
        if (!this.moved) {

            this.fire('Click');
            this.fire('ScrollCancel');

            this.clearEvents();
            return;
        }

        let momentumX;
        let momentumY;

        // start momentum animation if needed
        if (this.props.momentum && duration < 300) {
            momentumX = this.hasHorizontalScroll
                    ? momentum(
                        this.state.x, this.startX, duration, this.maxScrollX,
                        this.props.bounce ? this.wrapperWidth : 0,
                        this.props.deceleration
                    )
                    : {destination: newX, duration: 0};
            momentumY = this.hasVerticalScroll
                    ? momentum(
                        this.state.y, this.startY, duration, this.maxScrollY,
                        this.props.bounce ? this.wrapperHeight : 0,
                        this.props.deceleration
                    )
                    : {destination: newY, duration: 0};
            newX = momentumX.destination;
            newY = momentumY.destination;
            time = Math.max(momentumX.duration, momentumY.duration);
            this.isInTransition = 1;
        }


// INSERT POINT: _end

        if (newX !== this.state.x || newY !== this.state.y) {
            // change easing function when scroller goes out of the boundaries
            if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                easing = EASING.quadratic;
            }

            this.scrollTo(newX, newY, time, easing);
            this.clearEvents();
            return;
        }

        this.clearEvents();
    }

    onTouchMove(e) {

        e.preventDefault();

        let point       = e.touches ? e.touches[0] : e;
        let deltaX      = point.pageX - this.pointX;
        let deltaY      = point.pageY - this.pointY;
        let timestamp   = date.now();

        this.pointX     = point.pageX;
        this.pointY     = point.pageY;

        this.distX      += deltaX;
        this.distY      += deltaY;
        let absDistX    = Math.abs(this.distX);
        let absDistY    = Math.abs(this.distY);

        // We need to move at least 10 pixels for the scrolling to initiate
        if (timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10)) {
            return;
        }

        // If you are scrolling in one direction lock the other
        if (!this.directionLocked) {
            if (absDistX > absDistY + this.props.directionLockThreshold) {
                this.directionLocked = 'h';     // lock horizontally
            }
            else if (absDistY >= absDistX + this.props.directionLockThreshold) {
                this.directionLocked = 'v';     // lock vertically
            }
            else {
                this.directionLocked = 'n';     // no lock
            }
        }

        if (this.directionLocked === 'h') {
            deltaY = 0;
        }
        else if (this.directionLocked === 'v') {
            deltaX = 0;
        }

        deltaX = this.hasHorizontalScroll ? deltaX : 0;
        deltaY = this.hasVerticalScroll ? deltaY : 0;

        let newX = this.state.x + deltaX;
        let newY = this.state.y + deltaY;

        // Slow down if outside of the boundaries
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

        // console.log(e, newX, newY);

        this.translate(newX, newY);

/* REPLACE START: move */

        if (timestamp - this.startTime > 300) {
            this.startTime = timestamp;
            this.startX = this.state.x;
            this.startY = this.state.y;
        }


    }

    onTransitionEnd(e) {
        if (e.target !== this.refs.scroller || !this.isInTransition) {
            return;
        }

        this.transitionTime();
        if (!this.resetPosition(this.props.bounceTime)) {
            this.isInTransition = false;
            this.fire('ScrollEnd');
        }
    }

    fire(eventName, data = {}) {
        let eventHandler = this.props['on' + eventName];

        eventHandler && eventHandler(data);
    }

    getComputedPosition() {

        let matrix = window.getComputedStyle(this.refs.scroller, null);
        let x;
        let y;

        if (this.useTransform) {
            matrix = matrix[transitionStyles.transform].split(')')[0].split(', ');
            x = +(matrix[12] || matrix[4]);
            y = +(matrix[13] || matrix[5]);
        }
        else {
            x = +matrix.left.replace(/[^-\d.]/g, '');
            y = +matrix.top.replace(/[^-\d.]/g, '');
        }

        return {
            x: x,
            y: y
        };
    }

    resetPosition(time) {

        let {x, y} = this.state;

        time = time || 0;

        if (!this.hasHorizontalScroll || this.state.x > 0) {
            x = 0;
        }
        else if (this.state.x < this.maxScrollX) {
            x = this.maxScrollX;
        }

        if (!this.hasVerticalScroll || this.state.y > 0) {
            y = 0;
        }
        else if (this.state.y < this.maxScrollY) {
            y = this.maxScrollY;
        }

        if (x === this.state.x && y === this.state.y) {
            return false;
        }

        this.scrollTo(x, y, time, this.props.bounceEasing);

        return true;
    }

    render() {

        let {
            children,
            component,
            style,
            disableMouse,
            ...other
        } = this.props;

        let disabled = this.props.disabled;

        let {
            x,
            y,
            time,
            easing
        } = this.state;

        let scrollerStyle = {...style};

        scrollerStyle[transitionStyles.transitionDuration] = time + 'ms';
        scrollerStyle[transitionStyles.transitionTimingFunction] = easing || 'linear';
        scrollerStyle[transitionStyles.transform] = 'translate(' + x + 'px,' + y + 'px)' + ' translateZ(0)';

        children = React.createElement(component, {
            className: cx().part('scroller').build(),
            ref: 'scroller',
            style: scrollerStyle
        }, children);

        return (
            <div
                {...other}
                ref="main"
                className={cx(this.props).build()}
                onTouchStart={disabled ? null : this.onTouchStart}
                onMouseDown={(disabled || disableMouse) ? null : this.onTouchStart}>
                {children}
            </div>
        );

    }

}

export default ScrollView;
