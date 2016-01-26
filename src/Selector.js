/**
 * @file monthpicker selector
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import cxBuilder from 'melon-classname';

const cx = cxBuilder.create('Selector');
const ListView = require('./ListView');

const Selector = React.createClass({

    displayName: 'Selector',

    propTypes: {
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
        itemBorder: PropTypes.bool
    },

    getInitialState() {

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1.value !== r2.value
                    || r1.name !== r2.name;
            }
        });

        this.dataSource = ds.cloneWithRows(this.props.items);

        return {};
    },

    componentDidMount() {
        this.update();
    },

    componentDidUpdate() {
        this.update();
    },

    update() {
        const main = ReactDOM.findDOMNode(this);
        const {selectedIndex} = this.props;

        const selectedItem = main.childNodes[selectedIndex];
        const itemHeight = selectedItem.getBoundingClientRect().height;

        main.offsetParent.scrollTop = itemHeight * selectedIndex;
    },

    componentWillReceiveProps(nextProps) {
        this.dataSource = this.dataSource.cloneWithRows(nextProps.items);
    },

    onItemClick(value, index, e) {
        const {onChange} = this.props;

        onChange && onChange({
            value,
            index,
            target: this
        });
    },

    renderRow(item, index) {

        const {selectedIndex, itemBorder} = this.props;

        return (
            <li
                data-value={item.value}
                onClick={this.onItemClick.bind(this, item.value, index)}
                className={cx()
                    .part('item')
                    .addVariants(
                        itemBorder ? ['bottom-1px-border'] : undefined
                    )
                    .addStates({
                        selected: selectedIndex === index
                    })
                    .build()}>
                {item.name}
            </li>
        );
    },

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

});

module.exports = Selector;
