define('melon-wise/lib/listview/DataSource', [
    'require',
    'exports',
    'module',
    '../babelHelpers'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    function defaultRowHasChanged(r1, r2) {
        return r1 !== r2;
    }
    function defaultGetRowData(dataBlob, rowID) {
        return dataBlob[rowID];
    }
    var DataSource = function () {
        function DataSource() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
            babelHelpers.classCallCheck(this, DataSource);
            this._rowHasChanged = options.rowHasChanged || defaultRowHasChanged;
            this._getRowData = options.getRowData || defaultGetRowData;
            this.dataBlob = [];
            this.dirtyRows = [];
        }
        babelHelpers.createClass(DataSource, [
            {
                key: 'cloneWithRows',
                value: function cloneWithRows(dataBlob) {
                    var newSource = new DataSource({
                        getRowData: this._getRowData,
                        rowHasChanged: this._rowHasChanged
                    });
                    newSource.dataBlob = dataBlob;
                    newSource.calculateDirtyArrays(this.dataBlob);
                    return newSource;
                }
            },
            {
                key: 'getRowData',
                value: function getRowData(rowIndex) {
                    return this._getRowData(this.dataBlob, rowIndex);
                }
            },
            {
                key: 'rowShouldUpdate',
                value: function rowShouldUpdate(rowIndex) {
                    var needsUpdate = this.dirtyRows[rowIndex];
                    return needsUpdate;
                }
            },
            {
                key: 'calculateDirtyArrays',
                value: function calculateDirtyArrays(prevDataBlob) {
                    this.dirtyRows = [];
                    for (var i = this.dataBlob.length - 1; i >= 0; i--) {
                        var dirty = !prevDataBlob[i] || this._rowHasChanged(this._getRowData(prevDataBlob, i), this._getRowData(this.dataBlob, i));
                        this.dirtyRows.push(!!dirty);
                    }
                }
            }
        ]);
        return DataSource;
    }();
    module.exports = DataSource;
});