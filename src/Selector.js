/**
 * @file Selector
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {create} from 'melon-core/classname/cxBuilder';

import ListView from './ListView';

const cx = create('Selector');

export default class Selector extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged(r1, r2) {
                return r1.value !== r2.value
                    || r1.name !== r2.name;
            }
        });

        this.dataSource = ds.cloneWithRows(this.props.items);
        this.renderRow = this.renderRow.bind(this);
        this.state = {};
    }

    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        const main = ReactDOM.findDOMNode(this);
        const selectedIndex = this.props.selectedIndex;

        if (!selectedIndex) {
            return;
        }

        const selectedItem = main.childNodes[selectedIndex];
        const itemHeight = selectedItem.getBoundingClientRect().height;

        main.offsetParent.scrollTop = itemHeight * selectedIndex;
    }

    componentWillReceiveProps(nextProps) {
        this.dataSource = this.dataSource.cloneWithRows(nextProps.items);
    }

    onItemClick(value, index, e) {
        const onChange = this.props.onChange;

        onChange && onChange({
            value,
            index,
            target: this
        });
    }

    renderRow(item, index) {

        const selectedIndex = this.props.selectedIndex;

        return (
            <li
                data-value={item.value}
                onClick={this.onItemClick.bind(this, item.value, index)}
                className={cx()
                    .part('item')
                    .addStates({
                        selected: selectedIndex === index
                    })
                    .build()}>
                {item.name}
            </li>
        );
    }

    render() {

        const props = this.props;

        return (
            <ListView
                component="ul"
                className={cx(props).build()}
                dataSource={this.dataSource}
                renderRow={this.renderRow}/>
        );
    }

}

Selector.displayName = 'Selector';

Selector.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ])
    })),
    onChange: PropTypes.func,
    selectedIndex: PropTypes.number
};


