/**
 * @file Icon单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import {createRenderer} from 'react-addons-test-utils';

import Icon from '../../src/Icon';

describe('Icon', function () {

    it('dom', function () {
        const renderer = createRenderer();
        renderer.render(
            <Icon variants={['hello']} />
        );
        let actualElement = renderer.getRenderOutput();
        let expectedElement = (
            <i className={'ui-icon variant-hello'} variants={['hello']} />
        );
        expect(actualElement).toEqualJSX(expectedElement);
    });

});
