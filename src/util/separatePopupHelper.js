/**
 * @file separate popup helper
 * @author cxtom (cxtom2010@gmail.com)
 */

const ReactDOM = require('react-dom');

exports.createPopup = function (domProps) {

    let container = document.createElement('div');

    container = {
        ...container,
        ...domProps
    };

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
