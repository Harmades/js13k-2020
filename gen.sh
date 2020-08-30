#!/bin/bash
rm -f ./src/assets.gen/*
for path in ./assets/p1.svg; do
  filename="$(basename -- $path .svg)"
  touch ./src/assets.gen/"$filename.js"
  echo "export const $filename = \`" >> ./src/assets.gen/$filename.js
  cat assets/$filename.svg >> ./src/assets.gen/$filename.js
  echo "\`" >> ./src/assets.gen/$filename.js
done