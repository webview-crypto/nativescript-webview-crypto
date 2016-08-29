#!/usr/bin/env bash


# Exit on error. Append || true if you expect an error.
set -o errexit
# Exit on error inside any functions or subshells.
set -o errtrace
# Do not allow use of undefined vars. Use ${VAR:-} to use an undefined VAR
set -o nounset
# Catch the error in case mysqldump fails (but gzip succeeds) in `mysqldump |gzip`
set -o pipefail
# Turn on traces, useful while debugging but commented out by default
set -o xtrace

printf "export default \`" > ./src/nativeScriptWebViewInterfaceString.ts
sed -e "s/\\\\/\\\\\\\\/g" -e "s/\`/\\\\\`/g" \
  node_modules/nativescript-webview-interface/www/nativescript-webview-interface.js \
  >> ./src/nativeScriptWebViewInterfaceString.ts
echo \` >> ./src/nativeScriptWebViewInterfaceString.ts
