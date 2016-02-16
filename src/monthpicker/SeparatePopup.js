/**
 * @file monthpicker SeparatePopup
 * @author cxtom(cxtom2010@gmail.com)
 */

const React = require('react');
const Popup = require('../Popup');
const Tappable = require('../Tappable');

const Selector = require('../Selector');

const cx = require('melon-classname').create('Monthpicker');
const dateUtil = require('../util/date');

const PropTypes = React.PropTypes;

let SeparatePopup = React.createClass({

    mixins: [require('../mixins/SeparateMixin')],

    getInitialState() {

        this.timer = null;

        return {
            date: this.props.date,
            mode: 'year'
        };
    },

    componentWillUnmount() {
        let {timer} = this;
        if (timer) {
            clearTimeout(timer);
        }
    },

    onHide() {
        const {onHide} = this.props;
        onHide && onHide();

        this.timer = setTimeout(() => {
            this.setState({mode: 'year'});
        }, 300);
    },

    onCancel() {
        this.onHide();
    },

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

                const {onChange} = this.props;
                this.onHide();

                onChange && onChange({
                    value: this.state.date,
                    target: this
                });
            }
        });
    },

    render() {

        const {
            show,
            begin,
            end
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
                show={show}
                transitionTimeout={300}
                transitionType="translate"
                direction="bottom"
                onHide={this.onHide}>
                <div>
                    <div className={cx().part('panel').build()}>
                        <Selector
                            ref="selector"
                            items={items}
                            className={cx().part('selector').build()}
                            selectedIndex={index}
                            variants={[mode]}
                            onChange={this.onChange} />
                    </div>
                    <Tappable
                        component="div"
                        onTap={this.onCancel}
                        className={cx().part('cancel').build()}>
                        取消
                    </Tappable>
                </div>
            </Popup>
        );
    }

});

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

module.exports = SeparatePopup;
