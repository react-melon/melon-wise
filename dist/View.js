(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.babelHelpers);
        global.View = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    /**
     * @file melon-wise/View
     * @author cxtom<2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('View');

    var View = function (_Component) {
        babelHelpers.inherits(View, _Component);

        function View(props) {
            babelHelpers.classCallCheck(this, View);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onTouchStart = _this.onTouchStart.bind(_this);
            _this.onTouchMove = _this.onTouchMove.bind(_this);
            return _this;
        }

        View.prototype.onTouchStart = function onTouchStart(e) {
            this.startY = e.touches[0].clientY;
        };

        View.prototype.onTouchMove = function onTouchMove(e) {

            var main = this.refs.main;
            // 高位表示向上滚动
            // 底位表示向下滚动
            // 1容许 0禁止
            var status = '11';

            var currentY = e.touches[0].clientY;

            if (main.scrollTop === 0) {
                // 如果内容小于容器则同时禁止上下滚动
                status = main.offsetHeight >= main.scrollHeight ? '00' : '01';
            } else if (main.scrollTop + main.offsetHeight >= main.scrollHeight) {
                // 已经滚到底部了只能向上滚动
                status = '10';
            }

            if (status !== '11') {
                // 判断当前的滚动方向
                var direction = currentY - this.startY > 0 ? '10' : '01';
                // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
                if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                    e.preventDefault();
                }
            }
        };

        View.prototype.render = function render() {

            var props = this.props;

            var renderHeader = props.renderHeader;
            var renderFooter = props.renderFooter;
            var children = props.children;
            var component = props.component;
            var others = babelHelpers.objectWithoutProperties(props, ['renderHeader', 'renderFooter', 'children', 'component']);


            var generator = {
                footer: renderFooter,
                header: renderHeader
            };

            var parts = Object.keys(generator).reduce(function (result, name) {
                var _babelHelpers$extends;

                var part = generator[name] && generator[name]();

                if (!part) {
                    return result;
                }

                return babelHelpers['extends']({}, result, (_babelHelpers$extends = {}, _babelHelpers$extends[name] = _react2['default'].cloneElement(part, {
                    className: cx(part.props).part(name).build(),
                    key: name
                }), _babelHelpers$extends));
            }, {});

            children = [parts.header, _react2['default'].createElement(
                'div',
                { ref: 'main', key: 'main', className: cx().part('main').build() },
                children
            ), parts.footer];

            return _react2['default'].createElement(component, babelHelpers['extends']({}, others, {
                className: cx(props).build(),
                onTouchStart: this.onTouchStart,
                onTouchMove: this.onTouchMove
            }), children);
        };

        return View;
    }(_react.Component);

    exports['default'] = View;


    View.displayName = 'View';

    View.propTypes = {
        renderHeader: _react.PropTypes.func,
        renderFooter: _react.PropTypes.func,
        component: _react.PropTypes.string
    };

    View.defaultProps = {
        component: 'div'
    };
});