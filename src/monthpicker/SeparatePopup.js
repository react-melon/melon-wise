/**
 * @file monthpicker SeparatePopup
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {PropTypes} from 'react';
import Popup from '../Popup';
import Tappable from '../Tappable';
import {create} from 'melon-core/classname/cxBuilder';
import LockBody from '../common/LockBody';

import Selector from '../Selector';
import * as dateUtil from '../util/date';

const cx = create('MonthPicker');

export default class SeparatePopup extends LockBody {

    constructor(props) {

        super(props);

        this.timer = null;

        this.state = {
            date: props.date,
            mode: 'year'
        };

        this.onHide = this.onHide.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        let timer = this.timer;
        if (timer) {
            clearTimeout(timer);
        }
    }

    onHide() {
        const onHide = this.props.onHide;
        onHide && onHide();

        this.timer = setTimeout(() => {
            this.setState({mode: 'year'});
        }, 300);
    }

    onCancel() {
        this.onHide();
    }

    onChange(e) {

        const {
            mode,
            date
        } = this.state;

        let newDate = dateUtil.cloneAsDate(date);
        newDate[mode === 'year' ? 'setFullYear' : 'setMonth'](e.value);

        let nextState = {
            date: newDate
        };

        if (mode === 'year') {
            nextState.mode = 'month';
        }

        this.setState(nextState, () => {

            if (mode === 'month') {

                const onChange = this.props.onChange;
                this.onHide();

                onChange && onChange({
                    value: this.state.date,
                    target: this
                });
            }
        });
    }

    render() {

        const {
            show,
            begin,
            end,
            ...rest
        } = this.props;

        const {
            mode,
            date
        } = this.state;

        let items = [];
        let index;

        if (mode === 'year') {

            const endYear = end.getFullYear();

            for (let i = 0, len = dateUtil.yearDiff(end, begin); i < len; i++) {
                items.push({
                    name: endYear - i,
                    value: endYear - i
                });
            }

            index = dateUtil.yearDiff(end, date);

        }
        else {

            let beginMonth = 0;
            let len = 12;

            index = date.getMonth();

            if (dateUtil.isEqualYear(date, end)) {
                len = end.getMonth() + 1;
            }
            else if (dateUtil.isEqualYear(date, begin)) {
                beginMonth = begin.getMonth();
                len = len - beginMonth;
                index = index - beginMonth;
            }

            for (let i = beginMonth; i < len; i++) {
                items.push({
                    name: dateUtil.datePad(i + 1),
                    value: i
                });
            }
        }

        return (
            <Popup
                {...rest}
                show={show}
                transitionType="translate"
                direction="bottom"
                onHide={this.onHide}>
                <div className={cx.getPartClassName('panel')}>
                    <Selector
                        ref="selector"
                        items={items}
                        className={cx.getPartClassName('selector')}
                        selectedIndex={index}
                        variants={[mode]}
                        onChange={this.onChange} />
                </div>
                <Tappable
                    component="div"
                    onTap={this.onCancel}
                    className={cx.getPartClassName('cancel')}>
                    取消
                </Tappable>
            </Popup>
        );
    }

}

SeparatePopup.displayName = 'MonthPickerSeparatePopup';

SeparatePopup.propTypes = {
    ...Popup.propTypes,
    date: PropTypes.instanceOf(Date),
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date)
};

SeparatePopup.defaultProps = {
    ...Popup.defaultProps
};
