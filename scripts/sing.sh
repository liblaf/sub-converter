#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

./scripts/kv.sh get
bun run scripts/sing.ts | pnpm exec pino-pretty
prettier --write --ignore-path "" ".private/config.json"
