/**
 * @file config edp-webserver
 * @author EFE
 */

/* globals home, redirect, content, empty, autocss, file, less, stylus, header, proxyNoneExists */
/* eslint-disable no-console */

exports.port = 8838;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

var babel = require('babel-core');
var nib = require('nib');

exports.stylus = require('stylus');

exports.getLocations = function () {
    return [
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus({
                    'use': nib(),
                    'resolve url': true,
                    'paths': [require('path').join(__dirname, './dep')]
                })
            ]
        },
        {
            location: function (context) {
                return /^\/(src|example).*?\.js($|\?)/.test(context.url);
            },
            handler: [
                file(),
                function (context) {
                    try {
                        context.content = babel
                            .transform(context.content, {
                                compact: false,
                                ast: false,
                                presets: ['es2015', 'stage-1', 'react'],
                                plugins: [
                                    'transform-es2015-modules-amd'
                                ],
                                moduleId: '',
                                getModuleId: function (filename) {
                                    return filename.replace('src/', '');
                                }
                            }).code;
                    }
                    catch (e) {
                        console.error(e.stack);
                        context.status = 500;
                    }
                }
            ]
        },
        {
            location: /\.(ttf|woff|eot|svg)($|\?)/,
            handler: [
                header({
                    'Access-Control-Allow-Origin': '*'
                }),
                file()
            ]
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

/* eslint-disable guard-for-in */
exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};
