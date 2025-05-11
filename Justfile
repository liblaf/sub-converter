default: lint

build:
    tsup

compile:
    bun build --compile --outfile="./dist/sub-converter" "./src/bin/sub-converter.ts"

[unix]
dist: compile
    mv "./dist/sub-converter" "./dist/sub-converter-{{ os() }}-{{ arch() }}"

[windows]
dist: compile
    mv "./dist/sub-converter.exe" "./dist/sub-converter-{{ os() }}-{{ arch() }}.exe"

lint:
    biome check --write

test:
    vitest
