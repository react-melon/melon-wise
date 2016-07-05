var babelHelpers = require('./babelHelpers');
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define('melon-wise/lib/CSSTransitionGroup', [
            'exports',
            'react',
            'melon-core/classname/cxBuilder',
            './csstransitiongroup/TransitionChildMapping',
            './csstransitiongroup/CSSTransitionGroupChild'
        ], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./csstransitiongroup/TransitionChildMapping'), require('./csstransitiongroup/CSSTransitionGroupChild'));
    } else {
        var mod = { exports: {} };
        factory(mod.exports, global.react, global.cxBuilder, global.TransitionChildMapping, global.CSSTransitionGroupChild);
        global.CSSTransitionGroup = mod.exports;
    }
}(this, function (exports, _react, _cxBuilder, _TransitionChildMapping, _CSSTransitionGroupChild) {
    'use strict';
    Object.defineProperty(exports, '__esModule', { value: true });
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _CSSTransitionGroupChild2 = babelHelpers.interopRequireDefault(_CSSTransitionGroupChild);
    var cx = (0, _cxBuilder.create)('CssTransitionGroup');
    var CSSTransitionGroup = function (_Component) {
        babelHelpers.inherits(CSSTransitionGroup, _Component);
        function CSSTransitionGroup(props) {
            babelHelpers.classCallCheck(this, CSSTransitionGroup);
            var _this = babelHelpers.possibleConstructorReturn(this, Object.getPrototypeOf(CSSTransitionGroup).call(this, props));
            _this.state = { children: (0, _TransitionChildMapping.getChildMapping)(props.children) };
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
                    var nextChildMapping = (0, _TransitionChildMapping.getChildMapping)(nextProps.children);
                    var prevChildMapping = this.state.children;
                    this.setState({ children: (0, _TransitionChildMapping.mergeChildMappings)(prevChildMapping, nextChildMapping) });
                    var key = void 0;
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
                    var currentChildMapping = (0, _TransitionChildMapping.getChildMapping)(this.props.children);
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
                    var currentChildMapping = (0, _TransitionChildMapping.getChildMapping)(this.props.children);
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
                    return _react2.default.createElement(_CSSTransitionGroupChild2.default, props, child);
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
                            childrenToRender.push(_react2.default.cloneElement(this.childFactory(children[key], {
                                ref: key,
                                key: key,
                                transitionTimeout: transitionTimeout,
                                transitionType: transitionType,
                                translateFrom: translateFrom
                            })));
                        }
                    }
                    return _react2.default.createElement(component, babelHelpers.extends({}, others, { className: cx(this.props).build() }), childrenToRender);
                }
            }
        ]);
        return CSSTransitionGroup;
    }(_react.Component);
    exports.default = CSSTransitionGroup;
    CSSTransitionGroup.displayName = 'CSSTransitionGroup';
    CSSTransitionGroup.propTypes = babelHelpers.extends({}, _CSSTransitionGroupChild2.default.propTypes, { component: _react.PropTypes.string });
    CSSTransitionGroup.defaultProps = babelHelpers.extends({}, _CSSTransitionGroupChild2.default.defaultProps, { component: 'div' });
}));