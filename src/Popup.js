/**
 * @file esui-react/Popup
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const cx = require('./util/cxBuilder').create('Popup');
const windowScrollHelper = require('./popup/windowScrollHelper');
const Mask = require('./Mask');

const PropTypes = React.PropTypes;
const ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

const Popup = React.createClass({

    propTypes: {
        show: PropTypes.bool,
        onHide: PropTypes.func,
        onShow: PropTypes.func,
        maskClickClose: PropTypes.bool,
        mask: PropTypes.bool
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

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
            || nextState.show !== this.state.show;
    },

    componentWillReceiveProps(nextProps) {

        var show = nextProps.show;

        if (show === this.state.show) {
            return;
        }

        var onEvent = show ? this.onShow : this.onHide;
        this.setState({show: show}, onEvent);

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
        const {mask, maskClickClose, ...others} = props;
        const {show} = this.state;

        return (
            <div {...others} className={cx(props).addStates({show}).build()}>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName={'popup-transition-opacity'}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                    transitionEnter={true}
                    transitionLeave={true}>
                    {this.renderPopupBody()}
                </ReactCSSTransitionGroup>
                {mask ? <Mask show={show} onClick={maskClickClose ? this.onMaskClick : null} /> : null}
            </div>
        );

    }

});

module.exports = Popup;
