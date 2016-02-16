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
 * @flow
 */
'use strict';

var React = require('react');

var StaticRenderer = React.createClass({

    propTypes: {
        shouldUpdate: React.PropTypes.bool.isRequired,
        render: React.PropTypes.func.isRequired
    },

    shouldComponentUpdate(nextProps) {
        return nextProps.shouldUpdate;
    },

    render() {
        return this.props.render();
    }
});

module.exports = StaticRenderer;
