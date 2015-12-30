/**
 * @file esui-react/MonthPicker
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');
const ReactDOM = require('react-dom');
const cx = require('./util/cxBuilder').create('Monthpicker');
const DateTime = require('./util/date');
const SeperatePopup = require('./monthpicker/SeperatePopup');

const MonthPicker = React.createClass({

    displayName: 'MonthPicker',

    getInitialState() {

        const {value} = this.props;

        return {
            date: this.parseDate(value)
        };
    },

    componentDidMount() {
        let container = this.container = document.createElement('div');
        container.className = cx().part('popup').build();
        document.body.appendChild(container);
        this.renderPopup(false);
    },

    componentWillUnmount() {

        let {container} = this;
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            this.popup = this.container = container = null;
        }
    },

    parseDate(date) {

        if (!date) {
            return null;
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.parse(date, format);
    },

    /**
     * 格式化日期
     *
     * @param {Date} rawValue 源日期对象
     * @param {string=} format 日期格式，默认为当前实例的dateFormat
     * @return {string} 格式化后的日期字符串
     * @private
     */
    stringifyValue(rawValue) {

        if (rawValue == null) {
            return '';
        }

        let format = this.props.dateFormat.toLowerCase();

        return DateTime.format(rawValue, format, this.props.lang);
    },

    onClick(e) {
        this.renderPopup(true);
    },

    onDateChange({value}) {

        this.setState({
            date: value
        }, () => {

            const {onChange} = this.props;

            onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(value)
            });
        });
    },

    renderPopup(isOpen) {

        const popup = (
            <SeperatePopup
                show={isOpen}
                transitionTimeout={300}
                transitionType="translate"
                direction="bottom"
                date={this.props.value ? this.state.date : new Date()}
                onHide={() => {
                    this.renderPopup(false);
                }}
                onChange={this.onDateChange} />
        );

        ReactDOM.render(popup, this.container);
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
                style={{display: 'none'}}
                onChange={this.onChange}
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

MonthPicker.defaultProps = {
    defaultValue: DateTime.format(new Date(), 'yyyy-mm', MonthPicker.LANG),
    dateFormat: 'yyyy-MM',
    lang: MonthPicker.LANG
};

module.exports = require('./createInputComponent').create(MonthPicker);
