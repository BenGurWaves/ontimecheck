#!/usr/bin/env node
/**
 * Patch bare `async_hooks` imports → `node:async_hooks` in generated
 * Cloudflare Pages function bundles.
 *
 * Why: Next.js/Turbopack emits `import "async_hooks"` (bare specifier)
 * inside each edge function .func.js file. The Cloudflare Edge Runtime
 * with the `nodejs_compat` flag resolves `node:async_hooks` but does NOT
 * resolve the bare `async_hooks` specifier. When the Worker's dynamic
 * import() tries to load a .func.js that has `import "async_hooks"`,
 * the module load fails → 500 Internal Server Error.
 *
 * This script fixes all .func.js files in the output directory.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(process.cwd(), '.vercel', 'output', 'static', '_worker.js', '__next-on-pages-dist__');

if (!fs.existsSync(distDir)) {
  console.log('⚠️  No __next-on-pages-dist__ directory found — skipping patch');
  process.exit(0);
}

// Find all .func.js files
const output = execSync(`find ${distDir} -name "*.func.js"`, { encoding: 'utf8' }).trim();
const files = output ? output.split('\n') : [];

if (files.length === 0) {
  console.log('⚠️  No .func.js files found — skipping patch');
  process.exit(0);
}

let patched = 0;
for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    content = content.replace(/from"async_hooks"/g, 'from"node:async_hooks"');
    if (content !== original) {
      fs.writeFileSync(file, content);
      patched++;
      console.log(`  ✓ Patched: ${path.relative(process.cwd(), file)}`);
    }
  } catch (e) {
    console.error(`  ✗ Error patching ${file}:`, e.message);
  }
}

console.log(`\n✅ Patched ${patched}/${files.length} func.js files (bare async_hooks → node:async_hooks)`);
