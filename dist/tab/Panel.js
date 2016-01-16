define('melon-wise/lib/tab/Panel', [
    'require',
    'exports',
    'module',
    '../babelHelpers',
    'react',
    '../util/cxBuilder'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    var React = require('react');
    var cx = require('../util/cxBuilder').create('TabPanel');
    function TabPanel(props) {
        var active = props.active;
        var others = babelHelpers.objectWithoutProperties(props, ['active']);
        return React.createElement('div', babelHelpers._extends({}, props, { className: cx(props).addStates({ active: active }).build() }));
    }
    module.exports = TabPanel;
});