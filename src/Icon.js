/**
 * @file melon-wise/Icon
 * @author cxtom<cxtom2008@gmail.com>
 */

import React from 'react';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('Icon');

export default function Icon(props) {

    return (
        <i {...props} className={cx(props).build()} />
    );

}

Icon.displayName = 'Icon';
