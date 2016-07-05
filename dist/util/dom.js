(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/util/dom', ['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        var mod = { exports: {} };
        factory(mod.exports);
        global.dom = mod.exports;
    }
}(this, function (exports) {
    'use strict';
    exports.on = function (target, eventName, handler) {
        target.addEventListener(eventName, handler);
    };
    exports.off = function (target, eventName, handler) {
        target.removeEventListener(eventName, handler);
    };
    exports.contains = function (container, contained) {
        return container.contains(contained);
    };
    function getCompatElement(el) {
        var doc = el && el.ownerDocument || document;
        var compatMode = doc.compatMode;
        return !compatMode || compatMode === 'CSS1Compat' ? doc.documentElement : doc.body;
    }
    exports.getScrollLeft = function () {
        return window.pageXOffset || getCompatElement().scrollLeft;
    };
    exports.getScrollTop = function () {
        return window.pageYOffset || getCompatElement().scrollTop;
    };
    exports.getClientHeight = function () {
        return getCompatElement().clientHeight;
    };
    exports.getClientWidth = function () {
        return getCompatElement().clientWidth;
    };
    exports.getPosition = function (element) {
        var bound = element.getBoundingClientRect();
        var root = document.documentElement;
        var body = document.body;
        var clientTop = root.clientTop || body.clientTop || 0;
        var clientLeft = root.clientLeft || body.clientLeft || 0;
        var scrollTop = window.pageYOffset || root.scrollTop;
        var scrollLeft = window.pageXOffset || root.scrollLeft;
        return {
            left: parseFloat(bound.left) + scrollLeft - clientLeft,
            top: parseFloat(bound.top) + scrollTop - clientTop,
            width: bound.width,
            height: bound.height
        };
    };
    exports.hasClass = function (element, cls) {
        return element.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };
    exports.addClass = function (element, cls) {
        if (!this.hasClass(element, cls)) {
            element.className += ' ' + cls;
        }
    };
    exports.removeClass = function (element, cls) {
        if (this.hasClass(element, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
        }
    };
}));