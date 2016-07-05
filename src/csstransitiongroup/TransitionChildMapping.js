/**
 * @file mapChildren
 * @author cxtom<cxtom2008@gmail.com>
 */

import {Children} from 'react';

export function getChildMapping(children) {

    if (!children) {
        return null;
    }

    let mappedChildren = {};

    Children.forEach(children, (child, index) => {
        const childKey = child.key || index.toString(36);
        mappedChildren[childKey] = child;
    });

    return mappedChildren;
}

export function mergeChildMappings(prevChildMapping, nextChildMapping) {

    if (!prevChildMapping) {
        return nextChildMapping;
    }

    if (!nextChildMapping) {
        return prevChildMapping;
    }

    let mergedChildren = {...prevChildMapping};

    Object.keys(nextChildMapping).forEach(function (key) {
        if (prevChildMapping[key] !== nextChildMapping[key]) {
            mergedChildren[key] = nextChildMapping[key];
        }
    });

    return mergedChildren;

}
