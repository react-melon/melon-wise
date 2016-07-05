var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/Selector', [
            'exports',
            'react',
            'react-dom',
            'melon-core/classname/cxBuilder',
            './ListView'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('react-dom'), require('melon-core/classname/cxBuilder'), require('./ListView'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.reactDom, global.cxBuilder, global.ListView);
        global.Selector = mod.exports;
    }
}(this, function (exports, _react, _reactDom, _cxBuilder, _ListView) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var _ListView2 = babelHelpers.interopRequireDefault(_ListView);
    var cx = (0, _cxBuilder.create)('Selector');
    var Selector = function (_Component) {
        babelHelpers.inherits(Selector, _Component);
        function Selector(props) {
            babelHelpers.classCallCheck(this, Selector);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Selector).call(this, props));
            var ds = new _ListView2.default.DataSource({
                rowHasChanged: function rowHasChanged(r1, r2) {
                    return r1.value !== r2.value || r1.name !== r2.name;
                }
            });
            _this.dataSource = ds.cloneWithRows(_this.props.items);
            _this.renderRow = _this.renderRow.bind(_this);
            _this.state = {};
            return _this;
        }
        babelHelpers.createClass(Selector, [
            {
                key: 'componentDidMount',
                value: function componentDidMount() {
                    this.update();
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    this.update();
                }
            },
            {
                key: 'update',
                value: function update() {
                    var main = _reactDom2.default.findDOMNode(this);
                    var selectedIndex = this.props.selectedIndex;
                    if (!selectedIndex) {
                        return;
                    }
                    var selectedItem = main.childNodes[selectedIndex];
                    var itemHeight = selectedItem.getBoundingClientRect().height;
                    main.offsetParent.scrollTop = itemHeight * selectedIndex;
                }
            },
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    this.dataSource = this.dataSource.cloneWithRows(nextProps.items);
                }
            },
            {
                key: 'onItemClick',
                value: function onItemClick(value, index, e) {
                    var onChange = this.props.onChange;
                    onChange && onChange({
                        value: value,
                        index: index,
                        target: this
                    });
                }
            },
            {
                key: 'renderRow',
                value: function renderRow(item, index) {
                    var selectedIndex = this.props.selectedIndex;
                    return _react2.default.createElement('li', {
                        'data-value': item.value,
                        onClick: this.onItemClick.bind(this, item.value, index),
                        className: cx().part('item').addStates({ selected: selectedIndex === index }).build()
                    }, item.name);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    return _react2.default.createElement(_ListView2.default, {
                        component: 'ul',
                        className: cx(props).build(),
                        dataSource: this.dataSource,
                        renderRow: this.renderRow
                    });
                }
            }
        ]);
        return Selector;
    }(_react.Component);
    exports.default = Selector;
    Selector.displayName = 'Selector';
    Selector.propTypes = {
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
        selectedIndex: _react.PropTypes.number
    };
}));