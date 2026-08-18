#!/bin/bash
set -e

# ─────────────────────────────────────────────────────────────
#  OnTimeCheck — Cloudflare Pages build script
#
#  Step 1: Next.js build (generates .next/)
#  Step 2: @cloudflare/next-on-pages (generates .vercel/output/static/)
#  Step 3: Patch bare async_hooks → node:async_hooks in
#          generated func.js bundles
#
#  Without step 3, API routes return 500 because Next.js/Turbopack
#  emits `import "async_hooks"` (bare specifier) inside each edge
#  function bundle. The Cloudflare Edge Runtime + nodejs_compat
#  flag resolves `node:async_hooks` but NOT the bare `async_hooks`
#  specifier, causing the dynamic import() in the Worker to throw.
# ─────────────────────────────────────────────────────────────

echo "🔧 Step 1: Building Next.js..."
npm run build

echo ""
echo "🔧 Step 2: Converting to Cloudflare Pages format..."
npx @cloudflare/next-on-pages

echo ""
echo "🔧 Step 3: Patching bare async_hooks imports..."
find .vercel/output/static/_worker.js/__next-on-pages-dist__/ -name "*.func.js" -exec sed -i 's/from"async_hooks"/from"node:async_hooks"/g' {} +

PATCHED=$(grep -rl 'from"node:async_hooks"' .vercel/output/static/_worker.js/__next-on-pages-dist__/ | wc -l)
echo "  ✅ Patched $PATCHED func.js files"

echo ""
echo "🎉 Build complete — output in .vercel/output/static/"
