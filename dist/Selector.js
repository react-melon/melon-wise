define('melon-wise/lib/Selector', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'react-dom',
    'melon-classname',
    './ListView'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom = require('react-dom');
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var _melonClassname = require('melon-classname');
    var _melonClassname2 = babelHelpers.interopRequireDefault(_melonClassname);
    var cx = _melonClassname2.default.create('Selector');
    var ListView = require('./ListView');
    var Selector = _react2.default.createClass({
        displayName: 'Selector',
        propTypes: {
            items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
                name: _react.PropTypes.oneOfType([
                    _react.PropTypes.string,
                    _react.PropTypes.number
                ]),
                value: _react.PropTypes.oneOfType([
                    _react.PropTypes.string,
                    _react.PropTypes.number
                ])
            })),
            onChange: _react.PropTypes.func,
            itemBorder: _react.PropTypes.bool
        },
        getInitialState: function () {
            var ds = new ListView.DataSource({
                rowHasChanged: function (r1, r2) {
                    return r1.value !== r2.value || r1.name !== r2.name;
                }
            });
            this.dataSource = ds.cloneWithRows(this.props.items);
            return {};
        },
        componentDidMount: function () {
            this.update();
        },
        componentDidUpdate: function () {
            this.update();
        },
        update: function () {
            var main = _reactDom2.default.findDOMNode(this);
            var selectedIndex = this.props.selectedIndex;
            var selectedItem = main.childNodes[selectedIndex];
            var itemHeight = selectedItem.getBoundingClientRect().height;
            main.offsetParent.scrollTop = itemHeight * selectedIndex;
        },
        componentWillReceiveProps: function (nextProps) {
            this.dataSource = this.dataSource.cloneWithRows(nextProps.items);
        },
        onItemClick: function (value, index, e) {
            var onChange = this.props.onChange;
            onChange && onChange({
                value: value,
                target: this
            });
        },
        renderRow: function (item, index) {
            var _props = this.props;
            var selectedIndex = _props.selectedIndex;
            var itemBorder = _props.itemBorder;
            return _react2.default.createElement('li', {
                'data-value': item.value,
                onClick: this.onItemClick.bind(this, item.value, index),
                className: cx().part('item').addVariants(itemBorder ? ['bottom-1px-border'] : undefined).addStates({ selected: selectedIndex === index }).build()
            }, item.name);
        },
        render: function () {
            var props = this.props;
            return _react2.default.createElement(ListView, {
                component: 'ul',
                className: cx(props).build(),
                dataSource: this.dataSource,
                renderRow: this.renderRow
            });
        }
    });
    module.exports = Selector;
});