/**
 * @file monthpicker selector
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
// import ReactDOM from 'react-dom';

import Tappable from '../Tappable';

import cxBuilder from '../util/cxBuilder';
// import dom from '../util/dom';

const cx = cxBuilder.create('MonthpickerSelector');

class MonthPickerSelector extends React.Component {

    onItemClick(value, index, e) {
        const {onChange} = this.props;

        onChange && onChange({
            value,
            target: this
        });
    }

    getTouch(e) {
        return e.touches[0];
    }

    renderItems() {

        const {items, selectedIndex} = this.props;

        return items.map((item, index) => (
            <Tappable
                component="li"
                data-value={item.value}
                key={index}
                onTap={this.onItemClick.bind(this, item.value, index)}
                className={cx()
                    .part('item')
                    .addStates({
                        selected: selectedIndex === index
                    })
                    .build()}>
                {item.name}
            </Tappable>
        ));
    }

    render() {

        const props = this.props;

        return (
            <ul className={cx(props).build()}>
                {this.renderItems()}
            </ul>
        );
    }

}

MonthPickerSelector.displayName = 'MonthPickerSelector';

MonthPickerSelector.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.any,
        value: PropTypes.any
    })),
    onChange: PropTypes.func
};

export default MonthPickerSelector;
