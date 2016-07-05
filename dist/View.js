var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/View', [
            'exports',
            'react',
            'melon-core/classname/cxBuilder'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.cxBuilder);
        global.View = mod.exports;
    }
}(this, function (exports, _react, _cxBuilder) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var cx = (0, _cxBuilder.create)('View');
    var View = function (_Component) {
        babelHelpers.inherits(View, _Component);
        function View(props) {
            babelHelpers.classCallCheck(this, View);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(View).call(this, props));
            _this.onTouchStart = _this.onTouchStart.bind(_this);
            _this.onTouchMove = _this.onTouchMove.bind(_this);
            return _this;
        }
        babelHelpers.createClass(View, [
            {
                key: 'onTouchStart',
                value: function onTouchStart(e) {
                    this.startY = e.touches[0].clientY;
                }
            },
            {
                key: 'onTouchMove',
                value: function onTouchMove(e) {
                    var main = this.refs.main;
                    var status = '11';
                    var currentY = e.touches[0].clientY;
                    if (main.scrollTop === 0) {
                        status = main.offsetHeight >= main.scrollHeight ? '00' : '01';
                    } else if (main.scrollTop + main.offsetHeight >= main.scrollHeight) {
                        status = '10';
                    }
                    if (status !== '11') {
                        var direction = currentY - this.startY > 0 ? '10' : '01';
                        if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                            e.preventDefault();
                        }
                    }
                }
            },
            {
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var renderHeader = props.renderHeader;
                    var renderFooter = props.renderFooter;
                    var children = props.children;
                    var component = props.component;
                    var others = babelHelpers.objectWithoutProperties(props, [
                        'renderHeader',
                        'renderFooter',
                        'children',
                        'component'
                    ]);
                    var generator = {
                        footer: renderFooter,
                        header: renderHeader
                    };
                    var parts = Object.keys(generator).reduce(function (result, name) {
                        var part = generator[name] && generator[name]();
                        if (!part) {
                            return result;
                        }
                        return babelHelpers.extends({}, result, babelHelpers.defineProperty({}, name, _react2.default.cloneElement(part, {
                            className: cx(part.props).part(name).build(),
                            key: name
                        })));
                    }, {});
                    children = [
                        parts.header,
                        _react2.default.createElement('div', {
                            ref: 'main',
                            key: 'main',
                            className: cx().part('main').build()
                        }, children),
                        parts.footer
                    ];
                    return _react2.default.createElement(component, babelHelpers.extends({}, others, {
                        className: cx(props).build(),
                        onTouchStart: this.onTouchStart,
                        onTouchMove: this.onTouchMove
                    }), children);
                }
            }
        ]);
        return View;
    }(_react.Component);
    exports.default = View;
    View.displayName = 'View';
    View.propTypes = {
        renderHeader: _react.PropTypes.func,
        renderFooter: _react.PropTypes.func,
        component: _react.PropTypes.string
    };
    View.defaultProps = { component: 'div' };
}));