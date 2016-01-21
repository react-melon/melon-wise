/**
 * @file separate popup helper
 * @author cxtom (cxtom2010@gmail.com)
 */

const ReactDOM = require('react-dom');

exports.createPopup = function (domProps, wrapper) {

    if (!wrapper) {
        wrapper = document.body;
    }

    let container = document.createElement('div');

    container = {
        ...container,
        ...domProps
    };

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
