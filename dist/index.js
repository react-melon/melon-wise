define('melon-wise/lib/index', [
    'require',
    'exports',
    'module',
    './Button',
    './Form',
    './Icon',
    './LazyImage',
    './ListView',
    './Mask',
    './MonthPicker',
    './NavigationBar',
    './Popup',
    './Row',
    './Select',
    './Tab',
    './Tappable',
    './TextBox',
    './Tirle',
    './TransitionGroup',
    './Validator',
    './View',
    './createInputComponent',
    './util/date',
    './util/dom'
], function (require, exports, module) {
    module.exports = {
        Button: require('./Button'),
        Form: require('./Form'),
        Icon: require('./Icon'),
        LazyImage: require('./LazyImage'),
        ListView: require('./ListView'),
        Mask: require('./Mask'),
        MonthPicker: require('./MonthPicker'),
        NavigationBar: require('./NavigationBar'),
        Popup: require('./Popup'),
        Row: require('./Row'),
        Select: require('./Select'),
        Tab: require('./Tab'),
        Tappable: require('./Tappable'),
        TextBox: require('./TextBox'),
        Title: require('./Tirle'),
        TransitionGroup: require('./TransitionGroup'),
        Validator: require('./Validator'),
        View: require('./View'),
        createInputComponent: require('./createInputComponent'),
        util: {
            date: require('./util/date'),
            dom: require('./util/dom')
        }
    };
});