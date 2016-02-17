/**
 * @file tap
 * @author cxtom(cxtom2010@gmail.com)
 */

import TestUtils from 'react-addons-test-utils';

export function nativeTouchData(x, y) {
    return {
        touches: [
            {pageX: x, pageY: y, clientX: x, clientY: y}
        ]
    };
}

export default function tap(node) {
    TestUtils.Simulate.touchStart(node, nativeTouchData(0, 0));
    TestUtils.Simulate.touchMove(node, nativeTouchData(0, 0));

    setTimeout(function () {
        TestUtils.Simulate.touchEnd(node, nativeTouchData(0, 0));
    }, 10);
}
