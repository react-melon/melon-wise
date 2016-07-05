/**
 * @file melon-wise/MonthPicker
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

import {create} from 'melon-core/classname/cxBuilder';
import InputComponent from 'melon-core/InputComponent';
import {getNextValidity} from 'melon-core/util/syncPropsToState';

import * as DateTime from './util/date';
import SeparatePopup from './monthpicker/SeparatePopup';
import * as popupHelper from './util/separatePopupHelper';

const cx = create('MonthPicker');

export default class MonthPicker extends InputComponent {

    constructor(props, context) {
        super(props, context);

        const value = this.state.value;

        this.state = {
            ...this.state,
            date: value ? this.parseDate(value) : undefined
        };

        this.onClick = this.onClick.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidMount() {
        super.componentDidMount();
        this.container = popupHelper.createPopup({
            className: cx().part('popup').build()
        });
        this.renderPopup(false);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        popupHelper.destoryPopup(this.container);
        this.container = null;
    }

    getSyncUpdates(nextProps) {

        const {disabled, readOnly, customValidity, defaultValue} = nextProps;

        let value = nextProps.value ? nextProps.value : defaultValue;

        // 如果有值，那么就试着解析一下；否则设置为 undefined
        let date = value ? this.parseDate(value) : undefined;

        const vilidity = getNextValidity(this, {value, disabled, customValidity});

        return {
            date,
            vilidity,
            value: (disabled || readOnly || !value) ? value : this.stringifyValue(date)
        };

    }


    /**
     * 日期字符串转为Date对象
     *
     * @param  {Date|string} date 源日期对象
     * @return {Date} 格式化后的日期对象
     * @private
     */
    parseDate(date) {

        if (DateTime.isDateObject(date)) {
            return date;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(date, format);
    }

    /**
     * 格式化日期
     *
     * @param  {Date} date 源日期对象
     * @return {string} 格式化后的日期字符串
     * @private
     */
    stringifyValue(date) {

        if (!DateTime.isDateObject(date)) {
            return date;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.format(date, format, this.props.lang);
    }

    onClick(e) {
        this.renderPopup(true);
    }

    onDateChange({value}) {

        this.setState({date: value});

        const onChange = this.props.onChange;

        onChange({
            type: 'change',
            target: this,
            value: this.stringifyValue(value)
        });
    }

    renderPopup(isOpen) {

        const {
            begin,
            end
        } = this.props;

        const endDate = end ? this.parseDate(end) : new Date();
        const beginDate = begin ? this.parseDate(begin) : DateTime.addYears(endDate, -80);

        ReactDOM.render(
            <SeparatePopup
                show={isOpen}
                transitionTimeout={300}
                transitionType="translate"
                direction="bottom"
                begin={beginDate}
                end={endDate}
                date={this.state.date || new Date()}
                onHide={() => {
                    this.renderPopup(false);
                }}
                onChange={this.onDateChange} />,
            this.container
        );
    }

    renderResult() {

        const value = this.props.value;

        return value ? (
            <div className={cx().part('result').build()}>
                {value}
            </div>
        ) : null;
    }

    renderLabel() {

        const label = this.props.label;

        return label ? (
            <label>
                {label}
            </label>
        ) : null;
    }

    renderHiddenInput() {

        const name = this.props.name;
        const date = this.state.date;

        return (
            <input
                type="hidden"
                name={name}
                value={this.stringifyValue(date)} />
        );
    }

    render() {

        return (
            <div className={cx(this.props).build()} onClick={this.onClick}>
                {this.renderLabel()}
                {this.renderResult()}
                {this.renderHiddenInput()}
            </div>
        );
    }

}

MonthPicker.displayName = 'MonthPicker';

MonthPicker.propTypes = {
    ...MonthPicker.propTypes,
    dateFormat: PropTypes.string,
    end: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ]),
    begin: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string
    ])
};

MonthPicker.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: '',
    dateFormat: 'yyyy-MM'
};
