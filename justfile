build:
  just install_deps
  git pull
  mkdir -p public
  rm -rf public/*
  hugo
  just build_slides

[working-directory: 'slides']
build_slides:
  #!/usr/bin/env sh
  set -eu
  mkdir -p ../public/slides
  deno install
  for file in week*.md; do \
    week="${file%.*}"; \
    deno task build --base /slides/$week/ $file; \
    deno task export $file --output ../public/slides/$week.pdf; \
    rsync -aiz dist/ ../public/slides/$week; \
  done
  rsync -aiz public/images/ ../public/images

dev:
  hugo serve -D --bind 0.0.0.0

install_deps:
  git submodule init && git submodule update

format:
  deno fmt --ext md $(fd --exclude assets/ '\.md$')

