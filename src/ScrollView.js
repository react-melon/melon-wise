/**
 * @file esui-react/ScrollView
 * @author cxtom<cxtom2010@gmail.com>
 */

import React from 'react';
import Component from './Component';
import dom from './common/util/dom';
import date from './common/util/date';

const {PropTypes} = React;


const transitionStyles = Object.assign({}, {
    transform: dom.prefixStyle('transform'),
    transitionTimingFunction: dom.prefixStyle('transitionTimingFunction'),
    transitionDuration: dom.prefixStyle('transitionDuration'),
    transitionDelay: dom.prefixStyle('transitionDelay'),
    transformOrigin: dom.prefixStyle('transformOrigin')
});

const EASING = Object.assign({}, {
    quadratic: {
        style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        fn: function (k) {
            return k * (2 - k);
        }
    },
    circular: {
        style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',   // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
        fn: function (k) {
            return Math.sqrt(1 - (--k * k));
        }
    },
    back: {
        style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        fn: function (k) {
            var b = 4;
            return (k = k - 1) * k * ((b + 1) * k + b) + 1;
        }
    },
    bounce: {
        style: '',
        fn: function (k) {
            if ((k /= 1) < (1 / 2.75)) {
                return 7.5625 * k * k;
            }
            else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            }
            else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            }
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    },
    elastic: {
        style: '',
        fn: function (k) {
            var f = 0.22;
            var e = 0.4;

            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }

            return (e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1);
        }
    }
});

let momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
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

class ScrollView extends Component {

    static displayName = 'ScrollView';

    static propTypes = {
        horizontal: PropTypes.bool,
        component: PropTypes.any,

        bounce: PropTypes.bool,
        bounceTime: PropTypes.number,
        bounceEasing: PropTypes.string,

        useTransition: PropTypes.bool,
        useTransform: PropTypes.bool,

        directionLockThreshold: PropTypes.number
    };

    static defaultProps = {
        horizontal: false,
        component: 'div',

        bounce: true,
        bounceTime: 600,
        bounceEasing: '',

        useTransform: true,
        useTransition: true
    };


    constructor(props) {
        super(props);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchCancel = this.onTouchCancel.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    componentDidMount() {
        this.scrollerStyle = this.refs.scroller.style;

        this.useTransition = dom.hasTransition && this.props.useTransition;
        this.useTransform = dom.hasTransform && this.props.useTransform;

        this.x = 0;
        this.y = 0;
        this.directionX = 0;
        this.directionY = 0;

        this.refresh();
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
        this.transitionTimingFunction(easing.style);
        this.transitionTime(time);
        this.translate(x, y);
        // }
        // else {
        //     this.animate(x, y, time, easing.fn);
        // }

        if (this.props.onScroll) {
            this.props.onScroll({
                target: this,
                postion: {
                    x: x,
                    y: y
                }
            });
        }
    }

    transitionTime(time) {
        time = time || 0;
        this.scrollerStyle[transitionStyles.transitionDuration] = time + 'ms';
    }

    transitionTimingFunction(easing) {
        this.scrollerStyle[transitionStyles.transitionTimingFunction] = easing;
    }

    translate(x, y) {
        if (this.useTransform) {
            this.scrollerStyle[transitionStyles.transform] = 'translate(' + x + 'px,' + y + 'px)' + ' translateZ(0)';
        }
        else {
            x = Math.round(x);
            y = Math.round(y);
            this.scrollerStyle.left = x + 'px';
            this.scrollerStyle.top = y + 'px';
        }

        this.x = x;
        this.y = y;
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
        else if (!this.useTransition && this.isAnimating) {
            this.isAnimating = false;
            onScrollEnd && onScrollEnd();
        }

        this.startX    = this.x;
        this.startY    = this.y;
        this.absStartX = this.x;
        this.absStartY = this.y;
        this.pointX    = point.pageX;
        this.pointY    = point.pageY;

        dom.on(window, 'touchmove', this.onTouchMove);
        dom.on(window, 'touchend', this.onTouchEnd);
        dom.on(window, 'touchcancel', this.onTouchCancel);

    }

    clearEvents() {
        dom.off(window, 'touchmove', this.onTouchMove);
        dom.off(window, 'touchend', this.onTouchEnd);
        dom.off(window, 'touchcancel', this.onTouchCancel);
    }

    onTouchEnd(e) {

        e.preventDefault();

        let point       = e.touches ? e.touches[0] : e;
        let duration    = date.now() - this.startTime;
        let newX = Math.round(this.x);
        let newY = Math.round(this.y);
        let distanceX = Math.abs(newX - this.startX);
        let distanceY = Math.abs(newY - this.startY);
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

            if (this.props.onClick) {
                this.props.onClick(e);
            }
            if (this.props.onScrollCancel) {
                this.props.onScrollCancel();
            }

            this.clearEvents();
            return;
        }

        let momentumX;
        let momentumY;

        // start momentum animation if needed
        if (this.props.momentum && duration < 300) {
            momentumX = this.hasHorizontalScroll
                    ? momentum(
                        this.x, this.startX, duration, this.maxScrollX,
                        this.options.bounce ? this.wrapperWidth : 0,
                        this.options.deceleration
                    )
                    : {destination: newX, duration: 0};
            momentumY = this.hasVerticalScroll
                    ? momentum(
                        this.y, this.startY, duration, this.maxScrollY,
                        this.options.bounce ? this.wrapperHeight : 0,
                        this.options.deceleration
                    )
                    : {destination: newY, duration: 0};
            newX = momentumX.destination;
            newY = momentumY.destination;
            time = Math.max(momentumX.duration, momentumY.duration);
            this.isInTransition = 1;
        }


// INSERT POINT: _end

        if (newX !== this.x || newY !== this.y) {
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

        let newX = this.x + deltaX;
        let newY = this.y + deltaY;

        // Slow down if outside of the boundaries
        if (newX > 0 || newX < this.maxScrollX) {
            newX = this.props.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
        }
        if (newY > 0 || newY < this.maxScrollY) {
            newY = this.props.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
        }

        this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
        this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

        if (!this.moved) {
            let {onScrollStart} = this.props;
            onScrollStart && onScrollStart(e);
        }

        this.moved = true;

        console.log(e, newX, newY);

        this.translate(newX, newY);

/* REPLACE START: move */

        if (timestamp - this.startTime > 300) {
            this.startTime = timestamp;
            this.startX = this.x;
            this.startY = this.y;
        }


    }

    onTouchCancel(e) {

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

        let {x, y} = this;

        time = time || 0;

        if (!this.hasHorizontalScroll || this.x > 0) {
            x = 0;
        }
        else if (this.x < this.maxScrollX) {
            x = this.maxScrollX;
        }

        if (!this.hasVerticalScroll || this.y > 0) {
            y = 0;
        }
        else if (this.y < this.maxScrollY) {
            y = this.maxScrollY;
        }

        if (x === this.x && y === this.y) {
            return false;
        }

        this.scrollTo(x, y, time, this.props.bounceEasing);

        return true;
    }

    render() {

        let {
            label,
            children,
            component,
            style,
            ...other
        } = this.props;

        let disabled = this.props.disabled;

        children = React.createElement(component, {
            className: this.getPartClassName('scroller'),
            ref: 'scroller',
            style: style
        }, children);

        return (
            <div
                {...other}
                ref="main"
                className={this.getClassName()}
                onTouchStart={disabled ? null : this.onTouchStart}>
                {children}
            </div>
        );

    }

}

module.exports = ScrollView;
