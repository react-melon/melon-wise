/**
 * @file separate popup helper
 * @author cxtom (cxtom2008@gmail.com)
 */

import ReactDOM from 'react-dom';

export function createPopup(domProps, wrapper) {

    if (!wrapper) {
        wrapper = document.body;
    }

    let container = document.createElement('div');

    domProps && Object.keys(domProps).map(function (key) {
        container[key] = domProps[key];
    });

    wrapper.appendChild(container);

    return container;
}

export function destoryPopup(container) {

    if (container) {
        ReactDOM.unmountComponentAtNode(container);
        container.parentElement.removeChild(container);
        container = null;
    }
}
