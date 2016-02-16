define('melon-wise/lib/validator/Validity', [
    'require',
    'exports',
    'module',
    '../babelHelpers'
], function (require, exports, module) {
    var babelHelpers = require('../babelHelpers');
    'use strict';
    function ValidityState(_ref) {
        var isValid = _ref.isValid;
        var message = _ref.message;
        this.isValid = isValid;
        this.message = message || '';
    }
    var Validity = function () {
        function Validity() {
            babelHelpers.classCallCheck(this, Validity);
            this.states = [];
        }
        babelHelpers.createClass(Validity, [
            {
                key: 'addState',
                value: function addState(state) {
                    this.states.push(new ValidityState(state));
                }
            },
            {
                key: 'isValid',
                value: function isValid() {
                    for (var i = 0, states = this.states, len = states.length; i < len; ++i) {
                        if (!states[i].isValid) {
                            return false;
                        }
                    }
                    return true;
                }
            },
            {
                key: 'getMessage',
                value: function getMessage() {
                    for (var states = this.states, i = 0, len = states.length; i < len; ++i) {
                        if (!states[i].isValid) {
                            return states[i].message;
                        }
                    }
                    return '';
                }
            }
        ]);
        return Validity;
    }();
    module.exports = Validity;
});