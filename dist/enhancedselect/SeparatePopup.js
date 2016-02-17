define('melon-wise/lib/enhancedselect/SeparatePopup', [
    'require',
    'exports',
    'module',
    'react',
    'melon-classname',
    '../Popup',
    '../Selector',
    '../Tappable',
    '../mixins/SeparateMixin'
], function (require, exports, module) {
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('EnhancedSelectPopup');
    var Popup = require('../Popup');
    var Selector = require('../Selector');
    var Tappable = require('../Tappable');
    var PropTypes = React.PropTypes;
    var SeparatePopup = React.createClass({
        displayName: 'EnhancedSelectSeparatePopup',
        mixins: [require('../mixins/SeparateMixin')],
        propTypes: {
            items: PropTypes.array,
            show: PropTypes.bool
        },
        onChange: function onChange(_ref) {
            var value = _ref.value;
            var index = _ref.index;
            var onChange = this.props.onChange;
            onChange && onChange({
                value: value,
                index: index,
                target: this
            });
            this.onHide();
        },
        onHide: function onHide() {
            var onHide = this.props.onHide;
            onHide && onHide();
        },
        render: function render() {
            var _this = this;
            var _props = this.props;
            var show = _props.show;
            var items = _props.items;
            var selectedIndex = _props.selectedIndex;
            return React.createElement(Popup, {
                show: show,
                transitionType: 'translate',
                direction: 'bottom',
                onHide: function onHide() {
                    _this.props.onHide && _this.props.onHide();
                }
            }, React.createElement('div', null, React.createElement('div', { className: cx().part('panel').build() }, React.createElement(Selector, {
                items: items,
                className: cx().part('selector').build(),
                selectedIndex: selectedIndex,
                onChange: this.onChange
            })), React.createElement(Tappable, {
                component: 'div',
                onTap: this.onHide,
                className: cx().part('cancel').build()
            }, '\u53D6\u6D88')));
        }
    });
    module.exports = SeparatePopup;
});