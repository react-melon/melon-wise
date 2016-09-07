(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'react'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, require('react'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.react);
        global.StaticRenderer = mod.exports;
    }
})(this, function (module, React) {
    /**
     * @file from https://github.com/facebook/react-native/blob/b75c939d59dad8ff9939c0b7882ef0f4f10e9b8e/Libraries/Components/StaticRenderer.js
     *
     * Copyright (c) 2015-present, Facebook, Inc.
     * All rights reserved.
     *
     * This source code is licensed under the BSD-style license found in the
     * LICENSE file in the root directory of this source tree. An additional grant
     * of patent rights can be found in the PATENTS file in the same directory.
     *
     * @providesModule StaticRenderer
     * @author
     * 
     */
    'use strict';

    var StaticRenderer = React.createClass({
        displayName: 'StaticRenderer',


        propTypes: {
            shouldUpdate: React.PropTypes.bool.isRequired,
            render: React.PropTypes.func.isRequired
        },

        shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
            return nextProps.shouldUpdate;
        },
        render: function render() {
            return this.props.render();
        }
    });

    module.exports = StaticRenderer;
});