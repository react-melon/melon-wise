var babelHelpers = require('../babelHelpers');
var React = require('react');
var cx = require('melon-classname').create('TabItem');
var Tappable = require('../Tappable');
function TabItem(props) {
    var selected = props.selected;
    var label = props.label;
    var others = babelHelpers.objectWithoutProperties(props, [
        'selected',
        'label'
    ]);
    return React.createElement(Tappable, babelHelpers._extends({}, others, { className: cx(props).addStates({ selected: selected }).build() }), label);
}
module.exports = TabItem;