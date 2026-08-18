#!/usr/bin/env node
/**
 * Patches bare `async_hooks` imports to `node:async_hooks` in all .func.js files.
 *
 * The Cloudflare Edge Runtime with `nodejs_compat` resolves `node:async_hooks`
 * but NOT bare `async_hooks`. Generated .func.js files use bare imports.
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(process.cwd(), '.vercel', 'output', 'static', '_worker.js', '__next-on-pages-dist__');

if (!fs.existsSync(distDir)) {
  console.log('⚠️  No __next-on-pages-dist__ directory found — skipping patch');
  process.exit(0);
}

const files = execSync(`find ${distDir} -name "*.func.js"`, { encoding: 'utf8' })
  .trim().split('\n').filter(Boolean);

let patched = 0;
for (const file of files) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const before = content;
    content = content.replace(/from"async_hooks"/g, 'from"node:async_hooks"');
    if (content !== before) {
      fs.writeFileSync(file, content);
      patched++;
    }
  } catch (e) {
    console.error(`  ✗ Error patching ${file}:`, e.message);
  }
}

console.log(`  ✅ Patched ${patched}/${files.length} func.js files`);
