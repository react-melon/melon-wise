define('melon-wise/monthpicker/SeperatePopup', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'react-dom',
    '../Popup',
    '../Tappable',
    './Selector',
    '../util/cxBuilder',
    '../util/date',
    '../util/dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    exports.__esModule = true;
    var _react = require('react');
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactDom = require('react-dom');
    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);
    var _Popup = require('../Popup');
    var _Popup2 = babelHelpers.interopRequireDefault(_Popup);
    var _Tappable = require('../Tappable');
    var _Tappable2 = babelHelpers.interopRequireDefault(_Tappable);
    var _Selector = require('./Selector');
    var _Selector2 = babelHelpers.interopRequireDefault(_Selector);
    var cx = require('../util/cxBuilder').create('Monthpicker');
    var DateTime = require('../util/date');
    var domUtil = require('../util/dom');
    var SeperatePopup = function (_React$Component) {
        babelHelpers.inherits(SeperatePopup, _React$Component);
        function SeperatePopup(props) {
            babelHelpers.classCallCheck(this, SeperatePopup);
            _React$Component.call(this, props);
            this.onCancel = this.onCancel.bind(this);
            this.onChange = this.onChange.bind(this);
            this.onTouchMove = this.onTouchMove.bind(this);
            this.onHide = this.onHide.bind(this);
            this.state = {
                date: props.date,
                mode: 'year'
            };
            this.timer = null;
        }
        SeperatePopup.prototype.componentDidUpdate = function componentDidUpdate() {
            domUtil.on(document.body, 'touchmove', this.onTouchMove);
        };
        SeperatePopup.prototype.componentWillUnmount = function componentWillUnmount() {
            var timer = this.timer;
            if (timer) {
                clearTimeout(timer);
            }
            domUtil.off(document.body, 'touchmove', this.onTouchMove);
        };
        SeperatePopup.prototype.onTouchMove = function onTouchMove(e) {
            var target = e.target;
            var main = _reactDom2.default.findDOMNode(this);
            if (!domUtil.contains(main, target) && this.props.show) {
                e.preventDefault();
            }
        };
        SeperatePopup.prototype.onHide = function onHide() {
            var _this = this;
            var onHide = this.props.onHide;
            onHide && onHide();
            this.timer = setTimeout(function () {
                _this.setState({ mode: 'year' });
            }, 300);
        };
        SeperatePopup.prototype.onCancel = function onCancel() {
            this.onHide();
        };
        SeperatePopup.prototype.onChange = function onChange(e) {
            var _this2 = this;
            var _state = this.state;
            var mode = _state.mode;
            var date = _state.date;
            var newDate = DateTime.cloneAsDate(date);
            newDate[mode === 'year' ? 'setFullYear' : 'setMonth'](e.value);
            var nextState = { date: newDate };
            if (mode === 'year') {
                nextState.mode = 'month';
            }
            this.setState(nextState, function () {
                if (mode === 'month') {
                    var onChange = _this2.props.onChange;
                    _this2.onHide();
                    onChange && onChange({
                        value: _this2.state.date,
                        target: _this2
                    });
                }
            });
        };
        SeperatePopup.prototype.render = function render() {
            var _props = this.props;
            var show = _props.show;
            var begin = _props.begin;
            var end = _props.end;
            var _state2 = this.state;
            var mode = _state2.mode;
            var date = _state2.date;
            var items = [];
            var index = undefined;
            if (mode === 'year') {
                var endYear = end.getFullYear();
                for (var i = 0, len = DateTime.yearDiff(end, begin); i < len; i++) {
                    items.push({
                        name: endYear - i,
                        value: endYear - i
                    });
                }
                index = DateTime.yearDiff(date, begin);
            } else {
                var beginMonth = 0;
                var len = 12;
                index = date.getMonth();
                if (DateTime.isEqualYear(date, end)) {
                    len = end.getMonth() + 1;
                } else if (DateTime.isEqualYear(date, begin)) {
                    beginMonth = begin.getMonth();
                    len = len - beginMonth;
                    index = index - beginMonth;
                }
                for (var i = beginMonth; i < len; i++) {
                    items.push({
                        name: DateTime.datePad(i + 1),
                        value: i
                    });
                }
            }
            return _react2.default.createElement(_Popup2.default, {
                show: show,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom',
                onHide: this.onHide
            }, _react2.default.createElement('div', null, _react2.default.createElement('div', { className: cx().part('panel').build() }, _react2.default.createElement(_Selector2.default, {
                ref: 'selector',
                items: items,
                selectedIndex: index,
                variants: [mode],
                onChange: this.onChange
            })), _react2.default.createElement(_Tappable2.default, {
                component: 'div',
                onTap: this.onCancel,
                className: cx().part('cancel').build()
            }, '\u53D6\u6D88')));
        };
        return SeperatePopup;
    }(_react2.default.Component);
    SeperatePopup.displayName = 'SeperatePopup';
    SeperatePopup.propTypes = babelHelpers._extends({}, _Popup2.default.propTypes, {
        date: _react.PropTypes.instanceOf(Date),
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date)
    });
    SeperatePopup.defaultProps = babelHelpers._extends({}, _Popup2.default.defaultProps);
    exports.default = SeperatePopup;
    module.exports = exports.default;
});