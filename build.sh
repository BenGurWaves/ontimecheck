#!/bin/bash
set -e

# OnTimeCheck Cloudflare Pages build script
#
# Architecture:
#   build.sh → @cloudflare/next-on-pages → npm run build → node scripts/run-build.js
#   ↓
#   @cloudflare/next-on-pages generates .vercel/output/ from .next/
#   ↓
#   scripts/patch-funcs.js patches bare async_hooks imports

# Step 1: @cloudflare/next-on-pages runs `npm run build` internally
# which calls node scripts/run-build.js (sets CI=false, runs npx next build)
npx @cloudflare/next-on-pages

# Step 2: Patch bare async_hooks imports in generated func.js files
node scripts/patch-funcs.js

echo "✅ Build pipeline complete"
