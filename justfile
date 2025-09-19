build:
  just install_deps
  mkdir -p public
  rm -rf public/*
  just build_base_site
  just build_slides

install_deps:
  git pull
  git submodule init && git submodule update

build_base_site:
  hugo build

[working-directory: 'slides']
build_slides:
  #!/usr/bin/env sh
  set -eu
  mkdir -p ../public/slides
  deno install
  deno install --allow-scripts=npm:playwright-chromium
  for file in week*.md; do \
    week="${file%.*}"; \
    deno task build --base /slides/$week/ $file; \
    deno task export $file --output ../public/slides/$week.pdf; \
    rsync -aiz dist/ ../public/slides/$week; \
  done
  rsync -aiz public/images/ ../public/images

dev:
  hugo serve -D --bind 0.0.0.0

format:
  deno fmt --ext md $(fd --exclude assets/ '\.md$')

