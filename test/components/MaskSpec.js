/**
 * @file Mask单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import expect from 'expect';
import expectJSX from 'expect-jsx';
import {createRenderer} from 'react-addons-test-utils';

import Mask from '../../src/Mask';

expect.extend(expectJSX);

describe('Mask', function () {

    it('dom', function () {
        const renderer = createRenderer();
        renderer.render(
            <Mask show={true} />
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <div className={'ui-mask state-show'} show={true} />
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});
