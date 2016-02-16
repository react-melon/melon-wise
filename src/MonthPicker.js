/**
 * @file esui-react/MonthPicker
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const ReactDOM = require('react-dom');

const cx = require('melon-classname').create('Monthpicker');

const DateTime = require('./util/date');
const SeparatePopup = require('./monthpicker/SeparatePopup');
const popupHelper = require('./util/separatePopupHelper');

const {PropTypes} = React;

const MonthPicker = React.createClass({

    displayName: 'MonthPicker',

    getInitialState() {

        return {
            date: this.parseDate(this.props.value)
        };
    },

    componentDidMount() {
        this.container = popupHelper.createPopup({
            className: cx().part('popup').build()
        });
        this.renderPopup(false);
    },

    componentWillReceiveProps(nextProps) {

        const {value} = nextProps;

        if (value !== this.props.value) {
            this.setState({
                date: this.parseDate(value)
            });
        }
    },

    componentWillUnmount() {
        popupHelper.destoryPopup(this.container);
        this.container = null;
    },


    /**
     * 日期字符串转为Date对象
     *
     * @param  {Date|string} date 源日期对象
     * @return {Date} 格式化后的日期对象
     * @private
     */
    parseDate(date) {

        if (!date) {
            return new Date();
        }

        if (DateTime.isDateObject(date)) {
            return date;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(date, format);
    },

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
    },

    onClick(e) {
        this.renderPopup(true);
    },

    onDateChange({value}) {

        this.setState({date: value});

        const {onChange} = this.props;

        onChange({
            type: 'change',
            target: this,
            value: this.stringifyValue(value)
        });
    },

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
                date={this.state.date}
                onHide={() => {
                    this.renderPopup(false);
                }}
                onChange={this.onDateChange} />,
            this.container
        );
    },

    renderResult() {

        const {value} = this.props;

        return value ? (
            <div className={cx().part('result').build()}>
                {value}
            </div>
        ) : null;
    },

    renderLabel() {

        const {label} = this.props;

        return label ? (
            <label>
                {label}
            </label>
        ) : null;
    },

    renderHiddenInput() {

        const {name} = this.props;
        const {date} = this.state;

        return (
            <input
                type="hidden"
                name={name}
                value={this.stringifyValue(date)} />
        );
    },

    render() {

        return (
            <div className={cx(this.props).build()} onClick={this.onClick}>
                {this.renderLabel()}
                {this.renderResult()}
                {this.renderHiddenInput()}
            </div>
        );

    }

});

MonthPicker.LANG = {
    week: '周',
    days: '日,一,二,三,四,五,六'
};

MonthPicker.propTypes = {
    value: PropTypes.string,
    dateFormat: PropTypes.string,
    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string
    }),
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
    defaultValue: DateTime.format(new Date(), 'yyyy-mm', MonthPicker.LANG),
    dateFormat: 'yyyy-MM',
    lang: MonthPicker.LANG
};

module.exports = require('./createInputComponent').create(MonthPicker);
