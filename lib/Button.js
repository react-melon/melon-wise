var babelHelpers = require('./babelHelpers');
var React = require('react');
var cx = require('./util/cxBuilder').create('Button');
var Tapable = require('./Tappable');
function Button(props) {
    var label = props.label;
    var children = props.children;
    var other = babelHelpers.objectWithoutProperties(props, [
        'label',
        'children'
    ]);
    var content = label || children;
    return React.createElement(Tapable, babelHelpers._extends({}, other, {
        component: 'button',
        classBase: 'variant',
        className: cx(props).build()
    }), content);
}
module.exports = Button;