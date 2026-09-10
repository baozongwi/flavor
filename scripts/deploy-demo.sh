#!/usr/bin/env bash
# Build exampleSite and push to bao2ongw1/bao2ongw1.github.io (GitHub Pages).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
THEME_PARENT="$(cd "$ROOT/.." && pwd)"
OUT="$ROOT/public"
DEMO_REPO="${DEMO_REPO:-git@github.com:bao2ongw1/bao2ongw1.github.io.git}"

cd "$ROOT"
rm -rf "$OUT"
hugo --source exampleSite --themesDir "$THEME_PARENT" --minify --destination "$OUT"
if command -v npx >/dev/null 2>&1; then
  npx -y pagefind@1.5.0 --site "$OUT"
fi
touch "$OUT/.nojekyll"

TMP="$(mktemp -d)"
cleanup() { rm -rf "$TMP"; }
trap cleanup EXIT
git clone --depth 1 "$DEMO_REPO" "$TMP"
git -C "$TMP" checkout --orphan "deploy-$(date +%s)"
git -C "$TMP" rm -rf . >/dev/null
cp -a "$OUT"/. "$TMP"/
git -C "$TMP" add -A
git -C "$TMP" -c user.name="$(git log -1 --format='%an')" -c user.email="$(git log -1 --format='%ae')" \
  commit -m "Deploy Flavor demo $(date -u +%Y-%m-%dT%H:%M:%SZ)"
git -C "$TMP" branch -M main
git -C "$TMP" push -f origin main
echo "→ https://bao2ongw1.github.io/"
