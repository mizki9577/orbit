#!/bin/sh
mkdir -p ./public/development
cp ./public/index.html ./public/development/
npm run build:development -- -o ./public/development/bundle.js &
npm run build:production -- -o ./public/bundle.js &
wait
gh-pages -d public
