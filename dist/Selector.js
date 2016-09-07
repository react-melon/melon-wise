(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'melon-core/classname/cxBuilder', './ListView', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('melon-core/classname/cxBuilder'), require('./ListView'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.cxBuilder, global.ListView, global.babelHelpers);
        global.Selector = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _cxBuilder, _ListView, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _ListView2 = babelHelpers.interopRequireDefault(_ListView);

    /**
     * @file Selector
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('Selector');

    var Selector = function (_Component) {
        babelHelpers.inherits(Selector, _Component);

        function Selector(props) {
            babelHelpers.classCallCheck(this, Selector);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            var ds = new _ListView2['default'].DataSource({
                rowHasChanged: function rowHasChanged(r1, r2) {
                    return r1.value !== r2.value || r1.name !== r2.name;
                }
            });

            _this.dataSource = ds.cloneWithRows(_this.props.items);
            _this.renderRow = _this.renderRow.bind(_this);
            _this.state = {};
            return _this;
        }

        Selector.prototype.componentDidMount = function componentDidMount() {
            this.update();
        };

        Selector.prototype.componentDidUpdate = function componentDidUpdate() {
            this.update();
        };

        Selector.prototype.update = function update() {
            var main = _reactDom2['default'].findDOMNode(this);
            var selectedIndex = this.props.selectedIndex;

            if (!selectedIndex) {
                return;
            }

            var selectedItem = main.childNodes[selectedIndex];
            var itemHeight = selectedItem.getBoundingClientRect().height;

            main.offsetParent.scrollTop = itemHeight * selectedIndex;
        };

        Selector.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
            this.dataSource = this.dataSource.cloneWithRows(nextProps.items);
        };

        Selector.prototype.onItemClick = function onItemClick(value, index, e) {
            var onChange = this.props.onChange;

            onChange && onChange({
                value: value,
                index: index,
                target: this
            });
        };

        Selector.prototype.renderRow = function renderRow(item, index) {

            var selectedIndex = this.props.selectedIndex;

            return _react2['default'].createElement(
                'li',
                {
                    'data-value': item.value,
                    onClick: this.onItemClick.bind(this, item.value, index),
                    className: cx().part('item').addStates({
                        selected: selectedIndex === index
                    }).build() },
                item.name
            );
        };

        Selector.prototype.render = function render() {

            var props = this.props;

            return _react2['default'].createElement(_ListView2['default'], {
                component: 'ul',
                className: cx(props).build(),
                dataSource: this.dataSource,
                renderRow: this.renderRow });
        };

        return Selector;
    }(_react.Component);

    exports['default'] = Selector;


    Selector.displayName = 'Selector';

    Selector.propTypes = {
        items: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
            value: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number])
        })),
        onChange: _react.PropTypes.func,
        selectedIndex: _react.PropTypes.number
    };
});