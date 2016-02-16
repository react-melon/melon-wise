define('melon-wise/lib/View', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('View');
    var View = React.createClass({
        displayName: 'View',
        propTypes: {
            renderHeader: React.PropTypes.func,
            renderFooter: React.PropTypes.func
        },
        onTouchStart: function onTouchStart(e) {
            this.startY = e.touches[0].clientY;
        },
        onTouchMove: function onTouchMove(e) {
            var main = this.refs.main;
            var status = '11';
            var currentY = e.touches[0].clientY;
            if (main.scrollTop === 0) {
                status = main.offsetHeight >= main.scrollHeight ? '00' : '01';
            } else if (main.scrollTop + main.offsetHeight >= main.scrollHeight) {
                status = '10';
            }
            if (status !== '11') {
                var direction = currentY - this.startY > 0 ? '10' : '01';
                if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                    e.preventDefault();
                }
            }
        },
        render: function render() {
            var props = this.props;
            var renderHeader = props.renderHeader;
            var renderFooter = props.renderFooter;
            var children = props.children;
            var component = props.component;
            var others = babelHelpers.objectWithoutProperties(props, [
                'renderHeader',
                'renderFooter',
                'children',
                'component'
            ]);
            var generator = {
                footer: renderFooter,
                header: renderHeader
            };
            var parts = Object.keys(generator).reduce(function (result, name) {
                var part = generator[name] && generator[name]();
                if (!part) {
                    return result;
                }
                return babelHelpers.extends({}, result, babelHelpers.defineProperty({}, name, React.cloneElement(part, {
                    className: cx(part.props).part(name).build(),
                    key: name
                })));
            }, {});
            children = [
                parts.header,
                React.createElement('div', {
                    ref: 'main',
                    key: 'main',
                    className: cx().part('main').build()
                }, children),
                parts.footer
            ];
            return React.createElement(component, babelHelpers.extends({}, others, {
                className: cx(props).build(),
                onTouchStart: this.onTouchStart,
                onTouchMove: this.onTouchMove
            }), children);
        }
    });
    View.defaultProps = { component: 'div' };
    module.exports = View;
});