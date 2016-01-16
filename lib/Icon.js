var babelHelpers = require('./babelHelpers');
var React = require('react');
var cx = require('./util/cxBuilder').create('Icon');
function Icon(props) {
    return React.createElement('i', babelHelpers._extends({}, props, { className: cx(props).build() }));
}
module.exports = Icon;