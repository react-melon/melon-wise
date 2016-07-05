/**
 * @file EnhancedSelect
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {create} from 'melon-core/classname/cxBuilder';
import InputComponent from 'melon-core/InputComponent';

import * as popupHelper from './util/separatePopupHelper';
import SeparatePopup from './enhancedselect/SeparatePopup';

const cx = create('EnhancedSelect');

export default class EnhancedSelect extends InputComponent {

    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {

        this.container = popupHelper
            .createPopup({
                className: cx.getPartClassName('popup')
            });

        this.renderPopup(false);
    }

    componentWillUnmount() {
        popupHelper.destoryPopup(this.container);
        this.container = null;
    }

    onChange({index, value}) {
        super.onChange({
            type: 'change',
            target: this,
            value
        });
    }

    getSelectedIndex(value) {
        const items = this.props.items;

        for (let i = 0, len = items.length; i < len; i++) {
            if (items[i].value === value) {
                return i;
            }
        }
    }

    renderPopup(isShow) {

        const items = this.props.items;

        ReactDOM.render(
            <SeparatePopup
                show={isShow}
                selectedIndex={this.getSelectedIndex(this.state.value)}
                items={items}
                onChange={this.onChange}
                onHide={() => {
                    this.renderPopup(false);
                }} />,
            this.container
        );
    }

    renderResult() {

        const {placeholder, items} = this.props;
        const value = this.state.value;

        let selectedItem = items[this.getSelectedIndex(value)];

        return selectedItem && value ? (
            <div className={cx.getPartClassName('result')}>
                {selectedItem.name}
            </div>
        ) : (
            <div className={cx.getPartClassName('label-placeholder')}>
                {placeholder}
            </div>
        );
    }

    renderLabel() {

        const label = this.props.label;

        return label ? (
            <label className={cx().part('label').build()}>
                {label}
            </label>
        ) : null;
    }

    renderHiddenInput() {
        return (
            <input
                type="hidden"
                name={name}
                value={this.state.value} />
        );
    }

    render() {

        return (
            <div
                className={cx(this.props).build()}
                onClick={() => this.renderPopup(true)}>
                {this.renderLabel()}
                {this.renderResult()}
                {this.renderHiddenInput()}
            </div>
        );
    }
}

EnhancedSelect.displayName = 'EnhancedSelect';

EnhancedSelect.propTypes = {
    ...InputComponent.propTypes,
    label: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string
    })).isRequired
};

EnhancedSelect.defaultProps = {
    ...InputComponent.defaultProps,
    defaultValue: ''
};
