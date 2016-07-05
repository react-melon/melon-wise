/**
 * @file melon-wise/View
 * @author cxtom<2008@gmail.com>
 */

import React, {PropTypes, Component} from 'react';

import {create} from 'melon-core/classname/cxBuilder';

const cx = create('View');

export default class View extends Component {

    constructor(props) {
        super(props);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }

    onTouchStart(e) {
        this.startY = e.touches[0].clientY;
    }

    onTouchMove(e) {

        const main = this.refs.main;
        // 高位表示向上滚动
        // 底位表示向下滚动
        // 1容许 0禁止
        let status = '11';

        const currentY = e.touches[0].clientY;

        if (main.scrollTop === 0) {
            // 如果内容小于容器则同时禁止上下滚动
            status = main.offsetHeight >= main.scrollHeight ? '00' : '01';
        }
        else if (main.scrollTop + main.offsetHeight >= main.scrollHeight) {
            // 已经滚到底部了只能向上滚动
            status = '10';
        }

        if (status !== '11') {
            // 判断当前的滚动方向
            const direction = currentY - this.startY > 0 ? '10' : '01';
            // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
            if (!(parseInt(status, 2) & parseInt(direction, 2))) {
                e.preventDefault();
            }
        }
    }

    render() {

        const props = this.props;

        let {
            renderHeader,
            renderFooter,
            children,
            component,
            ...others
        } = props;

        const generator = {
            footer: renderFooter,
            header: renderHeader
        };

        const parts = Object
            .keys(generator)
            .reduce(
                (result, name) => {

                    const part = generator[name] && generator[name]();

                    if (!part) {
                        return result;
                    }

                    return {
                        ...result,
                        [name]: React.cloneElement(part, {
                            className: cx(part.props).part(name).build(),
                            key: name
                        })
                    };
                },
                {}
            );

        children = [
            parts.header,
            <div ref="main" key="main" className={cx().part('main').build()}>
                {children}
            </div>,
            parts.footer
        ];

        return React.createElement(component, {
            ...others,
            className: cx(props).build(),
            onTouchStart: this.onTouchStart,
            onTouchMove: this.onTouchMove
        }, children);

    }

}

View.displayName = 'View';

View.propTypes = {
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
    component: PropTypes.string
};

View.defaultProps = {
    component: 'div'
};
