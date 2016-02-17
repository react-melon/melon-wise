/**
 * @file esui-react/Popup
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('melon-classname').create('Popup');

const windowScrollHelper = require('./popup/windowScrollHelper');
const Mask = require('./Mask');
const CSSTransitionGroup = require('./CSSTransitionGroup');

const PropTypes = React.PropTypes;


const Popup = React.createClass({

    propTypes: {
        show: PropTypes.bool,
        onHide: PropTypes.func,
        onShow: PropTypes.func,
        maskClickClose: PropTypes.bool,
        mask: PropTypes.bool,
        onMaskClick: PropTypes.func
    },

    getDefaultProps() {
        return {
            maskClickClose: true,
            show: false,
            mask: true
        };
    },

    getInitialState() {

        this.originalHTMLBodySize = {};

        return {
            show: this.props.show
        };
    },

    componentWillReceiveProps(nextProps) {

        const show = nextProps.show;

        if (show === this.state.show) {
            return;
        }

        const onEvent = show ? this.onShow : this.onHide;
        this.setState({show}, onEvent);

    },

    onShow() {
        this.bodyScrolling();
        const {onShow} = this.props;
        if (onShow) {
            onShow();
        }
    },

    onHide() {
        this.bodyScrolling();
        const {onHide} = this.props;
        if (onHide) {
            onHide();
        }
    },

    onMaskClick(e) {
        this.setState({show: false}, this.onHide);
    },

    bodyScrolling() {
        let show = this.state.show;
        windowScrollHelper[show ? 'stop' : 'restore']();
    },

    render() {

        const {props} = this;
        const {
            mask,
            maskClickClose,
            translateFrom,
            transitionType,
            transitionTimeout,
            children,
            ...others
        } = props;
        const {show} = this.state;

        return (
            <div {...others} className={cx(props).addStates({show}).build()}>
                <CSSTransitionGroup
                    component="div"
                    transitionTimeout={transitionTimeout || 400}
                    transitionType={transitionType || 'instant'}
                    translateFrom={translateFrom || 'bottom'}>
                    {show
                        ? React.cloneElement(children, {className: cx().part('body').build(), childKey: 'melon-popup'})
                        : null
                    }
                </CSSTransitionGroup>
                {mask ? <Mask show={show} onClick={maskClickClose ? this.onMaskClick : null} /> : null}
            </div>
        );

    }

});

module.exports = Popup;
