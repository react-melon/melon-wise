var babelHelpers = require('../babelHelpers');
var ReactDOM = require('react-dom');
exports.createPopup = function (domProps, wrapper) {
    if (!wrapper) {
        wrapper = document.body;
    }
    var container = document.createElement('div');
    container = babelHelpers._extends({}, container, domProps);
    wrapper.appendChild(container);
    return container;
};
exports.destoryPopup = function (container) {
    if (container) {
        ReactDOM.unmountComponentAtNode(container);
        container.parentElement.removeChild(container);
        container = null;
    }
};