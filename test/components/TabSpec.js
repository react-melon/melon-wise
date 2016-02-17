/**
 * @file Icon单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';

import Tab from '../../src/Tab';
import TabItem from '../../src/tab/Item';

import then from '../util/then';
import tap from '../util/tap';

/* globals before after */

describe('Tab', function () {

    describe('default', function () {

        let component;
        let items;
        let selectedItem;
        let panel;

        let changeSpy;
        let beforeChangeSpy;

        beforeEach(() => {
            changeSpy = expect.createSpy();
            beforeChangeSpy = expect.createSpy();

            component = TestUtils.renderIntoDocument(
                <Tab onChange={changeSpy} onBeforeChange={beforeChangeSpy}>
                    <TabItem label="TabA">
                        PanelA
                    </TabItem>
                    <TabItem label="TabB">
                        PanelB
                    </TabItem>
                    <TabItem label="TabC">
                        PanelC
                    </TabItem>
                </Tab>
            );

            items = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ui-tab-item');
            selectedItem = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-tab-item state-selected');
            panel = TestUtils.findRenderedDOMComponentWithClass(component, 'ui-tab-panel state-active');
        });

        afterEach(() => {
            component = selectedItem = panel = null;
            items.length = 0;
            items = null;
        });

        it('init', function () {
            expect(TestUtils.isCompositeComponent(component)).toBe(true);
            expect(component.state.selectedIndex).toBe(0);

            expect(items.length).toBe(3);
            expect(TestUtils.isDOMComponent(selectedItem)).toBe(true);
            expect(TestUtils.isDOMComponent(panel)).toBe(true);
        });

        it('change', done => {
            tap(items[1]);

            /* eslint-disable max-nested-callbacks */
            then(() => {
                expect(beforeChangeSpy).toHaveBeenCalled();
                expect(changeSpy).toHaveBeenCalled();
                expect(component.state.selectedIndex).toBe(1);
                done();
            }, 15);
            /* eslint-enable max-nested-callbacks */
        });

        it('select same', done => {
            tap(items[0]);

            /* eslint-disable max-nested-callbacks */
            then(() => {
                expect(component.state.selectedIndex).toBe(0);
                expect(beforeChangeSpy).toNotHaveBeenCalled();
                expect(changeSpy).toNotHaveBeenCalled();
                done();
            }, 15);
            /* eslint-enable max-nested-callbacks */
        });

    });

    describe('advanced', function () {

        let component;
        let items;
        let container = document.createElement('div');

        const TestComponent = React.createClass({

            render() {
                return (
                    <Tab {...this.props} ref="tab">
                        <TabItem label="TabA">
                            PanelA
                        </TabItem>
                        <TabItem label="TabB">
                            PanelB
                        </TabItem>
                        <TabItem label="TabC" disabled>
                            PanelC
                        </TabItem>
                    </Tab>
                );
            }
        });

        before(() => {

            component = ReactDOM.render(
                <TestComponent />,
                container
            );

            items = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ui-tab-item');
        });

        after(() => {
            ReactDOM.unmountComponentAtNode(container);
            container = null;
        });

        it('init', function () {
            expect(TestUtils.isCompositeComponent(component)).toBe(true);
            expect(items.length).toBe(3);
        });

        it('preventDefault', done => {

            const changeSpy = expect.createSpy();
            const beforeChangeSpy = expect.createSpy();

            ReactDOM.render(
                <TestComponent
                    onBeforeChange={e => {
                        e.preventDefault();
                        beforeChangeSpy();
                    }}
                    onChange={changeSpy} />,
                container
            );

            tap(items[1]);

            const tab = component.refs.tab;

            /* eslint-disable max-nested-callbacks */
            then(() => {
                expect(tab.state.selectedIndex).toBe(0);
                expect(beforeChangeSpy).toHaveBeenCalled();
                expect(changeSpy).toNotHaveBeenCalled();
                done();
            }, 15);
            /* eslint-enable max-nested-callbacks */
        });

        it('recieveProps', () => {

            const changeSpy = expect.createSpy();

            ReactDOM.render(
                <TestComponent
                    selectedIndex={1}
                    onChange={changeSpy} />,
                container
            );

            const tab = component.refs.tab;

            expect(tab.state.selectedIndex).toBe(1);
            expect(changeSpy).toHaveBeenCalled();

        });

        it('disabled', () => {

            expect(items[2].className).toInclude('state-disabled');

            tap(items[2]);

            const tab = component.refs.tab;

            expect(tab.state.selectedIndex).toBe(1);

        });
    });




});
