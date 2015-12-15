/**
 * @file monthpicker SeperatePopup
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import Popup from '../Popup';
import Tappable from '../Tappable';

import Selector from './Selector';
import ScrollView from '../ScrollView';

const cx = require('../util/cxBuilder').create('Monthpicker');
const DateTime = require('../util/date');

class SeperatePopup extends React.Component {

    constructor(props) {
        super(props);

        this.onCancel = this.onCancel.bind(this);
        this.onChange = this.onChange.bind(this);

        this.state = {
            date: this.props.date,
            mode: 'year'
        };

        this.timer = null;
    }

    componentDidUpdate() {
        this.update();
    }

    componentWillUnmount() {
        let {timer} = this;
        if (timer) {
            clearTimeout(timer);
        }
    }

    update() {
        this.refs.scroll.refresh();

        let selectedIndex = this.getSelectedIndex();

        const scrollHeight = ReactDOM.findDOMNode(this.refs.selector).scrollHeight;
        const num = this.state.mode === 'month' ? 12 : 100;

        if (selectedIndex > 3) {
            selectedIndex = Math.min(selectedIndex, num - 3);
            this.refs.scroll.scrollTo(0, -scrollHeight / num * (selectedIndex - 3), 0, '');
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

        let {mode, date} = this.state;

        date = DateTime.clone(date);
        date = date[mode === 'year' ? 'setFullYear' : 'setMonth'](e.value);

        let nextState = {
            date: new Date(date)
        };

        if (mode === 'year') {
            nextState.mode = 'month';
        }

        this.setState(nextState, () => {
            if (mode === 'month') {
                const {onChange} = this.props;
                this.onHide();

                onChange && onChange({
                    value: new Date(date),
                    target: this
                });
            }
        });
    }

    getSelectedIndex() {
        const {mode, date} = this.state;

        return mode === 'month' ? date.getMonth()
            : (100 - (new Date()).getFullYear() + date.getFullYear());
    }

    render() {

        const {show} = this.props;
        const {mode} = this.state;

        let items = [];
        let index = this.getSelectedIndex();

        if (mode === 'year') {
            const currentYear = (new Date()).getFullYear();

            for (let i = 100; i >= 0; i--) {
                items.push({
                    name: currentYear - i,
                    value: currentYear - i
                });
            }
        }
        else {
            for (let i = 1; i < 13; i++) {
                items.push({
                    name: DateTime.datePad(i),
                    value: i - 1
                });
            }
        }

        return (
            <Popup
                show={show}
                transitionTimeout={300}
                transitionType="translate"
                direction="bottom">
                <div>
                    <ScrollView
                        ref="scroll"
                        className={cx().part('panel').build()}>
                        <Selector
                            ref="selector"
                            items={items}
                            selectedIndex={index}
                            variants={[mode]}
                            onChange={this.onChange} />
                    </ScrollView>
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

SeperatePopup.displayName = 'SeperatePopup';

SeperatePopup.propTypes = {
    show: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    onHide: PropTypes.func
};

export default SeperatePopup;
