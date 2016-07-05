var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/Tab', [
            'exports',
            'react',
            'melon-core/classname/cxBuilder',
            './tab/Item',
            './tab/Panel'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./tab/Item'), require('./tab/Panel'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.cxBuilder, global.Item, global.Panel);
        global.Tab = mod.exports;
    }
}(this, function (exports, _react, _cxBuilder, _Item, _Panel) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _Item2 = babelHelpers.interopRequireDefault(_Item);
    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);
    var cx = (0, _cxBuilder.create)('Tab');
    var Tab = function (_Component) {
        babelHelpers.inherits(Tab, _Component);
        function Tab(props) {
            babelHelpers.classCallCheck(this, Tab);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(Tab).call(this, props));
            var selectedIndex = _this.props.selectedIndex;
            _this.state = { selectedIndex: selectedIndex };
            return _this;
        }
        babelHelpers.createClass(Tab, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    if (nextProps.selectedIndex !== this.state.selectedIndex) {
                        this.setState({ selectedIndex: nextProps.selectedIndex });
                    }
                }
            },
            {
                key: 'getTabCount',
                value: function getTabCount() {
                    return _react2.default.Children.count(this.props.children);
                }
            },
            {
                key: 'getSelected',
                value: function getSelected(tab, index) {
                    return this.state.selectedIndex === index;
                }
            },
            {
                key: 'handleTabClick',
                value: function handleTabClick(index, e) {
                    if (index === this.state.selectedIndex) {
                        return;
                    }
                    var onChange = this.props.onChange;
                    e.index = index;
                    if (onChange) {
                        onChange(e);
                        return;
                    }
                    this.setState({ selectedIndex: index });
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var percent = 1 / this.getTabCount() * 100 + '%';
                    var tabIndex = 0;
                    var tabContent = [];
                    var tabs = _react2.default.Children.map(props.children, function (tab, index) {
                        var selected = this.getSelected(tab, index);
                        var _tab$props = tab.props;
                        var disabled = _tab$props.disabled;
                        var children = _tab$props.children;
                        if (selected) {
                            tabIndex = index;
                            tabContent = _react2.default.createElement(_Panel2.default, {
                                key: index,
                                active: selected
                            }, children);
                        }
                        return _react2.default.cloneElement(tab, {
                            key: index,
                            selected: selected,
                            tabIndex: index,
                            style: { width: percent },
                            onTap: disabled ? null : this.handleTabClick.bind(this, index)
                        });
                    }, this);
                    var transform = 'translate3d(' + 100 * tabIndex + '%, 0, 0)';
                    var InkBarStyles = {
                        width: percent,
                        WebkitTransform: transform,
                        transform: transform
                    };
                    return _react2.default.createElement('section', babelHelpers.extends({}, props, { className: cx(props).build() }), _react2.default.createElement('div', { className: cx().part('bar').build() }, tabs, _react2.default.createElement('i', {
                        className: cx().part('inkbar').build(),
                        style: InkBarStyles
                    })), tabContent);
                }
            }
        ]);
        return Tab;
    }(_react.Component);
    exports.default = Tab;
    Tab.displayName = 'Tab';
    Tab.propTypes = {
        selectedIndex: _react.PropTypes.number,
        onChange: _react.PropTypes.func,
        onBeforeChange: _react.PropTypes.func
    };
    Tab.defaultProps = { selectedIndex: 0 };
    Tab.Item = _Item2.default;
}));