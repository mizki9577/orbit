#!/bin/sh
mkdir -p ./build/development
cp ./public/index.html ./build/
cp ./public/index.html ./build/development/
npm run build:development -- --output-path ./build --output-filename development/bundle.js &
npm run build:production  -- --output-path ./build --output-filename bundle.js &
wait
gh-pages -d build
rm -rf build
