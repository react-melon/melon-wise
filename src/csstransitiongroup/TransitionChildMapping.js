/**
 * @file mapChildren
 * @author cxtom<cxtom2010@gmail.com>
 */

const React = require('react');

export function getChildMapping(children) {

    let mappedChildren = {};

    React.Children.forEach(children, (child, index) => {

        const {
            childKey = Date.now()
        } = child.props;

        mappedChildren[childKey] = child;

    });

    return mappedChildren;
}

export function mergeChildMappings(prevChildMapping, nextChildMapping) {

    let mergedChildren = {...prevChildMapping} || {};

    Object.keys(nextChildMapping).forEach(function (key) {

        if (!prevChildMapping[key] && prevChildMapping[key] !== nextChildMapping[key]) {
            mergedChildren[key] = nextChildMapping[key];
        }

    });

    return mergedChildren;

}
