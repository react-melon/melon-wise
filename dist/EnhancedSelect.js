define('melon-wise/lib/EnhancedSelect', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    './util/separatePopupHelper',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    var React = require('react');
    var popupHelper = require('./util/separatePopupHelper');
    var cx = require('melon-classname').create('EnhancedSelect');
    var EnhancedSelect = function (_React$Component) {
        babelHelpers.inherits(EnhancedSelect, _React$Component);
        function EnhancedSelect(props) {
            babelHelpers.classCallCheck(this, EnhancedSelect);
            _React$Component.call(this, props);
        }
        EnhancedSelect.prototype.componentDidMount = function componentDidMount() {
            this.container = popupHelper.createPopup({ className: cx().part('popup').build() });
            this.renderPopup(false);
        };
        EnhancedSelect.prototype.componentWillUnmount = function componentWillUnmount() {
            popupHelper.destoryPopup(this.container);
            this.container = null;
        };
        EnhancedSelect.prototype.renderPopup = function renderPopup(isShow) {
        };
        EnhancedSelect.prototype.render = function render() {
        };
        return EnhancedSelect;
    }(React.Component);
    EnhancedSelect.displayName = 'EnhancedSelect';
    module.exports = EnhancedSelect;
});