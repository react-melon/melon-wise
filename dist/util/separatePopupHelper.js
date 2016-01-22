define('melon-wise/lib/util/separatePopupHelper', [
    'require',
    'exports',
    'module',
    'react-dom'
], function (require, exports, module) {
    var ReactDOM = require('react-dom');
    exports.createPopup = function (domProps, wrapper) {
        if (!wrapper) {
            wrapper = document.body;
        }
        var container = document.createElement('div');
        domProps && Object.keys(domProps).map(function (key) {
            container[key] = domProps[key];
        });
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
});