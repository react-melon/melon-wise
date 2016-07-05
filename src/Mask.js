/**
 * @file Mask
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Mask');

export default function Mask(props) {

    const show = props.show;

    return (
        <div {...props} className={cx(props).addStates({show}).build()} />
    );
}

Mask.propTypes = {
    show: PropTypes.bool
};

Mask.defaultProps = {
    show: false
};
