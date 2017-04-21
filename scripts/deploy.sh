#!/bin/sh
mkdir -p ./build/development
npm run build:production  -- --output-path ./build --output-public-path /orbit/ &
npm run build:development -- --output-path ./build/development --output-public-path /orbit/development/ &
wait
gh-pages -d build
rm -rf build
