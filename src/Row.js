/**
 * @file main
 * @author cxtom(cxtom2010@gmail.com)
 */

import React, {PropTypes} from 'react';

const cx = require('./util/cxBuilder').create('Row');

function Row(props) {

    const {columnNum, noGap} = props;
    const margin = -20 / (columnNum - 1) + '%';
    const style = noGap ? null : {
        marginLeft: margin,
        marginRight: margin
    };

    return (
        <div {...props} className={cx(props).build()} style={style}>
            {React.Children.map(props.children, function (child, index) {
                return React.cloneElement(child, {
                    key: index,
                    columnNum,
                    noGap
                });
            })}
        </div>
    );

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

export default Row;
