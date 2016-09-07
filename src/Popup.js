/**
 * @file Popup
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes, Component} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import * as windowScrollHelper from './popup/windowScrollHelper';
import Mask from './Mask';

const cx = create('Popup');

export default class Popup extends Component {

    constructor(props) {

        super(props);

        this.state = {
            show: this.props.show,
            key: Date.now()
        };

        this.onMaskClick = this.onMaskClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        const show = nextProps.show;

        if (show === this.state.show) {
            return;
        }

        const onEvent = show ? this.onShow : this.onHide;
        this.setState({show}, onEvent);
    }

    onShow() {
        this.bodyScrolling();
        const onShow = this.props.onShow;
        if (onShow) {
            onShow();
        }
    }

    onHide() {
        this.bodyScrolling();
        const onHide = this.props.onHide;
        if (onHide) {
            onHide();
        }
    }

    onMaskClick(e) {
        this.setState({show: false}, this.onHide);
    }

    bodyScrolling() {
        let show = this.state.show;
        windowScrollHelper[show ? 'stop' : 'restore']();
    }

    render() {

        const props = this.props;
        const {
            mask,
            maskClickClose,
            translateFrom,
            transitionType,
            transitionTimeout,
            children,
            ...others
        } = props;

        const show = this.state.show;

        const type = transitionType === 'translate'
            ? transitionType + '-' + translateFrom
            : transitionType;

        const transitionName = 'transition-' + type;

        return (
            <div className={cx(props).addStates({show}).build()}>
                <CSSTransitionGroup
                    component="div"
                    {...others}
                    transitionName={transitionName}
                    transitionEnterTimeout={transitionTimeout || 4000}
                    transitionLeaveTimeout={transitionTimeout || 4000}>
                    {show ? <div className={cx.getPartClassName('body')}>
                        {children}
                    </div> : null}
                </CSSTransitionGroup>
                {mask
                    ? <Mask
                        show={show}
                        onClick={maskClickClose ? this.onMaskClick : null} />
                    : null
                }
            </div>
        );
    }

}

Popup.displayName = 'Popup';

Popup.propTypes = {
    ...CSSTransitionGroup.propTypes,
    show: PropTypes.bool,
    onHide: PropTypes.func,
    onShow: PropTypes.func,
    maskClickClose: PropTypes.bool,
    mask: PropTypes.bool,
    onMaskClick: PropTypes.func,
    translateFrom: PropTypes.string
};

Popup.defaultProps = {
    ...CSSTransitionGroup.defaultProps,
    maskClickClose: true,
    show: false,
    mask: true,
    translateFrom: 'bottom'
};
