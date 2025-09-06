build:
  just install_deps
  git pull
  mkdir -p public
  rm -rf public/*
  hugo

[working-directory: 'slides']
@build_slides:
  mkdir -p ../public/slides
  deno install
  # for week in .md; do
  deno task build --base /slides/week-01/ week-01.md
  deno task export week-01.md --output ../public/slides/week-01.pdf
  rsync -aiz dist/ ../public/slides/week-01
  # end
  rsync -aiz public/images/ ../public/images

dev:
  hugo serve -D --bind 0.0.0.0

install_deps:
  git submodule init && git submodule update

format:
  deno fmt --ext md $(fd --exclude assets/ '\.md$')

