#!/usr/bin/env node
/**
 * Build step: runs next build with CI=false to prevent vercel build
 * delegation (which causes recursive invocation when the build script
 * chain is: vercel → npm run build → next → vercel → ...).
 * The .vercel/output/ directory generation is handled by the postbuild
 * step which calls `vercel build` separately.
 */
process.env.CI = 'false';
const { execSync } = require('child_process');

console.log('\n🔧 Building Next.js...');
try {
  execSync('npx next build', { stdio: 'inherit', env: process.env });
  console.log('✅ Next.js build complete');
} catch (e) {
  console.error('\n❌ Next.js build failed');
  process.exit(1);
}
