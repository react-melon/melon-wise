define('melon-wise/lib/Row', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    './row/Span'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var PropTypes = React.PropTypes;
    var cx = require('melon-classname').create('Row');
    function Row(props) {
        var columnNum = props.columnNum;
        var noGap = props.noGap;
        var margin = -20 / (columnNum - 1) + '%';
        var style = noGap ? null : {
            marginLeft: margin,
            marginRight: margin
        };
        return React.createElement('div', babelHelpers.extends({}, props, {
            className: cx(props).build(),
            style: style
        }), React.Children.map(props.children, function (child, index) {
            return React.cloneElement(child, {
                key: index,
                columnNum: columnNum,
                noGap: noGap
            });
        }));
    }
    Row.displayName = 'Row';
    Row.propTypes = {
        columnNum: PropTypes.number,
        noGap: PropTypes.bool
    };
    Row.defaultProps = {
        columnNum: 12,
        noGap: false
    };
    Row.Span = require('./row/Span');
    module.exports = Row;
});