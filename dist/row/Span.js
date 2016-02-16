define('melon-wise/lib/row/Span', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    'melon-classname'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('RowSpan');
    function RowSpan(props) {
        var occupy = props.occupy;
        var style = props.style;
        var columnNum = props.columnNum;
        var noGap = props.noGap;
        var other = babelHelpers.objectWithoutProperties(props, [
            'occupy',
            'style',
            'columnNum',
            'noGap'
        ]);
        style = babelHelpers.extends({
            width: occupy / columnNum * 100 + '%',
            WebkitBoxFlex: occupy,
            WebkitFlex: [
                occupy,
                occupy,
                'auto'
            ].join(' ')
        }, style);
        if (!noGap) {
            var padding = 20 / (columnNum - 1) + '%';
            style = babelHelpers.extends({}, style, {
                paddingLeft: padding,
                paddingRight: padding
            });
        }
        return React.createElement('div', babelHelpers.extends({}, other, {
            className: cx(props).build(),
            style: style
        }));
    }
    RowSpan.propsTypes = { occupy: React.PropTypes.number.isRequired };
    RowSpan.defaultProps = { occupy: 4 };
    module.exports = RowSpan;
});