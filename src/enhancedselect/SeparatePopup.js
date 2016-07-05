/**
 * @file melon-wise/select/EnhancedSelectSeparatePopup
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';

import Popup from '../Popup';
import Selector from '../Selector';
import LockBody from '../common/LockBody';

const cx = create('EnhancedSelectPopup');

export default class SeparatePopup extends LockBody {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    onChange({value, index}) {
        this.props.onChange({
            value,
            index,
            target: this
        });

        this.onHide();
    }

    onHide() {
        this.props.onHide();
    }

    render() {

        const {
            items,
            selectedIndex,
            ...rest
        } = this.props;

        return (
            <Popup
                {...rest}
                transitionType="translate"
                direction="bottom" >
                <div className={cx.getPartClassName('panel')}>
                    <Selector
                        items={items}
                        className={cx.getPartClassName('selector')}
                        selectedIndex={selectedIndex}
                        onChange={this.onChange} />
                </div>
                <div
                    onClick={this.onHide}
                    className={cx.getPartClassName('cancel')}>
                    取消
                </div>
            </Popup>
        );

    }
}

SeparatePopup.displayName = 'EnhancedSelectSeparatePopup',

SeparatePopup.propTypes = {
    items: PropTypes.array,
    show: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    onHide: PropTypes.func.isRequired
};

