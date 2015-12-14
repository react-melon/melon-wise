define('melon/monthpicker/SeperatePopup', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'react-dom',
    '../Popup',
    '../Tappable',
    './Selector',
    '../ScrollView',
    '../util/cxBuilder',
    '../util/date'
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
    var _ScrollView = require('../ScrollView');
    var _ScrollView2 = babelHelpers.interopRequireDefault(_ScrollView);
    var cx = require('../util/cxBuilder').create('Monthpicker');
    var DateTime = require('../util/date');
    var SeperatePopup = function (_React$Component) {
        babelHelpers.inherits(SeperatePopup, _React$Component);
        function SeperatePopup(props) {
            babelHelpers.classCallCheck(this, SeperatePopup);
            _React$Component.call(this, props);
            this.onCancel = this.onCancel.bind(this);
            this.onChange = this.onChange.bind(this);
            this.state = {
                date: this.props.date,
                mode: 'year'
            };
        }
        SeperatePopup.prototype.componentDidUpdate = function componentDidUpdate() {
            this.update();
        };
        SeperatePopup.prototype.update = function update() {
            this.refs.scroll.refresh();
            var selectedIndex = this.getSelectedIndex();
            var scrollHeight = _reactDom2.default.findDOMNode(this.refs.selector).scrollHeight;
            var num = this.state.mode === 'month' ? 12 : 100;
            if (selectedIndex > 4 || selectedIndex < 96) {
                this.refs.scroll.scrollTo(0, -scrollHeight / num * (selectedIndex - 3), 0, '');
            }
        };
        SeperatePopup.prototype.onCancel = function onCancel() {
            var onHide = this.props.onHide;
            onHide && onHide();
        };
        SeperatePopup.prototype.onChange = function onChange(e) {
            var _this = this;
            var _state = this.state;
            var mode = _state.mode;
            var date = _state.date;
            date = DateTime.clone(date);
            date = date[mode === 'year' ? 'setFullYear' : 'setMonth'](e.value);
            var nextState = {
                date: new Date(date),
                mode: mode === 'month' ? 'year' : 'month'
            };
            this.setState(nextState, function () {
                if (mode === 'month') {
                    var _props = _this.props;
                    var onHide = _props.onHide;
                    var onChange = _props.onChange;
                    onHide && onHide();
                    onChange && onChange({
                        value: new Date(date),
                        target: _this
                    });
                }
            });
        };
        SeperatePopup.prototype.getSelectedIndex = function getSelectedIndex() {
            var _state2 = this.state;
            var mode = _state2.mode;
            var date = _state2.date;
            return mode === 'month' ? date.getMonth() : 100 - new Date().getFullYear() + date.getFullYear();
        };
        SeperatePopup.prototype.render = function render() {
            var show = this.props.show;
            var mode = this.state.mode;
            var items = [];
            var index = this.getSelectedIndex();
            if (mode === 'year') {
                var currentYear = new Date().getFullYear();
                for (var i = 100; i >= 0; i--) {
                    items.push({
                        name: currentYear - i,
                        value: currentYear - i
                    });
                }
            } else {
                for (var i = 1; i < 13; i++) {
                    items.push({
                        name: DateTime.datePad(i),
                        value: i - 1
                    });
                }
            }
            return _react2.default.createElement(_Popup2.default, {
                show: show,
                transitionTimeout: 300,
                transitionType: 'translate',
                direction: 'bottom'
            }, _react2.default.createElement('div', null, _react2.default.createElement(_ScrollView2.default, {
                ref: 'scroll',
                className: cx().part('panel').build()
            }, _react2.default.createElement(_Selector2.default, {
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
    SeperatePopup.propTypes = {
        show: _react.PropTypes.bool,
        date: _react.PropTypes.instanceOf(Date),
        onHide: _react.PropTypes.func
    };
    exports.default = SeperatePopup;
    module.exports = exports.default;
});