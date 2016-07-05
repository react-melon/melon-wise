/**
 * @file melon-wise/FlexRow
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {PropTypes, Component, Children, cloneElement} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import Span from './row/Span';

const cx = create('FlexRow');

export default class FlexRow extends Component {

    render() {

        const props = this.props;

        const {columnNum, noGap, ...rest} = props;
        const margin = -20 / (columnNum - 1) + '%';
        const style = noGap ? null : {
            marginLeft: margin,
            marginRight: margin
        };

        return (
            <div {...rest} className={cx(props).build()} style={style}>
                {Children.map(props.children, function (child, index) {
                    return cloneElement(child, {
                        key: index,
                        columnNum,
                        noGap
                    });
                })}
            </div>
        );
    }
}

FlexRow.displayName = 'FlexRow';

FlexRow.propTypes = {
    columnNum: PropTypes.number,
    noGap: PropTypes.bool
};

FlexRow.defaultProps = {
    columnNum: 12,
    noGap: false
};

FlexRow.Span = Span;
