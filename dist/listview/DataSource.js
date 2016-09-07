(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports", "../babelHelpers"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require("../babelHelpers"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.babelHelpers);
        global.DataSource = mod.exports;
    }
})(this, function (exports, babelHelpers) {
    "use strict";

    exports.__esModule = true;
    /**
     * @file ListView DataSource
     * @author  cxtom(cxtom2008@gmail.com)
     */

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

        DataSource.prototype.cloneWithRows = function cloneWithRows(dataBlob) {

            var newSource = new DataSource({
                getRowData: this._getRowData,
                rowHasChanged: this._rowHasChanged
            });

            newSource.dataBlob = dataBlob;
            newSource.calculateDirtyArrays(this.dataBlob);

            return newSource;
        };

        DataSource.prototype.getRowData = function getRowData(rowIndex) {
            return this._getRowData(this.dataBlob, rowIndex);
        };

        DataSource.prototype.rowShouldUpdate = function rowShouldUpdate(rowIndex) {
            var needsUpdate = this.dirtyRows[rowIndex];
            return needsUpdate;
        };

        DataSource.prototype.calculateDirtyArrays = function calculateDirtyArrays(prevDataBlob) {

            this.dirtyRows = [];

            for (var i = this.dataBlob.length - 1; i >= 0; i--) {
                var dirty = !prevDataBlob[i] || this._rowHasChanged(this._getRowData(prevDataBlob, i), this._getRowData(this.dataBlob, i));
                this.dirtyRows.push(!!dirty);
            }
        };

        return DataSource;
    }();

    exports["default"] = DataSource;
});