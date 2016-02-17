define('melon-wise/lib/CSSTransitionGroup', [
    'require',
    'exports',
    'module',
    './babelHelpers',
    'react',
    'melon-classname',
    './csstransitiongroup/TransitionChildMapping',
    './csstransitiongroup/CSSTransitionGroupChild'
], function (require, exports, module) {
    var babelHelpers = require('./babelHelpers');
    'use strict';
    var React = require('react');
    var cx = require('melon-classname').create('CssTransitionGroup');
    var PropTypes = React.PropTypes;
    var _require = require('./csstransitiongroup/TransitionChildMapping');
    var getChildMapping = _require.getChildMapping;
    var mergeChildMappings = _require.mergeChildMappings;
    var CSSTransitionGroupChild = require('./csstransitiongroup/CSSTransitionGroupChild');
    var CSSTransitionGroup = function (_React$Component) {
        babelHelpers.inherits(CSSTransitionGroup, _React$Component);
        function CSSTransitionGroup(props) {
            babelHelpers.classCallCheck(this, CSSTransitionGroup);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CSSTransitionGroup).call(this, props));
            _this.state = { children: getChildMapping(props.children, props.childKey) };
            _this.currentlyTransitioningKeys = [];
            _this.keysToEnter = [];
            _this.keysToLeave = [];
            _this.performEnter = _this.performEnter.bind(_this);
            _this.performLeave = _this.performLeave.bind(_this);
            return _this;
        }
        babelHelpers.createClass(CSSTransitionGroup, [
            {
                key: 'componentWillReceiveProps',
                value: function componentWillReceiveProps(nextProps) {
                    var nextChildMapping = getChildMapping(nextProps.children);
                    var prevChildMapping = this.state.children;
                    this.setState({ children: mergeChildMappings(prevChildMapping, nextChildMapping) });
                    var key = undefined;
                    for (key in nextChildMapping) {
                        var hasPrev = prevChildMapping && prevChildMapping.hasOwnProperty(key);
                        if (nextChildMapping[key] && !hasPrev && !this.currentlyTransitioningKeys[key]) {
                            this.keysToEnter.push(key);
                        }
                    }
                    for (key in prevChildMapping) {
                        var hasNext = nextChildMapping && nextChildMapping.hasOwnProperty(key);
                        if (prevChildMapping[key] && !hasNext && !this.currentlyTransitioningKeys[key]) {
                            this.keysToLeave.push(key);
                        }
                    }
                }
            },
            {
                key: 'componentDidUpdate',
                value: function componentDidUpdate() {
                    var _this2 = this;
                    [
                        'Enter',
                        'Leave'
                    ].map(function (action) {
                        var keys = _this2['keysTo' + action];
                        _this2['keysTo' + action] = [];
                        keys.forEach(_this2['perform' + action]);
                    });
                }
            },
            {
                key: 'performEnter',
                value: function performEnter(key) {
                    this.currentlyTransitioningKeys[key] = true;
                    var component = this.refs[key];
                    if (component.componentWillEnter) {
                        component.componentWillEnter(this.handleDoneEntering.bind(this, key));
                    } else {
                        this.handleDoneEntering(key);
                    }
                }
            },
            {
                key: 'handleDoneEntering',
                value: function handleDoneEntering(key) {
                    var component = this.refs[key];
                    if (component.componentDidEnter) {
                        component.componentDidEnter();
                    }
                    delete this.currentlyTransitioningKeys[key];
                    var currentChildMapping = getChildMapping(this.props.children);
                    if (!currentChildMapping || !currentChildMapping.hasOwnProperty(key)) {
                        this.performLeave(key);
                    }
                }
            },
            {
                key: 'performLeave',
                value: function performLeave(key) {
                    this.currentlyTransitioningKeys[key] = true;
                    var component = this.refs[key];
                    if (component.componentWillLeave) {
                        component.componentWillLeave(this.handleDoneLeaving.bind(this, key));
                    } else {
                        this.handleDoneLeaving(key);
                    }
                }
            },
            {
                key: 'handleDoneLeaving',
                value: function handleDoneLeaving(key) {
                    var component = this.refs[key];
                    if (component.componentDidLeave) {
                        component.componentDidLeave();
                    }
                    delete this.currentlyTransitioningKeys[key];
                    var currentChildMapping = getChildMapping(this.props.children);
                    if (currentChildMapping && currentChildMapping.hasOwnProperty(key)) {
                        this.performEnter(key);
                    } else {
                        this.setState(function (state) {
                            var newChildren = babelHelpers.extends({}, state.children);
                            delete newChildren[key];
                            return { children: newChildren };
                        });
                    }
                }
            },
            {
                key: 'childFactory',
                value: function childFactory(child, props) {
                    return React.createElement(CSSTransitionGroupChild, props, child);
                }
            },
            {
                key: 'render',
                value: function render() {
                    var childrenToRender = [];
                    var children = this.state.children;
                    var _props = this.props;
                    var component = _props.component;
                    var transitionTimeout = _props.transitionTimeout;
                    var transitionType = _props.transitionType;
                    var translateFrom = _props.translateFrom;
                    var others = babelHelpers.objectWithoutProperties(_props, [
                        'component',
                        'transitionTimeout',
                        'transitionType',
                        'translateFrom'
                    ]);
                    for (var key in children) {
                        if (children[key]) {
                            childrenToRender.push(React.cloneElement(this.childFactory(children[key], {
                                ref: key,
                                key: key,
                                transitionTimeout: transitionTimeout,
                                transitionType: transitionType,
                                translateFrom: translateFrom
                            })));
                        }
                    }
                    return React.createElement(component, babelHelpers.extends({}, others, { className: cx(this.props).build() }), childrenToRender);
                }
            }
        ]);
        return CSSTransitionGroup;
    }(React.Component);
    CSSTransitionGroup.displayName = 'CSSTransitionGroup';
    CSSTransitionGroup.propTypes = babelHelpers.extends({}, CSSTransitionGroupChild.propTypes, { component: PropTypes.string });
    CSSTransitionGroup.defaultProps = babelHelpers.extends({}, CSSTransitionGroupChild.defaultProps, { component: 'div' });
    module.exports = CSSTransitionGroup;
});