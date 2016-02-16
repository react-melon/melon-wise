define('melon-wise/lib/ListView', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    './listview/DataSource',
    './listview/StaticRenderer'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('listview');
    var DataSource = require('./listview/DataSource');
    var StaticRender = require('./listview/StaticRenderer');
    var PropTypes = React.PropTypes;
    var ListView = function (_React$Component) {
        babelHelpers.inherits(ListView, _React$Component);
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
                        return React.createElement(StaticRender, {
                            key: index,
                            shouldUpdate: dataSource.rowShouldUpdate(index),
                            render: renderRow.bind(null, dataSource.getRowData(index), index, total)
                        });
                    });
                    return React.createElement(component, babelHelpers.extends({}, rest, { className: cx(props).build() }), bodyComponent);
                }
            }]);
        return ListView;
    }(React.Component);
    ListView.displayName = 'ListView';
    ListView.propTypes = {
        renderRow: PropTypes.func.isRequired,
        component: PropTypes.string,
        dataSource: PropTypes.instanceOf(DataSource).isRequired
    };
    ListView.defaultProps = { component: 'div' };
    ListView.DataSource = DataSource;
    module.exports = ListView;
});