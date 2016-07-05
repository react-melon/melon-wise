var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/ListView', [
            'exports',
            'react',
            'melon-core/classname/cxBuilder',
            './listview/DataSource',
            './listview/StaticRenderer'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./listview/DataSource'), require('./listview/StaticRenderer'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.cxBuilder, global.DataSource, global.StaticRenderer);
        global.ListView = mod.exports;
    }
}(this, function (exports, _react, _cxBuilder, _DataSource, _StaticRenderer) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _DataSource2 = babelHelpers.interopRequireDefault(_DataSource);
    var _StaticRenderer2 = babelHelpers.interopRequireDefault(_StaticRenderer);
    var cx = (0, _cxBuilder.create)('ListView');
    var ListView = function (_Component) {
        babelHelpers.inherits(ListView, _Component);
        function ListView() {
            babelHelpers.classCallCheck(this, ListView);
            return babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(ListView).apply(this, arguments));
        }
        babelHelpers.createClass(ListView, [{
                key: 'render',
                value: function render() {
                    var props = this.props;
                    var component = props.component;
                    var dataSource = props.dataSource;
                    var renderRow = props.renderRow;
                    var rest = babelHelpers.objectWithoutProperties(props, [
                        'component',
                        'dataSource',
                        'renderRow'
                    ]);
                    var total = dataSource.dataBlob.length;
                    var bodyComponent = dataSource.dataBlob.map(function (row, index) {
                        return _react2.default.createElement(_StaticRenderer2.default, {
                            key: index,
                            shouldUpdate: dataSource.rowShouldUpdate(index),
                            render: renderRow.bind(null, dataSource.getRowData(index), index, total)
                        });
                    });
                    return _react2.default.createElement(component, babelHelpers.extends({}, rest, { className: cx(props).build() }), bodyComponent);
                }
            }]);
        return ListView;
    }(_react.Component);
    exports.default = ListView;
    ListView.displayName = 'ListView';
    ListView.propTypes = {
        renderRow: _react.PropTypes.func.isRequired,
        component: _react.PropTypes.string,
        dataSource: _react.PropTypes.instanceOf(_DataSource2.default).isRequired
    };
    ListView.defaultProps = { component: 'div' };
    ListView.DataSource = _DataSource2.default;
}));