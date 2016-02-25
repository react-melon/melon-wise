/**
 * @file tap
 * @author cxtom(cxtom2010@gmail.com)
 */

import TestUtils from 'react-addons-test-utils';

function nativeTouchData(x, y) {
    return {
        touches: [
            {pageX: x, pageY: y, clientX: x, clientY: y}
        ]
    };
}

export default function tap(node, x = 0, y = 0) {
    TestUtils.Simulate.touchStart(node, nativeTouchData(x, y));
    TestUtils.Simulate.touchMove(node, nativeTouchData(x, y));

    setTimeout(function () {
        TestUtils.Simulate.touchEnd(node, nativeTouchData(x, y));
    }, 10);
}
