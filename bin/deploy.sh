#!/bin/sh
mkdir -p ./public/development
cp ./public/index.html ./public/development/
npm run build:development -- --output-filename 'development/bundle.js' &
npm run build:production -- --output-filename 'bundle.js' &
wait
gh-pages -d public
