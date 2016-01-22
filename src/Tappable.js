/**
 * @file TappableComponent From https://github.com/JedWatson/react-tappable
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const ReactDOM = require('react-dom');

const cx = require('melon-classname').create('Tappable');

const {PropTypes} = React;

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

const touchStyles = {
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    WebkitTouchCallout: 'none',
    WebkitUserSelect: 'none',
    // KhtmlUserSelect: 'none',
    // MozUserSelect: 'none',
    // msUserSelect: 'none',
    userSelect: 'none',
    cursor: 'pointer'
};

class Tappable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseOut = this.onMouseOut.bind(this);
        this.makeActive = this.makeActive.bind(this);
    }

    componentWillUnmount() {
        this.cleanupScrollDetection();
        this.cancelPressDetection();
        this.clearActiveTimeout();
    }

    processEvent(event) {
        if (this.props.preventDefault) {
            event.preventDefault();
        }
        if (this.props.stopPropagation) {
            event.stopPropagation();
        }
    }

    onTouchStart(event) {
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
        else if (this.onPinchStart
                && (this.props.onPinchStart
                    || this.props.onPinchMove
                    || this.props.onPinchEnd)
                && event.touches.length === 2) {
            this.onPinchStart(event);
        }
    }

    makeActive() {
        this.clearActiveTimeout();
        this.setState({
            isActive: true
        });
    }

    clearActiveTimeout() {
        clearTimeout(this._activeTimeout);
        this._activeTimeout = false;
    }

    initScrollDetection() {
        this._scrollPos = {
            top: 0,
            left: 0
        };
        this._scrollParents = [];
        this._scrollParentPos = [];
        let node = ReactDOM.findDOMNode(this);

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

    calculateMovement(touch) {
        return {
            x: Math.abs(touch.clientX - this._initialTouch.clientX),
            y: Math.abs(touch.clientY - this._initialTouch.clientY)
        };
    }

    detectScroll() {
        let currentScrollPos = {
            top: 0,
            left: 0
        };
        for (let i = 0; i < this._scrollParents.length; i++) {
            currentScrollPos.top += this._scrollParents[i].scrollTop;
            currentScrollPos.left += this._scrollParents[i].scrollLeft;
        }
        return !(currentScrollPos.top === this._scrollPos.top && currentScrollPos.left === this._scrollPos.left);
    }

    cleanupScrollDetection() {
        this._scrollParents = undefined;
        this._scrollPos = undefined;
    }

    initPressDetection(event, callback) {
        if (!this.props.onPress) {
            return;
        }
        this._pressTimeout = setTimeout(() => {
            this.props.onPress(event);
            callback();
        }, this.props.pressDelay);
    }

    cancelPressDetection() {
        clearTimeout(this._pressTimeout);
    }

    onTouchMove(event) {
        if (this._initialTouch) {
            this.processEvent(event);

            if (this.detectScroll()) {
                return this.endTouch(event);
            }

            this.props.onTouchMove && this.props.onTouchMove(event);
            this._lastTouch = getTouchProps(event.touches[0]);
            const movement = this.calculateMovement(this._lastTouch);
            if (movement.x > this.props.pressMoveThreshold || movement.y > this.props.pressMoveThreshold) {
                this.cancelPressDetection();
            }
            if (movement.x > this.props.moveThreshold || movement.y > this.props.moveThreshold) {
                if (this.state.isActive) {
                    this.setState({
                        isActive: false
                    });
                }
                else if (this._activeTimeout) {
                    this.clearActiveTimeout();
                }
            }
            else {
                if (!this.state.isActive && !this._activeTimeout) {
                    this.setState({
                        isActive: true
                    });
                }
            }
        }
        else if (this._initialPinch && event.touches.length === 2 && this.onPinchMove) {
            this.onPinchMove(event);
            event.preventDefault();
        }
    }

    onTouchEnd(event) {
        const me = this;

        if (this._initialTouch) {
            this.processEvent(event);
            let afterEndTouch;
            const movement = this.calculateMovement(this._lastTouch);
            if (movement.x <= this.props.moveThreshold && movement.y <= this.props.moveThreshold && this.props.onTap) {
                event.preventDefault();
                afterEndTouch = function () {
                    const finalParentScrollPos = me._scrollParents.map(function (node) {
                        return node.scrollTop + node.scrollLeft;
                    });
                    const stoppedMomentumScroll = me._scrollParentPos.some(function (end, i) {
                        return end !== finalParentScrollPos[i];
                    });
                    if (!stoppedMomentumScroll) {
                        me.props.onTap(event);
                    }
                };
            }
            this.endTouch(event, afterEndTouch);
        }
        else if (this.onPinchEnd && this._initialPinch && event.touches.length + event.changedTouches.length === 2) {
            this.onPinchEnd(event);
            event.preventDefault();
        }
    }

    endTouch(event, callback) {
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
            this.setState({
                isActive: false
            });
        }
    }

    onMouseDown(event) {
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
        this.setState({
            isActive: true
        });
    }

    onMouseMove(event) {
        if (window._blockMouseEvents || !this._mouseDown) {
            return;
        }
        this.processEvent(event);
        this.props.onMouseMove && this.props.onMouseMove(event);
    }

    onMouseUp(event) {
        if (window._blockMouseEvents || !this._mouseDown) {
            return;
        }
        this.processEvent(event);
        this.props.onMouseUp && this.props.onMouseUp(event);
        this.props.onTap && this.props.onTap(event);
        this.endMouseEvent();
    }

    onMouseOut(event) {
        if (window._blockMouseEvents || !this._mouseDown) {
            return;
        }
        this.processEvent(event);
        this.props.onMouseOut && this.props.onMouseOut(event);
        this.endMouseEvent();
    }

    endMouseEvent() {
        this.cancelPressDetection();
        this._mouseDown = false;
        this.setState({
            isActive: false
        });
    }

    cancelTap() {
        this.endTouch();
        this._mouseDown = false;
    }

    handlers() {
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

    render() {
        const props = this.props;
        const className = cx(props)
            .addStates({active: this.state.isActive})
            .build();

        const style = {
            ...touchStyles,
            ...props.style
        };

        let newComponentProps = {
            ...props,
            style,
            className,
            disabled: props.disabled,
            handlers: this.handlers,
            ...this.handlers()
        };

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
    }
}


Tappable.displayName = 'Tappable';

Tappable.propTypes = {
    moveThreshold: PropTypes.number, // pixels to move before cancelling tap
    activeDelay: PropTypes.number, // ms to wait before adding the `-active` class
    pressDelay: PropTypes.number, // ms to wait before detecting a press
    pressMoveThreshold: PropTypes.number, // pixels to move before cancelling press
    preventDefault: PropTypes.bool, // whether to preventDefault on all events
    stopPropagation: PropTypes.bool, // whether to stopPropagation on all events

    onTap: PropTypes.func, // fires when a tap is detected
    onPress: PropTypes.func, // fires when a press is detected
    onTouchStart: PropTypes.func, // pass-through touch event
    onTouchMove: PropTypes.func, // pass-through touch event
    onTouchEnd: PropTypes.func, // pass-through touch event
    onMouseDown: PropTypes.func, // pass-through mouse event
    onMouseUp: PropTypes.func, // pass-through mouse event
    onMouseMove: PropTypes.func, // pass-through mouse event
    onMouseOut: PropTypes.func, // pass-through mouse event

    component: PropTypes.any, // component to create
    className: PropTypes.string, // optional className
    classBase: PropTypes.string, // base for generated classNames
    style: PropTypes.object, // additional style properties for the component
    disabled: PropTypes.bool // only applies to buttons
};

Tappable.defaultProps = {
    activeDelay: 0,
    moveThreshold: 100,
    pressDelay: 1000,
    pressMoveThreshold: 5,
    component: 'span',
    classBase: 'Tappable'
};


module.exports = Tappable;
