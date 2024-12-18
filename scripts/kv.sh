#!/bin/bash
set -o errexit
set -o nounset
set -o pipefail

LOCAL_FILE="${LOCAL_FILE:-".private/profile.json"}"
NAMESPACE_ID="${NAMESPACE_ID:-"8b5259fc13f94d85bc4c7bc316198fa1"}"

action="$1"
id=$(rbw get --raw Telegram | jq --raw-output '.fields.[] | select(.name == "chat_id").value')
case "$action" in
  get)
    mkdir --parents --verbose "$(dirname -- "$LOCAL_FILE")"
    wrangler kv key get "$id" --namespace-id "$NAMESPACE_ID" "${@:2}" |
      sd --fixed-strings "Proxy environment variables detected. We'll use your proxy for fetch requests." "" > "$LOCAL_FILE"
    prettier --write --ignore-path "" "$LOCAL_FILE"
    ;;
  put)
    prettier --write --ignore-path "" "$LOCAL_FILE"
    wrangler kv key put "$id" --namespace-id "$NAMESPACE_ID" --path "$LOCAL_FILE" "${@:2}"
    ;;
  *)
    echo "Usage: $0 {get|put}" >&2
    exit 1
    ;;
esac
