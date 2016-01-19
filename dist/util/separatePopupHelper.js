define('melon-wise/lib/util/separatePopupHelper', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react-dom'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var ReactDOM = require('react-dom');
    exports.createPopup = function (domProps) {
        var container = document.createElement('div');
        container = babelHelpers._extends({}, container, domProps);
        document.body.appendChild(container);
        return container;
    };
    exports.destoryPopup = function (container) {
        if (container) {
            ReactDOM.unmountComponentAtNode(container);
            container.parentElement.removeChild(container);
            container = null;
        }
    };
});