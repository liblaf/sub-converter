#!/bin/bash
# shellcheck disable=SC2154
set -o errexit
set -o nounset
set -o pipefail

# @cmd
# @option --namespace-id=`_default_namespace_id`
function put() {
  _put "config.json"
  _put "sing-box.json"
}

# @cmd
# @option --namespace-id=`_default_namespace_id`
function list() {
  wrangler kv key list --namespace-id "$argc_namespace_id"
}

# @cmd
# @option --namespace-id=`_default_namespace_id`
function get() {
  _get "config.json"
  _get "sing-box.json"
}

function _default_namespace_id() {
  rbw get --field "namespace-id" "Cloudflare KV"
}

function _put() {
  wrangler kv key put "$1" --namespace-id "$argc_namespace_id" --path ".private/$1"
}

function _get() {
  wrangler kv key get "$1" --namespace-id "$argc_namespace_id" |
    sd --fixed-strings "Proxy environment variables detected. We'll use your proxy for fetch requests." "" > ".private/$1"
}

eval "$(argc --argc-eval "$0" "$@")"
