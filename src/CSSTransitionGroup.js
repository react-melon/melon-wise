/**
 * @file melon-wise/CSSTransitionGroup
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {Component, PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import {
    getChildMapping,
    mergeChildMappings
} from './csstransitiongroup/TransitionChildMapping';

import CSSTransitionGroupChild from './csstransitiongroup/CSSTransitionGroupChild';

const cx = create('CssTransitionGroup');

export default class CSSTransitionGroup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            children: getChildMapping(props.children)
        };

        this.currentlyTransitioningKeys = [];
        this.keysToEnter = [];
        this.keysToLeave = [];

        this.performEnter = this.performEnter.bind(this);
        this.performLeave = this.performLeave.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const nextChildMapping = getChildMapping(nextProps.children);
        const prevChildMapping = this.state.children;

        this.setState({
            children: mergeChildMappings(prevChildMapping, nextChildMapping)
        });

        let key;

        /* eslint-disable guard-for-in */

        for (key in nextChildMapping) {
            const hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
            if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
                this.keysToEnter.push(key);
            }
        }

        for (key in prevChildMapping) {
            const hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
            if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
                this.keysToLeave.push(key);
            }
        }

        /* eslint-enable guard-for-in */

        // If we want to someday check for reordering, we could do it here.
    }

    componentDidUpdate() {
        ['Enter', 'Leave'].map(action => {
            const keys = this['keysTo' + action];
            this['keysTo' + action] = [];
            keys.forEach(this['perform' + action]);
        });
    }

    performEnter(key) {
        this.currentlyTransitioningKeys[key] = true;

        const component = this.refs[key];

        if (component.componentWillEnter) {
            component.componentWillEnter(this.handleDoneEntering.bind(this, key));
        }
        else {
            this.handleDoneEntering(key);
        }
    }

    handleDoneEntering(key) {
        const component = this.refs[key];
        if (component.componentDidEnter) {
            component.componentDidEnter();
        }

        delete this.currentlyTransitioningKeys[key];

        const currentChildMapping = getChildMapping(this.props.children);

        if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
            // This was removed before it had fully entered. Remove it.
            this.performLeave(key);
        }
    }

    performLeave(key) {
        this.currentlyTransitioningKeys[key] = true;

        const component = this.refs[key];
        if (component.componentWillLeave) {
            component.componentWillLeave(this.handleDoneLeaving.bind(this, key));
        }
        else {
            // Note that this is somewhat dangerous b/c it calls setState()
            // again, effectively mutating the component before all the work
            // is done.
            this.handleDoneLeaving(key);
        }
    }

    handleDoneLeaving(key) {
        const component = this.refs[key];

        if (component.componentDidLeave) {
            component.componentDidLeave();
        }

        delete this.currentlyTransitioningKeys[key];

        const currentChildMapping = getChildMapping(this.props.children);

        if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
            // This entered again before it fully left. Add it again.
            this.performEnter(key);
        }
        else {
            this.setState(function (state) {
                const newChildren = {...state.children};
                delete newChildren[key];
                return {
                    children: newChildren
                };
            });
        }
    }

    childFactory(child, props) {

        return (
            <CSSTransitionGroupChild {...props}>
                {child}
            </CSSTransitionGroupChild>
        );
    }

    render() {

        let childrenToRender = [];

        const children = this.state.children;

        const {
            component,
            transitionTimeout,
            transitionType,
            translateFrom,
            ...others
        } = this.props;

        for (let key in children) {
            if (children[key]) {
                // You may need to apply reactive updates to a child as it is leaving.
                // The normal React way to do it won't work since the child will have
                // already been removed. In case you need this behavior you can provide
                // a childFactory function to wrap every child, even the ones that are
                // leaving.
                childrenToRender.push(React.cloneElement(this.childFactory(children[key], {
                    ref: key,
                    key,
                    transitionTimeout,
                    transitionType,
                    translateFrom
                })));
            }
        }
        return React.createElement(component, {
            ...others,
            className: cx(this.props).build()
        }, childrenToRender);
    }
}

CSSTransitionGroup.displayName = 'CSSTransitionGroup';

CSSTransitionGroup.propTypes = {
    ...CSSTransitionGroupChild.propTypes,
    component: PropTypes.string
};

CSSTransitionGroup.defaultProps = {
    ...CSSTransitionGroupChild.defaultProps,
    component: 'div'
};
