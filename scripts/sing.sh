#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

./scripts/kv.sh get
bun run scripts/sing.ts
prettier --write --ignore-path "" ".private/"
./scripts/kv.sh put
