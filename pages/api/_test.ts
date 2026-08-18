export const runtime = 'edge';

// ─────────────────────────────────────────────────────────────
//  Debug test route — checks env vars and process availability
//  ─────────────────────────────────────────────────────────────
export default async function handler(req: Request) {
  try {
    const envInfo = {
      hasProcess: typeof process !== 'undefined',
      hasEnv: typeof process?.env !== 'undefined',
      envKeys: Object.keys(process?.env || {}).filter(k =>
        k.startsWith('NEXT_PUBLIC') || k.startsWith('STRIPE') || k.startsWith('SUPABASE')
      ),
      stripeKeySet: !!process?.env?.STRIPE_SECRET_KEY,
      siteUrl: process?.env?.NEXT_PUBLIC_SITE_URL,
    };
    return new Response(JSON.stringify({ method: req.method, ok: true, ...envInfo }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    return new Response(JSON.stringify({
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
