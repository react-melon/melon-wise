#!/bin/bash

rm -rf dist lib
npm run build
mkdir -p lib
cp -rf dist/** package.json README.md lib
cd lib
npm publish
