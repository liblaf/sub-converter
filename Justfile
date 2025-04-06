default: lint

build:
    tsup

compile:
    bun build --compile --outfile="./dist/sing" "./src/bin/sing.ts"

[unix]
dist: compile
    mv "./dist/sing" "./dist/sing-{{ os() }}-{{ arch() }}"

[windows]
dist: compile
    mv "./dist/sing.exe" "./dist/sing-{{ os() }}-{{ arch() }}.exe"

lint:
    biome check --write

test:
    vitest
