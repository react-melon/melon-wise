define('melon-wise/lib/Selector', [
    'require',
    'exports',
    'module',
    'react',
    'react-dom',
    'melon-classname',
    './ListView'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var ReactDOM = require('react-dom');
    var cxBuilder = require('melon-classname');
    var cx = cxBuilder.create('Selector');
    var ListView = require('./ListView');
    var PropTypes = React.PropTypes;
    var Selector = React.createClass({
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
        getInitialState: function getInitialState() {
            var ds = new ListView.DataSource({
                rowHasChanged: function rowHasChanged(r1, r2) {
                    return r1.value !== r2.value || r1.name !== r2.name;
                }
            });
            this.dataSource = ds.cloneWithRows(this.props.items);
            return {};
        },
        componentDidMount: function componentDidMount() {
            this.update();
        },
        componentDidUpdate: function componentDidUpdate() {
            this.update();
        },
        update: function update() {
            var main = ReactDOM.findDOMNode(this);
            var _props$selectedIndex = this.props.selectedIndex;
            var selectedIndex = _props$selectedIndex === undefined ? 0 : _props$selectedIndex;
            var selectedItem = main.childNodes[selectedIndex];
            var itemHeight = selectedItem.getBoundingClientRect().height;
            main.offsetParent.scrollTop = itemHeight * selectedIndex;
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            this.dataSource = this.dataSource.cloneWithRows(nextProps.items);
        },
        onItemClick: function onItemClick(value, index, e) {
            var onChange = this.props.onChange;
            onChange && onChange({
                value: value,
                index: index,
                target: this
            });
        },
        renderRow: function renderRow(item, index) {
            var _props = this.props;
            var selectedIndex = _props.selectedIndex;
            var itemBorder = _props.itemBorder;
            return React.createElement('li', {
                'data-value': item.value,
                onClick: this.onItemClick.bind(this, item.value, index),
                className: cx().part('item').addVariants(itemBorder ? ['bottom-1px-border'] : undefined).addStates({ selected: selectedIndex === index }).build()
            }, item.name);
        },
        render: function render() {
            var props = this.props;
            return React.createElement(ListView, {
                component: 'ul',
                className: cx(props).build(),
                dataSource: this.dataSource,
                renderRow: this.renderRow
            });
        }
    });
    module.exports = Selector;
});