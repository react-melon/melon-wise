/**
 * @file monthpicker SeparatePopup
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Popup from '../Popup';
import Tappable from '../Tappable';

import Selector from './Selector';

const cx = require('melon-classname').create('Monthpicker');
const DateTime = require('../util/date');
const domUtil = require('../util/dom');

class SeparatePopup extends React.Component {

    constructor(props) {
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onHide = this.onHide.bind(this);

        this.state = {
            date: props.date,
            mode: 'year'
        };

        this.timer = null;
    }

    componentDidUpdate() {
        domUtil.on(document.body, 'touchmove', this.onTouchMove);
    }

    componentWillUnmount() {
        let {timer} = this;
        if (timer) {
            clearTimeout(timer);
        }

        domUtil.off(document.body, 'touchmove', this.onTouchMove);
    }

    onTouchMove(e) {
        const {target} = e;
        const main = ReactDOM.findDOMNode(this);

        if (!domUtil.contains(main, target) && this.props.show) {
            e.preventDefault();
        }
    }

    onHide() {
        const {onHide} = this.props;
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

        let newDate = DateTime.cloneAsDate(date);
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
    }

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

            for (let i = 0, len = DateTime.yearDiff(end, begin); i < len; i++) {
                items.push({
                    name: endYear - i,
                    value: endYear - i
                });
            }

            index = DateTime.yearDiff(date, begin);

        }
        else {

            let beginMonth = 0;
            let len = 12;

            index = date.getMonth();

            if (DateTime.isEqualYear(date, end)) {
                len = end.getMonth() + 1;
            }
            else if (DateTime.isEqualYear(date, begin)) {
                beginMonth = begin.getMonth();
                len = len - beginMonth;

                index = index - beginMonth;
            }

            for (let i = beginMonth; i < len; i++) {
                items.push({
                    name: DateTime.datePad(i + 1),
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

}

SeparatePopup.displayName = 'SeparatePopup';

SeparatePopup.propTypes = {
    ...Popup.propTypes,
    date: PropTypes.instanceOf(Date),
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date)
};

SeparatePopup.defaultProps = {
    ...Popup.defaultProps
};

export default SeparatePopup;
