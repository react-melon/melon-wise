/**
 * @file ListView DataSource
 * @author  cxtom(cxtom2010@gmail.com)
 */

function defaultRowHasChanged(r1, r2) {
    return r1 !== r2;
}

function defaultGetRowData(dataBlob, rowID) {
    return dataBlob[rowID];
}

class DataSource {

    constructor(options = {}) {
        this._rowHasChanged = options.rowHasChanged || defaultRowHasChanged;
        this._getRowData = options.getRowData || defaultGetRowData;
        this.dataBlob = [];
        this.dirtyRows = [];
    }

    cloneWithRows(dataBlob) {

        let newSource = new DataSource({
            getRowData: this._getRowData,
            rowHasChanged: this._rowHasChanged
        });

        newSource.dataBlob = dataBlob;
        newSource.calculateDirtyArrays(this.dataBlob);

        return newSource;
    }

    getRowData(rowIndex) {
        return this._getRowData(this.dataBlob, rowIndex);
    }

    rowShouldUpdate(rowIndex) {
        const needsUpdate = this.dirtyRows[rowIndex];
        return needsUpdate;
    }

    calculateDirtyArrays(prevDataBlob) {

        this.dirtyRows = [];

        for (let i = this.dataBlob.length - 1; i >= 0; i--) {
            const dirty = !prevDataBlob[i]
                || this._rowHasChanged(
                    this._getRowData(prevDataBlob, i),
                    this._getRowData(this.dataBlob, i)
                );
            this.dirtyRows.push(!!dirty);
        }

    }

}

module.exports = DataSource;
