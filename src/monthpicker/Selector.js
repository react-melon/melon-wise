/**
 * @file monthpicker selector
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import cxBuilder from '../util/cxBuilder';

const cx = cxBuilder.create('MonthpickerSelector');

class MonthPickerSelector extends React.Component {

    onItemClick(value, index, e) {
        const {onChange} = this.props;

        onChange && onChange({
            value,
            target: this
        });
    }

    renderItems() {

        const {items, selectedIndex} = this.props;

        return items.map((item, index) => (
            <li
                data-value={item.value}
                key={index}
                onClick={this.onItemClick.bind(this, item.value, index)}
                className={cx()
                    .part('item')
                    .addStates({
                        selected: selectedIndex === index
                    })
                    .build()}>
                {item.name}
            </li>
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
