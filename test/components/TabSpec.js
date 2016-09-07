/**
 * @file Icon单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import Tab from '../../src/Tab';
import TabItem from '../../src/tab/Item';

import then from '../util/then';
import tap from '../util/tap';


describe('Tab', function () {

    describe('default', function () {

        let component;
        let items;
        let selectedItem;
        let panel;

        beforeEach(() => {
            component = TestUtils.renderIntoDocument(
                <Tab>
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
            expect(TestUtils.isDOMComponent(panel)).toBeTruthy();
        });

        it('change', done => {
            tap(items[1]);

            /* eslint-disable max-nested-callbacks */
            then(() => {
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
                done();
            }, 15);
            /* eslint-enable max-nested-callbacks */
        });

    });

    describe('advanced', function () {

        let component;
        let items;
        let container = document.createElement('div');
        const spy = jasmine.createSpy('change');

        class TestComponent extends React.Component {

            constructor(props) {
                super(props);

                this.state = {
                    selectedIndex: 0
                };

                this.onChange = this.onChange.bind(this);
            }

            onChange({index}) {
                this.setState({selectedIndex: index}, spy);
            }

            render() {
                return (
                    <Tab
                        {...this.props}
                        selectedIndex={this.state.selectedIndex}
                        ref="tab"
                        onChange={this.onChange}>
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
        }

        beforeAll(() => {

            component = ReactDOM.render(
                <TestComponent />,
                container
            );

            items = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ui-tab-item');
        });

        afterAll(() => {
            ReactDOM.unmountComponentAtNode(container);
            container = null;
        });

        it('init', function () {
            expect(TestUtils.isCompositeComponent(component)).toBe(true);
            expect(items.length).toBe(3);
            const tab = component.refs.tab;
            expect(tab.state.selectedIndex).toBe(0);
        });

        it('controlled', done => {

            tap(items[1]);

            then(() => {
                const tab = component.refs.tab;
                expect(tab.state.selectedIndex).toBe(1);
                expect(spy).toHaveBeenCalled();
                done();
            }, 15);
        });

        it('disabled', done => {

            expect(items[2].className).toMatch('state-disabled');
            tap(items[2]);

            then(() => {
                const tab = component.refs.tab;
                expect(tab.state.selectedIndex).toBe(1);
                done();
            }, 15);

        });
    });




});
