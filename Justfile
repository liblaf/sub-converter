default: check

build:
    tsup

check:
    biome check --write

compile:
    bun build --compile --outfile="./dist/sing" "./src/bin/sing.ts"

[unix]
dist: compile
    mv "./dist/sing" "./dist/sing-{{ os() }}-{{ arch() }}"

[windows]
dist: compile
    mv "./dist/sing.exe" "./dist/sing-{{ os() }}-{{ arch() }}.exe"

test:
    vitest
